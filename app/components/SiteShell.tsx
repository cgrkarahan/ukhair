import type { ReactNode } from "react";
import Link from "next/link";
import BrandLogo from "@/app/components/BrandLogo";
import MobileHeaderNav from "@/app/components/MobileHeaderNav";
import MobileStickyAssessmentCta from "@/app/components/MobileStickyAssessmentCta";
import SecondaryContactActions from "@/app/components/SecondaryContactActions";
import SiteIcon, { IconBadge } from "@/app/components/SiteIcon";
import { normalizeWhatsappNumber, siteSocialLinks } from "@/app/lib/contact";
import { iconForFooterGroup, iconForHref } from "@/app/lib/iconography";
import {
  footerLinkGroups,
  primaryNavigation,
  topicPages,
} from "@/app/lib/siteContent";
import { getSiteSettingsContent } from "@/sanity/lib/content";

type SiteShellProps = {
  children: ReactNode;
};

function labelForHref(href: string) {
  if (href === "/") return "Home";
  if (href === "/blog") return "Articles";
  if (href.startsWith("/services/")) {
    return href
      .replace("/services/", "")
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  const slug = href.replace(/^\//, "");
  return topicPages[slug]?.title ?? href;
}

export default async function SiteShell({ children }: SiteShellProps) {
  const settings = await getSiteSettingsContent();
  const whatsappNumber = normalizeWhatsappNumber(settings.whatsappNumber);
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "I would like to request a free hair transplant consultation.",
      )}`
    : null;

  return (
    <div className="min-h-screen overflow-x-clip bg-[color:var(--surface-canvas)] text-[color:var(--ink-950)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[color:var(--ink-950)] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[rgba(192,213,214,0.12)] bg-[color:var(--ink-950)]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <div className="xl:hidden">
            <BrandLogo tone="dark" compact />
          </div>
          <div className="hidden xl:block">
            <BrandLogo tone="dark" />
          </div>

          <nav className="hidden items-center gap-8 text-base text-white/84 xl:flex">
            {primaryNavigation.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="relative inline-flex items-center gap-3 font-medium transition hover:text-white"
                >
                  <SiteIcon
                    name={iconForHref(item.href)}
                    size={20}
                    className="text-[color:var(--gold-300)]/92"
                  />
                  {item.label}
                  {item.items ? (
                    <span className="text-xs text-white/44 transition group-hover:text-white/72">
                      ▾
                    </span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-[color:var(--gold-300)] opacity-0 shadow-[0_0_18px_rgba(165,141,102,0.6)] transition duration-200 group-hover:scale-x-100 group-hover:opacity-100 group-focus-within:scale-x-100 group-focus-within:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[-10px] inset-y-[-8px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(165,141,102,0.16),transparent_68%)] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                  />
                </Link>

                {item.items ? (
                  <div
                    className={`absolute top-full z-50 hidden pt-4 group-hover:block group-focus-within:block ${
                      item.label === "Guides"
                        ? "right-0"
                        : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <div className="w-[min(44rem,calc(100vw-2.5rem))] rounded-[30px] border border-[rgba(192,213,214,0.22)] bg-[linear-gradient(180deg,rgba(8,58,79,0.99),rgba(7,43,58,0.99))] p-5 shadow-[0_32px_90px_rgba(3,26,37,0.58)] backdrop-blur-xl">
                      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
                        <div className="rounded-[24px] border border-[rgba(192,213,214,0.18)] bg-[linear-gradient(180deg,rgba(64,126,140,0.26),rgba(8,58,79,0.16))] p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                            {item.label}
                          </p>
                          <h3 className="mt-3 font-display text-3xl text-white">
                            {item.label === "Treatments"
                              ? "Choose the treatment route that fits your concern."
                              : "Research the questions that matter before you enquire."}
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-white/60">
                            {item.description}
                          </p>
                        </div>

                        <div className="grid gap-2.5 lg:grid-cols-2">
                          {item.items.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="rounded-[20px] border border-[rgba(192,213,214,0.08)] bg-[rgba(192,213,214,0.04)] px-4 py-4 transition hover:border-[rgba(192,213,214,0.18)] hover:bg-[rgba(192,213,214,0.1)]"
                            >
                              <div className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex items-center justify-center rounded-full bg-[rgba(192,213,214,0.1)] p-2.5 text-[color:var(--gold-300)]">
                                  <SiteIcon name={iconForHref(child.href)} size={17} />
                                </span>
                                <div>
                                  <p className="text-base font-semibold text-white">
                                    {child.label}
                                  </p>
                                  <p className="mt-1 text-sm leading-6 text-white/62">
                                    {child.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-[#082E25] shadow-[0_18px_40px_rgba(37,211,102,0.24)] transition hover:bg-[#1fc15c] md:inline-flex"
              >
                WhatsApp
              </a>
            ) : null}
            <Link
              href="/assessment"
              className="inline-flex rounded-full bg-[color:var(--gold-400)] px-4 py-2.5 text-sm font-semibold text-[color:var(--ink-950)] shadow-[0_18px_40px_rgba(165,141,102,0.24)] transition hover:bg-[color:var(--gold-300)]"
            >
              Free consultation
            </Link>
          </div>

          <MobileHeaderNav />
        </div>
      </header>

      {children}

      <footer className="relative overflow-hidden border-t border-[rgba(192,213,214,0.1)] bg-[color:var(--ink-950)] pt-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(64,126,140,0.36),transparent_44%),radial-gradient(circle_at_90%_20%,rgba(165,141,102,0.18),transparent_24%),radial-gradient(circle_at_50%_120%,rgba(192,213,214,0.14),transparent_34%)]" />
        <div className="relative mx-auto grid w-full max-w-[90rem] gap-10 px-5 pb-24 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/78">
              {settings.brandName}
            </p>
            <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
              Premium London care, explained with clarity.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
              Explore treatment information shaped by regulated standards, careful
              planning, and practical answers before you decide what comes next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="inline-flex rounded-full bg-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-[color:var(--gold-300)]"
              >
                Book free consultation
              </Link>
              <Link
                href="/hair-transplant-london"
                className="inline-flex rounded-full border border-[rgba(192,213,214,0.16)] px-5 py-3 text-sm font-semibold text-white/86 transition hover:border-[rgba(192,213,214,0.3)] hover:bg-[rgba(192,213,214,0.08)] hover:text-white"
              >
                Explore London treatment
              </Link>
            </div>
            <SecondaryContactActions tone="dark" className="mt-4" />
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/74">
                Follow UK Hair Transplant
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {siteSocialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.05)] px-3.5 py-2 text-sm text-white/76 transition hover:border-[rgba(192,213,214,0.28)] hover:bg-[rgba(192,213,214,0.1)] hover:text-white"
                  >
                    <span className="font-semibold text-[color:var(--gold-300)]">
                      {social.platform}
                    </span>
                    <span className="text-white/56">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerLinkGroups.map((group) => (
              <section
                key={group.title}
                className="rounded-[28px] border border-[rgba(192,213,214,0.12)] bg-[rgba(192,213,214,0.05)] p-5"
              >
                <div className="flex items-center gap-3">
                  <IconBadge
                    name={iconForFooterGroup(group.title)}
                    tone="dark"
                    size="sm"
                  />
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                    {group.title}
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  {group.links.map((href) => (
                    <Link
                      key={href}
                      href={href}
                      className="inline-flex items-center gap-2 text-sm leading-6 text-white/68 transition hover:text-white"
                    >
                      <SiteIcon
                        name={iconForHref(href)}
                        size={15}
                        className="text-[color:var(--gold-300)]/76"
                      />
                      {labelForHref(href)}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[90rem] flex-col gap-4 border-t border-[rgba(192,213,214,0.08)] px-5 py-6 text-sm text-white/48 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/cookies" className="transition hover:text-white">
              Cookies
            </Link>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>www.ukhairtransplant.co</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <p>{settings.email}</p>
              <a
                href={siteSocialLinks[1].href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Instagram
              </a>
              <a
                href={siteSocialLinks[0].href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                TikTok
              </a>
              <a
                href={siteSocialLinks[2].href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>

      <MobileStickyAssessmentCta />
    </div>
  );
}
