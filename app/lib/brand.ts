export const brandName = "UK Hair Transplant";
export const legacyBrandName = "UK Hair Transplant Co";

export function replaceBrandText(value: string) {
  return value.replaceAll(legacyBrandName, brandName);
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
