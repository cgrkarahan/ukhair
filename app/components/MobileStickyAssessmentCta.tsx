"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPhoneHref, getWhatsappHref } from "@/app/lib/contact";
import { TRACKING_EVENTS, pushTrackingEvent } from "@/app/lib/tracking";
const KEYBOARD_HEIGHT_THRESHOLD = 140;

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

  // Shown straight away, whether or not the cookie banner has been answered:
  // the bar sets no cookies, and it is the quickest way to get in touch on a phone.
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 block px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] transition duration-200 md:hidden ${
        isKeyboardOpen
          ? "translate-y-6 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      aria-hidden={isKeyboardOpen}
    >
      <nav
        aria-label="Contact"
        className="pointer-events-auto flex gap-2 rounded-full border border-[rgba(192,213,214,0.16)] bg-[color:var(--ink-950)]/95 p-1.5 shadow-[0_18px_44px_rgba(6,47,64,0.34)] backdrop-blur-xl"
      >
        {phoneHref ? (
          <a
            href={phoneHref}
            onClick={() => pushTrackingEvent(TRACKING_EVENTS.phoneClick)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-3 text-sm font-semibold text-white"
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
      </nav>
    </div>
  );
}
