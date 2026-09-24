/**
 * Named clinical reviewers and per-page review dates.
 *
 * Two rules govern this file:
 *
 * 1. A reviewer is only ever a real, named, credentialed clinician. Never add a
 *    placeholder name. `Physician` schema is emitted only for entries resolved
 *    from this registry, so an empty registry simply emits no reviewer.
 * 2. `lastReviewed` is only ever a date a review genuinely happened on. It feeds
 *    both the schema review line and the sitemap `lastmod`, and a stamped or
 *    guessed date is worse than no date at all.
 */

export type ClinicalRegistration = {
  body: string;
  number: string;
  url?: string;
};

export type ClinicalReviewer = {
  id: string;
  name: string;
  /** Post-nominals as they appear on the register, for example "MBBS, MRCS". */
  credentials?: string;
  jobTitle: string;
  registration?: ClinicalRegistration;
  profileUrl?: string;
};

/**
 * Populate with real clinicians before relying on reviewer markup.
 * Keys are stable ids referenced by `pageReviews` below.
 */
export const clinicalReviewers: Record<string, ClinicalReviewer> = {};

export type PageReview = {
  /** Key into `clinicalReviewers`. */
  reviewerId?: string;
  /** ISO date (YYYY-MM-DD) of a review that actually took place. */
  lastReviewed?: string;
};

/**
 * Keyed by site path, with a leading slash and no trailing slash.
 * Absent path means the page has no known review date, and no `lastmod`
 * or review markup is emitted for it.
 */
export const pageReviews: Record<string, PageReview> = {};

export function getClinicalReviewer(
  reviewerId?: string,
): ClinicalReviewer | undefined {
  if (!reviewerId) {
    return undefined;
  }

  return clinicalReviewers[reviewerId];
}

export function getPageReview(path: string): PageReview | undefined {
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");
  const review = pageReviews[normalized];

  if (!review) {
    return undefined;
  }

  const reviewer = getClinicalReviewer(review.reviewerId);

  return {
    reviewerId: reviewer ? review.reviewerId : undefined,
    lastReviewed: review.lastReviewed,
  };
}

export function getPageReviewDate(path: string): Date | undefined {
  const lastReviewed = getPageReview(path)?.lastReviewed;

  if (!lastReviewed) {
    return undefined;
  }

  const parsed = new Date(lastReviewed);

  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}
