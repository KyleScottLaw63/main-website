import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalGuidePage } from '@/components/marketing/LegalGuidePage';
import { legalGuideBySlug, legalGuides } from '@/lib/marketing/data/legalGuides';
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
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}${guide.path}`, languages: { 'en-US': `${SITE_URL}${guide.path}`, 'x-default': `${SITE_URL}${guide.path}` } },
    openGraph: { title: guide.title, description: guide.description, type: 'article', images: [image] },
    twitter: { card: 'summary_large_image', title: guide.title, description: guide.description, images: [image] },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = legalGuideBySlug(slug);
  if (!guide) notFound();
  return <LegalGuidePage guide={guide} />;
}
