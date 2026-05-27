import type { Metadata } from "next";
import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";

const aboutDescription =
  "Learn who UK Hair Transplant is for, why the site exists, what standards it prioritises, and what patients can expect from a free consultation.";

export const metadata: Metadata = buildMetadata({
  title: "About | UK Hair Transplant",
  description: aboutDescription,
  path: "/about",
  keywords: [
    "about uk hair transplant",
    "hair transplant london guidance",
    "hair transplant clinic standards",
    "free hair transplant consultation london",
  ],
});

const trustCards = [
  {
    title: "London-first guidance",
    body:
      "The site is built for patients who want to understand the London route properly before they commit. That includes consultation access, standards, aftercare, recovery, and the practical questions that affect confidence.",
  },
  {
    title: "Standards before sales language",
    body:
      "The trust framework is built around criteria patients can actually judge, including GMC-registered doctors, CQC-registered provider settings in England, realistic planning, and clearer aftercare structure.",
  },
  {
    title: "Free consultation, handled seriously",
    body:
      "A free consultation should still help you judge suitability, priorities, likely next steps, and what extra details would make the discussion more useful for your case.",
  },
];

const standardsList = [
  "clear explanation of who is medically responsible for the treatment plan",
  "GMC-registered doctors where treatment is being discussed in a UK clinical setting",
  "CQC-registered provider settings in England where that route is being presented",
  "realistic planning around donor area, density, framing, and long-term expectations",
  "aftercare and recovery information that is specific enough to judge before treatment",
];

const nextStepCards = [
  {
    title: "Start with your concern",
    text:
      "The best first conversation begins with your pattern of loss, goals, timing, and whether you want to stay in the UK or also compare Turkey.",
  },
  {
    title: "Use the research properly",
    text:
      "The site is designed to help you compare cost, standards, suitability, and recovery with a calmer structure than generic clinic-comparison pages.",
  },
  {
    title: "Move into a free consultation",
    text:
      "Once the basics are clearer, the next step is a free consultation request so your case can be reviewed more specifically.",
  },
];

const companyDetails = [
  { label: "Legal company name", value: "UK HAIR TRANSPLANT LTD" },
  { label: "Company number", value: "17164087" },
  { label: "Company status", value: "Active" },
  { label: "Company type", value: "Private Limited Company" },
  { label: "Incorporated", value: "17 April 2026" },
  {
    label: "Registered office",
    value: "293 Northfield Avenue, London, England, W5 4XB",
  },
];

export default function AboutPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About UK Hair Transplant",
      url: absoluteUrl("/about"),
      description: aboutDescription,
      mainEntity: {
        "@type": ["Organization", "LocalBusiness", "MedicalBusiness"],
        name: siteName,
        legalName: "UK HAIR TRANSPLANT LTD",
        url: absoluteUrl("/"),
        identifier: "17164087",
        address: {
          "@type": "PostalAddress",
          streetAddress: "293 Northfield Avenue",
          addressLocality: "London",
          postalCode: "W5 4XB",
          addressCountry: "GB",
        },
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
          name: "About",
          item: absoluteUrl("/about"),
        },
      ],
    },
  ];

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`about-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero rounded-[40px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/82">
              About UK Hair Transplant
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              A calmer place to assess hair transplant treatment in London.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              UK Hair Transplant is for patients who want clearer answers
              before booking treatment. The site focuses on London guidance,
              clinic standards, recovery, pricing logic, and suitability so the
              decision feels more grounded from the start.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="inline-flex rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
              >
                Book free consultation
              </Link>
              <Link
                href="/our-clinical-standards"
                className="inline-flex rounded-full border border-[rgba(192,213,214,0.18)] px-5 py-3 text-sm font-semibold text-white/86 transition hover:border-[rgba(192,213,214,0.3)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
              >
                View clinical standards
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {trustCards.map((item) => (
            <article
              key={item.title}
              className="section-dark rounded-[34px] p-6 text-white sm:p-8"
            >
              <h2 className="font-display text-3xl text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/68">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
          <section className="section-dark rounded-[36px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              Why this site exists
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              The decision usually needs more than a clinic gallery and a quote.
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-white/68 sm:text-base">
              <p>
                Most patients do not only want to know whether treatment is
                possible. They want to know whether it may suit them, how London
                compares with other routes, what standards actually matter, and
                what recovery may look like afterwards.
              </p>
              <p>
                That is why the site is structured around decision support rather
                than generic comparison language. The aim is to help patients ask
                better questions before they move into a consultation.
              </p>
              <p>
                The public positioning stays London-first because local access,
                regulated environments, and easier follow-up matter to many
                patients. At the same time, wider comparison questions can still
                be handled more calmly where they are relevant.
              </p>
            </div>
          </section>

          <section className="rounded-[36px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
              What we prioritise
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              Standards patients should be able to judge clearly.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--ink-700)] sm:text-base">
              {standardsList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <IconBadge name="shield-check" tone="light" size="sm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <section className="rounded-[36px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
                Company information
              </p>
              <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
                The legal company behind this website.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)] sm:text-base">
                UK Hair Transplant is operated by UK HAIR TRANSPLANT LTD. The
                public company record is listed on Companies House, and the core
                details are shown here for transparency.
              </p>
            </div>
            <a
              href="https://find-and-update.company-information.service.gov.uk/company/17164087"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-[color:var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--ink-950)] transition hover:border-[color:var(--gold-500)] hover:bg-[color:var(--surface-paper)]"
            >
              View Companies House record
            </a>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {companyDetails.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-[color:var(--line-soft)] bg-white p-5"
              >
                <dt className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold-500)]">
                  {item.label}
                </dt>
                <dd className="mt-3 text-sm leading-7 text-[color:var(--ink-950)] sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              How patients usually use the site
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Research first, then a more useful free consultation.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              The site works best when patients use it to clarify their route
              before sending an enquiry. That usually leads to better questions,
              a better first discussion, and less confusion around pricing,
              recovery, or suitability.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {nextStepCards.map((card, index) => (
              <article
                key={card.title}
                className="panel-dark rounded-[28px] p-6"
              >
                <div className="flex items-start gap-4">
                  <IconBadge
                    name={
                      index === 0
                        ? "clipboard-check"
                        : index === 1
                          ? "book-open"
                          : "calendar-check"
                    }
                    tone="dark"
                  />
                  <div>
                    <h3 className="font-display text-2xl text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/68">
                      {card.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[36px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
            Common questions
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
            What this page does and does not promise.
          </h2>
          <div className="mt-6 grid gap-4">
            {[
              {
                question: "Does this page mean every patient is suitable?",
                answer:
                  "No. Suitability still depends on the case, donor area, hair-loss pattern, goals, and the wider treatment plan. That should be assessed properly rather than assumed.",
              },
              {
                question: "Does the site replace a consultation?",
                answer:
                  "No. The site is there to improve the quality of the decision before consultation, not to replace case-specific assessment.",
              },
              {
                question: "Why focus so much on standards?",
                answer:
                  "Because many patients feel more confident when they understand who is responsible for care, what environment treatment is delivered in, and how aftercare and recovery are handled.",
              },
            ].map((item) => (
              <details
                key={item.question}
                className="rounded-[24px] border border-[color:var(--line-soft)] bg-white px-5 py-4"
              >
                <summary className="cursor-pointer text-base font-semibold text-[color:var(--ink-950)]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <AssessmentSection
          sourceLabel="about-page"
          tone="dark"
          title="Book your free consultation."
          intro="If you want to move from reading into a case-specific discussion, send your concern, priorities, timing, and whether you want a London-only route or a wider comparison."
        />
      </main>
    </SiteShell>
  );
}
