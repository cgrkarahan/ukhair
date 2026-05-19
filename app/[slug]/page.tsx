import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicPage from "@/app/components/TopicPage";
import { buildMetadata } from "@/app/lib/seo";
import { topicPageList } from "@/app/lib/siteContent";
import { getTopicPageContent, getTopicPagesContent } from "@/sanity/lib/content";

type TopicRouteProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return topicPageList.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: TopicRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getTopicPageContent(slug);

  if (!page) {
    return buildMetadata({
      title: "Page not found",
      path: `/${slug}`,
    });
  }

  return buildMetadata({
    title: page.seoTitle,
    description: page.description,
    path: `/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function TopicRoute({ params }: TopicRouteProps) {
  const { slug } = await params;
  const page = await getTopicPageContent(slug);

  if (!page) {
    notFound();
  }

  const allPages = await getTopicPagesContent();
  const relatedPages = page.relatedSlugs
    .map((relatedSlug) => allPages.find((entry) => entry.slug === relatedSlug))
    .filter((entry): entry is (typeof allPages)[number] => Boolean(entry));

  return <TopicPage page={page} relatedPages={relatedPages} />;
}
