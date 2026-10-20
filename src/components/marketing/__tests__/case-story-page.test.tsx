import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Page chrome is irrelevant here and pulls in client-only navigation.
vi.mock('@/components/marketing/SiteHeader', () => ({ SiteHeader: () => null }));
vi.mock('@/components/marketing/SiteFooter', () => ({ SiteFooter: () => null }));
vi.mock('@/components/marketing/ChatWidget', () => ({ ChatWidget: () => null }));
vi.mock('@/components/marketing/ConsultationForm', () => ({ ConsultationForm: () => null }));

import ResultsPage from '@/app/(site)/results/page';
import SpanishHomePage from '@/app/(site-es)/es/page';
import SpanishNewsPage from '@/app/(site-es)/es/noticias/page';
import SpanishResultsPage from '@/app/(site-es)/es/resultados/page';
import { CaseStoryPage } from '@/components/marketing/CaseStoryPage';
import { PracticeAreaPage } from '@/components/marketing/PracticeAreaPage';
import { caseStories, caseStoryHeadline, caseStoryLinks } from '@/lib/marketing/data/caseStories';
import { spanishCaseStories, spanishCaseStoryHeadline, spanishCaseStoryLinks } from '@/lib/marketing/data/spanishCaseStories';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { caseStoryPathForLocale } from '@/lib/marketing/spanishResults';

afterEach(cleanup);

describe('case story page', () => {
  it('reads as one article: its title as the only h1, its figure, the result disclaimer, and tap-to-call', () => {
    for (const story of caseStories) {
      const headline = caseStoryHeadline(story);
      const { container } = render(<CaseStoryPage story={story} />);
      expect(screen.getAllByRole('heading', { level: 1 }).map((heading) => heading.textContent), story.slug).toEqual([headline.title]);
      expect(container.querySelector('.case-story-amount'), story.slug).toHaveTextContent(headline.figure);
      expect(container, story.slug).toHaveTextContent('Prior results do not guarantee a similar outcome.');
      expect(screen.getByRole('link', { name: /714-544-1460/ })).toHaveAttribute('href', 'tel:+17145441460');
      const jsonLd = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
      expect(jsonLd['@graph'][0], story.slug).toMatchObject({ '@type': 'Article', headline: headline.title, url: `https://kjslaw.com/results/${story.slug}` });
      cleanup();
    }
    // Renders every story page in turn; under a full parallel run it can pass 5 s on a busy machine.
  }, 30_000);

  it('tells a confidential settlement without any amount', () => {
    const story = caseStories.find((item) => item.slug === 'nursing-facility-pressure-wound-settlement')!;
    const { container } = render(<CaseStoryPage story={story} />);
    const article = container.querySelector('article')!;
    expect(article).toHaveTextContent('Confidential settlement');
    expect(article.textContent).not.toMatch(/\$\d/);
  });

  it('draws the comparison to scale: the defense’s $157,000 beside the $928,493.12 verdict', () => {
    const { container } = render(<CaseStoryPage story={caseStories.find((item) => item.slug === 'octa-bus-crash-verdict')!} />);
    expect([...container.querySelectorAll<HTMLElement>('.case-story-bar > i')].map((bar) => bar.style.width)).toEqual(['17%', '100%']);
  });
});

describe('results page', () => {
  it('shows the six newest stories, the rest on request, and links a carded story from its result too', () => {
    const { container } = render(<ResultsPage />);
    const section = container.querySelector('.case-stories-section')!;
    expect(section.querySelectorAll(':scope > .case-story-grid .case-story-card')).toHaveLength(6);
    const all = [...section.querySelectorAll('.case-story-card')].map((card) => card.getAttribute('href'));
    expect(all).toEqual(caseStoryLinks().map((link) => link.href));
    expect(section.querySelector('details summary')).toHaveTextContent(`Show all ${all.length} case stories`);
    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    for (const story of caseStories.filter((item) => !item.confidential)) {
      // The ledger row, plus the story card when the story is listed (and, for the $5.75M verdict, the flagship card).
      const path = `/results/${story.slug}`;
      expect(hrefs.filter((href) => href === path).length, story.slug).toBeGreaterThanOrEqual(all.includes(path) ? 2 : 1);
    }
    // Off /results on the firm's instruction (2026-10-01).
    expect(container).not.toHaveTextContent('$2.3M');
    expect(hrefs).not.toContain('/news/riverside-jury-verdict-2-3-million');
    expect(screen.getByRole('heading', { level: 2, name: 'The story behind the result.' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Recent firm announcements.' })).toBeNull();
  });
});

const hrefs = (container: HTMLElement) => [...container.querySelectorAll('a[href]')].map((link) => link.getAttribute('href')!);

describe('Spanish case story page', () => {
  it('reads as one Spanish article, linking Spanish pages, and marks an English-only announcement "(en inglés)"', () => {
    for (const story of spanishCaseStories) {
      const headline = spanishCaseStoryHeadline(story);
      const { container } = render(<CaseStoryPage story={story} locale="es" />);
      expect(screen.getAllByRole('heading', { level: 1 }).map((heading) => heading.textContent), story.slug).toEqual([headline.title]);
      expect(container.querySelector('.case-story-amount'), story.slug).toHaveTextContent(headline.figure);
      expect(container, story.slug).toHaveTextContent('Los resultados anteriores no garantizan un resultado similar.');
      expect(screen.getByRole('link', { name: /714-544-1460/ })).toHaveAttribute('href', 'tel:+17145441460');
      const jsonLd = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
      expect(jsonLd['@graph'][0], story.slug).toMatchObject({ '@type': 'Article', headline: headline.title, inLanguage: 'es-US', url: `https://kjslaw.com/es/resultados/${story.slug}` });
      expect(jsonLd['@graph'][1].itemListElement.map((item: { item: string }) => item.item), story.slug).toEqual(['https://kjslaw.com/es', 'https://kjslaw.com/es/resultados', `https://kjslaw.com/es/resultados/${story.slug}`]);
      const links = hrefs(container);
      expect(links, story.slug).toEqual(expect.arrayContaining(['/es/resultados', '/es/contacto#revision-del-caso', story.practiceArea.href, '/es/resultados#case-stories-title']));
      const english = links.filter((href) => !href.startsWith('/es') && !href.startsWith('tel:'));
      expect(english, story.slug).toEqual(story.announcement?.inEnglish ? [story.announcement.href] : []);
      for (const href of english) {
        const link = container.querySelector(`a[href="${href}"]`)!;
        expect(link, story.slug).toHaveAttribute('hreflang', 'en');
        expect(link, story.slug).toHaveTextContent(`${story.announcement!.label} (en inglés)`);
      }
      expect(container.textContent, story.slug).not.toMatch(/\bCase story\b|Read the story|Verdicts & Settlements/);
      cleanup();
    }
  }, 30_000);

  it('tells the confidential settlement without any amount', () => {
    const story = spanishCaseStories.find((item) => item.englishSlug === 'nursing-facility-pressure-wound-settlement')!;
    const { container } = render(<CaseStoryPage story={story} locale="es" />);
    const article = container.querySelector('article')!;
    expect(article).toHaveTextContent('Acuerdo confidencial');
    expect(article.textContent).not.toMatch(/\$\d/);
  });

  it('draws the comparison to scale, as in English', () => {
    const { container } = render(<CaseStoryPage story={spanishCaseStories.find((item) => item.englishSlug === 'octa-bus-crash-verdict')!} locale="es" />);
    expect([...container.querySelectorAll<HTMLElement>('.case-story-bar > i')].map((bar) => bar.style.width)).toEqual(['17%', '100%']);
  });
});

describe('Spanish results page', () => {
  it('shows the six newest Spanish stories, the rest on request, and links a carded story from its result too', () => {
    const { container } = render(<SpanishResultsPage />);
    const section = container.querySelector('.case-stories-section')!;
    expect(section.querySelectorAll(':scope > .case-story-grid .case-story-card')).toHaveLength(6);
    const all = [...section.querySelectorAll('.case-story-card')].map((card) => card.getAttribute('href'));
    expect(all).toEqual(spanishCaseStoryLinks().map((link) => link.href));
    expect(section.querySelector('details summary')).toHaveTextContent(`Ver las ${all.length} historias de casos`);
    const links = hrefs(container);
    for (const story of caseStories.filter((item) => !item.confidential)) {
      const path = caseStoryPathForLocale(story.slug, 'es');
      expect(links.filter((href) => href === path).length, story.slug).toBeGreaterThanOrEqual(all.includes(path) ? 2 : 1);
    }
    expect(screen.getByRole('heading', { level: 2, name: 'La historia detrás del resultado.' })).toBeInTheDocument();
  });
});

describe('Spanish pages', () => {
  it('link the Spanish case stories, never an English one', () => {
    const pages = [
      <SpanishHomePage key="home" />,
      <SpanishNewsPage key="news" />,
      <SpanishResultsPage key="results" />,
      ...spanishCaseStories.map((story) => <CaseStoryPage story={story} locale="es" key={story.slug} />),
      ...spanishPracticeAreas.map((area) => <PracticeAreaPage area={area} locale="es" key={area.path} />),
    ];
    for (const page of pages) {
      const { container } = render(page);
      expect(hrefs(container).filter((href) => /^\/results(?:\/|$|#)/.test(href)), String(page.key)).toEqual([]);
      cleanup();
    }
    // The Spanish home page links the two stories its English twin links.
    const { container } = render(<SpanishHomePage />);
    expect(hrefs(container)).toEqual(expect.arrayContaining([caseStoryPathForLocale('student-skull-fracture-verdict', 'es'), caseStoryPathForLocale('fontana-intersection-crash-settlement', 'es')]));
  }, 60_000);
});
