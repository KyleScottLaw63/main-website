import { describe, expect, it } from 'vitest';
import { areaRegions, practiceGroups } from '@/lib/marketing/data/areasWeServe';
import { cityPracticePages } from '@/lib/marketing/data/cityPracticePages';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';

describe('/areas-we-serve', () => {
  it('lists every city and regional page exactly once, and nothing else', () => {
    const listed = areaRegions.flatMap((region) => region.keys);
    expect(new Set(listed).size).toBe(listed.length);
    expect([...listed].sort()).toEqual(serviceAreas.map((area) => area.key).sort());
  });

  it('lists every practice exactly once, and nothing else', () => {
    const listed = practiceGroups.flatMap((group) => group.keys);
    expect(new Set(listed).size).toBe(listed.length);
    expect([...listed].sort()).toEqual(practiceAreas.map((area) => area.key).sort());
  });

  it('can place every city + case page under its city', () => {
    const cities = new Set(serviceAreas.map((area) => area.city));
    expect(cityPracticePages.filter((page) => !cities.has(page.city ?? '')).map((page) => page.key)).toEqual([]);
  });
});
