# Automated research publishing

The production site can publish up to two evidence-led research digests per day without a manual approval queue. Automated articles are stored in Neon Postgres; the existing code-authored articles remain the fallback content source.

## Schedule

- Morning slot: `06:20 UTC`
- Afternoon slot: `15:20 UTC`

Vercel Cron schedules are UTC. Each London calendar date and slot is unique in Postgres, so repeated or overlapping calls cannot publish a second article for the same slot. A failed slot can be retried; a running slot becomes retryable after 45 minutes.

The cron request does not wait for article generation. It starts an OpenAI background response and exits within the Vercel Hobby function limit. A signed OpenAI webhook advances the job from generation to independent review and then publication.

## Source and quality gates

1. Search recent PubMed-indexed records through the Europe PMC REST API.
2. Reject retractions, comments, editorials, letters, case reports, animal-only work, and preclinical cell/animal studies unless a review clearly labels the evidence stage.
3. Prefer systematic reviews, meta-analyses, trials, guidelines, and comparative or observational human studies.
4. Supply the model with publication metadata and the abstract plus curated independent guidance from the NHS, British Association of Dermatologists, or Cochrane.
5. Generate a structured British-English article. The prompt prohibits invented claims, prescriptions, guarantees, unsupported statistics, and claims of clinical review.
6. Reject articles under 1,050 body words, with prohibited claims, reused slugs, reused PubMed IDs or DOIs, or excessive similarity to existing posts.
7. Run a separate automated evidence, safety, originality, and SEO review. Every score must be at least 82/100.
8. Store the article and its source, image-licence, model, score, and similarity metadata in Neon only after all checks pass.

The system intentionally leaves a slot empty if no candidate passes. Publishing two weak articles is not treated as success.

## Required Vercel environment variables

- `OPENAI_API_KEY`: server-only OpenAI API key.
- `OPENAI_CONTENT_MODEL`: defaults to `gpt-6-luna` if omitted.
- `OPENAI_WEBHOOK_SECRET`: signing secret for the OpenAI webhook endpoint.
- `DATABASE_URL`: created automatically by the Neon Vercel integration.
- `CRON_SECRET`: a long random secret. Vercel sends it as the Bearer token to the cron route.

The existing public Sanity settings remain in place for legacy site content, but automated articles do not require a Sanity write token.

Never expose any secret through a `NEXT_PUBLIC_` variable.

## OpenAI webhook

After the first deployment, create an OpenAI webhook subscribed to `response.completed`:

```text
https://www.ukhairtransplant.co/api/webhooks/openai
```

Copy its signing secret into `OPENAI_WEBHOOK_SECRET` in Vercel for Production and Preview, then redeploy. The endpoint verifies every event with the official OpenAI SDK before it reads or publishes content.

## Database bootstrap

The cron route runs the idempotent schema bootstrap before its first production publication. The same schema is documented in `db/automated-content.sql` for inspection or manual recovery.

## Local dry run

Use a development or preview Neon branch rather than the production branch. Pull the relevant Vercel environment into `.env.local`, start the application, and call one slot with the configured secret:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  "http://localhost:3000/api/cron/publish-research?slot=morning&dryRun=1"
```

Dry-run mode performs research, generation, similarity checks, and automated review but does not claim a publication slot or write an article.

## Monitoring and recovery

- Check Vercel function logs for `Automated research publishing failed`.
- Failed runs are recorded on the publication slot and can be retried safely.
- Published slots, PubMed IDs, DOIs, and slugs are protected by database uniqueness constraints.
- After publication, the webhook route revalidates the blog index, article URL, and sitemap.
- The public site falls back to code-authored articles if Neon is temporarily unavailable.

## Images

Research articles search Openverse using the article title, keywords, and research topic. Only CC0 and Public Domain Mark results are eligible. Deterministic checks reject mature, undersized, portrait, non-HTTPS, or unreachable originals before any image can be selected.

The content model then reviews low-resolution candidate thumbnails and can choose an image only when it is clearly relevant, editorial, medically neutral, and safe for healthcare publishing. It must reject unrelated lifestyle scenes, recognisable people presented as having a condition, before-and-after images, logos, treatment promises, and text-heavy or disturbing imagery. If no candidate is genuinely suitable, the article uses a neutral site-owned fallback rather than accepting a weak match.

The published post keeps the original remote image URL, so scheduled articles do not require a new code deployment. Neon stores the Openverse ID, creator, source page, original URL, licence, licence URL, dimensions, selection reason, and timestamp. The article displays the source and licence below the image. Previously used Openverse IDs are excluded from future searches.

This flow does not generate images with OpenAI. OpenAI is used only for the low-cost relevance check; Openverse search itself is free.
