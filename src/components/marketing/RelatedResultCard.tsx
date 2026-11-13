import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { resultOutcomeLabel, type CaseResult } from '@/lib/marketing/data/results';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { caseStoryPathForLocale } from '@/lib/marketing/spanishResults';

/**
 * A card under "Related recoveries" on practice, city, and city + case pages. A result with a case
 * story links it in the page's language, as the /results ledger does (docs/case-stories.md).
 * `result` is already in the page's language (translateResultToSpanish keeps `story`).
 */
export function RelatedResultCard({ result, locale }: { result: CaseResult; locale: SiteLocale }) {
  const spanish = locale === 'es';
  const story = result.story;
  return (
    <article className={story ? 'has-story' : undefined}>
      <span>{resultOutcomeLabel(result, spanish ? 'Recuperación' : 'Recovery')}</span>
      <strong>{result.amount}</strong>
      <h3>{story ? <Link className="result-story-link" href={caseStoryPathForLocale(story, locale)}>{result.title}</Link> : result.title}</h3>
      <p>{result.detail}</p>
      {story ? <span className="result-story-cue">{spanish ? 'Leer la historia del caso ' : 'Read the case story '}<ArrowRight aria-hidden="true" /></span> : null}
    </article>
  );
}
