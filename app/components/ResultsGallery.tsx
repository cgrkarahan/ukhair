"use client";

import { useState } from "react";
import ProofCaseCard from "@/app/components/ProofCaseCard";
import type { ApprovedProofCase } from "@/app/lib/proof";

/**
 * Result cards with a filter row by area treated, so a visitor can jump to
 * cases like their own. The filter only shows when there is more than one area.
 */
export default function ResultsGallery({ cases }: { cases: ApprovedProofCase[] }) {
  const areas = Array.from(new Set(cases.map((proofCase) => proofCase.areaTreated)));
  const [area, setArea] = useState<string | null>(null);
  const shown = area ? cases.filter((proofCase) => proofCase.areaTreated === area) : cases;

  return (
    <div>
      {areas.length > 1 ? (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter results by area">
          {[null, ...areas].map((entry) => {
            const selected = area === entry;
            return (
              <button
                key={entry ?? "all"}
                type="button"
                aria-pressed={selected}
                onClick={() => setArea(entry)}
                className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--sage-500)] ${
                  selected
                    ? "border-[color:var(--ink-950)] bg-[color:var(--ink-950)] font-semibold text-white"
                    : "border-[color:var(--line-soft)] bg-white/80 text-[color:var(--ink-800)] hover:border-[color:var(--sage-500)]"
                }`}
              >
                {entry ?? `All cases (${cases.length})`}
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((proofCase) => (
          <ProofCaseCard key={proofCase.slug} proofCase={proofCase} />
        ))}
      </div>
    </div>
  );
}
