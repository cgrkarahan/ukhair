import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/app/components/SiteShell";
import { buildMetadata } from "@/app/lib/seo";
import { getServiceCatalogContent } from "@/sanity/lib/content";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Hair Transplant Treatments",
  description:
    "Explore male, female, eyebrow, beard, moustache, and hair loss treatment options with practical guidance on suitability, planning, recovery, and next steps.",
  path: "/services",
  keywords: [
    "hair transplant treatments london",
    "hair restoration treatments london",
    "male hair transplant london",
    "female hair transplant london",
    "hair loss treatments london",
  ],
});

export default async function ServicesIndexPage() {
  const services = await getServiceCatalogContent();

  return (
    <SiteShell>
      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              Treatments
            </p>
            <h1 className="mt-3 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
              Hair transplant and hair restoration treatment options.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              Explore the full treatment range, from scalp restoration to facial-hair
              work and non-surgical support. Each page focuses on suitability,
              planning, recovery, and what a stronger consultation should clarify
              before you move forward.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.slug}
                className="panel-dark flex h-full flex-col overflow-hidden rounded-[30px]"
              >
                <div className="relative aspect-[4/3] border-b border-[color:var(--line-inverse-soft)] bg-[rgba(192,213,214,0.12)]">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <span className="rounded-full bg-[rgba(192,213,214,0.12)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/72">
                      {service.badge}
                    </span>
                    <span className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-300)]/82">
                      London
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl text-white">
                    {service.title}
                  </h2>
                  <p className="mt-3 min-h-[7rem] text-sm leading-7 text-white/68 xl:min-h-[6.75rem]">
                    {service.shortDescription}
                  </p>
                  <div className="mt-5 rounded-[24px] border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.94),rgba(232,238,237,0.88))] p-4 shadow-[0_14px_36px_rgba(6,47,64,0.08)]">
                    <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--gold-500)]">
                      Best for
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">
                      {service.bestFor}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex rounded-full bg-[color:var(--ink-950)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--sage-500)]"
                    >
                      View treatment
                    </Link>
                    <Link
                      href={`/${service.relatedGuideSlugs[0]}`}
                      className="inline-flex rounded-full border border-[color:var(--line-inverse-soft)] px-4 py-2.5 text-sm font-semibold text-white/84 transition hover:border-[color:var(--line-inverse-strong)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
                    >
                      Related reading
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
