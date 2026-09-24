import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import {
  iconForHref,
  iconForTopicCard,
  iconForTopicSection,
} from "@/app/lib/iconography";
import type { LocationPageContent } from "@/app/lib/locations";
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
      { name: page.title, path: `/${page.slug}` },
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
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero relative overflow-hidden rounded-[36px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
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

        <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/76">
            Getting to London from {page.city}
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            If London is on your shortlist, here is the realistic journey.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[24px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                By train
              </p>
              <p className="mt-3 font-display text-2xl text-white">
                {page.travel.trainTime}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/64">
                {page.travel.departureStation} to {page.travel.londonTerminus}
              </p>
            </div>
            <div className="rounded-[24px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                By car
              </p>
              <p className="mt-3 font-display text-2xl text-white">
                {page.travel.drivingTime}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/64">
                Outside peak traffic
              </p>
            </div>
            <div className="rounded-[24px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                Same-day return?
              </p>
              <p className="mt-3 text-sm leading-7 text-white/72">
                {page.travel.sameDayReturnNote}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-white/60">
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
                  className="rounded-[24px] border p-5 transition hover:-translate-y-0.5 panel-dark hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.12)]"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForHref(`/${relatedPage.slug}`)}
                      tone="dark"
                    />
                    <div>
                      <p className="font-display text-2xl text-white">
                        {relatedPage.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/68">
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
                  className="rounded-[24px] border p-5 panel-dark"
                >
                  <summary className="cursor-pointer text-base font-semibold text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-white/68">
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
