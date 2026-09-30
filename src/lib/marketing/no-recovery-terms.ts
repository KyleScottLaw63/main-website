import type { SiteLocale } from '@/lib/marketing/i18n';

/**
 * What a client pays when there is no recovery: the website's one statement of it, in
 * English and Spanish. Every page that promises "no fees or costs", the structured data
 * (`priceRange`), and the FAQ answers read it from here; `site-legal-statements.test.ts`
 * fails on a copy written anywhere else.
 *
 * Decided by the firm, 2026-09-24: the firm absorbs advanced costs when there is no
 * recovery (B&P §6157.2 disclosure). A contingent-fee advertisement must say whether the
 * client pays the costs the firm advanced when there is no recovery (Bus. & Prof. Code
 * § 6157.2); this statement is that disclosure. The fee agreements say the same
 * (case-templates ¶3 and ¶17, FeeAgreementPanel). If the terms ever change, change this
 * constant and the agreements together (docs/website-content-compliance.md, "Fees and costs").
 *
 * Never pair it with "no financial risk" or "risk-free": a client who loses can still be
 * ordered to pay the other side's court costs (Code Civ. Proc. § 1032).
 */
export const noRecoveryTerms: Record<SiteLocale, {
  /** The statement, for running text (no closing period; add one in a sentence). */
  statement: string;
  /** The same statement as a two-line card: headline and condition. */
  label: string;
  condition: string;
  /** schema.org LegalService.priceRange in the site-wide structured data. */
  priceRange: string;
}> = {
  en: {
    statement: 'No fees or costs unless there is a recovery',
    label: 'No fee or costs',
    condition: 'Unless there is a recovery',
    priceRange: 'Free consultation; no fee or costs unless there is a recovery',
  },
  es: {
    statement: 'No cobramos honorarios ni costos a menos que haya una recuperación',
    label: 'Sin honorarios ni costos',
    condition: 'A menos que haya una recuperación',
    priceRange: 'Consulta gratuita; no cobramos honorarios ni costos a menos que haya una recuperación',
  },
};
