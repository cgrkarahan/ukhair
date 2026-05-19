"use client";

import { getPhoneHref, getWhatsappHref, siteContact } from "@/app/lib/contact";
import { TRACKING_EVENTS, pushTrackingEvent } from "@/app/lib/tracking";

type SecondaryContactActionsProps = {
  tone?: "light" | "dark";
  className?: string;
};

export default function SecondaryContactActions({
  tone = "light",
  className = "",
}: SecondaryContactActionsProps) {
  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsappHref("I would like to request a hair transplant assessment.");
  const buttonClasses =
    tone === "dark"
      ? "border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.98),rgba(232,238,237,0.94))] text-[color:var(--ink-950)] shadow-[0_14px_34px_rgba(6,47,64,0.08)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface-paper)]"
      : "border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)]/55 text-[color:var(--ink-800)] hover:bg-[color:var(--surface-subtle)]";

  if (!phoneHref && !whatsappHref) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          onClick={() => pushTrackingEvent(TRACKING_EVENTS.whatsappClick)}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold leading-none transition ${buttonClasses}`}
        >
          {siteContact.whatsappLabel}
        </a>
      ) : null}
      {phoneHref ? (
        <a
          href={phoneHref}
          onClick={() => pushTrackingEvent(TRACKING_EVENTS.phoneClick)}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold leading-none transition ${buttonClasses}`}
        >
          Call {siteContact.phoneDisplay}
        </a>
      ) : null}
    </div>
  );
}
