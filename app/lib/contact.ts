export const siteContact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@ukhairtransplant.co",
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+447427051177",
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY ??
    process.env.NEXT_PUBLIC_PHONE_NUMBER ??
    "+44 7427 051177",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+447427051177",
  whatsappLabel: process.env.NEXT_PUBLIC_WHATSAPP_LABEL ?? "WhatsApp",
  clinicLocation: "Premium clinic partner in central London",
};

export const siteSocialLinks = [
  {
    platform: "TikTok",
    href: "https://www.tiktok.com/@ukhairtransplant",
    label: "@ukhairtransplant",
  },
  {
    platform: "Instagram",
    href: "https://www.instagram.com/ukhairtransplant.co/",
    label: "@ukhairtransplant.co",
  },
  {
    platform: "Facebook",
    href: "https://www.facebook.com/ukhairtransplantco",
    label: "UK Hair Transplant",
  },
] as const;

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
