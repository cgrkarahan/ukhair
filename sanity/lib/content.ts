import type { SiteIconName } from "@/app/components/SiteIcon";
import { replaceBrandDeep } from "@/app/lib/brand";
import { siteContact } from "@/app/lib/contact";
import {
  homeFaq,
  homeGuideHighlights,
  homeJourney,
  homeSignals,
  homeTrustPillars,
  topicPages,
  type LinkCard,
  type TopicCard,
  type TopicComparison,
  type TopicFaq,
  type TopicHeroPanel,
  type TopicPageContent,
  type TopicPriceStory,
  type TopicSection,
  type TopicTimeline,
} from "@/app/lib/siteContent";
import {
  approvedProofCases,
  approvedReviews,
  type ApprovedProofCase,
  type ApprovedReview,
} from "@/app/lib/proof";
import {
  serviceCatalog,
  serviceCatalogBySlug,
  type ServiceDetail,
} from "@/app/services/serviceData";
import { client } from "@/sanity/lib/client";
import {
  homePageQuery,
  patientReviewsQuery,
  proofCasesQuery,
  servicePageBySlugQuery,
  servicePagesQuery,
  siteSettingsQuery,
  topicPageBySlugQuery,
  topicPagesQuery,
} from "@/sanity/lib/queries";

type Maybe<T> = T | null | undefined;

type SeoDocument = {
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalPath?: string;
  };
};

export type SiteSettingsContent = {
  brandName: string;
  email: string;
  phoneNumber: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappLabel: string;
  clinicLocation: string;
};

type HomeTextItem = {
  icon: SiteIconName;
  text: string;
};

export type HomePageContent = {
  seoTitle: string;
  description: string;
  keywords: string[];
  hero: {
    eyebrow: string;
    headline: string;
    lead: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    chips: string[];
  };
  trustPillars: TopicCard[];
  signals: { value: string; label: string }[];
  servicesIntro: {
    eyebrow: string;
    headline: string;
    intro: string;
  };
  londonDecision: {
    eyebrow: string;
    headline: string;
    body: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  journey: {
    eyebrow: string;
    headline: string;
    steps: TopicCard[];
  };
  guideSection: {
    eyebrow: string;
    headline: string;
    intro: string;
    links: LinkCard[];
  };
  proofSection: {
    eyebrow: string;
    headline: string;
    fallbackItems: HomeTextItem[];
  };
  expectations: {
    eyebrow: string;
    items: HomeTextItem[];
  };
  assessment: {
    title: string;
    intro: string;
  };
  faq: TopicFaq[];
};

type HomePageDocument = SeoDocument & {
  hero?: Partial<HomePageContent["hero"]>;
  trustPillars?: TopicCard[];
  signals?: { value: string; label: string }[];
  servicesIntro?: Partial<HomePageContent["servicesIntro"]>;
  londonDecision?: Partial<HomePageContent["londonDecision"]>;
  journey?: Partial<HomePageContent["journey"]>;
  guideSection?: Partial<HomePageContent["guideSection"]>;
  proofSection?: {
    eyebrow?: string;
    headline?: string;
    fallbackItems?: string[];
  };
  expectations?: {
    eyebrow?: string;
    items?: string[];
  };
  assessment?: Partial<HomePageContent["assessment"]>;
  faq?: TopicFaq[];
};

type TopicPageDocument = SeoDocument &
  Omit<TopicPageContent, "seoTitle" | "description" | "keywords" | "relatedSlugs"> & {
    relatedSlugs?: string[];
  };

type ServicePageDocument = SeoDocument &
  Omit<ServiceDetail, "seoTitle" | "seoDescription" | "keywords" | "relatedGuideSlugs"> & {
    relatedGuideSlugs?: string[];
  };

const fallbackProofNotes: HomeTextItem[] = [
  {
    icon: "book-open",
    text: "Useful case examples should explain the area treated, the recovery timeline, and the planning discussion behind the result.",
  },
  {
    icon: "message-dots",
    text: "Useful reviews usually mention communication, recovery, expectations, and aftercare rather than relying on vague praise alone.",
  },
  {
    icon: "shield-check",
    text: "Real proof should sit alongside standards, pricing, and recovery information so the full decision is easier to judge.",
  },
  {
    icon: "clock",
    text: "Until approved cases are published, clear information on standards and planning is more useful than exaggerated before-and-after claims.",
  },
];

const fallbackExpectationItems: HomeTextItem[] = [
  {
    icon: "map-pin",
    text: "Central London access for patients who want easier consultation, treatment-day, and follow-up logistics.",
  },
  {
    icon: "shield-check",
    text: "Clear trust language around GMC-registered doctors and a CQC-registered provider in England.",
  },
  {
    icon: "wallet",
    text: "Pricing explained through graft range, method, aftercare, and what the quote includes.",
  },
  {
    icon: "clock",
    text: "Recovery, side effects, and planning brought forward early so expectations stay realistic.",
  },
];

const fallbackHomePage: HomePageContent = {
  seoTitle: "Hair Transplant London | UK Hair Transplant",
  description:
    "Explore hair transplant treatment in London with clear guidance on suitability, cost, clinic standards, recovery, and what to prepare before requesting an assessment.",
  keywords: [
    "hair transplant london",
    "hair transplant cost london",
    "uk vs turkey hair transplant",
    "hair transplant recovery timeline",
    "female hair transplant london",
  ],
  hero: {
    eyebrow: "Hair transplant London",
    headline:
      "Hair transplant in London, with the important questions answered first.",
    lead: "If you are comparing London clinics, Turkey, cost, recovery, or whether you are suitable at all, start here. UK Hair Transplant brings the practical questions together before you request an assessment.",
    primaryCtaLabel: "Request assessment",
    secondaryCtaLabel: "Explore London treatment",
    chips: [
      "Central London clinic access",
      "GMC-registered doctors",
      "CQC-registered provider in England",
      "UK-first, Turkey-aware guidance",
    ],
  },
  trustPillars: homeTrustPillars,
  signals: homeSignals,
  servicesIntro: {
    eyebrow: "Treatments",
    headline: "Treatment options, explained before you choose a route.",
    intro:
      "Explore scalp and facial-hair treatments with practical guidance on suitability, planning, recovery, and what a London consultation should clarify before you move forward.",
  },
  londonDecision: {
    eyebrow: "Why patients choose London first",
    headline: "London is not only a location decision.",
    body: [
      "A London route can make sense when consultation access, local follow-up, recovery support, and a familiar care environment matter more than the lowest possible starting price.",
      "The right decision still depends on your case. That means checking suitability, likely graft range, method options, what the quote includes, and who is responsible for care.",
    ],
    primaryCtaLabel: "How we select clinics",
    secondaryCtaLabel: "Before you enquire",
  },
  journey: {
    eyebrow: "How to approach the decision",
    headline: "A calmer route from research to assessment.",
    steps: homeJourney,
  },
  guideSection: {
    eyebrow: "Further reading",
    headline: "Start with the pages that answer the real decision points.",
    intro:
      "Most patients need clear answers on London treatment, cost, clinic standards, UK versus Turkey, recovery, side effects, and whether their case may be suitable.",
    links: homeGuideHighlights,
  },
  proofSection: {
    eyebrow: "Proof and standards",
    headline: "Proof should be specific, not decorative.",
    fallbackItems: fallbackProofNotes,
  },
  expectations: {
    eyebrow: "What patients should expect here",
    items: fallbackExpectationItems,
  },
  assessment: {
    title: "Request an assessment when you have the basics clear.",
    intro:
      "Share your concern, timing, any useful location context, and any helpful photos so the first response can focus on your case.",
  },
  faq: homeFaq,
};

const fallbackSiteSettings: SiteSettingsContent = {
  brandName: "UK Hair Transplant",
  email: siteContact.email,
  phoneNumber: siteContact.phoneNumber,
  phoneDisplay: siteContact.phoneDisplay,
  whatsappNumber: siteContact.whatsappNumber,
  whatsappLabel: siteContact.whatsappLabel,
  clinicLocation: siteContact.clinicLocation,
};

async function safeFetch<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    return replaceBrandDeep(result);
  } catch {
    return null;
  }
}

function textOrFallback(value: Maybe<string>, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function arrayOrFallback<T>(value: Maybe<T[]>, fallback: T[]) {
  return Array.isArray(value) && value.length > 0 ? value : fallback;
}

function mergeCards(value: Maybe<TopicCard[]>, fallback: TopicCard[]) {
  return arrayOrFallback(value, fallback);
}

function mergeFaq(value: Maybe<TopicFaq[]>, fallback: TopicFaq[]) {
  return arrayOrFallback(value, fallback);
}

function mapTextItems(value: Maybe<string[]>, fallback: HomeTextItem[]) {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((text, index) => ({
    icon: fallback[index % fallback.length]?.icon ?? "book-open",
    text,
  }));
}

function normalizeComparison(
  value: Maybe<TopicComparison>,
  fallback: Maybe<TopicComparison>,
): TopicComparison | undefined {
  if (!value || !fallback) {
    return value ?? fallback ?? undefined;
  }

  const columns =
    Array.isArray(value.columns) && value.columns.length === 3
      ? (value.columns as [string, string, string])
      : fallback.columns;

  return {
    title: textOrFallback(value.title, fallback.title),
    intro: textOrFallback(value.intro, fallback.intro),
    columns,
    rows: arrayOrFallback(value.rows, fallback.rows),
  };
}

function normalizeTopicPage(
  page: TopicPageDocument,
  fallback: Maybe<TopicPageContent>,
): TopicPageContent {
  const heroPanel =
    (page.heroPanel as Maybe<TopicHeroPanel>) ??
    fallback?.heroPanel ??
    undefined;
  const priceStory =
    (page.priceStory as Maybe<TopicPriceStory>) ??
    fallback?.priceStory ??
    undefined;

  return {
    slug: textOrFallback(page.slug, fallback?.slug ?? ""),
    title: textOrFallback(page.title, fallback?.title ?? ""),
    seoTitle: textOrFallback(page.seo?.title, fallback?.seoTitle ?? page.title),
    description: textOrFallback(
      page.seo?.description,
      fallback?.description ?? page.lead,
    ),
    eyebrow: textOrFallback(page.eyebrow, fallback?.eyebrow ?? ""),
    lead: textOrFallback(page.lead, fallback?.lead ?? ""),
    keywords: arrayOrFallback(page.seo?.keywords, fallback?.keywords ?? []),
    heroImageSrc: fallback?.heroImageSrc,
    heroImageAlt: fallback?.heroImageAlt,
    heroPanel,
    heroChips: arrayOrFallback(page.heroChips, fallback?.heroChips ?? []),
    cards: mergeCards(page.cards, fallback?.cards ?? []),
    sections: arrayOrFallback<TopicSection>(
      page.sections,
      fallback?.sections ?? [],
    ),
    timeline: arrayOrFallback<TopicTimeline>(
      page.timeline,
      fallback?.timeline ?? [],
    ),
    priceStory,
    comparison: normalizeComparison(page.comparison, fallback?.comparison),
    faq: mergeFaq(page.faq, fallback?.faq ?? []),
    relatedSlugs: arrayOrFallback(page.relatedSlugs, fallback?.relatedSlugs ?? []),
  };
}

function normalizeServicePage(
  page: ServicePageDocument,
  fallback: Maybe<ServiceDetail>,
): ServiceDetail {
  return {
    slug: textOrFallback(page.slug, fallback?.slug ?? ""),
    title: textOrFallback(page.title, fallback?.title ?? ""),
    shortDescription: textOrFallback(
      page.shortDescription,
      fallback?.shortDescription ?? "",
    ),
    seoTitle: textOrFallback(page.seo?.title, fallback?.seoTitle ?? page.title),
    seoDescription: textOrFallback(
      page.seo?.description,
      fallback?.seoDescription ?? page.shortDescription,
    ),
    keywords: arrayOrFallback(page.seo?.keywords, fallback?.keywords ?? []),
    imageSrc: textOrFallback(page.imageSrc, fallback?.imageSrc ?? ""),
    imageAlt: textOrFallback(page.imageAlt, fallback?.imageAlt ?? page.title),
    badge: textOrFallback(page.badge, fallback?.badge ?? ""),
    bestFor: textOrFallback(page.bestFor, fallback?.bestFor ?? ""),
    outcome: textOrFallback(page.outcome, fallback?.outcome ?? ""),
    intro: textOrFallback(page.intro, fallback?.intro ?? ""),
    consultation: arrayOrFallback(page.consultation, fallback?.consultation ?? []),
    highlights: arrayOrFallback(page.highlights, fallback?.highlights ?? []),
    guideHeading: textOrFallback(
      page.guideHeading,
      fallback?.guideHeading ?? "",
    ),
    guideSections: arrayOrFallback(
      page.guideSections,
      fallback?.guideSections ?? [],
    ),
    londonContext: arrayOrFallback(
      page.londonContext,
      fallback?.londonContext ?? [],
    ),
    selectionCriteria: arrayOrFallback(
      page.selectionCriteria,
      fallback?.selectionCriteria ?? [],
    ),
    recoveryNotes: arrayOrFallback(
      page.recoveryNotes,
      fallback?.recoveryNotes ?? [],
    ),
    relatedGuideSlugs: arrayOrFallback(
      page.relatedGuideSlugs,
      fallback?.relatedGuideSlugs ?? [],
    ),
  };
}

function mergeHomePage(page: Maybe<HomePageDocument>): HomePageContent {
  if (!page) {
    return fallbackHomePage;
  }

  return {
    ...fallbackHomePage,
    seoTitle: textOrFallback(page.seo?.title, fallbackHomePage.seoTitle),
    description: textOrFallback(
      page.seo?.description,
      fallbackHomePage.description,
    ),
    keywords: arrayOrFallback(page.seo?.keywords, fallbackHomePage.keywords),
    hero: {
      eyebrow: textOrFallback(page.hero?.eyebrow, fallbackHomePage.hero.eyebrow),
      headline: textOrFallback(
        page.hero?.headline,
        fallbackHomePage.hero.headline,
      ),
      lead: textOrFallback(page.hero?.lead, fallbackHomePage.hero.lead),
      primaryCtaLabel: textOrFallback(
        page.hero?.primaryCtaLabel,
        fallbackHomePage.hero.primaryCtaLabel,
      ),
      secondaryCtaLabel: textOrFallback(
        page.hero?.secondaryCtaLabel,
        fallbackHomePage.hero.secondaryCtaLabel,
      ),
      chips: arrayOrFallback(page.hero?.chips, fallbackHomePage.hero.chips),
    },
    trustPillars: mergeCards(page.trustPillars, fallbackHomePage.trustPillars),
    signals: arrayOrFallback(page.signals, fallbackHomePage.signals),
    servicesIntro: {
      eyebrow: textOrFallback(
        page.servicesIntro?.eyebrow,
        fallbackHomePage.servicesIntro.eyebrow,
      ),
      headline: textOrFallback(
        page.servicesIntro?.headline,
        fallbackHomePage.servicesIntro.headline,
      ),
      intro: textOrFallback(
        page.servicesIntro?.intro,
        fallbackHomePage.servicesIntro.intro,
      ),
    },
    londonDecision: {
      eyebrow: textOrFallback(
        page.londonDecision?.eyebrow,
        fallbackHomePage.londonDecision.eyebrow,
      ),
      headline: textOrFallback(
        page.londonDecision?.headline,
        fallbackHomePage.londonDecision.headline,
      ),
      body: arrayOrFallback(
        page.londonDecision?.body,
        fallbackHomePage.londonDecision.body,
      ),
      primaryCtaLabel: textOrFallback(
        page.londonDecision?.primaryCtaLabel,
        fallbackHomePage.londonDecision.primaryCtaLabel,
      ),
      secondaryCtaLabel: textOrFallback(
        page.londonDecision?.secondaryCtaLabel,
        fallbackHomePage.londonDecision.secondaryCtaLabel,
      ),
    },
    journey: {
      eyebrow: textOrFallback(
        page.journey?.eyebrow,
        fallbackHomePage.journey.eyebrow,
      ),
      headline: textOrFallback(
        page.journey?.headline,
        fallbackHomePage.journey.headline,
      ),
      steps: mergeCards(page.journey?.steps, fallbackHomePage.journey.steps),
    },
    guideSection: {
      eyebrow: textOrFallback(
        page.guideSection?.eyebrow,
        fallbackHomePage.guideSection.eyebrow,
      ),
      headline: textOrFallback(
        page.guideSection?.headline,
        fallbackHomePage.guideSection.headline,
      ),
      intro: textOrFallback(
        page.guideSection?.intro,
        fallbackHomePage.guideSection.intro,
      ),
      links: arrayOrFallback(
        page.guideSection?.links,
        fallbackHomePage.guideSection.links,
      ),
    },
    proofSection: {
      eyebrow: textOrFallback(
        page.proofSection?.eyebrow,
        fallbackHomePage.proofSection.eyebrow,
      ),
      headline: textOrFallback(
        page.proofSection?.headline,
        fallbackHomePage.proofSection.headline,
      ),
      fallbackItems: mapTextItems(
        page.proofSection?.fallbackItems,
        fallbackHomePage.proofSection.fallbackItems,
      ),
    },
    expectations: {
      eyebrow: textOrFallback(
        page.expectations?.eyebrow,
        fallbackHomePage.expectations.eyebrow,
      ),
      items: mapTextItems(
        page.expectations?.items,
        fallbackHomePage.expectations.items,
      ),
    },
    assessment: {
      title: textOrFallback(
        page.assessment?.title,
        fallbackHomePage.assessment.title,
      ),
      intro: textOrFallback(
        page.assessment?.intro,
        fallbackHomePage.assessment.intro,
      ),
    },
    faq: mergeFaq(page.faq, fallbackHomePage.faq),
  };
}

export async function getSiteSettingsContent(): Promise<SiteSettingsContent> {
  const settings = await safeFetch<Partial<SiteSettingsContent>>(siteSettingsQuery);

  if (!settings) {
    return fallbackSiteSettings;
  }

  return {
    brandName: textOrFallback(settings.brandName, fallbackSiteSettings.brandName),
    email: textOrFallback(settings.email, fallbackSiteSettings.email),
    phoneNumber: textOrFallback(
      settings.phoneNumber,
      fallbackSiteSettings.phoneNumber,
    ),
    phoneDisplay: textOrFallback(
      settings.phoneDisplay,
      fallbackSiteSettings.phoneDisplay,
    ),
    whatsappNumber: textOrFallback(
      settings.whatsappNumber,
      fallbackSiteSettings.whatsappNumber,
    ),
    whatsappLabel: textOrFallback(
      settings.whatsappLabel,
      fallbackSiteSettings.whatsappLabel,
    ),
    clinicLocation: textOrFallback(
      settings.clinicLocation,
      fallbackSiteSettings.clinicLocation,
    ),
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const page = await safeFetch<HomePageDocument>(homePageQuery);
  return mergeHomePage(page);
}

export async function getTopicPageContent(
  slug: string,
): Promise<TopicPageContent | null> {
  const page = await safeFetch<TopicPageDocument>(topicPageBySlugQuery, { slug });
  const fallback = topicPages[slug];

  if (!page && !fallback) {
    return null;
  }

  return page ? normalizeTopicPage(page, fallback) : fallback;
}

export async function getTopicPagesContent(): Promise<TopicPageContent[]> {
  const pages = await safeFetch<TopicPageDocument[]>(topicPagesQuery);

  if (!Array.isArray(pages) || pages.length === 0) {
    return Object.values(topicPages);
  }

  const normalizedPages = pages.map((page) =>
    normalizeTopicPage(page, topicPages[page.slug]),
  );
  const seenSlugs = new Set(normalizedPages.map((page) => page.slug));
  const fallbackOnlyPages = Object.values(topicPages).filter(
    (page) => !seenSlugs.has(page.slug),
  );

  return [...normalizedPages, ...fallbackOnlyPages];
}

export async function getServicePageContent(
  slug: string,
): Promise<ServiceDetail | null> {
  const page = await safeFetch<ServicePageDocument>(servicePageBySlugQuery, {
    slug,
  });
  const fallback = serviceCatalogBySlug[slug];

  if (!page && !fallback) {
    return null;
  }

  return page ? normalizeServicePage(page, fallback) : fallback;
}

export async function getServiceCatalogContent(): Promise<ServiceDetail[]> {
  const pages = await safeFetch<ServicePageDocument[]>(servicePagesQuery);

  if (!Array.isArray(pages) || pages.length === 0) {
    return serviceCatalog;
  }

  const normalizedPages = pages.map((page) =>
    normalizeServicePage(page, serviceCatalogBySlug[page.slug]),
  );
  const seenSlugs = new Set(normalizedPages.map((page) => page.slug));
  const fallbackOnlyPages = serviceCatalog.filter(
    (service) => !seenSlugs.has(service.slug),
  );

  return [...normalizedPages, ...fallbackOnlyPages];
}

export async function getProofCasesContent(): Promise<ApprovedProofCase[]> {
  const proofCases = await safeFetch<ApprovedProofCase[]>(proofCasesQuery);
  const resolvedCases = arrayOrFallback(proofCases, approvedProofCases);
  const localOverridesBySlug = new Map(
    approvedProofCases.map((proofCase) => [proofCase.slug, proofCase]),
  );

  return resolvedCases.map((proofCase) => {
    const localOverride = localOverridesBySlug.get(proofCase.slug);

    if (!localOverride) {
      return proofCase;
    }

    return {
      ...proofCase,
      ...localOverride,
    };
  });
}

export async function getReviewsContent(): Promise<ApprovedReview[]> {
  const reviews = await safeFetch<ApprovedReview[]>(patientReviewsQuery);
  const localApprovedReviews = approvedReviews.filter(
    (review) => !review.isPlaceholder,
  );
  const fetchedReviews = arrayOrFallback(reviews, approvedReviews);
  const publishedNonPlaceholderReviews = fetchedReviews.filter(
    (review) => !review.isPlaceholder,
  );

  if (publishedNonPlaceholderReviews.length > 0) {
    return publishedNonPlaceholderReviews;
  }

  if (localApprovedReviews.length > 0) {
    return localApprovedReviews;
  }

  return fetchedReviews;
}
