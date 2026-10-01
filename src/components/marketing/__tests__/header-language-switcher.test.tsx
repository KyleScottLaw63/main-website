import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

let pathname = '/';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));

import { LanguageSwitcher } from '@/components/marketing/LanguageSwitcher';

afterEach(cleanup);

describe('the mobile header language switcher', () => {
  it('shows the current language, EN, and opens English and Español', () => {
    pathname = '/results';
    render(<LanguageSwitcher compact />);
    const button = screen.getByRole('button', { name: 'EN, English: change language' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /English/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /Español/ })).toHaveAttribute('href', '/es/resultados');
  });

  it('on the Spanish site shows ES, and English leads to this page in English', () => {
    pathname = '/es/equipo';
    render(<LanguageSwitcher compact />);
    fireEvent.click(screen.getByRole('button', { name: 'ES, Español: cambiar idioma' }));
    expect(screen.getByRole('link', { name: /English/ })).toHaveAttribute('href', '/meet-the-team');
  });

  it('keeps its own menu id beside the desktop switcher in the same header', () => {
    pathname = '/';
    const { container } = render(<><LanguageSwitcher /><LanguageSwitcher compact /></>);
    const ids = [...container.querySelectorAll('.language-switcher-dropdown')].map((menu) => menu.id);
    expect(ids).toEqual(['desktop-language-options', 'header-language-options']);
  });
});
