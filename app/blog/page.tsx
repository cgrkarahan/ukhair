import type { Metadata } from "next";
import Link from "next/link";
import BlogImage from "@/app/components/BlogImage";
import { IconBadge } from "@/app/components/SiteIcon";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import SiteShell from "@/app/components/SiteShell";
import { iconForHref } from "@/app/lib/iconography";
import { buildBreadcrumbSchema, organizationRef } from "@/app/lib/schema";
import { absoluteUrl, buildMetadata } from "@/app/lib/seo";
import { getBlogPostsContent } from "@/sanity/lib/content";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Hair Transplant Articles | UK Hair Transplant",
  description:
    "Search-focused hair transplant articles covering consultations, cost in London, clinic selection, UK vs Turkey, recovery, and female suitability.",
  path: "/blog",
  keywords: [
    "hair transplant articles",
    "hair transplant london blog",
    "hair transplant consultation guide",
    "hair transplant recovery guide",
  ],
});

function formatUpdatedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogIndexPage() {
  const blogPosts = await getBlogPostsContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hair transplant articles",
    url: absoluteUrl("/blog"),
    description:
      "Search-focused editorial guidance covering consultation, cost, standards, recovery, and treatment comparison questions.",
    publisher: organizationRef,
  };
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Articles", path: "/blog" },
  ]);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-8 lg:gap-14 lg:px-8 lg:pt-12"
      >
        <section className="hero-light rounded-[32px] p-6 text-[color:var(--ink-950)] sm:p-8 lg:p-10">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Guides", path: "/blog" }]} className="mb-6" />
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
              Articles
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.04] text-[color:var(--ink-950)] sm:text-5xl lg:text-[4.4rem]">
              Search-led answers for patients comparing hair transplant routes.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[color:var(--ink-700)] sm:text-lg">
              Start here if you want clearer answers on consultations, pricing,
              clinic standards, UK versus Turkey, recovery, and female
              suitability before booking a free consultation.
            </p>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="surface-card flex h-full flex-col overflow-hidden rounded-[28px] text-[color:var(--ink-950)]"
            >
              <div className="relative aspect-[16/10] border-b border-[color:var(--line-soft)] bg-[color:var(--surface-subtle)]">
                <BlogImage
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition: post.imagePosition ?? "center",
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,58,79,0.06)_0%,rgba(8,58,79,0.18)_100%)]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start gap-4">
                  <IconBadge
                    name={iconForHref(`/blog/${post.slug}`)}
                    tone="light"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold-500)]">
                      {post.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-2xl text-[color:var(--ink-950)]">
                      <Link href={`/blog/${post.slug}`} className="transition hover:text-[color:var(--sage-600)]">
                        {post.title}
                      </Link>
                    </h2>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-[color:var(--ink-700)]">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--ink-600)]">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <time dateTime={post.updatedAt}>
                    Updated {formatUpdatedDate(post.updatedAt)}
                  </time>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.keyTakeaways.slice(0, 2).map((takeaway) => (
                    <span
                      key={takeaway}
                      className="rounded-full border border-[color:var(--line-soft)] bg-white/75 px-3 py-1.5 text-xs text-[color:var(--ink-700)]"
                    >
                      {takeaway}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex rounded-full border border-[color:var(--line-strong)] px-4 py-2.5 text-sm font-semibold text-[color:var(--ink-950)] transition hover:bg-white"
                  >
                    Read article
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
