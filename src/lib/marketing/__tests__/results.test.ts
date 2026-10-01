import { describe, expect, it } from 'vitest';
import { allResults, flagshipResults, historicalResults, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { translateResultToSpanish } from '@/lib/marketing/spanishResults';

/** A card's amount as a number: "$928,493.12" → 928493.12, "$5.75M" → 5750000. */
const dollars = (amount: string) => Number(amount.replace(/[$,]/g, '').replace(/M$/, 'e6'));

describe('the year on a published result', () => {
  it('appears only where the firm’s own record states it (source noted in results.ts), never estimated', () => {
    // In results.ts order. $6.8M, $5.75M, $2.3M, $2.2M and $928,493.12: the firm's published posts. The rest:
    // the firm's settlement records (2026-09-30, the settlements over $60,000 added 2026-10-01, and six older cards
    // dated 2026-10-01), where a January–February closing-statement date leaves a result undated. Several matters
    // share an amount and a year.
    const dated = allResults.filter((result) => result.year).map((result) => `${result.amount} · ${result.year}`);
    expect(dated).toEqual([
      '$6.8M · 2004', '$5.75M · 2019', '$2.7M · 2026', '$2.3M · 2024', '$2.2M · 2024', '$1,450,000 · 2024', '$928,493.12 · 2017', '$800,000 · 2023', '$700,000 · 2015',
      '$650,000 · 2022', '$600,000 · 2024', '$505,000 · 2019', '$500,000 · 2024', '$475,000 · 2021', '$475,000 · 2024', '$430,000 · 2019', '$400,000 · 2025', '$375,000 · 2024',
      '$350,000 · 2010', '$325,000 · 2015', '$295,000 · 2022', '$280,000 · 2021', '$275,000 · 2013', '$252,000 · 2022', '$235,000 · 2016', '$225,000 · 2024', '$215,000 · 2025',
      '$185,000 · 2015', '$175,000 · 2022', '$155,000 · 2020', '$150,001 · 2014', '$150,000 · 2023', '$150,000 · 2018', '$150,000 · 2021', '$150,000 · 2016',
      '$145,000 · 2018', '$141,000 · 2014', '$136,718.35 · 2012', '$130,000 · 2016', '$127,165.44 · 2020', '$125,900 · 2008', '$125,000 · 2011', '$125,000 · 2017', '$125,000 · 2024',
      '$125,000 · 2021', '$122,000 · 2007', '$121,133 · 2011', '$115,000 · 2018', '$112,500 · 2006', '$105,000 · 2010', '$101,695 · 2012', '$100,437.41 · 2020', '$100,000 · 2013',
      '$100,000 · 2005', '$100,000 · 2010', '$100,000 · 2020', '$100,000 · 2005', '$100,000 · 2009', '$100,000 · 2018', '$100,000 · 2006', '$100,000 · 2010',
      '$100,000 · 2021', '$100,000 · 2008', '$100,000 · 2020', '$100,000 · 2018', '$100,000 · 2021', '$100,000 · 2005', '$95,000 · 2014', '$90,000 · 2016', '$90,000 · 2008', '$87,000 · 2016',
      '$85,000 · 2004', '$85,000 · 2006', '$80,000 · 2009', '$80,000 · 2016', '$80,000 · 2012', '$80,000 · 2018', '$80,000 · 2011', '$78,000 · 2020',
      '$75,000 · 2010', '$75,000 · 2011', '$75,000 · 2006', '$75,000 · 2007', '$75,000 · 2023', '$73,000 · 2008', '$72,327.60 · 2012', '$70,000 · 2016',
      '$68,000 · 2013', '$67,707.55 · 2015', '$64,254.18 · 2009', '$62,500 · 2014',
    ]);
    for (const { year } of allResults.filter((result) => result.year)) {
      expect(Number.isInteger(year)).toBe(true);
      expect(year).toBeGreaterThanOrEqual(1980);
      expect(year).toBeLessThanOrEqual(new Date().getFullYear());
    }
  });

  it('reads "outcome · year" on every card, and the outcome alone when no year is on record', () => {
    expect(resultOutcomeLabel({ outcome: 'Jury verdict', year: 2019 })).toBe('Jury verdict · 2019');
    expect(resultOutcomeLabel({ outcome: 'Recovery' })).toBe('Recovery');
    expect(resultOutcomeLabel({ year: 2004 }, 'Recovery')).toBe('Recovery · 2004');
    expect(resultOutcomeLabel({})).toBe('');
    expect(resultOutcomeLabel(translateResultToSpanish(flagshipResults[0]))).toBe('Acuerdo · 2004');
  });

  it('lists the settlements added from the firm’s records in Spanish too, and the corrected $697,500', () => {
    const recovery = translateResultToSpanish(historicalResults.find((result) => result.amount === '$336,932')!);
    expect(recovery).toMatchObject({ title: 'Reclamo de conductor con seguro insuficiente', detail: 'Acuerdo y laudo arbitral', outcome: 'Recuperación' });
    expect(translateResultToSpanish(historicalResults.find((result) => result.amount === '$1,450,000')!).title).toBe('Acuerdo por lesiones personales');
    expect(historicalResults.map((result) => result.amount)).toContain('$697,500');
    expect(historicalResults.map((result) => result.amount)).not.toContain('$697,000');
    expect(allResults).toHaveLength(145);
  });

  it('publishes only results over $60,000 (the owner’s cutoff, 2026-10-01)', () => {
    expect(allResults.filter((result) => dollars(result.amount) <= 60_000).map((result) => result.amount)).toEqual([]);
  });

  it('bears out the home page’s "$50+ million recovered": the published results total over $50 million', () => {
    // $56,716,288.54 on 2026-10-01. Removing results can take it under; then the home page's claim must change.
    expect(allResults.reduce((sum, result) => sum + dollars(result.amount), 0)).toBeGreaterThan(50_000_000);
  });

  it('gives every result title a Spanish translation', () => {
    expect(allResults.filter((result) => translateResultToSpanish(result).title === result.title).map((result) => result.title)).toEqual([]);
  });

  it('lists the two results the firm reported on Dec. 26, 2024, in Spanish too', () => {
    const verdict = translateResultToSpanish(historicalResults.find((result) => result.amount === '$2.3M')!);
    expect(verdict).toMatchObject({ title: 'Veredicto del jurado en el Tribunal Superior de Riverside', detail: 'Tribunal Superior de Riverside · Detalles no publicados', outcome: 'Veredicto del jurado', year: 2024 });
    const settlement = translateResultToSpanish(historicalResults.find((result) => result.amount === '$2.2M')!);
    expect(settlement).toMatchObject({ title: 'Demanda por abuso sexual y agresión sexual', detail: 'Detalles confidenciales', outcome: 'Acuerdo', year: 2024 });
  });
});

describe('published case results', () => {
  it('keeps the three flagship verdict labels (AGENTS.md: never relabel)', () => {
    expect(flagshipResults.map((result) => result.amount)).toEqual(['$6.8M', '$6M', '$5.75M']);
  });

  it('describes the $5.75M result from the firm’s own record', () => {
    // News post (Nov. 2019): jury verdict after a two-week trial. Old case list:
    // "Kody R. v. Long Beach U.S.D., LA Sup. Ct., $5,750,000".
    const result = flagshipResults.find((item) => item.amount === '$5.75M')!;
    expect(result.title).toBe('Student suffers skull fracture and brain bleed');
    expect(result.outcome).toBe('Jury verdict');
    expect(result.detail).toContain('Los Angeles Superior Court');
    expect(result.detail).toContain('LBUSD');
    expect(result.detail).not.toMatch(/Former teacher|Orange County Superior Court/);
  });

  it('translates every result detail fully into Spanish', () => {
    const english = /\b(?:Claim|against|Superior Court|Former teacher|Jury|trial|Two-week|Confidential|school district|negligence|Settlement|Recovery)\b/;
    const leftovers = [...flagshipResults, ...historicalResults]
      .map(translateResultToSpanish)
      .filter((result) => english.test(`${result.detail} ${result.outcome ?? ''}`))
      .map((result) => `${result.amount}: ${result.detail} · ${result.outcome}`);
    expect(leftovers).toEqual([]);
    const lbusd = translateResultToSpanish(flagshipResults.find((item) => item.amount === '$5.75M')!);
    expect(lbusd.outcome).toBe('Veredicto del jurado');
    expect(lbusd.detail).toBe('Juicio con jurado de dos semanas · Tribunal Superior de Los Ángeles · Reclamo contra el Distrito Escolar Unificado de Long Beach');
  });
});
