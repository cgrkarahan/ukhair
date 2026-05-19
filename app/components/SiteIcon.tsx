import type { SVGProps } from "react";

export type SiteIconName =
  | "alert-circle"
  | "book-open"
  | "calendar-check"
  | "clipboard-check"
  | "clock"
  | "compass"
  | "droplet"
  | "globe"
  | "map-pin"
  | "menu"
  | "message-dots"
  | "phone"
  | "route"
  | "shield-check"
  | "sparkles"
  | "stethoscope"
  | "wallet"
  | "x";

type SiteIconProps = SVGProps<SVGSVGElement> & {
  name: SiteIconName;
  size?: number;
  strokeWidth?: number;
};

function BaseIcon({
  children,
  size = 20,
  strokeWidth = 1.85,
  ...props
}: Omit<SiteIconProps, "name">) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export default function SiteIcon({ name, ...props }: SiteIconProps) {
  switch (name) {
    case "map-pin":
      return (
        <BaseIcon {...props}>
          <path d="M12 20.5s5.5-4.9 5.5-10.2a5.5 5.5 0 1 0-11 0C6.5 15.6 12 20.5 12 20.5Z" />
          <circle cx="12" cy="10.2" r="2.2" />
        </BaseIcon>
      );
    case "shield-check":
      return (
        <BaseIcon {...props}>
          <path d="M12 3.5 18.5 6v4.7c0 4.5-2.7 7.3-6.5 9.8-3.8-2.5-6.5-5.3-6.5-9.8V6Z" />
          <path d="m9.4 12.1 1.7 1.8 3.5-4" />
        </BaseIcon>
      );
    case "wallet":
      return (
        <BaseIcon {...props}>
          <path d="M4.5 8.5h13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-11a2.5 2.5 0 0 1-2.5-2.5v-5a2.5 2.5 0 0 1 2.5-2.5Z" />
          <path d="M6.5 8.5V7A2.5 2.5 0 0 1 9 4.5h8" />
          <circle cx="16.5" cy="13.5" r="0.7" fill="currentColor" stroke="none" />
        </BaseIcon>
      );
    case "book-open":
      return (
        <BaseIcon {...props}>
          <path d="M5 6.8A2.8 2.8 0 0 1 7.8 4H12v15.2H7.8A2.8 2.8 0 0 0 5 22Z" />
          <path d="M19 6.8A2.8 2.8 0 0 0 16.2 4H12v15.2h4.2A2.8 2.8 0 0 1 19 22Z" />
        </BaseIcon>
      );
    case "clock":
      return (
        <BaseIcon {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.7v4.8l3 1.8" />
        </BaseIcon>
      );
    case "globe":
      return (
        <BaseIcon {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17" />
          <path d="M12 3.5c2.6 2.2 4 5 4 8.5s-1.4 6.3-4 8.5c-2.6-2.2-4-5-4-8.5s1.4-6.3 4-8.5Z" />
        </BaseIcon>
      );
    case "clipboard-check":
      return (
        <BaseIcon {...props}>
          <path d="M9 4.7h6" />
          <path d="M10 4.5a2 2 0 1 1 4 0" />
          <path d="M8 6.5H7A2 2 0 0 0 5 8.5v10A2 2 0 0 0 7 20.5h10a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2h-1" />
          <path d="m9.6 13 1.7 1.8 3.5-4" />
        </BaseIcon>
      );
    case "message-dots":
      return (
        <BaseIcon {...props}>
          <path d="M7.6 18.9 4 20l1.2-3.4A4.2 4.2 0 0 1 4 13.7V9.4A4.4 4.4 0 0 1 8.4 5h7.2A4.4 4.4 0 0 1 20 9.4v4.3a4.4 4.4 0 0 1-4.4 4.4H9.2c-.6 0-1.1 0-1.6-.2Z" />
          <circle cx="9.5" cy="11.6" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="12.8" cy="11.6" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="16.1" cy="11.6" r="0.7" fill="currentColor" stroke="none" />
        </BaseIcon>
      );
    case "menu":
      return (
        <BaseIcon {...props}>
          <path d="M4.5 7.5h15" />
          <path d="M4.5 12h15" />
          <path d="M4.5 16.5h15" />
        </BaseIcon>
      );
    case "alert-circle":
      return (
        <BaseIcon {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.8v5" />
          <circle cx="12" cy="16.6" r="0.8" fill="currentColor" stroke="none" />
        </BaseIcon>
      );
    case "calendar-check":
      return (
        <BaseIcon {...props}>
          <path d="M7 4.5v3" />
          <path d="M17 4.5v3" />
          <rect x="4" y="6.5" width="16" height="13" rx="2.5" />
          <path d="M4 10.2h16" />
          <path d="m9.6 15 1.7 1.8 3.5-4" />
        </BaseIcon>
      );
    case "compass":
      return (
        <BaseIcon {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m15.7 8.3-2.5 7.2-7.1 2.4 2.5-7.1Z" />
          <path d="m10.8 13.2 2.4-2.4" />
        </BaseIcon>
      );
    case "route":
      return (
        <BaseIcon {...props}>
          <circle cx="6.5" cy="6.5" r="2" />
          <circle cx="17.5" cy="17.5" r="2" />
          <path d="M8.5 6.5h4a3 3 0 0 1 3 3v4" />
          <path d="M13.5 17.5h-4a3 3 0 0 1-3-3v-4" />
        </BaseIcon>
      );
    case "stethoscope":
      return (
        <BaseIcon {...props}>
          <path d="M8 4.5v5a4 4 0 0 0 8 0v-5" />
          <path d="M6.5 4.5H9" />
          <path d="M15 4.5h2.5" />
          <path d="M12 13.5v2.8a4 4 0 0 0 4 4h1" />
          <circle cx="18.5" cy="20" r="1.5" />
        </BaseIcon>
      );
    case "droplet":
      return (
        <BaseIcon {...props}>
          <path d="M12 4.5c2.9 3.5 5 6 5 8.5a5 5 0 1 1-10 0c0-2.5 2.1-5 5-8.5Z" />
        </BaseIcon>
      );
    case "sparkles":
      return (
        <BaseIcon {...props}>
          <path d="m12 4.6 1.4 3.4 3.3 1.4-3.3 1.4-1.4 3.4-1.4-3.4-3.3-1.4 3.3-1.4Z" />
          <path d="m18.1 13 .7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />
          <path d="m5.9 14.3.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6Z" />
        </BaseIcon>
      );
    case "phone":
      return (
        <BaseIcon {...props}>
          <path d="M8 4.7h2.1l1.1 3.6-1.7 1.6a13.8 13.8 0 0 0 4.6 4.6l1.6-1.7 3.6 1.1V16a2 2 0 0 1-2.2 2A13.7 13.7 0 0 1 6 6.9 2 2 0 0 1 8 4.7Z" />
        </BaseIcon>
      );
    case "x":
      return (
        <BaseIcon {...props}>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </BaseIcon>
      );
    default:
      return (
        <BaseIcon {...props}>
          <circle cx="12" cy="12" r="8.5" />
        </BaseIcon>
      );
  }
}

type IconBadgeProps = {
  name: SiteIconName;
  tone?: "dark" | "light";
  size?: "sm" | "md";
  className?: string;
};

export function IconBadge({
  name,
  tone = "dark",
  size = "md",
  className = "",
}: IconBadgeProps) {
  const sizeClass = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const toneClass =
    tone === "dark"
      ? "border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] text-[color:var(--gold-300)]"
      : "border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.72)] text-[color:var(--ink-900)]";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border ${sizeClass} ${toneClass} ${className}`.trim()}
    >
      <SiteIcon name={name} size={size === "sm" ? 17 : 20} />
    </span>
  );
}
