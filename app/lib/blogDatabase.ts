import "server-only";

import { neon } from "@neondatabase/serverless";
import { MAX_REPAIR_ATTEMPTS } from "@/app/lib/researchQualityPolicy";
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

export type AttemptedResearchIds = {
  pmids: Set<string>;
  dois: Set<string>;
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
  generationAttempts: number;
  reviewAttempts: number;
  repairAttempts: number;
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
  generation_attempts: number;
  review_attempts: number;
  repair_attempts: number;
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
    generationAttempts: row.generation_attempts ?? 1,
    reviewAttempts: row.review_attempts ?? 0,
    repairAttempts: row.repair_attempts ?? 0,
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
      generation_attempts INTEGER NOT NULL DEFAULT 1,
      review_attempts INTEGER NOT NULL DEFAULT 0,
      repair_attempts INTEGER NOT NULL DEFAULT 0,
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

  await sql`
    ALTER TABLE automated_content_jobs
    ADD COLUMN IF NOT EXISTS repair_attempts INTEGER NOT NULL DEFAULT 0
  `;

  await sql`
    ALTER TABLE automated_content_jobs
    ADD COLUMN IF NOT EXISTS generation_attempts INTEGER NOT NULL DEFAULT 1
  `;

  await sql`
    ALTER TABLE automated_content_jobs
    ADD COLUMN IF NOT EXISTS review_attempts INTEGER NOT NULL DEFAULT 0
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS automated_research_attempts (
      pmid TEXT PRIMARY KEY,
      doi TEXT,
      publication_date DATE NOT NULL,
      slot TEXT NOT NULL CHECK (slot IN ('morning', 'afternoon')),
      outcome TEXT NOT NULL,
      attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function createAutomationJob(input: {
  publicationDate: string;
  slot: PublicationSlot;
  candidate: unknown;
  clusterId: string;
  generationResponseId: string;
  generationAttempts?: number;
}) {
  const generationAttempts = input.generationAttempts ?? 1;
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
      generation_attempts,
      review_attempts,
      repair_attempts,
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
      ${generationAttempts},
      0,
      0,
      NULL,
      NOW(),
      NOW()
    )
    ON CONFLICT (publication_date, slot) DO NOTHING
  `;
}

export async function archiveFailedAutomationJob(
  publicationDate: string,
  slot: PublicationSlot,
) {
  const rows = (await database()`
    WITH failed_job AS (
      SELECT publication_date, slot, candidate, attempted_pmids, updated_at
      FROM automated_content_jobs
      WHERE publication_date = ${publicationDate}::date
        AND slot = ${slot}
        AND state = 'failed'
    ),
    attempt_ids AS (
      SELECT DISTINCT
        attempted_pmid AS pmid,
        CASE
          WHEN attempted_pmid = failed_job.candidate ->> 'pmid'
            THEN NULLIF(failed_job.candidate ->> 'doi', '')
          ELSE NULL
        END AS doi,
        failed_job.publication_date,
        failed_job.slot,
        failed_job.updated_at
      FROM failed_job
      CROSS JOIN LATERAL UNNEST(
        ARRAY_CAT(
          COALESCE(failed_job.attempted_pmids, ARRAY[]::text[]),
          ARRAY[failed_job.candidate ->> 'pmid']
        )
      ) AS attempted_ids(attempted_pmid)
      WHERE attempted_pmid IS NOT NULL
        AND attempted_pmid <> ''
        AND attempted_pmid <> 'unknown'
    ),
    archived AS (
      INSERT INTO automated_research_attempts (
        pmid,
        doi,
        publication_date,
        slot,
        outcome,
        attempted_at
      )
      SELECT pmid, doi, publication_date, slot, 'failed', updated_at
      FROM attempt_ids
      ON CONFLICT (pmid) DO UPDATE SET
        doi = COALESCE(EXCLUDED.doi, automated_research_attempts.doi),
        outcome = 'failed',
        attempted_at = GREATEST(
          automated_research_attempts.attempted_at,
          EXCLUDED.attempted_at
        )
      RETURNING pmid
    ),
    deleted AS (
      DELETE FROM automated_content_jobs
      WHERE publication_date = ${publicationDate}::date
        AND slot = ${slot}
        AND state = 'failed'
        AND EXISTS (SELECT 1 FROM archived)
      RETURNING publication_date
    )
    SELECT EXISTS (SELECT 1 FROM deleted) AS archived
  `) as Array<{ archived: boolean }>;

  return rows[0]?.archived ?? false;
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
      attempted_pmids,
      generation_attempts,
      review_attempts,
      repair_attempts
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
      attempted_pmids,
      generation_attempts,
      review_attempts,
      repair_attempts
    FROM automated_content_jobs
    WHERE publication_date = ${publicationDate}::date
      AND slot = ${slot}
    LIMIT 1
  `) as StoredAutomationJobRow[];
  return rows[0] ? mapAutomationJob(rows[0]) : null;
}

export async function getStaleAutomationJobs(
  staleAfterMinutes = 20,
  limit = 4,
): Promise<AutomationJob[]> {
  const safeMinutes = Math.max(5, Math.min(180, Math.trunc(staleAfterMinutes)));
  const safeLimit = Math.max(1, Math.min(10, Math.trunc(limit)));
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
      attempted_pmids,
      generation_attempts,
      review_attempts,
      repair_attempts
    FROM automated_content_jobs
    WHERE state IN ('generating', 'reviewing')
      AND updated_at < NOW() - (${safeMinutes} * INTERVAL '1 minute')
    ORDER BY updated_at ASC
    LIMIT ${safeLimit}
  `) as StoredAutomationJobRow[];
  return rows.map(mapAutomationJob);
}

export async function markAutomationJobRepairing(input: {
  publicationDate: string;
  slot: PublicationSlot;
  repairResponseId: string;
  expectedReviewResponseId: string;
  reason: string;
}) {
  const rows = (await database()`
    UPDATE automated_content_jobs
    SET
      state = 'generating',
      generation_response_id = ${input.repairResponseId},
      review_response_id = NULL,
      review_attempts = 0,
      repair_attempts = repair_attempts + 1,
      last_error = ${input.reason.slice(0, 4000)},
      updated_at = NOW()
    WHERE publication_date = ${input.publicationDate}::date
      AND slot = ${input.slot}
      AND state = 'reviewing'
      AND review_response_id = ${input.expectedReviewResponseId}
      AND repair_attempts < ${MAX_REPAIR_ATTEMPTS}
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
      review_attempts = 1,
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

export async function getAttemptedResearchIds(): Promise<AttemptedResearchIds> {
  const empty = { pmids: new Set<string>(), dois: new Set<string>() };
  if (!hasBlogDatabase()) return empty;

  try {
    const rows = (await database()`
      SELECT
        candidate ->> 'pmid' AS pmid,
        candidate ->> 'doi' AS doi,
        attempted_pmids
      FROM automated_content_jobs
    `) as Array<{
      pmid: string | null;
      doi: string | null;
      attempted_pmids: string[] | null;
    }>;

    const archivedRows = (await database()`
      SELECT pmid, doi
      FROM automated_research_attempts
    `) as Array<{ pmid: string; doi: string | null }>;

    const pmids = new Set<string>();
    const dois = new Set<string>();
    for (const row of rows) {
      if (row.pmid) pmids.add(row.pmid);
      if (row.doi) dois.add(row.doi.toLowerCase());
      for (const pmid of row.attempted_pmids ?? []) {
        if (pmid && pmid !== "unknown") pmids.add(pmid);
      }
    }
    for (const row of archivedRows) {
      if (row.pmid) pmids.add(row.pmid);
      if (row.doi) dois.add(row.doi.toLowerCase());
    }
    return { pmids, dois };
  } catch (error) {
    console.warn("Automated research attempt history lookup failed", error);
    return empty;
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
