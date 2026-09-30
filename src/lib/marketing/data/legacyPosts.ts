import legacyPostData from '@/lib/marketing/data/legacyPosts.json';

export type LegacyPostTopic =
  | 'auto'
  | 'premises'
  | 'medical'
  | 'brain'
  | 'dog'
  | 'sexual'
  | 'wrongful'
  | 'general';

export type LegacyPost = {
  id: string;
  slug: string;
  path: string;
  legacyPath: string;
  sourceUrl: string;
  dateTime: string;
  modifiedTime: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  topic: LegacyPostTopic;
  evergreen: 'high' | 'medium' | 'low';
  /**
   * Set by the import for pre-2023 posts that discuss the law. It no longer changes the
   * page: every archived post shows the same neutral dated notice, and a post's own text
   * states the law (docs/website-content-compliance.md).
   */
  needsLegalReview: boolean;
  wordCount: number;
  contentHtml: string;
  featuredImage: string;
  relatedLinks: [string, string][];
  /** ISO date the firm last revised the text. Metadata only: the page never displays it. */
  editedOn?: string;
  /**
   * Internal, never displayed: why the post is withheld from search engines and the
   * sitemap (legal content that still needs attorney review). It stays at its URL for old links.
   */
  noindexReason?: string;
};

export type LegacyRedirect = {
  legacyPath: string;
  canonicalPath: string;
};

type LegacyPostData = {
  generatedAt: string;
  sourcePostCount: number;
  existingPostCount: number;
  importedPostCount: number;
  migratedImageCount: number;
  brokenImageCount: number;
  posts: LegacyPost[];
  redirects: LegacyRedirect[];
};

const data = legacyPostData as LegacyPostData;

export const legacyPosts = data.posts;
export const legacyRedirects = data.redirects;

export type LegacyPostSummary = Pick<
  LegacyPost,
  | 'slug'
  | 'path'
  | 'dateTime'
  | 'date'
  | 'title'
  | 'excerpt'
  | 'category'
  | 'topic'
>;

// A few WordPress slugs carry percent-encoded characters ("%c2%a7" for §).
// Next hands the route a decoded param, so compare decoded forms.
function decodedSlug(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function legacyPostBySlug(slug: string) {
  const wanted = decodedSlug(slug);
  return legacyPosts.find((post) => post.slug === slug || decodedSlug(post.slug) === wanted);
}

export function legacyPostSummary(post: LegacyPost): LegacyPostSummary {
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

const ENTITIES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ',
  '&#8217;': '’', '&#8216;': '‘', '&#8220;': '“', '&#8221;': '”', '&#8211;': '–', '&#8212;': '—',
  '&#8230;': '…', '&hellip;': '…', '&rsquo;': '’', '&lsquo;': '‘', '&rdquo;': '”', '&ldquo;': '“', '&ndash;': '–', '&mdash;': '—',
};

/** The readable text of a migrated post, without markup. */
export function legacyPostPlainText(post: Pick<LegacyPost, 'contentHtml'>) {
  return (post.contentHtml ?? '')
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[#a-z0-9]+;/gi, (entity) => ENTITIES[entity] ?? ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** "January 2021" — the month a post was first published (a calendar date, so no timezone shift). */
function publishedMonth(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(new Date(`${isoDate}T12:00:00Z`));
}

/**
 * The one notice above every archived post: when it was first published, and that it is
 * general information. Nothing about accuracy, corrections, or later changes — each post's
 * own text states the law (docs/website-content-compliance.md).
 */
export function legacyArchiveNoticeText(post: Pick<LegacyPost, 'dateTime'>) {
  return `Originally published ${publishedMonth(post.dateTime)}. General information, not legal advice.`;
}

/** Image-only or near-empty posts: kept at their URLs, but not offered to search engines. */
export function legacyPostIsThin(post: Pick<LegacyPost, 'contentHtml'>) {
  return legacyPostPlainText(post).length < 40;
}

/**
 * Whether search engines are offered the post (robots meta and sitemap agree):
 * not thin, and not withheld while its legal content awaits attorney review (noindexReason).
 */
export function legacyPostIsIndexable(post: Pick<LegacyPost, 'contentHtml' | 'noindexReason'>) {
  return !legacyPostIsThin(post) && !post.noindexReason;
}

/**
 * Meta description: the old site's excerpt when it had one, otherwise the
 * opening of the post, otherwise a dated journal line for image-only posts.
 */
export function legacyPostDescription(post: Pick<LegacyPost, 'contentHtml' | 'excerpt' | 'title' | 'dateTime'>) {
  const excerpt = (post.excerpt ?? '').trim();
  if (excerpt) return excerpt;
  const text = legacyPostPlainText(post);
  if (text.length >= 40) {
    if (text.length <= 155) return text;
    const cut = text.slice(0, 155);
    return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\-–—]$/, '')}…`;
  }
  const year = (post.dateTime ?? '').slice(0, 4) || 'earlier';
  const title = post.title.trim().replace(/[.!?…]+$/, '');
  return `${title} — from the Kyle Scott Law journal (${year}). Orange County personal injury attorney Kyle Scott, Tustin, California.`;
}

export function legacyRedirectForPath(pathname: string) {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return legacyRedirects.find((redirect) => redirect.legacyPath === normalized);
}

export const legacyPostImportSummary = {
  sourcePostCount: data.sourcePostCount,
  existingPostCount: data.existingPostCount,
  importedPostCount: data.importedPostCount,
  migratedImageCount: data.migratedImageCount,
  brokenImageCount: data.brokenImageCount,
};
