import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: configDir,
  },
  // Posts merged into the pillar page that targets the same intent.
  async redirects() {
    return [
      ["hair-transplant-cost-london-what-changes-the-price", "/hair-transplant-cost-london"],
      ["uk-vs-turkey-hair-transplant-how-to-compare", "/uk-vs-turkey-hair-transplant"],
      ["hair-transplant-recovery-timeline-week-by-week", "/hair-transplant-recovery-timeline"],
      ["female-hair-transplant-london-who-may-be-suitable", "/female-hair-transplant-london"],
    ].map(([slug, destination]) => ({
      source: `/blog/${slug}`,
      destination,
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
