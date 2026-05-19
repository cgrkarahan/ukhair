import { defineField, defineType } from "sanity";

export const proofCase = defineType({
  name: "proofCase",
  title: "Proof Case",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPlaceholder",
      title: "Placeholder Only",
      description: "Keep enabled for staging placeholders. Disable only for approved launch proof.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "areaTreated",
      title: "Area Treated",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      description: "For example: 9 months after treatment.",
      type: "string",
    }),
    defineField({
      name: "treatmentNote",
      title: "Treatment Note",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Approved Summary",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Fallback Slider Variant",
      type: "string",
      options: {
        list: [
          { title: "Hairline", value: "hairline" },
          { title: "Crown", value: "crown" },
          { title: "Temple", value: "temple" },
          { title: "Diffuse", value: "diffuse" },
        ],
      },
      initialValue: "hairline",
    }),
    defineField({
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "beforeImageAlt",
      title: "Before Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "afterImage",
      title: "After Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "afterImageAlt",
      title: "After Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Legacy Single Image",
      description: "Optional legacy field. Use the before/after images above for the homepage slider.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Legacy Image Alt Text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "areaTreated",
      media: "image",
    },
  },
});
