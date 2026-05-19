import type { Metadata } from "next";
import Link from "next/link";
import SecondaryContactActions from "@/app/components/SecondaryContactActions";
import SiteShell from "@/app/components/SiteShell";
import ThankYouTracking from "@/app/components/ThankYouTracking";
import { buildMetadata } from "@/app/lib/seo";

type ThankYouPageProps = {
  searchParams: Promise<{ source?: string }>;
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Thank You | UK Hair Transplant",
    description:
      "Your free consultation request has been sent. Review the next steps, contact options, and what to prepare for a more useful follow-up.",
    path: "/thank-you",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { source } = await searchParams;

  return (
    <SiteShell>
      <ThankYouTracking source={source} />
      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero rounded-[40px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/82">
              Consultation request received
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Your request has been sent.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              The team now has your core details. If extra scalp photos or timing details
              would help, that can be requested in the next reply.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              What to do next
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Make the follow-up more useful.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/68">
              <li>Have clear scalp or facial hair photos ready in daylight if the team asks for them.</li>
              <li>Keep note of what matters most to you, whether that is subtlety, density, recovery time, or cost clarity.</li>
              <li>Review recovery and standards pages so your next conversation starts with better context.</li>
            </ul>
          </section>

          <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              Contact options
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Need to send something else now?
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              If you prefer to follow up immediately, use WhatsApp or call. These actions are
              also useful if you want to send photos after your form submission.
            </p>
            <SecondaryContactActions tone="dark" className="mt-6" />
          </section>
        </section>

        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Keep researching
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/our-clinical-standards"
              className="inline-flex rounded-full bg-[color:var(--ink-950)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--sage-500)]"
            >
              Review standards
            </Link>
            <Link
              href="/hair-transplant-recovery-timeline"
              className="inline-flex rounded-full border border-[color:var(--line-inverse-soft)] px-4 py-2.5 text-sm font-semibold text-white/84 transition hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
            >
              Recovery timeline
            </Link>
            <Link
              href="/hair-transplant-cost-london"
              className="inline-flex rounded-full border border-[color:var(--line-inverse-soft)] px-4 py-2.5 text-sm font-semibold text-white/84 transition hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
            >
              Cost guidance
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
