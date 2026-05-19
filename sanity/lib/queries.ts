// Legacy query: the live homepage no longer reads from this document shape.
export const homepageQuery = `*[_type == "homepage"][0]{
  hero,
  heroSlides[]{
    eyebrow,
    headline,
    subhead,
    image,
    imageAlt,
    primaryCta,
    secondaryCta,
    priceBadges[]{
      label,
      value
    }
  },
  trustHighlights[]{
    value,
    label
  },
  services[]{
    slug,
    title,
    description,
    image,
    imageAlt
  },
  steps,
  results[]{
    name,
    area,
    time,
    note,
    beforeImage,
    afterImage,
    beforeImageAlt,
    afterImageAlt
  },
  reviews[]{
    name,
    rating,
    quote
  },
  faq[]{
    question,
    answerText,
    answerRich
  }
}`;

const seoFields = `seo{
  title,
  description,
  keywords,
  canonicalPath,
  ogImage
}`;

const topicPageFields = `
  title,
  "slug": slug.current,
  ${seoFields},
  eyebrow,
  lead,
  heroChips,
  cards[]{
    title,
    text
  },
  sections[]{
    title,
    intro,
    body,
    bullets
  },
  comparison{
    title,
    intro,
    columns,
    rows[]{
      label,
      left,
      right
    }
  },
  timeline[]{
    title,
    text
  },
  faq[]{
    question,
    answer
  },
  "relatedSlugs": relatedPages[]->slug.current
`;

const servicePageFields = `
  title,
  "slug": slug.current,
  ${seoFields},
  shortDescription,
  imageSrc,
  imageAlt,
  badge,
  bestFor,
  outcome,
  intro,
  consultation,
  highlights[]{
    title,
    text
  },
  guideHeading,
  guideSections[]{
    title,
    body
  },
  londonContext,
  selectionCriteria,
  recoveryNotes,
  "relatedGuideSlugs": relatedGuides[]->slug.current
`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  brandName,
  email,
  phoneNumber,
  phoneDisplay,
  whatsappNumber,
  whatsappLabel,
  clinicLocation
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  ${seoFields},
  hero{
    eyebrow,
    headline,
    lead,
    primaryCtaLabel,
    secondaryCtaLabel,
    chips
  },
  trustPillars[]{
    title,
    text
  },
  signals[]{
    value,
    label
  },
  servicesIntro{
    eyebrow,
    headline,
    intro
  },
  londonDecision{
    eyebrow,
    headline,
    body,
    primaryCtaLabel,
    secondaryCtaLabel
  },
  journey{
    eyebrow,
    headline,
    steps[]{
      title,
      text
    }
  },
  guideSection{
    eyebrow,
    headline,
    intro,
    links[]{
      href,
      label,
      description
    }
  },
  proofSection{
    eyebrow,
    headline,
    fallbackItems
  },
  expectations{
    eyebrow,
    items
  },
  assessment{
    title,
    intro
  },
  faq[]{
    question,
    answer
  }
}`;

export const topicPageBySlugQuery = `*[_type == "topicPage" && slug.current == $slug][0]{
  ${topicPageFields}
}`;

export const topicPagesQuery = `*[_type == "topicPage"] | order(slug.current asc){
  ${topicPageFields}
}`;

export const servicePageBySlugQuery = `*[_type == "servicePage" && slug.current == $slug][0]{
  ${servicePageFields}
}`;

export const servicePagesQuery = `*[_type == "servicePage"] | order(slug.current asc){
  ${servicePageFields}
}`;

export const proofCasesQuery = `*[_type == "proofCase" && published == true] | order(_createdAt desc){
  title,
  "slug": slug.current,
  areaTreated,
  timeline,
  treatmentNote,
  summary,
  variant,
  "beforeImageSrc": beforeImage.asset->url,
  "afterImageSrc": afterImage.asset->url,
  beforeImageAlt,
  afterImageAlt,
  "imageSrc": image.asset->url,
  imageAlt,
  isPlaceholder
}`;

export const patientReviewsQuery = `*[_type == "patientReview" && published == true] | order(_createdAt desc){
  name,
  quote,
  rating,
  treatmentArea,
  isPlaceholder
}`;
