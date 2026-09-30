import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Page chrome is irrelevant here and pulls in client-only navigation.
vi.mock('@/components/marketing/SiteHeader', () => ({ SiteHeader: () => null }));
vi.mock('@/components/marketing/SiteFooter', () => ({ SiteFooter: () => null }));
vi.mock('@/components/marketing/ChatWidget', () => ({ ChatWidget: () => null }));

import ResultsPage from '@/app/(site)/results/page';
import { CaseStoryPage } from '@/components/marketing/CaseStoryPage';
import { caseStories, caseStoryHeadline, caseStoryLinks } from '@/lib/marketing/data/caseStories';

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
  });

  it('tells a confidential settlement without any amount', () => {
    const story = caseStories.find((item) => item.slug === 'store-floor-fall-settlement')!;
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
      // The story card, plus the ledger row (and, for the $5.75M verdict, the flagship card).
      expect(hrefs.filter((href) => href === `/results/${story.slug}`).length, story.slug).toBeGreaterThanOrEqual(2);
    }
    expect(screen.getByRole('heading', { level: 2, name: 'The story behind the result.' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Recent firm announcements.' })).toBeNull();
  });
});
