import type { Metadata } from "next";
import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import SiteShell from "@/app/components/SiteShell";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Consultation | UK Hair Transplant",
  description:
    "Book a free hair transplant consultation with clearer guidance on planning, standards, recovery, and next steps.",
  path: "/assessment",
  keywords: [
    "free hair transplant consultation london",
    "hair transplant consultation london",
    "free hair transplant consultation",
  ],
});

export default function AssessmentPage() {
  return (
    <SiteShell>
      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero rounded-[40px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/82">
              Free consultation
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Start with a free consultation.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              Use this form to share your main concern, any helpful location context, and
              what matters most to you. Photo requests can follow after submission so the
              first step stays quick, practical, and easy to start.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/our-clinical-standards"
                className="inline-flex rounded-full border border-[rgba(192,213,214,0.18)] px-5 py-3 text-sm font-semibold text-white/84 transition hover:border-[rgba(192,213,214,0.3)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
              >
                Review standards first
              </Link>
              <Link
                href="/hair-transplant-cost-london"
                className="inline-flex rounded-full border border-[rgba(192,213,214,0.18)] px-5 py-3 text-sm font-semibold text-white/84 transition hover:border-[rgba(192,213,214,0.3)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
              >
                See cost guidance
              </Link>
            </div>
          </div>
        </section>

        <AssessmentSection
          sourceLabel="assessment-page"
          tone="dark"
          title="Book your free consultation."
          intro="This is the main route for a first enquiry. Once your request is submitted, the team can reply with the next useful questions, photo guidance, or a consultation recommendation."
        />
      </main>
    </SiteShell>
  );
}
