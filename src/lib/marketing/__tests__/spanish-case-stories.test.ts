import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { caseStories, caseStoryBySlug, caseStoryHeadline, type CaseStory } from '@/lib/marketing/data/caseStories';
import { newsArticleLocalizedRoutes } from '@/lib/marketing/data/newsArticles';
import { caseStoryPath } from '@/lib/marketing/data/results';
import {
  caseStoryLocalizedRoutes,
  spanishCaseStories,
  spanishCaseStoryByEnglishSlug,
  spanishCaseStoryBySlug,
  spanishCaseStoryHeadline,
  spanishCaseStoryLinks,
  spanishCaseStoryTitle,
  type SpanishCaseStory,
} from '@/lib/marketing/data/spanishCaseStories';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { localizedRoutes } from '@/lib/marketing/i18n';
import { caseStoryPathForLocale, spanishCaseStoryPath, spanishCaseStorySlugs, translateResultToSpanish } from '@/lib/marketing/spanishResults';

/**
 * The Spanish case stories (docs/case-stories.md) translate the attorney-approved English stories word
 * for word: one per English story, with the same chapters, paragraphs, figures, courts, and comparison,
 * and nothing the English does not show.
 */
const english = (story: SpanishCaseStory) => caseStoryBySlug(story.englishSlug)!;
/** Every text a reader sees, field by field, so the two languages can be compared unit by unit. */
const units = (story: CaseStory | SpanishCaseStory) => [
  story.summary,
  ...story.chapters.flatMap((chapter) => chapter.paragraphs),
  ...(story.comparison ? [story.comparison.caption, ...story.comparison.figures.flatMap((figure) => [figure.label, figure.amount])] : []),
  ...(story.announcement ? [story.announcement.label] : []),
  ...(story.confidential ? [story.confidential.title] : []),
];
const digits = (text: string) => text.match(/\d+/g) ?? [];
/** "$5.75 millones" is 5,750,000; "$928,493.12" is 928,493.12. */
const dollars = (text: string) =>
  [...text.matchAll(/\$(\d[\d,]*(?:\.\d+)?)\s*(millones|millón|M)?(?![\p{L}])/gu)].map(([, figure, million]) => Number(figure.replace(/,/g, '')) * (million ? 1_000_000 : 1));
const storyText = (story: SpanishCaseStory) => [story.summary, ...story.chapters.flatMap((chapter) => chapter.paragraphs)].join(' ');
/** The parties the firm's cases were against (the same list as case-stories.test.ts and results.test.ts). */
const NAMED = /\b(?:LBUSD|Long Beach Unified|OCTA|Orange County Transportation Authority|Office Depot|Disneyland|Osprey|Great Wolf)\b/g;
const named = (text: string) => new Set(text.match(NAMED) ?? []);

describe('Spanish case stories', () => {
  it('translate every English story exactly once, in the same order', () => {
    expect(spanishCaseStories.map((story) => story.englishSlug)).toEqual(caseStories.map((story) => story.slug));
    const slugs = spanishCaseStories.map((story) => story.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    // The results explorer's slug map names the same Spanish page for each English story.
    expect(spanishCaseStorySlugs).toEqual(Object.fromEntries(spanishCaseStories.map((story) => [story.englishSlug, story.slug])));
    for (const story of spanishCaseStories) {
      expect(spanishCaseStoryBySlug(story.slug)).toBe(story);
      expect(spanishCaseStoryByEnglishSlug(story.englishSlug)).toBe(story);
      expect(caseStoryPathForLocale(story.englishSlug, 'es')).toBe(`/es/resultados/${story.slug}`);
      expect(caseStoryPathForLocale(story.englishSlug, 'en')).toBe(caseStoryPath(story.englishSlug));
    }
  });

  it('keep the same chapters, paragraphs, and comparison, and the same digits in every text', () => {
    for (const story of spanishCaseStories) {
      const source = english(story);
      expect(story.chapters.map((chapter) => chapter.paragraphs.length), story.slug).toEqual(source.chapters.map((chapter) => chapter.paragraphs.length));
      expect(new Set(story.chapters.map((chapter) => chapter.heading)).size, story.slug).toBe(story.chapters.length);
      expect(story.comparison?.figures.map(({ amount, value }) => ({ amount, value })), story.slug).toEqual(source.comparison?.figures.map(({ amount, value }) => ({ amount, value })));
      expect(units(story).length, story.slug).toBe(units(source).length);
      units(story).forEach((text, index) => expect(digits(text), `${story.slug}: ${text}`).toEqual(digits(units(source)[index])));
    }
  });

  it('keep the English record’s dates, confidentiality, and announcement', () => {
    for (const story of spanishCaseStories) {
      const source = english(story);
      expect({ resolved: story.resolved, published: story.published }, story.slug).toEqual({ resolved: source.resolved, published: source.published });
      expect(Boolean(story.confidential), story.slug).toBe(Boolean(source.confidential));
      expect(story.confidential?.year, story.slug).toBe(source.confidential?.year);
      expect(Boolean(story.announcement), story.slug).toBe(Boolean(source.announcement));
      if (story.announcement && source.announcement) {
        // The firm's Spanish announcement when one exists (newsArticles.ts); otherwise the English post, marked "(en inglés)".
        const spanish = newsArticleLocalizedRoutes.find((route) => route.en === source.announcement!.href);
        expect(story.announcement, story.slug).toEqual(spanish ? { label: story.announcement.label, href: spanish.es } : { label: story.announcement.label, href: source.announcement.href, inEnglish: true });
      }
    }
  });

  it('name the court as the Spanish results do, and link the Spanish twin of the English practice page', () => {
    for (const story of spanishCaseStories) {
      const source = english(story);
      expect(story.court, story.slug).toBe(translateResultToSpanish({ amount: '', title: '', detail: source.court, category: 'Other injury claims' }).detail);
      expect(story.practiceArea.href, story.slug).toBe(localizedRoutes.find((route) => route.en === source.practiceArea.href)?.es);
      expect(story.practiceArea.label, story.slug).toBe(spanishPracticeAreas.find((area) => area.path === story.practiceArea.href)?.shortTitle);
    }
  });

  it('state no dollar figure but the result’s own and its comparison’s, and a confidential story none at all', () => {
    for (const story of spanishCaseStories) {
      const source = english(story);
      const allowed = new Set(story.confidential ? [] : [...dollars(caseStoryHeadline(source).figure), ...(story.comparison?.figures.map((figure) => figure.value) ?? [])]);
      const stated = dollars(storyText(story));
      expect(stated.filter((value) => !allowed.has(value)), story.slug).toEqual([]);
      // The same figures as the English text, so "$5.75 millones" reads as $5.75 million.
      expect(stated, story.slug).toEqual(dollars([source.summary, ...source.chapters.flatMap((chapter) => chapter.paragraphs)].join(' ').replace(/ million\b/g, ' millones')));
    }
    for (const story of spanishCaseStories.filter((item) => item.confidential)) {
      expect(JSON.stringify(story), story.slug).not.toMatch(/\$\d/);
      expect(spanishCaseStoryHeadline(story), story.slug).toMatchObject({ figure: 'Confidencial', title: story.confidential!.title, outcome: 'Acuerdo', confidential: true });
    }
  });

  it('take the figure, title, outcome, and year from the English story’s card, translated', () => {
    for (const story of spanishCaseStories.filter((item) => !item.confidential)) {
      const source = caseStoryHeadline(english(story));
      const headline = spanishCaseStoryHeadline(story);
      expect(headline.figure, story.slug).toBe(source.figure);
      expect(headline.year, story.slug).toBe(source.year);
      expect(headline.title, story.slug).not.toBe(source.title);
      expect(headline.outcome, story.slug).toMatch(/^(Acuerdo|Veredicto del jurado)$/);
    }
    const title = (slug: string) => spanishCaseStoryTitle(spanishCaseStoryByEnglishSlug(slug)!);
    expect(title('student-skull-fracture-verdict')).toBe('Veredicto del jurado de $5.75M: Estudiante sufre fractura de cráneo y hemorragia cerebral | Kyle Scott Law');
    expect(title('nursing-facility-pressure-wound-settlement')).toBe('Acuerdo confidencial: Adulta dependiente desarrolla una grave herida por presión bajo cuidados de enfermería | Kyle Scott Law');
    const titles = spanishCaseStories.map(spanishCaseStoryTitle);
    expect(new Set(titles).size).toBe(titles.length);
    for (const story of spanishCaseStories) expect(story.summary.length, story.slug).toBeLessThanOrEqual(230);
  });

  it('bring back no party name the English removed, and name none in a summary (what /es/resultados shows)', () => {
    for (const story of spanishCaseStories) {
      const source = english(story);
      expect(named(story.summary), story.slug).toEqual(new Set());
      // The approved story text names a party only where the English does (docs/case-stories.md).
      expect([...named(JSON.stringify(story))].filter((name) => !named(JSON.stringify(source)).has(name)), story.slug).toEqual([]);
    }
  });

  it('carry none of the drafts’ internal material', () => {
    const INTERNAL = /\binternal(?::| amount| review| only| draft)|review notes?|before publishing|needs confirmation|decision:|\bsources?:|\binterno:|notas? de revisión|antes de publicar|fuentes?:/i;
    for (const story of spanishCaseStories) expect(JSON.stringify(story), story.slug).not.toMatch(INTERNAL);
  });

  it('pair each story’s English and Spanish pages for hreflang', () => {
    expect(caseStoryLocalizedRoutes).toEqual(caseStories.map((story) => ({ en: caseStoryPath(story.slug), es: spanishCaseStoryPath(spanishCaseStoryByEnglishSlug(story.slug)!.slug) })));
  });

  it('list the Spanish stories and announcements as /results lists the English ones, linking Spanish pages only', () => {
    const links = spanishCaseStoryLinks();
    expect(links).toHaveLength(spanishCaseStories.length + 2 - 1);
    expect(links.map((link) => link.href)).not.toContain(caseStoryPathForLocale('school-counselor-abuse-settlement', 'es'));
    expect(links.filter((link) => !link.href.startsWith('/es/')).map((link) => link.href)).toEqual([]);
    expect(links.map((link) => link.date)).toEqual([...links.map((link) => link.date)].sort().reverse());
    expect(links[0]).toMatchObject({ href: '/es/resultados/acuerdo-choque-interseccion-fontana', figure: '$2.7M', kicker: 'Acuerdo · 2026' });
    expect(links.map((link) => link.href)).toEqual(expect.arrayContaining(['/es/noticias/acuerdo-abuso-sexual-2-2-millones', '/es/noticias/victoria-apelacion-nuevo-juicio']));
  });
});

describe('Spanish pages', () => {
  it('link no English case story in their source (the Spanish story instead)', () => {
    const files = (dir: string): string[] => readdirSync(dir).flatMap((name) => (statSync(join(dir, name)).isDirectory() ? files(join(dir, name)) : [join(dir, name)]));
    const spanishSources = [
      ...files(join(process.cwd(), 'src/app/(site-es)')),
      ...readdirSync(join(process.cwd(), 'src/lib/marketing/data')).filter((name) => name.startsWith('spanish')).map((name) => join(process.cwd(), 'src/lib/marketing/data', name)),
    ];
    expect(spanishSources.filter((file) => /['"`]\/results\//.test(readFileSync(file, 'utf8')))).toEqual([]);
  });
});
