import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PracticeAreaPage } from '@/components/marketing/PracticeAreaPage';
import { ServiceAreaPage } from '@/components/marketing/ServiceAreaPage';
import { cityPracticePages } from '@/lib/marketing/data/cityPracticePages';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishCityPracticePages } from '@/lib/marketing/data/spanishCityPracticePages';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';

afterEach(cleanup);

// The chat launcher watches the footer; jsdom has no IntersectionObserver.
globalThis.IntersectionObserver ??= class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } root = null; rootMargin = ''; thresholds = []; } as unknown as typeof IntersectionObserver;

/** The city + case pages are reached from their city page (the /areas-we-serve list shows city names only). */
describe('city + case pages', () => {
  it('each is linked from its city page, in English', () => {
    for (const page of cityPracticePages) {
      const area = serviceAreas.find((candidate) => candidate.city === page.city)!;
      const { container } = render(<ServiceAreaPage area={area} />);
      expect(container.querySelector(`a[href="${page.path}"]`), page.path).not.toBeNull();
      cleanup();
    }
  });

  it('each Spanish one is linked from its Spanish city page, where there is one', () => {
    for (const page of spanishCityPracticePages) {
      const area = spanishServiceAreas.find((candidate) => candidate.city === page.city);
      if (!area) continue;
      const { container } = render(<ServiceAreaPage area={area} locale="es" />);
      expect(container.querySelector(`a[href="${page.path}"]`), page.path).not.toBeNull();
      cleanup();
    }
  });

  it('each is linked from its county-wide practice page, and links the other cities and that page, in both languages', () => {
    const languages = [
      { pages: cityPracticePages, practices: practiceAreas, locale: 'en' as const },
      { pages: spanishCityPracticePages, practices: spanishPracticeAreas, locale: 'es' as const },
    ];
    for (const { pages, practices, locale } of languages) {
      for (const practice of practices) {
        const own = pages.filter((page) => page.parentKey === practice.key);
        if (!own.length) continue;
        const { container } = render(<PracticeAreaPage area={practice} locale={locale} />);
        for (const page of own) expect(container.querySelector(`.practice-every-case a[href="${page.path}"]`), `${practice.path} → ${page.path}`).not.toBeNull();
        cleanup();
        for (const page of own) {
          const { container: cityContainer } = render(<PracticeAreaPage area={page} locale={locale} />);
          const links = [...cityContainer.querySelectorAll('.practice-every-case a')].map((link) => link.getAttribute('href'));
          expect(links, page.path).toEqual([...own.filter((other) => other !== page).map((other) => other.path), practice.path]);
          cleanup();
        }
      }
    }
  });
});
