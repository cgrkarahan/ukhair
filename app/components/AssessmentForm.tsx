"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { submitAssessment } from "@/app/actions/assessment";
import { initialAssessmentState } from "@/app/lib/assessmentForm";
import {
  TRACKING_EVENTS,
  getAttributionSnapshot,
  markPendingAssessmentSuccess,
  pushTrackingEvent,
} from "@/app/lib/tracking";

const MAX_PHOTOS = 4;
const MAX_PHOTO_SIZE_MB = 8;

type AssessmentFormProps = {
  formId?: string;
  sourceLabel: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold text-black shadow-[0_14px_32px_rgba(165,141,102,0.18)] transition hover:bg-[color:var(--gold-400)] disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "Sending request..." : "Book free consultation"}
    </button>
  );
}

export default function AssessmentForm({
  formId = "assessment-form",
  sourceLabel,
}: AssessmentFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(submitAssessment, initialAssessmentState);
  const [started, setStarted] = useState(false);
  const [attribution, setAttribution] = useState(getAttributionSnapshot);
  const [step, setStep] = useState<1 | 2>(1);
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState("");
  const concernRef = useRef<HTMLSelectElement>(null);
  const routeRef = useRef<HTMLSelectElement>(null);
  const concernOptions = useMemo(
    () => [
      "Hairline recession",
      "Crown thinning",
      "General density loss",
      "Female thinning",
      "Beard transplant",
      "Eyebrow transplant",
      "Unsure / need advice",
    ],
    [],
  );

  useEffect(() => {
    pushTrackingEvent(TRACKING_EVENTS.assessmentFormView, {
      sourceLabel,
      formId,
    });
  }, [formId, sourceLabel]);

  function goToStepTwo() {
    const concernValid = concernRef.current?.reportValidity() ?? true;
    const routeValid = routeRef.current?.reportValidity() ?? true;

    if (!concernValid || !routeValid) {
      return;
    }

    markStarted();
    setStep(2);
    pushTrackingEvent(TRACKING_EVENTS.assessmentFormStart, {
      sourceLabel,
      formId,
      step: "2",
    });
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length > MAX_PHOTOS) {
      setPhotoError(`Please choose up to ${MAX_PHOTOS} photos.`);
      event.target.value = "";
      setPhotoNames([]);
      return;
    }

    const oversized = files.find(
      (file) => file.size > MAX_PHOTO_SIZE_MB * 1024 * 1024,
    );

    if (oversized) {
      setPhotoError(`${oversized.name} is over ${MAX_PHOTO_SIZE_MB}MB. Please choose a smaller photo.`);
      event.target.value = "";
      setPhotoNames([]);
      return;
    }

    setPhotoError("");
    setPhotoNames(files.map((file) => file.name));
  }

  useEffect(() => {
    if (state.status === "success") {
      markPendingAssessmentSuccess(sourceLabel);
      router.push(`/thank-you?source=${encodeURIComponent(sourceLabel)}`);
      return;
    }

    if (state.status === "error") {
      pushTrackingEvent(TRACKING_EVENTS.assessmentFormError, {
        sourceLabel,
      });
    }
  }, [router, sourceLabel, state.status]);

  function markStarted() {
    if (started) {
      return;
    }

    setStarted(true);
    setAttribution(getAttributionSnapshot());
    pushTrackingEvent(TRACKING_EVENTS.assessmentFormStart, {
      sourceLabel,
      formId,
    });
  }

  return (
    <form
      id={formId}
      action={formAction}
      onFocusCapture={markStarted}
      onChangeCapture={markStarted}
      onSubmit={() =>
        pushTrackingEvent(TRACKING_EVENTS.assessmentFormSubmit, {
          sourceLabel,
          formId,
        })
      }
      className="grid gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-[color:var(--line-soft)]">
          <div
            className="h-full rounded-full bg-[color:var(--sage-700)] transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
        <span className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--ink-600)]">
          Step {step} of 2
        </span>
      </div>

      <div hidden={step !== 1} className="grid gap-4">
        <p className="text-sm leading-7 text-[color:var(--ink-700)]">
          Two quick questions, then your details. Most people finish in under 60 seconds.
        </p>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[color:var(--ink-900)]">Primary concern*</span>
          <select
            ref={concernRef}
            name="primaryConcern"
            required
            defaultValue=""
            className="rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm text-[color:var(--ink-950)] outline-none transition focus:border-[color:var(--sage-500)]"
          >
            <option value="" disabled>
              Select your main concern
            </option>
            {concernOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[color:var(--ink-900)]">UK only or open to Turkey?*</span>
          <select
            ref={routeRef}
            name="ukOnlyOrOpenToTurkey"
            required
            defaultValue=""
            className="rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm text-[color:var(--ink-950)] outline-none transition focus:border-[color:var(--sage-500)]"
          >
            <option value="" disabled>
              Choose an option
            </option>
            <option value="UK only">UK only</option>
            <option value="Open to both">Open to both</option>
            <option value="Need advice first">Need advice first</option>
          </select>
        </label>
        <button
          type="button"
          onClick={goToStepTwo}
          className="inline-flex justify-center rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold text-black shadow-[0_14px_32px_rgba(165,141,102,0.18)] transition hover:bg-[color:var(--gold-400)]"
        >
          Continue
        </button>
      </div>

      <div hidden={step !== 2} className="grid gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="justify-self-start text-sm font-medium text-[color:var(--ink-700)] underline-offset-4 hover:underline"
        >
          Back
        </button>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[color:var(--ink-900)]">Full name*</span>
            <input
              name="fullName"
              type="text"
              required={step === 2}
              autoComplete="name"
              className="rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm text-[color:var(--ink-950)] outline-none transition focus:border-[color:var(--sage-500)]"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[color:var(--ink-900)]">Email*</span>
            <input
              name="email"
              type="email"
              required={step === 2}
              autoComplete="email"
              className="rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm text-[color:var(--ink-950)] outline-none transition focus:border-[color:var(--sage-500)]"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[color:var(--ink-900)]">Phone*</span>
            <input
              name="phone"
              type="tel"
              required={step === 2}
              autoComplete="tel"
              className="rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm text-[color:var(--ink-950)] outline-none transition focus:border-[color:var(--sage-500)]"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[color:var(--ink-900)]">Location</span>
            <input
              name="location"
              type="text"
              autoComplete="address-level2"
              placeholder="City or area"
              className="rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm text-[color:var(--ink-950)] outline-none transition focus:border-[color:var(--sage-500)]"
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[color:var(--ink-900)]">Anything the team should know?</span>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell us about your goals, timing, recovery concerns, or anything else the team should know."
            className="rounded-[22px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm leading-7 text-[color:var(--ink-950)] outline-none transition focus:border-[color:var(--sage-500)]"
          />
        </label>

        <div className="rounded-[22px] border border-[color:var(--line-soft)] bg-[rgba(192,213,214,0.18)] p-4 text-sm leading-7 text-[color:var(--ink-700)]">
          <p className="font-semibold text-[color:var(--ink-950)]">
            Add photos (optional)
          </p>
          <p className="mt-2">
            Clear daylight photos of the hairline, temples, crown, and donor area help
            the team give a more specific first response. Photos are emailed directly
            and privately to our clinical team&apos;s inbox. They are not stored in a
            public gallery and are seen only by the team reviewing your case.
          </p>
          <label className="mt-3 grid gap-2">
            <span className="sr-only">Upload photos</span>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm text-[color:var(--ink-950)] outline-none transition file:mr-3 file:rounded-full file:border-0 file:bg-[color:var(--sage-700)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
            />
          </label>
          <p className="mt-2 text-xs text-[color:var(--ink-600)]">
            Up to {MAX_PHOTOS} photos, {MAX_PHOTO_SIZE_MB}MB each. JPG or PNG works best.
          </p>
          {photoNames.length > 0 ? (
            <p className="mt-2 text-xs text-[color:var(--ink-800)]">
              Attached: {photoNames.join(", ")}
            </p>
          ) : null}
          {photoError ? (
            <p className="mt-2 text-xs font-medium text-[color:var(--ink-900)]">
              {photoError}
            </p>
          ) : null}
        </div>

        <label className="flex gap-3 rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm leading-6 text-[color:var(--ink-800)]">
          <input
            type="checkbox"
            name="marketingConsent"
            value="yes"
            className="mt-1 h-4 w-4 rounded border-[color:var(--line-soft)] text-[color:var(--sage-700)]"
          />
          <span>
            I agree to receive hair restoration guidance, clinic updates, and occasional
            consultation offers or discounts from UK Hair Transplant Co. I can unsubscribe
            at any time.
          </span>
        </label>
      </div>

      <input type="hidden" name="landingPage" value={attribution.landingPage} />
      <input type="hidden" name="referrer" value={attribution.referrer} />
      <input type="hidden" name="utmSource" value={attribution.utmSource} />
      <input type="hidden" name="utmMedium" value={attribution.utmMedium} />
      <input type="hidden" name="utmCampaign" value={attribution.utmCampaign} />
      <input type="hidden" name="utmTerm" value={attribution.utmTerm} />
      <input type="hidden" name="utmContent" value={attribution.utmContent} />
      <input type="hidden" name="gclid" value={attribution.gclid} />
      <input type="hidden" name="gbraid" value={attribution.gbraid} />
      <input type="hidden" name="wbraid" value={attribution.wbraid} />
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-contact-check`}>
          Company
        </label>
        <input
          id={`${formId}-contact-check`}
          type="text"
          name="__ukhair_contact_check"
          tabIndex={-1}
          autoComplete="new-password"
        />
      </div>

      <div
        hidden={step !== 2}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-sm leading-7 text-[color:var(--ink-700)]">
          By sending this request, you agree to our privacy policy and allow the team to
          contact you about your assessment.
        </p>
        <SubmitButton />
      </div>

      {state.status === "error" && state.message ? (
        <p className="rounded-[18px] border border-[rgba(8,58,79,0.14)] bg-[rgba(192,213,214,0.38)] px-4 py-3 text-sm text-[color:var(--ink-900)]">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
