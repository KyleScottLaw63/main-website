import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStoryPage } from '@/components/marketing/CaseStoryPage';
import { spanishCaseStories, spanishCaseStoryBySlug, spanishCaseStoryTitle } from '@/lib/marketing/data/spanishCaseStories';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';
import { SITE_URL } from '@/lib/marketing/site';
import { spanishCaseStoryPath } from '@/lib/marketing/spanishResults';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return spanishCaseStories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = spanishCaseStoryBySlug(slug);
  if (!story) return missingPageMetadata('es');
  const title = spanishCaseStoryTitle(story);
  const image = `${SITE_URL}/og-default.jpg`;
  return {
    title,
    description: story.summary,
    // hreflang pairs the story with its English page once i18n.ts lists caseStoryLocalizedRoutes.
    alternates: localizedAlternates(spanishCaseStoryPath(story.slug)),
    openGraph: { title, description: story.summary, type: 'article', locale: 'es_US', images: [image] },
    twitter: { card: 'summary_large_image', title, description: story.summary, images: [image] },
  };
}

export default async function SpanishCaseStoryRoute({ params }: PageProps) {
  const { slug } = await params;
  const story = spanishCaseStoryBySlug(slug);
  if (!story) notFound();
  return <CaseStoryPage story={story} locale="es" />;
}
