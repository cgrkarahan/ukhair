import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
