---
name: healthcare-copy-compliance-uk
description: Use when writing, reviewing, or revising UK healthcare, cosmetic-treatment, or hair-transplant copy that includes trust claims, GMC/CQC wording, clinician descriptions, pricing language, outcomes, before-and-after framing, or other medically sensitive marketing claims. Trigger this for homepage copy, landing pages, ads, FAQs, emails, brochures, and SEO pages where compliance or claim precision matters.
metadata:
  version: 0.1.0
---

# Healthcare Copy Compliance UK

Use this skill to keep UK healthcare and hair-transplant marketing copy commercially strong without drifting into risky claim language.

## Initial Check

If `.agents/product-marketing-context.md` exists, read it first and use it as the baseline positioning and trust-language context.

## Workflow

1. Identify every meaningful claim on the page:
   - credentials
   - clinic standards
   - pricing
   - outcomes
   - comparisons
   - safety / permanence / suitability
2. Classify each claim as:
   - safe as written
   - safe with tighter wording
   - evidence-dependent
   - too risky / remove
3. Rewrite risky claims into precise, defensible wording.
4. Pair strong claims with proof, process detail, or limitations.

## Default Safe Patterns

- Prefer `GMC-registered doctors` over broader prestige wording.
- Prefer `CQC-registered provider in England` over `CQC-approved`.
- Prefer `selection criteria include...` over `we work with the best`.
- Prefer `may`, `can`, `typically`, `depends on the case` where certainty would overclaim.
- Prefer `realistic planning`, `clinical governance`, `aftercare`, `regulated environment`, `clear pricing`.

## Avoid By Default

- `GMC-approved`
- `CQC-approved surgeon`
- `best`, `leading`, `top-rated`, `world-class` unless clearly evidenced
- guaranteed outcomes
- fixed hero pricing unless truly stable
- anti-Turkey absolutes
- naming someone a `surgeon` or `specialist` if that is not clearly substantiated

## Hair-Transplant Specific Checks

- Does the copy imply every patient is suitable?
- Does it treat density as guaranteed?
- Does it underplay recovery, side effects, or timeline uncertainty?
- Does it imply standards or affiliations that are not publicly supportable?
- Does it overstate doctor expertise based only on registration?

## Output Preference

When reviewing copy, return:
- `safe to keep`
- `rewrite`
- `remove`

When rewriting copy, optimize for:
- compliant
- premium
- calm
- medically literate
- conversion-aware
