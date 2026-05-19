---
name: google-ads-conversion-tracking
description: Use when planning, auditing, or implementing Google Ads conversion tracking for lead generation sites, especially where qualified consultations, calls, WhatsApp starts, booking actions, and offline patient outcomes matter. Trigger this for GA4 to Google Ads mapping, enhanced conversions, phone and messaging attribution, gclid capture, offline conversion imports, and conversion action design.
metadata:
  version: 0.1.0
---

# Google Ads Conversion Tracking

Use this skill to make paid-search optimization depend on real lead quality rather than shallow conversions.

## Initial Check

If `.agents/product-marketing-context.md` exists, read it first and use it as the baseline business and measurement context.

## Default Conversion Model

Separate:

- primary conversions
- secondary conversions
- micro-conversions
- offline qualified outcomes

## Good Primary Conversion Candidates

- assessment form submit
- booked consultation
- qualified call if trackable

## Good Secondary Conversion Candidates

- form start
- phone click
- WhatsApp start
- key CTA click

## Implementation Priorities

- preserve gclid / gbraid / wbraid where relevant
- connect GA4 and Google Ads cleanly
- decide which actions should optimize bidding
- keep duplicate counting under control
- plan offline conversion import if consultation quality matters

## Preferred Output

When asked to help, default to:
- conversion-action plan
- event taxonomy
- primary vs secondary recommendation
- attribution and identifier checklist
- implementation notes for GA4 / GTM / CRM
