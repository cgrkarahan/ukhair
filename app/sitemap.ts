import type { MetadataRoute } from "next";
import { blogPosts } from "@/app/lib/blogContent";
import { getPageReviewDate } from "@/app/lib/clinicalReview";
import { absoluteUrl } from "@/app/lib/seo";
import { topicPageList } from "@/app/lib/siteContent";
import { serviceCatalog } from "@/app/services/serviceData";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * `lastmod` is emitted only where a real date exists, which currently means a
 * blog post's own update date or a recorded clinical review date. Stamping the
 * build date across every URL is why search engines learn to ignore the field.
 */
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
  const reviewDate = lastModified ?? getPageReviewDate(path);

  return {
    url: absoluteUrl(path),
    ...(reviewDate ? { lastModified: reviewDate } : {}),
    changeFrequency,
    priority,
  };
}

const staticPages = [
  "/assessment",
  "/services",
  "/about",
  "/how-we-work",
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
        priority: path === "/assessment" ? 0.95 : 0.45,
        changeFrequency: "monthly",
      }),
    ),
    ...topicPageList.map((page) =>
      entry(`/${page.slug}`, { priority: 0.9, changeFrequency: "weekly" }),
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
