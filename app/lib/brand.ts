import { siteConfig } from "@/app/lib/siteConfig";

export const brandName = siteConfig.brandName;
export const legacyBrandNames = siteConfig.legacyBrandNames;

export function replaceBrandText(value: string) {
  return legacyBrandNames.reduce(
    (result, legacyBrandName) => result.replaceAll(legacyBrandName, brandName),
    value,
  );
}

export function replaceBrandDeep<T>(value: T): T {
  if (typeof value === "string") {
    return replaceBrandText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceBrandDeep(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, replaceBrandDeep(nested)]),
    ) as T;
  }

  return value;
}
