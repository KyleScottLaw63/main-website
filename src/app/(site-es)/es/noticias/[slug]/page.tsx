import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegacyNewsArticlePage } from '@/components/marketing/LegacyNewsArticlePage';
import { NewsArticlePage } from '@/components/marketing/NewsArticlePage';
import { newsArticleBySlug, newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import { spanishLegacyPostBySlug, spanishLegacyPostDescription, spanishLegacyPosts } from '@/lib/marketing/data/spanishLegacyPosts';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';
import { SITE_URL } from '@/lib/marketing/site';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...newsArticlesForLocale('es').map(({ slug }) => ({ slug })),
    ...spanishLegacyPosts.map(({ slug }) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticleBySlug('es', slug);
  const legacyArticle = spanishLegacyPostBySlug(slug);
  if (!article && !legacyArticle) return missingPageMetadata('es');

  if (legacyArticle) {
    const socialImage = legacyArticle.featuredImage ? `${SITE_URL}${legacyArticle.featuredImage}` : undefined;
    const description = spanishLegacyPostDescription(legacyArticle);
    return {
      title: `${legacyArticle.title} | Kyle Scott Law`,
      description,
      // Offered to search engines exactly when the English post is: image-only posts keep their pages
      // but are withheld. The sitemap applies the same test.
      robots: legacyArticle.indexable ? undefined : { index: false, follow: true },
      alternates: {
        canonical: `${SITE_URL}${legacyArticle.path}`,
        languages: {
          'en-US': `${SITE_URL}${legacyArticle.englishPath}`,
          'es-US': `${SITE_URL}${legacyArticle.path}`,
          'x-default': `${SITE_URL}${legacyArticle.englishPath}`,
        },
      },
      openGraph: {
        title: legacyArticle.title,
        description,
        type: 'article',
        locale: 'es_US',
        images: socialImage ? [socialImage] : [],
      },
      twitter: {
        card: socialImage ? 'summary_large_image' : 'summary',
        title: legacyArticle.title,
        description,
        images: socialImage ? [socialImage] : [],
      },
    };
  }

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
  if (article) return <NewsArticlePage article={article} />;
  const legacyArticle = spanishLegacyPostBySlug(slug);
  if (!legacyArticle) notFound();
  return <LegacyNewsArticlePage article={legacyArticle} locale="es" />;
}
