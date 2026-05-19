import { defineField, defineType } from "sanity";

export const patientReview = defineType({
  name: "patientReview",
  title: "Patient Review",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
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
      description: "Keep enabled for staging placeholders. Disable only for approved launch reviews.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "quote",
      title: "Approved Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "treatmentArea",
      title: "Treatment Area",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "treatmentArea",
    },
  },
});
