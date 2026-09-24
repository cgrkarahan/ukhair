import { siteConfig } from "@/app/lib/siteConfig";

export const siteContact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? siteConfig.contact.email,
  phoneNumber:
    process.env.NEXT_PUBLIC_PHONE_NUMBER ?? siteConfig.contact.phoneNumber,
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY ??
    process.env.NEXT_PUBLIC_PHONE_NUMBER ??
    siteConfig.contact.phoneDisplay,
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? siteConfig.contact.whatsappNumber,
  whatsappLabel:
    process.env.NEXT_PUBLIC_WHATSAPP_LABEL ?? siteConfig.contact.whatsappLabel,
  clinicLocation: siteConfig.clinicLocation,
};

export const siteSocialLinks = siteConfig.socialLinks;

export function normalizePhoneNumber(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function normalizeWhatsappNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function getPhoneHref() {
  return siteContact.phoneNumber
    ? `tel:${normalizePhoneNumber(siteContact.phoneNumber)}`
    : null;
}

export function getWhatsappHref(message?: string) {
  const normalized = normalizeWhatsappNumber(siteContact.whatsappNumber);

  if (!normalized) {
    return null;
  }

  const base = `https://wa.me/${normalized}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
