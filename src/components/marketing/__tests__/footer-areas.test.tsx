import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';

afterEach(cleanup);

describe('footer "Areas we serve"', () => {
  it('links every English city page from the English footer', () => {
    render(<SiteFooter />);
    const nav = screen.getByRole('navigation', { name: 'Areas we serve' });
    const hrefs = within(nav).getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs.sort()).toEqual(serviceAreas.map((area) => area.path).sort());
  });

  it('links every Spanish city page, and only Spanish pages, from the Spanish footer', () => {
    render(<SiteFooter locale="es" />);
    const nav = screen.getByRole('navigation', { name: 'Ciudades que atendemos' });
    const hrefs = within(nav).getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs.sort()).toEqual(spanishServiceAreas.map((area) => area.path).sort());
    for (const href of hrefs) expect(href).toMatch(/^\/es\//);
  });
});
