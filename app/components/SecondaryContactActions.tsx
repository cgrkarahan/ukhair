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
  const phoneButtonClasses =
    tone === "dark"
      ? "border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.98),rgba(232,238,237,0.94))] !text-black shadow-[0_14px_34px_rgba(6,47,64,0.08)] visited:!text-black hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface-paper)] hover:!text-black"
      : "border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)]/55 !text-black visited:!text-black hover:bg-[color:var(--surface-subtle)] hover:!text-black";
  const whatsappButtonClasses =
    tone === "dark"
      ? "border border-[#1b8f52] bg-[linear-gradient(180deg,#28d466,#22c55e)] text-black shadow-[0_14px_34px_rgba(37,211,102,0.22)] visited:text-black hover:border-[#177c47] hover:bg-[#22c55e] hover:text-black"
      : "border border-[#1b8f52] bg-[#25d366] text-black shadow-[0_10px_24px_rgba(37,211,102,0.18)] visited:text-black hover:bg-[#22c55e] hover:text-black";

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
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold leading-none transition ${whatsappButtonClasses}`}
        >
          {siteContact.whatsappLabel}
        </a>
      ) : null}
      {phoneHref ? (
        <a
          href={phoneHref}
          onClick={() => pushTrackingEvent(TRACKING_EVENTS.phoneClick)}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold leading-none transition ${phoneButtonClasses}`}
        >
          Call {siteContact.phoneDisplay}
        </a>
      ) : null}
    </div>
  );
}
