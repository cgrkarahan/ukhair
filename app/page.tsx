import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import BeforeAfterCard from "@/app/components/BeforeAfterCard";
import ReviewSlider from "@/app/components/ReviewSlider";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { featuredBlogPosts } from "@/app/lib/blogContent";
import { siteContact, siteSocialLinks } from "@/app/lib/contact";
import {
  iconForHref,
  iconForHomePillar,
  iconForJourney,
  iconForSignal,
} from "@/app/lib/iconography";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";
import {
  getHomePageContent,
  getProofCasesContent,
  getReviewsContent,
  getServiceCatalogContent,
} from "@/sanity/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePageContent();

  return buildMetadata({
    title: home.seoTitle,
    description: home.description,
    path: "/",
    keywords: home.keywords,
  });
}

function explanatorySignalCopy(value: string, fallback: string) {
  switch (value) {
    case "London":
      return "Choose a central London route if you want consultations, treatment day, and follow-up to feel easier to organise around work, travel, and normal life.";
    case "GMC":
      return "If you want treatment in London with stronger medical reassurance, GMC-registered doctors give you a clearer basis for trust before you commit.";
    case "CQC":
      return "A CQC-registered provider setting in England can give you more confidence in the clinic environment, standards, and aftercare structure around your treatment.";
    case "UK + Turkey":
      return "If you are deciding between London and Turkey, you can compare both routes more clearly here before choosing the option that fits your priorities best.";
    default:
      return fallback;
  }
}

function variantForProofCase(area: string, title: string) {
  const value = `${area} ${title}`.toLowerCase();

  if (value.includes("crown")) return "crown" as const;
  if (value.includes("temple")) return "temple" as const;
  if (value.includes("female") || value.includes("diffuse")) return "diffuse" as const;

  return "hairline" as const;
}

const featuredServiceSlugs = [
  "male-hair-transplant",
  "female-hair-transplant",
  "hair-loss-treatments",
] as const;

export default async function Home() {
  const [home, services, proofCases, reviews] = await Promise.all([
    getHomePageContent(),
    getServiceCatalogContent(),
    getProofCasesContent(),
    getReviewsContent(),
  ]);

  const featuredServices = featuredServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const mobileTrustPillars = home.trustPillars.slice(0, 2);
  const mobileProofCases = proofCases.slice(0, 1);
  const mobileGuides = featuredBlogPosts.slice(0, 2);
  const mobileFaq = home.faq.slice(0, 4);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
      description: home.description,
      email: siteContact.email,
      areaServed: ["London", "United Kingdom"],
      sameAs: siteSocialLinks.map((social) => social.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("/"),
      description: home.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Hair Transplant London",
      url: absoluteUrl("/"),
      description: home.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Hair transplant services in London",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: absoluteUrl(`/services/${service.slug}`),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: home.faq.map((item) => ({
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
          key={`home-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero relative overflow-hidden rounded-[40px] border border-[rgba(192,213,214,0.12)] px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="absolute inset-0">
            <Image
              src="/images/home-hero-consultation.png"
              alt="Hair transplant consultation and planning in a premium London clinic"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,58,79,0.94)_0%,rgba(8,58,79,0.84)_34%,rgba(8,58,79,0.7)_58%,rgba(8,58,79,0.78)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_34%,rgba(64,126,140,0.34),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(192,213,214,0.12),transparent_24%)]" />
          </div>

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="mb-8 w-full max-w-[37.5rem] rounded-[28px] border border-[rgba(165,141,102,0.28)] bg-[linear-gradient(145deg,rgba(165,141,102,0.22),rgba(165,141,102,0.08))] p-5 shadow-[0_24px_60px_rgba(8,58,79,0.24)] backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--gold-300)]/84">
                  Premium London Hair Transplant Price
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <p className="font-display text-5xl leading-none text-white sm:text-6xl">
                    £2750
                  </p>
                  <p className="pb-1 text-sm text-white/56 line-through">
                    £4500
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/80">
                  Clear fixed price for eligible cases, including up to 3,000
                  grafts, one complimentary PRP treatment, post-operative
                  medication, and an aftercare pack.
                </p>
                <p className="mt-3 text-xs leading-6 text-white/52">
                  Sapphire FUE approach where suitable. No extras, no
                  arrangement fees.
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.36em] text-[color:var(--gold-300)]/82">
                {home.hero.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-[4.65rem]">
                {home.hero.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {home.hero.lead}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/assessment"
                  className="inline-flex rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
                >
                  Book free consultation
                </Link>
                <Link
                  href="/hair-transplant-london"
                  className="inline-flex rounded-full border border-[rgba(192,213,214,0.28)] bg-[color:var(--surface-subtle)] px-5 py-3 text-sm font-semibold shadow-[0_18px_40px_rgba(6,47,64,0.22)] transition hover:border-[rgba(192,213,214,0.36)] hover:bg-[color:var(--surface-paper)]"
                  style={{ color: "var(--ink-950)" }}
                >
                  {home.hero.secondaryCtaLabel}
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {home.hero.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] px-3.5 py-2 text-sm text-white/78"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {mobileTrustPillars.map((pillar, index) => (
                <article
                  key={`${pillar.title}-mobile`}
                  className="rounded-[28px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5 shadow-[0_24px_60px_rgba(6,47,64,0.2)] sm:hidden"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForHomePillar(pillar.title, index)}
                      tone="dark"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                        Why it matters
                      </p>
                      <h2 className="mt-3 font-display text-2xl text-white">
                        {pillar.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-white/68">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
              {home.trustPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="hidden rounded-[28px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5 shadow-[0_24px_60px_rgba(6,47,64,0.2)] sm:block"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForHomePillar(pillar.title, index)}
                      tone="dark"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                        Why it matters
                      </p>
                      <h2 className="mt-3 font-display text-2xl text-white">
                        {pillar.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-white/68">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
          {home.signals.map((signal) => (
            <article
              key={`${signal.value}-${signal.label}`}
              className="panel-dark rounded-[28px] p-5 text-white"
            >
              <div className="flex items-center gap-4">
                <IconBadge name={iconForSignal(signal.value)} tone="dark" />
                <p className="font-display text-[2.35rem] leading-none text-white">
                  {signal.value}
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/68">
                {explanatorySignalCopy(signal.value, signal.label)}
              </p>
            </article>
          ))}
        </section>

        <section className="surface-card rounded-[38px] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
              {home.proofSection.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              {home.proofSection.headline}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)] sm:text-base">
              Before-and-after proof is most useful when it is tied to the area
              treated, the recovery timeline, and realistic planning rather than
              shown as decoration on its own.
            </p>
          </div>
          {proofCases.length > 0 ? (
            <div className="mt-8 grid gap-5 xl:grid-cols-3">
              {mobileProofCases.map((proofCase) => (
                <article
                  key={`${proofCase.slug}-mobile`}
                  className="overflow-hidden rounded-[28px] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.72)] shadow-[0_22px_56px_rgba(6,47,64,0.1)] sm:hidden"
                >
                  <div className="border-b border-[color:var(--line-soft)] bg-[rgba(192,213,214,0.18)] p-3">
                    <BeforeAfterCard
                      title={proofCase.title}
                      area={proofCase.areaTreated}
                      variant={
                        proofCase.variant ??
                        variantForProofCase(
                          proofCase.areaTreated,
                          proofCase.title,
                        )
                      }
                      beforeImage={proofCase.beforeImageSrc}
                      afterImage={proofCase.afterImageSrc ?? proofCase.imageSrc}
                      beforeImageAlt={proofCase.beforeImageAlt}
                      afterImageAlt={proofCase.afterImageAlt ?? proofCase.imageAlt}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-500)]">
                        {proofCase.areaTreated}
                      </p>
                    </div>
                    <h3 className="mt-2 font-display text-2xl text-[color:var(--ink-950)]">
                      {proofCase.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
                      {proofCase.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--ink-600)]">
                      <span>{proofCase.timeline}</span>
                      {proofCase.treatmentNote ? (
                        <span>• {proofCase.treatmentNote}</span>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
              {proofCases.map((proofCase) => (
                <article
                  key={proofCase.slug}
                  className="hidden overflow-hidden rounded-[28px] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.72)] shadow-[0_22px_56px_rgba(6,47,64,0.1)] sm:block"
                >
                  <div className="border-b border-[color:var(--line-soft)] bg-[rgba(192,213,214,0.18)] p-3">
                    <BeforeAfterCard
                      title={proofCase.title}
                      area={proofCase.areaTreated}
                      variant={
                        proofCase.variant ??
                        variantForProofCase(
                          proofCase.areaTreated,
                          proofCase.title,
                        )
                      }
                      beforeImage={proofCase.beforeImageSrc}
                      afterImage={proofCase.afterImageSrc ?? proofCase.imageSrc}
                      beforeImageAlt={proofCase.beforeImageAlt}
                      afterImageAlt={proofCase.afterImageAlt ?? proofCase.imageAlt}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-500)]">
                        {proofCase.areaTreated}
                      </p>
                      {proofCase.isPlaceholder ? (
                        <span className="rounded-full border border-[color:var(--line-soft)] bg-[rgba(192,213,214,0.18)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-700)]">
                          Preview placeholder
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 font-display text-2xl text-[color:var(--ink-950)]">
                      {proofCase.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
                      {proofCase.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--ink-600)]">
                      <span>{proofCase.timeline}</span>
                      {proofCase.treatmentNote ? (
                        <span>• {proofCase.treatmentNote}</span>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {home.proofSection.fallbackItems.map((item) => (
                <div
                  key={item.text}
                  className="rounded-[26px] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.72)] p-5 text-sm leading-7 text-[color:var(--ink-700)] shadow-[0_18px_42px_rgba(6,47,64,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge name={item.icon} tone="light" size="sm" />
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="services" className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              {home.servicesIntro.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              {home.servicesIntro.headline}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              {home.servicesIntro.intro}
            </p>
            <Link
              href="/services"
              className="mt-5 inline-flex text-sm font-semibold text-[color:var(--gold-300)] transition hover:text-white"
            >
              Browse all hair transplant treatments
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => (
              <article
                key={`${service.slug}-mobile`}
                className="panel-dark flex h-full flex-col overflow-hidden rounded-[30px] md:hidden"
              >
                <div className="relative aspect-[4/3] border-b border-[color:var(--line-inverse-soft)] bg-[rgba(192,213,214,0.12)]">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <span className="rounded-full bg-[rgba(192,213,214,0.12)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/72">
                      {service.badge}
                    </span>
                    <span className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-300)]/82">
                      London
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-3xl text-white">
                    {service.title}
                  </h3>
                  <div className="mt-5 rounded-[24px] border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.94),rgba(232,238,237,0.88))] p-4 shadow-[0_14px_36px_rgba(6,47,64,0.08)]">
                    <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-500)]">
                      Best for
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">
                      {service.bestFor}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex rounded-full bg-[color:var(--ink-950)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--sage-500)]"
                    >
                      View treatment
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {featuredServices.map((service) => (
              <article
                key={service.slug}
                className="hidden panel-dark h-full flex-col overflow-hidden rounded-[30px] md:flex"
              >
                <div className="relative aspect-[4/3] border-b border-[color:var(--line-inverse-soft)] bg-[rgba(192,213,214,0.12)]">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <span className="rounded-full bg-[rgba(192,213,214,0.12)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/72">
                      {service.badge}
                    </span>
                    <span className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-300)]/82">
                      London
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-3xl text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 min-h-[7rem] text-sm leading-7 text-white/68 xl:min-h-[6.75rem]">
                    {service.shortDescription}
                  </p>
                  <div className="mt-5 rounded-[24px] border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.94),rgba(232,238,237,0.88))] p-4 shadow-[0_14px_36px_rgba(6,47,64,0.08)]">
                    <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-500)]">
                      Best for
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">
                      {service.bestFor}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex rounded-full bg-[color:var(--ink-950)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--sage-500)]"
                    >
                      View treatment
                    </Link>
                    <Link
                      href={`/${service.relatedGuideSlugs[0]}`}
                      className="inline-flex rounded-full border border-[color:var(--line-inverse-soft)] px-4 py-2.5 text-sm font-semibold text-white/84 transition hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
                    >
                      Related reading
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex justify-start">
            <Link
              href="/services"
              className="inline-flex rounded-full border border-[color:var(--line-inverse-soft)] px-5 py-3 text-sm font-semibold text-white/86 transition hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
            >
              See all treatments
            </Link>
          </div>
        </section>

        <section className="hidden gap-5 lg:grid lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[36px] border border-[color:var(--line-soft)] bg-[color:var(--ink-950)] p-6 text-white sm:p-8">
            <div className="relative mb-7 aspect-[16/8.4] overflow-hidden rounded-[28px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)]">
              <Image
                src="/images/london-location-section.png"
                alt="Consultation in a premium London clinic with clear central London location cues"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,58,79,0.2)_0%,rgba(8,58,79,0.08)_40%,rgba(8,58,79,0.26)_100%)]" />
            </div>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/82">
              {home.londonDecision.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              {home.londonDecision.headline}
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-white/68">
              {home.londonDecision.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/how-we-select-clinics"
                className="inline-flex rounded-full border border-white/16 bg-white px-4 py-2.5 text-sm font-semibold !text-[color:var(--ink-950)] shadow-[0_16px_36px_rgba(6,47,64,0.22)] transition hover:bg-[color:var(--surface-subtle)]"
                style={{ color: "var(--ink-950)" }}
              >
                {home.londonDecision.primaryCtaLabel}
              </Link>
              <Link
                href="/patient-guidance-process"
                className="inline-flex rounded-full border border-[rgba(192,213,214,0.18)] px-4 py-2.5 text-sm font-semibold text-white/84 transition hover:border-[rgba(192,213,214,0.3)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
              >
                {home.londonDecision.secondaryCtaLabel}
              </Link>
            </div>
          </section>

          <section className="surface-card rounded-[36px] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
              {home.journey.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              {home.journey.headline}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {home.journey.steps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[26px] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.68)] p-5 shadow-[0_18px_44px_rgba(6,47,64,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForJourney(index, step.title)}
                      tone="light"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-500)]">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-[color:var(--ink-950)]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="surface-card rounded-[38px] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
              {home.guideSection.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              {home.guideSection.headline}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)] sm:text-base">
              {home.guideSection.intro}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {mobileGuides.map((item) => (
              <Link
                key={`${item.href}-mobile`}
                href={item.href}
                className="overflow-hidden rounded-[28px] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.72)] shadow-[0_22px_56px_rgba(6,47,64,0.08)] transition hover:-translate-y-0.5 hover:border-[color:var(--line-strong)] hover:shadow-[0_26px_64px_rgba(6,47,64,0.12)] md:hidden"
              >
                <div className="relative aspect-[16/10] border-b border-[color:var(--line-soft)] bg-[rgba(192,213,214,0.18)]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{
                      objectPosition: item.imagePosition ?? "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,58,79,0.02)_0%,rgba(8,58,79,0.12)_100%)]" />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge name={iconForHref(item.href)} tone="light" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-500)]">
                        Read next
                      </p>
                      <h3 className="mt-3 font-display text-3xl text-[color:var(--ink-950)]">
                        {item.label}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {featuredBlogPosts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hidden overflow-hidden rounded-[28px] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.72)] shadow-[0_22px_56px_rgba(6,47,64,0.08)] transition hover:-translate-y-0.5 hover:border-[color:var(--line-strong)] hover:shadow-[0_26px_64px_rgba(6,47,64,0.12)] md:block"
              >
                <div className="relative aspect-[16/10] border-b border-[color:var(--line-soft)] bg-[rgba(192,213,214,0.18)]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    style={{
                      objectPosition: item.imagePosition ?? "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,58,79,0.02)_0%,rgba(8,58,79,0.12)_100%)]" />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge name={iconForHref(item.href)} tone="light" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-500)]">
                        Read next
                      </p>
                      <h3 className="mt-3 font-display text-3xl text-[color:var(--ink-950)]">
                        {item.label}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex rounded-full border border-[color:var(--line-soft)] bg-white/72 px-5 py-3 text-sm font-semibold text-[color:var(--ink-950)] shadow-[0_16px_36px_rgba(6,47,64,0.08)] transition hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface-paper)]"
            >
              Browse all articles
            </Link>
          </div>
        </section>

        {reviews.length > 0 ? <ReviewSlider reviews={reviews} /> : null}

        <AssessmentSection
          sourceLabel="homepage"
          tone="dark"
          title="Book your free consultation."
          intro="Share your concern, timing, any useful location context, and any helpful photos so the team can guide you toward the most useful next step."
        />

        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Frequently asked questions
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Questions patients usually ask before taking the next step.
          </h2>
          <div className="mt-8 grid gap-4">
            {mobileFaq.map((item) => (
              <details
                key={`${item.question}-mobile`}
                className="group panel-dark rounded-[26px] p-3 sm:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[20px] border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.96),rgba(232,238,237,0.9))] px-4 py-4 text-base font-semibold text-[color:var(--ink-950)] shadow-[0_14px_34px_rgba(6,47,64,0.08)] marker:content-none">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--line-soft)] bg-white/72 text-[color:var(--ink-700)] transition-transform duration-200 group-open:rotate-180"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 7.5 5 5 5-5" />
                    </svg>
                  </span>
                </summary>
                <p className="px-2 pt-4 text-sm leading-7 text-white/68">
                  {item.answer}
                </p>
              </details>
            ))}
            {home.faq.map((item) => (
              <details
                key={item.question}
                className="group hidden panel-dark rounded-[26px] p-3 sm:block sm:p-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[20px] border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.96),rgba(232,238,237,0.9))] px-4 py-4 text-base font-semibold text-[color:var(--ink-950)] shadow-[0_14px_34px_rgba(6,47,64,0.08)] marker:content-none">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--line-soft)] bg-white/72 text-[color:var(--ink-700)] transition-transform duration-200 group-open:rotate-180"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 7.5 5 5 5-5" />
                    </svg>
                  </span>
                </summary>
                <p className="px-2 pt-4 text-sm leading-7 text-white/68">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
