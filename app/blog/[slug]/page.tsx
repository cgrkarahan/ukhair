import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AssessmentSection from "@/app/components/AssessmentSection";
import { IconBadge } from "@/app/components/SiteIcon";
import SiteShell from "@/app/components/SiteShell";
import { blogPosts, blogPostsBySlug } from "@/app/lib/blogContent";
import { iconForHref } from "@/app/lib/iconography";
import { absoluteUrl, buildMetadata, siteName } from "@/app/lib/seo";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: post.imageSrc,
  });
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      dateModified: post.updatedAt,
      datePublished: post.updatedAt,
      image: absoluteUrl(post.imageSrc),
      author: {
        "@type": "Organization",
        name: siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
      },
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
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
          name: "Articles",
          item: absoluteUrl("/blog"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: absoluteUrl(`/blog/${post.slug}`),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <SiteShell>
      {structuredData.map((schema, index) => (
        <script
          key={`blog-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        id="main"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-28 pt-10 lg:gap-14 lg:px-8 lg:pt-14"
      >
        <section className="section-dark rounded-[40px] p-6 text-white sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/80">
              <Link href="/blog" className="transition hover:text-white">
                Articles
              </Link>
              <span>•</span>
              <span>{post.eyebrow}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-[1.04] text-white sm:text-5xl lg:text-[4.25rem]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              {post.description}
            </p>
          </div>

          <div className="mt-8 relative aspect-[16/8.8] overflow-hidden rounded-[30px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)]">
            <Image
              src={post.imageSrc}
              alt={post.imageAlt}
              fill
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover"
              style={{
                objectPosition: post.imagePosition ?? "center",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,58,79,0.04)_0%,rgba(8,58,79,0.16)_100%)]" />
          </div>

          <div className="mt-8 rounded-[30px] border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/76">
              Short answer
            </p>
            <p className="mt-3 max-w-4xl text-base leading-8 text-white/84">
              {post.answerSummary}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.keyTakeaways.map((takeaway) => (
              <span
                key={takeaway}
                className="rounded-full border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] px-3.5 py-2 text-sm text-white/78"
              >
                {takeaway}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
            <div className="space-y-8">
              {post.sections.map((section, index) => (
                <section key={section.heading} className="border-b border-[rgba(192,213,214,0.1)] pb-8 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    <IconBadge
                      name={iconForHref(`/blog/${post.slug}`)}
                      tone="dark"
                      size="sm"
                    />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--gold-300)]/76">
                        Section {index + 1}
                      </p>
                      <h2 className="mt-3 font-display text-3xl text-white">
                        {section.heading}
                      </h2>
                      <div className="mt-4 space-y-4 text-sm leading-7 text-white/72 sm:text-base">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {section.bullets ? (
                        <ul className="mt-5 space-y-3 text-sm leading-7 text-white/72 sm:text-base">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[color:var(--gold-300)]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <section className="panel-dark rounded-[32px] p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/76">
                Why this matters
              </p>
              <p className="mt-4 text-sm leading-7 text-white/72">
                These articles are written to answer the practical questions most
                patients have before they move into a consultation. Use them to
                compare routes, understand standards, and decide what to ask
                next.
              </p>
            </section>

            <section className="panel-dark rounded-[32px] p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold-300)]/76">
                Related reading
              </p>
              <div className="mt-5 space-y-4">
                {post.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-[24px] border border-[rgba(192,213,214,0.12)] bg-[rgba(192,213,214,0.06)] p-4 transition hover:border-[rgba(192,213,214,0.24)] hover:bg-[rgba(192,213,214,0.1)]"
                  >
                    <div className="flex items-start gap-3">
                      <IconBadge name={iconForHref(link.href)} tone="dark" size="sm" />
                      <div>
                        <h3 className="font-display text-2xl text-white">
                          {link.label}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-white/68">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="section-dark rounded-[38px] p-6 text-white sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold-300)]/78">
            Frequently asked questions
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Quick answers around {post.title.toLowerCase()}.
          </h2>
          <div className="mt-8 grid gap-4">
            {post.faq.map((item) => (
              <details
                key={item.question}
                className="panel-dark rounded-[26px] p-5"
              >
                <summary className="cursor-pointer text-base font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-white/68">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <AssessmentSection
          sourceLabel={`blog-${post.slug}`}
          tone="dark"
          title="Book your free consultation."
          intro="If you want advice specific to your hair loss pattern, goals, timing, and whether you want to stay in the UK or also compare Turkey, send an enquiry and the team can guide the next step."
        />
      </main>
    </SiteShell>
  );
}
