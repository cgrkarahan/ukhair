import type { MetadataRoute } from "next";
import { blogPosts } from "@/app/lib/blogContent";
import { getPageReviewDate } from "@/app/lib/clinicalReview";
import { locationPageList } from "@/app/lib/locations";
import { absoluteUrl } from "@/app/lib/seo";
import { topicPageList } from "@/app/lib/siteContent";
import { serviceCatalog } from "@/app/services/serviceData";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * `lastmod` is emitted only where a real date exists: a blog post's update date,
 * a city page's publish date, a recorded content change, or a clinical review
 * date. Stamping the build date across every URL is why search engines learn to
 * ignore the field.
 */
/**
 * Dates when a page's visible content genuinely changed. Update an entry when
 * you change what a reader sees on that page; never bulk-stamp, and leave a page
 * out rather than guess.
 */
const contentUpdatedAt: Record<string, string> = {
  "/": "2026-09-28",
  "/assessment": "2026-09-28",
  "/how-hair-transplant-works": "2026-09-28",
  "/prices": "2026-09-28",
  "/results": "2026-09-28",
  "/editorial-policy": "2026-09-28",
  "/hair-transplant-cost-london": "2026-09-28",
  "/female-hair-transplant-london": "2026-09-28",
  "/hair-transplant-london": "2026-09-28",
  "/our-clinical-standards": "2026-09-28",
  "/uk-vs-turkey-hair-transplant": "2026-09-28",
  "/hair-transplant-recovery-timeline": "2026-09-28",
  "/services/male-hair-transplant": "2026-09-28",
  "/services/female-hair-transplant": "2026-09-28",
  "/services/beard-transplant": "2026-09-28",
};

function latestDate(...dates: (Date | undefined)[]) {
  const known = dates.filter((date): date is Date => Boolean(date));
  return known.length > 0
    ? new Date(Math.max(...known.map((date) => date.getTime())))
    : undefined;
}

function entry(
  path: string,
  {
    priority,
    changeFrequency,
    lastModified,
  }: {
    priority: number;
    changeFrequency: SitemapEntry["changeFrequency"];
    lastModified?: Date;
  },
): SitemapEntry {
  const contentDate = contentUpdatedAt[path]
    ? new Date(contentUpdatedAt[path])
    : undefined;
  const knownDate = latestDate(lastModified, contentDate, getPageReviewDate(path));

  return {
    url: absoluteUrl(path),
    ...(knownDate ? { lastModified: knownDate } : {}),
    changeFrequency,
    priority,
  };
}

const staticPages = [
  "/assessment",
  "/prices",
  "/results",
  "/services",
  "/about",
  "/how-we-work",
  "/editorial-policy",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", { priority: 1, changeFrequency: "weekly" }),
    ...staticPages.map((path) =>
      entry(path, {
        priority:
          path === "/assessment" ? 0.95 : path === "/prices" ? 0.9 : path === "/results" ? 0.8 : 0.45,
        changeFrequency: "monthly",
      }),
    ),
    ...topicPageList.map((page) =>
      entry(`/${page.slug}`, { priority: 0.9, changeFrequency: "weekly" }),
    ),
    ...locationPageList.map((page) =>
      entry(`/${page.slug}`, {
        priority: 0.75,
        changeFrequency: "monthly",
        lastModified: new Date(page.publishedAt),
      }),
    ),
    ...serviceCatalog.map((service) =>
      entry(`/services/${service.slug}`, {
        priority: 0.8,
        changeFrequency: "monthly",
      }),
    ),
    ...blogPosts.map((post) =>
      entry(`/blog/${post.slug}`, {
        priority: 0.72,
        changeFrequency: "monthly",
        lastModified: new Date(post.updatedAt),
      }),
    ),
  ];
}
