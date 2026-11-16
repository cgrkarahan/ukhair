import { applyProjectTokens } from "@/app/lib/contentTemplates";
import {
  locationInputs,
  type LocationInput,
  type LocationTravelInfo,
  type Nation,
} from "@/app/lib/locationData";
import type { TopicCard, TopicFaq, TopicSection } from "@/app/lib/siteContent";

export type { LocationTravelInfo };

export type LocationPageContent = {
  slug: string;
  city: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  keywords: string[];
  heroChips: string[];
  cards: TopicCard[];
  travel: LocationTravelInfo;
  sections: TopicSection[];
  faq: TopicFaq[];
  relatedSlugs: string[];
  relatedLocationSlugs: string[];
  publishedAt: string;
  updatedAt: string;
};

const relatedSlugs = [
  "hair-transplant-london",
  "hair-transplant-cost-london",
  "our-clinical-standards",
  "uk-vs-turkey-hair-transplant",
  "hair-transplant-recovery-timeline",
  // Condition guides; pages that do not exist yet are skipped by the route.
  "types-of-hair-loss",
  "receding-hairline",
];

const relatedCitiesByCity: Record<string, string[]> = {
  Manchester: ["Liverpool", "Leeds", "Sheffield", "Bradford"],
  Birmingham: ["Coventry", "Leicester", "Derby", "Nottingham"],
  Leeds: ["Bradford", "York", "Sheffield", "Manchester"],
  Liverpool: ["Manchester", "Leeds", "Sheffield"],
  Sheffield: ["Leeds", "Manchester", "Nottingham", "Derby"],
  Newcastle: ["Edinburgh", "York", "Leeds"],
  Glasgow: ["Edinburgh", "Newcastle"],
  Edinburgh: ["Glasgow", "Newcastle", "York"],
  Bristol: ["Bath", "Cardiff", "Exeter"],
  Cardiff: ["Swansea", "Bristol", "Bath"],
  Nottingham: ["Derby", "Leicester", "Sheffield", "Birmingham"],
  Leicester: ["Nottingham", "Derby", "Coventry", "Birmingham"],
  Derby: ["Nottingham", "Leicester", "Sheffield", "Birmingham"],
  Bradford: ["Leeds", "York", "Manchester", "Sheffield"],
  Swansea: ["Cardiff", "Bristol", "Bath"],
  Southampton: ["Portsmouth", "Brighton", "Reading"],
  Brighton: ["Portsmouth", "Southampton", "Reading"],
  Oxford: ["Reading", "Coventry", "Bath", "Cambridge"],
  Cambridge: ["Oxford", "Leicester", "Coventry", "Reading"],
  Reading: ["Oxford", "Bath", "Southampton", "Coventry"],
  Coventry: ["Birmingham", "Leicester", "Oxford", "Derby"],
  Portsmouth: ["Southampton", "Brighton", "Reading"],
  York: ["Leeds", "Bradford", "Sheffield", "Newcastle"],
  Bath: ["Bristol", "Cardiff", "Exeter", "Reading"],
  Exeter: ["Bristol", "Bath", "Cardiff", "Swansea"],
};

// The CQC covers England only, so the regulator check has to follow the city.
const regulatorCheck: Record<Nation, string> = {
  england:
    "Independent clinics in England that perform surgery should be registered with the Care Quality Commission (CQC). Look the provider up on the CQC's public register rather than relying on a logo.",
  scotland:
    "In Scotland, independent clinics register with Healthcare Improvement Scotland rather than the CQC. A London clinic will be on the CQC register instead, so check each option against the regulator for its own nation.",
  wales:
    "In Wales, independent healthcare is overseen by Healthcare Inspectorate Wales rather than the CQC. A London clinic will be on the CQC register instead, so check each option against the regulator for its own nation.",
};

/**
 * The one generated section. It is deliberately short: the full guidance on
 * choosing a provider, recovery and Turkey lives on the hub pages linked under
 * "Read next", so it is not repeated on every city page.
 */
function standardsSection({ nation }: LocationInput): TopicSection {
  return {
    title: "Checks that apply wherever you book",
    body: [regulatorCheck[nation]],
    bullets: [
      "Check the named doctor on the GMC register.",
      "Ask how the graft range was assessed and what the quote includes.",
      "Our clinical standards, recovery timeline and UK vs Turkey guides cover the rest in depth.",
    ],
  };
}

function buildLocationPage(input: LocationInput): LocationPageContent {
  const { city } = input;
  const lower = city.toLowerCase();

  return applyProjectTokens({
    slug: `hair-transplant-${lower.replace(/[^a-z]+/g, "-")}`,
    city,
    title: input.title,
    seoTitle: input.seoTitle,
    description: input.description,
    eyebrow: `Hair transplant ${city}`,
    lead: input.lead,
    keywords: [
      `hair transplant ${lower}`,
      `hair transplant clinic ${lower}`,
      `hair transplant ${lower} cost`,
      `fue ${lower}`,
    ],
    heroChips: input.heroChips,
    cards: input.cards,
    travel: input.travel,
    sections: [...input.sections, standardsSection(input)],
    faq: input.faq,
    relatedSlugs,
    relatedLocationSlugs: (relatedCitiesByCity[city] ?? []).map(
      (relatedCity) =>
        `hair-transplant-${relatedCity.toLowerCase().replace(/[^a-z]+/g, "-")}`,
    ),
    publishedAt: input.publishedAt,
    updatedAt: input.updatedAt ?? input.publishedAt,
  });
}

export const locationPageList: LocationPageContent[] = locationInputs.map(buildLocationPage);

export const locationPages: Record<string, LocationPageContent> = Object.fromEntries(
  locationPageList.map((page) => [page.slug, page]),
);
