import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/lib/seo";

const disallowedPaths = ["/studio", "/studio/"];

/**
 * Tracking and campaign parameters. These create endless duplicate URLs of
 * pages that already exist at a clean path.
 */
const disallowedParameters = [
  "/*?*utm_",
  "/*?*gclid=",
  "/*?*gbraid=",
  "/*?*wbraid=",
  "/*?*fbclid=",
  "/*?*msclkid=",
  "/*?*ttclid=",
  "/*?*mc_cid=",
  "/*?*mc_eid=",
  "/*?*ref=",
];

const disallow = [...disallowedPaths, ...disallowedParameters];

/**
 * AI answer engines are named explicitly rather than left to the wildcard rule,
 * because some of them only honour a rule that names their own agent.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "Meta-ExternalAgent",
  "cohere-ai",
];

/**
 * SEO tooling is allowed on purpose. Blocking these disables our own site
 * audits and backlink reporting, which costs us more than it costs anyone else.
 */
const seoTools = ["SemrushBot", "AhrefsBot", "AhrefsSiteAudit", "screaming frog"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
      ...seoTools.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: disallowedPaths,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
