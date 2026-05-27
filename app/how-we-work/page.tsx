import type { Metadata } from "next";
import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How We Work",
  description:
    "See how UK Hair Transplant Co guides patients, explains clinic selection criteria, supports consultation preparation, and helps compare selected clinic pathways.",
  path: "/how-we-work",
  keywords: [
    "hair transplant guidance",
    "hair transplant clinic selection",
    "hair transplant consultation support",
    "hair transplant london assessment",
  ],
});

const processSteps = [
  {
    title: "We start with education",
    body:
      "The first job is to help you understand suitability, donor-area limits, methods, recovery, pricing logic, and the questions that should be answered before treatment is considered.",
    icon: "book-open" as const,
  },
  {
    title: "We use selection criteria",
    body:
      "Clinic pathways are judged against practical criteria such as doctor involvement, regulated provider settings where applicable, consultation quality, donor planning, aftercare, and quote clarity.",
    icon: "shield-check" as const,
  },
  {
    title: "We prepare a better enquiry",
    body:
      "Your goals, timing, treatment-location preference, and useful photos help make the first response more specific than a generic price or graft estimate.",
    icon: "clipboard-check" as const,
  },
  {
    title: "We mediate the next step",
    body:
      "Where appropriate, we help connect you with a selected clinic pathway and explain what should be clarified before you commit to treatment.",
    icon: "route" as const,
  },
];

const selectionCriteria = [
  "clear explanation of who is medically responsible for planning and care",
  "GMC-registered doctors where UK treatment is discussed",
  "CQC-registered provider settings in England where that route is presented",
  "realistic donor-area, graft-range, and density planning",
  "aftercare structure that is explained before treatment day",
  "pricing that is linked to suitability, method, scope, and clinical planning",
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How We Work",
    url: absoluteUrl("/how-we-work"),
    description:
      "How UK Hair Transplant Co provides hair transplant guidance, clinic selection support, consultation preparation, and patient mediation.",
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
        name: "How We Work",
        item: absoluteUrl("/how-we-work"),
      },
    ],
  },
];

export default function HowWeWorkPage() {
  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`how-we-work-schema-${index}`}
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
              How we work
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Guidance first, then a clearer route into selected clinic pathways.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              UK Hair Transplant Co helps patients understand hair transplant
              options, compare clinic standards, prepare better consultation
              questions, and move into a selected pathway where the case appears
              suitable.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="inline-flex rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
              >
                Request assessment
              </Link>
              <Link
                href="/our-clinical-standards"
                className="inline-flex rounded-full border border-[rgba(192,213,214,0.18)] px-5 py-3 text-sm font-semibold text-white/86 transition hover:border-[rgba(192,213,214,0.3)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
              >
                Review standards
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.title}
              className="section-dark rounded-[34px] p-6 text-white"
            >
              <IconBadge name={step.icon} tone="dark" />
              <h2 className="mt-5 font-display text-2xl text-white">
                {step.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/68">{step.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-[36px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
              Selection criteria
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              What we look for before recommending a route.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--ink-700)] sm:text-base">
              {selectionCriteria.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <IconBadge name="shield-check" tone="light" size="sm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="section-dark rounded-[36px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              Pricing and mediation
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Partner pricing is useful only when the plan is clear.
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-white/68 sm:text-base">
              <p>
                We may help patients access partner clinic pricing where it is
                available, but price should still be linked to suitability, graft
                range, method, clinical planning, and aftercare.
              </p>
              <p>
                The aim is not to push a bargain route. It is to help you
                understand what is being offered, what should be checked, and
                whether the pathway fits your priorities before you commit.
              </p>
            </div>
          </section>
        </section>

        <section className="rounded-[36px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
            What to prepare
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
            Better information usually leads to a better first response.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Clear photos in daylight from the front, temples, crown, and donor area.",
              "Your priority: subtle framing, density, recovery time, cost clarity, or location.",
              "Whether you prefer the UK, are open to Turkey, or want to compare both routes.",
            ].map((item) => (
              <article
                key={item}
                className="rounded-[24px] border border-[color:var(--line-soft)] bg-white p-5 text-sm leading-7 text-[color:var(--ink-700)]"
              >
                {item}
              </article>
            ))}
          </div>
        </section>

        <AssessmentSection
          sourceLabel="how-we-work-page"
          tone="dark"
          title="Start with a clearer assessment request."
          intro="Send your concern, priorities, timing, and treatment-location preference so the first response can focus on your case rather than a generic quote."
        />
      </main>
    </SiteShell>
  );
}
