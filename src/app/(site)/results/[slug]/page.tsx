import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStoryPage } from '@/components/marketing/CaseStoryPage';
import { caseStories, caseStoryBySlug, caseStoryTitle } from '@/lib/marketing/data/caseStories';
import { caseStoryPath } from '@/lib/marketing/data/results';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';
import { SITE_URL } from '@/lib/marketing/site';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = caseStoryBySlug(slug);
  if (!story) return missingPageMetadata('en');
  const title = caseStoryTitle(story);
  const image = `${SITE_URL}/og-default.jpg`;
  return {
    title,
    description: story.summary,
    // English only: a story has no Spanish page, so hreflang points at itself.
    alternates: localizedAlternates(caseStoryPath(story.slug)),
    openGraph: { title, description: story.summary, type: 'article', images: [image] },
    twitter: { card: 'summary_large_image', title, description: story.summary, images: [image] },
  };
}

export default async function CaseStoryRoute({ params }: PageProps) {
  const { slug } = await params;
  const story = caseStoryBySlug(slug);
  if (!story) notFound();
  return <CaseStoryPage story={story} />;
}
