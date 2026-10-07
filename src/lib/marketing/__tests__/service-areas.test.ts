import { describe, expect, it } from 'vitest';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';

describe('city pages', () => {
  it('name no one a claim was against, only the kind of place or agency (the firm, 2026-10-06)', () => {
    const named = /\b(?:LBUSD|Long Beach Unified|OCTA|Orange County Transportation Authority|Office Depot|Disneyland|Osprey)\b/;
    expect(serviceAreas.filter((area) => named.test(JSON.stringify(area))).map((area) => area.city)).toEqual([]);
  });

  it('send a bite report where the city sends it: OC Animal Care only in its contract cities', () => {
    // "OC Animal Care services 14 contract cities and the unincorporated areas" (animalcare.oc.gov, Cities We Service, 2024-09; checked 2026-10-06).
    // Irvine, Santa Ana, Costa Mesa, Garden Grove, and Newport Beach run their own animal services.
    const contractCities = ['Anaheim', 'Brea', 'Cypress', 'Fountain Valley', 'Fullerton', 'Huntington Beach', 'Lake Forest', 'Los Alamitos', 'Orange', 'Placentia', 'San Juan Capistrano', 'Tustin', 'Villa Park', 'Yorba Linda'];
    for (const area of serviceAreas) {
      const report = area.local.flatMap((group) => group.items).filter((item) => item.includes('for bite reports'));
      expect(report, area.city).toHaveLength(1);
      expect(report[0].startsWith('OC Animal Care'), area.city).toBe(contractCities.includes(area.city));
    }
  });
});
