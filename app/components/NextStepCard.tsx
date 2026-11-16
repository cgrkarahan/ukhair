import Link from "next/link";
import SecondaryContactActions from "@/app/components/SecondaryContactActions";

type NextStepCardProps = {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
};

/**
 * Short call to action used at the end of guides, in place of the full form.
 * Dark teal on purpose: across the site, a dark block is where you book.
 */
export default function NextStepCard({
  title = "Ready to find out what applies to you?",
  text = "Answer three quick questions and add photos if you have them. The team replies the same working day with the most useful next step for your case.",
  href = "/assessment",
  label = "Book free consultation",
}: NextStepCardProps) {
  return (
    <section className="section-dark rounded-[32px] p-6 text-white sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-300)]">
            Next step
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
            {text}
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            href={href}
            className="inline-flex justify-center whitespace-nowrap rounded-full bg-[color:var(--gold-300)] px-6 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)]"
          >
            {label}
          </Link>
          <SecondaryContactActions tone="dark" />
        </div>
      </div>
    </section>
  );
}
