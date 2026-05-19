"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

export type HeroSlide = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  image?: unknown;
  imageAlt?: string;
  primaryCta?: string;
  secondaryCta?: string;
  priceBadges?: { label: string; value: string }[];
};

type HeroSliderProps = {
  slides: HeroSlide[];
};

export default function HeroSlider({ slides }: HeroSliderProps) {
  const safeSlides = useMemo(
    () => (slides.length > 0 ? slides : []),
    [slides],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [safeSlides.length]);

  if (safeSlides.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {safeSlides.map((slide, index) => (
          <div key={`${slide.headline ?? "slide"}-${index}`} className="min-w-full">
            <div className="relative overflow-hidden rounded-[36px] bg-[color:var(--ink-950)]">
              {slide.image ? (
                <Image
                  src={urlFor(slide.image)
                    .width(1800)
                    .height(900)
                    .fit("crop")
                    .url()}
                  alt={slide.imageAlt ?? slide.headline ?? "Hero slide"}
                  width={1800}
                  height={900}
                  className="h-[420px] w-full object-cover sm:h-[480px] lg:h-[520px]"
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : undefined}
                  />
              ) : (
                <div className="h-[420px] w-full bg-[radial-gradient(circle_at_top,rgba(64,126,140,1),rgba(8,58,79,1))] sm:h-[480px] lg:h-[520px]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
              {slide.priceBadges && slide.priceBadges.length > 0 ? (
                <div className="absolute right-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap justify-end gap-2 sm:right-6 sm:top-6 sm:max-w-none sm:gap-3">
                  {slide.priceBadges.map((badge) => (
                    <div
                      key={`${badge.label}-${badge.value}`}
                      className="rounded-2xl border border-[rgba(192,213,214,0.24)] bg-[rgba(192,213,214,0.14)] px-3 py-2 text-right text-white shadow-[0_18px_44px_rgba(6,47,64,0.18)] backdrop-blur md:px-4"
                    >
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/75 sm:text-[11px]">
                        {badge.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold sm:text-base">
                        {badge.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="absolute inset-0 flex items-end p-8 sm:p-10">
                <div className="max-w-2xl text-white">
                  {slide.eyebrow ? (
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(192,213,214,0.3)] bg-[rgba(192,213,214,0.12)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80">
                      {slide.eyebrow}
                    </div>
                  ) : null}
                  {index === 0 ? (
                    <h1 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                      {slide.headline}
                    </h1>
                  ) : (
                    <p className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                      {slide.headline}
                    </p>
                  )}
                  {slide.subhead ? (
                    <p className="mt-4 text-base leading-relaxed text-white/80">
                      {slide.subhead}
                    </p>
                  ) : null}
                  <div className="mt-6 flex flex-wrap gap-4">
                    {slide.primaryCta ? (
                      <a
                        href="#consultation"
                        className="rounded-full bg-[color:var(--surface-paper)] px-6 py-3 text-sm font-semibold text-[color:var(--ink-950)] shadow-[0_18px_44px_rgba(6,47,64,0.18)] transition hover:bg-[color:var(--surface-subtle)]"
                      >
                        {slide.primaryCta}
                      </a>
                    ) : null}
                    {slide.secondaryCta ? (
                      <a
                        href="#results"
                        className="rounded-full border border-[rgba(192,213,214,0.3)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[rgba(192,213,214,0.08)]"
                      >
                        {slide.secondaryCta}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {safeSlides.length > 1 ? (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[rgba(6,47,64,0.42)] px-3 py-2 backdrop-blur">
          {safeSlides.map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex
                  ? "bg-[color:var(--gold-300)]"
                  : "bg-[rgba(192,213,214,0.32)] hover:bg-[rgba(192,213,214,0.62)]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
