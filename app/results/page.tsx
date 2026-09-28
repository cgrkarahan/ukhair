import type { Metadata } from "next";
import Link from "next/link";
import AssessmentSection from "@/app/components/AssessmentSection";
import ProofCaseCard from "@/app/components/ProofCaseCard";
import SiteShell from "@/app/components/SiteShell";
import { proofDisclaimer, type ApprovedProofCase } from "@/app/lib/proof";
import {
  buildBreadcrumbSchema,
  buildImageObjectNode,
  compactSchemaList,
  organizationRef,
} from "@/app/lib/schema";
import { absoluteUrl, buildMetadata } from "@/app/lib/seo";
import { getProofCasesContent } from "@/sanity/lib/content";

export const revalidate = 60;

const description =
  "Hair transplant results from our partner clinics, each shown with the area treated, the timeframe, and the patient's consent, plus how to read before-and-after photos critically.";

export async function generateMetadata(): Promise<Metadata> {
  const cases = await getProofCasesContent();
  const metadata = buildMetadata({
    title: "Hair Transplant Results | UK Hair Transplant",
    description,
    path: "/results",
  });

  // An empty gallery is not worth indexing.
  return cases.length > 0 ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

function imageNodes(proofCase: ApprovedProofCase) {
  const caption = `${proofCase.title}, ${proofCase.timeline}. Partner clinic case published with patient consent.`;

  return [
    proofCase.beforeImageSrc
      ? { src: proofCase.beforeImageSrc, alt: proofCase.beforeImageAlt, caption: `Before: ${caption}` }
      : undefined,
    proofCase.afterImageSrc
      ? { src: proofCase.afterImageSrc, alt: proofCase.afterImageAlt, caption: `After: ${caption}` }
      : undefined,
    proofCase.imageSrc ? { src: proofCase.imageSrc, alt: proofCase.imageAlt, caption } : undefined,
  ]
    .filter((image): image is NonNullable<typeof image> => Boolean(image))
    .map((image) => buildImageObjectNode(image));
}

const readingTips = [
  {
    title: "Check the timeframe",
    text: "Growth continues for 10 to 18 months. A photo taken a few weeks after surgery cannot show the final result.",
  },
  {
    title: "Look for like-for-like photos",
    text: "The same angle, lighting, and hair length in both images make a fair comparison. Wet, styled, or differently lit hair can flatter or hide a result.",
  },
  {
    title: "Match the case to yours",
    text: "A hairline result tells you little about crown work, and a strong donor area is not the same as yours. Look for cases like your own.",
  },
];

export default async function ResultsPage() {
  const cases = await getProofCasesContent();

  const structuredData = compactSchemaList([
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Hair transplant results",
      url: absoluteUrl("/results"),
      description,
      publisher: organizationRef,
      ...(cases.length > 0 ? { image: cases.flatMap(imageNodes) } : {}),
    },
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Results", path: "/results" },
    ]),
  ]);

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`results-schema-${index}`}
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
            Results
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            Hair transplant results from our partner clinics
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
            Real patients, each shown with the area treated and how long after surgery the
            photo was taken. We only publish a case when the patient has consented to it
            appearing on this site.
          </p>
        </section>

        <section className="surface-card rounded-[38px] p-6 sm:p-8 lg:p-10">
          {cases.length > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {cases.map((proofCase) => (
                  <ProofCaseCard key={proofCase.slug} proofCase={proofCase} />
                ))}
              </div>
              <p className="mt-6 max-w-3xl text-xs leading-6 text-[color:var(--ink-600)]">
                {proofDisclaimer}
              </p>
            </>
          ) : (
            <p className="max-w-3xl text-sm leading-7 text-[color:var(--ink-700)]">
              New cases are added as patients consent to sharing their results. In the
              meantime, a free consultation can include examples relevant to your own
              pattern of hair loss.
            </p>
          )}
        </section>

        <section className="section-dark rounded-[34px] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Reading before-and-after photos
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            What makes a result worth trusting.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {readingTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-[24px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-5"
              >
                <p className="font-display text-2xl text-white">{tip.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/70">{tip.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-white/60">
            For more on judging clinics, read{" "}
            <Link href="/blog/hair-transplant-red-flags" className="font-semibold text-white">
              hair transplant red flags
            </Link>{" "}
            and{" "}
            <Link href="/blog/how-to-read-hair-transplant-reviews" className="font-semibold text-white">
              how to read reviews
            </Link>
            .
          </p>
        </section>

        <AssessmentSection
          sourceLabel="results"
          tone="dark"
          title="Find out what is realistic for your hair."
          intro="Share your concern and a few photos. The team replies the same working day, and a consultation can walk through cases similar to yours."
        />
      </main>
    </SiteShell>
  );
}
