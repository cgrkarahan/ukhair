"use client";

import { useEffect } from "react";
import { hasAnalyticsConsent, persistAttribution } from "@/app/lib/tracking";

export default function AttributionBootstrap() {
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      persistAttribution();
    }
  }, []);

  return null;
}
