"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  clearStoredAttribution,
  CONSENT_EVENT_NAME,
  CONSENT_STORAGE_KEY,
  persistAttribution,
} from "@/app/lib/tracking";
import { useConsentState } from "@/app/lib/useConsentState";

function updateGoogleConsent(value: "accepted" | "declined") {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  const consentValue = value === "accepted" ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: consentValue,
    ad_user_data: consentValue,
    ad_personalization: consentValue,
    analytics_storage: consentValue,
  });

  window.dataLayer.push({
    event:
      value === "accepted"
        ? "cookie_consent_accepted"
        : "cookie_consent_declined",
    cookieConsent: value,
  });
}

function persistConsent(value: "accepted" | "declined") {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  document.cookie = `${CONSENT_STORAGE_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  window.dispatchEvent(new Event(CONSENT_EVENT_NAME));
}

export default function CookieConsent() {
  const consent = useConsentState();
  const lastSyncedConsent = useRef("");

  function syncGoogleConsent(value: "accepted" | "declined") {
    updateGoogleConsent(value);
    lastSyncedConsent.current = value;
  }

  useEffect(() => {
    if (
      (consent === "accepted" || consent === "declined") &&
      lastSyncedConsent.current !== consent
    ) {
      updateGoogleConsent(consent);
      lastSyncedConsent.current = consent;
    }
  }, [consent]);

  if (consent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-[76px] z-50 px-3 md:bottom-0 md:px-4 md:pb-[max(env(safe-area-inset-bottom),1rem)]">
      <div
        role="region"
        aria-label="Cookie choice"
        className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-[20px] border border-[color:var(--line-strong)] bg-[rgba(244,247,246,0.98)] p-4 shadow-[0_16px_40px_rgba(6,47,64,0.18)] sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-sm leading-6 text-[color:var(--ink-700)]">
          We use analytics cookies to see which pages help people book.{" "}
          <Link href="/cookies" className="underline underline-offset-4">
            Cookie policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              clearStoredAttribution();
              persistConsent("declined");
              syncGoogleConsent("declined");
            }}
            className="inline-flex flex-1 justify-center whitespace-nowrap rounded-full border border-[color:var(--line-soft)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--ink-800)] transition hover:bg-[color:var(--surface-subtle)]"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => {
              persistConsent("accepted");
              persistAttribution();
              syncGoogleConsent("accepted");
            }}
            className="inline-flex flex-1 justify-center whitespace-nowrap rounded-full bg-[color:var(--ink-950)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--palette-teal)]"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
