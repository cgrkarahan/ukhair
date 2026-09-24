import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPage from "@/app/components/LocationPage";
import TopicPage from "@/app/components/TopicPage";
import { locationPageList, locationPages } from "@/app/lib/locations";
import { buildMetadata } from "@/app/lib/seo";
import { topicPageList } from "@/app/lib/siteContent";
import { getTopicPageContent, getTopicPagesContent } from "@/sanity/lib/content";

type TopicRouteProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return [
    ...topicPageList.map((page) => ({ slug: page.slug })),
    ...locationPageList.map((page) => ({ slug: page.slug })),
  ];
}

export async function generateMetadata({
  params,
}: TopicRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const locationPage = locationPages[slug];

  if (locationPage) {
    return buildMetadata({
      title: locationPage.seoTitle,
      description: locationPage.description,
      path: `/${locationPage.slug}`,
      keywords: locationPage.keywords,
    });
  }

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
  const locationPage = locationPages[slug];

  if (locationPage) {
    const allPages = await getTopicPagesContent();
    const relatedPages = locationPage.relatedSlugs
      .map((relatedSlug) => allPages.find((entry) => entry.slug === relatedSlug))
      .filter((entry): entry is (typeof allPages)[number] => Boolean(entry));

    return <LocationPage page={locationPage} relatedPages={relatedPages} />;
  }

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
