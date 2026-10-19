import { ExternalLink } from 'lucide-react';
import type { PageSource } from '@/lib/marketing/data/practiceAreas';
import type { SiteLocale } from '@/lib/marketing/i18n';

/**
 * The official pages behind a practice or city page's figures and statements of law (the firm,
 * 2026-10-19: a figure or a law stays on a page only with an official source that shows it is
 * accurate). Same look as a guide's sources.
 */
export function PageSources({ sources, locale }: { sources?: PageSource[]; locale: SiteLocale }) {
  if (!sources?.length) return null;
  const spanish = locale === 'es';
  return (
    <section className="legal-guide-sources practice-sources" id="sources" aria-labelledby="page-sources-title">
      <p className="eyebrow">{spanish ? 'Fuentes' : 'Sources'}</p>
      <h2 id="page-sources-title">{spanish ? 'Fuentes oficiales.' : 'Official sources.'}</h2>
      <p className="legal-guide-sources-note">{spanish ? 'Las cifras y las normas legales de esta página provienen de estas fuentes oficiales (algunas solo en inglés).' : 'The figures and rules of law on this page come from these official sources.'}</p>
      <ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true" /></a></li>)}</ul>
    </section>
  );
}
