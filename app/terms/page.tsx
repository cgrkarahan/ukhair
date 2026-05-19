import type { Metadata } from "next";
import SiteShell from "@/app/components/SiteShell";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms | UK Hair Transplant",
  description:
    "Read the site terms for UK Hair Transplant, including guidance-only positioning, content use, and contact terms.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteShell>
      <main
        id="main"
        className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 pb-28 pt-10 lg:px-8 lg:pt-14"
      >
        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Terms
          </p>
          <h1 className="mt-3 font-display text-4xl text-white">
            Website terms
          </h1>
          <div className="mt-6 space-y-6 text-sm leading-7 text-white/68 sm:text-base">
            <p>
              UK Hair Transplant provides guidance content and an enquiry route designed
              to help prospective patients understand treatment pathways more clearly.
            </p>
            <p>
              Content on this site is for informational purposes and should not be treated
              as a personal medical diagnosis or a guarantee of suitability, pricing, or
              outcome.
            </p>
            <p>
              By using this site or submitting an assessment request, you agree to use the
              content lawfully and understand that any treatment decision should be based on
              a direct clinical assessment.
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
