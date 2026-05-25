"use server";

import type { ReactNode } from "react";
import type {
  AssessmentActionState,
  AssessmentSubmission,
} from "@/app/lib/assessmentForm";

const HONEYPOT_FIELD = "__ukhair_contact_check";
const MARKETING_CONSENT_WORDING =
  "I agree to receive hair restoration guidance, clinic updates, and occasional consultation offers or discounts from UK Hair Transplant Co. I can unsubscribe at any time.";

function getValue(formData: FormData, key: keyof AssessmentSubmission | typeof HONEYPOT_FIELD) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function required(value: string) {
  return value.length > 0;
}

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

function formatTextLine(label: string, value: string) {
  return `${label}: ${value || "Not provided"}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function getCheckboxValue(formData: FormData, key: keyof AssessmentSubmission) {
  return formData.get(key) === "yes" ? "Yes" : "No";
}

function row(label: string, value: string): ReactNode {
  return (
    `<tr><td style="padding:8px 12px;border:1px solid rgba(8,58,79,0.14);font-weight:600;color:#083A4F;">${escapeHtml(label)}</td>` +
    `<td style="padding:8px 12px;border:1px solid rgba(8,58,79,0.14);color:#225768;">${escapeHtml(value || "Not provided")}</td></tr>`
  );
}

function buildEmailHtml(submission: AssessmentSubmission) {
  return `
    <div style="font-family:Arial,sans-serif;background:#E5E1DD;padding:24px;color:#062F40;">
      <div style="max-width:760px;margin:0 auto;background:linear-gradient(180deg,#F4F7F6 0%,#E8EEED 100%);border:1px solid rgba(8,58,79,0.14);border-radius:20px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#083A4F 0%,#0D485E 100%);color:#fff;">
          <p style="margin:0 0 10px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#DFD1BA;">UK Hair Transplant</p>
          <h1 style="margin:0;font-size:28px;line-height:1.15;">New assessment request</h1>
        </div>
        <div style="padding:24px 32px;">
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;">
            A new assessment request has been submitted through the site.
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row("Full name", submission.fullName)}
            ${row("Email", submission.email)}
            ${row("Phone", submission.phone)}
            ${row("Location", submission.location)}
            ${row("Primary concern", submission.primaryConcern)}
            ${row("UK only or open to Turkey", submission.ukOnlyOrOpenToTurkey)}
            ${row("Message", submission.message)}
            ${row("Marketing consent", submission.marketingConsent)}
            ${row("Marketing consent wording", submission.marketingConsentWording)}
            ${row("Landing page", submission.landingPage)}
            ${row("Referrer", submission.referrer)}
            ${row("UTM source", submission.utmSource)}
            ${row("UTM medium", submission.utmMedium)}
            ${row("UTM campaign", submission.utmCampaign)}
            ${row("UTM term", submission.utmTerm)}
            ${row("UTM content", submission.utmContent)}
            ${row("GCLID", submission.gclid)}
            ${row("GBRAID", submission.gbraid)}
            ${row("WBRAID", submission.wbraid)}
          </table>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(submission: AssessmentSubmission) {
  return [
    "UK Hair Transplant - New assessment request",
    "",
    formatTextLine("Full name", submission.fullName),
    formatTextLine("Email", submission.email),
    formatTextLine("Phone", submission.phone),
    formatTextLine("Location", submission.location),
    formatTextLine("Primary concern", submission.primaryConcern),
    formatTextLine("UK only or open to Turkey", submission.ukOnlyOrOpenToTurkey),
    formatTextLine("Message", submission.message),
    formatTextLine("Marketing consent", submission.marketingConsent),
    formatTextLine("Marketing consent wording", submission.marketingConsentWording),
    "",
    "Attribution",
    formatTextLine("Landing page", submission.landingPage),
    formatTextLine("Referrer", submission.referrer),
    formatTextLine("UTM source", submission.utmSource),
    formatTextLine("UTM medium", submission.utmMedium),
    formatTextLine("UTM campaign", submission.utmCampaign),
    formatTextLine("UTM term", submission.utmTerm),
    formatTextLine("UTM content", submission.utmContent),
    formatTextLine("GCLID", submission.gclid),
    formatTextLine("GBRAID", submission.gbraid),
    formatTextLine("WBRAID", submission.wbraid),
  ].join("\n");
}

export async function submitAssessment(
  _prevState: AssessmentActionState,
  formData: FormData,
): Promise<AssessmentActionState> {
  const honeypot = getValue(formData, HONEYPOT_FIELD);

  if (honeypot) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Assessment submission skipped because the honeypot field was filled.");
    }

    return { status: "success" };
  }

  const submission: AssessmentSubmission = {
    fullName: getValue(formData, "fullName"),
    email: getValue(formData, "email"),
    phone: getValue(formData, "phone"),
    location: getValue(formData, "location"),
    primaryConcern: getValue(formData, "primaryConcern"),
    ukOnlyOrOpenToTurkey: getValue(formData, "ukOnlyOrOpenToTurkey"),
    message: getValue(formData, "message"),
    marketingConsent: getCheckboxValue(formData, "marketingConsent"),
    marketingConsentWording: MARKETING_CONSENT_WORDING,
    landingPage: getValue(formData, "landingPage"),
    referrer: getValue(formData, "referrer"),
    utmSource: getValue(formData, "utmSource"),
    utmMedium: getValue(formData, "utmMedium"),
    utmCampaign: getValue(formData, "utmCampaign"),
    utmTerm: getValue(formData, "utmTerm"),
    utmContent: getValue(formData, "utmContent"),
    gclid: getValue(formData, "gclid"),
    gbraid: getValue(formData, "gbraid"),
    wbraid: getValue(formData, "wbraid"),
  };

  if (
    !required(submission.fullName) ||
    !required(submission.email) ||
    !isValidEmail(submission.email) ||
    !required(submission.phone) ||
    !required(submission.primaryConcern) ||
    !required(submission.ukOnlyOrOpenToTurkey)
  ) {
    return {
      status: "error",
      message:
        "Please complete the required fields so the team can review your case properly.",
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "UK Hair Transplant <onboarding@resend.dev>";

  if (!resendApiKey || !notificationEmail) {
    return {
      status: "error",
      message:
        "Assessment delivery is not configured yet. Add the Resend and notification email settings to enable submissions.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notificationEmail],
        reply_to: sanitizeHeaderValue(submission.email),
        subject: `New assessment request - ${sanitizeHeaderValue(submission.fullName)}`,
        html: buildEmailHtml(submission),
        text: buildEmailText(submission),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Resend email send failed", {
        status: response.status,
        body: await response.text(),
      });

      return {
        status: "error",
        message:
          "The request could not be sent right now. Please try again in a moment or use another contact option.",
      };
    }
  } catch (error) {
    console.error("Resend email send threw an error", error);

    return {
      status: "error",
      message:
        "The request could not be sent right now. Please try again in a moment or use another contact option.",
    };
  }

  return {
    status: "success",
  };
}
