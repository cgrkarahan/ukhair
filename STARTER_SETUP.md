# Starter Setup

Use this repo as a starter for future premium clinic, cosmetic-treatment, or healthcare-style lead-generation websites.

## What this starter already includes

- Next.js app structure with homepage, service pages, guides, blog, legal pages, and contact flow
- premium marketing-site layout and design system
- mobile-first menu, sticky CTA, and form behavior
- lead form with Resend-ready server action
- SEO foundations:
  - metadata helpers
  - structured data patterns
  - `robots.txt`
  - `sitemap.xml`
  - `llms.txt`
- deployment checklist and Vercel-friendly structure

## Fastest way to start a new project

1. Duplicate this repo into a new project folder or Git repository.
2. Copy the example starter config:

```bash
cp starter/project-config.example.json starter/project-config.json
```

3. Edit `starter/project-config.json` with the new project’s:
   - brand
   - domain
   - contact details
   - company details
   - social links
   - positioning summary
4. Apply the config:

```bash
npm run starter:apply -- ./starter/project-config.json
```

That updates:
- `app/lib/siteConfig.ts`
- `.agents/product-marketing-context.md`
- `public/llms.txt`

## Content tokens and factories

The starter now supports shared project tokens through:

- `app/lib/contentTemplates.ts`

Available tokens include:

- `{{BRAND}}`
- `{{CITY}}`
- `{{MARKET}}`
- `{{CLINIC_LOCATION}}`
- `{{CONTACT_EMAIL}}`
- `{{WHY_CITY_LABEL}}`
- `{{CITY_ACCESS_LABEL}}`

Use those tokens inside content files when the wording should adapt to the next project's brand or city automatically.

Example:

```ts
{
  label: "{{WHY_CITY_LABEL}}",
  description: "Why patients choose a {{CITY}} route for access, standards, and aftercare.",
}
```

## What is now more template-driven

- `app/lib/siteContent.ts`
  now supports project-token replacement across navigation, homepage content, FAQs, and topic-page data
- `app/services/serviceData.ts`
  now uses a service factory so future entries can omit repeated fields like `seoTitle`, `imageAlt`, and `intro`
- `app/lib/blogContent.ts`
  now uses a blog factory so future entries can inherit token replacement and image-alt defaults
- `app/lib/proof.ts`
  now supports token replacement for proof and review data

## What future projects can usually omit

For new service entries, you can usually omit:

- `seoTitle`
- `imageAlt`
- `intro`

For new blog entries, you can usually omit:

- token replacement boilerplate
- image alt text if a sensible default is acceptable

## Then replace the project-specific content

These files still need a proper content pass for the new project:

- `app/lib/siteContent.ts`
- `app/lib/blogContent.ts`
- `app/services/serviceData.ts`
- `app/lib/proof.ts`
- `app/about/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/cookies/page.tsx`

## Replace brand and media assets

Review and replace:

- `public/brand/*`
- `public/images/*`
- `public/services/*`
- `public/proof/*`

## Environment variables

Start from `.env.example`, then create your own `.env.local`.

## Recommended workflow for new projects

1. Apply starter config
2. Replace visual identity and imagery
3. Rewrite homepage and core commercial pages
4. Rewrite trust, pricing, recovery, and FAQ content
5. Add real reviews, proof, and legal/company details
6. Configure email, analytics, and deployment
7. Run:

```bash
npm run lint
npm run build
```

## Important limitation

This starter is strongest for projects with a similar structure:

- premium clinic or treatment site
- lead-generation first
- trust-heavy decision support
- service pages + guide pages + blog + enquiry flow

If the next project is a very different category, keep the component system and infrastructure, but expect a more substantial content and information-architecture rewrite.

## Generic deployment checklist

For future projects, do not reuse the live-project launch checklist directly. Start from:

- `starter/deployment-checklist.template.md`
