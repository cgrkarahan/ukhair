/**
 * Published London package prices. Every price shown on the site, including
 * hero panels, the cost page, and the price page, reads from here, so a price
 * change is made once. `public/llms.txt` is static and must be updated by hand.
 */

export type PriceTier = {
  maxGrafts: number;
  fue: number;
  dhi: number;
};

export type PricedTreatment = {
  id: "hair" | "female" | "beard";
  name: string;
  href: string;
  tiers: [PriceTier, PriceTier];
};

export const londonPackages: PricedTreatment[] = [
  {
    id: "hair",
    name: "Hair transplant",
    href: "/services/male-hair-transplant",
    tiers: [
      { maxGrafts: 3000, fue: 2750, dhi: 3250 },
      { maxGrafts: 5000, fue: 3500, dhi: 4000 },
    ],
  },
  {
    id: "female",
    name: "Female hair transplant",
    href: "/services/female-hair-transplant",
    tiers: [
      { maxGrafts: 1500, fue: 2750, dhi: 3250 },
      { maxGrafts: 3000, fue: 3500, dhi: 4000 },
    ],
  },
  {
    id: "beard",
    name: "Beard transplant",
    href: "/services/beard-transplant",
    tiers: [
      { maxGrafts: 1500, fue: 2750, dhi: 3250 },
      { maxGrafts: 3000, fue: 3500, dhi: 4000 },
    ],
  },
];

/** Included in every London package. */
export const packageInclusions = [
  "One complimentary PRP session",
  "Post-operative medication",
  "An aftercare pack",
  "No arrangement fees",
];

export const turkiyeFromPrice = 1800;

export function formatPrice(value: number) {
  return `£${value.toLocaleString("en-GB")}`;
}

export function formatGrafts(value: number) {
  return value.toLocaleString("en-GB");
}

export function getPackage(id: PricedTreatment["id"]) {
  const pkg = londonPackages.find((entry) => entry.id === id);

  if (!pkg) {
    throw new Error(`Unknown price package: ${id}`);
  }

  return pkg;
}

/** One-line summary used in price panels, e.g. "Sapphire FUE up to 3,000 grafts. DHI £3,250. …". */
export function describePackage(id: PricedTreatment["id"]) {
  const [base, larger] = getPackage(id).tiers;

  return `Sapphire FUE up to ${formatGrafts(base.maxGrafts)} grafts, or ${formatPrice(base.dhi)} for DHI. Up to ${formatGrafts(larger.maxGrafts)} grafts: ${formatPrice(larger.fue)} Sapphire FUE or ${formatPrice(larger.dhi)} DHI.`;
}

export const inclusionsSentence =
  "Every package includes one complimentary PRP session, post-operative medication, and an aftercare pack, with no arrangement fees.";
