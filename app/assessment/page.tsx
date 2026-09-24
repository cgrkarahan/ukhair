import type { Metadata } from "next";
import AssessmentSection from "@/app/components/AssessmentSection";
import SiteShell from "@/app/components/SiteShell";
import { siteContact } from "@/app/lib/contact";
import { buildMetadata } from "@/app/lib/seo";
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildContactPointSchema,
  buildFaqSchema,
  compactSchemaList,
} from "@/app/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Free Consultation | UK Hair Transplant",
  description:
    "Book a free hair transplant consultation with clearer guidance on planning, standards, recovery, and next steps. Two quick questions, then your details, under 60 seconds.",
  path: "/assessment",
  keywords: [
    "free hair transplant consultation london",
    "hair transplant consultation london",
    "free hair transplant consultation",
  ],
});

const assessmentFaq = [
  {
    question: "What happens after I submit the form?",
    answer:
      "The team reviews your concern, timing, and any location details you share, then replies with the most useful next step: that may be a consultation recommendation, a request for a few more details, or guidance on what to expect. You are not booked into anything automatically.",
  },
  {
    question: "How fast will I hear back?",
    answer:
      "We reply the same working day for requests submitted Monday to Friday. Requests sent at the weekend are answered on the next working day.",
  },
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. Submitting this form and the first reply you get back cost nothing and do not commit you to booking treatment. You decide whether to move forward after you have the information you need.",
  },
  {
    question: "Who sees the photos I upload?",
    answer:
      "Photos are emailed directly and privately to our clinical team's inbox as part of your enquiry. They are not published, not added to any public gallery, and are seen only by the team reviewing your case.",
  },
];

export default function AssessmentPage() {
  const structuredData = compactSchemaList([
    buildContactPageSchema({
      path: "/assessment",
      name: "Free Hair Transplant Consultation",
      description:
        "Request a free hair transplant consultation. Share your concern and timing so the team can reply with the most useful next step.",
    }),
    buildContactPointSchema({
      telephone: siteContact.phoneNumber,
      email: siteContact.email,
      contactType: "customer service",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Free Consultation", path: "/assessment" },
    ]),
    buildFaqSchema(assessmentFaq),
  ]);

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`assessment-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <AssessmentSection
          sourceLabel="assessment-page"
          tone="dark"
          title="Book your free consultation in under 60 seconds."
          intro="Two quick questions, then your details. Once your request is submitted, the team replies the same working day with the next useful questions, photo guidance, or a consultation recommendation."
          formFirst
          titleAs="h1"
        />

        <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/76">
            Before you submit
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Direct answers to the questions people ask before enquiring.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {assessmentFaq.map((item) => (
              <details
                key={item.question}
                className="panel-dark rounded-[24px] border p-5"
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
      </main>
    </SiteShell>
  );
}
