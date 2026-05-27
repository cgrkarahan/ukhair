import type { MetadataRoute } from "next";
import { blogPosts } from "@/app/lib/blogContent";
import { absoluteUrl } from "@/app/lib/seo";
import { topicPageList } from "@/app/lib/siteContent";
import { serviceCatalog } from "@/app/services/serviceData";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "/assessment",
    "/about",
    "/how-we-work",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/assessment" ? 0.95 : 0.45,
    })),
    ...topicPageList.map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...serviceCatalog.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ];
}
