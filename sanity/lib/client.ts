import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6a79cd1d";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Legacy homepage documents still exist in Studio, but the live marketing site is
  // currently code-driven until the slimmer post-launch CMS migration is implemented.
  useCdn: false,
});
