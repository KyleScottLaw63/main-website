import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Newspaper, Scale } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { LegacyNewsArchive } from '@/components/marketing/LegacyNewsArchive';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { caseStoryBySlug, caseStoryHeadline } from '@/lib/marketing/data/caseStories';
import { newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import { legacyPostSummary, legacyPosts } from '@/lib/marketing/data/legacyPosts';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { caseStoryPath } from '@/lib/marketing/data/results';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { newsCollectionStructuredData } from '@/lib/marketing/structured-data';

export const metadata: Metadata = {
  title: 'Latest News & Legal Articles | Kyle Scott Law',
  description:
    'Read Kyle Scott Law case results, firm news, and legal articles concerning personal injury matters in Orange County and California.',
  alternates: localizedAlternates('/news'),
};

const localizedNews = newsArticlesForLocale('en');
const caseAnnouncements = localizedNews
  .filter((item) => item.kind === 'case')
  .map((item) => ({ ...item, type: item.label, href: item.path }));
/**
 * The $5.75M verdict's case story joins the firm's case announcements, in the place of the Riverside
 * verdict post the firm deleted (the owner's choice, 2026-10-01). Newest first.
 */
const verdictStory = caseStoryBySlug('student-skull-fracture-verdict')!;
const verdictHeadline = caseStoryHeadline(verdictStory);
const caseNews = [
  ...caseAnnouncements.map(({ type, dateTime, date, result, title, excerpt, href }) => ({ type, dateTime, date, result, title, excerpt, href, cta: 'Read case update' })),
  { type: verdictHeadline.outcome, dateTime: verdictStory.resolved, date: String(verdictHeadline.year), result: verdictHeadline.figure, title: verdictHeadline.title, excerpt: verdictStory.summary, href: caseStoryPath(verdictStory.slug), cta: 'Read the case story' },
].sort((a, b) => b.dateTime.localeCompare(a.dateTime));
const legalArticles = localizedNews
  .filter((item) => item.kind === 'article')
  .map((item) => ({ ...item, category: item.label, href: item.path }));
const legacyArticleSummaries = legacyPosts.slice(0, 24).map(legacyPostSummary);

const newsCollectionSchema = newsCollectionStructuredData('en', [
  ...caseAnnouncements.map((item) => ({
    type: 'NewsArticle' as const,
    title: item.title,
    description: item.excerpt,
    datePublished: item.dateTime,
    url: item.href,
    sourceUrl: item.sourceUrl,
  })),
  ...legalArticles.map((item) => ({
    type: 'Article' as const,
    title: item.title,
    description: item.excerpt,
    datePublished: item.dateTime,
    url: item.href,
    sourceUrl: item.sourceUrl,
  })),
  ...legacyPosts.slice(0, 24).map((item) => ({
    type: 'Article' as const,
    title: item.title,
    description: item.excerpt,
    datePublished: item.dateTime,
    url: item.path,
    sourceUrl: item.sourceUrl,
  })),
]);

export default function NewsPage() {
  return (
    <main className="news-page">
      <StructuredData data={newsCollectionSchema} />
      <SiteHeader />

      <section className="news-page-hero" aria-labelledby="news-page-title">
        <div className="news-page-hero-copy">
          <p className="eyebrow">Latest news</p>
          <h1 id="news-page-title">Firm News &amp; Legal Articles</h1>
          <p>
            Case results, firm updates, and articles published by Kyle Scott
            Law.
          </p>
          <nav className="news-page-jump-links" aria-label="News page sections">
            <a href="#case-news">Case Results &amp; Firm News</a>
            <a href="#legal-articles">Legal Articles</a>
            <a href="#legal-guides">Legal Guides</a>
            <a href="#article-archive">Article Archive</a>
          </nav>
        </div>
      </section>

      <section
        className="news-case-stream"
        id="case-news"
        aria-labelledby="case-news-title"
      >
        <header className="news-stream-heading">
          <div>
            <p>Published matters</p>
            <h2 id="case-news-title">Case Results &amp; Firm News</h2>
          </div>
          <Link href="/results">
            View all results <ArrowRight aria-hidden="true" />
          </Link>
        </header>
        <div className="news-case-grid">
          {caseNews.map((item, index) => (
            <article
              className="news-case-card"
              id={`story-${index + 1}`}
              key={item.href}
            >
              <div className="news-case-meta">
                <span>{item.type}</span>
                <time dateTime={item.dateTime}>{item.date}</time>
              </div>
              <strong className="news-case-result">{item.result}</strong>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <Link href={item.href}>
                {item.cta} <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <p className="news-results-disclaimer">
          <Scale aria-hidden="true" />
          Prior results do not guarantee a similar outcome.
        </p>
      </section>

      <section
        className="news-article-stream"
        id="legal-articles"
        aria-labelledby="legal-articles-title"
      >
        <header className="news-article-heading">
          <div>
            <p className="eyebrow">From the firm</p>
            <h2 id="legal-articles-title">Featured Legal Articles</h2>
          </div>
          <p>
            General information from Kyle Scott Law concerning personal injury
            claims and the legal process. These articles are not legal advice.
          </p>
        </header>
        <div className="news-article-grid">
          {legalArticles.map((item, index) => (
            <article
              className="news-article-card"
              id={`story-${caseNews.length + index + 1}`}
              key={item.href}
            >
              <span className="news-article-icon">
                <BookOpen aria-hidden="true" />
              </span>
              <div className="news-article-card-copy">
                <div className="news-article-meta">
                  <span>{item.category}</span>
                  <time dateTime={item.dateTime}>{item.date}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link href={item.href}>
                  Read article <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="news-article-note">
          <Newspaper aria-hidden="true" />
          Browse the complete publication history below.
        </p>
      </section>

      <section className="news-guide-feature" id="legal-guides" aria-labelledby="news-guide-title">
        <header><div><p className="eyebrow">Legal guides</p><h2 id="news-guide-title">Start with a direct answer.</h2></div><p>In-depth, source-backed guides to California injury deadlines, evidence, insurance, and the legal process.</p></header>
        <div>{legalGuides.slice(0, 3).map((guide) => <article key={guide.slug}><span>{guide.category}</span><h3>{guide.title}</h3><p>{guide.description}</p><Link href={guide.path}>Read guide <ArrowRight aria-hidden="true" /></Link></article>)}</div>
        <Link className="news-guide-all" href="/guides">Browse all {legalGuides.length} legal guides <ArrowRight aria-hidden="true" /></Link>
      </section>

      <LegacyNewsArchive
        posts={legacyArticleSummaries}
        totalCount={legacyPosts.length}
      />

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
