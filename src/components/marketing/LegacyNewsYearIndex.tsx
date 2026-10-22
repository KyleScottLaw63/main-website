import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { LegacyPostSummary } from '@/lib/marketing/data/legacyPosts';
import type { SiteLocale } from '@/lib/marketing/i18n';

const copy = {
  en: {
    eyebrow: 'Every article',
    title: 'Archive by year',
    intro: 'Every archived article, listed by the year it was first published.',
    count: (count: number) => `${count} ${count === 1 ? 'article' : 'articles'}`,
  },
  es: {
    eyebrow: 'Todos los artículos',
    title: 'Archivo por año',
    intro: 'Todos los artículos archivados, ordenados por el año en que se publicaron por primera vez.',
    count: (count: number) => `${count} ${count === 1 ? 'artículo' : 'artículos'}`,
  },
} as const;

/**
 * A plain link to every archived post, grouped by year in native <details> (no script), so search
 * engines and readers reach all of them: the archive above shows 24 and loads the rest only on
 * request (LegacyNewsArchive). docs/public-site-rendering.md.
 */
export function LegacyNewsYearIndex({ posts, locale = 'en' }: { posts: LegacyPostSummary[]; locale?: SiteLocale }) {
  const text = copy[locale];
  const years = [...new Set(posts.map((post) => post.dateTime.slice(0, 4)))].sort((a, b) => b.localeCompare(a));

  return (
    <section className="legacy-year-index" aria-labelledby="legacy-year-index-title">
      <header>
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 id="legacy-year-index-title">{text.title}</h2>
        <p>{text.intro}</p>
      </header>
      <div className="legacy-year-index-years">
        {years.map((year) => {
          const yearPosts = posts.filter((post) => post.dateTime.startsWith(year)).sort((a, b) => b.dateTime.localeCompare(a.dateTime));
          return (
            <details className="legacy-year-group" key={year}>
              <summary>
                <span className="legacy-year">{year}</span>
                <span className="legacy-year-count">{text.count(yearPosts.length)}</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <ul>
                {yearPosts.map((post) => (
                  <li key={post.path}>
                    <Link href={post.path}>{post.title}</Link>
                    <time dateTime={post.dateTime}>{post.date}</time>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </section>
  );
}
