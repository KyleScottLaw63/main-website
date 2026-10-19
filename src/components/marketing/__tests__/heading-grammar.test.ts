import { describe, expect, it } from 'vitest';
import { practiceNounPhrase } from '@/components/marketing/PracticeAreaPage';
import { withArticle } from '@/components/marketing/ServiceAreaPage';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';

describe('heading grammar', () => {
  it('uses "an" before a city name that starts with a vowel', () => {
    expect(withArticle('Irvine')).toBe('an Irvine');
    expect(withArticle('Anaheim')).toBe('an Anaheim');
    expect(withArticle('Orange')).toBe('an Orange');
    expect(withArticle('Tustin')).toBe('a Tustin');
    expect(withArticle('Huntington Beach')).toBe('a Huntington Beach');
    for (const area of serviceAreas) expect(withArticle(area.city)).not.toMatch(/^a [AEIOU]/);
  });

  it('turns a plural practice name into the adjective form used in headings', () => {
    expect(practiceNounPhrase('Car Accidents')).toBe('car accident');
    expect(practiceNounPhrase('Dog Bites')).toBe('dog bite');
    expect(practiceNounPhrase('Medical Malpractice')).toBe('medical malpractice');
    expect(practiceNounPhrase('Slip & Fall')).toBe('slip & fall');
    for (const area of practiceAreas) expect(practiceNounPhrase(area.shortTitle)).not.toMatch(/(accidents|bites)$/);
  });
});
