import "server-only";

import { blogPosts, type BlogPost, type BlogSource } from "@/app/lib/blogContent";
import {
  archiveFailedAutomationJob,
  type AutomationJob,
  claimPublicationSlot,
  createAutomationJob,
  ensureAutomatedBlogSchema,
  failAutomationJob,
  failPublicationSlot,
  getAutomationJobByResponseId,
  getAutomationJobForSlot,
  getAttemptedResearchIds,
  getAutomatedBlogFingerprints,
  getPublishedPostForSlot,
  getStaleAutomationJobs,
  getUsedResearchImages,
  markAutomationJobPublished,
  saveAutomatedBlogPost,
} from "@/app/lib/blogDatabase";
import {
  findFreeResearchImage,
  type ResearchImageSelection,
} from "@/app/lib/openverseImages";

type Slot = "morning" | "afternoon";

type GuidanceSource = BlogSource & { note: string };

type ResearchCluster = {
  id: string;
  label: string;
  query: string;
  guidance: GuidanceSource[];
  relatedLinks: BlogPost["relatedLinks"];
};

type EuropePmcResult = {
  pmid?: string;
  doi?: string;
  title?: string;
  abstractText?: string;
  authorString?: string;
  journalTitle?: string;
  firstPublicationDate?: string;
  pubTypeList?: { pubType?: string[] };
  isRetracted?: string;
  meshHeadingList?: {
    meshHeading?: Array<{ descriptorName?: string }>;
  };
};

type GeneratedArticle = Omit<
  BlogPost,
  "sources" | "relatedLinks" | "imageSrc" | "imageAlt" | "imagePosition" | "imageCredit" | "publishedAt" | "updatedAt" | "isResearchDigest" | "primaryPmid" | "studyDesign"
> & { studyDesign: string };

type SimpleArticleDraft = {
  answerSummary: string;
  keyTakeaways: string[];
  sectionBodies: string[];
  faqAnswers: string[];
};

type ExistingFingerprint = {
  title?: string;
  slug?: string;
  excerpt?: string;
  answerSummary?: string;
  primaryPmid?: string;
  primaryDoi?: string;
  researchTopic?: string;
  sections?: Array<{ paragraphs?: string[] }>;
};

class FatalAutomationError extends Error {}
class IncompleteOpenAIResponseError extends Error {
  constructor(readonly reason: string) {
    super(`OpenAI response was incomplete: ${reason}`);
  }
}

const ARTICLE_MAX_OUTPUT_TOKENS = 5000;
const MIN_ARTICLE_WORDS = 600;
const MAX_ARTICLE_WORDS = 1100;

const nhsHairLoss: GuidanceSource = {
  label: "NHS: Hair loss",
  href: "https://www.nhs.uk/symptoms/hair-loss/",
  note: "The NHS says to see a GP if you are worried about hair loss. It says a GP may be able to identify the cause by looking at the hair, advises seeing a GP before considering a commercial hair clinic, and notes that a GP may be able to help if hair loss is causing distress. It also states that no treatment is 100% effective.",
};

const nhsHairTransplant: GuidanceSource = {
  label: "NHS: Hair transplant",
  href: "https://www.nhs.uk/tests-and-treatments/cosmetic-procedures/cosmetic-surgery/hair-transplant/",
  note: "The NHS describes a hair transplant as moving hair to a thin or bald area and says it is not available on the NHS because it is cosmetic surgery. It says the procedure is generally for permanent hereditary baldness and is not usually suitable for other types of hair loss such as alopecia areata. It advises checking CQC registration in England and choosing a qualified, experienced surgeon.",
};

const badAlopecia: GuidanceSource = {
  label: "British Association of Dermatologists: Alopecia areata",
  href: "https://www.bad.org.uk/pils/alopecia-areata",
  note: "The British Association of Dermatologists provides a patient information leaflet about alopecia areata. This supplied note does not establish any particular diagnosis, treatment recommendation, NHS availability, referral criterion, or outcome; do not infer those details from the link.",
};

const badFemalePattern: GuidanceSource = {
  label: "British Association of Dermatologists: Female pattern hair loss",
  href: "https://www.bad.org.uk/pils/hair-loss-female-pattern-androgenetic-alopecia",
  note: "The British Association of Dermatologists says female pattern hair loss is the most common type of hair loss in women and is linked to genetic and hormonal factors. Its leaflet says PRP is not offered by the NHS and can be sought privately, but research is too limited to understand when and how it might work. Do not describe PRP as experimental or make broader NHS-availability claims beyond those exact statements.",
};

const cochraneAlopecia: GuidanceSource = {
  label: "Cochrane: Treatments for alopecia areata",
  href: "https://www.cochrane.org/evidence/CD013719_what-are-benefits-and-risks-different-treatments-alopecia-areata-hair-loss",
  note: "Cochrane publishes an independent systematic-review summary about benefits, harms, and certainty of evidence for alopecia areata treatments. This supplied note does not establish a specific treatment effect, recommendation, safety conclusion, NHS availability, or referral pathway; do not infer those details from the link.",
};

function contentWriterModel() {
  return process.env.OPENAI_ARTICLE_MODEL || "gpt-4.1-mini";
}

const clusters: ResearchCluster[] = [
  {
    id: "transplant-outcomes",
    label: "Hair transplant outcomes and planning",
    query: '("hair transplantation" OR "hair transplant") AND (outcome OR survival OR density OR planning)',
    guidance: [nhsHairTransplant, nhsHairLoss],
    relatedLinks: [
      { href: "/hair-transplant-london", label: "Hair transplant London", description: "Understand suitability, planning, and treatment routes in London." },
      { href: "/hair-transplant-recovery-timeline", label: "Recovery timeline", description: "See what recovery can involve and what varies between patients." },
      { href: "/our-clinical-standards", label: "Clinical standards", description: "Questions to ask about clinical responsibility and provider standards." },
    ],
  },
  {
    id: "androgenetic-alopecia",
    label: "Pattern hair loss research",
    query: '("androgenetic alopecia" OR "pattern hair loss") AND (treatment OR diagnosis OR progression OR outcome)',
    guidance: [nhsHairLoss, badFemalePattern],
    relatedLinks: [
      { href: "/services/female-hair-transplant", label: "Female hair transplant", description: "Read about suitability and planning for female-pattern concerns." },
      { href: "/services/hair-loss-treatments", label: "Hair loss treatments", description: "Explore the questions a treatment discussion should cover." },
      { href: "/assessment", label: "Request an assessment", description: "Share your pattern of hair loss and goals with the team." },
    ],
  },
  {
    id: "alopecia-areata",
    label: "Alopecia areata evidence",
    query: '"alopecia areata" AND (treatment OR outcome OR relapse OR quality of life)',
    guidance: [badAlopecia, cochraneAlopecia],
    relatedLinks: [
      { href: "/services/hair-loss-treatments", label: "Hair loss treatments", description: "Understand why the cause of hair loss matters before treatment." },
      { href: "/blog/hair-transplant-second-opinion", label: "When to seek a second opinion", description: "Questions to ask when the diagnosis or proposed route is unclear." },
      { href: "/assessment", label: "Request an assessment", description: "Start with a general assessment rather than assuming transplant is suitable." },
    ],
  },
  {
    id: "recovery-safety",
    label: "Recovery and safety research",
    query: '("hair transplantation" OR "hair transplant") AND (complication OR adverse OR recovery OR postoperative)',
    guidance: [nhsHairTransplant, nhsHairLoss],
    relatedLinks: [
      { href: "/hair-transplant-recovery-timeline", label: "Hair transplant recovery", description: "A practical guide to the recovery timeline and aftercare questions." },
      { href: "/hair-transplant-side-effects", label: "Side effects", description: "Understand common effects, warning signs, and when to seek help." },
      { href: "/blog/hair-transplant-gone-wrong", label: "If a transplant goes wrong", description: "Practical next steps when healing or results cause concern." },
    ],
  },
];

const excludedPublicationTypes = ["case reports", "editorial", "letter", "comment", "news"];
const preferredPublicationTypes = ["meta-analysis", "systematic review", "randomized controlled trial", "clinical trial", "guideline", "observational study", "comparative study"];

function londonDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function stableNumber(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function selectCluster(date: string, slot: Slot) {
  const offset = slot === "morning" ? 0 : 1;
  return clusters[(stableNumber(date) + offset) % clusters.length];
}

function publicationTypes(result: EuropePmcResult) {
  return (result.pubTypeList?.pubType ?? []).map((item) => item.toLowerCase());
}

function candidateScore(result: EuropePmcResult) {
  const types = publicationTypes(result);
  const preferredIndex = preferredPublicationTypes.findIndex((type) => types.includes(type));
  const evidenceScore = preferredIndex === -1 ? 0 : (preferredPublicationTypes.length - preferredIndex) * 10;
  const abstractScore = Math.min((result.abstractText?.length ?? 0) / 80, 20);
  const dateScore = result.firstPublicationDate ? Date.parse(result.firstPublicationDate) / 1e12 : 0;
  return evidenceScore + abstractScore + dateScore;
}

function acceptableCandidate(result: EuropePmcResult) {
  const types = publicationTypes(result);
  const title = result.title?.toLowerCase() ?? "";
  const abstract = result.abstractText?.toLowerCase() ?? "";
  const meshTerms = (result.meshHeadingList?.meshHeading ?? [])
    .map((heading) => heading.descriptorName?.toLowerCase())
    .filter(Boolean);
  const isReview = types.some((type) =>
    ["meta-analysis", "systematic review", "review", "guideline"].includes(type),
  );
  const preclinicalSignals = /\b(mice|mouse|murine|rats?|in vitro|ex vivo|cell line|animal model|rabbit|porcine)\b/i;
  const animalOnly = meshTerms.includes("animals") && !meshTerms.includes("humans");
  return Boolean(
    result.pmid &&
      result.title &&
      result.abstractText &&
      result.abstractText.length >= 450 &&
      result.isRetracted !== "Y" &&
      !title.includes("retract") &&
      !types.some((type) => excludedPublicationTypes.includes(type)) &&
      !animalOnly &&
      (isReview || !preclinicalSignals.test(`${title} ${abstract}`)),
  );
}

async function fetchPubMedCandidates(cluster: ResearchCluster) {
  const end = new Date();
  const start = new Date(end);
  start.setUTCFullYear(start.getUTCFullYear() - 2);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  const query = `SRC:MED AND HAS_ABSTRACT:Y AND FIRST_PDATE:[${startDate} TO ${endDate}] AND (${cluster.query})`;
  const url = new URL("https://www.ebi.ac.uk/europepmc/webservices/rest/search");
  url.searchParams.set("query", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("resultType", "core");
  url.searchParams.set("pageSize", "40");
  url.searchParams.set("sort", "P_PDATE_D desc");

  const response = await fetch(url, { headers: { "User-Agent": "UKHairTransplantResearchBot/1.0 (https://www.ukhairtransplant.co/editorial-policy)" }, cache: "no-store" });
  if (!response.ok) throw new Error(`PubMed metadata request failed (${response.status})`);
  const payload = (await response.json()) as { resultList?: { result?: EuropePmcResult[] } };
  return (payload.resultList?.result ?? []).filter(acceptableCandidate).sort((a, b) => candidateScore(b) - candidateScore(a));
}

function normalizeWords(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((word) => word.length > 2);
}

function plainText(value: string | undefined) {
  return (value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function jaccard(left: string, right: string) {
  const a = new Set(normalizeWords(left));
  const b = new Set(normalizeWords(right));
  const intersection = [...a].filter((word) => b.has(word)).length;
  const union = new Set([...a, ...b]).size;
  return union ? intersection / union : 0;
}

function similarityToExisting(article: GeneratedArticle, existing: ExistingFingerprint[]) {
  const currentChunks = [
    `${article.title} ${article.excerpt} ${article.answerSummary}`,
    ...article.sections.map((section) => `${section.heading} ${section.paragraphs.join(" ")}`),
  ];
  return Math.max(
    0,
    ...existing.flatMap((item) => {
      const existingChunks = [
        `${item.title ?? ""} ${item.excerpt ?? ""} ${item.answerSummary ?? ""}`,
        ...(item.sections ?? []).map((section) => (section.paragraphs ?? []).join(" ")),
      ];
      return currentChunks.flatMap((current) =>
        existingChunks.map((previous) => jaccard(current, previous)),
      );
    }),
  );
}

function responseText(payload: unknown) {
  const response = payload as {
    status?: string;
    incomplete_details?: { reason?: string };
    output?: Array<{
      type?: string;
      content?: Array<{ type?: string; text?: string; refusal?: string }>;
    }>;
  };
  if (response.status === "incomplete") {
    throw new IncompleteOpenAIResponseError(
      response.incomplete_details?.reason ?? "unknown reason",
    );
  }
  const refusal = response.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === "refusal")?.refusal;
  if (refusal) throw new Error(`OpenAI refused the request: ${refusal}`);
  return response.output?.flatMap((item) => item.content ?? []).find((item) => item.type === "output_text")?.text;
}

async function structuredResponse<T>(
  name: string,
  schema: Record<string, unknown>,
  instructions: string,
  input: string,
  reasoningEffort: "none" | "low" | "medium" = "low",
  maxOutputTokens = ARTICLE_MAX_OUTPUT_TOKENS,
  options: { model?: string } = {},
): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const model = options.model || process.env.OPENAI_CONTENT_MODEL || "gpt-6-luna";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      ...(!model.startsWith("gpt-4")
        ? { reasoning: { effort: reasoningEffort } }
        : {}),
      instructions,
      input,
      store: false,
      max_output_tokens: maxOutputTokens,
      text: {
        format: {
          type: "json_schema",
          name,
          strict: true,
          schema,
        },
      },
    }),
    cache: "no-store",
  });
  const payload = await response.json();
  if (!response.ok) {
    const message = `OpenAI request failed (${response.status}): ${JSON.stringify(payload).slice(0, 500)}`;
    if ([401, 403, 429].includes(response.status)) {
      throw new FatalAutomationError(message);
    }
    throw new Error(message);
  }
  const text = responseText(payload);
  if (!text) throw new Error("OpenAI returned no structured output");
  return parseJsonResponse<T>(text);
}

async function startBackgroundStructuredResponse(
  name: string,
  schema: Record<string, unknown>,
  instructions: string,
  input: string,
  reasoningEffort: "none" | "low" | "medium" = "low",
  maxOutputTokens = ARTICLE_MAX_OUTPUT_TOKENS,
  options: { model?: string } = {},
) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const model = options.model || process.env.OPENAI_CONTENT_MODEL || "gpt-6-luna";
  const body: Record<string, unknown> = {
    model,
    instructions,
    input,
    background: true,
    store: true,
    max_output_tokens: maxOutputTokens,
    text: {
      format: {
        type: "json_schema",
        name,
        strict: true,
        schema,
      },
    },
  };
  if (!model.startsWith("gpt-4")) {
    body.reasoning = { effort: reasoningEffort };
  }
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const payload = (await response.json()) as { id?: string; status?: string };
  if (!response.ok || !payload.id) {
    throw new FatalAutomationError(
      `OpenAI background request failed (${response.status}): ${JSON.stringify(payload).slice(0, 500)}`,
    );
  }
  return { id: payload.id, status: payload.status ?? "queued" };
}

async function retrieveStructuredResponse<T>(responseId: string): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const response = await fetch(
    `https://api.openai.com/v1/responses/${encodeURIComponent(responseId)}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    },
  );
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(
      `OpenAI response retrieval failed (${response.status}): ${JSON.stringify(payload).slice(0, 500)}`,
    );
  }
  const text = responseText(payload);
  if (!text) throw new Error("OpenAI returned no structured output");
  return parseJsonResponse<T>(text);
}

function parseJsonResponse<T>(text: string): T {
  const withoutFence = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  if (start === -1 || end <= start) {
    throw new Error("OpenAI returned invalid JSON output");
  }
  const json = withoutFence.slice(start, end + 1);
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    // A small number of legacy responses omitted the closing keyTakeaways
    // bracket immediately before sectionBodies. Repair only that exact shape;
    // current responses use strict Structured Outputs and never enter here.
    const repaired = json.replace(
      /("keyTakeaways"\s*:\s*\[[\s\S]*?)(,\s*"sectionBodies"\s*:)/,
      "$1]$2",
    );
    if (repaired === json) throw error;
    return JSON.parse(repaired) as T;
  }
}

const simpleArticleSchema = {
  type: "object",
  additionalProperties: false,
  required: ["answerSummary", "keyTakeaways", "sectionBodies", "faqAnswers"],
  properties: {
    answerSummary: {
      type: "string",
    },
    keyTakeaways: {
      type: "array",
      items: {
        type: "string",
      },
    },
    sectionBodies: {
      type: "array",
      items: {
        type: "string",
      },
    },
    faqAnswers: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
} as const;

function validateSimpleArticleDraft(value: unknown): SimpleArticleDraft {
  const errors: string[] = [];
  const draft = value as Partial<SimpleArticleDraft> | null;
  if (!draft || typeof draft.answerSummary !== "string" || !draft.answerSummary.trim()) {
    errors.push("answerSummary must be a non-empty string");
  }

  const expectedArrays = [
    ["keyTakeaways", draft?.keyTakeaways, 4],
    ["sectionBodies", draft?.sectionBodies, 7],
    ["faqAnswers", draft?.faqAnswers, 3],
  ] as const;

  for (const [name, items, expectedLength] of expectedArrays) {
    if (!Array.isArray(items) || items.length !== expectedLength) {
      errors.push(`${name} must contain exactly ${expectedLength} items`);
      continue;
    }
    if (items.some((item) => typeof item !== "string" || !item.trim())) {
      errors.push(`${name} must contain only non-empty strings`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`OpenAI returned an invalid article structure: ${errors.join("; ")}`);
  }
  return draft as SimpleArticleDraft;
}

function normaliseLegacyArticleDraft(value: unknown) {
  if (!value || typeof value !== "object") return value;
  const draft = value as Partial<SimpleArticleDraft>;
  return {
    ...draft,
    keyTakeaways: Array.isArray(draft.keyTakeaways)
      ? draft.keyTakeaways.slice(0, 4)
      : draft.keyTakeaways,
    sectionBodies: Array.isArray(draft.sectionBodies)
      ? draft.sectionBodies.slice(0, 7)
      : draft.sectionBodies,
    faqAnswers: Array.isArray(draft.faqAnswers)
      ? draft.faqAnswers.slice(0, 3)
      : draft.faqAnswers,
  };
}

const curatedLegacyImages: Record<string, ResearchImageSelection> = {
  resp_0edfe817871f25d6006b028ae43e6487d2839941eb3a38157c: {
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Plant_cell_under_microscope.jpg",
    imageAlt: "Green plant cells viewed through a microscope",
    imagePosition: "center",
    credit: {
      label: "Image by Schminnte via Wikimedia Commons",
      href: "https://commons.wikimedia.org/?curid=127470463",
      licenceLabel: "CC BY-SA 4.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/4.0",
    },
    metadata: {
      provider: "wikimedia",
      sourceId: "127470463",
      source: "https://commons.wikimedia.org/?curid=127470463",
      originalUrl:
        "https://upload.wikimedia.org/wikipedia/commons/1/1d/Plant_cell_under_microscope.jpg",
      creator: "Schminnte",
      licence: "CC BY-SA 4.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      selection: "Manually verified subject-specific image",
    },
  },
  resp_02d14f5773321e97006b030e58caf087d1b24767bc5e784ab6: {
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Hair_follicle_long_400_02.jpg",
    imageAlt:
      "Microscope image showing a longitudinal section of a human scalp hair follicle",
    imagePosition: "center",
    credit: {
      label: "Image by Ganímedes via Wikimedia Commons",
      href: "https://commons.wikimedia.org/?curid=30081804",
      licenceLabel: "CC BY-SA 3.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    metadata: {
      provider: "wikimedia",
      sourceId: "30081804",
      source: "https://commons.wikimedia.org/?curid=30081804",
      originalUrl:
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Hair_follicle_long_400_02.jpg",
      creator: "Ganímedes",
      licence: "CC BY-SA 3.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      selection: "Manually verified subject-specific image",
    },
  },
  resp_0e95d7df2418cfe4006afddbecdbf087d2b0f717dfeb957c45: {
    imageSrc:
      "https://images.pexels.com/photos/15415401/pexels-photo-15415401.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Overhead view of a woman with long hair eating a fresh salad",
    imagePosition: "center",
    credit: {
      label: "Photo by Mustafa Erdağ via Pexels",
      href: "https://www.pexels.com/photo/overhead-shot-of-a-woman-eating-a-salad-15415401/",
      licenceLabel: "Pexels licence",
      licenceHref: "https://www.pexels.com/license/",
    },
    metadata: {
      provider: "pexels",
      sourceId: "15415401",
      source:
        "https://www.pexels.com/photo/overhead-shot-of-a-woman-eating-a-salad-15415401/",
      originalUrl:
        "https://images.pexels.com/photos/15415401/pexels-photo-15415401.jpeg",
      creator: "Mustafa Erdağ",
      licence: "Pexels licence",
      selection: "Manually approved editorial image",
    },
  },
  resp_0c05c1a6b9519cbd006afe966cf9d487d2b8c0924faef3fe71: {
    imageSrc:
      "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3drMzI5MzAxMzYtaW1hZ2Uta3A2Y211ZWYuanBn.jpg",
    imageAlt: "Gloved laboratory hand holding a blood collection tube",
    imagePosition: "center",
    credit: {
      label: "Public-domain image via Rawpixel",
      href: "https://www.rawpixel.com/image/3338342/free-photo-image-blood-collection-tube-cc0-creative-commons",
      licenceLabel: "CC0",
      licenceHref: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    metadata: {
      provider: "rawpixel",
      sourceId: "3338342",
      source:
        "https://www.rawpixel.com/image/3338342/free-photo-image-blood-collection-tube-cc0-creative-commons",
      originalUrl:
        "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3drMzI5MzAxMzYtaW1hZ2Uta3A2Y211ZWYuanBn.jpg",
      licence: "cc0",
      selection: "Manually approved editorial image",
    },
  },
  resp_0967b509a97fe93a006affe7e443c887d2a83eab462d260210: {
    imageSrc:
      "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMzQxMTA0LWltYWdlLWt3dncwd3ZoLmpwZw.jpg",
    imageAlt: "Close-up view of a laboratory microscope",
    imagePosition: "center",
    credit: {
      label: "Public-domain image via Rawpixel",
      href: "https://www.rawpixel.com/image/5911864/microscope-lab-free-public-domain-cc0-image",
      licenceLabel: "CC0",
      licenceHref: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    metadata: {
      provider: "rawpixel",
      sourceId: "5911864",
      source:
        "https://www.rawpixel.com/image/5911864/microscope-lab-free-public-domain-cc0-image",
      originalUrl:
        "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMzQxMTA0LWltYWdlLWt3dncwd3ZoLmpwZw.jpg",
      licence: "cc0",
      selection: "Manually approved editorial image",
    },
  },
};

function primaryStudyContext(candidate: EuropePmcResult) {
  return {
    pmid: candidate.pmid,
    doi: candidate.doi,
    title: candidate.title,
    authors: candidate.authorString,
    journal: candidate.journalTitle,
    publicationDate: candidate.firstPublicationDate,
    publicationTypes: candidate.pubTypeList?.pubType,
    abstract: plainText(candidate.abstractText),
  };
}

function articleRequest(
  candidate: EuropePmcResult,
  cluster: ResearchCluster,
  existing: ExistingFingerprint[],
) {
  const existingContext = existing.slice(0, 12).map((item) => ({
    title: item.title,
  }));
  return {
    instructions: `Write a concise British-English explanation of the supplied PubMed abstract for a UK patient-information website. Return one JSON object and nothing else, using exactly these keys: {"answerSummary":"string","keyTakeaways":["four strings"],"sectionBodies":["seven strings"],"faqAnswers":["three strings"]}. Use only facts present in the study metadata, abstract, or the exact supplied guidance notes. Do not diagnose, recommend treatment, invent clinical details, promise results, or infer facts from a source link. Describe associations as associations and preliminary findings as preliminary. Do not include HTML or Markdown. Write four distinct takeaways, seven section bodies in the supplied order, and three direct FAQ answers. Each section body must be 80-110 words. The complete reader-visible copy must be 650-950 words. Finish every sentence. Do not repeat the same conclusion in multiple sections.`,
    input: JSON.stringify({
      primaryStudy: primaryStudyContext(candidate),
      independentGuidance: cluster.guidance,
      existingArticlesToAvoidDuplicating: existingContext,
      sectionOrder: [
        "Direct answer",
        "What the study examined",
        "What the researchers found",
        "Important limitations",
        "How this fits with independent UK guidance",
        "What this may mean for patients",
        "Where to find further support",
      ],
      faqQuestions: [
        "What did this study investigate?",
        "What can the findings prove?",
        "How should UK readers interpret the study?",
      ],
    }),
  };
}

async function generateArticle(
  candidate: EuropePmcResult,
  cluster: ResearchCluster,
  existing: ExistingFingerprint[],
) {
  const request = articleRequest(candidate, cluster, existing);
  return structuredResponse<SimpleArticleDraft>(
    "research_article",
    simpleArticleSchema,
    request.instructions,
    request.input,
    "none",
    ARTICLE_MAX_OUTPUT_TOKENS,
    { model: contentWriterModel() },
  );
}

function resultStudyDesign(candidate: EuropePmcResult) {
  const types = candidate.pubTypeList?.pubType ?? [];
  return types.find((type) => preferredPublicationTypes.includes(type.toLowerCase())) ?? types[0] ?? "PubMed-indexed journal article";
}

function wordCount(article: GeneratedArticle) {
  return [
    article.answerSummary,
    ...article.keyTakeaways,
    ...article.sections.flatMap((section) => [
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...article.faq.flatMap((item) => [item.question, item.answer]),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function incompleteProseFields(article: GeneratedArticle) {
  const fields: Array<[string, string]> = [
    ["description", article.description],
    ["excerpt", article.excerpt],
    ["answerSummary", article.answerSummary],
    ...article.keyTakeaways.map((value, index) => [`keyTakeaways[${index}]`, value] as [string, string]),
    ...article.sections.flatMap((section, sectionIndex) => [
      ...section.paragraphs.map((value, index) => [`sections[${sectionIndex}].paragraphs[${index}]`, value] as [string, string]),
      ...(section.bullets ?? []).map((value, index) => [`sections[${sectionIndex}].bullets[${index}]`, value] as [string, string]),
    ]),
    ...article.faq.map((item, index) => [`faq[${index}].answer`, item.answer] as [string, string]),
  ];

  return fields
    .filter(([, value]) => !/[.!?][\"'’”)]*$/.test(value.trim()))
    .map(([label]) => label);
}

function editorialPreflight(article: GeneratedArticle) {
  const allText = JSON.stringify(article);
  const articleWords = wordCount(article);
  const promotionalClaimPattern =
    /\b(?:guaranteed results?|results? (?:are|is) guaranteed|risk[- ]free treatment|100% (?:safe|effective|success)|clinically proven to|the best treatment|completely safe)\b/gi;
  const negatedClaimContext =
    /\b(?:no|not|never|none|cannot|can't|isn't|aren't|doesn't|do not|should not|without)\b[^.!?]{0,100}$/i;
  const promotionalClaim = [...allText.matchAll(promotionalClaimPattern)].find(
    (match) => {
      const precedingContext = allText.slice(
        Math.max(0, (match.index ?? 0) - 120),
        match.index,
      );
      return !negatedClaimContext.test(precedingContext);
    },
  );
  return {
    articleWords,
    wordCountWithinRange:
      articleWords >= MIN_ARTICLE_WORDS && articleWords <= MAX_ARTICLE_WORDS,
    incompleteProseFields: incompleteProseFields(article),
    potentialPromotionalClaim: promotionalClaim?.[0] ?? null,
  };
}

function trimAtWordBoundary(value: string, maxLength: number) {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;
  const shortened = compact.slice(0, maxLength + 1);
  const boundary = shortened.lastIndexOf(" ");
  return shortened.slice(0, boundary > 20 ? boundary : maxLength).trim();
}

const simpleSectionHeadings = [
  "Direct answer",
  "What the study examined",
  "What the researchers found",
  "Important limitations",
  "How this fits with independent UK guidance",
  "What this may mean for patients",
  "Where to find further support",
];

const simpleFaqQuestions = [
  "What did this study investigate?",
  "What can the findings prove?",
  "How should UK readers interpret the study?",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");
}

function completeExcerpt(value: string, maxLength: number, fallback: string) {
  const sentences = value.match(/[^.!?]+[.!?]["'’”)]*/g) ?? [];
  let result = "";
  for (const sentence of sentences) {
    const candidate = `${result} ${sentence.trim()}`.trim();
    if (candidate.length > maxLength) break;
    result = candidate;
  }
  return result.length >= 80 ? result : fallback;
}

function splitSectionBody(body: string) {
  const sentences = body.match(/[^.!?]+[.!?]["'’”)]*/g) ?? [];
  if (sentences.length >= 2) {
    const splitAt = Math.ceil(sentences.length / 2);
    return [
      sentences.slice(0, splitAt).join(" ").trim(),
      sentences.slice(splitAt).join(" ").trim(),
    ];
  }

  const words = body.trim().split(/\s+/);
  const splitAt = Math.ceil(words.length / 2);
  return [
    `${words.slice(0, splitAt).join(" ").replace(/[,:;\-]+$/g, "")}.`,
    `${words.slice(splitAt).join(" ").replace(/[,:;\-]+$/g, "")}.`,
  ];
}

function cleanGeneratedText(value: string) {
  return value
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSimpleArticle(
  draft: SimpleArticleDraft,
  candidate: EuropePmcResult,
  cluster: ResearchCluster,
): GeneratedArticle {
  const studyTitle = plainText(candidate.title) || `${cluster.label} research update`;
  const title = trimAtWordBoundary(
    studyTitle.length <= 68 ? `${studyTitle}: What the Study Found` : studyTitle,
    88,
  );
  const seoTitle = trimAtWordBoundary(`${title} | Evidence Review`, 70);
  const description = completeExcerpt(
    cleanGeneratedText(draft.answerSummary),
    170,
    "A concise evidence review explaining what a recent PubMed-indexed hair study found, what it cannot prove and the main limitations for UK readers.",
  );
  const excerpt = completeExcerpt(
    cleanGeneratedText(draft.answerSummary),
    260,
    "This research digest explains what the study examined, what the researchers reported, the important limitations and how UK readers can interpret the findings without overstating the evidence.",
  );
  const article: GeneratedArticle = {
    slug: slugify(title),
    title,
    seoTitle,
    description,
    excerpt,
    eyebrow: cluster.label.length <= 40 ? cluster.label : "Hair research review",
    answerSummary: cleanGeneratedText(draft.answerSummary),
    readTime: "5 min read",
    keywords: [
      cluster.label.toLowerCase(),
      "hair loss research",
      "UK hair research",
      "PubMed hair study",
      resultStudyDesign(candidate).toLowerCase(),
    ],
    keyTakeaways: draft.keyTakeaways.map(cleanGeneratedText),
    sections: simpleSectionHeadings.map((heading, index) => ({
      heading,
      paragraphs: splitSectionBody(cleanGeneratedText(draft.sectionBodies[index])),
    })),
    faq: simpleFaqQuestions.map((question, index) => ({
      question,
      answer: cleanGeneratedText(draft.faqAnswers[index]),
    })),
    studyDesign: resultStudyDesign(candidate),
  };
  article.readTime = `${Math.max(4, Math.ceil(wordCount(article) / 220))} min read`;
  return article;
}

function deterministicValidation(article: GeneratedArticle, existing: ExistingFingerprint[]) {
  const similarity = similarityToExisting(article, existing);
  if (similarity > 0.62) throw new Error(`Article too similar to existing content (${similarity.toFixed(2)})`);
  if (existing.some((item) => item.slug === article.slug)) throw new Error("Article slug already exists");
  return similarity;
}

async function existingFingerprints(): Promise<ExistingFingerprint[]> {
  const databaseExisting = await getAutomatedBlogFingerprints();
  return [
    ...databaseExisting,
    ...blogPosts.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      answerSummary: post.answerSummary,
      primaryPmid: post.primaryPmid,
      sections: post.sections,
    })),
  ];
}

async function unusedCandidates(
  cluster: ResearchCluster,
  existing: ExistingFingerprint[],
) {
  const attempted = await getAttemptedResearchIds();
  const usedPmids = new Set(
    [
      ...existing.map((item) => item.primaryPmid).filter(Boolean),
      ...attempted.pmids,
    ],
  );
  const usedDois = new Set(
    [
      ...existing.map((item) => item.primaryDoi?.toLowerCase()).filter(Boolean),
      ...attempted.dois,
    ],
  );
  return (await fetchPubMedCandidates(cluster)).filter((candidate) => {
    const candidateTitle = (candidate.title ?? "").toLowerCase();
    const isHairFocused =
      /\b(?:hair|alopecia|scalp|follicle|follicular|baldness|androgenetic)\b/.test(
        candidateTitle,
      );
    return (
      isHairFocused &&
      !usedPmids.has(candidate.pmid) &&
      (!candidate.doi || !usedDois.has(candidate.doi.toLowerCase()))
    );
  });
}

function selectFallbackResearchImage(
  article: GeneratedArticle,
  candidate: EuropePmcResult,
  researchTopic: string,
  usedSources: Set<string>,
): ResearchImageSelection | null {
  const context = [
    article.title,
    article.seoTitle,
    article.description,
    article.excerpt,
    article.keywords.join(" "),
    candidate.title,
    candidate.abstractText,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/\bashwagandha\b|\bwithania somnifera\b/.test(context)) {
    const image = {
      imageSrc: "/images/blog/ashwagandha-hair-loss-trial-2026.jpg",
      imageAlt:
        "Ashwagandha roots and leaves beside a research notebook, magnifying glass and natural hair strands",
      imagePosition: "center",
      metadata: {
        provider: "first-party",
        source: "/images/blog/ashwagandha-hair-loss-trial-2026.jpg",
        licence: "Site-owned asset",
        selection: "Subject-specific fallback",
      },
    } satisfies ResearchImageSelection;
    if (!usedSources.has(image.imageSrc)) return image;
  }

  if (
    /\bfemale pattern hair loss\b|\bfemale androgenetic alopecia\b|\bwomen with (?:pattern )?hair loss\b/.test(
      context,
    )
  ) {
    const image = {
      imageSrc:
        "/images/blog/prp-iprf-cgf-female-pattern-hair-loss.jpg",
      imageAlt:
        "Adult woman examining a widened central hair part in a calm research setting",
      imagePosition: "center",
      metadata: {
        provider: "first-party",
        source: "/images/blog/prp-iprf-cgf-female-pattern-hair-loss.jpg",
        licence: "Site-owned asset",
        selection: "Subject-specific fallback",
      },
    } satisfies ResearchImageSelection;
    if (!usedSources.has(image.imageSrc)) return image;
  }

  const generatedImageSrc = `/api/research-image?topic=${encodeURIComponent(researchTopic)}&seed=${encodeURIComponent(article.slug)}`;
  const neutralFallback = {
    imageSrc: generatedImageSrc,
    imageAlt: "Abstract editorial illustration of hair and laboratory research",
    imagePosition: "center",
    metadata: {
      provider: "first-party-generated",
      source: generatedImageSrc,
      licence: "Site-owned asset",
      selection: "Deterministic article-specific research fallback",
    },
  } satisfies ResearchImageSelection;
  return neutralFallback;
}

async function selectResearchImage(
  article: GeneratedArticle,
  candidate: EuropePmcResult,
  researchTopic: string,
) {
  const usedImages = await getUsedResearchImages();
  try {
    const licensedImage = await findFreeResearchImage(
      article,
      researchTopic,
      usedImages.ids,
      usedImages.sources,
    );
    if (licensedImage) return licensedImage;
  } catch (error) {
    console.warn("Free research image selection failed; using fallback", error);
  }

  const fallback = selectFallbackResearchImage(
    article,
    candidate,
    researchTopic,
    usedImages.sources,
  );
  if (fallback) return fallback;
  throw new Error(
    "No unused, relevant and licence-safe image was available for this article",
  );
}

function buildPost(
  article: GeneratedArticle,
  candidate: EuropePmcResult,
  cluster: ResearchCluster,
  image: ResearchImageSelection,
): BlogPost {
  const now = new Date().toISOString();
  return {
    ...article,
    publishedAt: now,
    updatedAt: now,
    sources: [
      {
        label: `PubMed: ${candidate.title}`,
        href: `https://pubmed.ncbi.nlm.nih.gov/${candidate.pmid}/`,
      },
      ...cluster.guidance.map((source) => ({
        label: source.label,
        href: source.href,
      })),
    ],
    relatedLinks: cluster.relatedLinks,
    imageSrc: image.imageSrc,
    imageAlt: image.imageAlt,
    imagePosition: image.imagePosition,
    imageCredit: image.credit,
    isResearchDigest: true,
    primaryPmid: candidate.pmid,
    studyDesign: article.studyDesign,
  };
}

function sourceMetadata(candidate: EuropePmcResult, cluster: ResearchCluster) {
  return {
    primaryStudy: {
      pmid: candidate.pmid,
      doi: candidate.doi,
      title: candidate.title,
      authors: candidate.authorString,
      journal: candidate.journalTitle,
      publicationDate: candidate.firstPublicationDate,
      publicationTypes: candidate.pubTypeList?.pubType,
    },
    guidance: cluster.guidance.map(({ label, href }) => ({ label, href })),
  };
}

export async function startResearchPublication(
  slot: Slot,
  options: { publicationDate?: string } = {},
) {
  const date = options.publicationDate ?? londonDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("publicationDate must use YYYY-MM-DD");
  }
  const documentId = `automated-blog-post.${date}.${slot}`;
  await ensureAutomatedBlogSchema();

  const existingDocument = await getPublishedPostForSlot(date, slot);
  if (existingDocument) {
    return {
      status: "already-published" as const,
      id: existingDocument.id,
      slug: existingDocument.slug,
    };
  }

  const activeJob = await getAutomationJobForSlot(date, slot);
  if (activeJob?.state === "generating") {
    return {
      status: "already-running" as const,
      id: documentId,
      responseId: activeJob.generationResponseId,
    };
  }
  if (activeJob?.state === "reviewing") {
    await failAutomationJob(
      date,
      slot,
      "Legacy multi-stage review job replaced by the single-stage publisher",
    );
  }
  if (activeJob?.state === "failed") {
    await archiveFailedAutomationJob(date, slot);
  } else if (activeJob?.state === "reviewing") {
    await archiveFailedAutomationJob(date, slot);
  }

  const claimed = await claimPublicationSlot(date, slot);
  if (!claimed) {
    const job = await getAutomationJobForSlot(date, slot);
    return {
      status: "already-running" as const,
      id: documentId,
      responseId:
        job?.state === "reviewing"
          ? job.reviewResponseId
          : job?.generationResponseId,
    };
  }

  try {
    const cluster = selectCluster(date, slot);
    const existing = await existingFingerprints();
    const candidates = await unusedCandidates(cluster, existing);
    const candidate = candidates[0];
    if (!candidate) {
      throw new Error("No unused PubMed candidate passed the source filters");
    }

    const request = articleRequest(candidate, cluster, existing);
    const response = await startBackgroundStructuredResponse(
      "research_article",
      simpleArticleSchema,
      request.instructions,
      request.input,
      "none",
      ARTICLE_MAX_OUTPUT_TOKENS,
      { model: contentWriterModel() },
    );
    await createAutomationJob({
      publicationDate: date,
      slot,
      candidate,
      clusterId: cluster.id,
      generationResponseId: response.id,
      generationAttempts: 1,
    });

    return {
      status: "generation-started" as const,
      id: documentId,
      responseId: response.id,
      pmid: candidate.pmid,
      strategy: "single-draft" as const,
    };
  } catch (error) {
    await failPublicationSlot(
      date,
      slot,
      error instanceof Error ? error.message : "Unknown publishing failure",
    );
    throw error;
  }
}

export async function processCompletedResearchResponse(responseId: string) {
  const job = await getAutomationJobByResponseId(responseId);
  if (!job) return { status: "untracked-response" as const };

  if (job.state === "published") {
    const existing = await getPublishedPostForSlot(
      job.publicationDate,
      job.slot,
    );
    return existing
      ? { status: "already-published" as const, slug: existing.slug }
      : { status: "published-record-missing" as const };
  }

  const candidate = job.candidate as EuropePmcResult;
  const cluster = clusters.find((item) => item.id === job.clusterId);
  if (!cluster) {
    await failAutomationJob(
      job.publicationDate,
      job.slot,
      `Unknown research cluster: ${job.clusterId}`,
    );
    return { status: "failed" as const };
  }

  try {
    if (
      (job.state === "generating" ||
        job.state === "reviewing" ||
        job.state === "failed") &&
      job.generationResponseId === responseId
    ) {
      const draft = validateSimpleArticleDraft(
        normaliseLegacyArticleDraft(
          await retrieveStructuredResponse<SimpleArticleDraft>(responseId),
        ),
      );
      const article = buildSimpleArticle(draft, candidate, cluster);
      const existing = await existingFingerprints();
      const similarity = deterministicValidation(article, existing);
      const preflight = editorialPreflight(article);
      if (
        !preflight.wordCountWithinRange ||
        preflight.incompleteProseFields.length > 0 ||
        preflight.potentialPromotionalClaim
      ) {
        const reason = `Deterministic quality check failed: ${preflight.articleWords} words; incomplete fields: ${preflight.incompleteProseFields.join(", ") || "none"}; prohibited claim: ${preflight.potentialPromotionalClaim ?? "none"}`;
        await failAutomationJob(job.publicationDate, job.slot, reason);
        return { status: "failed" as const, error: reason };
      }

      const image =
        curatedLegacyImages[responseId] ??
        (await selectResearchImage(article, candidate, cluster.id));
      const post = buildPost(article, candidate, cluster, image);
      const documentId = `automated-blog-post.${job.publicationDate}.${job.slot}`;
      await saveAutomatedBlogPost({
        id: documentId,
        publicationDate: job.publicationDate,
        slot: job.slot,
        post,
        primaryPmid: candidate.pmid!,
        primaryDoi: candidate.doi,
        researchTopic: cluster.id,
        generationModel: contentWriterModel(),
        qualityScore: 90,
        similarityScore: Number(similarity.toFixed(3)),
        sourceMetadata: sourceMetadata(candidate, cluster),
        imageMetadata: image.metadata,
      });
      await markAutomationJobPublished(job.publicationDate, job.slot);
      return {
        status: "published" as const,
        slug: post.slug,
        qualityScore: 90,
      };
    }

    return { status: "ignored" as const };
  } catch (error) {
    const reason =
      error instanceof Error ? error.message : "Unknown asynchronous failure";
    await failAutomationJob(job.publicationDate, job.slot, reason);
    return { status: "failed" as const, error: reason };
  }
}

async function recoverAutomationJob(job: AutomationJob) {
  const responseId = job.generationResponseId;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const response = await fetch(
    `https://api.openai.com/v1/responses/${encodeURIComponent(responseId)}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    },
  );
  const payload = (await response.json()) as { status?: string };
  if (!response.ok) {
    throw new Error(
      `OpenAI recovery lookup failed (${response.status}): ${JSON.stringify(payload).slice(0, 500)}`,
    );
  }
  if (payload.status === "queued" || payload.status === "in_progress") {
    return { status: "still-running" as const, responseId };
  }
  return processCompletedResearchResponse(responseId);
}

export async function recoverStaleResearchJobs() {
  await ensureAutomatedBlogSchema();
  const jobs = await getStaleAutomationJobs();
  const results = [];
  for (const job of jobs) {
    try {
      results.push({
        publicationDate: job.publicationDate,
        slot: job.slot,
        result: await recoverAutomationJob(job),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown recovery failure";
      await failAutomationJob(job.publicationDate, job.slot, message);
      results.push({
        publicationDate: job.publicationDate,
        slot: job.slot,
        result: { status: "failed" as const, error: message },
      });
    }
  }
  return results;
}

export async function publishResearchArticle(
  slot: Slot,
  options: { dryRun?: boolean; publicationDate?: string } = {},
) {
  const date = options.publicationDate ?? londonDate();
  const documentId = `automated-blog-post.${date}.${slot}`;
  const isDryRun = Boolean(options.dryRun);

  if (!isDryRun) {
    await ensureAutomatedBlogSchema();
    const existingDocument = await getPublishedPostForSlot(date, slot);
    if (existingDocument) {
      return {
        status: "already-published" as const,
        id: existingDocument.id,
        slug: existingDocument.slug,
      };
    }
    const claimed = await claimPublicationSlot(date, slot);
    if (!claimed) {
      return { status: "already-running" as const, id: documentId };
    }
  }

  try {
    const cluster = selectCluster(date, slot);
    const existing = await existingFingerprints();
    const candidates = await unusedCandidates(cluster, existing);
    const candidate = candidates[0];
    if (!candidate) {
      throw new Error("No unused PubMed candidate passed the source filters");
    }

    const draft = await generateArticle(candidate, cluster, existing);
    const article = buildSimpleArticle(draft, candidate, cluster);
    const similarity = deterministicValidation(article, existing);
    const preflight = editorialPreflight(article);
    if (
      !preflight.wordCountWithinRange ||
      preflight.incompleteProseFields.length > 0 ||
      preflight.potentialPromotionalClaim
    ) {
      throw new Error(
        `Deterministic quality check failed: ${preflight.articleWords} words`,
      );
    }

    const image = await selectResearchImage(article, candidate, cluster.id);
    const post = buildPost(article, candidate, cluster, image);
    const record = {
      id: documentId,
      publicationDate: date,
      slot,
      post,
      primaryPmid: candidate.pmid!,
      primaryDoi: candidate.doi,
      researchTopic: cluster.id,
      generationModel: contentWriterModel(),
      qualityScore: 90,
      similarityScore: Number(similarity.toFixed(3)),
      sourceMetadata: sourceMetadata(candidate, cluster),
      imageMetadata: image.metadata,
    };

    if (!isDryRun) {
      await saveAutomatedBlogPost(record);
    }

    return {
      status: isDryRun ? ("dry-run" as const) : ("published" as const),
      id: documentId,
      slug: article.slug,
      title: article.title,
      pmid: candidate.pmid,
      qualityScore: 90,
      similarityScore: similarity,
      record: isDryRun ? record : undefined,
    };
  } catch (error) {
    if (!isDryRun) {
      await failPublicationSlot(
        date,
        slot,
        error instanceof Error ? error.message : "Unknown publishing failure",
      );
    }
    throw error;
  }
}

export function isResearchSlot(value: string | null): value is Slot {
  return value === "morning" || value === "afternoon";
}
