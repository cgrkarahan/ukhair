import Image from "next/image";
import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import {
  iconForComparisonLabel,
  iconForHref,
  iconForTimelineStage,
  iconForTopicCard,
  iconForTopicSection,
} from "@/app/lib/iconography";
import { absoluteUrl, siteName } from "@/app/lib/seo";
import {
  topicPages,
  type TopicHeroPanel,
  type TopicPageContent,
} from "@/app/lib/siteContent";

type TopicPageProps = {
  page: TopicPageContent;
  relatedPages?: TopicPageContent[];
};

export default function TopicPage({
  page,
  relatedPages: providedRelatedPages,
}: TopicPageProps) {
  const clinicalIvoryTopicSlugs = new Set([
    "hair-transplant-london",
    "hair-transplant-cost-london",
    "our-clinical-standards",
    "uk-vs-turkey-hair-transplant",
    "hair-transplant-recovery-timeline",
    "why-turkiye",
  ]);
  const defaultHeroPricePanelSlugs = new Set([
    "hair-transplant-london",
    "hair-transplant-cost-london",
    "our-clinical-standards",
    "uk-vs-turkey-hair-transplant",
    "hair-transplant-recovery-timeline",
  ]);
  const defaultHeroPricePanel: TopicHeroPanel = {
    eyebrow: "Premium London Hair Transplant Price",
    value: "£2750",
    compareValue: "£4500",
    body: "Clear fixed price for eligible cases, including up to 3,000 grafts, one complimentary PRP treatment, post-operative medication, and an aftercare pack.",
    note: "Sapphire FUE approach where suitable. No extras, no arrangement fees.",
  };
  const useClinicalIvoryTopicPanels = clinicalIvoryTopicSlugs.has(page.slug);
  const useClinicalIvorySectionCards =
    page.slug === "hair-transplant-cost-london";
  const heroPanel =
    page.heroPanel ??
    (defaultHeroPricePanelSlugs.has(page.slug) ? defaultHeroPricePanel : undefined);
  const relatedPages =
    providedRelatedPages ??
    page.relatedSlugs.map((slug) => topicPages[slug]).filter(Boolean);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: absoluteUrl(`/${page.slug}`),
      isPartOf: {
        "@type": "WebSite",
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
          name: page.title,
          item: absoluteUrl(`/${page.slug}`),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
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
          key={`${page.slug}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero relative overflow-hidden rounded-[36px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10">
          {page.heroImageSrc ? (
            <div className="absolute inset-0">
              <Image
                src={page.heroImageSrc}
                alt={
                  page.heroImageAlt ??
                  `${page.title} consultation guidance in a premium London clinic`
                }
                fill
                priority={clinicalIvoryTopicSlugs.has(page.slug)}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,58,79,0.96)_0%,rgba(8,58,79,0.9)_34%,rgba(8,58,79,0.72)_58%,rgba(8,58,79,0.84)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_36%,rgba(64,126,140,0.34),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(192,213,214,0.1),transparent_22%)]" />
            </div>
          ) : null}

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              {heroPanel ? (
                <div className="mb-8 w-full max-w-[37.5rem] rounded-[28px] border border-[rgba(165,141,102,0.28)] bg-[linear-gradient(145deg,rgba(165,141,102,0.22),rgba(165,141,102,0.08))] p-5 shadow-[0_24px_60px_rgba(8,58,79,0.24)] backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--gold-300)]/84">
                    {heroPanel.eyebrow}
                  </p>
                  {heroPanel.value ? (
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
                  ) : heroPanel.headline ? (
                    <h2 className="mt-3 max-w-[24rem] font-display text-3xl leading-tight text-white sm:text-4xl">
                      {heroPanel.headline}
                    </h2>
                  ) : null}
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {heroPanel.body}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-white/52">
                    {heroPanel.note}
                  </p>
                </div>
              ) : null}
              <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/82">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {page.lead}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {page.heroChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] px-3.5 py-2 text-sm text-white/78"
                  >
                    {chip}
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

            <aside className="grid gap-4">
              {page.cards.map((card, index) => (
                <article
                  key={`${page.slug}-${card.title}`}
                  className="rounded-[28px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5 shadow-[0_24px_60px_rgba(6,47,64,0.2)]"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForTopicCard(page.slug, card.title, index)}
                      tone="dark"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                        Why it matters
                      </p>
                      <h2 className="mt-3 font-display text-2xl text-white">
                        {card.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-white/68">{card.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </aside>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article
              key={`${page.slug}-${section.title}`}
              className={`rounded-[30px] p-6 lg:p-7 ${
                useClinicalIvorySectionCards
                  ? "border border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] text-[color:var(--ink-950)] shadow-[0_24px_56px_rgba(6,47,64,0.08)]"
                  : "section-dark text-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <IconBadge
                  name={iconForTopicSection(page.slug, section.title, index)}
                  tone={useClinicalIvorySectionCards ? "light" : "dark"}
                />
                <div>
                  <p
                    className={`text-xs uppercase tracking-[0.28em] ${
                      useClinicalIvorySectionCards
                        ? "text-[color:var(--gold-500)]"
                        : "text-[color:var(--gold-300)]/76"
                    }`}
                  >
                    What to know
                  </p>
                  <h2
                    className={`mt-3 font-display text-3xl ${
                      useClinicalIvorySectionCards
                        ? "text-[color:var(--ink-950)]"
                        : "text-white"
                    }`}
                  >
                    {section.title}
                  </h2>
                </div>
              </div>
              {section.intro ? (
                <p
                  className={`mt-4 text-sm font-medium leading-7 ${
                    useClinicalIvorySectionCards
                      ? "text-[color:var(--ink-800)]"
                      : "text-white/78"
                  }`}
                >
                  {section.intro}
                </p>
              ) : null}
              <div
                className={`mt-4 space-y-4 text-sm leading-7 ${
                  useClinicalIvorySectionCards
                    ? "text-[color:var(--ink-800)]"
                    : "text-white/68"
                }`}
              >
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul
                  className={`mt-5 space-y-3 border-t pt-5 text-sm leading-7 ${
                    useClinicalIvorySectionCards
                      ? "border-[rgba(8,58,79,0.1)] text-[color:var(--ink-800)]"
                      : "border-[color:var(--line-inverse-soft)] text-white/68"
                  }`}
                >
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[color:var(--gold-500)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>

        {page.priceStory ? (
          <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
                {page.priceStory.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
                {page.priceStory.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
                {page.priceStory.intro}
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              {page.priceStory.rows.map((row) => (
                <article
                  key={`${page.slug}-price-story-${row.title}`}
                  className={`rounded-[28px] border p-5 shadow-[0_24px_56px_rgba(6,47,64,0.2)] sm:p-6 ${
                    row.featured
                      ? "border-[rgba(165,141,102,0.34)] bg-[linear-gradient(145deg,rgba(165,141,102,0.2),rgba(165,141,102,0.08))]"
                      : "border-[rgba(192,213,214,0.12)] bg-[rgba(192,213,214,0.06)]"
                  }`}
                >
                  <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-2xl text-white">
                          {row.title}
                        </h3>
                        {row.badge ? (
                          <span className="rounded-full bg-[color:var(--gold-300)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                            {row.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
                        {row.context}
                      </p>
                    </div>
                    <div className="lg:text-right">
                      <p
                        className={`font-display leading-none ${
                          row.featured
                            ? "text-5xl text-white sm:text-6xl"
                            : "text-4xl text-[color:var(--gold-300)] sm:text-5xl"
                        }`}
                      >
                        {row.price}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-5 text-xs leading-6 text-white/54">
              {page.priceStory.note}
            </p>
          </section>
        ) : null}

        {page.comparison ? (
          <section
            className={
              useClinicalIvoryTopicPanels
                ? "rounded-[34px] border border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] p-6 text-[color:var(--ink-950)] shadow-[0_24px_56px_rgba(6,47,64,0.08)] sm:p-8"
                : "section-dark overflow-hidden rounded-[34px] p-6 text-white sm:p-8"
            }
          >
            <div className="max-w-3xl">
              <p
                className={`text-xs uppercase tracking-[0.3em] ${
                  useClinicalIvoryTopicPanels
                    ? "text-[color:var(--gold-500)]"
                    : "text-[color:var(--gold-300)]/76"
                }`}
              >
                Comparison
              </p>
              <h2
                className={`mt-3 font-display text-3xl sm:text-4xl ${
                  useClinicalIvoryTopicPanels ? "text-[color:var(--ink-950)]" : "text-white"
                }`}
              >
                {page.comparison.title}
              </h2>
              <p
                className={`mt-4 text-sm leading-7 ${
                  useClinicalIvoryTopicPanels
                    ? "text-[color:var(--ink-950)]"
                    : "text-white/68"
                }`}
              >
                {page.comparison.intro}
              </p>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[720px] border-separate border-spacing-0">
                <thead>
                  <tr>
                    {page.comparison.columns.map((column, index) => (
                      <th
                        key={`${page.slug}-column-${column}`}
                        className={`border-b px-4 py-4 text-left text-xs uppercase tracking-[0.28em] ${
                          useClinicalIvoryTopicPanels
                            ? "border-[rgba(8,58,79,0.1)] text-[color:var(--gold-500)]"
                            : "border-[color:var(--line-inverse-soft)] text-[color:var(--gold-300)]/76"
                        } ${
                          index > 0
                            ? useClinicalIvoryTopicPanels
                              ? "border-l border-[rgba(8,58,79,0.1)]"
                              : "border-l border-[color:var(--line-inverse-soft)]"
                            : ""
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
                      <td
                        className={`border-b px-4 py-5 text-sm font-semibold ${
                          useClinicalIvoryTopicPanels
                            ? "border-[rgba(8,58,79,0.1)] text-[color:var(--ink-950)]"
                            : "border-[color:var(--line-inverse-soft)] text-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <IconBadge
                            name={iconForComparisonLabel(row.label, index)}
                            tone={useClinicalIvoryTopicPanels ? "light" : "dark"}
                            size="sm"
                          />
                          <span>{row.label}</span>
                        </div>
                      </td>
                      <td
                        className={`border-b border-l px-4 py-5 text-sm leading-7 ${
                          useClinicalIvoryTopicPanels
                            ? "border-[rgba(8,58,79,0.1)] text-[color:var(--ink-950)]"
                            : "border-[color:var(--line-inverse-soft)] text-white/68"
                        }`}
                      >
                        {row.left}
                      </td>
                      <td
                        className={`border-b border-l px-4 py-5 text-sm leading-7 ${
                          useClinicalIvoryTopicPanels
                            ? "border-[rgba(8,58,79,0.1)] text-[color:var(--ink-950)]"
                            : "border-[color:var(--line-inverse-soft)] text-white/68"
                        }`}
                      >
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
          <section className="grid gap-5 lg:grid-cols-4">
            {page.timeline.map((item, index) => (
              <article
                key={`${page.slug}-timeline-${item.title}`}
                className="panel-dark-muted rounded-[30px] p-6 text-white"
              >
                <div className="flex items-start gap-4">
                  <IconBadge
                    name={iconForTimelineStage(item.title, index)}
                    tone="dark"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                      Stage {index + 1}
                    </p>
                    <h2 className="mt-3 font-display text-2xl text-white">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/68">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : null}

        <AssessmentSection
          sourceLabel={page.slug}
          tone="dark"
          title="Turn your research into a free consultation."
          intro="Share your main concern, timing, any useful location context, and what matters most to you so the next conversation starts with clear detail rather than guesswork."
        />

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/76">
              Read next
            </p>
            <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
              Read the next questions patients usually have.
            </h2>
            <div className="mt-8 grid gap-4">
              {relatedPages.map((relatedPage) => (
                <Link
                  key={`${page.slug}-related-${relatedPage.slug}`}
                  href={`/${relatedPage.slug}`}
                  className={`rounded-[24px] border p-5 transition hover:-translate-y-0.5 ${
                    useClinicalIvoryTopicPanels
                      ? "border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] shadow-[0_18px_40px_rgba(6,47,64,0.08)] hover:border-[rgba(8,58,79,0.14)] hover:bg-[color:var(--surface-paper)]"
                      : "panel-dark hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.12)]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForHref(`/${relatedPage.slug}`)}
                      tone={useClinicalIvoryTopicPanels ? "light" : "dark"}
                    />
                    <div>
                      <p
                        className={`font-display text-2xl ${
                          useClinicalIvoryTopicPanels
                            ? "text-[color:var(--ink-950)]"
                            : "text-white"
                        }`}
                      >
                        {relatedPage.title}
                      </p>
                      <p
                        className={`mt-3 text-sm leading-7 ${
                          useClinicalIvoryTopicPanels
                            ? "text-[color:var(--ink-700)]"
                            : "text-white/68"
                        }`}
                      >
                        {relatedPage.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/76">
              Frequently asked questions
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Direct answers to the questions patients usually ask next.
            </h2>
            <div className="mt-8 grid gap-4">
              {page.faq.map((item) => (
                <details
                  key={`${page.slug}-faq-${item.question}`}
                  className={`rounded-[24px] border p-5 ${
                    useClinicalIvoryTopicPanels
                      ? "border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] shadow-[0_18px_40px_rgba(6,47,64,0.08)]"
                      : "panel-dark"
                  }`}
                >
                  <summary
                    className={`cursor-pointer text-base font-semibold ${
                      useClinicalIvoryTopicPanels
                        ? "text-[color:var(--ink-950)]"
                        : "text-white"
                    }`}
                  >
                    {item.question}
                  </summary>
                  <p
                    className={`mt-3 max-w-4xl text-sm leading-7 ${
                      useClinicalIvoryTopicPanels
                        ? "text-[color:var(--ink-700)]"
                        : "text-white/68"
                    }`}
                  >
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </section>
      </main>
    </SiteShell>
  );
}
