"use client";

import { useState } from "react";
import Link from "next/link";
import {
  formatGrafts,
  formatPrice,
  getPackage,
  type PricedTreatment,
} from "@/app/lib/pricing";
import { TRACKING_EVENTS, pushTrackingEvent } from "@/app/lib/tracking";

type Extent = {
  label: string;
  /** Package and tier this answer usually falls in; null when it is quoted individually. */
  pkg: PricedTreatment["id"] | null;
  tier: 0 | 1 | null;
  /** Value sent to the consultation form's "main concern" question. */
  concern: string;
  note?: string;
};

type Area = { label: string; extents: Extent[] };

const areas: Area[] = [
  {
    label: "Scalp (men)",
    extents: [
      { label: "Receding hairline or temples", pkg: "hair", tier: 0, concern: "Hairline recession" },
      { label: "Crown on its own", pkg: "hair", tier: 0, concern: "Crown thinning" },
      { label: "Front and crown together", pkg: "hair", tier: 1, concern: "General density loss", note: "Where the donor area can safely supply it." },
      {
        label: "Most of the top",
        pkg: null,
        tier: null,
        concern: "General density loss",
        note: "Advanced loss is discussed individually, as the donor area may not cover it in one session.",
      },
    ],
  },
  {
    label: "Scalp (women)",
    extents: [
      { label: "Parting or temples", pkg: "female", tier: 0, concern: "Female thinning" },
      { label: "Wider frontal thinning", pkg: "female", tier: 1, concern: "Female thinning" },
    ],
  },
  {
    label: "Beard",
    extents: [
      { label: "Patchy beard or cheek line", pkg: "beard", tier: 0, concern: "Beard transplant" },
      { label: "Fuller beard from little growth", pkg: "beard", tier: 1, concern: "Beard transplant" },
    ],
  },
  {
    label: "Eyebrows or moustache",
    extents: [
      {
        label: "Eyebrows or moustache",
        pkg: null,
        tier: null,
        concern: "Eyebrow transplant",
        note: "Small, highly visible areas are quoted individually after a free consultation.",
      },
    ],
  },
];

const methods = ["Sapphire FUE", "DHI", "Not sure yet"] as const;
type Method = (typeof methods)[number];

type GraftEstimatorProps = {
  sourceLabel: string;
  tone?: "light" | "dark";
};

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-[16px] border px-4 py-3 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--sage-500)] ${
        selected
          ? "border-[color:var(--sage-700)] bg-[rgba(192,213,214,0.45)] font-semibold text-[color:var(--ink-950)]"
          : "border-[color:var(--line-soft)] bg-white/80 text-[color:var(--ink-800)] hover:border-[color:var(--sage-500)]"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Three taps to a likely graft band and price, using the same bands as the
 * price page. It ends at the consultation form with the concern pre-filled.
 */
export default function GraftEstimator({ sourceLabel }: GraftEstimatorProps) {
  const [areaIndex, setAreaIndex] = useState<number | null>(null);
  const [extentIndex, setExtentIndex] = useState<number | null>(null);
  const [method, setMethod] = useState<Method | null>(null);

  const area = areaIndex === null ? null : areas[areaIndex];
  const extent = area && extentIndex !== null ? area.extents[extentIndex] : null;
  const needsMethod = Boolean(extent?.pkg);
  const done = Boolean(extent && (!needsMethod || method));

  function track(step: string) {
    pushTrackingEvent(TRACKING_EVENTS.assessmentQuizStep, {
      sourceLabel,
      formId: "graft-estimator",
      step,
    });
  }

  let result: { band: string; price: string; detail: string } | null = null;

  if (done && extent) {
    if (extent.pkg && extent.tier !== null) {
      const pkg = getPackage(extent.pkg);
      const tier = pkg.tiers[extent.tier];
      const price =
        method === "DHI"
          ? formatPrice(tier.dhi)
          : method === "Sapphire FUE"
            ? formatPrice(tier.fue)
            : `${formatPrice(tier.fue)} Sapphire FUE or ${formatPrice(tier.dhi)} DHI`;
      result = {
        band: `Up to ${formatGrafts(tier.maxGrafts)} grafts`,
        price,
        detail: `${pkg.name}, fixed London price for eligible cases.${extent.note ? ` ${extent.note}` : ""}`,
      };
    } else {
      result = {
        band: "Planned individually",
        price: "Quoted after a free consultation",
        detail: extent.note ?? "",
      };
    }
  }

  const step = !area ? 1 : !extent ? 2 : needsMethod && !method ? 3 : 4;
  const totalSteps = needsMethod || !extent ? 3 : 2;

  return (
    <div className="rounded-[28px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
          Graft and price estimate
        </p>
        <p className="text-xs text-[color:var(--ink-600)]" aria-live="polite">
          {result ? "Your estimate" : `Step ${Math.min(step, totalSteps)} of ${totalSteps}`}
        </p>
      </div>

      <div className="mt-4 grid gap-5">
        <fieldset className="grid gap-2">
          <legend className="mb-2 font-display text-xl text-[color:var(--ink-950)]">
            What would you like to treat?
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {areas.map((entry, index) => (
              <OptionButton
                key={entry.label}
                selected={areaIndex === index}
                onClick={() => {
                  setAreaIndex(index);
                  setExtentIndex(entry.extents.length === 1 ? 0 : null);
                  setMethod(null);
                  track("estimator-area");
                }}
              >
                {entry.label}
              </OptionButton>
            ))}
          </div>
        </fieldset>

        {area && area.extents.length > 1 ? (
          <fieldset className="grid gap-2">
            <legend className="mb-2 font-display text-xl text-[color:var(--ink-950)]">
              How large is the area?
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {area.extents.map((entry, index) => (
                <OptionButton
                  key={entry.label}
                  selected={extentIndex === index}
                  onClick={() => {
                    setExtentIndex(index);
                    track("estimator-extent");
                  }}
                >
                  {entry.label}
                </OptionButton>
              ))}
            </div>
          </fieldset>
        ) : null}

        {extent && needsMethod ? (
          <fieldset className="grid gap-2">
            <legend className="mb-2 font-display text-xl text-[color:var(--ink-950)]">
              Which method?
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {methods.map((entry) => (
                <OptionButton
                  key={entry}
                  selected={method === entry}
                  onClick={() => {
                    setMethod(entry);
                    track("estimator-method");
                  }}
                >
                  {entry}
                </OptionButton>
              ))}
            </div>
          </fieldset>
        ) : null}

        {result && extent ? (
          <div
            className="rounded-[22px] bg-[color:var(--ink-950)] p-5 text-white"
            aria-live="polite"
          >
            <p className="text-sm text-white/70">Your likely band</p>
            <p className="mt-1 font-display text-3xl">{result.band}</p>
            <p className="mt-2 text-lg font-semibold text-[color:var(--gold-300)]">
              {result.price}
            </p>
            {result.detail ? (
              <p className="mt-2 text-sm leading-6 text-white/70">{result.detail}</p>
            ) : null}
            <p className="mt-2 text-xs leading-5 text-white/55">
              A rough guide only. Your band is confirmed after the team reviews your photos and donor area.
            </p>
            <Link
              href={`/assessment?concern=${encodeURIComponent(extent.concern)}#assessment-form`}
              onClick={() =>
                pushTrackingEvent(TRACKING_EVENTS.assessmentFormStart, {
                  sourceLabel,
                  formId: "graft-estimator",
                })
              }
              className="mt-4 inline-flex whitespace-nowrap rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)]"
            >
              Confirm it free with photos
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
