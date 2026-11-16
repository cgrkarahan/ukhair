import Image from "next/image";
import BeforeAfterCard from "@/app/components/BeforeAfterCard";
import type { ApprovedProofCase } from "@/app/lib/proof";

type ProofCaseCardProps = {
  proofCase: ApprovedProofCase;
  className?: string;
  /** Shorter card for a page hero: no summary paragraph. */
  compact?: boolean;
};

export default function ProofCaseCard({
  proofCase,
  className = "",
  compact = false,
}: ProofCaseCardProps) {
  const hasPair = Boolean(proofCase.beforeImageSrc && proofCase.afterImageSrc);
  const details = [
    proofCase.timeline,
    proofCase.grafts ? `${proofCase.grafts.toLocaleString("en-GB")} grafts` : undefined,
    proofCase.treatmentNote,
  ].filter(Boolean);

  return (
    <article
      className={`overflow-hidden rounded-[24px] border border-[color:var(--line-soft)] bg-white/80 shadow-[0_18px_44px_rgba(6,47,64,0.08)] ${className}`}
    >
      <div className="border-b border-[color:var(--line-soft)] bg-[rgba(192,213,214,0.18)] p-3">
        {hasPair ? (
          <BeforeAfterCard
            title={proofCase.title}
            area={proofCase.areaTreated}
            variant={proofCase.variant}
            beforeImage={proofCase.beforeImageSrc}
            afterImage={proofCase.afterImageSrc}
            beforeImageAlt={proofCase.beforeImageAlt}
            afterImageAlt={proofCase.afterImageAlt}
          />
        ) : proofCase.imageSrc ? (
          // A single image is shown as itself, never as a drawn before-and-after.
          <div className="relative aspect-[1.2/1] overflow-hidden rounded-[28px]">
            <Image
              src={proofCase.imageSrc}
              alt={proofCase.imageAlt ?? proofCase.title}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
            />
          </div>
        ) : null}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-500)]">
          {proofCase.areaTreated}
        </p>
        <h3 className="mt-2 font-display text-2xl text-[color:var(--ink-950)]">
          {proofCase.title}
        </h3>
        {compact ? null : (
          <p className="mt-3 text-sm leading-7 text-[color:var(--ink-700)]">
            {proofCase.summary}
          </p>
        )}
        <p className="mt-3 text-sm text-[color:var(--ink-600)]">
          {details.join(" · ")}
        </p>
      </div>
    </article>
  );
}
