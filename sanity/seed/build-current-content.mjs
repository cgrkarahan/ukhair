import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const repoRoot = path.resolve(import.meta.dirname, "../..");
const outputPath = path.join(repoRoot, "sanity/seed/current-content.ndjson");

function loadTs(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
  const sandboxModule = { exports: {} };

  vm.runInNewContext(transpiled, {
    module: sandboxModule,
    exports: sandboxModule.exports,
    require,
    console,
  });

  return sandboxModule.exports;
}

function key(prefix, index) {
  return `${prefix}-${String(index).padStart(2, "0")}`;
}

function slug(value) {
  return { _type: "slug", current: value };
}

function seo({ title, description, keywords = [], canonicalPath }) {
  return {
    _type: "seoFields",
    title,
    description,
    keywords,
    canonicalPath,
  };
}

function card(item, index) {
  return {
    _key: key("card", index),
    _type: "topicCard",
    title: item.title,
    text: item.text,
  };
}

function linkCard(item, index) {
  return {
    _key: key("link", index),
    _type: "linkCard",
    href: item.href,
    label: item.label,
    description: item.description,
  };
}

function faq(item, index) {
  return {
    _key: key("faq", index),
    _type: "topicFaq",
    question: item.question,
    answer: item.answer,
  };
}

function section(item, index) {
  return {
    _key: key("section", index),
    _type: "topicSection",
    title: item.title,
    intro: item.intro,
    body: item.body,
    bullets: item.bullets,
  };
}

function timelineItem(item, index) {
  return {
    _key: key("timeline", index),
    _type: "topicTimelineItem",
    title: item.title,
    text: item.text,
  };
}

function comparison(item) {
  if (!item) {
    return undefined;
  }

  return {
    _type: "topicComparison",
    title: item.title,
    intro: item.intro,
    columns: item.columns,
    rows: item.rows.map((row, index) => ({
      _key: key("row", index),
      _type: "topicComparisonRow",
      label: row.label,
      left: row.left,
      right: row.right,
    })),
  };
}

function reference(type, slugValue, index) {
  return {
    _key: key(`${type}-ref`, index),
    _type: "reference",
    _ref: `${type}.${slugValue}`,
  };
}

function signal(item, index) {
  return {
    _key: key("signal", index),
    _type: "homeSignal",
    value: item.value,
    label: item.label,
  };
}

function serviceHighlight(item, index) {
  return {
    _key: key("highlight", index),
    _type: "serviceHighlight",
    title: item.title,
    text: item.text,
  };
}

function serviceSection(item, index) {
  return {
    _key: key("service-section", index),
    _type: "serviceGuideSection",
    title: item.title,
    body: item.body,
  };
}

const {
  homeFaq,
  homeGuideHighlights,
  homeJourney,
  homeSignals,
  homeTrustPillars,
  topicPages,
} = loadTs("app/lib/siteContent.ts");
const { serviceCatalog } = loadTs("app/services/serviceData.ts");
const { approvedProofCases, approvedReviews } = loadTs("app/lib/proof.ts");

const homepageDescription =
  "Explore hair transplant treatment in London with clear guidance on suitability, cost, clinic standards, recovery, and what to prepare before requesting an assessment.";

const proofFallbackItems = [
  "Useful case examples should explain the area treated, the recovery timeline, and the planning discussion behind the result.",
  "Useful reviews usually mention communication, recovery, expectations, and aftercare rather than relying on vague praise alone.",
  "Real proof should sit alongside standards, pricing, and recovery information so the full decision is easier to judge.",
  "Until approved cases are published, clear information on standards and planning is more useful than exaggerated before-and-after claims.",
];

const expectationItems = [
  "Central London access for patients who want easier consultation, treatment-day, and follow-up logistics.",
  "Clear trust language around GMC-registered doctors and a CQC-registered provider in England.",
  "Pricing explained through graft range, method, aftercare, and what the quote includes.",
  "Recovery, side effects, and planning brought forward early so expectations stay realistic.",
];

const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Site Settings",
    brandName: "UK Hair Transplant",
    email: "hello@ukhairtransplant.co",
    phoneNumber: "",
    phoneDisplay: "",
    whatsappNumber: "",
    whatsappLabel: "WhatsApp us",
    clinicLocation: "Premium central London clinic access",
  },
  {
    _id: "homePage",
    _type: "homePage",
    title: "Homepage",
    seo: seo({
      title: "Hair Transplant London | UK Hair Transplant",
      description: homepageDescription,
      keywords: [
        "hair transplant london",
        "hair transplant cost london",
        "uk vs turkey hair transplant",
        "hair transplant recovery timeline",
        "female hair transplant london",
      ],
      canonicalPath: "/",
    }),
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
    trustPillars: homeTrustPillars.map(card),
    signals: homeSignals.map(signal),
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
      steps: homeJourney.map(card),
    },
    guideSection: {
      eyebrow: "Further reading",
      headline: "Start with the pages that answer the real decision points.",
      intro:
        "Most patients need clear answers on London treatment, cost, clinic standards, UK versus Turkey, recovery, side effects, and whether their case may be suitable.",
      links: homeGuideHighlights.map(linkCard),
    },
    proofSection: {
      eyebrow: "Proof and standards",
      headline: "Proof should be specific, not decorative.",
      fallbackItems: proofFallbackItems,
    },
    expectations: {
      eyebrow: "What patients should expect here",
      items: expectationItems,
    },
    assessment: {
      _type: "assessmentCta",
      title: "Request an assessment when you have the basics clear.",
      intro:
        "Share your concern, treatment interest, timing, location preference, and any useful photos so the first response can focus on your case.",
    },
    faq: homeFaq.map(faq),
  },
  ...Object.values(topicPages).map((page) => ({
    _id: `topicPage.${page.slug}`,
    _type: "topicPage",
    title: page.title,
    slug: slug(page.slug),
    seo: seo({
      title: page.seoTitle,
      description: page.description,
      keywords: page.keywords,
      canonicalPath: `/${page.slug}`,
    }),
    eyebrow: page.eyebrow,
    lead: page.lead,
    heroChips: page.heroChips,
    cards: page.cards.map(card),
    sections: page.sections.map(section),
    comparison: comparison(page.comparison),
    timeline: page.timeline?.map(timelineItem),
    faq: page.faq.map(faq),
    relatedPages: page.relatedSlugs.map((relatedSlug, index) =>
      reference("topicPage", relatedSlug, index),
    ),
  })),
  ...serviceCatalog.map((service) => ({
    _id: `servicePage.${service.slug}`,
    _type: "servicePage",
    title: service.title,
    slug: slug(service.slug),
    seo: seo({
      title: service.seoTitle,
      description: service.seoDescription,
      keywords: service.keywords,
      canonicalPath: `/services/${service.slug}`,
    }),
    shortDescription: service.shortDescription,
    imageSrc: service.imageSrc,
    imageAlt: service.imageAlt,
    badge: service.badge,
    bestFor: service.bestFor,
    outcome: service.outcome,
    intro: service.intro,
    consultation: service.consultation,
    highlights: service.highlights.map(serviceHighlight),
    guideHeading: service.guideHeading,
    guideSections: service.guideSections.map(serviceSection),
    londonContext: service.londonContext,
    selectionCriteria: service.selectionCriteria,
    recoveryNotes: service.recoveryNotes,
    relatedGuides: service.relatedGuideSlugs.map((relatedSlug, index) =>
      reference("topicPage", relatedSlug, index),
    ),
  })),
  ...approvedProofCases.map((proofCase) => ({
    _id: `proofCase.${proofCase.slug}`,
    _type: "proofCase",
    title: proofCase.title,
    slug: slug(proofCase.slug),
    published: true,
    isPlaceholder: Boolean(proofCase.isPlaceholder),
    areaTreated: proofCase.areaTreated,
    timeline: proofCase.timeline,
    treatmentNote: proofCase.treatmentNote,
    summary: proofCase.summary,
    imageAlt: proofCase.imageAlt,
  })),
  ...approvedReviews.map((review, index) => ({
    _id: `patientReview.${index + 1}`,
    _type: "patientReview",
    name: review.name,
    published: true,
    isPlaceholder: Boolean(review.isPlaceholder),
    quote: review.quote,
    rating: review.rating,
    treatmentArea: review.treatmentArea,
  })),
];

fs.writeFileSync(
  outputPath,
  `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`,
);

console.log(`Wrote ${documents.length} documents to ${outputPath}`);
