import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalGuidePage } from '@/components/marketing/LegalGuidePage';
import { spanishLegalGuideBySlug, spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';
import { SITE_URL } from '@/lib/marketing/site';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return spanishLegalGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = spanishLegalGuideBySlug(slug);
  if (!guide) return missingPageMetadata('es');
  const image = `${SITE_URL}/legal-guides-hero.webp`;
  return {
    title: guide.seoTitle,
    description: guide.description,
    // Paired with the English guide it translates.
    alternates: localizedAlternates(guide.path),
    openGraph: { title: guide.title, description: guide.description, type: 'article', locale: 'es_US', images: [image] },
    twitter: { card: 'summary_large_image', title: guide.title, description: guide.description, images: [image] },
  };
}

export default async function SpanishGuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = spanishLegalGuideBySlug(slug);
  if (!guide) notFound();
  return <LegalGuidePage guide={guide} locale="es" />;
}
