import { describe, expect, it } from 'vitest';
import { websiteStructuredData } from '@/lib/marketing/structured-data';
import { firmIdentity, SITE_URL } from '@/lib/marketing/site';

describe('WebSite structured data', () => {
  it('names the site after the firm, in each language, published by the firm', () => {
    for (const locale of ['en', 'es'] as const) {
      const site = websiteStructuredData(locale);
      expect(site['@type']).toBe('WebSite');
      expect(site.name).toBe(firmIdentity.name);
      expect(site.alternateName).toBe('KJS Law');
      expect(site.publisher).toEqual({ '@id': `${SITE_URL}/#legal-service` });
    }
    expect(websiteStructuredData('en').url).toBe(SITE_URL);
    expect(websiteStructuredData('en').inLanguage).toBe('en-US');
    expect(websiteStructuredData('es').url).toBe(`${SITE_URL}/es`);
    expect(websiteStructuredData('es').inLanguage).toBe('es-US');
  });
});
