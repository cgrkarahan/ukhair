import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import GraftEstimator from "@/app/components/GraftEstimator";
import ProofCaseCard from "@/app/components/ProofCaseCard";
import { proofDisclaimer } from "@/app/lib/proof";
import ReviewSlider from "@/app/components/ReviewSlider";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { featuredBlogPosts } from "@/app/lib/blogContent";
import {
  formatGrafts,
  formatPrice,
  getPackage,
  packageInclusions,
} from "@/app/lib/pricing";
import {
  iconForHomePillar,
  iconForJourney,
} from "@/app/lib/iconography";
import {
  buildMedicalWebPageSchema,
  organizationRef,
  type SchemaImage,
} from "@/app/lib/schema";
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

const featuredServiceSlugs = [
  "male-hair-transplant",
  "female-hair-transplant",
  "hair-loss-treatments",
] as const;

const homepageBlogPosts = featuredBlogPosts.slice(0, 3);

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

  const hair = getPackage("hair");

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("/"),
      description: home.description,
      publisher: organizationRef,
    },
    // proofCases is already consent-filtered, so ImageObject nodes appear only
    // where a consented result set genuinely exists.
    buildMedicalWebPageSchema({
      path: "/",
      name: home.seoTitle,
      description: home.description,
      images: proofCases.flatMap((proofCase) => {
        const images: (SchemaImage | undefined)[] = [
          proofCase.beforeImageSrc
            ? {
                src: proofCase.beforeImageSrc,
                alt: proofCase.beforeImageAlt,
                caption: `${proofCase.title}, before treatment`,
              }
            : undefined,
          proofCase.afterImageSrc
            ? {
                src: proofCase.afterImageSrc,
                alt: proofCase.afterImageAlt,
                caption: `${proofCase.title}, ${proofCase.timeline}`,
              }
            : undefined,
        ];

        return images.filter((image): image is SchemaImage => Boolean(image));
      }),
    }),
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
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-14 px-5 pb-28 pt-6 lg:gap-20 lg:px-8 lg:pt-10"
      >
        <section className="page-hero relative overflow-hidden rounded-[32px] border border-[rgba(192,213,214,0.12)] px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="absolute inset-0">
            <Image
              src="/images/home-hero-consultation.png"
              alt="Hair transplant consultation and planning in a London clinic"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,58,79,0.96)_0%,rgba(8,58,79,0.88)_42%,rgba(8,58,79,0.72)_70%,rgba(8,58,79,0.82)_100%)]" />
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-300)]">
                {home.hero.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance font-display text-[2.15rem] leading-[1.06] text-white sm:text-5xl lg:text-[3.6rem]">
                {home.hero.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
                {home.hero.lead}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/assessment"
                  className="inline-flex whitespace-nowrap rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
                >
                  Book free consultation
                </Link>
                <Link
                  href="#estimate"
                  className="inline-flex whitespace-nowrap rounded-full border border-[rgba(192,213,214,0.4)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[rgba(192,213,214,0.12)]"
                >
                  Estimate my grafts and price
                </Link>
              </div>
              <p className="mt-5 text-sm leading-6 text-white/72">
                Fixed London price from{" "}
                <strong className="text-white">{formatPrice(hair.tiers[0].fue)}</strong> for up to{" "}
                {formatGrafts(hair.tiers[0].maxGrafts)} grafts, with PRP, medication and aftercare included.{" "}
                <Link href="/prices" className="font-semibold text-[color:var(--gold-300)] underline-offset-4 hover:underline">
                  See prices
                </Link>
              </p>
            </div>

            <div className="hidden rounded-[24px] border border-[rgba(192,213,214,0.18)] bg-[rgba(6,47,64,0.72)] p-5 backdrop-blur-sm lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-300)]">
                Fixed London prices
              </p>
              <table className="mt-3 w-full text-left text-sm text-white/80">
                <thead>
                  <tr className="text-xs text-white/55">
                    <th className="py-2 font-medium">Grafts</th>
                    <th className="py-2 font-medium">Sapphire FUE</th>
                    <th className="py-2 font-medium">DHI</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {hair.tiers.map((tier) => (
                    <tr key={tier.maxGrafts} className="border-t border-[rgba(192,213,214,0.14)]">
                      <td className="py-2.5">Up to {formatGrafts(tier.maxGrafts)}</td>
                      <td className="py-2.5 font-display text-xl text-white">{formatPrice(tier.fue)}</td>
                      <td className="py-2.5 font-display text-xl text-white">{formatPrice(tier.dhi)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section aria-label="Why patients trust this route" className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
          {home.trustPillars.map((pillar, index) => (
            <div key={pillar.title} className="flex items-start gap-4">
              <IconBadge name={iconForHomePillar(pillar.title, index)} tone="light" size="sm" />
              <div className="min-w-0">
                <h2 className="font-display text-xl text-[color:var(--ink-950)]">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">{pillar.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                Results
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
                Real cases from our partner clinics.
              </h2>
            </div>
            <Link
              href="/results"
              className="inline-flex shrink-0 self-start rounded-full border border-[color:var(--line-strong)] bg-white/60 px-5 py-2.5 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-white sm:self-auto"
            >
              See all results
            </Link>
          </div>
          {proofCases.length > 0 ? (
            <>
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {proofCases.map((proofCase) => (
                  <ProofCaseCard key={proofCase.slug} proofCase={proofCase} />
                ))}
              </div>
              <p className="mt-5 max-w-3xl text-xs leading-6 text-[color:var(--ink-600)]">
                {proofDisclaimer}
              </p>
            </>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {home.proofSection.fallbackItems.map((item) => (
                <div
                  key={item.text}
                  className="surface-light flex items-start gap-4 rounded-[20px] p-5 text-sm leading-7 text-[color:var(--ink-700)]"
                >
                  <IconBadge name={item.icon} tone="light" size="sm" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="estimate" className="hero-light scroll-mt-28 rounded-[32px] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                Prices
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
                See your likely band and price in three taps.
              </h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--ink-700)]">
                Prices are fixed by graft range, not per graft. Your band is confirmed for free once the team has seen your photos.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-[color:var(--ink-800)]">
                {packageInclusions.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <IconBadge name="shield-check" tone="light" size="sm" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/prices"
                className="mt-6 inline-flex text-sm font-semibold text-[color:var(--ink-950)] underline underline-offset-4"
              >
                See every price
              </Link>
            </div>
            <GraftEstimator sourceLabel="homepage" />
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                How it works
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
                We help you prepare, then connect you with a selected London clinic.
              </h2>
            </div>
            <Link
              href="/how-we-work"
              className="inline-flex shrink-0 self-start rounded-full border border-[color:var(--line-strong)] bg-white/60 px-5 py-2.5 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-white sm:self-auto"
            >
              How we work
            </Link>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {home.journey.steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-[color:var(--sage-500)] pt-5">
                <div className="flex items-center gap-3">
                  <IconBadge name={iconForJourney(index, step.title)} tone="light" size="sm" />
                  <p className="text-sm font-semibold text-[color:var(--gold-500)]">Step {index + 1}</p>
                </div>
                <h3 className="mt-3 font-display text-2xl text-[color:var(--ink-950)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="services">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                {home.servicesIntro.eyebrow}
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
                {home.servicesIntro.headline}
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 self-start rounded-full border border-[color:var(--line-strong)] bg-white/60 px-5 py-2.5 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-white sm:self-auto"
            >
              All treatments
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="surface-light group flex flex-col overflow-hidden rounded-[24px] transition hover:border-[color:var(--line-strong)] hover:bg-white"
              >
                <div className="relative aspect-[16/10] bg-[color:var(--surface-muted)]">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-500)]">
                    {service.badge}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-[color:var(--ink-950)] group-hover:underline group-hover:underline-offset-4">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
                    <span className="font-semibold text-[color:var(--ink-900)]">Best for: </span>
                    {service.bestFor}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {reviews.length > 0 ? <ReviewSlider reviews={reviews} /> : null}

        <AssessmentSection
          sourceLabel="homepage"
          tone="dark"
          title="Book your free consultation."
          intro="Share your concern, timing, any useful location context, and any helpful photos so the team can guide you toward the most useful next step."
        />

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0">
            <h2 className="font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              Questions people ask first
            </h2>
            <div className="mt-6 divide-y divide-[color:var(--line-soft)] border-y border-[color:var(--line-soft)]">
              {home.faq.map((item) => (
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

          <div className="min-w-0">
            <h2 className="font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              {home.guideSection.headline}
            </h2>
            <div className="mt-6 grid gap-3">
              {homepageBlogPosts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="surface-light group flex items-start gap-4 rounded-[20px] p-4 transition hover:border-[color:var(--line-strong)] hover:bg-white"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[14px] bg-[color:var(--surface-muted)]">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="96px"
                      className="object-cover"
                      style={{ objectPosition: item.imagePosition ?? "center" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg leading-snug text-[color:var(--ink-950)] group-hover:underline group-hover:underline-offset-4">
                      {item.label}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-[color:var(--ink-700)]">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-5 inline-flex text-sm font-semibold text-[color:var(--ink-950)] underline underline-offset-4"
            >
              All articles
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
