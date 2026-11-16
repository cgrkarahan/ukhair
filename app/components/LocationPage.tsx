import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import { IconBadge } from "@/app/components/SiteIcon";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import SiteShell from "@/app/components/SiteShell";
import {
  iconForHref,
  iconForTopicCard,
  iconForTopicSection,
} from "@/app/lib/iconography";
import { locationPageList, type LocationPageContent } from "@/app/lib/locations";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMedicalWebPageSchema,
  buildServiceSchema,
  compactSchemaList,
} from "@/app/lib/schema";
import type { TopicPageContent } from "@/app/lib/siteContent";

type LocationPageProps = {
  page: LocationPageContent;
  relatedPages: TopicPageContent[];
};

export default function LocationPage({ page, relatedPages }: LocationPageProps) {
  const { travel } = page;
  const travelModes = [
    { label: "By train", time: travel.trainTime, route: travel.trainRoute },
    { label: "By car", time: travel.drivingTime, route: travel.drivingRoute },
    ...(travel.flightTime && travel.flightRoute
      ? [{ label: "By air", time: travel.flightTime, route: travel.flightRoute }]
      : []),
  ];
  const otherCities = locationPageList
    .filter((entry) => page.relatedLocationSlugs.includes(entry.slug))
    .sort((a, b) => a.city.localeCompare(b.city));

  const structuredData = compactSchemaList([
    buildMedicalWebPageSchema({
      path: `/${page.slug}`,
      name: page.title,
      description: page.description,
    }),
    buildServiceSchema({
      path: `/${page.slug}`,
      name: `Hair transplant clinic selection and consultation for ${page.city} patients`,
      description: page.description,
      areaServed: page.city,
      serviceType: "Hair transplant clinic selection and consultation",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations" },
      { name: page.city, path: `/${page.slug}` },
    ]),
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
        <section className="hero-light relative overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-10">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Locations", path: "/locations" },
              { name: page.city, path: `/${page.slug}` },
            ]}
            className="relative z-10 mb-6"
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] text-[color:var(--ink-950)] sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-700)] sm:text-lg">
                {page.lead}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {page.heroChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[color:var(--line-soft)] bg-white/75 px-3.5 py-2 text-sm text-[color:var(--ink-700)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/assessment"
                  className="inline-flex rounded-full bg-[color:var(--ink-950)] px-5 py-3 text-sm font-semibold !text-white transition visited:!text-white hover:bg-[color:var(--sage-600)]"
                >
                  Book free consultation
                </Link>
                <Link
                  href="/our-clinical-standards"
                  className="inline-flex rounded-full border border-[color:var(--line-soft)] bg-white/60 px-5 py-3 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-white"
                >
                  Review clinical standards
                </Link>
              </div>
            </div>

            <aside className="grid gap-4">
              {page.cards.map((card, index) => (
                <article
                  key={`${page.slug}-${card.title}`}
                  className="rounded-[28px] border border-[color:var(--line-soft)] bg-white/75 p-5 shadow-[0_18px_40px_rgba(6,47,64,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForTopicCard(page.slug, card.title, index)}
                      tone="light"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-500)]">
                        Why it matters
                      </p>
                      <h2 className="mt-3 font-display text-2xl text-[color:var(--ink-950)]">
                        {card.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">{card.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </aside>
          </div>
        </section>

        <section className="surface-light rounded-[34px] p-6 text-[color:var(--ink-950)] sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
            Getting to London from {page.city}
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
            If London is on your shortlist, here is the realistic journey.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {travelModes.map((mode) => (
              <div
                key={mode.label}
                className="rounded-[24px] border border-[color:var(--line-soft)] bg-white/75 p-5"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-500)]">
                  {mode.label}
                </p>
                <p className="mt-3 font-display text-2xl text-[color:var(--ink-950)]">{mode.time}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--ink-700)]">{mode.route}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[24px] border border-[color:var(--line-soft)] bg-white/75 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-500)]">
              Same-day return?
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
              {page.travel.sameDayReturnNote}
            </p>
          </div>
          <p className="mt-6 text-sm leading-7 text-[color:var(--ink-700)]">
            Also covers patients travelling in from{" "}
            {page.travel.nearbyTowns.join(", ")}.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article
              key={`${page.slug}-${section.title}`}
              className="rounded-[30px] p-6 lg:p-7 border border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] text-[color:var(--ink-950)] shadow-[0_24px_56px_rgba(6,47,64,0.08)]"
            >
              <div className="flex items-start gap-4">
                <IconBadge
                  name={iconForTopicSection(page.slug, section.title, index)}
                  tone="light"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-500)]">
                    What to know
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)]">
                    {section.title}
                  </h2>
                </div>
              </div>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--ink-800)]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-5 space-y-3 border-t pt-5 text-sm leading-7 border-[rgba(8,58,79,0.1)] text-[color:var(--ink-800)]">
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

        <AssessmentSection
          sourceLabel={page.slug}
          tone="dark"
          title="Turn your research into a free consultation."
          intro="Share your main concern, timing, and location so the next conversation starts with clear detail rather than guesswork."
        />

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="surface-light rounded-[34px] p-6 text-[color:var(--ink-950)] sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
              Read next
            </p>
            <h2 className="mt-4 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              Read the next questions patients usually have.
            </h2>
            <div className="mt-8 grid gap-4">
              {relatedPages.map((relatedPage) => (
                <Link
                  key={`${page.slug}-related-${relatedPage.slug}`}
                  href={`/${relatedPage.slug}`}
                  className="rounded-[24px] border p-5 transition hover:-translate-y-0.5 border-[color:var(--line-soft)] bg-white/75 hover:border-[color:var(--line-strong)] hover:bg-white/75"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForHref(`/${relatedPage.slug}`)}
                      tone="light"
                    />
                    <div>
                      <p className="font-display text-2xl text-[color:var(--ink-950)]">
                        {relatedPage.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
                        {relatedPage.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="surface-light rounded-[34px] p-6 text-[color:var(--ink-950)] sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-500)]">
              Frequently asked questions
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              Direct answers to the questions patients usually ask next.
            </h2>
            <div className="mt-8 grid gap-4">
              {page.faq.map((item) => (
                <details
                  key={`${page.slug}-faq-${item.question}`}
                  className="rounded-[24px] p-5 border-[color:var(--line-soft)] bg-white/75"
                >
                  <summary className="cursor-pointer text-base font-semibold text-[color:var(--ink-950)]">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-[color:var(--ink-700)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </section>

        <section className="surface-light rounded-[34px] p-6 text-[color:var(--ink-950)] sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-500)]">
            Relevant city comparisons
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
            Compare nearby and well-connected UK cities.
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {otherCities.map((entry) => (
              <Link
                key={entry.slug}
                href={`/${entry.slug}`}
                className="rounded-full border border-[color:var(--line-soft)] bg-white/75 px-3.5 py-2 text-sm text-[color:var(--ink-700)] transition hover:border-[color:var(--line-strong)] hover:text-[color:var(--ink-950)]"
              >
                {entry.city}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
