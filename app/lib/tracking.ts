export const TRACKING_EVENTS = {
  assessmentFormView: "assessment_form_view",
  assessmentFormStart: "assessment_form_start",
  assessmentFormSubmit: "assessment_form_submit",
  assessmentFormSuccess: "assessment_form_success",
  assessmentFormError: "assessment_form_error",
  whatsappClick: "whatsapp_click",
  phoneClick: "phone_click",
} as const;

export const ATTRIBUTION_STORAGE_KEY = "ukhair_attribution";
export const CONSENT_STORAGE_KEY = "ukhair_cookie_consent";
export const CONSENT_EVENT_NAME = "ukhair-consent-change";
export const PENDING_SUCCESS_STORAGE_KEY = "ukhair_pending_assessment_success";

export type AttributionData = {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
};

export const emptyAttributionData: AttributionData = {
  landingPage: "",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
  gclid: "",
  gbraid: "",
  wbraid: "",
};

declare global {
  interface Window {
    dataLayer: unknown[];
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
    gtag?: (...args: unknown[]) => void;
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function hasAnalyticsConsent() {
  return getConsentState() === "accepted";
}

export function readCurrentAttribution(): AttributionData {
  if (!isBrowser()) {
    return emptyAttributionData;
  }

  const url = new URL(window.location.href);

  return {
    landingPage: `${url.pathname}${url.search}`,
    referrer: document.referrer || "",
    utmSource: url.searchParams.get("utm_source") ?? "",
    utmMedium: url.searchParams.get("utm_medium") ?? "",
    utmCampaign: url.searchParams.get("utm_campaign") ?? "",
    utmTerm: url.searchParams.get("utm_term") ?? "",
    utmContent: url.searchParams.get("utm_content") ?? "",
    gclid: url.searchParams.get("gclid") ?? "",
    gbraid: url.searchParams.get("gbraid") ?? "",
    wbraid: url.searchParams.get("wbraid") ?? "",
  };
}

export function getStoredAttribution() {
  if (!isBrowser()) {
    return emptyAttributionData;
  }

  if (!hasAnalyticsConsent()) {
    return emptyAttributionData;
  }

  const stored = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);

  if (!stored) {
    return emptyAttributionData;
  }

  try {
    return {
      ...emptyAttributionData,
      ...(JSON.parse(stored) as Partial<AttributionData>),
    };
  } catch {
    return emptyAttributionData;
  }
}

export function getAttributionSnapshot() {
  if (!isBrowser()) {
    return emptyAttributionData;
  }

  if (!hasAnalyticsConsent()) {
    return emptyAttributionData;
  }

  const current = readCurrentAttribution();
  const stored = getStoredAttribution();

  return {
    landingPage: stored.landingPage || current.landingPage,
    referrer: stored.referrer || current.referrer,
    utmSource: stored.utmSource || current.utmSource,
    utmMedium: stored.utmMedium || current.utmMedium,
    utmCampaign: stored.utmCampaign || current.utmCampaign,
    utmTerm: stored.utmTerm || current.utmTerm,
    utmContent: stored.utmContent || current.utmContent,
    gclid: stored.gclid || current.gclid,
    gbraid: stored.gbraid || current.gbraid,
    wbraid: stored.wbraid || current.wbraid,
  };
}

export function persistAttribution() {
  if (!isBrowser()) {
    return emptyAttributionData;
  }

  const next = getAttributionSnapshot();

  if (!hasAnalyticsConsent()) {
    return next;
  }

  window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearStoredAttribution() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
}

export function pushTrackingEvent(
  event: string,
  payload: Record<string, unknown> = {},
) {
  if (!isBrowser()) {
    return;
  }

  if (!hasAnalyticsConsent()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });
}

export function getConsentState() {
  if (!isBrowser()) {
    return "";
  }

  return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "";
}

export function markPendingAssessmentSuccess(source: string) {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.setItem(
    PENDING_SUCCESS_STORAGE_KEY,
    JSON.stringify({
      source,
      createdAt: Date.now(),
    }),
  );
}

export function consumePendingAssessmentSuccess(fallbackSource = "assessment") {
  if (!isBrowser()) {
    return "";
  }

  const pending = window.sessionStorage.getItem(PENDING_SUCCESS_STORAGE_KEY);

  if (!pending) {
    return "";
  }

  window.sessionStorage.removeItem(PENDING_SUCCESS_STORAGE_KEY);

  try {
    const parsed = JSON.parse(pending) as { source?: string };
    return parsed.source || fallbackSource;
  } catch {
    return fallbackSource;
  }
}
