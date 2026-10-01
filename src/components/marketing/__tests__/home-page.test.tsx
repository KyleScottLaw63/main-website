import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Page chrome and the consultation form are irrelevant here and pull in client-only code.
vi.mock('@/components/marketing/SiteHeader', () => ({ SiteHeader: () => null }));
vi.mock('@/components/marketing/SiteFooter', () => ({ SiteFooter: () => null }));
vi.mock('@/components/marketing/ChatWidget', () => ({ ChatWidget: () => null }));
vi.mock('@/components/marketing/ConsultationForm', () => ({ ConsultationForm: () => null }));

import Home from '@/app/(site)/page';
import SpanishHomePage from '@/app/(site-es)/es/page';

afterEach(cleanup);

const cards = (container: HTMLElement, selector: string) =>
  [...container.querySelectorAll(selector)].map((card) => ({
    label: card.querySelector('span')!.textContent,
    href: card.querySelector('a')!.getAttribute('href'),
    text: card.textContent ?? '',
  }));

describe('home page recoveries (the owner, 2026-10-01)', () => {
  it('feature $6.8M, $5.75M, and the $2.7M Fontana crash, which says it is combined for five people', () => {
    const { container } = render(<Home />);
    const recoveries = cards(container, '.recovery-card');
    expect(recoveries.map((card) => card.text.match(/\$[\d.]+M/)![0])).toEqual(['$6.8M', '$5.75M', '$2.7M']);
    expect(recoveries[2]).toMatchObject({ label: 'Settlement', href: '/results/fontana-intersection-crash-settlement' });
    expect(recoveries[2].text).toContain('Combined settlement for five injured people');
  });

  it('no longer label the $2.2M a confidential settlement: the firm has written consent to publish it', () => {
    const { container } = render(<Home />);
    const settlement = cards(container, '.news-card').find((card) => card.text.includes('$2.2M'))!;
    expect(settlement.label).toBe('Settlement');
    expect(settlement.text).not.toMatch(/confiden/i);
  });

  it('read the same on /es, linking only Spanish pages', () => {
    const { container } = render(<SpanishHomePage />);
    const recoveries = cards(container, '.recovery-card');
    expect(recoveries.map((card) => card.text.match(/\$[\d.]+M/)![0])).toEqual(['$6.8M', '$5.75M', '$2.7M']);
    expect(recoveries[2].text).toContain('Acuerdo combinado para cinco personas lesionadas');
    const news = cards(container, '.news-card');
    expect(news.find((card) => card.text.includes('$2.2M'))!.label).toBe('Acuerdo');
    expect(news.find((card) => card.text.includes('$2.2M'))!.text).not.toMatch(/confiden/i);
    expect([...recoveries, ...news].filter((card) => !card.href!.startsWith('/es')).map((card) => card.href)).toEqual([]);
  });
});
