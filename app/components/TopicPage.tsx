import Image from "next/image";
import Link from "next/link";
import NextStepCard from "@/app/components/NextStepCard";
import PageHero from "@/app/components/PageHero";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import {
  iconForComparisonLabel,
  iconForHref,
  iconForTimelineStage,
  iconForTopicCard,
  iconForTopicSection,
} from "@/app/lib/iconography";
import { formatPrice, getPackage, turkiyeFromPrice } from "@/app/lib/pricing";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMedicalWebPageSchema,
  compactSchemaList,
} from "@/app/lib/schema";
import { getProcedureFacts } from "@/app/lib/medicalProcedures";
import { serviceCatalogBySlug } from "@/app/services/serviceData";
import { topicPages, type TopicPageContent } from "@/app/lib/siteContent";

type TopicPageProps = {
  page: TopicPageContent;
  relatedPages?: TopicPageContent[];
};

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function HeroFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-[24px] border border-[color:var(--line-soft)] bg-white/80 p-5 shadow-[0_18px_44px_rgba(6,47,64,0.08)] sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
        {label}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/**
 * Picks a hero visual that only this page has, so pages are told apart at a
 * glance: a price table for cost, a stage strip for timelines, a side-by-side
 * for comparisons, the page photo, or a list of what the page covers.
 */
function TopicHeroVisual({ page }: { page: TopicPageContent }) {
  if (page.priceStory) {
    return (
      <HeroFrame label={page.priceStory.eyebrow}>
        <ul className="divide-y divide-[color:var(--line-soft)]">
          {page.priceStory.rows.slice(0, 4).map((row) => (
            <li key={row.title} className="flex items-baseline justify-between gap-4 py-3">
              <span className="text-sm font-medium text-[color:var(--ink-800)]">{row.title}</span>
              <span
                className={`shrink-0 font-display text-2xl tabular-nums ${
                  row.featured ? "text-[color:var(--ink-950)]" : "text-[color:var(--ink-700)]"
                }`}
              >
                {row.price}
              </span>
            </li>
          ))}
        </ul>
      </HeroFrame>
    );
  }

  if (page.timeline?.length) {
    return (
      <HeroFrame label="At a glance">
        <ol className="relative grid gap-4 border-l-2 border-[color:var(--sage-200)] pl-5">
          {page.timeline.map((item) => (
            <li key={item.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-[color:var(--sage-600)]"
              />
              <p className="font-display text-lg leading-snug text-[color:var(--ink-950)]">
                {item.title}
              </p>
            </li>
          ))}
        </ol>
      </HeroFrame>
    );
  }

  const isVersus = page.slug.includes("-vs-");

  const versusPrices: Record<string, [string, string, string, string]> = {
    "uk-vs-turkey-hair-transplant": [
      "London",
      formatPrice(getPackage("hair").tiers[0].fue),
      "Turkey",
      formatPrice(turkiyeFromPrice),
    ],
    "fue-vs-dhi": [
      "Sapphire FUE",
      formatPrice(getPackage("hair").tiers[0].fue),
      "DHI",
      formatPrice(getPackage("hair").tiers[0].dhi),
    ],
  };
  const versus = versusPrices[page.slug];

  if (page.comparison && isVersus) {
    return (
      <HeroFrame label={versus ? "Starting prices, up to 3,000 grafts" : "What this compares"}>
        {versus ? (
          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
            <div className="rounded-[18px] bg-[color:var(--ink-950)] p-4 text-white">
              <p className="text-sm text-white/70">{versus[0]}</p>
              <p className="mt-1 font-display text-3xl tabular-nums sm:text-4xl">{versus[1]}</p>
            </div>
            <span className="self-center font-display text-lg text-[color:var(--ink-600)]">vs</span>
            <div className="rounded-[18px] bg-[color:var(--surface-muted)] p-4 text-[color:var(--ink-950)]">
              <p className="text-sm text-[color:var(--ink-700)]">{versus[2]}</p>
              <p className="mt-1 font-display text-3xl tabular-nums sm:text-4xl">{versus[3]}</p>
            </div>
          </div>
        ) : null}
        <ul className={`grid gap-2 text-sm text-[color:var(--ink-800)] ${versus ? "mt-5" : ""}`}>
          {page.comparison.rows.slice(0, 4).map((row) => (
            <li key={row.label} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold-500)]" />
              {row.label}
            </li>
          ))}
        </ul>
      </HeroFrame>
    );
  }

  if (page.heroImageSrc) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[color:var(--line-soft)]">
        <Image
          src={page.heroImageSrc}
          alt={page.heroImageAlt ?? `${page.title} consultation guidance`}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <HeroFrame label="On this page">
      <ol className="grid gap-2">
        {page.sections.map((section, index) => (
          <li key={section.title}>
            <a
              href={`#${sectionId(section.title)}`}
              className="flex items-baseline gap-3 rounded-[12px] px-2 py-1.5 text-[color:var(--ink-800)] transition hover:bg-[color:var(--surface-paper)] hover:text-[color:var(--ink-950)]"
            >
              <span className="w-5 shrink-0 text-sm tabular-nums text-[color:var(--gold-500)]">
                {index + 1}
              </span>
              <span className="font-medium">{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </HeroFrame>
  );
}

export default function TopicPage({
  page,
  relatedPages: providedRelatedPages,
}: TopicPageProps) {
  const fromPrice = formatPrice(getPackage("hair").tiers[0].fue);
  const relatedPages =
    providedRelatedPages ??
    page.relatedSlugs.map((slug) => topicPages[slug]).filter(Boolean);
  const relatedLinks = [
    ...relatedPages.map((relatedPage) => ({
      href: `/${relatedPage.slug}`,
      title: relatedPage.title,
      description: relatedPage.description,
    })),
    ...page.relatedSlugs
      .filter((slug) => slug.startsWith("services/"))
      .map((slug) => serviceCatalogBySlug[slug.replace("services/", "")])
      .filter(Boolean)
      .map((service) => ({
        href: `/services/${service.slug}`,
        title: service.title,
        description: service.shortDescription,
      })),
  ];
  const sources = page.sources ?? [];
  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...(page.breadcrumbParent ? [page.breadcrumbParent] : []),
    { name: page.title, path: `/${page.slug}` },
  ];

  const structuredData = compactSchemaList([
    buildMedicalWebPageSchema({
      path: `/${page.slug}`,
      name: page.title,
      description: page.description,
      ...(page.condition ? { condition: page.condition } : {}),
      // Condition pages are dermatology content; pages that describe a
      // procedure into scar tissue keep the default surgical specialty.
      ...(page.condition && !getProcedureFacts(`/${page.slug}`)
        ? { specialty: "https://schema.org/Dermatology" }
        : {}),
      citations: sources,
      ...(page.heroImageSrc
        ? {
            images: [
              {
                src: page.heroImageSrc,
                alt: page.heroImageAlt ?? page.title,
              },
            ],
          }
        : {}),
    }),
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(page.faq),
  ]);

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`${page.slug}-schema-${index}`}
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
          eyebrow={page.eyebrow}
          title={page.title}
          lead={page.lead}
          secondaryCta={
            page.condition
              ? { href: "/types-of-hair-loss", label: "Types of hair loss" }
              : { href: "/prices", label: "See prices" }
          }
          priceLine={
            page.condition ? null : (
              <>
                Fixed London price from <strong className="text-[color:var(--ink-950)]">{fromPrice}</strong>, with PRP, medication and aftercare included.
              </>
            )
          }
          visual={<TopicHeroVisual page={page} />}
        />

        {page.cards.length ? (
          <section aria-label="Key points" className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            {page.cards.map((card, index) => (
              <div key={`${page.slug}-${card.title}`} className="flex items-start gap-4">
                <IconBadge name={iconForTopicCard(page.slug, card.title, index)} tone="light" size="sm" />
                <div className="min-w-0">
                  <h2 className="font-display text-xl text-[color:var(--ink-950)]">{card.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">{card.text}</p>
                </div>
              </div>
            ))}
          </section>
        ) : null}

        <section className="grid gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article
              key={`${page.slug}-${section.title}`}
              id={sectionId(section.title)}
              className="surface-light scroll-mt-28 rounded-[24px] p-6 lg:p-7"
            >
              <div className="flex items-start gap-4">
                <IconBadge name={iconForTopicSection(page.slug, section.title, index)} tone="light" />
                <h2 className="min-w-0 font-display text-2xl text-[color:var(--ink-950)] sm:text-[1.7rem]">
                  {section.title}
                </h2>
              </div>
              {section.intro ? (
                <p className="mt-4 text-sm font-medium leading-7 text-[color:var(--ink-800)]">
                  {section.intro}
                </p>
              ) : null}
              <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--ink-700)]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-5 text-sm leading-7 text-[color:var(--ink-700)]">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--gold-500)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>

        {page.priceStory ? (
          <section className="surface-light rounded-[28px] p-6 sm:p-8">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                {page.priceStory.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
                {page.priceStory.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)] sm:text-base">
                {page.priceStory.intro}
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {page.priceStory.rows.map((row) => (
                <article
                  key={`${page.slug}-price-story-${row.title}`}
                  className={`rounded-[20px] border p-5 sm:p-6 ${
                    row.featured
                      ? "border-[color:var(--ink-950)] bg-white"
                      : "border-[color:var(--line-soft)] bg-white/60"
                  }`}
                >
                  <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-2xl text-[color:var(--ink-950)]">{row.title}</h3>
                        {row.badge ? (
                          <span className="rounded-full bg-[color:var(--ink-950)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                            {row.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-[color:var(--ink-700)]">{row.context}</p>
                    </div>
                    <p className="font-display text-4xl leading-none tabular-nums text-[color:var(--ink-950)] lg:text-right">
                      {row.price}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-5 text-xs leading-6 text-[color:var(--ink-600)]">{page.priceStory.note}</p>
            {page.priceStory.link ? (
              <Link
                href={page.priceStory.link.href}
                className="mt-4 inline-flex rounded-full bg-[color:var(--ink-950)] px-5 py-3 text-sm font-semibold !text-white transition visited:!text-white hover:bg-[color:var(--sage-600)]"
              >
                {page.priceStory.link.label}
              </Link>
            ) : null}
          </section>
        ) : null}

        {page.comparison ? (
          <section className="surface-light rounded-[28px] p-6 sm:p-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                Comparison
              </p>
              <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
                {page.comparison.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)]">{page.comparison.intro}</p>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[720px] border-separate border-spacing-0">
                <thead>
                  <tr>
                    {page.comparison.columns.map((column, index) => (
                      <th
                        key={`${page.slug}-column-${column}`}
                        className={`border-b border-[color:var(--line-soft)] px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--gold-500)] ${
                          index > 0 ? "border-l" : ""
                        }`}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.comparison.rows.map((row, index) => (
                    <tr key={`${page.slug}-row-${row.label}`}>
                      <td className="border-b border-[color:var(--line-soft)] px-4 py-5 text-sm font-semibold text-[color:var(--ink-950)]">
                        <div className="flex items-start gap-3">
                          <IconBadge name={iconForComparisonLabel(row.label, index)} tone="light" size="sm" />
                          <span>{row.label}</span>
                        </div>
                      </td>
                      <td className="border-b border-l border-[color:var(--line-soft)] px-4 py-5 text-sm leading-7 text-[color:var(--ink-800)]">
                        {row.left}
                      </td>
                      <td className="border-b border-l border-[color:var(--line-soft)] px-4 py-5 text-sm leading-7 text-[color:var(--ink-800)]">
                        {row.right}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {page.timeline?.length ? (
          <section aria-label="Timeline">
            <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {page.timeline.map((item, index) => (
                <li
                  key={`${page.slug}-timeline-${item.title}`}
                  className="relative border-t-2 border-[color:var(--sage-500)] pt-5"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge name={iconForTimelineStage(item.title, index)} tone="light" size="sm" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--gold-500)]">
                        Stage {index + 1}
                      </p>
                      <h2 className="mt-2 font-display text-2xl text-[color:var(--ink-950)]">{item.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">{item.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {sources.length > 0 ? (
          <section className="border-t border-[color:var(--line-soft)] pt-8">
            <h2 className="font-display text-2xl text-[color:var(--ink-950)]">Sources</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[color:var(--ink-700)]">
              Independent NHS, dermatology and patient-support information this page draws on.
              It is general information, not a diagnosis.
            </p>
            <ul className="mt-4 grid gap-3 text-sm leading-6 sm:grid-cols-2">
              {sources.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--ink-900)] underline decoration-[color:var(--line-strong)] underline-offset-4 transition hover:decoration-[color:var(--ink-900)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <NextStepCard
          title={
            page.condition
              ? "Not sure which type of hair loss you have?"
              : "Turn your research into a free consultation."
          }
        />

        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <h2 className="font-display text-3xl text-[color:var(--ink-950)]">Read next</h2>
            <div className="mt-6 grid gap-3">
              {relatedLinks.map((relatedPage) => (
                <Link
                  key={`${page.slug}-related-${relatedPage.href}`}
                  href={relatedPage.href}
                  className="surface-light group flex items-start gap-4 rounded-[20px] p-5 transition hover:border-[color:var(--line-strong)] hover:bg-white"
                >
                  <IconBadge name={iconForHref(relatedPage.href)} tone="light" size="sm" />
                  <div className="min-w-0">
                    <p className="font-display text-xl text-[color:var(--ink-950)] group-hover:underline group-hover:underline-offset-4">
                      {relatedPage.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">
                      {relatedPage.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-[color:var(--ink-950)]">Questions about this</h2>
            <div className="mt-6 divide-y divide-[color:var(--line-soft)] border-y border-[color:var(--line-soft)]">
              {page.faq.map((item) => (
                <details key={`${page.slug}-faq-${item.question}`} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-[color:var(--ink-950)] marker:content-none">
                    <span>{item.question}</span>
                    <span aria-hidden="true" className="mt-0.5 text-[color:var(--ink-600)] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-[color:var(--ink-700)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
