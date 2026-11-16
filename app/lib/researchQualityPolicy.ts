export const MINIMUM_REVIEW_SCORE = 80;
export const MAX_REPAIR_ATTEMPTS = 1;

export type QualityReviewDecision = "approve" | "repair" | "reject";

export function decideQualityReview(input: {
  approved: boolean;
  scores: number[];
  repairAttempts: number;
}): QualityReviewDecision {
  const minimumScore = Math.min(...input.scores);
  if (input.approved && minimumScore >= MINIMUM_REVIEW_SCORE) {
    return "approve";
  }
  return input.repairAttempts < MAX_REPAIR_ATTEMPTS ? "repair" : "reject";
}
