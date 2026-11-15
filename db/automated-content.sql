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
);

CREATE INDEX IF NOT EXISTS automated_blog_posts_published_at_idx
ON automated_blog_posts (published_at DESC);

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
);

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
);
