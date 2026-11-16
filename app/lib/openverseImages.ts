import "server-only";

import type { BlogPost } from "@/app/lib/blogContent";

type OpenverseImage = {
  id: string;
  title?: string;
  foreign_landing_url?: string;
  url?: string;
  creator?: string;
  creator_url?: string;
  license?: string;
  license_version?: string;
  license_url?: string;
  provider?: string;
  source?: string;
  tags?: Array<{ name?: string }>;
  attribution?: string;
  mature?: boolean;
  height?: number;
  width?: number;
  thumbnail?: string;
};

export type ResearchImageSelection = Pick<
  BlogPost,
  "imageSrc" | "imageAlt" | "imagePosition"
> & {
  credit?: NonNullable<BlogPost["imageCredit"]>;
  metadata: Record<string, unknown>;
};

type ImageArticleContext = Pick<
  BlogPost,
  "title" | "description" | "keywords" | "answerSummary"
>;

type VisionDecision = {
  selectedId: string;
  altText: string;
  reason: string;
};

const allowedLicences = new Set(["cc0", "pdm"]);

function normaliseQuery(value: string) {
  return value
    .replace(/[^a-zA-Z0-9\s-]/g, " ")
    .replace(/\b(?:trial|study|research|evidence|202[0-9]|what|found)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function queryCandidates(article: ImageArticleContext, researchTopic: string) {
  const topicFallbacks: Record<string, string> = {
    "transplant-outcomes": "hair transplant scalp",
    "androgenetic-alopecia": "pattern hair loss scalp",
    "alopecia-areata": "alopecia hair loss scalp",
    "recovery-safety": "hair transplant recovery scalp",
  };
  return [
    normaliseQuery(article.title),
    normaliseQuery(article.keywords.slice(0, 4).join(" ")),
    topicFallbacks[researchTopic] ?? "hair scalp medical",
    "human hair microscope research",
  ].filter((value, index, values) => value && values.indexOf(value) === index);
}

function isUsableImage(image: OpenverseImage) {
  const width = image.width ?? 0;
  const height = image.height ?? 0;
  const ratio = height ? width / height : 0;
  return Boolean(
    image.id &&
      image.url?.startsWith("https://") &&
      image.thumbnail?.startsWith("https://") &&
      image.foreign_landing_url?.startsWith("https://") &&
      image.license &&
      allowedLicences.has(image.license.toLowerCase()) &&
      image.mature !== true &&
      width >= 800 &&
      height >= 500 &&
      ratio >= 1.25 &&
      ratio <= 2.4,
  );
}

async function searchOpenverse(query: string) {
  const url = new URL("https://api.openverse.org/v1/images/");
  url.searchParams.set("q", query);
  url.searchParams.set("license", "cc0,pdm");
  url.searchParams.set("aspect_ratio", "wide");
  url.searchParams.set("mature", "false");
  url.searchParams.set("page_size", "20");
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "UKHairTransplantResearchBot/1.0 (https://www.ukhairtransplant.co/editorial-policy)",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`Openverse search failed (${response.status})`);
  const payload = (await response.json()) as { results?: OpenverseImage[] };
  return (payload.results ?? []).filter(isUsableImage);
}

function responseText(payload: unknown) {
  const response = payload as {
    output?: Array<{
      content?: Array<{ type?: string; text?: string; refusal?: string }>;
    }>;
  };
  const refusal = response.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === "refusal")?.refusal;
  if (refusal) throw new Error(`Image review refused: ${refusal}`);
  return response.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === "output_text")?.text;
}

async function chooseWithVision(
  article: ImageArticleContext,
  candidates: OpenverseImage[],
): Promise<VisionDecision> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const model = process.env.OPENAI_CONTENT_MODEL || "gpt-6-luna";
  const catalogue = candidates.map((candidate) => ({
    id: candidate.id,
    title: candidate.title,
    creator: candidate.creator,
    tags: candidate.tags?.map((tag) => tag.name).filter(Boolean).slice(0, 12),
    licence: candidate.license,
  }));
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      reasoning: { effort: "none" },
      store: false,
      max_output_tokens: 600,
      instructions:
        "Select one image for a UK evidence-led hair-health article. Choose only an image that is clearly relevant at first glance, editorial rather than promotional, medically neutral, and safe for commercial healthcare publishing. Reject recognisable faces presented as having a medical condition, before-and-after imagery, unrelated lifestyle scenes, animals, logos, text-heavy graphics, treatment promises, disturbing clinical imagery, or an ambiguous subject. Return selectedId='none' if no candidate is genuinely suitable. Write a factual British-English alt text describing only visible content, without SEO stuffing or medical claims.",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({
                article: {
                  title: article.title,
                  description: article.description,
                  keywords: article.keywords,
                  answerSummary: article.answerSummary,
                },
              }),
            },
            ...candidates.flatMap((candidate, index) => [
              {
                type: "input_text" as const,
                text: JSON.stringify({
                  candidateNumber: index + 1,
                  ...catalogue[index],
                }),
              },
              {
                type: "input_image" as const,
                image_url: candidate.thumbnail!,
                detail: "low" as const,
              },
            ]),
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "openverse_image_selection",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["selectedId", "altText", "reason"],
            properties: {
              selectedId: { type: "string" },
              altText: { type: "string", maxLength: 180 },
              reason: { type: "string", maxLength: 300 },
            },
          },
        },
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(25_000),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(
      `Image relevance review failed (${response.status}): ${JSON.stringify(payload).slice(0, 400)}`,
    );
  }
  const text = responseText(payload);
  if (!text) throw new Error("Image relevance review returned no result");
  return JSON.parse(text) as VisionDecision;
}

async function originalImageIsReachable(image: OpenverseImage) {
  if (!image.url) return false;
  try {
    const response = await fetch(image.url, {
      method: "HEAD",
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(5_000),
    });
    const contentType = response.headers.get("content-type") ?? "";
    return (
      response.ok &&
      (!contentType || contentType.toLowerCase().startsWith("image/"))
    );
  } catch {
    return false;
  }
}

export async function findFreeResearchImage(
  article: ImageArticleContext,
  researchTopic: string,
  usedOpenverseIds: Set<string>,
): Promise<ResearchImageSelection | null> {
  const queries = queryCandidates(article, researchTopic);
  const results = await Promise.allSettled(queries.map(searchOpenverse));
  const unique = new Map<string, OpenverseImage>();
  const resultSets = results
    .filter(
      (result): result is PromiseFulfilledResult<OpenverseImage[]> =>
        result.status === "fulfilled",
    )
    .map((result) => result.value);
  const largestResultSet = Math.max(0, ...resultSets.map((result) => result.length));

  // Round-robin keeps one broad query from crowding out the safer fallbacks.
  for (let index = 0; index < largestResultSet; index += 1) {
    for (const resultSet of resultSets) {
      const image = resultSet[index];
      if (!image) continue;
      if (!usedOpenverseIds.has(image.id)) unique.set(image.id, image);
    }
  }
  const initialCandidates = [...unique.values()].slice(0, 12);
  const reachability = await Promise.all(
    initialCandidates.map(async (image) => ({
      image,
      reachable: await originalImageIsReachable(image),
    })),
  );
  const candidates = reachability
    .filter((result) => result.reachable)
    .map((result) => result.image)
    .slice(0, 6);
  if (!candidates.length) return null;

  const decision = await chooseWithVision(article, candidates);
  if (decision.selectedId === "none") return null;
  const selected = candidates.find((image) => image.id === decision.selectedId);
  if (!selected?.url || !selected.foreign_landing_url || !selected.license) return null;

  return {
    imageSrc: selected.url,
    imageAlt: decision.altText.trim() || selected.title || article.title,
    imagePosition: "center",
    credit: {
      label: selected.creator
        ? `Image by ${selected.creator} via Openverse`
        : "Image via Openverse",
      href: selected.foreign_landing_url,
      licenceLabel: selected.license.toUpperCase(),
      licenceHref: selected.license_url,
    },
    metadata: {
      provider: "openverse",
      openverseId: selected.id,
      source: selected.source,
      originalUrl: selected.url,
      thumbnailUrl: selected.thumbnail,
      landingPage: selected.foreign_landing_url,
      creator: selected.creator,
      creatorUrl: selected.creator_url,
      licence: selected.license.toLowerCase(),
      licenceVersion: selected.license_version,
      licenceUrl: selected.license_url,
      attribution: selected.attribution,
      width: selected.width,
      height: selected.height,
      selectionReason: decision.reason,
      selectedAt: new Date().toISOString(),
    },
  };
}
