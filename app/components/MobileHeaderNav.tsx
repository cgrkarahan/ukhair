"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SecondaryContactActions from "@/app/components/SecondaryContactActions";
import SiteIcon, { IconBadge } from "@/app/components/SiteIcon";
import { iconForHref } from "@/app/lib/iconography";
import { primaryNavigation } from "@/app/lib/siteContent";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isActiveLink(pathname: string, href: string) {
  const [path] = href.split("#");
  return (path || "/") === pathname;
}

function focusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("disabled"),
  );
}

function primaryLinks(pathname: string) {
  return primaryNavigation.filter((item) => !item.items).map((item) => ({
    ...item,
    active: isActiveLink(pathname, item.href),
  }));
}

function groupedLinks(pathname: string, label: "Treatments" | "Guides") {
  const group = primaryNavigation.find((item) => item.label === label);

  if (!group?.items) {
    return [];
  }

  return group.items.map((item) => ({
    ...item,
    active: isActiveLink(pathname, item.href),
  }));
}

function MobileSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: Array<{
    href: string;
    label: string;
    description: string;
    active?: boolean;
  }>;
  onNavigate: () => void;
}) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
        {title}
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              onClick={onNavigate}
              className={`flex min-h-14 items-start gap-3 rounded-[20px] border px-4 py-3.5 transition ${
                item.active
                  ? "border-[rgba(165,141,102,0.42)] bg-[rgba(165,141,102,0.12)] text-white shadow-[0_16px_38px_rgba(3,26,37,0.18)]"
                  : "border-[rgba(192,213,214,0.12)] bg-[rgba(192,213,214,0.05)] text-white/82 hover:border-[rgba(192,213,214,0.24)] hover:bg-[rgba(192,213,214,0.1)] hover:text-white"
              }`}
            >
              <IconBadge
                name={iconForHref(item.href)}
                tone="dark"
                size="sm"
                className={
                  item.active
                    ? "border-[rgba(165,141,102,0.34)] bg-[rgba(165,141,102,0.16)]"
                    : ""
                }
              />
              <span className="min-w-0 text-base font-semibold text-white">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MobileHeaderNav() {
  const pathname = usePathname();
  const panelId = useId();
  const headingId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldRestoreFocus = useRef(false);

  const directItems = primaryLinks(pathname);
  const treatmentItems = groupedLinks(pathname, "Treatments");
  const guideItems = groupedLinks(pathname, "Guides");

  function openMenu() {
    shouldRestoreFocus.current = true;
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      if (shouldRestoreFocus.current) {
        triggerRef.current?.focus();
        shouldRestoreFocus.current = false;
      }
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      focusableElements(panelRef.current)[0]?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = focusableElements(panelRef.current);

      if (!elements.length) {
        event.preventDefault();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label="Open main menu"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[rgba(192,213,214,0.18)] bg-[rgba(192,213,214,0.06)] text-white transition hover:border-[rgba(192,213,214,0.28)] hover:bg-[rgba(192,213,214,0.12)]"
        onClick={openMenu}
      >
        <SiteIcon name="menu" size={21} className="text-[color:var(--gold-300)]" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[70]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[rgba(3,26,37,0.74)] backdrop-blur-sm"
            onClick={closeMenu}
          />

          <div
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            className="absolute inset-0 flex h-[100dvh] flex-col bg-[color:var(--ink-950)] px-4 pb-0 pt-4 shadow-[0_28px_90px_rgba(3,26,37,0.52)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[rgba(192,213,214,0.1)] pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-[color:var(--gold-300)]/72">
                  Premium London Hair Transplant
                </p>
                <p id={headingId} className="mt-1 font-display text-xl text-white">
                  Menu
                </p>
              </div>

              <button
                type="button"
                aria-label="Close main menu"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[rgba(192,213,214,0.18)] bg-[rgba(192,213,214,0.06)] text-white transition hover:border-[rgba(192,213,214,0.28)] hover:bg-[rgba(192,213,214,0.12)]"
                onClick={closeMenu}
              >
                <SiteIcon name="x" size={20} className="text-[color:var(--gold-300)]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain pb-6 pt-5">
              <div className="space-y-6">
                <MobileSection
                  title="Main pages"
                  items={directItems}
                  onNavigate={closeMenu}
                />
                <MobileSection
                  title="Treatments"
                  items={treatmentItems}
                  onNavigate={closeMenu}
                />
                <MobileSection
                  title="Guides"
                  items={guideItems}
                  onNavigate={closeMenu}
                />
              </div>
            </div>

            <div className="border-t border-[rgba(192,213,214,0.1)] bg-[color:var(--ink-950)] pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
              <Link
                href="/assessment"
                onClick={closeMenu}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
              >
                Book free consultation
              </Link>
              <SecondaryContactActions
                tone="dark"
                className="mt-3 [&>a]:min-h-11 [&>a]:basis-0 [&>a]:flex-1"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
