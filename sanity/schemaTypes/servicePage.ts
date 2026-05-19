import { defineArrayMember, defineField, defineType } from "sanity";

export const servicePage = defineType({
  name: "servicePage",
  title: "Treatment / Service Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
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
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageSrc",
      title: "Frontend Image Path",
      description:
        "Keep design assets in the frontend, for example /services/male-hair-transplant.svg.",
      type: "string",
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
    }),
    defineField({
      name: "bestFor",
      title: "Best For",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "outcome",
      title: "Expected Outcome",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "consultation",
      title: "Consultation Points",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "serviceHighlight" })],
    }),
    defineField({
      name: "guideHeading",
      title: "Guide Heading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "guideSections",
      title: "Guide Sections",
      type: "array",
      of: [defineArrayMember({ type: "serviceGuideSection" })],
    }),
    defineField({
      name: "londonContext",
      title: "London Context Cards",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "selectionCriteria",
      title: "Selection Criteria",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "recoveryNotes",
      title: "Recovery Notes",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "relatedGuides",
      title: "Related Topic Pages",
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
