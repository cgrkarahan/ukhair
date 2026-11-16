import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: configDir,
  },
  experimental: {
    serverActions: {
      // Consultation photos are resized in the browser to well under 1MB each,
      // so up to 4 photos fit. Vercel rejects any request over 4.5MB.
      bodySizeLimit: "4mb",
    },
  },
  // Posts merged into the pillar page that targets the same intent.
  async redirects() {
    return [
      ["hair-transplant-cost-london-what-changes-the-price", "/hair-transplant-cost-london"],
      ["uk-vs-turkey-hair-transplant-how-to-compare", "/uk-vs-turkey-hair-transplant"],
      ["hair-transplant-recovery-timeline-week-by-week", "/hair-transplant-recovery-timeline"],
      ["female-hair-transplant-london-who-may-be-suitable", "/services/female-hair-transplant"],
      // Re-targeted from London to the UK.
      ["how-to-choose-a-hair-transplant-clinic-in-london", "/blog/how-to-choose-a-hair-transplant-clinic"],
    ]
      .map(([slug, destination]) => ({
        source: `/blog/${slug}`,
        destination,
        permanent: true,
      }))
      .concat([
        // Duplicate of the female service page, which had the same title.
        {
          source: "/female-hair-transplant-london",
          destination: "/services/female-hair-transplant",
          permanent: true,
        },
      ]);
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
