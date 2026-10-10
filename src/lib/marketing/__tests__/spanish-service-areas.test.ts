// @vitest-environment node
import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { serviceAreaByKey, serviceAreas, type ServiceAreaData } from '@/lib/marketing/data/serviceAreas';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';
import { localizedAlternates, routeForLocale } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';

/**
 * The Spanish city pages translate English city pages (docs/public-site-rendering.md): the same
 * local facts in the same shape, Spanish guides and practice pages, and a language pairing.
 */

const readerText = (area: ServiceAreaData) => [
  area.title, area.description, area.introTitle, ...area.intro,
  ...area.keyPoints.flatMap((point) => [point.title, point.body]), ...area.matters,
  ...area.local.flatMap((group) => [group.label, ...group.items]), ...area.faqs.flatMap((faq) => [faq.question, faq.answer]),
];

/** Every number as written: addresses, freeway numbers, phone numbers, deadlines. */
const figures = (area: ServiceAreaData) => [...new Set(readerText(area).join(' ').match(/\d[\d,.-]*\d|\d/g) ?? [])].sort();

describe('the Spanish city pages', () => {
  it('each translate one English city page, at their own /es path', () => {
    for (const area of spanishServiceAreas) {
      expect(serviceAreaByKey[area.englishKey], area.key).toBeDefined();
      expect(area.key, area.key).toBe(area.englishKey);
      expect(area.path, area.key).toMatch(/^\/es\/abogado-de-lesiones-personales-[a-z-]+$/);
      expect(area.city, area.key).toBe(serviceAreaByKey[area.englishKey].city);
    }
    expect(new Set(spanishServiceAreas.map((area) => area.path)).size).toBe(spanishServiceAreas.length);
  });

  it('keep the original’s shape and every number: key points, matters, local items, questions, hospitals, addresses', () => {
    const shape = (area: ServiceAreaData) => ({
      keyPoints: area.keyPoints.length, matters: area.matters.length, faqs: area.faqs.length,
      local: area.local.map((group) => group.items.length),
    });
    for (const area of spanishServiceAreas) {
      const english = serviceAreaByKey[area.englishKey];
      expect(shape(area), area.key).toEqual(shape(english));
      expect(figures(area), area.key).toEqual(figures(english));
      // Proper names stay: every hospital and courthouse line of the English page appears in the Spanish one.
      // (The street address after the dash; an English explanation after it may be translated.)
      for (const item of english.local[0].items) expect(area.local[0].items.join(' '), area.key).toContain((item.split(' — ')[1] ?? item).split(', ')[0]);
    }
  });

  it('link Spanish guides and Spanish practice pages that exist, matching the English page’s choices', () => {
    for (const area of spanishServiceAreas) {
      const english = serviceAreaByKey[area.englishKey];
      const spanishGuideSlugs = new Set(spanishLegalGuides.map((guide) => guide.slug));
      expect(area.guideSlugs.filter((slug) => !spanishGuideSlugs.has(slug)), area.key).toEqual([]);
      const originals = area.guideSlugs.map((slug) => spanishLegalGuides.find((guide) => guide.slug === slug)!.englishSlug);
      expect(originals, area.key).toEqual(english.guideSlugs.filter((slug) => originals.includes(slug)));
      const spanishPaths = new Set(spanishPracticeAreas.map((practice) => practice.path));
      expect(area.relatedPracticePaths.filter((path) => !spanishPaths.has(path)), area.key).toEqual([]);
      expect(area.relatedPracticePaths.length, area.key).toBe(english.relatedPracticePaths.length);
    }
  });

  it('pair with the English page for hreflang and the language switcher; an untranslated city page stays English only', () => {
    for (const area of spanishServiceAreas) {
      const english = serviceAreaByKey[area.englishKey].path;
      const languages = { 'en-US': `${SITE_URL}${english}`, 'es-US': `${SITE_URL}${area.path}`, 'x-default': `${SITE_URL}${english}` };
      expect(localizedAlternates(area.path), area.key).toEqual({ canonical: `${SITE_URL}${area.path}`, languages });
      expect(localizedAlternates(english), area.key).toEqual({ canonical: `${SITE_URL}${english}`, languages });
      expect([routeForLocale(english, 'es'), routeForLocale(area.path, 'en')], area.key).toEqual([area.path, english]);
    }
    const translated = new Set(spanishServiceAreas.map((area) => area.englishKey));
    for (const area of serviceAreas.filter((item) => !translated.has(item.key))) {
      expect(localizedAlternates(area.path)?.languages, area.key).toEqual({ 'en-US': `${SITE_URL}${area.path}`, 'x-default': `${SITE_URL}${area.path}` });
    }
  });

  it('are in the sitemap once each, beside the English city pages', () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const area of [...serviceAreas, ...spanishServiceAreas]) expect(urls.filter((url) => url === `${SITE_URL}${area.path}`), area.path).toHaveLength(1);
  });
});
