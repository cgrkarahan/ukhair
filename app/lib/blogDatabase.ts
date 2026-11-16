import "server-only";

import { neon } from "@neondatabase/serverless";
import type { BlogPost } from "@/app/lib/blogContent";

export type AutomatedBlogFingerprint = {
  title?: string;
  slug?: string;
  excerpt?: string;
  answerSummary?: string;
  primaryPmid?: string;
  primaryDoi?: string;
  researchTopic?: string;
  sections?: Array<{ paragraphs?: string[] }>;
};

type PublicationSlot = "morning" | "afternoon";

export type AutomationJobState =
  | "generating"
  | "reviewing"
  | "failed"
  | "published";

export type AutomationJob = {
  publicationDate: string;
  slot: PublicationSlot;
  state: AutomationJobState;
  candidate: unknown;
  clusterId: string;
  draft: unknown | null;
  generationResponseId: string;
  reviewResponseId: string | null;
  similarityScore: number | null;
  attemptedPmids: string[];
};

type StoredPostRow = {
  content: BlogPost | string;
};

type StoredFingerprintRow = {
  content: BlogPost | string;
  primary_pmid: string;
  primary_doi: string | null;
  research_topic: string;
};

type StoredImageMetadataRow = {
  openverse_id: string | null;
};

type StoredSlotRow = {
  status: "running" | "failed" | "published";
  post_id: string | null;
};

type StoredAutomationJobRow = {
  publication_date: string;
  slot: PublicationSlot;
  state: AutomationJobState;
  candidate: unknown | string;
  cluster_id: string;
  draft: unknown | string | null;
  generation_response_id: string;
  review_response_id: string | null;
  similarity_score: number | null;
  attempted_pmids: string[];
};

export type AutomatedPostRecord = {
  id: string;
  publicationDate: string;
  slot: PublicationSlot;
  post: BlogPost;
  primaryPmid: string;
  primaryDoi?: string;
  researchTopic: string;
  generationModel: string;
  qualityScore: number;
  similarityScore: number;
  sourceMetadata: unknown;
  imageMetadata: unknown;
};

let databaseClient: ReturnType<typeof neon> | null = null;

const automatedImageCorrections: Record<
  string,
  Pick<BlogPost, "imageSrc" | "imageAlt" | "imagePosition">
> = {
  "prp-iprf-cgf-female-pattern-hair-loss-trial": {
    imageSrc: "/images/blog/prp-iprf-cgf-female-pattern-hair-loss.jpg",
    imageAlt:
      "Adult woman examining a widened central hair part in a calm research setting",
    imagePosition: "center",
  },
  "ashwagandha-hair-loss-trial-2026": {
    imageSrc: "/images/blog/ashwagandha-hair-loss-trial-2026.jpg",
    imageAlt:
      "Ashwagandha roots and leaves beside a research notebook, magnifying glass and natural hair strands",
    imagePosition: "center",
  },
};

function connectionString() {
  return process.env.DATABASE_URL?.trim() || null;
}

function database() {
  const url = connectionString();
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }

  databaseClient ??= neon(url);
  return databaseClient;
}

function parseContent(value: BlogPost | string): BlogPost {
  const post = typeof value === "string" ? (JSON.parse(value) as BlogPost) : value;
  const correction = automatedImageCorrections[post.slug];
  return correction ? { ...post, ...correction } : post;
}

function parseJsonValue<T>(value: T | string): T {
  return typeof value === "string" ? (JSON.parse(value) as T) : value;
}

function mapAutomationJob(row: StoredAutomationJobRow): AutomationJob {
  return {
    publicationDate: row.publication_date,
    slot: row.slot,
    state: row.state,
    candidate: parseJsonValue(row.candidate),
    clusterId: row.cluster_id,
    draft: row.draft === null ? null : parseJsonValue(row.draft),
    generationResponseId: row.generation_response_id,
    reviewResponseId: row.review_response_id,
    similarityScore: row.similarity_score,
    attemptedPmids: row.attempted_pmids ?? [],
  };
}

async function automatedBlogTableExists() {
  const rows = (await database()`
    SELECT to_regclass('public.automated_blog_posts') AS table_name
  `) as Array<{ table_name: string | null }>;
  return Boolean(rows[0]?.table_name);
}

export function hasBlogDatabase() {
  return Boolean(connectionString());
}

export async function ensureAutomatedBlogSchema() {
  const sql = database();

  await sql`
    CREATE TABLE IF NOT EXISTS automated_blog_posts (
      id TEXT PRIMARY KEY,
      publication_date DATE NOT NULL,
      slot TEXT NOT NULL CHECK (slot IN ('morning', 'afternoon')),
      slug TEXT NOT NULL UNIQUE,
      content JSONB NOT NULL,
      primary_pmid TEXT NOT NULL UNIQUE,
      primary_doi TEXT UNIQUE,
      research_topic TEXT NOT NULL,
      generation_model TEXT NOT NULL,
      quality_score INTEGER NOT NULL CHECK (quality_score BETWEEN 0 AND 100),
      similarity_score DOUBLE PRECISION NOT NULL CHECK (similarity_score BETWEEN 0 AND 1),
      source_metadata JSONB NOT NULL DEFAULT '[]'::jsonb,
      image_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
      published_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL,
      UNIQUE (publication_date, slot)
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS automated_blog_posts_published_at_idx
    ON automated_blog_posts (published_at DESC)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS automated_publish_slots (
      publication_date DATE NOT NULL,
      slot TEXT NOT NULL CHECK (slot IN ('morning', 'afternoon')),
      status TEXT NOT NULL CHECK (status IN ('running', 'failed', 'published')),
      attempts INTEGER NOT NULL DEFAULT 1,
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      completed_at TIMESTAMPTZ,
      last_error TEXT,
      post_id TEXT REFERENCES automated_blog_posts(id),
      PRIMARY KEY (publication_date, slot)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS automated_content_jobs (
      publication_date DATE NOT NULL,
      slot TEXT NOT NULL CHECK (slot IN ('morning', 'afternoon')),
      state TEXT NOT NULL CHECK (state IN ('generating', 'reviewing', 'failed', 'published')),
      candidate JSONB NOT NULL,
      cluster_id TEXT NOT NULL,
      draft JSONB,
      generation_response_id TEXT NOT NULL UNIQUE,
      review_response_id TEXT UNIQUE,
      similarity_score DOUBLE PRECISION,
      attempted_pmids TEXT[] NOT NULL DEFAULT '{}',
      last_error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (publication_date, slot)
    )
  `;

  await sql`
    ALTER TABLE automated_content_jobs
    ADD COLUMN IF NOT EXISTS attempted_pmids TEXT[] NOT NULL DEFAULT '{}'
  `;
}

export async function createAutomationJob(input: {
  publicationDate: string;
  slot: PublicationSlot;
  candidate: unknown;
  clusterId: string;
  generationResponseId: string;
}) {
  await database()`
    INSERT INTO automated_content_jobs (
      publication_date,
      slot,
      state,
      candidate,
      cluster_id,
      draft,
      generation_response_id,
      review_response_id,
      similarity_score,
      attempted_pmids,
      last_error,
      created_at,
      updated_at
    )
    VALUES (
      ${input.publicationDate}::date,
      ${input.slot},
      'generating',
      ${JSON.stringify(input.candidate)}::jsonb,
      ${input.clusterId},
      NULL,
      ${input.generationResponseId},
      NULL,
      NULL,
      ARRAY[${(input.candidate as { pmid?: string }).pmid ?? "unknown"}]::text[],
      NULL,
      NOW(),
      NOW()
    )
    ON CONFLICT (publication_date, slot) DO UPDATE SET
      state = 'generating',
      candidate = EXCLUDED.candidate,
      cluster_id = EXCLUDED.cluster_id,
      draft = NULL,
      generation_response_id = EXCLUDED.generation_response_id,
      review_response_id = NULL,
      similarity_score = NULL,
      attempted_pmids = EXCLUDED.attempted_pmids,
      last_error = NULL,
      updated_at = NOW()
    WHERE automated_content_jobs.state = 'failed'
  `;
}

export async function getAutomationJobByResponseId(
  responseId: string,
): Promise<AutomationJob | null> {
  const rows = (await database()`
    SELECT
      TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date,
      slot,
      state,
      candidate,
      cluster_id,
      draft,
      generation_response_id,
      review_response_id,
      similarity_score,
      attempted_pmids
    FROM automated_content_jobs
    WHERE generation_response_id = ${responseId}
       OR review_response_id = ${responseId}
    LIMIT 1
  `) as StoredAutomationJobRow[];
  return rows[0] ? mapAutomationJob(rows[0]) : null;
}

export async function getAutomationJobForSlot(
  publicationDate: string,
  slot: PublicationSlot,
): Promise<AutomationJob | null> {
  const rows = (await database()`
    SELECT
      TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date,
      slot,
      state,
      candidate,
      cluster_id,
      draft,
      generation_response_id,
      review_response_id,
      similarity_score,
      attempted_pmids
    FROM automated_content_jobs
    WHERE publication_date = ${publicationDate}::date
      AND slot = ${slot}
    LIMIT 1
  `) as StoredAutomationJobRow[];
  return rows[0] ? mapAutomationJob(rows[0]) : null;
}

export async function restartAutomationJobGeneration(input: {
  publicationDate: string;
  slot: PublicationSlot;
  candidate: unknown;
  generationResponseId: string;
  reason: string;
}) {
  const pmid = (input.candidate as { pmid?: string }).pmid ?? "unknown";
  const rows = (await database()`
    UPDATE automated_content_jobs
    SET
      state = 'generating',
      candidate = ${JSON.stringify(input.candidate)}::jsonb,
      draft = NULL,
      generation_response_id = ${input.generationResponseId},
      review_response_id = NULL,
      similarity_score = NULL,
      attempted_pmids = ARRAY_APPEND(attempted_pmids, ${pmid}),
      last_error = ${input.reason.slice(0, 4000)},
      updated_at = NOW()
    WHERE publication_date = ${input.publicationDate}::date
      AND slot = ${input.slot}
      AND state IN ('generating', 'reviewing')
    RETURNING generation_response_id
  `) as Array<{ generation_response_id: string }>;
  return rows.length > 0;
}

export async function markAutomationJobReviewing(input: {
  publicationDate: string;
  slot: PublicationSlot;
  draft: unknown;
  similarityScore: number;
  reviewResponseId: string;
}) {
  const rows = (await database()`
    UPDATE automated_content_jobs
    SET
      state = 'reviewing',
      draft = ${JSON.stringify(input.draft)}::jsonb,
      similarity_score = ${input.similarityScore},
      review_response_id = ${input.reviewResponseId},
      last_error = NULL,
      updated_at = NOW()
    WHERE publication_date = ${input.publicationDate}::date
      AND slot = ${input.slot}
      AND state = 'generating'
    RETURNING generation_response_id
  `) as Array<{ generation_response_id: string }>;
  return rows.length > 0;
}

export async function markAutomationJobPublished(
  publicationDate: string,
  slot: PublicationSlot,
) {
  await database()`
    UPDATE automated_content_jobs
    SET state = 'published', last_error = NULL, updated_at = NOW()
    WHERE publication_date = ${publicationDate}::date
      AND slot = ${slot}
  `;
}

export async function failAutomationJob(
  publicationDate: string,
  slot: PublicationSlot,
  message: string,
) {
  await database()`
    UPDATE automated_content_jobs
    SET state = 'failed', last_error = ${message.slice(0, 4000)}, updated_at = NOW()
    WHERE publication_date = ${publicationDate}::date
      AND slot = ${slot}
      AND state <> 'published'
  `;
  await failPublicationSlot(publicationDate, slot, message);
}

export async function getAutomatedBlogPosts(): Promise<BlogPost[]> {
  if (!hasBlogDatabase()) return [];

  try {
    if (!(await automatedBlogTableExists())) return [];
    const rows = (await database()`
      SELECT content
      FROM automated_blog_posts
      ORDER BY published_at DESC
      LIMIT 500
    `) as StoredPostRow[];
    return rows.map((row) => parseContent(row.content));
  } catch (error) {
    console.warn("Automated blog database is unavailable", error);
    return [];
  }
}

export async function getAutomatedBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  if (!hasBlogDatabase()) return null;

  try {
    if (!(await automatedBlogTableExists())) return null;
    const rows = (await database()`
      SELECT content
      FROM automated_blog_posts
      WHERE slug = ${slug}
      LIMIT 1
    `) as StoredPostRow[];
    return rows[0] ? parseContent(rows[0].content) : null;
  } catch (error) {
    console.warn("Automated blog post lookup failed", error);
    return null;
  }
}

export async function getAutomatedBlogFingerprints(): Promise<
  AutomatedBlogFingerprint[]
> {
  if (!hasBlogDatabase()) return [];

  try {
    if (!(await automatedBlogTableExists())) return [];
    const rows = (await database()`
      SELECT content, primary_pmid, primary_doi, research_topic
      FROM automated_blog_posts
      ORDER BY published_at DESC
      LIMIT 500
    `) as StoredFingerprintRow[];

    return rows.map((row) => {
      const post = parseContent(row.content);
      return {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        answerSummary: post.answerSummary,
        sections: post.sections,
        primaryPmid: row.primary_pmid,
        primaryDoi: row.primary_doi ?? undefined,
        researchTopic: row.research_topic,
      };
    });
  } catch (error) {
    console.warn("Automated blog fingerprint lookup failed", error);
    return [];
  }
}

export async function getUsedOpenverseImageIds(): Promise<Set<string>> {
  if (!hasBlogDatabase()) return new Set();

  try {
    if (!(await automatedBlogTableExists())) return new Set();
    const rows = (await database()`
      SELECT image_metadata ->> 'openverseId' AS openverse_id
      FROM automated_blog_posts
      WHERE image_metadata ->> 'provider' = 'openverse'
    `) as StoredImageMetadataRow[];
    return new Set(
      rows.map((row) => row.openverse_id).filter((id): id is string => Boolean(id)),
    );
  } catch (error) {
    console.warn("Openverse image history lookup failed", error);
    return new Set();
  }
}

export async function getPublishedPostForSlot(
  publicationDate: string,
  slot: PublicationSlot,
): Promise<{ id: string; slug: string } | null> {
  const rows = (await database()`
    SELECT id, slug
    FROM automated_blog_posts
    WHERE publication_date = ${publicationDate}::date AND slot = ${slot}
    LIMIT 1
  `) as Array<{ id: string; slug: string }>;
  return rows[0] ?? null;
}

export async function claimPublicationSlot(
  publicationDate: string,
  slot: PublicationSlot,
) {
  const rows = (await database()`
    INSERT INTO automated_publish_slots (
      publication_date,
      slot,
      status,
      attempts,
      started_at,
      completed_at,
      last_error,
      post_id
    )
    VALUES (${publicationDate}::date, ${slot}, 'running', 1, NOW(), NULL, NULL, NULL)
    ON CONFLICT (publication_date, slot) DO UPDATE SET
      status = 'running',
      attempts = automated_publish_slots.attempts + 1,
      started_at = NOW(),
      completed_at = NULL,
      last_error = NULL
    WHERE automated_publish_slots.status = 'failed'
       OR (
         automated_publish_slots.status = 'running'
         AND automated_publish_slots.started_at < NOW() - INTERVAL '45 minutes'
       )
    RETURNING status, post_id
  `) as StoredSlotRow[];

  return rows.length > 0;
}

export async function saveAutomatedBlogPost(record: AutomatedPostRecord) {
  const sql = database();
  const publishedAt = record.post.publishedAt ?? record.post.updatedAt;

  await sql`
    INSERT INTO automated_blog_posts (
      id,
      publication_date,
      slot,
      slug,
      content,
      primary_pmid,
      primary_doi,
      research_topic,
      generation_model,
      quality_score,
      similarity_score,
      source_metadata,
      image_metadata,
      published_at,
      updated_at
    )
    VALUES (
      ${record.id},
      ${record.publicationDate}::date,
      ${record.slot},
      ${record.post.slug},
      ${JSON.stringify(record.post)}::jsonb,
      ${record.primaryPmid},
      ${record.primaryDoi ?? null},
      ${record.researchTopic},
      ${record.generationModel},
      ${record.qualityScore},
      ${record.similarityScore},
      ${JSON.stringify(record.sourceMetadata)}::jsonb,
      ${JSON.stringify(record.imageMetadata)}::jsonb,
      ${publishedAt}::timestamptz,
      ${record.post.updatedAt}::timestamptz
    )
    ON CONFLICT (id) DO NOTHING
  `;

  await sql`
    UPDATE automated_publish_slots
    SET
      status = 'published',
      completed_at = NOW(),
      last_error = NULL,
      post_id = ${record.id}
    WHERE publication_date = ${record.publicationDate}::date
      AND slot = ${record.slot}
  `;
}

export async function failPublicationSlot(
  publicationDate: string,
  slot: PublicationSlot,
  message: string,
) {
  if (!hasBlogDatabase()) return;

  await database()`
    UPDATE automated_publish_slots
    SET
      status = 'failed',
      completed_at = NOW(),
      last_error = ${message.slice(0, 4000)}
    WHERE publication_date = ${publicationDate}::date
      AND slot = ${slot}
      AND status = 'running'
  `;
}
