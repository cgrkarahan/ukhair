"use client";

import { useEffect } from "react";
import {
  consumePendingAssessmentSuccess,
  TRACKING_EVENTS,
  pushTrackingEvent,
} from "@/app/lib/tracking";

type ThankYouTrackingProps = {
  source?: string;
};

export default function ThankYouTracking({ source = "assessment" }: ThankYouTrackingProps) {
  useEffect(() => {
    const trackedSource = consumePendingAssessmentSuccess(source);

    if (!trackedSource) {
      return;
    }

    pushTrackingEvent(TRACKING_EVENTS.assessmentFormSuccess, { source: trackedSource });
  }, [source]);

  return null;
}
