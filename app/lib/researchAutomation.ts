import "server-only";

import { blogPosts, type BlogPost, type BlogSource } from "@/app/lib/blogContent";
import {
  type AutomationJob,
  claimPublicationSlot,
  createAutomationJob,
  ensureAutomatedBlogSchema,
  failAutomationJob,
  failPublicationSlot,
  getAutomationJobByResponseId,
  getAutomationJobForSlot,
  getAutomatedBlogFingerprints,
  getPublishedPostForSlot,
  getStaleAutomationJobs,
  getUsedOpenverseImageIds,
  markAutomationJobPublished,
  markAutomationJobRepairing,
  markAutomationJobReviewing,
  restartAutomationJobGeneration,
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

type ArticleRepair = {
  title: string | null;
  seoTitle: string | null;
  description: string | null;
  excerpt: string | null;
  eyebrow: string | null;
  answerSummary: string | null;
  readTime: string | null;
  keywords: string[] | null;
  keyTakeaways: string[] | null;
  studyDesign: string | null;
  sections: Array<{
    index: number;
    heading: string | null;
    paragraphs: string[] | null;
    bullets: string[] | null;
  }>;
  faq: Array<{
    index: number;
    question: string | null;
    answer: string | null;
  }>;
};

class FatalAutomationError extends Error {}

const ARTICLE_MAX_OUTPUT_TOKENS = 5000;
const REVIEW_MAX_OUTPUT_TOKENS = 1400;
const REPAIR_MAX_OUTPUT_TOKENS = 1800;

const nhsHairLoss: GuidanceSource = {
  label: "NHS: Hair loss",
  href: "https://www.nhs.uk/symptoms/hair-loss/",
  note: "UK patient guidance on common causes of hair loss, when to see a GP, and the limits of treatment claims.",
};

const nhsHairTransplant: GuidanceSource = {
  label: "NHS: Hair transplant",
  href: "https://www.nhs.uk/tests-and-treatments/cosmetic-procedures/cosmetic-surgery/hair-transplant/",
  note: "UK patient guidance on suitability, procedure basics, recovery, risks, and choosing a qualified surgeon.",
};

const badAlopecia: GuidanceSource = {
  label: "British Association of Dermatologists: Alopecia areata",
  href: "https://www.bad.org.uk/pils/alopecia-areata",
  note: "UK dermatologist-authored patient information on alopecia areata, diagnosis, course, and treatment options.",
};

const badFemalePattern: GuidanceSource = {
  label: "British Association of Dermatologists: Female pattern hair loss",
  href: "https://www.bad.org.uk/pils/hair-loss-female-pattern-androgenetic-alopecia",
  note: "UK dermatologist-authored patient information on female pattern hair loss and management considerations.",
};

const cochraneAlopecia: GuidanceSource = {
  label: "Cochrane: Treatments for alopecia areata",
  href: "https://www.cochrane.org/evidence/CD013719_what-are-benefits-and-risks-different-treatments-alopecia-areata-hair-loss",
  note: "Independent systematic-review summary of benefits, harms, and certainty of evidence for alopecia areata treatments.",
};

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
      { href: "/female-hair-transplant-london", label: "Female hair transplant", description: "Read about suitability and planning for female-pattern concerns." },
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
    throw new Error(
      `OpenAI response was incomplete${response.incomplete_details?.reason ? `: ${response.incomplete_details.reason}` : ""}`,
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
  reasoningEffort: "low" | "medium" = "medium",
  maxOutputTokens = ARTICLE_MAX_OUTPUT_TOKENS,
): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const model = process.env.OPENAI_CONTENT_MODEL || "gpt-6-luna";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      reasoning: { effort: reasoningEffort },
      instructions,
      input,
      store: false,
      max_output_tokens: maxOutputTokens,
      text: { format: { type: "json_schema", name, strict: true, schema } },
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
  return JSON.parse(text) as T;
}

async function startBackgroundStructuredResponse(
  name: string,
  schema: Record<string, unknown>,
  instructions: string,
  input: string,
  reasoningEffort: "low" | "medium" = "medium",
  maxOutputTokens = ARTICLE_MAX_OUTPUT_TOKENS,
) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const model = process.env.OPENAI_CONTENT_MODEL || "gpt-6-luna";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      reasoning: { effort: reasoningEffort },
      instructions,
      input,
      background: true,
      store: true,
      max_output_tokens: maxOutputTokens,
      text: { format: { type: "json_schema", name, strict: true, schema } },
    }),
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
  return JSON.parse(text) as T;
}

const articleSchema = {
  type: "object",
  additionalProperties: false,
  required: ["slug", "title", "seoTitle", "description", "excerpt", "eyebrow", "answerSummary", "readTime", "keywords", "keyTakeaways", "sections", "faq", "studyDesign"],
  properties: {
    slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    title: { type: "string", minLength: 30, maxLength: 90 },
    seoTitle: { type: "string", minLength: 30, maxLength: 70 },
    description: { type: "string", minLength: 90, maxLength: 170 },
    excerpt: { type: "string", minLength: 80, maxLength: 260 },
    eyebrow: { type: "string", minLength: 3, maxLength: 40 },
    answerSummary: { type: "string", minLength: 140, maxLength: 450 },
    readTime: { type: "string", pattern: "^[0-9]+ min read$" },
    keywords: { type: "array", minItems: 4, maxItems: 8, items: { type: "string" } },
    keyTakeaways: { type: "array", minItems: 3, maxItems: 5, items: { type: "string", minLength: 25, maxLength: 160 } },
    sections: { type: "array", minItems: 7, maxItems: 8, items: { type: "object", additionalProperties: false, required: ["heading", "paragraphs", "bullets"], properties: { heading: { type: "string", minLength: 8, maxLength: 90 }, paragraphs: { type: "array", minItems: 2, maxItems: 3, items: { type: "string", minLength: 80, maxLength: 700 } }, bullets: { type: "array", maxItems: 4, items: { type: "string", minLength: 15, maxLength: 160 } } } } },
    faq: { type: "array", minItems: 3, maxItems: 4, items: { type: "object", additionalProperties: false, required: ["question", "answer"], properties: { question: { type: "string", minLength: 15, maxLength: 110 }, answer: { type: "string", minLength: 100, maxLength: 400 } } } },
    studyDesign: { type: "string", minLength: 3, maxLength: 100 },
  },
} as const;

function articleRequest(
  candidate: EuropePmcResult,
  cluster: ResearchCluster,
  existing: ExistingFingerprint[],
) {
  const types = resultStudyDesign(candidate);
  const allowedSources = [
    { label: `PubMed: ${candidate.title}`, href: `https://pubmed.ncbi.nlm.nih.gov/${candidate.pmid}/`, note: plainText(candidate.abstractText) },
    ...cluster.guidance,
  ];
  const existingContext = existing.slice(0, 120).map((item) => ({ title: item.title, slug: item.slug, topic: item.researchTopic }));
  return {
    instructions: `You are the evidence-led editorial writer for UK Hair Transplant, a UK referral and patient-information service, not a clinic. Today's date is ${londonDate()}. Write in clear British English. Return only the requested JSON object. Return plain text inside every JSON string: never include HTML, Markdown, XML, encoded tags, drafting notes, commentary, or text outside the JSON object. Synthesize; never copy, translate, or closely paraphrase an abstract. Every factual medical claim must be supported by the supplied evidence. Clearly distinguish association from causation, relative from absolute effects, and study results from established guidance. Include the study population, design, main finding, limitations, practical meaning, UK context, and when a reader should seek qualified medical advice. Do not diagnose, prescribe, promise results, call a treatment safe, superior, guaranteed, risk-free, or suitable for everyone. Do not imply clinician review. Do not invent statistics, institutions, quotations, sources, or conclusions. Do not add general medical advice beyond the supplied study and guidance notes. Mention uncertainty prominently. The article must be useful on its own, answer a real search question, avoid sensationalism, and contain roughly 1,000-1,400 words. Finish every field, bullet, and sentence completely. Use only the evidence supplied.`,
    input: JSON.stringify({
      assignment: { cluster: cluster.label, studyDesign: types, requiredAngle: "Explain what this new research adds, what it does not prove, and how a UK reader should interpret it." },
      primaryStudy: { pmid: candidate.pmid, doi: candidate.doi, title: candidate.title, authors: candidate.authorString, journal: candidate.journalTitle, publicationDate: candidate.firstPublicationDate, publicationTypes: candidate.pubTypeList?.pubType, abstract: plainText(candidate.abstractText) },
      independentGuidance: cluster.guidance,
      allowedSources,
      existingArticlesToAvoidDuplicating: existingContext,
      requiredSections: ["Direct answer", "What the study examined", "What the researchers found", "Important limitations", "How this fits with independent UK guidance", "What this may mean for patients", "When to seek professional advice"],
    }),
  };
}

async function generateArticle(
  candidate: EuropePmcResult,
  cluster: ResearchCluster,
  existing: ExistingFingerprint[],
) {
  const request = articleRequest(candidate, cluster, existing);
  return structuredResponse<GeneratedArticle>(
    "research_article",
    articleSchema,
    request.instructions,
    request.input,
  );
}

function resultStudyDesign(candidate: EuropePmcResult) {
  const types = candidate.pubTypeList?.pubType ?? [];
  return types.find((type) => preferredPublicationTypes.includes(type.toLowerCase())) ?? types[0] ?? "PubMed-indexed journal article";
}

const reviewSchema = {
  type: "object",
  additionalProperties: false,
  required: ["approved", "evidenceScore", "medicalSafetyScore", "originalityScore", "seoUsefulnessScore", "issues"],
  properties: {
    approved: { type: "boolean" },
    evidenceScore: { type: "integer", minimum: 0, maximum: 100 },
    medicalSafetyScore: { type: "integer", minimum: 0, maximum: 100 },
    originalityScore: { type: "integer", minimum: 0, maximum: 100 },
    seoUsefulnessScore: { type: "integer", minimum: 0, maximum: 100 },
    issues: { type: "array", maxItems: 12, items: { type: "string" } },
  },
} as const;

const nullableShortString = {
  type: ["string", "null"],
  maxLength: 700,
} as const;

const repairSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "title",
    "seoTitle",
    "description",
    "excerpt",
    "eyebrow",
    "answerSummary",
    "readTime",
    "keywords",
    "keyTakeaways",
    "studyDesign",
    "sections",
    "faq",
  ],
  properties: {
    title: nullableShortString,
    seoTitle: nullableShortString,
    description: nullableShortString,
    excerpt: nullableShortString,
    eyebrow: nullableShortString,
    answerSummary: nullableShortString,
    readTime: nullableShortString,
    keywords: {
      type: ["array", "null"],
      maxItems: 8,
      items: { type: "string", maxLength: 100 },
    },
    keyTakeaways: {
      type: ["array", "null"],
      maxItems: 5,
      items: { type: "string", maxLength: 180 },
    },
    studyDesign: nullableShortString,
    sections: {
      type: "array",
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["index", "heading", "paragraphs", "bullets"],
        properties: {
          index: { type: "integer", minimum: 0, maximum: 7 },
          heading: nullableShortString,
          paragraphs: {
            type: ["array", "null"],
            maxItems: 3,
            items: { type: "string", maxLength: 700 },
          },
          bullets: {
            type: ["array", "null"],
            maxItems: 4,
            items: { type: "string", maxLength: 180 },
          },
        },
      },
    },
    faq: {
      type: "array",
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["index", "question", "answer"],
        properties: {
          index: { type: "integer", minimum: 0, maximum: 3 },
          question: nullableShortString,
          answer: nullableShortString,
        },
      },
    },
  },
} as const;

type AutomatedReview = { approved: boolean; evidenceScore: number; medicalSafetyScore: number; originalityScore: number; seoUsefulnessScore: number; issues: string[] };

function repairRequest(
  article: GeneratedArticle,
  review: AutomatedReview,
  candidate: EuropePmcResult,
  cluster: ResearchCluster,
) {
  return {
    instructions:
      `Repair only the fields identified by the quality review. Return only the requested JSON repair object. Use null for every unchanged scalar or array field and omit unchanged sections and FAQs from their repair arrays. Preserve all compliant wording. Replace corrupted, truncated, unsupported, or malformed text with complete British English supported strictly by the supplied evidence. Do not add new medical claims, statistics, sources, HTML, Markdown, drafting notes, or commentary. Keep repaired values within the original field limits.`,
    input: JSON.stringify({
      qualityReviewIssues: review.issues,
      article,
      primaryStudy: {
        title: candidate.title,
        authors: candidate.authorString,
        journal: candidate.journalTitle,
        publicationDate: candidate.firstPublicationDate,
        doi: candidate.doi,
        abstract: plainText(candidate.abstractText),
        publicationTypes: candidate.pubTypeList?.pubType,
      },
      independentGuidance: cluster.guidance,
    }),
  };
}

function applyArticleRepair(
  article: GeneratedArticle,
  repair: ArticleRepair,
): GeneratedArticle {
  const sectionRepairs = new Map(repair.sections.map((item) => [item.index, item]));
  const faqRepairs = new Map(repair.faq.map((item) => [item.index, item]));
  return {
    ...article,
    title: repair.title ?? article.title,
    seoTitle: repair.seoTitle ?? article.seoTitle,
    description: repair.description ?? article.description,
    excerpt: repair.excerpt ?? article.excerpt,
    eyebrow: repair.eyebrow ?? article.eyebrow,
    answerSummary: repair.answerSummary ?? article.answerSummary,
    readTime: repair.readTime ?? article.readTime,
    keywords: repair.keywords ?? article.keywords,
    keyTakeaways: repair.keyTakeaways ?? article.keyTakeaways,
    studyDesign: repair.studyDesign ?? article.studyDesign,
    sections: article.sections.map((section, index) => {
      const item = sectionRepairs.get(index);
      return item
        ? {
            ...section,
            heading: item.heading ?? section.heading,
            paragraphs: item.paragraphs ?? section.paragraphs,
            bullets: item.bullets ?? section.bullets,
          }
        : section;
    }),
    faq: article.faq.map((item, index) => {
      const replacement = faqRepairs.get(index);
      return replacement
        ? {
            ...item,
            question: replacement.question ?? item.question,
            answer: replacement.answer ?? item.answer,
          }
        : item;
    }),
  };
}

async function reviewArticle(article: GeneratedArticle, candidate: EuropePmcResult, cluster: ResearchCluster) {
  const request = reviewRequest(article, candidate, cluster);
  return structuredResponse<AutomatedReview>(
    "article_quality_review",
    reviewSchema,
    request.instructions,
    request.input,
    "low",
    REVIEW_MAX_OUTPUT_TOKENS,
  );
}

function reviewRequest(
  article: GeneratedArticle,
  candidate: EuropePmcResult,
  cluster: ResearchCluster,
) {
  return {
    instructions:
      `Act as a strict UK medical-content fact checker and SEO quality editor. Today's date is ${londonDate()}. Approve only when all medical claims are traceable to the supplied study metadata, abstract, or guidance notes, uncertainty and limitations are prominent, no diagnosis/prescription/guarantee is made, the piece is genuinely useful and non-duplicative, and there is no invented statistic, source, quote, registration, or clinical-review claim. Treat the supplied current date as authoritative when checking publication dates. Any unsupported medical claim means approved=false. Scores below 82 in any category mean approved=false.`,
    input: JSON.stringify({
      publisherContext: "UK Hair Transplant is a UK referral and patient-information service, not a clinic.",
      article,
      primaryStudy: {
        title: candidate.title,
        authors: candidate.authorString,
        journal: candidate.journalTitle,
        publicationDate: candidate.firstPublicationDate,
        doi: candidate.doi,
        abstract: plainText(candidate.abstractText),
        publicationTypes: candidate.pubTypeList?.pubType,
      },
      independentGuidance: cluster.guidance,
    }),
  };
}

function wordCount(article: GeneratedArticle) {
  return article.sections.flatMap((section) => section.paragraphs).join(" ").split(/\s+/).filter(Boolean).length;
}

function deterministicValidation(article: GeneratedArticle, existing: ExistingFingerprint[]) {
  const count = wordCount(article);
  const similarity = similarityToExisting(article, existing);
  // Match promotional claims, while allowing safety language such as
  // "results are not guaranteed" or "no treatment is risk-free".
  const forbidden =
    /\b(?:guaranteed results?|results? (?:are|is) guaranteed|risk[- ]free treatment|100% (?:safe|effective|success)|clinically proven to|the best treatment|completely safe)\b/i;
  const allText = JSON.stringify(article);
  if (count < 900) throw new Error(`Article too short (${count} words)`);
  if (similarity > 0.62) throw new Error(`Article too similar to existing content (${similarity.toFixed(2)})`);
  if (forbidden.test(allText)) throw new Error("Article contains a prohibited claim");
  if (/<\/?[a-z][^>]*>/i.test(allText)) throw new Error("Article contains HTML markup");
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
  const usedPmids = new Set(
    existing.map((item) => item.primaryPmid).filter(Boolean),
  );
  const usedDois = new Set(
    existing.map((item) => item.primaryDoi?.toLowerCase()).filter(Boolean),
  );
  return (await fetchPubMedCandidates(cluster)).filter(
    (candidate) =>
      !usedPmids.has(candidate.pmid) &&
      (!candidate.doi || !usedDois.has(candidate.doi.toLowerCase())),
  );
}

function selectFallbackResearchImage(
  article: GeneratedArticle,
  candidate: EuropePmcResult,
): ResearchImageSelection {
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
    return {
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
    };
  }

  if (
    /\bfemale pattern hair loss\b|\bfemale androgenetic alopecia\b|\bwomen with (?:pattern )?hair loss\b/.test(
      context,
    )
  ) {
    return {
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
    };
  }

  return {
    imageSrc: "/images/blog/hair-research-editorial.jpg",
    imageAlt:
      "Natural hair strands examined with a magnifying glass beside a research notebook and microscope",
    imagePosition: "center",
    metadata: {
      provider: "first-party",
      source: "/images/blog/hair-research-editorial.jpg",
      licence: "Site-owned asset",
      selection: "Neutral research fallback",
    },
  };
}

async function selectResearchImage(
  article: GeneratedArticle,
  candidate: EuropePmcResult,
  researchTopic: string,
) {
  try {
    const usedOpenverseIds = await getUsedOpenverseImageIds();
    return (
      (await findFreeResearchImage(article, researchTopic, usedOpenverseIds)) ??
      selectFallbackResearchImage(article, candidate)
    );
  } catch (error) {
    console.warn("Free research image selection failed; using fallback", error);
    return selectFallbackResearchImage(article, candidate);
  }
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
  if (activeJob?.state === "generating" || activeJob?.state === "reviewing") {
    return {
      status: "already-running" as const,
      id: documentId,
      responseId:
        activeJob.state === "reviewing"
          ? activeJob.reviewResponseId
          : activeJob.generationResponseId,
    };
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
    const candidate = (await unusedCandidates(cluster, existing))[0];
    if (!candidate) {
      throw new Error("No unused PubMed candidate passed the source filters");
    }

    const request = articleRequest(candidate, cluster, existing);
    const response = await startBackgroundStructuredResponse(
      "research_article",
      articleSchema,
      request.instructions,
      request.input,
      "low",
    );
    await createAutomationJob({
      publicationDate: date,
      slot,
      candidate,
      clusterId: cluster.id,
      generationResponseId: response.id,
    });

    return {
      status: "generation-started" as const,
      id: documentId,
      responseId: response.id,
      pmid: candidate.pmid,
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

async function retryWithNextCandidate(
  job: AutomationJob,
  cluster: ResearchCluster,
  reason: string,
) {
  if (job.attemptedPmids.length >= 2) {
    await failAutomationJob(job.publicationDate, job.slot, reason);
    return { status: "failed" as const, error: reason };
  }

  const existing = await existingFingerprints();
  const attempted = new Set(job.attemptedPmids);
  const candidate = (await unusedCandidates(cluster, existing)).find(
    (item) => item.pmid && !attempted.has(item.pmid),
  );
  if (!candidate) {
    await failAutomationJob(
      job.publicationDate,
      job.slot,
      `${reason}; no further unused candidate was available`,
    );
    return { status: "failed" as const, error: reason };
  }

  const request = articleRequest(candidate, cluster, existing);
  const response = await startBackgroundStructuredResponse(
    "research_article",
    articleSchema,
    request.instructions,
    request.input,
    "low",
  );
  const restarted = await restartAutomationJobGeneration({
    publicationDate: job.publicationDate,
    slot: job.slot,
    candidate,
    generationResponseId: response.id,
    reason,
  });
  return {
    status: restarted ? ("generation-retried" as const) : ("ignored" as const),
    responseId: response.id,
    pmid: candidate.pmid,
  };
}

export async function processCompletedResearchResponse(responseId: string) {
  const job = await getAutomationJobByResponseId(responseId);
  if (!job) return { status: "untracked-response" as const };

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
      job.state === "generating" &&
      job.generationResponseId === responseId
    ) {
      const article =
        job.repairAttempts > 0 && job.draft
          ? applyArticleRepair(
              job.draft as GeneratedArticle,
              await retrieveStructuredResponse<ArticleRepair>(responseId),
            )
          : await retrieveStructuredResponse<GeneratedArticle>(responseId);
      const existing = await existingFingerprints();
      const similarity = deterministicValidation(article, existing);
      const request = reviewRequest(article, candidate, cluster);
      const reviewResponse = await startBackgroundStructuredResponse(
        "article_quality_review",
        reviewSchema,
        request.instructions,
        request.input,
        "low",
        REVIEW_MAX_OUTPUT_TOKENS,
      );
      const advanced = await markAutomationJobReviewing({
        publicationDate: job.publicationDate,
        slot: job.slot,
        draft: article,
        similarityScore: similarity,
        reviewResponseId: reviewResponse.id,
      });
      return {
        status: advanced ? ("review-started" as const) : ("ignored" as const),
        responseId: reviewResponse.id,
      };
    }

    if (
      job.state === "reviewing" &&
      job.reviewResponseId === responseId &&
      job.draft
    ) {
      const review = await retrieveStructuredResponse<AutomatedReview>(
        responseId,
      );
      const minimumScore = Math.min(
        review.evidenceScore,
        review.medicalSafetyScore,
        review.originalityScore,
        review.seoUsefulnessScore,
      );
      if (!review.approved || minimumScore < 82) {
        const rejectionReason = `Automated review rejected: ${review.issues.join("; ")}`;
        if (job.repairAttempts < 1) {
          const request = repairRequest(
            job.draft as GeneratedArticle,
            review,
            candidate,
            cluster,
          );
          const repairResponse = await startBackgroundStructuredResponse(
            "article_repair",
            repairSchema,
            request.instructions,
            request.input,
            "low",
            REPAIR_MAX_OUTPUT_TOKENS,
          );
          const repairing = await markAutomationJobRepairing({
            publicationDate: job.publicationDate,
            slot: job.slot,
            repairResponseId: repairResponse.id,
            expectedReviewResponseId: responseId,
            reason: rejectionReason,
          });
          return {
            status: repairing ? ("repair-started" as const) : ("ignored" as const),
            responseId: repairResponse.id,
          };
        }
        return retryWithNextCandidate(
          job,
          cluster,
          rejectionReason,
        );
      }

      const article = job.draft as GeneratedArticle;
      const image = await selectResearchImage(article, candidate, cluster.id);
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
        generationModel: process.env.OPENAI_CONTENT_MODEL || "gpt-6-luna",
        qualityScore: minimumScore,
        similarityScore: Number((job.similarityScore ?? 0).toFixed(3)),
        sourceMetadata: sourceMetadata(candidate, cluster),
        imageMetadata: image.metadata,
      });
      await markAutomationJobPublished(job.publicationDate, job.slot);
      return {
        status: "published" as const,
        slug: post.slug,
        qualityScore: minimumScore,
      };
    }

    return { status: "ignored" as const };
  } catch (error) {
    return retryWithNextCandidate(
      job,
      cluster,
      error instanceof Error ? error.message : "Unknown asynchronous failure",
    );
  }
}

async function recoverAutomationJob(job: AutomationJob) {
  const responseId =
    job.state === "reviewing" && job.reviewResponseId
      ? job.reviewResponseId
      : job.generationResponseId;
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

export async function publishResearchArticle(slot: Slot, options: { dryRun?: boolean } = {}) {
  const date = londonDate();
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
    const failures: string[] = [];

    for (const candidate of candidates.slice(0, 4)) {
      try {
        const article = await generateArticle(candidate, cluster, existing);
        const similarity = deterministicValidation(article, existing);
        const review = await reviewArticle(article, candidate, cluster);
        const minimumScore = Math.min(
          review.evidenceScore,
          review.medicalSafetyScore,
          review.originalityScore,
          review.seoUsefulnessScore,
        );
        if (!review.approved || minimumScore < 82) {
          throw new Error(
            `Automated review rejected: ${review.issues.join("; ")}`,
          );
        }

        const image = await selectResearchImage(article, candidate, cluster.id);
        const post = buildPost(article, candidate, cluster, image);

        if (!isDryRun) {
          await saveAutomatedBlogPost({
            id: documentId,
            publicationDate: date,
            slot,
            post,
            primaryPmid: candidate.pmid!,
            primaryDoi: candidate.doi,
            researchTopic: cluster.id,
            generationModel: process.env.OPENAI_CONTENT_MODEL || "gpt-6-luna",
            qualityScore: minimumScore,
            similarityScore: Number(similarity.toFixed(3)),
            sourceMetadata: sourceMetadata(candidate, cluster),
            imageMetadata: image.metadata,
          });
        }

        return {
          status: isDryRun ? ("dry-run" as const) : ("published" as const),
          id: documentId,
          slug: article.slug,
          title: article.title,
          pmid: candidate.pmid,
          qualityScore: minimumScore,
          similarityScore: similarity,
        };
      } catch (error) {
        if (error instanceof FatalAutomationError) throw error;
        failures.push(
          `${candidate.pmid ?? "unknown"}: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }

    throw new Error(
      `No candidate passed the automated publishing gates. ${failures.join(" | ").slice(0, 1800)}`,
    );
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
