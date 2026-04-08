import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";
import {
  serviceCatalog,
  serviceCatalogBySlug,
} from "@/app/services/serviceData";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return serviceCatalog.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceCatalogBySlug[slug];

  if (!service) {
    return buildMetadata({
      title: "Service not found",
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceCatalogBySlug[slug];
  const maleHairTransplantContent =
    slug === "male-hair-transplant"
      ? {
          overview:
            "A male hair transplant moves healthy follicles from the back or sides of your scalp to thinning or bald areas, rebuilding a fuller hairline that continues to grow long term. We use FUE (Follicular Unit Extraction), where grafts are harvested one by one, leaving small marks that typically fade to near-invisible dots. Performed by our GMC-registered Turkish hair-transplant experts, the procedure is designed to deliver natural density with minimal downtime.",
          cta:
            "Regain density, redefine your hairline, and restore confidence with a long-term result. Schedule a consultation with our GMC-registered Turkish hair-transplant experts at Liv & Harley Street Hospital to take the first step toward natural hair restoration.",
          consultationIncludes: [
            "Hairline and donor assessment with graft-range planning",
            "A surgical recommendation matched to current loss and future progression",
            "Recovery, aftercare, and realistic timeline guidance",
          ],
          sections: [
            {
              title: "Who should have it?",
              items: [
                "Men with male-pattern baldness (androgenetic alopecia), typically Norwood stages II-V.",
                "Patients with stable hair loss and no major rapid shedding over the last year.",
                "Those with adequate donor hair at the back or sides of the scalp.",
                "People looking for a permanent, low-maintenance solution beyond wigs or medication alone.",
              ],
            },
            {
              title: "Who can take it?",
              items: [
                "Adults in good overall health, including non-smokers or those willing to stop two weeks before and after treatment.",
                "Individuals with realistic expectations around density, graft use, and hairline design.",
                "Patients committed to following aftercare instructions and follow-up reviews.",
              ],
            },
            {
              title: "Who might need to delay or avoid it?",
              items: [
                "People with active scalp disease such as psoriasis flare-ups or infection.",
                "Patients with severe diffuse thinning and poor donor density.",
                "Those with uncontrolled medical conditions, including bleeding disorders or poorly managed diabetes.",
                "Anyone expecting teenage-level density despite limited donor supply.",
              ],
            },
          ],
        }
      : null;

  if (!service) {
    notFound();
  }

  const relatedServices = serviceCatalog.filter(
    (entry) => entry.slug !== service.slug,
  );
  const serviceFaqs = [
    {
      question: `Who is ${service.title.toLowerCase()} best for?`,
      answer: service.bestFor,
    },
    {
      question: `What outcome should I expect from ${service.title.toLowerCase()}?`,
      answer: service.outcome,
    },
    {
      question: `What happens in a ${service.title.toLowerCase()} consultation?`,
      answer: service.consultation.join(". "),
    },
  ];
  const serviceStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      description: service.shortDescription,
      url: absoluteUrl(`/services/${service.slug}`),
      areaServed: ["London", "United Kingdom"],
      provider: {
        "@type": "MedicalClinic",
        name: siteName,
        url: absoluteUrl("/"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: serviceFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: service.title,
          item: absoluteUrl(`/services/${service.slug}`),
        },
      ],
    },
  ];

  return (
    <div className="bg-forest min-h-screen">
      {serviceStructuredData.map((schema, index) => (
        <script
          key={`service-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-24 pt-12">
        <Link
          href="/#services"
          className="text-sm font-semibold text-[color:var(--leaf-700)] hover:text-[color:var(--leaf-500)]"
        >
          ← Back to services
        </Link>

        <section className="w-full rounded-[28px] border border-[color:var(--leaf-200)] bg-white/80 p-6 shadow-soft sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--leaf-600)]">
                {service.badge}
              </p>
              <h1 className="mt-3 max-w-2xl font-display text-3xl leading-[1] text-[color:var(--leaf-900)] sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--leaf-700)]">
                {service.intro}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {service.highlights.map((highlight) => (
                  <span
                    key={highlight.title}
                    className="rounded-full border border-[color:var(--leaf-200)] bg-white/75 px-3.5 py-1.5 text-sm text-[color:var(--leaf-700)]"
                  >
                    {highlight.title}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/#consultation"
                  className="inline-flex rounded-full bg-[color:var(--leaf-700)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--leaf-600)]"
                >
                  Request consultation
                </Link>
                <Link
                  href="/#results"
                  className="inline-flex rounded-full border border-[color:var(--leaf-300)] px-5 py-2.5 text-sm font-semibold text-[color:var(--leaf-700)] transition hover:bg-white"
                >
                  View results
                </Link>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[18px] border border-[color:var(--leaf-200)] bg-[color:var(--leaf-100)]/50 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--leaf-600)]">
                  Best for
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--leaf-800)]">
                  {service.bestFor}
                </p>
              </div>
              <div className="rounded-[18px] border border-[color:var(--leaf-200)] bg-[color:var(--leaf-100)]/50 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--leaf-600)]">
                  Expected outcome
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--leaf-800)]">
                  {service.outcome}
                </p>
              </div>
              <div className="rounded-[18px] border border-[color:var(--leaf-200)] bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--leaf-600)]">
                  Consultation
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--leaf-800)]">
                  Surgeon-led planning with clear graft guidance and aftercare.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {service.highlights.map((highlight) => (
            <article
              key={`${service.slug}-${highlight.title}`}
              className="rounded-[24px] border border-[color:var(--leaf-200)] bg-white/80 p-6 shadow-soft"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--leaf-600)]">
                {highlight.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--leaf-700)]">
                {highlight.text}
              </p>
            </article>
          ))}
        </section>

        {maleHairTransplantContent ? (
          <section className="rounded-[32px] border border-[color:var(--leaf-200)] bg-white/80 p-8 shadow-soft sm:p-10">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--leaf-600)]">
                Male Hair Transplant Guide
              </p>
              <h2 className="mt-4 font-display text-3xl text-[color:var(--leaf-900)] sm:text-4xl">
                A clear treatment overview, who it suits, and when it may need to wait.
              </h2>
            </div>

            <div className="mt-8 border-t border-[color:var(--leaf-200)] pt-8">
              <h3 className="font-display text-2xl text-[color:var(--leaf-900)]">
                What is Male Hair Transplant?
              </h3>
              <p className="mt-4 max-w-4xl text-base leading-8 text-[color:var(--leaf-700)]">
                {maleHairTransplantContent.overview}
              </p>
            </div>

            <div className="mt-8 border-t border-[color:var(--leaf-200)] pt-8">
              <h3 className="font-display text-2xl text-[color:var(--leaf-900)]">
                Why Patients Choose It
              </h3>
              <p className="mt-4 max-w-4xl text-base leading-8 text-[color:var(--leaf-700)]">
                {maleHairTransplantContent.cta}
              </p>
            </div>

            <div className="mt-8 border-t border-[color:var(--leaf-200)] pt-8">
              <h3 className="font-display text-2xl text-[color:var(--leaf-900)]">
                Consultation Includes
              </h3>
              <ul className="mt-5 max-w-4xl space-y-3 text-base leading-8 text-[color:var(--leaf-700)]">
                {maleHairTransplantContent.consultationIncludes.map((item) => (
                  <li key={item} className="list-inside list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {maleHairTransplantContent.sections.map((section) => (
              <div
                key={section.title}
                className="mt-8 border-t border-[color:var(--leaf-200)] pt-8"
              >
                <h3 className="font-display text-2xl text-[color:var(--leaf-900)]">
                  {section.title}
                </h3>
                <ul className="mt-5 max-w-4xl space-y-3 text-base leading-8 text-[color:var(--leaf-700)]">
                  {section.items.map((item) => (
                    <li key={item} className="list-inside list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ) : (
          <section className="rounded-[32px] border border-[color:var(--leaf-200)] bg-white/80 p-8 shadow-soft sm:p-10">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--leaf-600)]">
                {service.title} Guide
              </p>
              <h2 className="mt-4 font-display text-3xl text-[color:var(--leaf-900)] sm:text-4xl">
                {service.guideHeading}
              </h2>
            </div>

            <div className="mt-8 border-t border-[color:var(--leaf-200)] pt-8">
              {service.guideSections.map((section, index) => (
                <div
                  key={section.title}
                  className={index === 0 ? "" : "mt-8 border-t border-[color:var(--leaf-200)] pt-8"}
                >
                  <h3 className="font-display text-2xl text-[color:var(--leaf-900)]">
                    {section.title}
                  </h3>
                  <div className="mt-4 max-w-4xl space-y-4 text-base leading-8 text-[color:var(--leaf-700)]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-8 border-t border-[color:var(--leaf-200)] pt-8">
                <h3 className="font-display text-2xl text-[color:var(--leaf-900)]">
                  Consultation includes
                </h3>
                <ul className="mt-5 max-w-4xl space-y-3 text-base leading-8 text-[color:var(--leaf-700)]">
                  {service.consultation.map((item) => (
                    <li key={item} className="list-inside list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] border border-[color:var(--leaf-200)] bg-white/80 p-8 shadow-soft sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--leaf-600)]">
              Service FAQ
            </p>
            <h2 className="mt-4 font-display text-3xl text-[color:var(--leaf-900)] sm:text-4xl">
              Practical questions patients ask before booking.
            </h2>
            <div className="mt-8 space-y-4">
              {serviceFaqs.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-[color:var(--leaf-200)] bg-white/70 p-4"
                >
                  <summary className="cursor-pointer font-semibold text-[color:var(--leaf-900)]">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--leaf-700)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[color:var(--leaf-200)] bg-white/80 p-8 shadow-soft sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--leaf-600)]">
              Related services
            </p>
            <h2 className="mt-4 font-display text-3xl text-[color:var(--leaf-900)] sm:text-4xl">
              Explore other treatment paths.
            </h2>
            <div className="mt-8 grid gap-4">
              {relatedServices.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/services/${entry.slug}`}
                  className="rounded-2xl border border-[color:var(--leaf-200)] bg-[color:var(--leaf-100)]/50 p-4 transition hover:bg-white"
                >
                  <p className="font-semibold text-[color:var(--leaf-900)]">
                    {entry.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--leaf-700)]">
                    {entry.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
