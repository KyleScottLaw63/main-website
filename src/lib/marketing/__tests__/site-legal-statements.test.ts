// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { legacyPostPlainText, legacyPosts } from '@/lib/marketing/data/legacyPosts';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { newsArticleBySlug } from '@/lib/marketing/data/newsArticles';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { whyHireUs } from '@/lib/marketing/data/whyHireUs';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';

/**
 * What the public website says about the law and the firm's fees, checked where the pages keep it
 * (docs/website-content-compliance.md). The archived posts have their own rules in legacy-posts.test.ts.
 * The fee agreements that must say the same thing live with the backend (oasis-legal), and are checked there.
 */

const ROOT = process.cwd();
const SITE_SOURCES = ['src/app/(site)', 'src/app/(site-es)', 'src/components/marketing', 'src/lib/marketing'];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : sourceFiles(full);
    return /\.(tsx?|mjs)$/.test(entry.name) ? [full] : [];
  });
}

/** Every string anywhere inside a value (page data is nested objects and arrays). */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

describe('what a client pays without a recovery (the firm’s decision, 2026-09-24)', () => {
  it('the one statement: no fees and no costs unless there is a recovery, in English and Spanish', () => {
    expect(`${noRecoveryTerms.en.statement}.`).toBe('No fees or costs unless there is a recovery.');
    expect(`${noRecoveryTerms.es.statement}.`).toBe('No cobramos honorarios ni costos a menos que haya una recuperación.');
    for (const terms of Object.values(noRecoveryTerms)) {
      expect(terms.priceRange.toLowerCase()).toContain(terms.statement.toLowerCase().replace(/^no fees/, 'no fee'));
      expect(`${terms.label} ${terms.condition}`.toLowerCase()).toMatch(/(?:fee or costs unless there is a recovery|honorarios ni costos a menos que haya una recuperación)$/);
    }
  });

  it('no page writes its own copy of it: the pages, FAQs, and structured data read the constant', () => {
    const COPIES = [
      /\bno (?:attorney )?fees? (?:or|and|nor) costs?\b/i,
      /\bfees? (?:or|and|nor) costs? (?:unless|until)\b/i,
      /\bhonorarios (?:ni|o|y) (?:costos|gastos)\b/i,
      /\b(?:recovers?|repaid|paid|reimbursed|collects?) (?:them |it )?only (?:from|if there is) (?:a|the) (?:recovery|result)\b/i,
      /\bcobra solo (?:de|si hay) una recuperación\b/i,
      /\blos recupera solo del resultado\b/i,
    ];
    const allowed = path.join(ROOT, 'src/lib/marketing/no-recovery-terms.ts');
    const offenders = SITE_SOURCES.flatMap((dir) => sourceFiles(path.join(ROOT, dir)))
      .filter((file) => file !== allowed)
      .flatMap((file) => COPIES.filter((copy) => copy.test(readFileSync(file, 'utf8'))).map((copy) => `${path.relative(ROOT, file)}: ${copy}`));
    expect(offenders).toEqual([]);
    // The FAQ answers and the "why hire us" page carry it word for word.
    expect(practiceAreas.flatMap((area) => area.faqs.map((faq) => faq.answer)).filter((answer) => answer.includes(noRecoveryTerms.en.statement))).toHaveLength(3);
    expect(spanishPracticeAreas.flatMap((area) => area.faqs.map((faq) => faq.answer)).filter((answer) => answer.includes(noRecoveryTerms.es.statement))).toHaveLength(2);
    expect(strings(whyHireUs.en).filter((text) => text.includes(noRecoveryTerms.en.statement))).toHaveLength(3);
    expect(strings(whyHireUs.es).filter((text) => text.includes(noRecoveryTerms.es.statement))).toHaveLength(3);
  });

  it('no page or archived post calls a case risk-free: a client who loses can owe the other side’s costs (CCP § 1032)', () => {
    const RISK_FREE = /\b(?:no|zero|without any|without) financial risk\b|\brisk[- ]free\b|\bno risk\b|\briesgo financiero\b|\bsin (?:ningún )?riesgo\b|\bningún riesgo\b/i;
    const allowed = path.join(ROOT, 'src/lib/marketing/no-recovery-terms.ts');
    const pages = SITE_SOURCES.flatMap((dir) => sourceFiles(path.join(ROOT, dir))).filter((file) => file !== allowed && RISK_FREE.test(readFileSync(file, 'utf8')));
    expect(pages.map((file) => path.relative(ROOT, file))).toEqual([]);
    expect(legacyPosts.filter((post) => RISK_FREE.test(`${post.title} ${post.excerpt} ${legacyPostPlainText(post)}`)).map((post) => post.slug)).toEqual([]);
  });
});

describe('childhood sexual abuse deadlines on the pages (CCP §§ 340.1, 340.11)', () => {
  // No time limit for abuse on or after January 1, 2024; the age-40 rule covers earlier abuse.
  const AGE_40 = /\b(?:turns|cumpla) 40\b|\b40th birthday\b/i;

  it('every page text that gives the age-40 rule also gives the law since 2024, with both sections', () => {
    // The school-liability page and the government-claim guide, each in English and Spanish.
    const texts = strings([practiceAreas, spanishPracticeAreas, legalGuides, spanishLegalGuides]).filter((text) => AGE_40.test(text));
    expect(texts.length).toBe(4);
    for (const text of texts) {
      expect(text, text).toMatch(/§ 340\.11/);
      expect(text, text).toMatch(/§ 340\.1\)/);
      expect(text, text).toMatch(/January 1, 2024|1 de enero de 2024/);
      expect(text, text).toMatch(/\bno (?:deadline|time limit)\b|no fija un plazo/i);
      expect(text, text).toMatch(/whichever is later|lo que ocurra después/);
    }
  });

  it('the government-claim guide links both sections, in English and Spanish', () => {
    const guides = [
      legalGuides.find((item) => item.slug === 'government-injury-claim-orange-county')!,
      spanishLegalGuides.find((item) => item.englishSlug === 'government-injury-claim-orange-county')!,
    ];
    for (const guide of guides) {
      expect(guide.sources.map((source) => source.url), guide.slug).toEqual(expect.arrayContaining([
        'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=340.1',
        'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=340.11',
      ]));
    }
  });
});

describe('dog bites (Civ. Code § 3342)', () => {
  it('the Spanish page states the rule, as the English page does', () => {
    const english = practiceAreas.find((area) => area.key === 'dog-bites')!;
    const spanish = spanishPracticeAreas.find((area) => area.key === 'dog-bites')!;
    expect(english.faqs.find((faq) => faq.question.includes('never bit anyone'))!.answer).toMatch(/public place or while the injured person was lawfully on private property/);
    const answer = spanish.faqs.find((faq) => faq.question === '¿Qué pasa si el perro nunca había mordido?')!.answer;
    expect(answer).toMatch(/^El dueño puede ser responsable de todos modos\./);
    expect(answer).toMatch(/Código Civil, sección 3342/);
    expect(answer).toMatch(/aunque el perro nunca hubiera mordido antes/);
    expect(answer).not.toMatch(/antecedentes pueden ser relevantes/);
    expect(spanish.intro.join(' ')).toMatch(/lugar público o mientras la persona lesionada estaba legalmente en una propiedad privada/);
  });
});

describe('punitive damages against a drunk driver', () => {
  it('cites the individual-defendant instruction, CACI No. 3940, in English and Spanish', () => {
    for (const [locale, slug] of [['en', 'punitive-damages-drunk-driver'], ['es', 'danos-punitivos-conductor-ebrio']] as const) {
      const text = strings(newsArticleBySlug(locale, slug)!.sections).join(' ');
      expect(text, locale).toMatch(/CACI No\. 3940/);
      expect(text, locale).toMatch(/3294/);
      expect(text, locale).not.toMatch(/CACI (?:No\. )?3945/);
    }
  });
});

describe('the Court of Appeal new trial', () => {
  it('says nothing about whether the decision was certified for publication or can be cited (the firm, 2026-10-01)', () => {
    for (const [locale, slug] of [['en', 'court-of-appeal-new-trial'], ['es', 'victoria-apelacion-nuevo-juicio']] as const) {
      const text = strings(newsArticleBySlug(locale, slug)!).join(' ');
      expect(text, locale).not.toMatch(/certified for publication|citable|precedent|certificada para publicación|citarse|precedente/i);
      expect(text, locale).toMatch(/Appellate decisions turn on the record|Las decisiones de apelación dependen del expediente/);
    }
  });
});
