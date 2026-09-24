# Premium Clinic Lead-Generation Starter

Reusable Next.js starter for premium clinic, cosmetic-treatment, and healthcare-style lead-generation websites.

## Included in the starter

- homepage, service pages, guides, blog, legal pages, and enquiry flow
- premium marketing-site design system
- mobile-first navigation and sticky CTA behavior
- consultation form with Resend-ready server action
- content token and factory layer for brand/city-aware starter reuse
- SEO and AI-discovery setup:
  - metadata helpers
  - schema patterns
  - `robots.txt`
  - `sitemap.xml`
  - `llms.txt`
- deployment and launch checklists

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Use it as a starter for a new project

1. Copy:

```bash
cp starter/project-config.example.json starter/project-config.json
```

2. Edit `starter/project-config.json`

3. Apply it:

```bash
npm run starter:apply -- ./starter/project-config.json
```

4. Replace project-specific content and assets

See:
- [STARTER_SETUP.md](./STARTER_SETUP.md)
- [starter/deployment-checklist.template.md](./starter/deployment-checklist.template.md)

## Core files to customize for a new site

- `app/lib/siteConfig.ts`
- `app/lib/contentTemplates.ts`
- `app/lib/siteContent.ts`
- `app/lib/blogContent.ts`
- `app/services/serviceData.ts`
- `app/lib/proof.ts`
- `.agents/product-marketing-context.md`

## Environment variables

Start from `.env.example`

## Validation

```bash
npm run lint
npm run build
```
