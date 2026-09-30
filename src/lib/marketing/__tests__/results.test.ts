import { describe, expect, it } from 'vitest';
import { flagshipResults, historicalResults } from '@/lib/marketing/data/results';
import { translateResultToSpanish } from '@/lib/marketing/spanishResults';

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
