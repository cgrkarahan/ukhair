import { defineArrayMember, defineField, defineType } from "sanity";

export const topicPage = defineType({
  name: "topicPage",
  title: "Topic / SEO Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "lead",
      title: "Lead",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroChips",
      title: "Hero Chips",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "cards",
      title: "Hero Cards",
      type: "array",
      of: [defineArrayMember({ type: "topicCard" })],
    }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [defineArrayMember({ type: "topicSection" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "comparison",
      title: "Comparison Table",
      type: "topicComparison",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      of: [defineArrayMember({ type: "topicTimelineItem" })],
    }),
    defineField({
      name: "faq",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "topicFaq" })],
    }),
    defineField({
      name: "relatedPages",
      title: "Related Pages",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "topicPage" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
