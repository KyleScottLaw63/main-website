import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NewsArticlePage } from '@/components/marketing/NewsArticlePage';
import { newsArticleBySlug, newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';
import { SITE_URL } from '@/lib/marketing/site';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsArticlesForLocale('es').map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticleBySlug('es', slug);
  if (!article) return missingPageMetadata('es');

  return {
    title: `${article.title} | Kyle Scott Law`,
    description: article.excerpt,
    alternates: {
      canonical: `${SITE_URL}${article.path}`,
      languages: {
        'en-US': `${SITE_URL}${article.alternatePath}`,
        'es-US': `${SITE_URL}${article.path}`,
        'x-default': `${SITE_URL}${article.alternatePath}`,
      },
    },
  };
}

export default async function SpanishNewsArticle({ params }: PageProps) {
  const { slug } = await params;
  const article = newsArticleBySlug('es', slug);
  if (!article) notFound();
  return <NewsArticlePage article={article} />;
}
