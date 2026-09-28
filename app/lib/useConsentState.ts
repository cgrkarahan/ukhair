"use client";

import { useSyncExternalStore } from "react";
import { CONSENT_EVENT_NAME, getConsentState } from "@/app/lib/tracking";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT_NAME, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(CONSENT_EVENT_NAME, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// The server has no localStorage, so it always renders "no consent yet".
// Returning the same value for the hydration render keeps server and client
// HTML identical; React re-renders with the stored value straight after.
function getServerSnapshot() {
  return "";
}

export function useConsentState() {
  return useSyncExternalStore(subscribe, getConsentState, getServerSnapshot);
}
