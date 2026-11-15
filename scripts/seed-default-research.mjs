const baseUrl = process.env.SEED_BASE_URL || "http://localhost:3000";
const apiKey = process.env.OPENAI_API_KEY;
const cronSecret = process.env.CRON_SECRET;

if (!apiKey || !cronSecret) {
  throw new Error("OPENAI_API_KEY and CRON_SECRET are required");
}

const targets = [
  { publicationDate: "2026-11-13", slot: "morning" },
  { publicationDate: "2026-11-12", slot: "morning" },
  { publicationDate: "2026-11-11", slot: "morning" },
];

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function request(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { Authorization: `Bearer ${cronSecret}` },
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status}: ${JSON.stringify(payload)}`);
  }
  return payload;
}

async function waitForCompletion(responseId) {
  const deadline = Date.now() + 12 * 60 * 1000;
  while (Date.now() < deadline) {
    const response = await fetch(
      `https://api.openai.com/v1/responses/${encodeURIComponent(responseId)}`,
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(`OpenAI ${response.status}: ${JSON.stringify(payload)}`);
    }
    if (["completed", "incomplete", "failed", "cancelled"].includes(payload.status)) {
      return;
    }
    if (!["queued", "in_progress"].includes(payload.status)) {
      throw new Error(`OpenAI response ended with ${payload.status}`);
    }
    await delay(5000);
  }
  throw new Error(`Timed out waiting for ${responseId}`);
}

for (const target of targets) {
  const query = new URLSearchParams(target);
  let result = await request(`/api/cron/publish-research?${query}`);

  if (result.status === "already-published") {
    console.log(`${target.publicationDate} ${target.slot}: already published`);
    continue;
  }
  if (
    !["generation-started", "already-running"].includes(result.status) ||
    !result.responseId
  ) {
    throw new Error(`Could not start ${JSON.stringify(target)}: ${JSON.stringify(result)}`);
  }

  while (result.responseId) {
    await waitForCompletion(result.responseId);
    result = await request(
      `/api/cron/publish-research?responseId=${encodeURIComponent(result.responseId)}`,
    );
    if (result.status === "published") {
      console.log(
        `${target.publicationDate} ${target.slot}: published ${result.slug} (${result.qualityScore})`,
      );
      break;
    }
    if (result.status === "failed") {
      throw new Error(
        `${target.publicationDate} ${target.slot}: ${result.error || "failed"}`,
      );
    }
    if (!["generation-retried", "review-started"].includes(result.status)) {
      throw new Error(`Unexpected result: ${JSON.stringify(result)}`);
    }
  }
}
