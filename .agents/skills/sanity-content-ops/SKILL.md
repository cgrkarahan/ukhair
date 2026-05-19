---
name: sanity-content-ops
description: Use when mapping marketing, SEO, or treatment pages into Sanity CMS schemas, documents, reusable blocks, editorial workflows, preview behavior, slugs, SEO fields, and internal linking models. Trigger this for making currently hardcoded Next.js content editable in Sanity without creating an unmanageable schema.
metadata:
  version: 0.1.0
---

# Sanity Content Ops

Use this skill when content needs to become editable in Sanity while preserving SEO quality.

## Initial Check

If `.agents/product-marketing-context.md` exists, read it first and use it as the baseline content-model and positioning context.

## Modeling Rules

- Model reusable blocks only when reuse is real.
- Keep evergreen SEO pages separate from highly modular homepage sections.
- Add explicit SEO fields:
  - title
  - description
  - canonical / slug
  - OG image where needed
- Prefer references for internal linking over raw URLs when possible.

## Good Defaults

- one document type for evergreen SEO pages
- one document type for treatment pages if they need editorial control
- reusable FAQ / CTA / trust blocks only if used across multiple pages

## Avoid

- over-modular homepage schemas
- duplicating the same SEO field set inconsistently
- mixing editorial page content with hardcoded system copy unless intentional

## Workflow

1. Identify what truly needs CMS editing.
2. Keep the schema small and durable.
3. Seed critical pages once structure is stable.
4. Preserve slug, metadata, and internal-link integrity.

## Preferred Output

When helping with a migration, default to:
- proposed document types
- shared blocks worth modeling
- fields required for SEO and internal links
- migration / seeding order
