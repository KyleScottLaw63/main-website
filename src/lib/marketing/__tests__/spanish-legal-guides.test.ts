// @vitest-environment node
import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { legalGuideBySlug, legalGuides, type LegalGuide } from '@/lib/marketing/data/legalGuides';
import { spanishLegalGuideBySlug, spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { localizedAlternates, routeForLocale } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';

/**
 * The Spanish guides (/es/guias) translate the English guides; these checks hold each one to its
 * original (docs/public-site-rendering.md, docs/website-content-compliance.md). What the law says
 * in them is the reviewer's to approve; what can be counted is checked here.
 */

/** The text a reader sees, without the guide's addresses and dates. */
function readerText(guide: LegalGuide): string[] {
  return [
    guide.query, guide.title, guide.description, guide.directAnswer, ...guide.takeaways,
    ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
    ...guide.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...guide.sources.map((source) => source.label),
  ];
}

/** Every number as written: amounts, days, years, percentages, and code sections ("§ 945.6(a)(1)" gives 945.6 and 1). */
function figures(guide: LegalGuide): string[] {
  return [...new Set(readerText(guide).join(' ').match(/\d[\d,.]*\d|\d/g) ?? [])].sort();
}

describe('the Spanish legal guides', () => {
  it('each translate one English guide, at /es/guias/<their own slug>', () => {
    const originals = spanishLegalGuides.map((guide) => guide.englishSlug);
    expect(originals.filter((slug) => !legalGuideBySlug(slug))).toEqual([]);
    expect(new Set(originals).size).toBe(originals.length);
    const slugs = spanishLegalGuides.map((guide) => guide.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(spanishLegalGuides.filter((guide) => guide.path !== `/es/guias/${guide.slug}`).map((guide) => guide.slug)).toEqual([]);
  });

  it('keep the original’s shape: takeaways, sections (same ids), paragraphs, bullets, questions, and the same sources', () => {
    const shape = (guide: LegalGuide) => ({
      practiceKey: guide.practiceKey,
      readingMinutes: Number.parseInt(guide.readingTime, 10),
      takeaways: guide.takeaways.length,
      sections: guide.sections.map((section) => [section.id, section.paragraphs.length, section.bullets?.length ?? 0]),
      faqs: guide.faqs.length,
      sources: guide.sources.map((source) => source.url),
    });
    for (const guide of spanishLegalGuides) expect(shape(guide), guide.slug).toEqual(shape(legalGuideBySlug(guide.englishSlug)!));
  });

  it('keep every number, amount, and code section of the original, and add none', () => {
    for (const guide of spanishLegalGuides) expect(figures(guide), guide.slug).toEqual(figures(legalGuideBySlug(guide.englishSlug)!));
  });

  it('read in Spanish: no English sentence left outside a quoted or bracketed official name', () => {
    const ENGLISH = /\b(?:the|and|with|your|you|this|that|which|when|from|will|should|must|may)\b/i;
    for (const guide of spanishLegalGuides) {
      const leftovers = readerText(guide).map((text) => text.replace(/“[^”]*”|"[^"]*"|\([^)]*\)/g, '')).filter((text) => ENGLISH.test(text));
      expect(leftovers, guide.slug).toEqual([]);
    }
    for (const guide of spanishLegalGuides) {
      expect(guide.readingTime, guide.slug).toMatch(/^\d+ min de lectura$/);
      expect(guide.updatedLabel, guide.slug).toMatch(/^\d{1,2} de (?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre) de \d{4}$/);
    }
  });

  it('link the Spanish practice page and the original’s related guides, in Spanish', () => {
    for (const guide of spanishLegalGuides) {
      const practice = spanishPracticeAreas.find((area) => area.key === guide.practiceKey);
      expect([guide.practicePath, guide.practiceLabel], guide.slug).toEqual([practice?.path, practice?.shortTitle]);
      const related = guide.relatedSlugs.map((slug) => spanishLegalGuideBySlug(slug)?.englishSlug);
      expect(related, guide.slug).toEqual(legalGuideBySlug(guide.englishSlug)!.relatedSlugs);
    }
  });

  it('pair with the original for hreflang and the language switcher; an untranslated guide leads to the other library', () => {
    for (const guide of spanishLegalGuides) {
      const english = `/guides/${guide.englishSlug}`;
      const languages = { 'en-US': `${SITE_URL}${english}`, 'es-US': `${SITE_URL}${guide.path}`, 'x-default': `${SITE_URL}${english}` };
      expect(localizedAlternates(guide.path), guide.slug).toEqual({ canonical: `${SITE_URL}${guide.path}`, languages });
      expect(localizedAlternates(english), guide.slug).toEqual({ canonical: `${SITE_URL}${english}`, languages });
      expect([routeForLocale(english, 'es'), routeForLocale(guide.path, 'en')], guide.slug).toEqual([guide.path, english]);
    }
    expect([routeForLocale('/guides', 'es'), routeForLocale('/es/guias', 'en')]).toEqual(['/es/guias', '/guides']);
    expect([routeForLocale('/guides/not-yet-translated', 'es'), routeForLocale('/es/guias/no-existe', 'en')]).toEqual(['/es/guias', '/guides']);
    expect(localizedAlternates('/guides/not-yet-translated')?.languages).toEqual({ 'en-US': `${SITE_URL}/guides/not-yet-translated`, 'x-default': `${SITE_URL}/guides/not-yet-translated` });
  });

  it('are in the sitemap once each, beside the English guides, with their dates', () => {
    const entries = sitemap().filter((entry) => /\/guides\b|\/es\/guias\b/.test(entry.url));
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    const expected = ['/guides', '/es/guias', ...legalGuides.map((guide) => guide.path), ...spanishLegalGuides.map((guide) => guide.path)];
    expect(urls.sort()).toEqual(expected.map((path) => `${SITE_URL}${path}`).sort());
    for (const guide of spanishLegalGuides) expect(entries.find((entry) => entry.url === `${SITE_URL}${guide.path}`)?.lastModified, guide.slug).toBe(guide.updated);
  });
});
