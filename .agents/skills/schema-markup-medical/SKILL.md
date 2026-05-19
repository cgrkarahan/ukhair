---
name: schema-markup-medical
description: Use when choosing, reviewing, or implementing structured data for healthcare, clinic, cosmetic-treatment, or hair-transplant websites. Trigger this for Service, FAQPage, BreadcrumbList, Organization, LocalBusiness, MedicalBusiness, Article, and related schema decisions where the entity type must match the actual business model.
metadata:
  version: 0.1.0
---

# Schema Markup Medical

Use this skill to choose schema types that are both useful and truthful.

## Initial Check

If `.agents/product-marketing-context.md` exists, read it first and use it as the baseline entity and business-model context.

## Selection Rules

- Match schema to the real entity, not the aspirational one.
- If the site is a guidance / acquisition brand, default to `Organization` + `Service` + `WebSite` rather than pretending to be a clinic.
- Use `FAQPage` only when the FAQ is genuinely visible on the page.
- Use `BreadcrumbList` on content hierarchies.

## Common Fit For This Project

- homepage: `Organization`, `WebSite`, possibly `CollectionPage`
- treatment pages: `Service`, `FAQPage`, `BreadcrumbList`
- trust / recovery pages: `WebPage` or `Article`, plus `FAQPage` where visible

## Common Mistakes

- using `MedicalClinic` when the site is not the clinic
- marking hidden content as FAQ
- stuffing schema with claims not visible on the page
- forgetting to validate rendered JSON-LD

## Validation

Check:
- page/source alignment
- JSON-LD renders in the browser
- Rich Results / schema tooling where relevant

## Preferred Output

When making recommendations, default to:
- schema types to use
- schema types to avoid
- page-by-page mapping
- validation notes
