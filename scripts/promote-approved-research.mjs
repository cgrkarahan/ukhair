import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
const cronSecret = process.env.CRON_SECRET;
const productionUrl = process.env.PRODUCTION_URL || "https://www.ukhairtransplant.co";

if (!databaseUrl || !cronSecret) {
  throw new Error("DATABASE_URL and CRON_SECRET are required");
}

const local = neon(databaseUrl);
const rows = await local`
  SELECT
    id,
    TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date,
    slot,
    content,
    primary_pmid,
    primary_doi,
    research_topic,
    generation_model,
    quality_score,
    similarity_score,
    source_metadata,
    image_metadata
  FROM automated_blog_posts
  ORDER BY published_at DESC
  LIMIT 2
`;

if (rows.length !== 2) {
  throw new Error(`Expected 2 approved local posts, found ${rows.length}`);
}

const records = rows.map((row) => ({
  id: row.id,
  publicationDate: row.publication_date,
  slot: row.slot,
  post: row.content,
  primaryPmid: row.primary_pmid,
  primaryDoi: row.primary_doi || undefined,
  researchTopic: row.research_topic,
  generationModel: row.generation_model,
  qualityScore: row.quality_score,
  similarityScore: row.similarity_score,
  sourceMetadata: row.source_metadata,
  imageMetadata: row.image_metadata,
}));

const response = await fetch(`${productionUrl}/api/cron/import-approved-research`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${cronSecret}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ records }),
});
const payload = await response.json();
if (!response.ok) {
  throw new Error(`Import failed (${response.status}): ${JSON.stringify(payload)}`);
}
console.log(JSON.stringify(payload));
