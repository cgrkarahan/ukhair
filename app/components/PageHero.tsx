import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs, { type BreadcrumbItem } from "@/app/components/Breadcrumbs";

type HeroLink = { href: string; label: string };

type PageHeroProps = {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  chips?: string[];
  primaryCta?: HeroLink | null;
  secondaryCta?: HeroLink | null;
  /** One short line under the buttons, e.g. "Fixed price from £2,750". */
  priceLine?: ReactNode;
  /** Page-specific visual shown beside the text on wide screens, below it on phones. */
  visual?: ReactNode;
  /** Extra content under the buttons (meta line, author, etc). */
  footer?: ReactNode;
  titleSize?: "lg" | "md";
};

/**
 * Light page header used across inner pages. It always leads with the
 * headline, so a visitor sees which page they are on before anything else.
 * Dark teal stays reserved for the homepage hero and the consultation form.
 */
export default function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  chips,
  primaryCta = { href: "/assessment", label: "Book free consultation" },
  secondaryCta,
  priceLine,
  visual,
  footer,
  titleSize = "lg",
}: PageHeroProps) {
  return (
    <section className="hero-light overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-10">
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} className="mb-6" /> : null}
      <div
        className={`grid gap-8 ${
          visual ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center" : ""
        }`}
      >
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={`mt-3 max-w-4xl text-balance font-display leading-[1.08] text-[color:var(--ink-950)] ${
              titleSize === "lg"
                ? "text-[2.1rem] sm:text-5xl lg:text-[3.4rem]"
                : "text-[1.9rem] sm:text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </h1>
          {lead ? (
            <div className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-700)] sm:text-lg">
              {lead}
            </div>
          ) : null}
          {chips?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[color:var(--line-soft)] bg-white/70 px-3 py-1.5 text-sm text-[color:var(--ink-800)]"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex whitespace-nowrap rounded-full bg-[color:var(--ink-950)] px-5 py-3 text-sm font-semibold !text-white transition visited:!text-white hover:bg-[color:var(--sage-600)]"
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex whitespace-nowrap rounded-full border border-[color:var(--line-strong)] bg-white/60 px-5 py-3 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-white"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
          {priceLine ? (
            <p className="mt-4 text-sm leading-6 text-[color:var(--ink-700)]">{priceLine}</p>
          ) : null}
          {footer}
        </div>
        {visual ? <div className="min-w-0">{visual}</div> : null}
      </div>
    </section>
  );
}
