import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AssessmentSection from "@/app/components/AssessmentSection";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { iconForHref, iconForServiceSlug } from "@/app/lib/iconography";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";
import { serviceCatalog, type ServiceDetail } from "@/app/services/serviceData";
import {
  getServiceCatalogContent,
  getServicePageContent,
  getTopicPagesContent,
} from "@/sanity/lib/content";

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
    value: "£2750",
    compareValue: "£4500",
    body: "Clear fixed price for eligible cases, including up to 3,000 grafts, one complimentary PRP treatment, post-operative medication, and an aftercare pack.",
    note: "Sapphire FUE approach where suitable. No extras, no arrangement fees.",
  },
  "female-hair-transplant": {
    eyebrow: "Female Treatment Planning",
    headline: "Free consultation before pricing",
    body: "Female treatment planning depends on thinning pattern, donor suitability, density goals, recovery visibility, and how subtle the framing change needs to be.",
    note: "A clearer quote follows suitability review, planning discussion, and the treatment approach being considered.",
  },
  "eyebrow-transplant": {
    eyebrow: "Visible-Area Treatment Planning",
    headline: "Free consultation before pricing",
    body: "Eyebrow treatment depends on shape goals, area size, directional detail, and how subtle the finished result needs to look.",
    note: "Planning, realistic density, and recovery advice should be clear before pricing is judged.",
  },
  "beard-transplant": {
    eyebrow: "Facial-Hair Treatment Planning",
    headline: "Quote after outline and density planning",
    body: "Beard treatment pricing depends on patch distribution, cheek-line design, density transitions, and how much visible-area detail is needed.",
    note: "A stronger quote follows realistic planning rather than a generic one-size number.",
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

  const [services, allTopicPages] = await Promise.all([
    getServiceCatalogContent(),
    getTopicPagesContent(),
  ]);
  const relatedServices = services.filter((entry) => entry.slug !== service.slug);
  const relatedGuides = service.relatedGuideSlugs
    .map((guideSlug) => allTopicPages.find((page) => page.slug === guideSlug))
    .filter((page): page is (typeof allTopicPages)[number] => Boolean(page));
  const serviceFaqs = buildServiceFaqs(service);
  const heroPanel = serviceHeroPanels[service.slug];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      description: service.seoDescription,
      url: absoluteUrl(`/services/${service.slug}`),
      areaServed: ["London", "United Kingdom"],
      provider: {
        "@type": "Organization",
        name: siteName,
        url: absoluteUrl("/"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: absoluteUrl("/#services"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: absoluteUrl(`/services/${service.slug}`),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: serviceFaqs.map((item) => ({
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
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero relative overflow-hidden rounded-[40px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0">
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,58,79,0.96)_0%,rgba(8,58,79,0.9)_34%,rgba(8,58,79,0.72)_58%,rgba(8,58,79,0.84)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_36%,rgba(64,126,140,0.34),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(192,213,214,0.1),transparent_22%)]" />
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              {heroPanel ? (
                <div className="mb-8 w-full max-w-[37.5rem] rounded-[28px] border border-[rgba(165,141,102,0.28)] bg-[linear-gradient(145deg,rgba(165,141,102,0.22),rgba(165,141,102,0.08))] p-5 shadow-[0_24px_60px_rgba(8,58,79,0.24)] backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--gold-300)]/84">
                    {heroPanel.eyebrow}
                  </p>
                  {"value" in heroPanel ? (
                    <div className="mt-3 flex items-end gap-3">
                      <p className="font-display text-5xl leading-none text-white sm:text-6xl">
                        {heroPanel.value}
                      </p>
                      {heroPanel.compareValue ? (
                        <p className="pb-1 text-sm text-white/56 line-through">
                          {heroPanel.compareValue}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <h2 className="mt-3 max-w-[24rem] font-display text-3xl leading-tight text-white sm:text-4xl">
                      {heroPanel.headline}
                    </h2>
                  )}
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {heroPanel.body}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-white/52">
                    {heroPanel.note}
                  </p>
                </div>
              ) : null}
              <Link
                href="/#services"
                className="inline-flex text-sm text-white/64 transition hover:text-white"
              >
                ← Back to treatments
              </Link>
              <p className="mt-5 text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/82">
                {service.badge}
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                {service.seoTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {service.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {service.highlights.map((highlight) => (
                  <span
                    key={highlight.title}
                    className="rounded-full border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] px-3.5 py-2 text-sm text-white/78"
                  >
                    {highlight.title}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/assessment"
                  className="inline-flex rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
                >
                  Book free consultation
                </Link>
                <Link
                  href="/our-clinical-standards"
                  className="inline-flex rounded-full border border-[rgba(192,213,214,0.28)] bg-[rgba(244,247,246,0.92)] px-5 py-3 text-sm font-semibold text-[color:var(--ink-950)] shadow-[0_18px_40px_rgba(6,47,64,0.18)] transition hover:border-[rgba(192,213,214,0.36)] hover:bg-[color:var(--surface-paper)]"
                >
                  Review clinical standards
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[30px] border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.94),rgba(232,238,237,0.88))] p-5 shadow-[0_18px_42px_rgba(6,47,64,0.08)]">
                <div className="flex items-start gap-4">
                  <IconBadge name="compass" tone="light" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-500)]">
                      Best for
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">{service.bestFor}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[30px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5">
                <div className="flex items-start gap-4">
                  <IconBadge name="sparkles" tone="dark" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                      Expected outcome
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/72">{service.outcome}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[30px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5">
                <div className="flex items-start gap-4">
                  <IconBadge name="map-pin" tone="dark" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                      London context
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/72">
                      Patients usually want London convenience, clear aftercare, and
                      realistic planning to feel part of the overall care rather than
                      added later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <section className="section-dark overflow-hidden rounded-[38px] p-6 text-white sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
                  Treatment overview
                </p>
                <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
                  {service.guideHeading}
                </h2>
                <div className="mt-6 space-y-5 text-sm leading-7 text-white/70 sm:text-base">
                  {service.guideSections[0]?.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[280px] overflow-hidden rounded-[30px] border border-[color:var(--line-inverse-soft)] bg-[rgba(192,213,214,0.12)]">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          <section className="rounded-[38px] border border-[color:var(--line-soft)] bg-[color:var(--ink-950)] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/82">
              What the consultation should cover
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/70">
              {service.consultation.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <IconBadge
                    name={index === 0 ? "clipboard-check" : index === 1 ? "route" : "shield-check"}
                    tone="dark"
                    size="sm"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-[28px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5">
              <div className="flex items-start gap-4">
                <IconBadge name="message-dots" tone="dark" />
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                    Free consultation
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    A strong first consultation request includes case photos, your main
                    concern, whether you want London only or may consider Turkey later,
                    and what matters most to you: subtlety, density, recovery time, or
                    cost clarity.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {service.londonContext.map((item, index) => (
            <article
              key={`${service.slug}-context-${index}`}
              className="section-dark rounded-[30px] p-6 text-white"
            >
              <div className="flex items-start gap-4">
                <IconBadge name="map-pin" tone="dark" />
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                    Why patients consider London
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/68">{item}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              Planning and execution
            </p>
            <div className="mt-8 space-y-8">
              {service.guideSections.slice(1).map((section) => (
                <article key={`${service.slug}-${section.title}`}>
                  <h2 className="font-display text-3xl text-white">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-white/68 sm:text-base">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="grid gap-6">
            <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
                What to ask before booking
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-white/68">
                {service.selectionCriteria.map((item) => (
                  <li key={item} className="flex gap-3">
                    <IconBadge name="shield-check" tone="dark" size="sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
                Recovery considerations
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-white/68">
                {service.recoveryNotes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <IconBadge name="clock" tone="dark" size="sm" />
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

        <section className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
          <section className="rounded-[38px] border border-[color:var(--line-soft)] bg-[color:var(--ink-950)] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/82">
              Read next
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              Read what patients usually want to know next.
            </h2>
            <div className="mt-8 grid gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={`${service.slug}-guide-${guide.slug}`}
                  href={`/${guide.slug}`}
                  className="rounded-[26px] border border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] p-5 shadow-[0_18px_40px_rgba(6,47,64,0.08)] transition hover:-translate-y-0.5 hover:border-[rgba(8,58,79,0.14)] hover:bg-[color:var(--surface-paper)]"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge name={iconForHref(`/${guide.slug}`)} tone="light" />
                    <div>
                      <p className="font-display text-2xl text-[color:var(--ink-950)]">
                        {guide.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--ink-950)]">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              Frequently asked questions
            </p>
            <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
              Questions patients ask before moving forward.
            </h2>
            <div className="mt-8 space-y-4">
              {serviceFaqs.map((item) => (
                <details
                  key={item.question}
                  className="rounded-[24px] border border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] p-5 shadow-[0_18px_40px_rgba(6,47,64,0.08)]"
                >
                  <summary className="cursor-pointer text-base font-semibold text-[color:var(--ink-950)]">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--ink-950)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </section>

        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Explore other treatments
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Other treatments patients often compare.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedServices.map((entry) => (
              <Link
                key={entry.slug}
                href={`/services/${entry.slug}`}
                className="panel-dark rounded-[26px] p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.12)]"
              >
                <div className="flex items-start gap-4">
                  <IconBadge name={iconForServiceSlug(entry.slug)} tone="dark" />
                  <div>
                    <p className="font-display text-2xl text-white">{entry.title}</p>
                    <p className="mt-3 text-sm leading-7 text-white/68">
                      {entry.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
