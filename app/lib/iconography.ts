import type { SiteIconName } from "@/app/components/SiteIcon";

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

export function iconForHref(href: string): SiteIconName {
  const normalized = href.replace(/\/$/, "");

  const directMap: Record<string, SiteIconName> = {
    "/": "map-pin",
    "/about": "book-open",
    "/assessment": "clipboard-check",
    "/blog": "book-open",
    "/contact": "phone",
    "/cookies": "clipboard-check",
    "/how-we-work": "route",
    "/privacy": "shield-check",
    "/terms": "clipboard-check",
    "/hair-transplant-london": "map-pin",
    "/hair-transplant-cost-london": "wallet",
    "/how-we-select-clinics": "clipboard-check",
    "/our-clinical-standards": "shield-check",
    "/patient-guidance-process": "compass",
    "/why-turkiye": "globe",
    "/uk-vs-turkey-hair-transplant": "globe",
    "/how-hair-transplant-works": "route",
    "/hair-transplant-recovery-timeline": "clock",
    "/hair-transplant-side-effects": "alert-circle",
    "/fue-vs-dhi": "route",
    "/hair-transplant-without-shaving": "sparkles",
    "/female-hair-transplant-london": "sparkles",
  };

  if (directMap[normalized]) {
    return directMap[normalized];
  }

  if (normalized.startsWith("/blog/")) {
    return iconForKeywords(normalized.replace("/blog/", "").replaceAll("-", " "), "book-open");
  }

  if (normalized.startsWith("/services/female")) return "sparkles";
  if (normalized.startsWith("/services/eyebrow")) return "sparkles";
  if (normalized.startsWith("/services/beard")) return "stethoscope";
  if (normalized.startsWith("/services/")) return "stethoscope";

  return "book-open";
}

function iconForKeywords(text: string, fallback: SiteIconName): SiteIconName {
  const value = text.toLowerCase();

  if (includesAny(value, ["uk vs", "turkey", "travel", "overseas", "international"])) {
    return "globe";
  }

  if (includesAny(value, ["side effect", "symptom", "swelling", "itch", "scar", "bleeding", "redness"])) {
    return "alert-circle";
  }

  if (includesAny(value, ["recovery", "aftercare", "timeline", "healing", "growth", "follow-up"])) {
    return "clock";
  }

  if (includesAny(value, ["cost", "price", "quote", "pricing", "value"])) {
    return "wallet";
  }

  if (includesAny(value, ["standard", "trust", "clinic", "gmc", "cqc", "governance", "quality"])) {
    return "shield-check";
  }

  if (includesAny(value, ["assessment", "enquire", "enquiry", "prepare", "review", "question", "guidance"])) {
    return "clipboard-check";
  }

  if (includesAny(value, ["work", "procedure", "treatment day", "method", "process", "how hair transplant works"])) {
    return "route";
  }

  if (includesAny(value, ["london", "central london", "harley street"])) {
    return "map-pin";
  }

  if (includesAny(value, ["female", "women", "eyebrow", "beauty", "soft", "discreet", "without shaving"])) {
    return "sparkles";
  }

  if (includesAny(value, ["call", "contact", "talk", "message"])) {
    return "message-dots";
  }

  if (includesAny(value, ["hair", "donor", "follicle", "density", "regrowth"])) {
    return "droplet";
  }

  return fallback;
}

export function iconForHomePillar(title: string, index: number): SiteIconName {
  const fallback: SiteIconName[] = ["map-pin", "shield-check", "stethoscope", "book-open"];
  return iconForKeywords(title, fallback[index] ?? "shield-check");
}

export function iconForSignal(value: string): SiteIconName {
  const map: Record<string, SiteIconName> = {
    London: "map-pin",
    GMC: "shield-check",
    CQC: "clipboard-check",
    "UK + Turkey": "globe",
  };

  return map[value] ?? "book-open";
}

export function iconForJourney(index: number, title: string): SiteIconName {
  const fallback: SiteIconName[] = ["compass", "map-pin", "shield-check", "clipboard-check"];
  return iconForKeywords(title, fallback[index] ?? "compass");
}

export function iconForTopicCard(pageSlug: string, title: string, index: number): SiteIconName {
  const fallback: SiteIconName[] = ["map-pin", "shield-check", "book-open", "clock"];
  return iconForKeywords(`${pageSlug} ${title}`, fallback[index] ?? "book-open");
}

export function iconForTopicSection(
  pageSlug: string,
  title: string,
  index: number,
): SiteIconName {
  const fallback: SiteIconName[] = ["book-open", "shield-check", "clock", "clipboard-check"];
  return iconForKeywords(`${pageSlug} ${title}`, fallback[index] ?? "book-open");
}

export function iconForTimelineStage(title: string, index: number): SiteIconName {
  const fallback: SiteIconName[] = [
    "clipboard-check",
    "calendar-check",
    "alert-circle",
    "droplet",
  ];

  return iconForKeywords(title, fallback[index] ?? "clock");
}

export function iconForComparisonLabel(label: string, index: number): SiteIconName {
  const fallback: SiteIconName[] = [
    "shield-check",
    "clipboard-check",
    "wallet",
    "clock",
    "globe",
  ];

  return iconForKeywords(label, fallback[index] ?? "book-open");
}

export function iconForFooterGroup(title: string): SiteIconName {
  const map: Record<string, SiteIconName> = {
    "Core information": "book-open",
    "What to know": "compass",
    Recovery: "clock",
  };

  return map[title] ?? "book-open";
}

export function iconForServiceSlug(slug: string): SiteIconName {
  const value = slug.toLowerCase();

  if (value.includes("female") || value.includes("eyebrow")) return "sparkles";
  if (value.includes("beard") || value.includes("moustache")) return "stethoscope";
  if (value.includes("hair-loss")) return "shield-check";

  return "route";
}
