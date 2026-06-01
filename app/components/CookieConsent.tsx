"use client";

import { useEffect, useRef, useState } from "react";
import {
  clearStoredAttribution,
  CONSENT_EVENT_NAME,
  CONSENT_STORAGE_KEY,
  getConsentState,
  persistAttribution,
} from "@/app/lib/tracking";

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
  const [consent, setConsent] = useState(() =>
    typeof window === "undefined" ? "" : getConsentState(),
  );
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
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-[28px] border border-[color:var(--line-strong)] bg-[linear-gradient(180deg,rgba(238,242,240,0.98),rgba(223,232,231,0.96))] p-5 shadow-[0_20px_50px_rgba(6,47,64,0.18)] sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-500)]">
            Cookies and measurement
          </p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--ink-700)]">
            We use analytics and ad measurement cookies to understand which pages lead to
            assessments and to improve the site. You can accept analytics or continue with
            essential cookies only.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              clearStoredAttribution();
              persistConsent("declined");
              syncGoogleConsent("declined");
              setConsent("declined");
            }}
            className="inline-flex rounded-full border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-2.5 text-sm font-semibold text-[color:var(--ink-800)] transition hover:bg-[color:var(--surface-subtle)]"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => {
              persistConsent("accepted");
              persistAttribution();
              syncGoogleConsent("accepted");
              setConsent("accepted");
            }}
            className="inline-flex rounded-full bg-[color:var(--ink-950)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--palette-teal)]"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
