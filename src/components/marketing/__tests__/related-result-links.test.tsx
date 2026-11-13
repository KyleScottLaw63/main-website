import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PracticeAreaPage } from '@/components/marketing/PracticeAreaPage';
import { ServiceAreaPage } from '@/components/marketing/ServiceAreaPage';
import { cityPracticePages } from '@/lib/marketing/data/cityPracticePages';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { flagshipResults, historicalResults } from '@/lib/marketing/data/results';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishCityPracticePages } from '@/lib/marketing/data/spanishCityPracticePages';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { caseStoryPathForLocale } from '@/lib/marketing/spanishResults';

// The chat launcher watches the footer; jsdom has no IntersectionObserver.
globalThis.IntersectionObserver ??= class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } root = null; rootMargin = ''; thresholds = []; } as unknown as typeof IntersectionObserver;

afterEach(cleanup);

const allResults = [...flagshipResults, ...historicalResults];

/** The case story paths a page's "Related recoveries" must link, in the page's language. */
function storyPaths(featured: string[] | undefined, locale: 'en' | 'es') {
  return (featured ?? []).flatMap((title) => {
    const story = allResults.find((result) => result.title === title)?.story;
    return story ? [caseStoryPathForLocale(story, locale)] : [];
  });
}

function linkedPaths(container: HTMLElement) {
  return [...container.querySelectorAll('#results a.result-story-link')].map((link) => link.getAttribute('href'));
}

describe('"Related recoveries" link each result that has a case story', () => {
  it('on practice and city + case pages, in English and Spanish', () => {
    const pages = [
      ...[...practiceAreas, ...cityPracticePages].map((area) => ({ area, locale: 'en' as const })),
      ...[...spanishPracticeAreas, ...spanishCityPracticePages].map((area) => ({ area, locale: 'es' as const })),
    ];
    for (const { area, locale } of pages) {
      const { container } = render(<PracticeAreaPage area={area} locale={locale} />);
      expect(linkedPaths(container), area.path).toEqual(storyPaths(area.featuredResults, locale));
      cleanup();
    }
  });

  it('on city pages', () => {
    for (const area of serviceAreas) {
      const { container } = render(<ServiceAreaPage area={area} />);
      expect(linkedPaths(container), area.path).toEqual(storyPaths(area.featuredResults, 'en'));
      cleanup();
    }
  });

  it('the car accident page links its three crash stories', () => {
    const area = practiceAreas.find((item) => item.key === 'car-accidents')!;
    const { container } = render(<PracticeAreaPage area={area} />);
    expect(linkedPaths(container)).toEqual([
      '/results/chain-reaction-freeway-crash-settlement',
      '/results/freeway-rear-end-settlement',
      '/results/octa-bus-crash-verdict',
    ]);
  });
});
