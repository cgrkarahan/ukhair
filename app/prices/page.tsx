import type { Metadata } from "next";
import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import { IconBadge, type SiteIconName } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import {
  formatGrafts,
  formatPrice,
  getPackage,
  inclusionsSentence,
  londonPackages,
  packageInclusions,
  turkiyeFromPrice,
} from "@/app/lib/pricing";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  compactSchemaList,
  organizationRef,
} from "@/app/lib/schema";
import { absoluteUrl, buildMetadata } from "@/app/lib/seo";

const hair = getPackage("hair");
const female = getPackage("female");
const beard = getPackage("beard");

const description = `Fixed London prices for hair, female, and beard transplants: Sapphire FUE from ${formatPrice(hair.tiers[0].fue)}, DHI from ${formatPrice(hair.tiers[0].dhi)}, by graft range. ${inclusionsSentence}`;

export const metadata: Metadata = buildMetadata({
  title: `Hair Transplant Prices From ${formatPrice(hair.tiers[0].fue)} | UK Hair Transplant`,
  description,
  path: "/prices",
  keywords: [
    "uk hair transplant prices",
    "hair transplant packages london",
    "sapphire fue price",
    "dhi hair transplant price",
    "female hair transplant price",
    "beard transplant price",
  ],
});

const treatmentNotes: Record<string, { icon: SiteIconName; body: string[] }> = {
  hair: {
    icon: "sparkles",
    body: [
      `Most first procedures for male pattern hair loss fall within ${formatGrafts(hair.tiers[0].maxGrafts)} grafts, which covers a typical hairline and frontal rebuild. Larger cases, such as combined frontal and crown loss, can need more, up to ${formatGrafts(hair.tiers[1].maxGrafts)} grafts, where the donor area can safely supply them.`,
      "How many grafts you need, and how many your donor area can spare, is assessed at consultation. The band you are quoted in follows from that assessment rather than from what you would like to have.",
    ],
  },
  female: {
    icon: "compass",
    body: [
      "Female procedures are carried out without shaving the head. Working between existing hair takes considerably longer and needs more precision at every step, from extraction to placement, and it keeps the result discreet while you heal.",
      `That extra time is why the female bands are smaller at the same prices: up to ${formatGrafts(female.tiers[0].maxGrafts)} grafts in the first band and up to ${formatGrafts(female.tiers[1].maxGrafts)} in the second. Female thinning also usually calls for fewer, more carefully placed grafts than male pattern loss.`,
    ],
  },
  beard: {
    icon: "route",
    body: [
      "Beard work is slower per graft than scalp work. Facial hair grows at shallow, varied angles, grafts are usually single hairs, and the cheek line and density transitions have to look natural at close range.",
      `A patchy beard or cheek-line fill often sits within ${formatGrafts(beard.tiers[0].maxGrafts)} grafts. A fuller beard built from little existing growth can need up to ${formatGrafts(beard.tiers[1].maxGrafts)}.`,
    ],
  },
};

const perGraftBase = (hair.tiers[0].fue / hair.tiers[0].maxGrafts).toFixed(2);
const perGraftLarge = (hair.tiers[1].fue / hair.tiers[1].maxGrafts).toFixed(2);

const faq = [
  {
    question: "How much is a hair transplant with UK Hair Transplant?",
    answer: `A hair transplant costs ${formatPrice(hair.tiers[0].fue)} with Sapphire FUE or ${formatPrice(hair.tiers[0].dhi)} with DHI for up to ${formatGrafts(hair.tiers[0].maxGrafts)} grafts, and ${formatPrice(hair.tiers[1].fue)} or ${formatPrice(hair.tiers[1].dhi)} for up to ${formatGrafts(hair.tiers[1].maxGrafts)} grafts. These are fixed London prices for eligible cases. ${inclusionsSentence}`,
  },
  {
    question: "Why is DHI more expensive than Sapphire FUE?",
    answer: `DHI costs ${formatPrice(hair.tiers[0].dhi - hair.tiers[0].fue)} more because each graft is loaded into an implanter pen and placed individually, which takes longer and needs more team time per graft. It is not automatically the better method. Your consultation should recommend one based on your hair, your goals, and whether you want to avoid shaving.`,
  },
  {
    question: "How much does a female hair transplant cost?",
    answer: `A female hair transplant costs ${formatPrice(female.tiers[0].fue)} with Sapphire FUE or ${formatPrice(female.tiers[0].dhi)} with DHI for up to ${formatGrafts(female.tiers[0].maxGrafts)} grafts, and ${formatPrice(female.tiers[1].fue)} or ${formatPrice(female.tiers[1].dhi)} for up to ${formatGrafts(female.tiers[1].maxGrafts)} grafts. The graft bands are smaller than for male procedures because female treatment is done without shaving, which takes longer.`,
  },
  {
    question: "How much does a beard transplant cost?",
    answer: `A beard transplant costs ${formatPrice(beard.tiers[0].fue)} with Sapphire FUE or ${formatPrice(beard.tiers[0].dhi)} with DHI for up to ${formatGrafts(beard.tiers[0].maxGrafts)} grafts, and ${formatPrice(beard.tiers[1].fue)} or ${formatPrice(beard.tiers[1].dhi)} for up to ${formatGrafts(beard.tiers[1].maxGrafts)} grafts.`,
  },
  {
    question: "What if I need more grafts than my package covers?",
    answer: `If your assessment shows you need more grafts than the first band, the second band applies. Cases beyond the largest band, or where the donor area cannot safely supply the grafts needed, are discussed individually, and sometimes the honest answer is that a transplant is not the right route yet.`,
  },
  {
    question: "Do you publish prices for eyebrow and moustache transplants?",
    answer:
      "Eyebrow and moustache transplants are quoted individually after a free consultation. They are small, highly visible areas where shape, direction, and density need to be planned before a fair price can be given.",
  },
  {
    question: "Are these prices for London or Turkiye?",
    answer: `The packages on this page are London prices. Our curated Turkiye route is priced separately, from ${formatPrice(turkiyeFromPrice)}, and our UK vs Turkey comparison sets out what changes between the two.`,
  },
  {
    question: "Is the consultation free?",
    answer:
      "Yes. The consultation is free, and it is where your graft range, technique, and price band are confirmed in writing before you decide anything.",
  },
];

const techniqueRows = [
  {
    label: "How grafts are placed",
    fue: "Recipient channels are opened first with sapphire-tipped blades, then grafts are placed into them.",
    dhi: "Each graft is loaded into an implanter pen and placed directly, without pre-made channels.",
  },
  {
    label: "Often suited to",
    fue: "Larger areas and most standard hairline and crown work.",
    dhi: "Precise placement where density and angle control matter most, and work between existing hair.",
  },
  {
    label: "Time per graft",
    fue: "Faster, which keeps the price lower.",
    dhi: "Slower and more team-intensive, which is why it costs more.",
  },
];

const confirmSteps = [
  {
    icon: "message-dots" as SiteIconName,
    title: "Free consultation",
    text: "Share your concern and clear photos of your hairline, crown, and donor area.",
  },
  {
    icon: "clipboard-check" as SiteIconName,
    title: "Assessment and recommendation",
    text: "Your graft range, donor capacity, and the technique that suits your case are assessed and explained.",
  },
  {
    icon: "wallet" as SiteIconName,
    title: "Written fixed quote",
    text: "You receive the price for your band in writing, with inclusions listed, before you commit to anything.",
  },
];

export default function PricesPage() {
  const offers = londonPackages.flatMap((pkg) =>
    pkg.tiers.flatMap((tier) =>
      (
        [
          ["Sapphire FUE", tier.fue],
          ["DHI", tier.dhi],
        ] as const
      ).map(([technique, price]) => ({
        "@type": "Offer",
        name: `${pkg.name}, ${technique}, up to ${formatGrafts(tier.maxGrafts)} grafts`,
        price: String(price),
        priceCurrency: "GBP",
        seller: organizationRef,
        itemOffered: {
          "@type": "Service",
          name: `${pkg.name} (${technique})`,
          url: absoluteUrl(pkg.href),
        },
      })),
    ),
  );

  const structuredData = compactSchemaList([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Hair transplant prices",
      url: absoluteUrl("/prices"),
      description,
      publisher: organizationRef,
      mainEntity: {
        "@type": "OfferCatalog",
        name: "London hair transplant packages",
        itemListElement: offers,
      },
    },
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Prices", path: "/prices" },
    ]),
    buildFaqSchema(faq),
  ]);

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`prices-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <section className="page-hero rounded-[40px] border border-[rgba(192,213,214,0.12)] p-6 sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/82">
            Our prices
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            Hair transplant prices and packages
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
            Fixed London prices, set by treatment, technique, and graft range rather than
            a per-graft rate. {inclusionsSentence} Your band is confirmed in writing at a
            free consultation.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              `Sapphire FUE from ${formatPrice(hair.tiers[0].fue)}`,
              `DHI from ${formatPrice(hair.tiers[0].dhi)}`,
              `Up to ${formatGrafts(hair.tiers[1].maxGrafts)} grafts from ${formatPrice(hair.tiers[1].fue)}`,
              `Turkiye from ${formatPrice(turkiyeFromPrice)}`,
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] px-3.5 py-2 text-sm text-white/78"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/assessment"
              className="inline-flex rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
            >
              Book free consultation
            </Link>
            <Link
              href="/hair-transplant-cost-london"
              className="inline-flex rounded-full border border-[rgba(192,213,214,0.28)] bg-[rgba(244,247,246,0.92)] px-5 py-3 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-[color:var(--surface-paper)]"
            >
              How our prices compare
            </Link>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {londonPackages.map((pkg) => {
            const notes = treatmentNotes[pkg.id];

            return (
              <article
                key={pkg.id}
                className="flex flex-col rounded-[30px] border border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] p-6 text-[color:var(--ink-950)] shadow-[0_24px_56px_rgba(6,47,64,0.08)] lg:p-7"
              >
                <div className="flex items-start gap-4">
                  <IconBadge name={notes.icon} tone="light" />
                  <h2 className="font-display text-3xl">{pkg.name}</h2>
                </div>
                <table className="mt-6 w-full border-separate border-spacing-0 text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                      <th className="border-b border-[rgba(8,58,79,0.1)] pb-3 font-medium">Grafts</th>
                      <th className="border-b border-[rgba(8,58,79,0.1)] pb-3 font-medium">Sapphire FUE</th>
                      <th className="border-b border-[rgba(8,58,79,0.1)] pb-3 font-medium">DHI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.tiers.map((tier) => (
                      <tr key={tier.maxGrafts}>
                        <td className="border-b border-[rgba(8,58,79,0.1)] py-3 text-[color:var(--ink-800)]">
                          Up to {formatGrafts(tier.maxGrafts)}
                        </td>
                        <td className="border-b border-[rgba(8,58,79,0.1)] py-3 font-display text-2xl">
                          {formatPrice(tier.fue)}
                        </td>
                        <td className="border-b border-[rgba(8,58,79,0.1)] py-3 font-display text-2xl">
                          {formatPrice(tier.dhi)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--ink-800)]">
                  {notes.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <Link
                  href={pkg.href}
                  className="mt-auto pt-5 text-sm font-semibold text-[color:var(--ink-950)] underline-offset-4 hover:underline"
                >
                  About {pkg.name.toLowerCase()}
                </Link>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              Included in every package
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              The price covers more than treatment day.
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-white/72">
              {packageInclusions.map((item) => (
                <li key={item} className="flex gap-3">
                  <IconBadge name="shield-check" tone="dark" size="sm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-white/60">
              Your written quote lists exactly what is included before you book, so you can
              compare it line by line against any other quote you have.
            </p>
          </section>

          <section className="rounded-[34px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
              Not listed above
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
              Eyebrow and moustache transplants
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)]">
              These are quoted individually after a free consultation. They are small but
              highly visible areas, where shape, hair direction, and density have to be
              planned before a fair price can be given.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
              <Link href="/services/eyebrow-transplant" className="text-[color:var(--ink-950)] underline-offset-4 hover:underline">
                Eyebrow transplant
              </Link>
              <Link href="/services/moustache-transplant" className="text-[color:var(--ink-950)] underline-offset-4 hover:underline">
                Moustache transplant
              </Link>
            </div>
          </section>
        </section>

        <section className="rounded-[34px] border border-[rgba(8,58,79,0.08)] bg-[color:var(--surface-subtle)] p-6 text-[color:var(--ink-950)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-500)]">
              Technique
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Sapphire FUE or DHI: what the {formatPrice(hair.tiers[0].dhi - hair.tiers[0].fue)} difference pays for
            </h2>
            <p className="mt-4 text-sm leading-7">
              Both methods extract follicles one at a time from the donor area. The
              difference is how they are placed. Neither is automatically better: the right
              one depends on your hair, the area being treated, and whether you want to avoid
              shaving, and your consultation should explain the recommendation rather than
              default to the more expensive option.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.24em] text-[color:var(--gold-500)]">
                  <th className="border-b border-[rgba(8,58,79,0.1)] px-4 py-3 font-medium" />
                  <th className="border-b border-l border-[rgba(8,58,79,0.1)] px-4 py-3 font-medium">Sapphire FUE</th>
                  <th className="border-b border-l border-[rgba(8,58,79,0.1)] px-4 py-3 font-medium">DHI</th>
                </tr>
              </thead>
              <tbody>
                {techniqueRows.map((row) => (
                  <tr key={row.label}>
                    <td className="border-b border-[rgba(8,58,79,0.1)] px-4 py-4 font-semibold">{row.label}</td>
                    <td className="border-b border-l border-[rgba(8,58,79,0.1)] px-4 py-4 leading-7">{row.fue}</td>
                    <td className="border-b border-l border-[rgba(8,58,79,0.1)] px-4 py-4 leading-7">{row.dhi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/fue-vs-dhi"
            className="mt-6 inline-flex text-sm font-semibold underline-offset-4 hover:underline"
          >
            Read the full FUE vs DHI comparison
          </Link>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
              How your price is confirmed
            </p>
            <div className="mt-6 grid gap-4">
              {confirmSteps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <IconBadge name={step.icon} tone="dark" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold-300)]/70">
                      Step {index + 1}
                    </p>
                    <p className="mt-1 font-display text-2xl text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-7 text-white/68">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-white/60">
              Prices apply to eligible cases confirmed at consultation. Cases beyond the
              largest band, or where the donor area cannot safely supply the grafts needed,
              are discussed individually.
            </p>
          </section>

          <section className="rounded-[34px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]">
              In per-graft terms
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)]">
              Under £1 a graft, but that is not the point.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)]">
              UK clinics commonly charge £3 to £5 per graft. Measured the same way, our
              Sapphire FUE package works out at around £{perGraftBase} a graft at{" "}
              {formatGrafts(hair.tiers[0].maxGrafts)} grafts, and £{perGraftLarge} at{" "}
              {formatGrafts(hair.tiers[1].maxGrafts)}. Per-graft pricing is still a weak way
              to choose a clinic, because it says nothing about who performs the procedure,
              how the graft count was reached, or what aftercare you get.
            </p>
            <Link
              href="/hair-transplant-cost-london"
              className="mt-5 inline-flex text-sm font-semibold text-[color:var(--ink-950)] underline-offset-4 hover:underline"
            >
              Read our full hair transplant cost guide
            </Link>
          </section>
        </section>

        <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Turkiye route
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Considering Turkey? Our curated route starts from {formatPrice(turkiyeFromPrice)}.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72">
            The Turkiye route is priced separately from the London packages above. The
            lower headline price comes with different trade-offs around travel, what you can
            verify in person, and follow-up, which our comparison sets out properly.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/uk-vs-turkey-hair-transplant" className="text-white underline-offset-4 hover:underline">
              UK vs Turkey compared
            </Link>
            <Link href="/why-turkiye" className="text-white underline-offset-4 hover:underline">
              Why Turkiye
            </Link>
          </div>
        </section>

        <AssessmentSection
          sourceLabel="prices"
          tone="dark"
          title="Find out which band your case falls into."
          intro="Share your concern and a few photos. The team replies the same working day and confirms your graft range, technique, and price in writing after your free consultation."
        />

        <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/76">
            Frequently asked questions
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Questions about our prices.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faq.map((item) => (
              <details key={item.question} className="panel-dark rounded-[24px] border p-5">
                <summary className="cursor-pointer text-base font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-white/68">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
