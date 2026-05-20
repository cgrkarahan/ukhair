import type { Metadata } from "next";
import AssessmentSection from "@/app/components/AssessmentSection";
import SiteShell from "@/app/components/SiteShell";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Consultation | UK Hair Transplant",
  description:
    "Book a free hair transplant consultation with clearer guidance on planning, standards, recovery, and next steps.",
  path: "/assessment",
  keywords: [
    "free hair transplant consultation london",
    "hair transplant consultation london",
    "free hair transplant consultation",
  ],
});

export default function AssessmentPage() {
  return (
    <SiteShell>
      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-16 lg:px-8 lg:pt-14"
      >
        <AssessmentSection
          sourceLabel="assessment-page"
          tone="dark"
          title="Book your free consultation."
          intro="This is the main route for a first enquiry. Once your request is submitted, the team can reply with the next useful questions, photo guidance, or a consultation recommendation."
          formFirst
        />
      </main>
    </SiteShell>
  );
}
