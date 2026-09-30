import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NewsArticlePage } from '@/components/marketing/NewsArticlePage';
import { LegacyNewsArticlePage } from '@/components/marketing/LegacyNewsArticlePage';
import { legacyPostBySlug, legacyPostDescription, legacyPostIsIndexable, legacyPosts } from '@/lib/marketing/data/legacyPosts';
import { newsArticleBySlug, newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';
import { SITE_URL } from '@/lib/marketing/site';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...newsArticlesForLocale('en').map(({ slug }) => ({ slug })),
    ...legacyPosts.map(({ slug }) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticleBySlug('en', slug);
  const legacyArticle = legacyPostBySlug(slug);
  if (!article && !legacyArticle) return missingPageMetadata('en');

  if (legacyArticle) {
    const socialImage = legacyArticle.featuredImage
      ? `${SITE_URL}${legacyArticle.featuredImage}`
      : undefined;
    const description = legacyPostDescription(legacyArticle);
    return {
      title: `${legacyArticle.title} | Kyle Scott Law`,
      description,
      // Image-only posts, and posts withheld because their legal content could
      // not be made accurate, keep their URLs (old links still work) but are not
      // offered to search engines. The sitemap applies the same test.
      robots: legacyPostIsIndexable(legacyArticle) ? undefined : { index: false, follow: true },
      alternates: {
        canonical: `${SITE_URL}${legacyArticle.path}`,
        languages: {
          'en-US': `${SITE_URL}${legacyArticle.path}`,
          'x-default': `${SITE_URL}${legacyArticle.path}`,
        },
      },
      openGraph: {
        title: legacyArticle.title,
        description,
        type: 'article',
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

  if (!article) return missingPageMetadata('en');

  return {
    title: `${article.title} | Kyle Scott Law`,
    description: article.excerpt,
    alternates: {
      canonical: `${SITE_URL}${article.path}`,
      languages: {
        'en-US': `${SITE_URL}${article.path}`,
        'es-US': `${SITE_URL}${article.alternatePath}`,
        'x-default': `${SITE_URL}${article.path}`,
      },
    },
  };
}

export default async function EnglishNewsArticle({ params }: PageProps) {
  const { slug } = await params;
  const article = newsArticleBySlug('en', slug);
  if (article) return <NewsArticlePage article={article} />;
  const legacyArticle = legacyPostBySlug(slug);
  if (!legacyArticle) notFound();
  return <LegacyNewsArticlePage article={legacyArticle} />;
}
