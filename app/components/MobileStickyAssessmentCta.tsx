"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SecondaryContactActions from "@/app/components/SecondaryContactActions";
import { CONSENT_EVENT_NAME, getConsentState } from "@/app/lib/tracking";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-6WMF4W8F9K";
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
  const [consent, setConsent] = useState(() =>
    typeof window === "undefined" ? "" : getConsentState(),
  );
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    function syncConsent() {
      setConsent(getConsentState());
    }

    window.addEventListener(CONSENT_EVENT_NAME, syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener(CONSENT_EVENT_NAME, syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

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

  if ((GTM_ID || GA_MEASUREMENT_ID) && !consent) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 block px-4 pb-[max(env(safe-area-inset-bottom),1rem)] transition duration-200 md:hidden ${
        isKeyboardOpen
          ? "translate-y-6 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      aria-hidden={isKeyboardOpen}
    >
      <div className="pointer-events-auto rounded-[24px] border border-[rgba(192,213,214,0.16)] bg-[color:var(--ink-950)]/94 p-3 shadow-[0_24px_60px_rgba(6,47,64,0.34)] backdrop-blur-xl">
        <div>
          <Link
            href="/assessment"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
          >
            Book free consultation
          </Link>
        </div>
        <SecondaryContactActions
          tone="dark"
          className="mt-3 [&>a]:min-h-11 [&>a]:basis-0 [&>a]:flex-1"
        />
      </div>
    </div>
  );
}
