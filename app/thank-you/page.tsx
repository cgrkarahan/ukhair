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
              The team now has your core details. A follow-up will usually focus
              on your goals, likely suitability, photos if needed, and the
              clearest next route for your case.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              What happens next
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              The next reply should make the route clearer.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/68">
              <li>The team will review your submitted concern, treatment-location preference, and timing.</li>
              <li>If the information is enough, the follow-up can explain a suitable consultation pathway.</li>
              <li>If more context is needed, you may be asked for photos or extra details before a useful recommendation is made.</li>
            </ul>
          </section>

          <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              Useful preparation
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Good photos can make the first response more specific.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/68">
              <li>Use daylight or a bright room, without filters or heavy styling products.</li>
              <li>Prepare front hairline, temples, crown, donor area, and any specific area that worries you.</li>
              <li>Keep note of what matters most: subtlety, density, recovery time, London access, Turkey comparison, or cost clarity.</li>
            </ul>
          </section>
        </section>

        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
                Keep researching
              </p>
              <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
                Use the waiting time to check the standards behind the route.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/68">
                These pages explain how the mediation process works, what clinic
                standards should be checked, and how recovery or cost discussions
                should be framed.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/how-we-work"
                className="inline-flex rounded-full bg-[color:var(--gold-300)] px-4 py-2.5 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
              >
                How we work
              </Link>
              <Link
                href="/our-clinical-standards"
                className="inline-flex rounded-full border border-[color:var(--line-inverse-soft)] px-4 py-2.5 text-sm font-semibold text-white/84 transition hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
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
          </div>
        </section>

        <section className="rounded-[38px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
                Contact options
              </p>
              <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
                Need to send something else now?
              </h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)]">
                Use WhatsApp or phone if you want to add a note, send photos
                after submitting the form, or clarify your availability.
              </p>
            </div>
            <SecondaryContactActions tone="light" />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
