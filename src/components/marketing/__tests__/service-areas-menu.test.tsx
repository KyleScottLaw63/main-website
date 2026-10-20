import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ServiceAreasMenu } from '@/components/marketing/ServiceAreasMenu';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';

afterEach(cleanup);

describe('header "Service Areas" menu', () => {
  it('has four categories that together link every city and regional page, in English', () => {
    const { container } = render(<ServiceAreasMenu />);
    expect(container.querySelectorAll('.nav-menu-region')).toHaveLength(4);
    for (const area of serviceAreas) expect(container.querySelector(`.nav-menu-cities a[href="${area.path}"]`), area.path).not.toBeNull();
  });

  it('links each city’s Spanish page where there is one, in Spanish', () => {
    const { container } = render(<ServiceAreasMenu locale="es" />);
    for (const area of spanishServiceAreas) expect(container.querySelector(`.nav-menu-cities a[href="${area.path}"]`), area.path).not.toBeNull();
  });
});
