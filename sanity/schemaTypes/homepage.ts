import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "Homepage",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "subhead",
          title: "Subhead",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "string",
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [
        defineField({
          name: "heroSlide",
          title: "Hero Slide",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "headline", title: "Headline", type: "string" }),
            defineField({
              name: "subhead",
              title: "Subhead",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "imageAlt",
              title: "Image Alt Text",
              type: "string",
            }),
            defineField({
              name: "primaryCta",
              title: "Primary CTA",
              type: "string",
            }),
            defineField({
              name: "secondaryCta",
              title: "Secondary CTA",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        defineField({
          name: "service",
          title: "Service",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "signatureCare",
      title: "Signature Care",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "availabilityTitle",
          title: "Availability Title",
          type: "string",
        }),
        defineField({
          name: "availabilityText",
          title: "Availability Text",
          type: "string",
        }),
        defineField({
          name: "badges",
          title: "Badges",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [
        defineField({
          name: "step",
          title: "Step",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        defineField({
          name: "result",
          title: "Result",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "area", title: "Area", type: "string" }),
            defineField({ name: "time", title: "Time", type: "string" }),
            defineField({ name: "note", title: "Note", type: "string" }),
            defineField({
              name: "beforeImage",
              title: "Before Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "afterImage",
              title: "After Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "beforeImageAlt",
              title: "Before Image Alt Text",
              type: "string",
            }),
            defineField({
              name: "afterImageAlt",
              title: "After Image Alt Text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        defineField({
          name: "review",
          title: "Review",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (rule) => rule.min(1).max(5).precision(1),
              initialValue: 5,
            }),
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        defineField({
          name: "faqItem",
          title: "FAQ Item",
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({
              name: "answerText",
              title: "Answer",
              type: "text",
              rows: 3,
              description: "Legacy/simple text answer.",
            }),
            defineField({
              name: "answerRich",
              title: "Answer With Bullets",
              type: "array",
              of: [{ type: "block" }],
              description:
                "Use this when you need bullets or richer formatting. It overrides the plain text answer on the website.",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
