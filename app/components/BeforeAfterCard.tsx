"use client";

import Image from "next/image";
import { useId, useState } from "react";

type BeforeAfterCardProps = {
  title: string;
  area?: string;
  variant?: "hairline" | "crown" | "temple" | "diffuse";
  beforeImage?: string;
  afterImage?: string;
  beforeImageAlt?: string;
  afterImageAlt?: string;
};

const variantStyles: Record<
  NonNullable<BeforeAfterCardProps["variant"]>,
  { before: string; after: string }
> = {
  hairline: {
    before:
      "radial-gradient(circle at 50% 22%, rgba(244,221,206,0.98) 0 18%, rgba(229,200,180,0.94) 18% 28%, rgba(146,116,92,0.92) 28% 38%, rgba(118,88,67,0.95) 38% 52%, rgba(53,44,38,0.98) 52% 100%)",
    after:
      "radial-gradient(circle at 50% 20%, rgba(244,221,206,0.98) 0 18%, rgba(229,200,180,0.96) 18% 28%, rgba(110,82,62,0.97) 28% 38%, rgba(66,52,44,0.98) 38% 62%, rgba(42,35,31,0.99) 62% 100%)",
  },
  crown: {
    before:
      "radial-gradient(circle at 50% 42%, rgba(209,176,146,0.96) 0 11%, rgba(171,139,113,0.92) 11% 21%, rgba(98,82,68,0.96) 21% 46%, rgba(61,54,48,0.98) 46% 100%)",
    after:
      "radial-gradient(circle at 50% 42%, rgba(156,128,104,0.96) 0 8%, rgba(104,85,70,0.95) 8% 18%, rgba(70,61,54,0.97) 18% 42%, rgba(51,46,43,0.99) 42% 100%)",
  },
  temple: {
    before:
      "linear-gradient(115deg, rgba(52,46,42,0.98) 0 34%, rgba(224,194,170,0.96) 34% 72%, rgba(201,170,145,0.96) 72% 100%)",
    after:
      "linear-gradient(115deg, rgba(44,39,37,0.99) 0 47%, rgba(217,187,163,0.96) 47% 78%, rgba(197,166,143,0.96) 78% 100%)",
  },
  diffuse: {
    before:
      "radial-gradient(circle at 50% 22%, rgba(238,214,194,0.97) 0 16%, rgba(208,177,151,0.94) 16% 25%, rgba(133,108,88,0.92) 25% 35%, rgba(92,77,66,0.96) 35% 57%, rgba(58,50,46,0.98) 57% 100%)",
    after:
      "radial-gradient(circle at 50% 22%, rgba(238,214,194,0.97) 0 16%, rgba(208,177,151,0.95) 16% 25%, rgba(100,80,66,0.96) 25% 35%, rgba(64,55,49,0.98) 35% 68%, rgba(44,38,35,0.99) 68% 100%)",
  },
};

export default function BeforeAfterCard({
  title,
  area,
  variant = "hairline",
  beforeImage,
  afterImage,
  beforeImageAlt,
  afterImageAlt,
}: BeforeAfterCardProps) {
  const [position, setPosition] = useState(52);
  const sliderId = useId();
  const styles = variantStyles[variant];
  const hasImages = Boolean(beforeImage && afterImage);

  return (
    <div
      className="relative overflow-hidden rounded-[28px]"
      role="group"
      aria-label={`Before and after comparison for ${title}`}
    >
      <div className="relative aspect-[1.2/1] overflow-hidden rounded-[28px] bg-[color:var(--surface-subtle)]">
        {hasImages ? (
          <>
            <Image
              src={beforeImage!}
              alt={beforeImageAlt ?? `${title} before treatment`}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 40vw, 100vw"
            />
            <div
              className="absolute inset-y-0 right-0 overflow-hidden"
              style={{ left: `${position}%` }}
            >
              <Image
                src={afterImage!}
                alt={afterImageAlt ?? `${title} after treatment`}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundImage: styles.before }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0"
              style={{
                left: `${position}%`,
                backgroundImage: styles.after,
              }}
            />
          </>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-1 bg-[color:var(--surface-paper)] shadow-[0_0_0_1px_rgba(8,58,79,0.14)]"
          style={{ left: `calc(${position}% - 2px)` }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--surface-paper)] text-[color:var(--ink-950)] shadow-lg"
          style={{ left: `calc(${position}% - 24px)` }}
        >
          <span className="text-lg leading-none">↔</span>
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white backdrop-blur">
          Before
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white backdrop-blur">
          After
        </div>
        <div className="absolute bottom-4 left-4 rounded-full bg-[color:var(--surface-paper)]/90 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--ink-950)]">
          {area ?? title}
        </div>
        <input
          id={sliderId}
          type="range"
          min="15"
          max="85"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label={`Adjust before and after comparison for ${title}`}
        />
      </div>
    </div>
  );
}
