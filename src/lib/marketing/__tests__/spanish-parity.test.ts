import { describe, expect, it } from 'vitest';
import { areasWeServe, areasWeServeEs } from '@/lib/marketing/data/areasWeServe';
import { caseStories } from '@/lib/marketing/data/caseStories';
import { cityPracticePages } from '@/lib/marketing/data/cityPracticePages';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishCaseStories } from '@/lib/marketing/data/spanishCaseStories';
import { spanishCityPracticePages } from '@/lib/marketing/data/spanishCityPracticePages';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';
import { localizedRoutes } from '@/lib/marketing/i18n';

/**
 * Every page of the site exists in English and in Spanish (the firm, 2026-10-20; docs/public-site-rendering.md).
 * A new English page fails here until its Spanish version is added.
 */
describe('every English page has its Spanish version', () => {
  const missing = <T,>(english: T[], has: (item: T) => boolean, name: (item: T) => string) => english.filter((item) => !has(item)).map(name);

  it('practice pages', () => {
    const spanish = new Set(spanishPracticeAreas.map((area) => area.key));
    expect(missing(practiceAreas, (area) => spanish.has(area.key), (area) => area.path)).toEqual([]);
  });

  it('city and regional pages', () => {
    const spanish = new Set(spanishServiceAreas.map((area) => area.englishKey));
    expect(missing(serviceAreas, (area) => spanish.has(area.key), (area) => area.path)).toEqual([]);
  });

  it('city + case pages', () => {
    const spanish = new Set(spanishCityPracticePages.map((page) => page.englishKey));
    expect(missing(cityPracticePages, (page) => spanish.has(page.key), (page) => page.path)).toEqual([]);
  });

  it('legal guides', () => {
    const spanish = new Set(spanishLegalGuides.map((guide) => guide.englishSlug));
    expect(missing(legalGuides, (guide) => spanish.has(guide.slug), (guide) => guide.path)).toEqual([]);
  });

  it('case stories', () => {
    const spanish = new Set(spanishCaseStories.map((story) => story.englishSlug));
    expect(missing(caseStories, (story) => spanish.has(story.slug), (story) => story.slug)).toEqual([]);
  });

  it('the areas we serve page, paired for the language switcher', () => {
    expect(localizedRoutes.some((route) => route.en === areasWeServe.path && route.es === areasWeServeEs.path)).toBe(true);
  });
});
