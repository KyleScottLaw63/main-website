import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Page chrome is irrelevant here and pulls in client-only navigation.
vi.mock('@/components/marketing/SiteHeader', () => ({ SiteHeader: () => null }));
vi.mock('@/components/marketing/SiteFooter', () => ({ SiteFooter: () => null }));
vi.mock('@/components/marketing/ChatWidget', () => ({ ChatWidget: () => null }));

import NewsPage from '@/app/(site)/news/page';
import SpanishNewsPage from '@/app/(site-es)/es/noticias/page';

afterEach(cleanup);

const cards = (container: HTMLElement) =>
  [...container.querySelectorAll('#case-news .news-case-card')].map((card) => ({
    href: card.querySelector('a')!.getAttribute('href'),
    text: card.textContent,
  }));

describe('Case Results & Firm News', () => {
  it('shows the $5.75M verdict’s case story beside the firm’s announcements, newest first (the owner, 2026-10-01)', () => {
    const { container } = render(<NewsPage />);
    expect(cards(container).map((card) => card.href)).toEqual([
      '/news/sexual-molestation-battery-settlement-2-2-million',
      '/results/student-skull-fracture-verdict',
      '/news/court-of-appeal-new-trial',
    ]);
    expect(cards(container)[1].text).toMatch(/Jury verdict.*2019.*\$5\.75M.*Student suffers skull fracture and brain bleed.*Read the case story/);
  });

  it('shows it on /es/noticias too, opening the Spanish results page: the Spanish site links no English-only page', () => {
    const { container } = render(<SpanishNewsPage />);
    expect(cards(container).map((card) => card.href)).toEqual([
      '/es/noticias/acuerdo-abuso-sexual-2-2-millones',
      '/es/resultados#flagship-title',
      '/es/noticias/victoria-apelacion-nuevo-juicio',
    ]);
    expect(cards(container)[1].text).toMatch(/Veredicto del jurado.*2019.*\$5\.75M.*Estudiante sufre fractura de cráneo y hemorragia cerebral.*Ver en resultados/);
  });
});
