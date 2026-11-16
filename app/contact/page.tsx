import type { Metadata } from "next";
import AssessmentSection from "@/app/components/AssessmentSection";
import SecondaryContactActions from "@/app/components/SecondaryContactActions";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import SiteShell from "@/app/components/SiteShell";
import { organizationRef } from "@/app/lib/schema";
import { absoluteUrl, buildMetadata } from "@/app/lib/seo";
import { getSiteSettingsContent } from "@/sanity/lib/content";

const contactDescription =
  "Get in touch with UK Hair Transplant, book a free consultation, and use the available call or WhatsApp contact options.";

export const metadata: Metadata = buildMetadata({
  title: "Contact | UK Hair Transplant",
  description: contactDescription,
  path: "/contact",
});

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettingsContent();
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact UK Hair Transplant",
      url: absoluteUrl("/contact"),
      description: contactDescription,
      mainEntity: organizationRef,
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
          name: "Contact",
          item: absoluteUrl("/contact"),
        },
      ],
    },
  ];

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`contact-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-8 lg:gap-14 lg:px-8 lg:pt-12"
      >
        <section className="hero-light rounded-[32px] p-6 sm:p-8 lg:p-10">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} className="mb-6" />
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
              Contact
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.02] text-[color:var(--ink-950)] sm:text-5xl lg:text-6xl">
              Speak to the team or book your free consultation.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-700)] sm:text-lg">
              The main route is the consultation form, but you can also use the available
              phone or WhatsApp options if you need to send extra details.
            </p>
          </div>
        </section>

        <section className="surface-light rounded-[38px] p-6 text-[color:var(--ink-950)] sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
            Contact details
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--ink-950)] sm:text-4xl">
            Contact routes
          </h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--ink-700)]">
            Email:{" "}
            <a href={`mailto:${settings.email}`} className="font-semibold text-[color:var(--ink-950)]">
              {settings.email}
            </a>
          </p>
          <SecondaryContactActions tone="dark" className="mt-6" />
        </section>

        <AssessmentSection
          sourceLabel="contact-page"
          tone="dark"
          title="Book your free consultation from the contact page."
          intro="Use this route if you want one clear place to submit your details, then follow up with WhatsApp or phone if you need to send photos or extra questions."
        />
      </main>
    </SiteShell>
  );
}
