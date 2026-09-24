import {
  getClinicalReviewer,
  getPageReview,
  type ClinicalReviewer,
} from "@/app/lib/clinicalReview";
import { getProcedureFacts } from "@/app/lib/medicalProcedures";
import { absoluteUrl, siteName } from "@/app/lib/seo";

const SCHEMA_CONTEXT = "https://schema.org";

type JsonLdNode = Record<string, unknown>;

export type SchemaFaq = {
  question: string;
  answer: string;
};

export type SchemaImage = {
  src: string;
  alt?: string;
  caption?: string;
};

export type BreadcrumbStep = {
  name: string;
  path: string;
};

function normalizePath(path: string) {
  return path === "/" ? "/" : path.replace(/\/+$/, "");
}

export function buildPhysicianNode(
  reviewer: ClinicalReviewer,
): JsonLdNode {
  const name = reviewer.credentials
    ? `${reviewer.name} ${reviewer.credentials}`
    : reviewer.name;

  return {
    "@type": "Physician",
    name,
    jobTitle: reviewer.jobTitle,
    ...(reviewer.profileUrl ? { url: reviewer.profileUrl } : {}),
    ...(reviewer.registration
      ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: reviewer.registration.body,
            value: reviewer.registration.number,
            ...(reviewer.registration.url
              ? { url: reviewer.registration.url }
              : {}),
          },
        }
      : {}),
  };
}

export function buildImageObjectNode(image: SchemaImage): JsonLdNode {
  return {
    "@type": "ImageObject",
    contentUrl: absoluteUrl(image.src),
    url: absoluteUrl(image.src),
    ...(image.alt ? { name: image.alt } : {}),
    ...(image.caption ? { caption: image.caption } : {}),
  };
}

export function buildBreadcrumbSchema(steps: BreadcrumbStep[]): JsonLdNode {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: steps.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

export function buildFaqSchema(faq: SchemaFaq[]): JsonLdNode | undefined {
  if (faq.length === 0) {
    return undefined;
  }

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Builds a `MedicalProcedure` node from the facts registry plus the page's own
 * name and description, so the markup cannot describe something the page does
 * not. Returns undefined for pages that are not about a procedure.
 */
export function buildMedicalProcedureNode({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}): JsonLdNode | undefined {
  const facts = getProcedureFacts(path);

  if (!facts) {
    return undefined;
  }

  return {
    "@type": ["MedicalProcedure", facts.procedureType],
    name: facts.name ?? name,
    description,
    procedureType: `${SCHEMA_CONTEXT}/${facts.procedureType}`,
    bodyLocation: facts.bodyLocation,
    ...(facts.howPerformed ? { howPerformed: facts.howPerformed } : {}),
    ...(facts.preparation ? { preparation: facts.preparation } : {}),
    ...(facts.followup ? { followup: facts.followup } : {}),
  };
}

/**
 * `MedicalWebPage` with the review line, procedure, and result imagery attached
 * only where the underlying facts genuinely exist.
 */
export function buildMedicalWebPageSchema({
  path,
  name,
  description,
  images = [],
  specialty = "https://schema.org/PlasticSurgery",
}: {
  path: string;
  name: string;
  description: string;
  images?: SchemaImage[];
  specialty?: string;
}): JsonLdNode {
  const normalized = normalizePath(path);
  const url = absoluteUrl(normalized);
  const review = getPageReview(normalized);
  const reviewer = getClinicalReviewer(review?.reviewerId);
  const procedure = buildMedicalProcedureNode({
    path: normalized,
    name,
    description,
  });

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "MedicalWebPage",
    name,
    description,
    url,
    specialty,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("/"),
    },
    ...(procedure ? { about: procedure, mainEntity: procedure } : {}),
    ...(reviewer ? { reviewedBy: buildPhysicianNode(reviewer) } : {}),
    ...(review?.lastReviewed ? { lastReviewed: review.lastReviewed } : {}),
    ...(images.length > 0
      ? { image: images.map((image) => buildImageObjectNode(image)) }
      : {}),
  };
}

export function buildContactPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}): JsonLdNode {
  const url = absoluteUrl(normalizePath(path));

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ContactPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("/"),
    },
  };
}

export function buildContactPointSchema({
  telephone,
  email,
  contactType = "customer service",
  areaServed = "GB",
  availableLanguage = ["English"],
}: {
  telephone?: string;
  email?: string;
  contactType?: string;
  areaServed?: string;
  availableLanguage?: string[];
}): JsonLdNode {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ContactPoint",
    contactType,
    areaServed,
    availableLanguage,
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
  };
}

export function compactSchemaList(
  nodes: (JsonLdNode | undefined)[],
): JsonLdNode[] {
  return nodes.filter((node): node is JsonLdNode => Boolean(node));
}
