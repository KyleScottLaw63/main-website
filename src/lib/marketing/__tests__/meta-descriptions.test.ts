import { describe, expect, it } from 'vitest';
import { areasWeServe } from '@/lib/marketing/data/areasWeServe';
import { cityPracticePages } from '@/lib/marketing/data/cityPracticePages';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishCityPracticePages } from '@/lib/marketing/data/spanishCityPracticePages';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';
import { whyHireUs } from '@/lib/marketing/data/whyHireUs';

/**
 * What Google shows under a page's title (docs/search-result-descriptions.md). The site appeared in search about
 * 511,000 times and was rarely clicked, partly because descriptions of 170-250 characters were cut off mid-sentence.
 * These checks hold every practice, city, city + case, and guide description to the rules: short, unique, no figures,
 * no superlatives, no fee wording other than the approved one, and a call to action at the end.
 */
type Lang = 'en' | 'es';
type Row = { lang: Lang; kind: string; id: string; text: string | undefined };

const rows: Row[] = [
  ...practiceAreas.map((a) => ({ lang: 'en' as const, kind: 'practice', id: a.path, text: a.metaDescription })),
  ...spanishPracticeAreas.map((a) => ({ lang: 'es' as const, kind: 'practice', id: a.path, text: a.metaDescription })),
  ...serviceAreas.map((a) => ({ lang: 'en' as const, kind: 'city', id: a.path, text: a.metaDescription })),
  ...spanishServiceAreas.map((a) => ({ lang: 'es' as const, kind: 'city', id: a.path, text: a.metaDescription })),
  ...cityPracticePages.map((a) => ({ lang: 'en' as const, kind: 'city + case', id: a.path, text: a.metaDescription })),
  ...spanishCityPracticePages.map((a) => ({ lang: 'es' as const, kind: 'city + case', id: a.path, text: a.metaDescription })),
  ...legalGuides.map((g) => ({ lang: 'en' as const, kind: 'guide', id: g.path, text: g.metaDescription })),
  ...spanishLegalGuides.map((g) => ({ lang: 'es' as const, kind: 'guide', id: g.path, text: g.metaDescription })),
  // The two core pages whose description lives in a data file (the rest are in their page files).
  { lang: 'en', kind: 'core', id: whyHireUs.en.path, text: whyHireUs.en.metaDescription },
  { lang: 'es', kind: 'core', id: whyHireUs.es.path, text: whyHireUs.es.metaDescription },
  { lang: 'en', kind: 'core', id: areasWeServe.path, text: areasWeServe.metaDescription },
];

const ALLOWED_NUMBERS = /714-544-1460|1991/g;

const failing = (check: (text: string, row: Row) => boolean) => rows.filter((row) => !check(row.text ?? '', row)).map((row) => `${row.kind} ${row.id}`);
const matching = (pattern: RegExp) => rows.filter((row) => pattern.test(row.text ?? '')).map((row) => `${row.kind} ${row.id}: ${(row.text ?? '').match(pattern)?.[0]}`);

describe('search-result descriptions (practice, city, city + case, and guide pages, both languages)', () => {
  it('covers every record', () => {
    for (const kind of ['practice', 'city', 'city + case', 'guide']) {
      for (const lang of ['en', 'es'] as const) expect(rows.filter((row) => row.kind === kind && row.lang === lang).length).toBeGreaterThan(0);
    }
  });

  it('gives every record a description, and every guide one of its own', () => {
    expect(rows.filter((row) => !row.text).map((row) => `${row.kind} ${row.id}`)).toEqual([]);
    for (const guide of [...legalGuides, ...spanishLegalGuides]) {
      expect(guide.metaDescription, guide.path).toBeTruthy();
      // The guide's own `description` is shown on the page; the search text is a separate, shorter one.
      expect(guide.metaDescription, guide.path).not.toBe(guide.description);
    }
  });

  it('is 90 to 155 characters, so Google shows all of it', () => {
    expect(failing((text) => text.length >= 90 && text.length <= 155)).toEqual([]);
  });

  it('is unique within each language', () => {
    for (const lang of ['en', 'es'] as const) {
      const byText = new Map<string, string[]>();
      for (const row of rows.filter((r) => r.lang === lang)) byText.set(row.text ?? '', [...(byText.get(row.text ?? '') ?? []), row.id]);
      expect([...byText.values()].filter((ids) => ids.length > 1)).toEqual([]);
    }
  });

  it('has no dollar amount, percentage, or number (only the firm’s phone number and 1991)', () => {
    expect(matching(/[$%]/)).toEqual([]);
    expect(rows.filter((row) => /\d/.test((row.text ?? '').replace(ALLOWED_NUMBERS, ''))).map((row) => `${row.kind} ${row.id}`)).toEqual([]);
  });

  it('makes no superlative, specialist, expert, ranking, or guarantee claim', () => {
    expect(matching(/\b(best|top|expert|specialist|leading|guarantee[sd]?)\b|#\s?1\b|\bwe win\b|\bget you paid\b/i)).toEqual([]);
  });

  it('writes no fee wording but the approved fee-only line', () => {
    expect(matching(/no fees? or costs?|fees or costs unless|honorarios (ni|o|y) (costos|gastos)|risk-free|no financial risk|sin riesgo/i)).toEqual([]);
    // Fee-only lines need no cost disclosure while the client never repays costs (docs/website-content-compliance.md).
    const feeLines = rows.filter((row) => /\bfees?\b|honorarios/i.test(row.text ?? ''));
    expect(feeLines.filter((row) => !/no fee unless there is a recovery|sin honorarios a menos que haya una recuperación/.test(row.text ?? '')).map((row) => `${row.kind} ${row.id}`)).toEqual([]);
  });

  it('names no party from the firm’s cases', () => {
    expect(matching(/\b(LBUSD|Long Beach Unified|OCTA|Orange County Transportation Authority|Disneyland|Great Wolf|Office Depot|Osprey)\b/i)).toEqual([]);
  });

  it('gives no phone number but 714-544-1460', () => {
    const others = rows.flatMap((row) => (row.text ?? '').match(/\d{3}[-. )]+\d{3}[-. ]+\d{4}/g)?.filter((phone) => phone !== '714-544-1460').map((phone) => `${row.id}: ${phone}`) ?? []);
    expect(others).toEqual([]);
  });

  it('ends with a call to action', () => {
    expect(failing((text, row) => (row.lang === 'en' ? /(Free consultation\.|Call 714-544-1460 for a free consultation\.)$/ : /(Consulta gratuita\.|Llame al 714-544-1460\.)$/).test(text))).toEqual([]);
  });
});
