import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Page chrome is irrelevant here and pulls in client-only navigation.
vi.mock('@/components/marketing/SiteHeader', () => ({ SiteHeader: () => null }));
vi.mock('@/components/marketing/SiteFooter', () => ({ SiteFooter: () => null }));
vi.mock('@/components/marketing/ChatWidget', () => ({ ChatWidget: () => null }));

import { LegalGuidePage } from '@/components/marketing/LegalGuidePage';
import { PracticeAreaPage } from '@/components/marketing/PracticeAreaPage';
import { legalGuideBySlug } from '@/lib/marketing/data/legalGuides';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishPracticeAreaByKey } from '@/lib/marketing/data/spanishPracticeAreas';

afterEach(cleanup);

const spanishClaimGuide = spanishLegalGuides.find((guide) => guide.englishSlug === 'government-injury-claim-orange-county')!;

describe('a guide page', () => {
  it('in Spanish: its title as the only h1, the deadline tool and every label in Spanish, and Spanish links', () => {
    const { container } = render(<LegalGuidePage guide={spanishClaimGuide} locale="es" />);
    expect(screen.getAllByRole('heading', { level: 1 }).map((heading) => heading.textContent)).toEqual([spanishClaimGuide.title]);
    expect(screen.getByLabelText('Fecha de la lesión')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guías legales' })).toHaveAttribute('href', '/es/guias');
    expect(screen.getByRole('link', { name: /^Solicitar revisión del caso/ })).toHaveAttribute('href', '/es/contacto#revision-del-caso');
    expect(screen.getByRole('link', { name: /^Más sobre lesiones personales/ })).toHaveAttribute('href', '/es/abogado-de-lesiones-personales-condado-de-orange');
    for (const related of spanishClaimGuide.relatedSlugs) expect(container.querySelector(`a[href="/es/guias/${related}"]`), related).not.toBeNull();
    expect(container).toHaveTextContent(`Actualizada el ${spanishClaimGuide.updatedLabel}`);
    expect(container.textContent).not.toMatch(/Key points|Direct answer|Related legal guides|Request a case review|General information only|Date of injury/);
    const jsonLd = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
    expect(jsonLd['@graph'][0]).toMatchObject({ '@type': 'Article', headline: spanishClaimGuide.title, inLanguage: 'es-US' });
    expect(jsonLd['@graph'][1].itemListElement.map((item: { name: string }) => item.name)).toEqual(['Inicio', 'Guías legales', spanishClaimGuide.title]);
  });

  it('in English: unchanged, with the English tool and links', () => {
    const guide = legalGuideBySlug('government-injury-claim-orange-county')!;
    const { container } = render(<LegalGuidePage guide={guide} />);
    expect(screen.getByLabelText('Date of injury')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Legal Guides' })).toHaveAttribute('href', '/guides');
    expect(screen.getByRole('link', { name: /^Request a case review/ })).toHaveAttribute('href', '/contact#case-review');
    expect(container).toHaveTextContent(`Updated ${guide.updatedLabel}`);
    expect(JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!)['@graph'][0].inLanguage).toBe('en-US');
  });
});

describe('a Spanish practice page', () => {
  it('lists its Spanish guides, linked to /es/guias', () => {
    const { container } = render(<PracticeAreaPage area={spanishPracticeAreaByKey['car-accidents']} locale="es" />);
    const section = container.querySelector('#guides')!;
    expect(section).toHaveTextContent('Respuestas a preguntas comunes sobre accidentes de auto.');
    const links = [...section.querySelectorAll('a')].map((link) => link.getAttribute('href'));
    expect(links[0]).toBe('/es/guias');
    expect(links.slice(1).length).toBeGreaterThan(0);
    expect(links.slice(1).every((href) => href?.startsWith('/es/guias/'))).toBe(true);
  });
});
