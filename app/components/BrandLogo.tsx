import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  tone?: "light" | "dark";
  compact?: boolean;
};

export default function BrandLogo({
  href = "/",
  tone = "dark",
  compact = false,
}: BrandLogoProps) {
  const dark = tone === "dark";

  const content = (
    <>
      <div className="shrink-0 drop-shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
        <Image
          src="/brand/ukht-logo.png"
          alt="UK Hair Transplant logo"
          width={56}
          height={56}
          className="h-11 w-11 object-contain sm:h-14 sm:w-14"
          priority
        />
      </div>
      {!compact ? (
        <div className="min-w-0">
          <p
            className={`text-[9px] uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.36em] ${
              dark ? "text-[color:var(--gold-300)]" : "text-[color:var(--ink-600)]"
            }`}
          >
            Premium London Hair Transplant
          </p>
          <p
            className={`font-display text-lg leading-tight sm:text-xl ${
              dark ? "text-white" : "text-[color:var(--ink-950)]"
            }`}
          >
            UK Hair Transplant
          </p>
        </div>
      ) : null}
    </>
  );

  return (
    <Link href={href} className="flex items-center gap-3">
      {content}
    </Link>
  );
}
