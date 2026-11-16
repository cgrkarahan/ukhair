import Link from "next/link";

export type BreadcrumbItem = { name: string; path: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
  className?: string;
};

/** Visible breadcrumb trail. The last item is the current page. */
export default function Breadcrumbs({
  items,
  tone = "light",
  className = "",
}: BreadcrumbsProps) {
  const dark = tone === "dark";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${
          dark ? "text-white/60" : "text-[color:var(--ink-600)]"
        }`}
      >
        {items.map((item, index) => {
          const current = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="opacity-60">
                  ›
                </span>
              ) : null}
              {current ? (
                <span
                  aria-current="page"
                  className={`font-medium ${
                    dark ? "text-white/88" : "text-[color:var(--ink-900)]"
                  }`}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className={`underline-offset-4 transition hover:underline ${
                    dark ? "hover:text-white" : "hover:text-[color:var(--ink-950)]"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
