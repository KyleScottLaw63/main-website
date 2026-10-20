import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { HeroCallActions } from '@/components/marketing/CallActions';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { SiteFooter } from '@/components/marketing/SiteFooter';

afterEach(cleanup);

describe('calls to action', () => {
  it('every page (through the footer) carries the phone bar, tap-to-call first, in English and Spanish', () => {
    for (const [locale, label, call, review, contact] of [
      ['en', 'Call or contact Kyle Scott Law', 'Call 714-544-1460', 'Free case review', '/contact#case-review'],
      ['es', 'Llame o contacte a Kyle Scott Law', 'Llame al 714-544-1460', 'Consulta gratuita', '/es/contacto#revision-del-caso'],
    ] as const) {
      render(<SiteFooter locale={locale} />);
      const links = within(screen.getByRole('region', { name: label })).getAllByRole('link');
      expect(links.map((link) => [link.textContent, link.getAttribute('href')])).toEqual([[call, 'tel:+17145441460'], [review, contact]]);
      cleanup();
    }
  });

  it('the practice and city page heading offers the call and the case review', () => {
    render(<HeroCallActions />);
    expect(screen.getByRole('link', { name: 'Call 714-544-1460' })).toHaveAttribute('href', 'tel:+17145441460');
    expect(screen.getByRole('link', { name: /Free case review/ })).toHaveAttribute('href', '/contact#case-review');
  });

  it('"How it works" gives three steps, the tap-to-call number, the Google rating, and the firm’s one fee statement', () => {
    for (const locale of ['en', 'es'] as const) {
      const { container } = render(<HowItWorks locale={locale} />);
      expect(container.querySelectorAll('.how-it-works-steps li')).toHaveLength(3);
      expect(container.querySelector('a[href="tel:+17145441460"]')).not.toBeNull();
      expect(container.querySelector('a.hero-review-badge')).not.toBeNull();
      expect(container.textContent).toContain(noRecoveryTerms[locale].statement);
      cleanup();
    }
  });
});
