'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { allResults, caseStoryPath, resultOutcomeLabel, type ResultCategory } from '@/lib/marketing/data/results';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { spanishCategoryLabels, translateResultToSpanish } from '@/lib/marketing/spanishResults';

const categories: Array<'All results' | ResultCategory> = [
  'All results',
  'Abuse & school liability',
  'Auto & transportation',
  'Premises liability',
  'Dog bites',
  'Malpractice',
  'Assault & civil rights',
  'Other injury claims',
];

export function ResultsExplorer({ locale = 'en' }: { locale?: SiteLocale }) {
  const [category, setCategory] = useState<(typeof categories)[number]>('All results');
  const [query, setQuery] = useState('');
  const spanish = locale === 'es';

  const visibleResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allResults.filter((result) => {
      const displayResult = spanish ? translateResultToSpanish(result) : result;
      const categoryMatches = category === 'All results' || result.category === category;
      const categoryLabel = spanish ? spanishCategoryLabels[result.category] : result.category;
      const queryMatches = !normalizedQuery || `${displayResult.amount} ${displayResult.title} ${displayResult.detail} ${categoryLabel} ${displayResult.outcome ?? ''} ${result.year ?? ''}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [category, query, spanish]);

  const categoryLabel = (item: (typeof categories)[number]) => item === 'All results' ? (spanish ? 'Todos los resultados' : item) : (spanish ? spanishCategoryLabels[item] : item);

  return (
    <section className="results-explorer" aria-labelledby="results-explorer-title">
      <div className="results-explorer-heading">
        <div><p className="eyebrow">{spanish ? 'Registro completo publicado' : 'Complete published record'}</p><h2 id="results-explorer-title">{spanish ? 'Explore veredictos y acuerdos.' : 'Explore verdicts and settlements.'}</h2></div>
        <p>{spanish ? 'Filtre los resultados publicados por tipo de caso o busque una lesión, tribunal o cantidad recuperada.' : 'Filter the firm’s published results by case type or search for an injury, court, or recovery amount.'}</p>
      </div>

      <div className="results-toolbar">
        <label className="results-search"><Search aria-hidden="true" /><span className="sr-only">{spanish ? 'Buscar resultados de casos' : 'Search case results'}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={spanish ? 'Buscar resultados' : 'Search results'} /></label>
        <label className="results-filter-select">
          <span>{spanish ? 'Filtrar por tipo de caso' : 'Filter by case type'}</span>
          <select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}>
            {categories.map((item) => <option value={item} key={item}>{categoryLabel(item)}</option>)}
          </select>
        </label>
        <div className="results-filters" aria-label={spanish ? 'Filtrar resultados por tipo de caso' : 'Filter results by case type'}>
          {categories.map((item) => <button className={category === item ? 'active' : ''} type="button" onClick={() => setCategory(item)} key={item}>{categoryLabel(item)}</button>)}
        </div>
      </div>

      <div className="results-count" aria-live="polite"><strong>{visibleResults.length}</strong> {spanish ? 'resultados publicados' : 'published outcomes shown'}</div>
      <div className="results-ledger">
        {visibleResults.map((result, index) => {
          const displayResult = spanish ? translateResultToSpanish(result) : result;
          // Case stories are English-only pages (docs/case-stories.md).
          const story = spanish ? undefined : result.story;
          return (
          <article className={story ? 'result-row has-story' : 'result-row'} key={`${result.amount}-${result.title}-${index}`}>
            <strong className="result-amount">{displayResult.amount}</strong>
            <div className="result-description">
              <h3>{story ? <Link className="result-story-link" href={caseStoryPath(story)}>{displayResult.title}</Link> : displayResult.title}</h3>
              <p>{displayResult.detail}</p>
              {story ? <span className="result-story-cue">Read the case story <ArrowRight aria-hidden="true" /></span> : null}
            </div>
            <div className="result-tags"><span>{spanish ? spanishCategoryLabels[result.category] : result.category}</span>{(displayResult.outcome || result.year) && <small>{resultOutcomeLabel(displayResult)}</small>}</div>
          </article>
        ); })}
      </div>
      {visibleResults.length === 0 && <div className="results-empty">{spanish ? 'Ningún resultado publicado coincide con esa búsqueda. Pruebe un término más amplio u otra categoría.' : 'No published result matches that search. Try a broader term or choose another category.'}</div>}
      <p className="results-page-disclaimer">{spanish ? 'Cada asunto es diferente. Los resultados anteriores no garantizan ni predicen un resultado similar en un caso futuro.' : 'Every matter is different. Past results do not guarantee or predict a similar outcome in any future case.'}</p>
    </section>
  );
}
