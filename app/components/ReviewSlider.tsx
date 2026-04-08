"use client";

import { useEffect, useState } from "react";

export type ReviewItem = {
  name: string;
  rating?: number;
  quote: string;
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
      <div className="rounded-[32px] border border-[color:var(--leaf-200)] bg-white/90 p-8 text-[color:var(--leaf-900)] shadow-soft sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-1 text-lg text-[color:var(--leaf-700)]">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={`star-${index}`}
                className={
                  index < filledStars
                    ? "text-[color:var(--leaf-700)]"
                    : "text-[color:var(--leaf-200)]"
                }
              >
                ★
              </span>
            ))}
          </div>
          <div className="text-6xl leading-none text-[color:var(--leaf-200)]">
            &ldquo;
          </div>
        </div>
        <p className="mt-6 max-w-3xl font-display text-2xl leading-tight sm:text-3xl">
          {activeReview.quote}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--leaf-200)] pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--leaf-600)]">
              Verified patient
            </p>
            <p className="mt-2 text-base font-semibold text-[color:var(--leaf-900)]">
              {activeReview.name}
            </p>
          </div>
          <div className="rounded-full bg-[color:var(--leaf-100)] px-4 py-2 text-sm text-[color:var(--leaf-700)]">
            Consultation to aftercare experience
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--leaf-300)] bg-white/80 text-[color:var(--leaf-800)] transition hover:bg-white"
            aria-label="Previous review"
          >
            ←
          </button>
          <div className="flex items-center gap-2 px-2">
            {reviews.map((_, index) => (
              <button
                key={`review-dot-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex
                    ? "bg-[color:var(--leaf-700)]"
                    : "bg-[color:var(--leaf-200)] hover:bg-[color:var(--leaf-400)]"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % reviews.length)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--leaf-300)] bg-white/80 text-[color:var(--leaf-800)] transition hover:bg-white"
            aria-label="Next review"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
