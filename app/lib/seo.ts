import type { Metadata } from "next";

export const siteName = "Evergreen Hair Clinic";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://evergreenhairclinic.co.uk";
export const defaultTitle = siteName;
export const defaultDescription =
  "Natural-looking hair restoration in London with surgeon-led consultations, modern aftercare, and confidence-first treatment planning.";
export const defaultOgImage = "/favicon.ico";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const resolvedTitle = title ?? defaultTitle;
  const resolvedDescription = description ?? defaultDescription;
  const url = absoluteUrl(path);

  return {
    ...(title ? { title } : {}),
    description: resolvedDescription,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: absoluteUrl(defaultOgImage),
          width: 256,
          height: 256,
          alt: `${siteName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [absoluteUrl(defaultOgImage)],
    },
  };
}
