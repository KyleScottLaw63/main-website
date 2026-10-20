import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import HomePage from '@/app/(site)/page';
import SpanishHomePage from '@/app/(site-es)/es/page';
import { regionalServiceAreas } from '@/lib/marketing/data/serviceAreasRegional';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';

afterEach(cleanup);

// The chat launcher watches the footer; jsdom has no IntersectionObserver.
globalThis.IntersectionObserver ??= class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } root = null; rootMargin = ''; thresholds = []; } as unknown as typeof IntersectionObserver;

/**
 * The footer no longer lists the cities (the firm, 2026-10-20), so each home page's "Areas we serve"
 * section is what links every Orange County city page; the regional pages are linked from /areas-we-serve.
 */
describe('home page "Areas we serve"', () => {
  it('links every Orange County city page, in English', () => {
    const { container } = render(<HomePage />);
    const regional = new Set(regionalServiceAreas.map((area) => area.path));
    for (const area of serviceAreas.filter((page) => !regional.has(page.path))) expect(container.querySelector(`a[href="${area.path}"]`), area.path).not.toBeNull();
    expect(container.querySelector('a[href="/areas-we-serve"]')).not.toBeNull();
  });

  it('links every Spanish city page from the Spanish home page', () => {
    const { container } = render(<SpanishHomePage />);
    for (const area of spanishServiceAreas) expect(container.querySelector(`a[href="${area.path}"]`), area.path).not.toBeNull();
  });
});
