import { describe, expect, it } from 'vitest';
import { allResults, flagshipResults, historicalResults, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { translateResultToSpanish } from '@/lib/marketing/spanishResults';

describe('the year on a published result', () => {
  it('appears only where the firm’s own record states it (source noted in results.ts), never estimated', () => {
    const dated = Object.fromEntries(allResults.filter((result) => result.year).map((result) => [result.amount, result.year]));
    expect(dated).toEqual({ '$6.8M': 2004, '$5.75M': 2019, '$2.3M': 2024, '$2.2M': 2024, '$928,493.12': 2017 });
    for (const year of Object.values(dated)) {
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
