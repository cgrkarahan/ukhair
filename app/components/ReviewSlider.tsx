"use client";

import { useEffect, useState } from "react";

export type ReviewItem = {
  name: string;
  rating?: number;
  quote: string;
  treatmentArea?: string;
  sourceLabel?: string;
  isPlaceholder?: boolean;
};

type ReviewSliderProps = {
  reviews: ReviewItem[];
};

export default function ReviewSlider({ reviews }: ReviewSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) {
    return null;
  }

  const activeReview = reviews[activeIndex];
  const filledStars = Math.max(1, Math.min(5, Math.round(activeReview.rating ?? 5)));

  return (
    <div className="space-y-5">
      <div className="rounded-[32px] border border-[rgba(192,213,214,0.12)] bg-[linear-gradient(160deg,rgba(6,47,64,0.99),rgba(8,58,79,0.98)),radial-gradient(circle_at_top_right,rgba(165,141,102,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(64,126,140,0.22),transparent_34%)] p-8 text-white shadow-[0_30px_72px_rgba(6,47,64,0.22)] sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/74">
              Patient feedback from clinics we work with
            </p>
            <div className="mt-3 flex items-center gap-1 text-lg text-[color:var(--gold-500)]">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={`star-${index}`}
                  className={
                    index < filledStars
                      ? "text-[color:var(--gold-500)]"
                      : "text-white/22"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="text-6xl leading-none text-[color:var(--palette-aqua)]">
            &ldquo;
          </div>
        </div>
        <p className="mt-6 font-display text-2xl leading-tight sm:text-3xl">
          {activeReview.quote}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--line-inverse-soft)] pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/76">
              {activeReview.sourceLabel ??
                (activeReview.isPlaceholder
                  ? "Preview placeholder"
                  : "Patient review")}
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              {activeReview.name}
            </p>
          </div>
          <div className="rounded-full bg-[rgba(192,213,214,0.12)] px-4 py-2 text-sm text-white/74">
            {activeReview.treatmentArea ?? "Consultation to aftercare experience"}
          </div>
        </div>
      </div>

      {reviews.length > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) =>
                prev === 0 ? reviews.length - 1 : prev - 1,
              )
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(192,213,214,0.16)] bg-[rgba(8,58,79,0.9)] text-white/82 transition hover:border-[rgba(192,213,214,0.28)] hover:bg-[rgba(21,88,106,0.98)] hover:text-white"
            aria-label="Previous review"
          >
            ←
          </button>
          <div className="rounded-full border border-[rgba(192,213,214,0.12)] bg-white/6 px-3 py-2 text-sm font-semibold text-white/74 sm:hidden">
            {activeIndex + 1} / {reviews.length}
          </div>
          <div className="hidden items-center gap-1 px-1 sm:flex">
            {reviews.map((_, index) => (
              <button
                key={`review-dot-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/6"
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === activeIndex
                      ? "bg-[color:var(--gold-500)]"
                      : "bg-white/18 hover:bg-[color:var(--palette-teal)]"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % reviews.length)
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(192,213,214,0.16)] bg-[rgba(8,58,79,0.9)] text-white/82 transition hover:border-[rgba(192,213,214,0.28)] hover:bg-[rgba(21,88,106,0.98)] hover:text-white"
            aria-label="Next review"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
