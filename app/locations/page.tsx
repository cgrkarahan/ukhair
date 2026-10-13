import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/app/components/SiteShell";
import { locationPageList } from "@/app/lib/locations";
import { buildBreadcrumbSchema } from "@/app/lib/schema";
import { buildMetadata } from "@/app/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "UK Hair Transplant City Guides",
  description:
    "Explore practical hair transplant guides for 25 UK cities, grouped by region, with local market, London travel, clinic checks, and aftercare considerations.",
  path: "/locations",
  keywords: [
    "hair transplant UK cities",
    "hair transplant city guides",
    "hair transplant near me UK",
    "hair transplant travel to London",
  ],
});

const regionGroups = [
  {
    name: "Scotland and the North East",
    description: "Compare Scottish providers, North East options, and travel routes to London.",
    cities: ["Edinburgh", "Glasgow", "Newcastle"],
  },
  {
    name: "North West and Yorkshire",
    description: "Guides for the main northern markets and their nearby regional alternatives.",
    cities: ["Manchester", "Liverpool", "Leeds", "Sheffield", "Bradford", "York"],
  },
  {
    name: "Midlands",
    description: "Compare local, regional, and London routes from the East and West Midlands.",
    cities: ["Birmingham", "Coventry", "Leicester", "Nottingham", "Derby"],
  },
  {
    name: "South and East",
    description: "City guides covering the South Coast, Thames Valley, and eastern England.",
    cities: ["Southampton", "Portsmouth", "Brighton", "Reading", "Oxford", "Cambridge"],
  },
  {
    name: "South West and Wales",
    description: "Practical comparisons across the South West and the main South Wales markets.",
    cities: ["Bristol", "Bath", "Exeter", "Cardiff", "Swansea"],
  },
] as const;

const pageByCity = new Map(locationPageList.map((page) => [page.city, page]));

export default function LocationsPage() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "UK city guides", path: "/locations" },
  ]);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-5 pb-28 pt-10 lg:gap-12 lg:px-8 lg:pt-14"
      >
        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              UK city guides
            </p>
            <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl lg:text-6xl">
              Find the hair transplant guide for your city.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
              Start with your nearest city to understand the realistic local market,
              travel to London, treatment-day planning, and the checks worth making
              before you compare providers.
            </p>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {regionGroups.map((region) => {
            const pages = region.cities
              .map((city) => pageByCity.get(city))
              .filter((page) => page !== undefined);

            return (
              <article
                key={region.name}
                className="rounded-[32px] border border-[color:var(--line-soft)] bg-white/86 p-6 shadow-[0_20px_55px_rgba(6,47,64,0.08)] sm:p-8"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-500)]">
                  Region
                </p>
                <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)]">
                  {region.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
                  {region.description}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className="group flex min-h-14 items-center justify-between rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-canvas)] px-4 py-3 text-sm font-semibold text-[color:var(--ink-800)] transition hover:border-[color:var(--sage-400)] hover:bg-white hover:text-[color:var(--ink-950)]"
                    >
                      <span>{page.city}</span>
                      <span
                        aria-hidden="true"
                        className="text-[color:var(--gold-500)] transition group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/76">
                London treatment
              </p>
              <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
                Comparing your city with London?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/68 sm:text-base">
                Use the main London guide for treatment planning, standards, costs,
                and the questions to ask before arranging a consultation.
              </p>
            </div>
            <Link
              href="/hair-transplant-london"
              className="inline-flex w-fit rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[color:var(--gold-400)]"
            >
              Explore the London guide
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
