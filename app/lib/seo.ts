import type { Metadata } from "next";
import { brandName, replaceBrandText } from "@/app/lib/brand";

export const siteName = brandName;
const canonicalSiteUrl = "https://www.ukhairtransplant.co";

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return canonicalSiteUrl;
  }

  try {
    const url = new URL(value);
    url.protocol = "https:";

    if (url.hostname === "ukhairtransplant.co") {
      url.hostname = "www.ukhairtransplant.co";
    }

    url.pathname = "";
    url.search = "";
    url.hash = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return canonicalSiteUrl;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const defaultTitle = siteName;
export const defaultDescription =
  "UK Hair Transplant helps patients explore hair transplant treatment in London with stronger clinical standards, clearer guidance, and premium central London access.";
export const defaultOgImage = "/opengraph-image";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const resolvedTitle = replaceBrandText(title ?? defaultTitle);
  const resolvedDescription = replaceBrandText(description ?? defaultDescription);
  const url = absoluteUrl(path);
  const resolvedImage = image ? absoluteUrl(image) : absoluteUrl(defaultOgImage);

  return {
    ...(title ? { title: resolvedTitle } : {}),
    description: resolvedDescription,
    ...(keywords ? { keywords } : {}),
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
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: `${siteName} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
  };
}
