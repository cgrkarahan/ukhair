"use client";

import { useEffect, useState } from "react";
import {
  clearStoredAttribution,
  CONSENT_EVENT_NAME,
  CONSENT_STORAGE_KEY,
  getConsentState,
  persistAttribution,
  pushTrackingEvent,
} from "@/app/lib/tracking";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-6WMF4W8F9K";
const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "wxlwrp223r";

function injectClarity(projectId: string) {
  if (typeof window === "undefined" || window.__ukhairClarityLoaded) {
    return;
  }

  window.clarity =
    window.clarity ||
    function clarity(...args: unknown[]) {
      window.clarity!.q = window.clarity!.q || [];
      window.clarity!.q.push(args);
    };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  script.dataset.ukhair = "clarity";
  document.head.appendChild(script);
  window.__ukhairClarityLoaded = true;
}

function injectGoogleTag(measurementId: string) {
  if (typeof window === "undefined" || window.__ukhairGoogleTagLoaded) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.ukhair = "gtag";
  document.head.appendChild(script);
  window.__ukhairGoogleTagLoaded = true;
}

function injectGtm(gtmId: string) {
  if (typeof window === "undefined" || window.__ukhairGtmLoaded) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  script.dataset.ukhair = "gtm";
  document.head.appendChild(script);
  window.__ukhairGtmLoaded = true;
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

  useEffect(() => {
    if (consent === "accepted" && CLARITY_PROJECT_ID) {
      injectClarity(CLARITY_PROJECT_ID);
    }

    if (consent === "accepted" && GA_MEASUREMENT_ID) {
      injectGoogleTag(GA_MEASUREMENT_ID);
    }

    if (consent === "accepted" && GTM_ID) {
      injectGtm(GTM_ID);
    }
  }, [consent]);

  if ((!GTM_ID && !GA_MEASUREMENT_ID && !CLARITY_PROJECT_ID) || consent) {
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
              if (CLARITY_PROJECT_ID) {
                injectClarity(CLARITY_PROJECT_ID);
              }
              if (GA_MEASUREMENT_ID) {
                injectGoogleTag(GA_MEASUREMENT_ID);
              }
              if (GTM_ID) {
                injectGtm(GTM_ID);
              }
              pushTrackingEvent("cookie_consent_accepted");
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
