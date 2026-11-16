import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AssessmentSection from "@/app/components/AssessmentSection";
import PageHero from "@/app/components/PageHero";
import ProofCaseCard from "@/app/components/ProofCaseCard";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { iconForHref, iconForServiceSlug } from "@/app/lib/iconography";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMedicalWebPageSchema,
  compactSchemaList,
} from "@/app/lib/schema";
import {
  describePackage,
  formatPrice,
  getPackage,
  inclusionsSentence,
} from "@/app/lib/pricing";
import { buildMetadata } from "@/app/lib/seo";
import { serviceCatalog, type ServiceDetail } from "@/app/services/serviceData";
import {
  getProofCasesContent,
  getServiceCatalogContent,
  getServicePageContent,
  getTopicPagesContent,
} from "@/sanity/lib/content";

/** Which published result case to show at the top of each treatment page. */
const serviceProofCase: Record<string, string> = {
  "male-hair-transplant": "placeholder-hairline-case",
  "female-hair-transplant": "placeholder-female-case",
};

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

type ServiceFaq = {
  question: string;
  answer: string;
};

type ServiceHeroPanel =
  | {
      eyebrow: string;
      value: string;
      compareValue?: string;
      body: string;
      note: string;
    }
  | {
      eyebrow: string;
      headline: string;
      body: string;
      note: string;
    };

const serviceHeroPanels: Record<string, ServiceHeroPanel> = {
  "male-hair-transplant": {
    eyebrow: "Premium London Hair Transplant Price",
    value: formatPrice(getPackage("hair").tiers[0].fue),
    body: `Fixed price for eligible cases: ${describePackage("hair")}`,
    note: inclusionsSentence,
  },
  "female-hair-transplant": {
    eyebrow: "Female Hair Transplant Price",
    value: formatPrice(getPackage("female").tiers[0].fue),
    body: `Performed without shaving the head. ${describePackage("female")}`,
    note: inclusionsSentence,
  },
  "eyebrow-transplant": {
    eyebrow: "Visible-Area Treatment Planning",
    headline: "Free consultation before pricing",
    body: "Eyebrow treatment depends on shape goals, area size, directional detail, and how subtle the finished result needs to look.",
    note: "Planning, realistic density, and recovery advice should be clear before pricing is judged.",
  },
  "beard-transplant": {
    eyebrow: "Beard Transplant Price",
    value: formatPrice(getPackage("beard").tiers[0].fue),
    body: describePackage("beard"),
    note: inclusionsSentence,
  },
  "moustache-transplant": {
    eyebrow: "Visible-Area Treatment Planning",
    headline: "Free consultation before pricing",
    body: "Moustache treatment is small-area but high-visibility, so pricing depends on shape control, density goals, and the level of precision required.",
    note: "The right discussion should explain design, healing, and realism before the quote is judged.",
  },
  "hair-loss-treatments": {
    eyebrow: "Non-Surgical Treatment Planning",
    headline: "Support first, then decide",
    body: "Non-surgical planning depends on your thinning pattern, current shedding, maintenance goals, and whether treatment or surgery should come first.",
    note: "Free consultation available for stabilisation, scalp support, and longer-term restoration planning.",
  },
};

function buildServiceFaqs(service: ServiceDetail): ServiceFaq[] {
  return [
    {
      question: `Who is ${service.title.toLowerCase()} usually best suited to?`,
      answer: `${service.bestFor}. Suitability should still be confirmed after reviewing your current pattern, donor area, medical context, and long-term goals.`,
    },
    {
      question: `What should I check before choosing a London clinic for ${service.title.toLowerCase()}?`,
      answer:
        "Ask who performs the procedure, how planning decisions are made, what aftercare is included, how realistic the quoted graft range is, and whether limitations are explained as clearly as benefits.",
    },
    {
      question: `What should a stronger consultation cover for ${service.title.toLowerCase()}?`,
      answer: service.consultation.join(" "),
    },
    {
      question: `How should I think about recovery after ${service.title.toLowerCase()}?`,
      answer:
        "Think in stages rather than one vague healing period. Recovery, aftercare, and the longer growth arc all matter if expectations are going to stay realistic.",
    },
  ];
}

export const revalidate = 60;

export async function generateStaticParams() {
  return serviceCatalog.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServicePageContent(slug);

  if (!service) {
    return buildMetadata({
      title: "Service not found",
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServicePageContent(slug);

  if (!service) {
    notFound();
  }

  const [services, allTopicPages, proofCases] = await Promise.all([
    getServiceCatalogContent(),
    getTopicPagesContent(),
    getProofCasesContent(),
  ]);
  const heroCase = proofCases.find(
    (proofCase) => proofCase.slug === serviceProofCase[service.slug],
  );
  const relatedServices = services.filter((entry) => entry.slug !== service.slug);
  const relatedGuides = service.relatedGuideSlugs
    .map((guideSlug) => allTopicPages.find((page) => page.slug === guideSlug))
    .filter((page): page is (typeof allTopicPages)[number] => Boolean(page));
  const serviceFaqs = buildServiceFaqs(service);
  const heroPanel = serviceHeroPanels[service.slug];
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Treatments", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  const structuredData = compactSchemaList([
    buildMedicalWebPageSchema({
      path: `/services/${service.slug}`,
      name: service.title,
      description: service.seoDescription,
      images: [{ src: service.imageSrc, alt: service.imageAlt }],
    }),
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(serviceFaqs),
  ]);

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`${service.slug}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-8 lg:gap-14 lg:px-8 lg:pt-12"
      >
        <PageHero
          breadcrumbs={breadcrumbs}
          eyebrow={service.badge}
          title={service.seoTitle}
          lead={service.intro}
          chips={service.highlights.map((highlight) => highlight.title)}
          secondaryCta={{ href: "/results", label: "See results" }}
          priceLine={
            heroPanel ? (
              "value" in heroPanel ? (
                <>
                  <strong className="text-[color:var(--ink-950)]">From {heroPanel.value}</strong>{" "}
                  · {heroPanel.body}{" "}
                  <Link href="/prices" className="font-semibold text-[color:var(--ink-950)] underline underline-offset-4">
                    All prices
                  </Link>
                </>
              ) : (
                <>
                  <strong className="text-[color:var(--ink-950)]">{heroPanel.headline}.</strong>{" "}
                  {heroPanel.body}
                </>
              )
            ) : null
          }
          visual={
            heroCase ? (
              <ProofCaseCard proofCase={heroCase} compact />
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[color:var(--line-soft)]">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            )
          }
        />

        <section aria-label="At a glance" className="grid gap-x-8 gap-y-6 md:grid-cols-3">
          {[
            { icon: "compass" as const, title: "Best for", text: service.bestFor },
            { icon: "sparkles" as const, title: "Expected outcome", text: service.outcome },
            {
              icon: "clipboard-check" as const,
              title: "What to bring",
              text: "Daylight photos of the front, temples, crown and donor area, your main concern, and whether you would consider Turkey later.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <IconBadge name={item.icon} tone="light" size="sm" />
              <div className="min-w-0">
                <h2 className="font-display text-xl text-[color:var(--ink-950)]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">{item.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
              Treatment overview
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              {service.guideHeading}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--ink-700)]">
              {service.guideSections[0]?.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="surface-light rounded-[24px] p-6 sm:p-7">
            <h2 className="font-display text-2xl text-[color:var(--ink-950)]">
              What the consultation should cover
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--ink-700)]">
              {service.consultation.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <IconBadge
                    name={index === 0 ? "clipboard-check" : index === 1 ? "route" : "shield-check"}
                    tone="light"
                    size="sm"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0 space-y-10">
            {service.guideSections.slice(1).map((section) => (
              <article key={`${service.slug}-${section.title}`}>
                <h2 className="font-display text-3xl text-[color:var(--ink-950)]">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-[color:var(--ink-700)]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
            {service.londonContext.length ? (
              <article>
                <h2 className="font-display text-3xl text-[color:var(--ink-950)]">
                  Why patients choose London for this
                </h2>
                <ul className="mt-4 space-y-3 text-base leading-8 text-[color:var(--ink-700)]">
                  {service.londonContext.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[color:var(--gold-500)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>

          <div className="grid content-start gap-6">
            <section className="surface-light rounded-[24px] p-6 sm:p-7">
              <h2 className="font-display text-2xl text-[color:var(--ink-950)]">What to ask before booking</h2>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--ink-700)]">
                {service.selectionCriteria.map((item) => (
                  <li key={item} className="flex gap-3">
                    <IconBadge name="shield-check" tone="light" size="sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface-light rounded-[24px] p-6 sm:p-7">
              <h2 className="font-display text-2xl text-[color:var(--ink-950)]">Recovery</h2>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--ink-700)]">
                {service.recoveryNotes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <IconBadge name="clock" tone="light" size="sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <AssessmentSection
          sourceLabel={`service:${service.slug}`}
          tone="dark"
          title={`Book a free consultation for ${service.title.toLowerCase()}.`}
          intro="Send the details that matter most to your case: your concern, timing, any useful location context, and the kind of result you want to discuss."
        />

        <section className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
          <div>
            <h2 className="font-display text-3xl text-[color:var(--ink-950)]">Read next</h2>
            <div className="mt-6 grid gap-3">
              {relatedGuides.map((guide) => (
                <Link
                  key={`${service.slug}-guide-${guide.slug}`}
                  href={`/${guide.slug}`}
                  className="surface-light group flex items-start gap-4 rounded-[20px] p-5 transition hover:border-[color:var(--line-strong)] hover:bg-white"
                >
                  <IconBadge name={iconForHref(`/${guide.slug}`)} tone="light" size="sm" />
                  <div className="min-w-0">
                    <p className="font-display text-xl text-[color:var(--ink-950)] group-hover:underline group-hover:underline-offset-4">
                      {guide.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">{guide.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-[color:var(--ink-950)]">Questions about this treatment</h2>
            <div className="mt-6 divide-y divide-[color:var(--line-soft)] border-y border-[color:var(--line-soft)]">
              {serviceFaqs.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-[color:var(--ink-950)] marker:content-none">
                    <span>{item.question}</span>
                    <span aria-hidden="true" className="mt-0.5 text-[color:var(--ink-600)] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[color:var(--ink-950)]">Other treatments</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {relatedServices.map((entry) => (
              <Link
                key={entry.slug}
                href={`/services/${entry.slug}`}
                className="surface-light group flex items-start gap-4 rounded-[20px] p-5 transition hover:border-[color:var(--line-strong)] hover:bg-white"
              >
                <IconBadge name={iconForServiceSlug(entry.slug)} tone="light" size="sm" />
                <div className="min-w-0">
                  <p className="font-display text-xl text-[color:var(--ink-950)] group-hover:underline group-hover:underline-offset-4">
                    {entry.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">{entry.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
