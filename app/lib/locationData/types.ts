import type { TopicCard, TopicFaq, TopicSection } from "@/app/lib/siteContent";

export type Nation = "england" | "scotland" | "wales";

export type LocationTravelInfo = {
  trainTime: string;
  trainRoute: string;
  drivingTime: string;
  drivingRoute: string;
  flightTime?: string;
  flightRoute?: string;
  sameDayReturnNote: string;
  nearbyTowns: string[];
};

/**
 * Everything a city page shows is written for that city. Only one short
 * regulator-aware checklist is generated in `locations.ts`; general guidance
 * (choosing a provider, recovery, Turkey, marketing tactics) lives on the hub
 * pages and is linked, never repeated here. Search engines treat a set of pages
 * that differ only by place name as doorway pages, so:
 *
 * - write every sentence for this city; never paste a paragraph from another
 *   entry and swap the name,
 * - do not invent clinics, clinicians, statistics or prices,
 * - keep journey times approximate ("around …"),
 * - never list a town in `nearbyTowns` that has its own page.
 *
 * `npm run check:locations` fails when two city pages share too much wording.
 */
export type LocationInput = {
  city: string;
  nation: Nation;
  /** ISO date (YYYY-MM-DD) the page was genuinely first published. */
  publishedAt: string;
  /** ISO date of the last change a reader would notice. */
  updatedAt?: string;
  title: string;
  seoTitle: string;
  description: string;
  lead: string;
  heroChips: string[];
  cards: [TopicCard, TopicCard];
  travel: LocationTravelInfo;
  /** Two or three sections, each specific to this city. */
  sections: TopicSection[];
  /** Five or six questions someone from this city would actually ask. */
  faq: TopicFaq[];
};
