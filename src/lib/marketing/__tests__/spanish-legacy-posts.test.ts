import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { legacyPostPlainText, legacyPosts } from '@/lib/marketing/data/legacyPosts';
import { newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import {
  spanishLegacyArchiveNoticeText,
  spanishLegacyPostDate,
  spanishLegacyPostDescription,
  spanishLegacyPosts,
  spanishLegacyPostSummary,
} from '@/lib/marketing/data/spanishLegacyPosts';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';
import { localizedRoutes } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';

/**
 * The Spanish archive (/es/noticias/<slug>) translates every archived post as it now stands
 * (docs/website-content-compliance.md, "Archived articles"): the same markup, links, and figures,
 * the firm's own links sent to Spanish pages, and the archive's rules in Spanish.
 */
const ROOT = process.cwd();
const englishBySlug = new Map(legacyPosts.map((post) => [post.slug, post]));
const pairs = spanishLegacyPosts.map((spanish) => ({ spanish, english: englishBySlug.get(spanish.englishSlug)! }));
const fullText = (post: { title: string; excerpt: string; contentHtml: string }) => `${post.title} ${post.excerpt} ${legacyPostPlainText(post)}`;
const numerals = (text: string) => (text.match(/\d+(?:[.,]\d+)*/g) ?? []).sort();
const tags = (html: string) => html.match(/<[^>]+>/g) ?? [];
const hrefOf = (tag: string) => /\shref="([^"]*)"/.exec(tag)?.[1];

describe('every archived post has its Spanish version', () => {
  it('one Spanish post per English post, in the same order', () => {
    expect(spanishLegacyPosts.map((post) => post.englishSlug)).toEqual(legacyPosts.map((post) => post.slug));
  });

  it('at a plain, unique Spanish address under /es/noticias that no other page uses', () => {
    const slugs = spanishLegacyPosts.map((post) => post.slug);
    expect(slugs.filter((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 80)).toEqual([]);
    expect(slugs.filter((slug, index) => slugs.indexOf(slug) !== index)).toEqual([]);
    expect(spanishLegacyPosts.filter((post) => post.path !== `/es/noticias/${post.slug}`).map((post) => post.slug)).toEqual([]);
    const newsSlugs = new Set(newsArticlesForLocale('es').map((article) => article.slug));
    expect(slugs.filter((slug) => newsSlugs.has(slug))).toEqual([]);
    expect(pairs.filter(({ spanish, english }) => spanish.slug === english.slug).map(({ spanish }) => spanish.slug)).toEqual([]);
  });

  it('paired with its English post for the language switcher and hreflang', () => {
    for (const { spanish, english } of pairs) {
      expect(localizedRoutes.some((route) => route.en === english.path && route.es === spanish.path), english.slug).toBe(true);
    }
  });

  it('the search index is exactly what scripts/build-legacy-news-index.mjs generates', () => {
    const committed = readFileSync(path.join(ROOT, 'public/data/legacy-news-index-es.json'), 'utf8');
    expect(committed).toBe(`${JSON.stringify(spanishLegacyPosts.map(spanishLegacyPostSummary))}\n`);
  });
});

describe('a Spanish post says what its English post says', () => {
  it('the same markup, tag for tag: only the text and the firm’s own link targets change', () => {
    const differences: string[] = [];
    for (const { spanish, english } of pairs) {
      const [en, es] = [tags(english.contentHtml), tags(spanish.contentHtml)];
      if (en.length !== es.length) differences.push(`${english.slug}: ${en.length} tags in English, ${es.length} in Spanish`);
      en.forEach((tag, index) => {
        const strip = (value: string | undefined) => value?.replace(/\shref="[^"]*"/, '');
        if (strip(tag) !== strip(es[index])) differences.push(`${english.slug}: ${tag} → ${es[index]}`);
        const [enHref, esHref] = [hrefOf(tag), hrefOf(es[index] ?? '')];
        // Outside links, tap-to-call, and email stay exactly as they are.
        if (enHref && !enHref.startsWith('/') && enHref !== esHref) differences.push(`${english.slug}: ${enHref} → ${esHref}`);
      });
    }
    expect(differences).toEqual([]);
  });

  it('every figure, date, statute number, and phone number, and nothing more', () => {
    const differences = pairs.flatMap(({ spanish, english }) => [
      ...(numerals(legacyPostPlainText(english)).join(' ') === numerals(legacyPostPlainText(spanish)).join(' ') ? [] : [`${english.slug}: body`]),
      ...(numerals(english.title).join(' ') === numerals(spanish.title).join(' ') ? [] : [`${english.slug}: title`]),
    ]);
    expect(differences).toEqual([]);
  });

  it('a title, and an excerpt exactly when the English has one', () => {
    expect(pairs.filter(({ spanish }) => !spanish.title.trim()).map(({ english }) => english.slug)).toEqual([]);
    expect(pairs.filter(({ spanish, english }) => Boolean(spanish.excerpt.trim()) !== Boolean(english.excerpt.trim())).map(({ english }) => english.slug)).toEqual([]);
  });

  it('the English post’s date, written in Spanish, and its topic, image, and search status', () => {
    for (const { spanish, english } of pairs) {
      expect(spanish.date, english.slug).toBe(spanishLegacyPostDate(english.dateTime));
      expect([spanish.dateTime, spanish.topic, spanish.featuredImage, spanish.noindexReason], english.slug).toEqual([english.dateTime, english.topic, english.featuredImage, english.noindexReason]);
    }
    expect(spanishLegacyPostDate('2022-04-08')).toBe('8 de abril de 2022');
  });
});

describe('links in the Spanish archive', () => {
  const spanishPages = new Set<string>([
    '/es',
    ...localizedRoutes.map((route) => route.es),
    ...spanishLegacyPosts.map((post) => post.path),
  ]);

  it('the firm’s own links lead to Spanish pages that exist', () => {
    const broken: string[] = [];
    for (const post of spanishLegacyPosts) {
      const hrefs = [...post.contentHtml.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)].map((match) => match[1]);
      for (const href of [...hrefs, ...post.relatedLinks.map(([, link]) => link)]) {
        if (!spanishPages.has(href.split('#')[0])) broken.push(`${post.slug}: ${href}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('related links carry Spanish labels', () => {
    for (const { spanish, english } of pairs) {
      expect(spanish.relatedLinks.length, english.slug).toBe(english.relatedLinks.length);
      for (const [label] of spanish.relatedLinks) expect(label, english.slug).not.toMatch(/\b(?:Injury|Accidents?|Bites?|Death|Malpractice|Harassment|Areas|Slip)\b/);
    }
  });
});

describe('the archive’s rules, in Spanish (docs/website-content-compliance.md)', () => {
  it('the one notice on every Spanish post is neutral and dated', () => {
    for (const post of spanishLegacyPosts) {
      const month = new Intl.DateTimeFormat('es-US', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(new Date(`${post.dateTime}T12:00:00Z`));
      expect(spanishLegacyArchiveNoticeText(post), post.slug).toBe(`Publicado originalmente en ${month}. Información general, no asesoría legal.`);
    }
    expect(spanishLegacyArchiveNoticeText({ dateTime: '2021-01-07' })).toBe('Publicado originalmente en enero de 2021. Información general, no asesoría legal.');
    expect(spanishLegacyArchiveNoticeText({ dateTime: '2021-01-07' })).not.toMatch(/correg|equivoc|incorrect|actualiz|cambi|exact|revis|edit/i);
  });

  it('no Spanish post carries an editor’s note or says it was corrected, updated, or wrong', () => {
    const EDITORIAL = /nota del (?:editor|redactor)|(?:ha sido|fue) (?:actualizad|corregid)|se corrigió|\bera(?:n)? incorrect|estaba(?:n)? equivocad/i;
    expect(spanishLegacyPosts.filter((post) => EDITORIAL.test(fullText(post))).map((post) => post.slug)).toEqual([]);
  });

  it('MICRA: every Spanish post on the cap states the Spanish guide’s current figures, as its English post does', () => {
    const bullet = spanishLegalGuides.flatMap((guide) => guide.sections.flatMap((section) => section.bullets ?? [])).find((line) => line.startsWith('Límites en casos de negligencia médica.'));
    const figures = /(\$[\d,]+) en un caso de lesiones y de (\$[\d,]+) en un caso de muerte injusta/.exec(bullet ?? '');
    expect(figures, 'Spanish guide bullet with the current caps').not.toBeNull();
    const [, injuryCap, deathCap] = figures!;
    for (const { spanish, english } of pairs) {
      const englishPairs = [...fullText(english).matchAll(/(\$[\d,]+) in an injury case and (\$[\d,]+) in a wrongful death case/g)];
      const spanishPairs = [...fullText(spanish).matchAll(/(\$[\d,]+) en un caso de lesiones y (?:de )?(\$[\d,]+) en un caso de muerte injusta/g)];
      expect(spanishPairs.length, english.slug).toBe(englishPairs.length);
      for (const [, injury, death] of spanishPairs) expect([injury, death], english.slug).toEqual([injuryCap, deathCap]);
    }
  });

  it('no “especialista” where the English post does not say specialist (Rule 7.4)', () => {
    expect(pairs.filter(({ spanish, english }) => /especialista|especializad/i.test(fullText(spanish)) && !/speciali[sz]/i.test(fullText(english))).map(({ english }) => english.slug)).toEqual([]);
  });
});

describe('search: titles, descriptions, and the sitemap', () => {
  const indexable = spanishLegacyPosts.filter((post) => post.indexable);

  it('offered to search engines exactly when the English post is, and listed in the sitemap then', () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const { spanish, english } of pairs) {
      expect(urls.has(`${SITE_URL}${spanish.path}`), spanish.slug).toBe(spanish.indexable);
      expect(urls.has(`${SITE_URL}${english.path}`), english.slug).toBe(spanish.indexable);
    }
  });

  it('no two indexable Spanish posts share a title or a description, and none runs past 155 characters', () => {
    const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);
    expect(duplicates(indexable.map((post) => post.title.trim().toLowerCase()))).toEqual([]);
    expect(duplicates(indexable.map((post) => spanishLegacyPostDescription(post)))).toEqual([]);
    expect(indexable.map((post) => spanishLegacyPostDescription(post)).filter((text) => text.length > 155)).toEqual([]);
  });

  it('no Spanish post reuses the title of a Spanish city page, guide, or news article', () => {
    const pageTitles = new Set(
      [...spanishServiceAreas.map((area) => area.title), ...spanishLegalGuides.map((guide) => guide.seoTitle), ...newsArticlesForLocale('es').map((article) => article.title)].map((title) => title.trim().toLowerCase()),
    );
    expect(spanishLegacyPosts.filter((post) => pageTitles.has(post.title.trim().toLowerCase())).map((post) => post.slug)).toEqual([]);
  });
});
