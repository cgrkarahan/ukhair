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
          className="h-14 w-14 object-contain"
          priority
        />
      </div>
      {!compact ? (
        <div>
          <p
            className={`text-[11px] uppercase tracking-[0.36em] ${
              dark ? "text-[color:var(--gold-300)]/70" : "text-[color:var(--ink-600)]"
            }`}
          >
            Premium London Hair Transplant
          </p>
          <p
            className={`font-display text-xl ${
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
