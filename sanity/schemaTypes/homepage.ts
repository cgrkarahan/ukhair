import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "Homepage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "lead",
          title: "Lead",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "primaryCtaLabel",
          title: "Primary CTA Label",
          type: "string",
        }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary CTA Label",
          type: "string",
        }),
        defineField({
          name: "chips",
          title: "Trust Chips",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "trustPillars",
      title: "Hero Trust Pillars",
      type: "array",
      of: [defineArrayMember({ type: "topicCard" })],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "signals",
      title: "Signal Cards",
      type: "array",
      of: [defineArrayMember({ type: "homeSignal" })],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "servicesIntro",
      title: "Services Intro",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "londonDecision",
      title: "London Decision Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({
          name: "body",
          title: "Body Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 4 })],
        }),
        defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
      ],
    }),
    defineField({
      name: "journey",
      title: "Decision Journey",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [defineArrayMember({ type: "topicCard" })],
        }),
      ],
    }),
    defineField({
      name: "guideSection",
      title: "Further Reading Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [defineArrayMember({ type: "linkCard" })],
        }),
      ],
    }),
    defineField({
      name: "proofSection",
      title: "Proof Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({
          name: "fallbackItems",
          title: "Fallback Proof Notes",
          description: "Shown only when no approved proof cases are published.",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 3 })],
        }),
      ],
    }),
    defineField({
      name: "expectations",
      title: "Patient Expectations",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 3 })],
        }),
      ],
    }),
    defineField({
      name: "assessment",
      title: "Assessment CTA",
      type: "assessmentCta",
    }),
    defineField({
      name: "faq",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "topicFaq" })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "seo.description" },
  },
});
