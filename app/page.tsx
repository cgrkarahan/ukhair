import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import BeforeAfterCard from "@/app/components/BeforeAfterCard";
import HeroSlider, { HeroSlide } from "@/app/components/HeroSlider";
import ReviewSlider from "@/app/components/ReviewSlider";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { homepageQuery } from "@/sanity/lib/queries";
import {
  serviceCatalog,
  serviceCatalogByTitle,
} from "@/app/services/serviceData";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";
import { PortableText, type PortableTextBlock } from "next-sanity";

type HomepageData = {
  hero?: {
    eyebrow?: string;
    headline?: string;
    subhead?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  heroSlides?: HeroSlide[];
  trustHighlights?: { value: string; label: string }[];
  services?: { title: string; description: string }[];
  steps?: { title: string; text: string }[];
  results?: {
    name: string;
    time: string;
    note: string;
    area?: string;
    variant?: "hairline" | "crown" | "temple" | "diffuse";
    beforeImage?: unknown;
    afterImage?: unknown;
    beforeImageAlt?: string;
    afterImageAlt?: string;
  }[];
  reviews?: { name: string; rating?: number; quote: string }[];
  faq?: {
    question: string;
    answerText?: string;
    answerRich?: PortableTextBlock[];
  }[];
};

const homepageDescription =
  "Explore surgeon-led hair transplant treatments in London, real before-and-after results, and a calm consultation process built around natural-looking restoration.";

export const metadata: Metadata = buildMetadata({
  description: homepageDescription,
  path: "/",
});

async function getHomepage() {
  try {
    return (await client.fetch(homepageQuery)) as HomepageData | null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const defaults: Required<HomepageData> = {
    hero: {
      eyebrow: "London • Surgeon-led • Natural results",
      headline: "A calmer, greener path to confident hair restoration.",
      subhead:
        "We design hairlines with precision and empathy, combining meticulous graft placement with a modern, low-stress clinic experience.",
      primaryCta: "Book a consultation",
      secondaryCta: "View results",
    },
    heroSlides: [],
    trustHighlights: [
      {
        value: "4.9/5",
        label: "Patient rating",
      },
      {
        value: "10+",
        label: "Years experience",
      },
      {
        value: "2,500+",
        label: "Grafts placed",
      },
      {
        value: "UK",
        label: "Aftercare support",
      },
    ],
    services: [
      {
        title: "Male Hair Transplant",
        description:
          "Restore a receding hairline, thinning crown, or overall density loss with surgeon-led FUE planning.",
      },
      {
        title: "Female Hair Transplant",
        description:
          "A refined approach for diffuse thinning, widened partings, and soft frontal hairline restoration.",
      },
      {
        title: "Eyebrow Transplant",
        description:
          "Rebuild sparse or over-plucked brows with careful angle control and natural arch shaping.",
      },
      {
        title: "Beard Transplant",
        description:
          "Fill patchy facial hair and create a stronger beard outline with natural graft placement.",
      },
      {
        title: "Moustache Transplant",
        description:
          "Add density and reshape the upper lip area for a fuller, more defined moustache.",
      },
      {
        title: "Hair Loss Treatments",
        description:
          "Non-surgical support such as PRP, mesotherapy, and scalp-focused treatment plans for early thinning.",
      },
    ],
    steps: [
      {
        title: "Personal Consultation",
        text: "We map your hairline and donor capacity with a surgeon-led assessment.",
      },
      {
        title: "Design + Planning",
        text: "Micro-graft distribution designed for density, balance, and longevity.",
      },
      {
        title: "Procedure Day",
        text: "Comfort-forward care with a clinical team dedicated to detail.",
      },
      {
        title: "Aftercare + Growth",
        text: "Structured check-ins and guidance throughout the growth cycle.",
      },
    ],
    results: [
      {
        name: "Hairline restoration",
        time: "9 months",
        note: "2,200 grafts",
        area: "Frontal hairline",
        variant: "hairline",
        beforeImage: undefined,
        afterImage: undefined,
        beforeImageAlt: "Before hair transplant sample case",
        afterImageAlt: "After hair transplant sample case",
      },
      {
        name: "Crown density",
        time: "8 months",
        note: "1,850 grafts",
        area: "Vertex",
        variant: "crown",
        beforeImage: undefined,
        afterImage: undefined,
        beforeImageAlt: "Before crown density sample case",
        afterImageAlt: "After crown density sample case",
      },
      {
        name: "Temple rebuild",
        time: "10 months",
        note: "2,400 grafts",
        area: "Temples",
        variant: "temple",
        beforeImage: undefined,
        afterImage: undefined,
        beforeImageAlt: "Before temple rebuild sample case",
        afterImageAlt: "After temple rebuild sample case",
      },
      {
        name: "Diffuse thinning",
        time: "11 months",
        note: "2,600 grafts",
        area: "Mid-scalp",
        variant: "diffuse",
        beforeImage: undefined,
        afterImage: undefined,
        beforeImageAlt: "Before diffuse thinning sample case",
        afterImageAlt: "After diffuse thinning sample case",
      },
    ],
    reviews: [
      {
        name: "Daniel P.",
        rating: 5,
        quote:
          "The process was calm and structured. I finally feel like myself again.",
      },
      {
        name: "Amira S.",
        rating: 5,
        quote:
          "The hairline design was subtle and accurate. The team guided me through everything.",
      },
      {
        name: "Chris T.",
        rating: 5,
        quote:
          "Great aftercare and honest expectations. The growth is better than I hoped.",
      },
      {
        name: "Michael R.",
        rating: 4,
        quote:
          "What stood out most was how realistic the plan was. No pressure, no overpromising, just a clear explanation of what was possible.",
      },
      {
        name: "Omar K.",
        rating: 5,
        quote:
          "The clinic felt discreet and professional from day one. Recovery was smoother than I expected, and the result looks natural in every light.",
      },
    ],
    faq: [
      {
        question: "How long is recovery?",
        answerText:
          "Most patients return to desk work within 2 to 4 days. We provide a detailed recovery plan for every stage.",
        answerRich: [
          {
            _key: "recovery-answer",
            _type: "block",
            children: [
              {
                _key: "recovery-span",
                _type: "span",
                marks: [],
                text: "Most patients return to desk work within 2 to 4 days. We provide a detailed recovery plan for every stage.",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
      },
      {
        question: "When will I see growth?",
        answerText:
          "Growth begins around month 3, with fuller results from months 6 to 12.",
        answerRich: [
          {
            _key: "growth-answer",
            _type: "block",
            children: [
              {
                _key: "growth-span",
                _type: "span",
                marks: [],
                text: "Growth begins around month 3, with fuller results from months 6 to 12.",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
      },
      {
        question: "Can I combine treatments?",
        answerText:
          "We assess donor availability and map a long-term plan so multiple areas can be addressed safely.",
        answerRich: [
          {
            _key: "treatments-answer",
            _type: "block",
            children: [
              {
                _key: "treatments-span",
                _type: "span",
                marks: [],
                text: "We assess donor availability and map a long-term plan so multiple areas can be addressed safely.",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
      },
    ],
  };

  const homepage = await getHomepage();
  const hero = homepage?.hero ?? defaults.hero;
  const heroSlides =
    homepage?.heroSlides && homepage.heroSlides.length > 0
      ? homepage.heroSlides
      : [hero];
  const trustHighlights =
    homepage?.trustHighlights && homepage.trustHighlights.length > 0
      ? homepage.trustHighlights
      : defaults.trustHighlights;
  const services =
    homepage?.services && homepage.services.length >= 5
      ? homepage.services
      : defaults.services;
  const steps = homepage?.steps ?? defaults.steps;
  const results = homepage?.results ?? defaults.results;
  const resultsWithImages = results.map((result) => ({
    ...result,
    beforeImageUrl: result.beforeImage
      ? urlFor(result.beforeImage).width(900).height(760).fit("crop").url()
      : "https://commons.wikimedia.org/wiki/Special:FilePath/Man_before_receiving_hair_transplant.jpg",
    afterImageUrl: result.afterImage
      ? urlFor(result.afterImage).width(900).height(760).fit("crop").url()
      : "https://commons.wikimedia.org/wiki/Special:FilePath/Man_after_receiving_hair_transplant.jpg",
  }));
  const reviews = homepage?.reviews ?? defaults.reviews;
  const faq = homepage?.faq ?? defaults.faq;
  const faqComponents = {
    block: {
      normal: ({ children }: { children?: ReactNode }) => (
        <p className="mt-2 leading-relaxed">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: { children?: ReactNode }) => (
        <ul className="mt-3 list-disc space-y-2 pl-5">{children}</ul>
      ),
      number: ({ children }: { children?: ReactNode }) => (
        <ol className="mt-3 list-decimal space-y-2 pl-5">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
      number: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
    },
  };
  const faqForSchema = faq
    .map((item) => {
      const richText =
        item.answerRich
          ?.flatMap((block) =>
            "children" in block && Array.isArray(block.children)
              ? block.children
              : [],
          )
          .map((child) => ("text" in child ? child.text : ""))
          .join(" ")
          .trim() ?? "";

      return {
        question: item.question,
        answer: item.answerText ?? richText,
      };
    })
    .filter((item) => item.answer.length > 0);
  const homepageStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: siteName,
      url: absoluteUrl("/"),
      description: homepageDescription,
      areaServed: ["London", "United Kingdom"],
      image: absoluteUrl("/favicon.ico"),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("/"),
      description: homepageDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Hair restoration services",
      itemListElement: serviceCatalog.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: absoluteUrl(`/services/${service.slug}`),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqForSchema.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <div className="bg-forest min-h-screen">
      {homepageStructuredData.map((schema, index) => (
        <script
          key={`homepage-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--leaf-700)] text-white">
            EH
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--leaf-600)]">
              Evergreen
            </p>
            <p className="font-display text-lg text-[color:var(--leaf-900)]">
              Hair Clinic
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-[color:var(--leaf-800)] md:flex">
          <a href="#services" className="hover:text-[color:var(--leaf-500)]">
            Services
          </a>
          <a href="#results" className="hover:text-[color:var(--leaf-500)]">
            Results
          </a>
          <a href="#reviews" className="hover:text-[color:var(--leaf-500)]">
            Reviews
          </a>
          <a href="#consultation" className="hover:text-[color:var(--leaf-500)]">
            Consultation
          </a>
        </nav>
        <a
          href="#consultation"
          className="rounded-full bg-[color:var(--leaf-700)] px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-[color:var(--leaf-600)]"
        >
          Request a consult
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-10">
        <section className="flex flex-col gap-10">
          <HeroSlider slides={heroSlides} />
          <div className="glass rounded-[32px] px-6 py-8 shadow-soft sm:px-8 sm:py-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-600)]">
                Why patients trust us
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--leaf-700)]">
                Clear results, experienced clinical oversight, and local
                aftercare support.
              </p>
            </div>
            <div className="mt-8 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {trustHighlights.map((highlight, index) => (
                <div
                  key={`${highlight.value}-${highlight.label}`}
                  className={`px-6 text-center ${
                    index > 0 ? "lg:border-l lg:border-[color:var(--leaf-200)]" : ""
                  } ${
                    index % 2 === 1
                      ? "sm:border-l sm:border-[color:var(--leaf-200)] lg:border-l"
                      : ""
                  }`}
                >
                  <p className="font-display text-4xl text-[color:var(--leaf-900)] sm:text-5xl">
                    {highlight.value}
                  </p>
                  <p className="mt-2 text-base text-[color:var(--leaf-700)] sm:text-lg">
                    {highlight.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-[color:var(--leaf-200)] pt-5 text-center">
              <p className="text-sm text-[color:var(--leaf-700)]">
                Surgeon-led consultations, procedure design, and structured
                follow-up care.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="space-y-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-600)]">
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--leaf-900)]">
              Treatments designed around the pattern of hair loss.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--leaf-700)]">
              Choose the treatment path that best matches your goals, graft
              strategy, and level of hair loss.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {[
                "Surgeon-led planning",
                "Custom graft mapping",
                "Local aftercare",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[color:var(--leaf-200)] bg-white/70 px-4 py-2 text-sm text-[color:var(--leaf-700)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const servicePage = serviceCatalogByTitle[service.title];
              const meta = servicePage ?? {
                slug: "#consultation",
                badge: "Treatment",
                bestFor: "Personalized candidacy assessment",
                outcome: "A plan tailored to hair type and density goals",
              };

              return (
              <div
                key={`${service.title}-${index}`}
                className="rounded-[28px] border border-[color:var(--leaf-200)] bg-white/80 p-6 shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className="rounded-full bg-[color:var(--leaf-100)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--leaf-700)]">
                    {meta.badge}
                  </span>
                </div>
                <div className="mt-5 space-y-5">
                  <div>
                    <h3 className="font-display text-2xl text-[color:var(--leaf-900)]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--leaf-700)]">
                      {service.description}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--leaf-200)] bg-[color:var(--leaf-100)]/70 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--leaf-600)]">
                      Best for
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--leaf-800)]">
                      {meta.bestFor}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--leaf-200)] pt-4">
                  <p className="text-sm text-[color:var(--leaf-700)]">
                    <span className="font-semibold text-[color:var(--leaf-900)]">
                      Expected outcome:
                    </span>{" "}
                    {meta.outcome}
                  </p>
                  <a
                    href="#consultation"
                    className="text-sm font-semibold text-[color:var(--leaf-700)] hover:text-[color:var(--leaf-500)]"
                  >
                    Request assessment
                  </a>
                  {servicePage ? (
                    <Link
                      href={`/services/${servicePage.slug}`}
                      className="text-sm font-semibold text-[color:var(--leaf-700)] hover:text-[color:var(--leaf-500)]"
                    >
                      Learn more
                    </Link>
                  ) : null}
                </div>
              </div>
            )})}
          </div>
          <div className="rounded-[28px] border border-[color:var(--leaf-200)] bg-white/75 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-600)]">
              What every treatment includes
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <p className="text-sm text-[color:var(--leaf-700)]">
                Donor assessment and long-term graft strategy
              </p>
              <p className="text-sm text-[color:var(--leaf-700)]">
                Hairline and density design matched to facial proportions
              </p>
              <p className="text-sm text-[color:var(--leaf-700)]">
                Recovery guidance, aftercare support, and check-ins
              </p>
            </div>
            <a
              href="#consultation"
              className="mt-6 inline-flex rounded-full bg-[color:var(--leaf-700)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--leaf-600)]"
            >
              Discuss treatment options
            </a>
          </div>
        </section>

        <section className="grid gap-8 rounded-[36px] bg-[color:var(--leaf-900)] p-10 text-white lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-200)]">
                Step {index + 1}
              </p>
              <h3 className="font-display text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[color:var(--leaf-100)]">
                {step.text}
              </p>
            </div>
          ))}
        </section>

        <section id="results" className="space-y-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-600)]">
              Results
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--leaf-900)]">
              Before and after cases that show the change clearly.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--leaf-700)]">
              A strong results section should feel visual first. These featured
              cases are laid out to support clear photo comparisons, graft
              counts, and realistic timelines.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {resultsWithImages.map((result, index) => (
              <div
                key={`${result.name}-${result.area ?? "case"}-${index}`}
                className="overflow-hidden rounded-[28px] border border-[color:var(--leaf-200)] bg-white/80 shadow-soft"
              >
                <div className="p-4">
                  <BeforeAfterCard
                    title={result.name}
                    area={result.area}
                    variant={result.variant}
                    beforeImage={result.beforeImageUrl}
                    afterImage={result.afterImageUrl}
                    beforeImageAlt={result.beforeImageAlt}
                    afterImageAlt={result.afterImageAlt}
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--leaf-600)]">
                        {result.area}
                      </p>
                      <p className="mt-2 text-xl font-semibold text-[color:var(--leaf-900)]">
                        {result.name}
                      </p>
                    </div>
                    <span className="rounded-full bg-[color:var(--leaf-700)] px-3 py-1 text-xs text-white">
                      {result.time}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-[color:var(--leaf-200)] pt-4 text-sm text-[color:var(--leaf-700)]">
                    <span>{result.note}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-[color:var(--leaf-200)] bg-white/70 p-5">
              <p className="text-sm font-semibold text-[color:var(--leaf-900)]">
                Matched photo framing
              </p>
              <p className="mt-2 text-xs text-[color:var(--leaf-700)]">
                Keep angles and lighting consistent so the comparison feels
                clinical, not promotional.
              </p>
            </div>
            <div className="rounded-3xl border border-[color:var(--leaf-200)] bg-white/70 p-5">
              <p className="text-sm font-semibold text-[color:var(--leaf-900)]">
                Clear timelines
              </p>
              <p className="mt-2 text-xs text-[color:var(--leaf-700)]">
                Show the month count and graft range to set realistic
                expectations for prospective patients.
              </p>
            </div>
            <div className="rounded-3xl border border-[color:var(--leaf-200)] bg-white/70 p-5">
              <p className="text-sm font-semibold text-[color:var(--leaf-900)]">
                Case diversity
              </p>
              <p className="mt-2 text-xs text-[color:var(--leaf-700)]">
                Feature hairline, crown, temples, and diffuse thinning so users
                can find relevant examples quickly.
              </p>
            </div>
          </div>
        </section>

        <section
          id="consultation"
          className="grid gap-10 rounded-[36px] border border-[color:var(--leaf-200)] bg-white/80 p-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-600)]">
              Consultation
            </p>
            <h2 className="font-display text-3xl text-[color:var(--leaf-900)]">
              Request a private consultation.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--leaf-700)]">
              Tell us about your goals and current hairline. We will respond with
              an assessment and next steps within 24 hours.
            </p>
            <div className="mt-6 rounded-3xl bg-[color:var(--leaf-900)] p-6 text-white">
              <p className="text-sm font-semibold">What to expect</p>
              <ul className="mt-4 space-y-3 text-sm text-[color:var(--leaf-100)]">
                <li>Video or in-person consultation options</li>
                <li>Transparent pricing estimate and graft range</li>
                <li>Pre-op checklist and timeline overview</li>
              </ul>
            </div>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[color:var(--leaf-800)]">
                First name
                <input
                  className="rounded-2xl border border-[color:var(--leaf-200)] bg-white px-4 py-3 text-sm"
                  placeholder="Alex"
                  type="text"
                />
              </label>
              <label className="grid gap-2 text-sm text-[color:var(--leaf-800)]">
                Last name
                <input
                  className="rounded-2xl border border-[color:var(--leaf-200)] bg-white px-4 py-3 text-sm"
                  placeholder="Khan"
                  type="text"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-[color:var(--leaf-800)]">
              Email
              <input
                className="rounded-2xl border border-[color:var(--leaf-200)] bg-white px-4 py-3 text-sm"
                placeholder="you@email.com"
                type="email"
              />
            </label>
            <label className="grid gap-2 text-sm text-[color:var(--leaf-800)]">
              Procedure of interest
              <select className="rounded-2xl border border-[color:var(--leaf-200)] bg-white px-4 py-3 text-sm">
                <option>Hairline restoration</option>
                <option>Beard restoration</option>
                <option>Crown density</option>
                <option>Female hairline</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-[color:var(--leaf-800)]">
              Notes
              <textarea
                className="min-h-[120px] rounded-2xl border border-[color:var(--leaf-200)] bg-white px-4 py-3 text-sm"
                placeholder="Share your goals, timeline, or any questions."
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-[color:var(--leaf-700)] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[color:var(--leaf-600)]"
            >
              Request consultation
            </button>
            <p className="text-xs text-[color:var(--leaf-600)]">
              By submitting, you agree to our privacy policy and consent to
              being contacted about your request.
            </p>
          </form>
        </section>

        <section id="reviews" className="space-y-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-600)]">
              Reviews
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--leaf-900)] sm:text-4xl">
              Trusted by patients who wanted natural results.
            </h2>
            <div className="mt-5 flex items-center justify-center gap-2 text-[color:var(--leaf-700)]">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="ml-2 text-sm text-[color:var(--leaf-700)]">
                4.9/5 based on verified feedback
              </span>
            </div>
          </div>
          <div className="mx-auto w-full max-w-4xl">
            <ReviewSlider reviews={reviews} />
          </div>
        </section>

        <section className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-[color:var(--leaf-200)] bg-white/80 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-600)]">
              FAQ
            </p>
            <h2 className="font-display text-3xl text-[color:var(--leaf-900)]">
              Questions we hear often.
            </h2>
            <div className="mt-6 space-y-4 text-sm text-[color:var(--leaf-700)]">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-[color:var(--leaf-200)] bg-white/70 p-4"
                >
                  <summary className="cursor-pointer font-semibold text-[color:var(--leaf-900)]">
                    {item.question}
                  </summary>
                  {item.answerRich && item.answerRich.length > 0 ? (
                    <PortableText
                      value={item.answerRich}
                      components={faqComponents}
                    />
                  ) : item.answerText ? (
                    <p className="mt-2 leading-relaxed">{item.answerText}</p>
                  ) : null}
                </details>
              ))}
            </div>
          </div>
          <div className="self-start rounded-[32px] bg-[color:var(--leaf-700)] p-8 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-200)]">
              Confidence
            </p>
            <h2 className="font-display text-3xl">
              A clinic designed for calm.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--leaf-100)]">
              Private suites, supportive staff, and a discrete entrance. We keep
              the experience low-stress from first message to final check-in.
            </p>
            <div className="mt-6 rounded-3xl bg-white/10 p-5">
              <p className="text-sm font-semibold">Clinic location</p>
              <p className="text-sm text-[color:var(--leaf-100)]">
                Marylebone, London • Flexible weekend slots
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:var(--leaf-200)] bg-white/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl text-[color:var(--leaf-900)]">
              Evergreen Hair Clinic
            </p>
            <p className="text-sm text-[color:var(--leaf-700)]">
              Confidence-first hair restoration in London.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[color:var(--leaf-700)]">
            <a href="#services" className="hover:text-[color:var(--leaf-500)]">
              Services
            </a>
            <a href="#results" className="hover:text-[color:var(--leaf-500)]">
              Results
            </a>
            <a href="#reviews" className="hover:text-[color:var(--leaf-500)]">
              Reviews
            </a>
            <a href="#consultation" className="hover:text-[color:var(--leaf-500)]">
              Consultation
            </a>
            {serviceCatalog.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="hover:text-[color:var(--leaf-500)]"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
