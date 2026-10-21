import spanishLegacyPostData from '@/lib/marketing/data/spanishLegacyPosts.json';
import {
  fitDescription,
  legacyPostIsIndexable,
  legacyPostPlainText,
  legacyPosts,
  type LegacyPost,
  type LegacyPostSummary,
} from '@/lib/marketing/data/legacyPosts';

/**
 * The Spanish version of an archived post, at /es/noticias/<slug> (docs/website-content-compliance.md,
 * "Archived articles"). It translates the English post as it now stands (`englishSlug`, legacyPosts.json):
 * the same paragraphs, links, figures, and law, and nothing the English does not say. The record keeps
 * only what the Spanish changes; the dates, topic, image, and search status come from the English post.
 * Links inside the text already point to the Spanish pages where there is one.
 */
type SpanishLegacyPostRecord = {
  englishSlug: string;
  slug: string;
  path: string;
  /** The English post's date, written in Spanish ("8 de abril de 2022"). */
  date: string;
  category: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  relatedLinks: [string, string][];
};

export type SpanishLegacyPost = LegacyPost & {
  englishSlug: string;
  /** The English post this one translates. */
  englishPath: string;
  /** Offered to search engines exactly when the English post is (legacyPostIsIndexable). */
  indexable: boolean;
};

/** When the Spanish archive was published: its pages' dateModified and sitemap date. */
export const spanishLegacyPostsDate = '2026-10-21';

const records = (spanishLegacyPostData as { posts: SpanishLegacyPostRecord[] }).posts;
const englishBySlug = new Map(legacyPosts.map((post) => [post.slug, post]));

/** The Spanish posts, in the English archive's order (newest first). */
export const spanishLegacyPosts: SpanishLegacyPost[] = records.map((record) => {
  const english = englishBySlug.get(record.englishSlug);
  if (!english) throw new Error(`spanishLegacyPosts.json: no English post "${record.englishSlug}"`);
  return {
    ...english,
    ...record,
    englishPath: english.path,
    indexable: legacyPostIsIndexable(english),
    modifiedTime: [english.modifiedTime, spanishLegacyPostsDate].sort().at(-1)!,
    wordCount: legacyPostPlainText(record).split(' ').filter(Boolean).length,
  };
});

/** Every archived post and its Spanish version, for the language switcher and hreflang (i18n.ts). */
export const spanishLegacyPostLocalizedRoutes = spanishLegacyPosts.map((post) => ({ en: post.englishPath, es: post.path }));

export function spanishLegacyPostBySlug(slug: string) {
  return spanishLegacyPosts.find((post) => post.slug === slug);
}

export function spanishLegacyPostByEnglishSlug(englishSlug: string) {
  return spanishLegacyPosts.find((post) => post.englishSlug === englishSlug);
}

/** "abril de 2022" — the month a post was first published (a calendar date, so no timezone shift). */
function publishedMonth(isoDate: string) {
  return new Intl.DateTimeFormat('es-US', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(new Date(`${isoDate}T12:00:00Z`));
}

/** "8 de abril de 2022" — how the Spanish archive writes a post's date (the record's `date`). */
export function spanishLegacyPostDate(isoDate: string) {
  return new Intl.DateTimeFormat('es-US', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${isoDate}T12:00:00Z`));
}

/** The Spanish twin of the one neutral notice above every archived post (legacyArchiveNoticeText). */
export function spanishLegacyArchiveNoticeText(post: Pick<LegacyPost, 'dateTime'>) {
  return `Publicado originalmente en ${publishedMonth(post.dateTime)}. Información general, no asesoría legal.`;
}

/** Meta description, as legacyPostDescription builds the English one: the excerpt, the opening, or a dated line. */
export function spanishLegacyPostDescription(post: Pick<LegacyPost, 'contentHtml' | 'excerpt' | 'title' | 'dateTime'>) {
  const excerpt = (post.excerpt ?? '').trim();
  if (excerpt) return fitDescription(excerpt);
  const text = legacyPostPlainText(post);
  if (text.length >= 40) return fitDescription(text);
  const year = (post.dateTime ?? '').slice(0, 4) || 'años anteriores';
  const title = post.title.trim().replace(/[.!?…]+$/, '');
  return fitDescription(`${title}: de las publicaciones de Kyle Scott Law (${year}). Kyle Scott, abogado de lesiones personales en Tustin, Condado de Orange.`);
}

export function spanishLegacyPostSummary(post: SpanishLegacyPost): LegacyPostSummary {
  return {
    slug: post.slug,
    path: post.path,
    dateTime: post.dateTime,
    date: post.date,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    topic: post.topic,
  };
}
