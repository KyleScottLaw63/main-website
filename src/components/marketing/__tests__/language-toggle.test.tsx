import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

let pathname = '/';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));

import { LanguageToggle } from '@/components/marketing/LanguageSwitcher';

afterEach(cleanup);

describe('the mobile header language toggle', () => {
  it('on the English site, shows ES and opens this page in Spanish', () => {
    pathname = '/results';
    render(<LanguageToggle />);
    const link = screen.getByRole('link', { name: 'ES: ver esta página en español' });
    expect(link).toHaveAttribute('href', '/es/resultados');
    expect(link).toHaveAttribute('lang', 'es');
    expect(link).toHaveAttribute('hreflang', 'es-US');
  });

  it('on the Spanish site, shows EN and opens this page in English', () => {
    pathname = '/es/equipo';
    render(<LanguageToggle />);
    expect(screen.getByRole('link', { name: 'EN: view this page in English' })).toHaveAttribute('href', '/meet-the-team');
  });

  it('sends an English-only page (a case story) to the Spanish home page, like the menu’s switcher', () => {
    pathname = '/results/octa-bus-crash-verdict';
    render(<LanguageToggle />);
    expect(screen.getByRole('link', { name: /^ES:/ })).toHaveAttribute('href', '/es');
  });
});
