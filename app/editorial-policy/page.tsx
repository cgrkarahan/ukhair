import type { Metadata } from "next";
import Link from "next/link";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { siteContact } from "@/app/lib/contact";
import { buildBreadcrumbSchema, compactSchemaList, organizationRef } from "@/app/lib/schema";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";

const description =
  "Who writes the content on UK Hair Transplant, our commercial interest in the routes we describe, how clinical review is shown, and how to report a correction.";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy | UK Hair Transplant",
  description,
  path: "/editorial-policy",
});

const principles = [
  {
    title: "Who writes our content",
    icon: "book-open" as const,
    body: `Content on this site is written and maintained by the ${siteName} team and published under the company name rather than individual bylines. We are not clinicians, and we do not present our content as medical advice.`,
  },
  {
    title: "Our commercial interest",
    icon: "wallet" as const,
    body: "We are not a neutral directory. We offer our own treatment routes, including the London and Turkiye options priced on this site, and we benefit when patients choose them. You should know that when you read our comparisons, and we try to state the trade-offs of our own routes as plainly as anyone else's.",
  },
  {
    title: "Clinical review",
    icon: "shield-check" as const,
    body: "Our pages are not currently reviewed by a named clinician. When a qualified, registered clinician reviews a page, that page will show their name, their registration, and the date of the review. We will not add a review claim we cannot back up.",
  },
  {
    title: "Prices and figures",
    icon: "clipboard-check" as const,
    body: "Prices shown for our own routes are our published prices at the time the page was last updated. Wider market figures, such as typical per-graft ranges, are indicative context and are labelled as such. Travel times on our city guides are approximate and vary by service and traffic.",
  },
  {
    title: "Patient images",
    icon: "sparkles" as const,
    body: "We only publish before-and-after images where the patient has given documented consent for their use on this site. We never present stock or AI-generated images as patient results.",
  },
  {
    title: "Not medical advice",
    icon: "message-dots" as const,
    body: "Our content is general information to help you prepare for a consultation and compare options. It is not a substitute for an assessment by a qualified clinician, who should confirm whether treatment is suitable for you.",
  },
];

export default function EditorialPolicyPage() {
  const structuredData = compactSchemaList([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Editorial policy",
      url: absoluteUrl("/editorial-policy"),
      description,
      publisher: organizationRef,
    },
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Editorial policy", path: "/editorial-policy" },
    ]),
  ]);

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`editorial-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero rounded-[40px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/82">
            Editorial policy
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            How we write and review our content
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
            {siteName} is a referral and guidance service, not a clinic. This page
            explains who writes our content, what we have a commercial interest in, and
            what we will and will not claim, so you can judge what you read here.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.title}
              className="rounded-[30px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6"
            >
              <div className="flex items-start gap-4">
                <IconBadge name={item.icon} tone="light" />
                <h2 className="font-display text-2xl text-[color:var(--ink-950)]">
                  {item.title}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)]">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="section-dark rounded-[36px] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Corrections
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Spotted something wrong or out of date?
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
            Email{" "}
            <a href={`mailto:${siteContact.email}`} className="font-semibold text-white">
              {siteContact.email}
            </a>{" "}
            and tell us which page and what you think needs changing. We will look into it
            and correct the page where we agree. You can also read{" "}
            <Link href="/how-we-work" className="font-semibold text-white">
              how we work
            </Link>{" "}
            and the{" "}
            <Link href="/our-clinical-standards" className="font-semibold text-white">
              clinical standards
            </Link>{" "}
            we use when selecting clinics.
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
