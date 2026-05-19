import type { Metadata } from "next";
import SiteShell from "@/app/components/SiteShell";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | UK Hair Transplant",
  description:
    "Read how UK Hair Transplant handles assessment requests, contact details, analytics, and marketing attribution data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <SiteShell>
      <main
        id="main"
        className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 pb-28 pt-10 lg:px-8 lg:pt-14"
      >
        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Privacy Policy
          </p>
          <h1 className="mt-3 font-display text-4xl text-white">
            Privacy and assessment data
          </h1>
          <div className="mt-6 space-y-6 text-sm leading-7 text-white/68 sm:text-base">
            <p>
              When you submit an assessment request, we collect the information you enter
              in the form so the team can respond about your enquiry. This may include your
              contact details, your main concern, location if you choose to provide it,
              and any message you provide.
            </p>
            <p>
              We also collect marketing attribution data such as landing page, referrer,
              UTM parameters, and advertising click identifiers so we can understand which
              marketing activity led to the enquiry.
            </p>
            <p>
              Assessment requests are processed through our site and delivered to the team
              by email. We use analytics and advertising measurement tools only where you
              give consent through the cookie banner.
            </p>
            <p>
              If you want your details updated or removed, contact the team using the
              contact details shown on this site.
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
