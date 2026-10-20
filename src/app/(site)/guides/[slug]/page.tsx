import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalGuidePage } from '@/components/marketing/LegalGuidePage';
import { legalGuideBySlug, legalGuides } from '@/lib/marketing/data/legalGuides';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';
import { SITE_URL } from '@/lib/marketing/site';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = legalGuideBySlug(slug);
  if (!guide) return missingPageMetadata('en');
  const image = `${SITE_URL}/legal-guides-hero.webp`;
  // The short search-result text; the guide's own description is shown on the page.
  const description = guide.metaDescription ?? guide.description;
  return {
    title: guide.seoTitle,
    description,
    // Paired with its Spanish translation when there is one; otherwise hreflang points at itself.
    alternates: localizedAlternates(guide.path),
    openGraph: { title: guide.title, description, type: 'article', images: [image] },
    twitter: { card: 'summary_large_image', title: guide.title, description, images: [image] },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = legalGuideBySlug(slug);
  if (!guide) notFound();
  return <LegalGuidePage guide={guide} />;
}
