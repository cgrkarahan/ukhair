"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SecondaryContactActions from "@/app/components/SecondaryContactActions";
import { CONSENT_EVENT_NAME, getConsentState } from "@/app/lib/tracking";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function MobileStickyAssessmentCta() {
  const [consent, setConsent] = useState(() =>
    typeof window === "undefined" ? "" : getConsentState(),
  );

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

  if (GTM_ID && !consent) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 block px-4 pb-[max(env(safe-area-inset-bottom),1rem)] md:hidden">
      <div className="pointer-events-auto rounded-[24px] border border-[rgba(192,213,214,0.16)] bg-[color:var(--ink-950)]/94 p-3 shadow-[0_24px_60px_rgba(6,47,64,0.34)] backdrop-blur-xl">
        <div>
          <Link
            href="/assessment"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-[color:var(--gold-300)]"
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
