import type { Metadata } from "next";
import SiteShell from "@/app/components/SiteShell";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy | UK Hair Transplant",
  description:
    "Learn how UK Hair Transplant uses essential cookies, analytics consent, and marketing attribution cookies.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <SiteShell>
      <main
        id="main"
        className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 pb-28 pt-10 lg:px-8 lg:pt-14"
      >
        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Cookie Policy
          </p>
          <h1 className="mt-3 font-display text-4xl text-white">
            Essential and analytics cookies
          </h1>
          <div className="mt-6 space-y-6 text-sm leading-7 text-white/68 sm:text-base">
            <p>
              This site uses essential browser storage to preserve enquiry attribution and
              keep the assessment flow working properly.
            </p>
            <p>
              If you accept analytics cookies, the site can also load Google Tag Manager
              and related analytics or advertising measurement tags to understand which
              pages and campaigns lead to assessment requests.
            </p>
            <p>
              You can choose essential cookies only or accept analytics through the cookie
              banner shown on the site.
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
