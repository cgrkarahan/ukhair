---
name: lead-funnel-measurement
description: Use when planning, reviewing, or implementing analytics and attribution for a clinic, healthcare, or hair-transplant marketing site where success depends on tracking consult requests, calls, WhatsApp starts, booking intent, and qualified lead flow rather than traffic alone. Trigger this for GA4 event plans, funnel definitions, attribution cleanup, CRM handoff measurement, and CRO instrumentation.
metadata:
  version: 0.1.0
---

# Lead Funnel Measurement

Use this skill to make SEO and CRO work measurable against real lead quality.

## Initial Check

If `.agents/product-marketing-context.md` exists, read it first and use it as the baseline business context.

## Default Measurement Model

Track the funnel in this order:

1. Landing-page visit
2. CTA click
3. Form start
4. Form submit
5. Click-to-call / WhatsApp start
6. Consultation booked
7. Qualified consultation
8. Patient-ready handoff

## Event Priorities

- consultation / assessment form start
- consultation / assessment form submit
- phone click
- WhatsApp click
- email click
- calendar or booking click
- before/after gallery engagement when relevant
- key trust-page visits before conversion

## Attribution Rules

- Preserve UTMs through forms and booking flows.
- Keep landing-page and first-touch data available for lead review.
- Distinguish organic, paid, branded, and referral traffic.
- Avoid combining all enquiries into one vague `lead` event if more specific events are possible.

## Output Preference

When asked to help, default to:
- event taxonomy
- funnel definition
- attribution checklist
- reporting view for SEO + CRO
- implementation notes for GA4 / tag manager / CRM handoff
