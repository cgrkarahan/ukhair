export type AssessmentSubmission = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  primaryConcern: string;
  ukOnlyOrOpenToTurkey: string;
  message: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
};

export type AssessmentActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialAssessmentState: AssessmentActionState = {
  status: "idle",
};
