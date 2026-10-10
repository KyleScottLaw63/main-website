import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { firmIdentity, SITE_URL } from '@/lib/marketing/site';

/**
 * public/llms.txt is the plain-text summary an AI assistant reads to describe and cite the firm
 * (docs/website-ai-search.md). It must name every practice, city, and guide page in both
 * languages, so a new page is never invisible there, and state the canonical contact facts.
 */
const text = readFileSync('public/llms.txt', 'utf8');

describe('public/llms.txt', () => {
  it('lists every practice, city, and guide page in both languages', () => {
    const paths = [
      ...practiceAreas.map((area) => area.path),
      ...spanishPracticeAreas.map((area) => area.path),
      ...serviceAreas.map((area) => area.path),
      ...legalGuides.map((guide) => `/guides/${guide.slug}`),
      ...spanishLegalGuides.map((guide) => `/es/guias/${guide.slug}`),
    ];
    const missing = paths.filter((path) => !text.includes(`(${SITE_URL}${path})`));
    expect(missing).toEqual([]);
  });

  it('states the canonical contact facts and the two notices', () => {
    expect(text).toContain(firmIdentity.telephone);
    expect(text).toContain(firmIdentity.email);
    expect(text).toContain(`${firmIdentity.streetAddress}, ${firmIdentity.addressLocality}, ${firmIdentity.addressRegion} ${firmIdentity.postalCode}`);
    expect(text).toContain('Prior results do not guarantee a similar outcome.');
    expect(text).toContain('not legal advice');
  });

  it('gives the three fixed verdict labels and no other dollar amounts', () => {
    for (const label of ['$6.8M (school negligence)', '$6M (abuse case)', '$5.75M (brain injury)']) expect(text).toContain(label);
    expect(text.match(/\$[\d.,]+M?/g)).toEqual(['$6.8M', '$6M', '$5.75M', '$50']);
  });
});
