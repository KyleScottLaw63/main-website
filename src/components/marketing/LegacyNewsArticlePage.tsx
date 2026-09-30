import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FileClock,
  Scale,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { legacyArchiveNoticeText, type LegacyPost } from '@/lib/marketing/data/legacyPosts';
import { SITE_URL } from '@/lib/marketing/site';
import { attorneyEntityId } from '@/lib/marketing/structured-data';

export function LegacyNewsArticlePage({ article }: { article: LegacyPost }) {
  const pageUrl = `${SITE_URL}${article.path}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        headline: article.title,
        description: article.excerpt,
        datePublished: article.dateTime,
        dateModified: article.modifiedTime,
        inLanguage: 'en-US',
        mainEntityOfPage: pageUrl,
        // No isBasedOn: sourceUrl is the post's old WordPress address, which now 301s
        // to this page (so it names nothing new), and one of those old addresses still
        // carries a retired phone number (legacyPosts.json keeps it only as a redirect source).
        author: { '@id': attorneyEntityId('en') },
        publisher: { '@id': `${SITE_URL}/#legal-service` },
        ...(article.featuredImage
          ? { image: `${SITE_URL}${article.featuredImage}` }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'News',
            item: `${SITE_URL}/news`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="legacy-news-page">
      <StructuredData data={schema} />
      <SiteHeader />

      <article>
        <header className="legacy-news-hero">
          <nav className="news-detail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/news">
              <ArrowLeft aria-hidden="true" />
              News archive
            </Link>
          </nav>
          <div className="legacy-news-meta">
            <span>{article.category}</span>
            <time dateTime={article.dateTime}>
              <CalendarDays aria-hidden="true" />
              {article.date}
            </time>
          </div>
          <h1>{article.title}</h1>
          {article.excerpt ? <p>{article.excerpt}</p> : null}
        </header>

        <div className="legacy-news-layout">
          <div className="legacy-news-main">
            {article.featuredImage ? (
              <figure className="legacy-news-image">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 900px) 100vw, 760px"
                  loading="eager"
                />
              </figure>
            ) : null}

            {/* The same short, neutral line above every archived post: when it was first
                published, and that it is general information. Each post's own text states
                the law; nothing here speaks of accuracy, corrections, or later changes
                (legacyArchiveNoticeText, docs/website-content-compliance.md). */}
            <aside
              className="legacy-archive-note"
              aria-label="About this archived article"
            >
              <FileClock aria-hidden="true" />
              <p>{legacyArchiveNoticeText(article)}</p>
            </aside>

            {article.contentHtml ? (
              <div
                className="legacy-news-content"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            ) : (
              <div className="legacy-news-content legacy-news-empty">
                <p>
                  This short firm update was published under the title above.
                  Its original media is no longer available from the legacy
                  website.
                </p>
              </div>
            )}

            <aside
              className="legacy-related-links"
              aria-labelledby="related-practice-title"
            >
              <div>
                <p className="eyebrow">Related information</p>
                <h2 id="related-practice-title">Practice-area resources</h2>
              </div>
              <nav>
                {article.relatedLinks.map(([label, href]) => (
                  <Link href={href} key={href}>
                    {label}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </aside>

            <aside className="news-detail-disclaimer">
              <Scale aria-hidden="true" />
              <p>
                This page provides general information and is not legal advice.
                Prior results do not guarantee a similar outcome.
              </p>
            </aside>
          </div>

          <aside
            className="news-detail-sidebar"
            aria-label="Contact Kyle Scott Law"
          >
            <p className="eyebrow">Kyle Scott Law</p>
            <h2>Questions about a potential claim?</h2>
            <p>
              Call the Tustin office or send the basic facts for a confidential
              review.
            </p>
            <Link className="primary-button" href="/contact#case-review">
              Request a case review <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              className="news-detail-secondary-link"
              href="/news#article-archive"
            >
              Browse the article archive <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </article>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
