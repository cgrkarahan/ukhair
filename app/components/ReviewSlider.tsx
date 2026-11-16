"use client";

import { useState } from "react";

export type ReviewItem = {
  name: string;
  rating?: number;
  quote: string;
  verbatim?: boolean;
  reviewUrl?: string;
  treatmentArea?: string;
  sourceLabel?: string;
  isPlaceholder?: boolean;
};

type ReviewSliderProps = {
  reviews: ReviewItem[];
};

const INITIAL_COUNT = 3;

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(1, Math.min(5, Math.round(rating)));

  return (
    <p className="text-base tracking-[0.12em] text-[color:var(--gold-500)]" aria-label={`${filled} out of 5 stars`}>
      {"★".repeat(filled)}
      <span className="text-[color:var(--line-strong)]">{"★".repeat(5 - filled)}</span>
    </p>
  );
}

/**
 * Patient reviews shown as a grid, three at a time. Exact quotes appear in
 * quotation marks with the reviewer's name; summaries are labelled as such.
 */
export default function ReviewSlider({ reviews }: ReviewSliderProps) {
  const [showAll, setShowAll] = useState(false);

  if (reviews.length === 0) {
    return null;
  }

  const visible = showAll ? reviews : reviews.slice(0, INITIAL_COUNT);
  const fiveStar = reviews.filter((review) => (review.rating ?? 5) >= 5).length;

  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
            Patient reviews
          </p>
          <h2 id="reviews-heading" className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
            What patients say about the clinics we work with
          </h2>
        </div>
        <p className="text-sm text-[color:var(--ink-700)]">
          <span className="font-semibold text-[color:var(--ink-950)]">{fiveStar} of {reviews.length}</span> reviews rated 5 stars on Trustpilot
        </p>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((review, index) => (
          <li key={`${review.name}-${index}`} className="surface-light flex flex-col rounded-[24px] p-6">
            <Stars rating={review.rating ?? 5} />
            {review.verbatim ? (
              <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-[color:var(--ink-950)]">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            ) : (
              <div className="mt-4 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-600)]">
                  Review summary
                </p>
                <p className="mt-2 text-base leading-7 text-[color:var(--ink-900)]">{review.quote}</p>
              </div>
            )}
            <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 text-sm">
              {review.verbatim ? (
                <p className="font-semibold text-[color:var(--ink-950)]">{review.name}</p>
              ) : null}
              <p className="text-[color:var(--ink-700)]">{review.treatmentArea}</p>
              <p className="mt-1 text-xs text-[color:var(--ink-600)]">
                {review.reviewUrl ? (
                  <a href={review.reviewUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    {review.sourceLabel ?? "Read the original review"}
                  </a>
                ) : (
                  review.sourceLabel
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {reviews.length > INITIAL_COUNT ? (
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          aria-expanded={showAll}
          className="mt-6 inline-flex rounded-full border border-[color:var(--line-strong)] bg-white/60 px-5 py-2.5 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-white"
        >
          {showAll ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
        </button>
      ) : null}
    </section>
  );
}
