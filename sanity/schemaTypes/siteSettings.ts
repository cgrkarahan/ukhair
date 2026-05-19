import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "Site Settings",
      readOnly: true,
    }),
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "UK Hair Transplant",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      description: "Use international format where possible, for example +4420...",
      type: "string",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Phone Display Text",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      description: "Use digits only where possible for wa.me links.",
      type: "string",
    }),
    defineField({
      name: "whatsappLabel",
      title: "WhatsApp Display Text",
      type: "string",
    }),
    defineField({
      name: "clinicLocation",
      title: "Public Location Wording",
      type: "string",
      initialValue: "Premium central London clinic access",
    }),
  ],
  preview: {
    select: { title: "brandName", subtitle: "clinicLocation" },
  },
});
