"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPhoneHref, getWhatsappHref } from "@/app/lib/contact";
import { TRACKING_EVENTS, pushTrackingEvent } from "@/app/lib/tracking";
const KEYBOARD_HEIGHT_THRESHOLD = 140;
const DISMISS_KEY = "ukhair_mobile_bar_dismissed";

function isEditableElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();

  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

export default function MobileStickyAssessmentCta() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  // Closed for the rest of the visit once the visitor taps the close button.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") {
        // Read after mount so the server and first client render match.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDismissed(true);
      }
    } catch {
      // Storage can be blocked; the bar then simply stays available.
    }
  }, []);

  // Slide the bar away while reading down the page, and bring it back on any
  // scroll up or near the top, so it never sits over the text being read.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    function handleScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (Math.abs(delta) < 8) return;
        setIsScrollingDown(delta > 0 && y > 240);
        lastY = y;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function dismiss() {
    setIsDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore: the bar is still hidden for this page view.
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let maxViewportHeight =
      window.visualViewport?.height ?? window.innerHeight;

    function hasFocusedEditableElement() {
      return isEditableElement(document.activeElement);
    }

    function syncKeyboardState() {
      const currentViewportHeight =
        window.visualViewport?.height ?? window.innerHeight;

      if (!hasFocusedEditableElement()) {
        maxViewportHeight = Math.max(maxViewportHeight, currentViewportHeight);
        setIsKeyboardOpen(false);
        return;
      }

      const heightDelta = maxViewportHeight - currentViewportHeight;
      setIsKeyboardOpen(heightDelta > KEYBOARD_HEIGHT_THRESHOLD);
    }

    function handleFocusIn(event: FocusEvent) {
      if (!isEditableElement(event.target)) {
        return;
      }

      syncKeyboardState();
    }

    function handleFocusOut() {
      window.requestAnimationFrame(syncKeyboardState);
    }

    function handleViewportResize() {
      syncKeyboardState();
    }

    const viewport = window.visualViewport;

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    viewport?.addEventListener("resize", handleViewportResize);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
      viewport?.removeEventListener("resize", handleViewportResize);
    };
  }, []);

  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsappHref(
    "I would like to request a free hair transplant consultation.",
  );

  if (isDismissed) {
    return null;
  }

  const hidden = isKeyboardOpen || isScrollingDown;

  // Shown straight away, whether or not the cookie banner has been answered:
  // the bar sets no cookies, and it is the quickest way to get in touch on a phone.
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 block px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] transition duration-200 md:hidden ${
        hidden
          ? "translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <nav
        aria-label="Contact"
        className="pointer-events-auto flex gap-2 rounded-full border border-[rgba(192,213,214,0.16)] bg-[color:var(--ink-950)]/95 p-1.5 shadow-[0_18px_44px_rgba(6,47,64,0.34)] backdrop-blur-xl"
      >
        {phoneHref ? (
          <a
            href={phoneHref}
            onClick={() => pushTrackingEvent(TRACKING_EVENTS.phoneClick)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-2 text-sm font-semibold text-white"
          >
            Call
          </a>
        ) : null}
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="nofollow noreferrer"
            onClick={() => pushTrackingEvent(TRACKING_EVENTS.whatsappClick)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#25D366] px-3 text-sm font-semibold text-[#082E25]"
          >
            WhatsApp
          </a>
        ) : null}
        <Link
          href="/assessment"
          className="inline-flex min-h-11 flex-[1.4] items-center justify-center whitespace-nowrap rounded-full bg-[color:var(--gold-300)] px-3 text-sm font-semibold !text-black visited:!text-black"
        >
          Free consultation
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close contact bar"
          className="inline-flex min-h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
