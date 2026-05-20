import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { blogPosts } from "@/app/lib/blogContent";
import { iconForHref } from "@/app/lib/iconography";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";

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

export default function BlogIndexPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hair transplant articles",
    url: absoluteUrl("/blog"),
    description:
      "Search-focused editorial guidance covering consultation, cost, standards, recovery, and treatment comparison questions.",
    about: {
      "@type": "Thing",
      name: siteName,
    },
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-14 lg:px-8 lg:pt-14"
      >
        <section className="section-dark rounded-[40px] p-6 text-white sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--gold-300)]/80">
              Articles
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.04] text-white sm:text-5xl lg:text-[4.4rem]">
              Search-led answers for patients comparing hair transplant routes.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
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
              className="panel-dark flex h-full flex-col overflow-hidden rounded-[30px] text-white"
            >
              <div className="relative aspect-[16/10] border-b border-[color:var(--line-inverse-soft)] bg-[rgba(192,213,214,0.12)]">
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
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
                    tone="dark"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/78">
                      {post.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-white">
                      <Link href={`/blog/${post.slug}`} className="transition hover:text-[color:var(--gold-300)]">
                        {post.title}
                      </Link>
                    </h2>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/68">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-white/50">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>Updated {post.updatedAt}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.keyTakeaways.slice(0, 2).map((takeaway) => (
                    <span
                      key={takeaway}
                      className="rounded-full border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] px-3 py-1.5 text-xs text-white/72"
                    >
                      {takeaway}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex rounded-full bg-[color:var(--gold-300)] px-4 py-2.5 text-sm font-semibold !text-black transition visited:!text-black hover:bg-[color:var(--gold-400)] hover:!text-black"
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
