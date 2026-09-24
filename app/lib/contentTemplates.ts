import { siteConfig } from "@/app/lib/siteConfig";

const premiumClinicLabel =
  siteConfig.primaryCity === "London"
    ? "premium London clinic"
    : siteConfig.clinicLocation.toLowerCase();

export const projectContentTokens = {
  BRAND: siteConfig.brandName,
  CITY: siteConfig.primaryCity,
  MARKET: siteConfig.primaryMarket,
  SERVICE_CATEGORY: siteConfig.serviceCategory,
  CLINIC_LOCATION: siteConfig.clinicLocation,
  LEGAL_COMPANY_NAME: siteConfig.company.legalName,
  CONTACT_EMAIL: siteConfig.contact.email,
  PHONE_DISPLAY: siteConfig.contact.phoneDisplay,
  WHY_CITY_LABEL: `Why ${siteConfig.primaryCity}`,
  CITY_ROUTE: `${siteConfig.primaryCity} route`,
  CITY_ACCESS_LABEL:
    siteConfig.primaryCity === "London"
      ? `Central ${siteConfig.primaryCity} access`
      : `${siteConfig.primaryCity} access`,
  PREMIUM_CITY_CLINIC: premiumClinicLabel,
} as const;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function replaceProjectTokens(value: string) {
  return Object.entries(projectContentTokens).reduce(
    (result, [token, replacement]) =>
      result.replaceAll(`{{${token}}}`, replacement),
    value,
  );
}

export function applyProjectTokens<T>(value: T): T {
  if (typeof value === "string") {
    return replaceProjectTokens(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => applyProjectTokens(item)) as T;
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, applyProjectTokens(nested)]),
    ) as T;
  }

  return value;
}

export function buildServiceSeoTitle(title: string) {
  return normalizeWhitespace(
    `${replaceProjectTokens(title)} ${siteConfig.primaryCity}`,
  );
}

export function buildServiceImageAlt(
  title: string,
  context = "consultation and planning",
) {
  return normalizeWhitespace(
    `${replaceProjectTokens(title)} ${context} in a ${projectContentTokens.PREMIUM_CITY_CLINIC}`,
  );
}

export function buildBlogImageAlt(
  title: string,
  context = "guide image",
) {
  return normalizeWhitespace(
    `${replaceProjectTokens(title)} ${context} in a ${projectContentTokens.PREMIUM_CITY_CLINIC}`,
  );
}
