import Link from "next/link";
import AssessmentForm from "@/app/components/AssessmentForm";
import { IconBadge } from "@/app/components/SiteIcon";
import SecondaryContactActions from "@/app/components/SecondaryContactActions";
import { siteContact } from "@/app/lib/contact";

type AssessmentSectionProps = {
  sourceLabel: string;
  tone?: "light" | "dark";
  title?: string;
  intro?: string;
  formFirst?: boolean;
  titleAs?: "h1" | "h2";
};

export default function AssessmentSection({
  sourceLabel,
  tone = "light",
  title = "Book your free consultation.",
  intro = "Send your case details so the next step starts with your pattern of loss, priorities, timing, and the most useful consultation guidance for your case.",
  formFirst = false,
  titleAs = "h2",
}: AssessmentSectionProps) {
  const dark = tone === "dark";
  const TitleTag = titleAs;
  const nextSteps = [
    {
      icon: "clipboard-check" as const,
      text: "The team reviews your concern, timing, and any location details you share before replying with the most useful consultation route.",
    },
    {
      icon: "message-dots" as const,
      text: "You will be told what extra photos or details would make your free consultation more specific and useful.",
    },
    {
      icon: "calendar-check" as const,
      text: "If your case looks suitable, the next step moves into consultation planning, standards, recovery expectations, and next-step guidance.",
    },
  ];

  return (
    <section
      id="assessment-form"
      className={
        dark
          ? "page-hero overflow-hidden rounded-[40px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10"
          : "surface-card rounded-[38px] p-6 sm:p-8 lg:p-10"
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div
          className={`rounded-[30px] border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,rgba(244,247,246,0.96),rgba(232,238,237,0.94))] p-5 sm:p-6 ${
            formFirst ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <AssessmentForm sourceLabel={sourceLabel} />
        </div>

        <div className={`${dark ? "text-white" : ""} ${formFirst ? "lg:order-2" : "lg:order-1"}`}>
          <p
            className={`text-xs uppercase tracking-[0.32em] ${
              dark ? "text-[color:var(--gold-300)]/82" : "text-[color:var(--gold-500)]"
            }`}
          >
            Free consultation
          </p>
          <TitleTag
            className={`mt-4 font-display text-3xl sm:text-4xl ${
              dark ? "text-white" : "text-[color:var(--ink-950)]"
            }`}
          >
            {title}
          </TitleTag>
          <p
            className={`mt-4 max-w-xl text-sm leading-7 sm:text-base ${
              dark ? "text-white/70" : "text-[color:var(--ink-700)]"
            }`}
          >
            {intro}
          </p>
          <div
            className={`mt-7 rounded-[28px] border p-5 ${
              dark
                ? "border-[rgba(192,213,214,0.12)] bg-[rgba(192,213,214,0.08)]"
                : "border-[color:var(--line-soft)] bg-[color:var(--surface-paper)]"
            }`}
          >
            <p
              className={`text-xs uppercase tracking-[0.28em] ${
                dark ? "text-[color:var(--gold-300)]/76" : "text-[color:var(--ink-600)]"
              }`}
            >
              What happens next
            </p>
            <ul
              className={`mt-4 space-y-3 text-sm leading-7 ${
                dark ? "text-white/70" : "text-[color:var(--ink-700)]"
              }`}
            >
              {nextSteps.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <IconBadge
                    name={item.icon}
                    tone={dark ? "dark" : "light"}
                    size="sm"
                  />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <SecondaryContactActions tone={dark ? "dark" : "light"} />
          </div>
          <p
            className={`mt-5 text-sm leading-7 ${
              dark ? "text-white/60" : "text-[color:var(--ink-700)]"
            }`}
          >
            Prefer email? Write to{" "}
            <a
              href={`mailto:${siteContact.email}`}
              className={dark ? "text-white" : "text-[color:var(--ink-950)]"}
            >
              {siteContact.email}
            </a>
            . You can also review our{" "}
            <Link
              href="/privacy"
              className={dark ? "text-white" : "text-[color:var(--ink-950)]"}
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
