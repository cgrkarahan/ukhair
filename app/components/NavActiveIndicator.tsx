"use client";

import { usePathname } from "next/navigation";

type NavActiveIndicatorProps = {
  hrefs: string[];
};

function matches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Gold underline under a desktop menu item. It stays on while the visitor is
 * on that page or one of its dropdown pages, and shows on hover otherwise.
 */
export default function NavActiveIndicator({ hrefs }: NavActiveIndicatorProps) {
  const pathname = usePathname() ?? "";
  const active = hrefs.some((href) => matches(pathname, href));

  return (
    <span
      aria-hidden="true"
      data-active={active ? "true" : undefined}
      className={`pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full bg-[color:var(--gold-300)] shadow-[0_0_18px_rgba(165,141,102,0.6)] transition duration-200 ${
        active
          ? "scale-x-100 opacity-100"
          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 group-focus-within:scale-x-100 group-focus-within:opacity-100"
      }`}
    />
  );
}
