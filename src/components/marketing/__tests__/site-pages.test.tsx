import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Page chrome is irrelevant here and pulls in client-only navigation.
vi.mock('@/components/marketing/SiteHeader', () => ({ SiteHeader: () => null }));
vi.mock('@/components/marketing/SiteFooter', () => ({ SiteFooter: () => null }));
vi.mock('@/components/marketing/ChatWidget', () => ({ ChatWidget: () => null }));

import TestimonialsPage from '@/app/(site)/testimonials/page';
import SpanishTestimonialsPage from '@/app/(site-es)/es/testimonios/page';
import { LegacyNewsArticlePage } from '@/components/marketing/LegacyNewsArticlePage';
import { Dialog, DialogContent, DialogTitle } from '@/components/marketing/ui/dialog';
import { legacyArchiveNoticeText, legacyPostBySlug, legacyPosts } from '@/lib/marketing/data/legacyPosts';

afterEach(cleanup);

describe('testimonials pages', () => {
  it('shows client testimonials only — no staff endorsement (Rule 7.1)', () => {
    render(<TestimonialsPage />);
    expect(document.body).not.toHaveTextContent(/Hayley|Lawson/);
    expect(screen.getAllByText('Published client testimonial')).toHaveLength(3);

    cleanup();
    render(<SpanishTestimonialsPage />);
    expect(document.body).not.toHaveTextContent(/Hayley|Lawson/);
    expect(screen.getAllByText('Testimonio de cliente publicado')).toHaveLength(3);
  });

  it('announces the star ratings (role="img" with a name)', () => {
    render(<TestimonialsPage />);
    expect(screen.getAllByRole('img', { name: 'Five stars' }).length).toBeGreaterThan(0);
    cleanup();
    render(<SpanishTestimonialsPage />);
    expect(screen.getAllByRole('img', { name: 'Cinco estrellas' }).length).toBeGreaterThan(0);
  });
});

describe('archived article page', () => {
  // docs/website-content-compliance.md: each post states the law in its own text; the only notice is
  // one neutral, dated line, and nothing on the page speaks of accuracy, corrections, or changes.
  const EDITORIAL_WORDING = /editor[’']?s? note|incorrect even when|misstat|\b(?:was|were) wrong\b|law may have changed|as it stood then|\bcorrections? (?:and|were|was)\b|From the firm archive/i;

  it('every archived post opens with the same neutral, dated line and nothing else', () => {
    for (const post of legacyPosts) {
      const { container } = render(<LegacyNewsArticlePage article={post} />);
      const notice = screen.getByRole('complementary', { name: 'About this archived article' });
      expect(notice.textContent, post.slug).toBe(legacyArchiveNoticeText(post));
      expect(notice.querySelector('a'), post.slug).toBeNull();
      expect(container.querySelector('.legacy-editor-note'), post.slug).toBeNull();
      expect(container.textContent, post.slug).not.toMatch(EDITORIAL_WORDING);
      cleanup();
    }
    // Renders all 195 archived posts: about 2.5 s alone, over the 5 s default when a build shares the CPU.
  }, 30_000);

  it('a rewritten post reads as written: the dated line, its own text, and no revision label', () => {
    const post = legacyPostBySlug('can-sexual-harassment-turn-into-sexual-assault')!;
    expect(post.editedOn).toBe('2026-09-24');
    const { container } = render(<LegacyNewsArticlePage article={post} />);
    expect(screen.getByRole('complementary', { name: 'About this archived article' })).toHaveTextContent(
      /^Originally published January 2021\. General information, not legal advice\.$/,
    );
    const visible = [...container.querySelectorAll('article')].map((node) => node.textContent).join(' ');
    expect(visible).toMatch(/three years from the last incident of harassment to file a complaint with the California Civil Rights Department/);
    expect(visible).not.toMatch(/\bone year\b[^.]*\bto file\b/i);
    // The revision date stays in the metadata only: structured data carries it; the page never shows it.
    expect(visible).not.toMatch(/September(?: 24,)? 2026|\b(?:updated|corrected|revised|edited)\b/i);
    const jsonLd = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
    expect(jsonLd['@graph'][0]).toMatchObject({ datePublished: '2021-01-07', dateModified: '2026-09-24' });
  });

  it('firm numbers in the text are tap-to-call, and no retired number is rendered', () => {
    render(<LegacyNewsArticlePage article={legacyPostBySlug('california-personal-injury-verdict-largest-ever')!} />);
    expect(screen.getByRole('link', { name: '714-544-1460' })).toHaveAttribute('href', 'tel:+17145441460');
    expect(document.body).not.toHaveTextContent('717-544-1460');
    cleanup();

    // The post whose old URL carried the retired 949 number: nothing rendered — text,
    // links, or JSON-LD — may contain it.
    const { container } = render(<LegacyNewsArticlePage article={legacyPostBySlug('tired-insurance-adjuster-telling-no-case-call-kyle-scott')!} />);
    expect(container.innerHTML).not.toContain('949-423-3944');
    expect(container.innerHTML).not.toContain('isBasedOn');
  });
});

describe('dialog close button', () => {
  it('uses the page language for its screen-reader name', () => {
    render(
      <Dialog open>
        <DialogContent closeLabel="Cerrar">
          <DialogTitle>Menú</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
  });
});
