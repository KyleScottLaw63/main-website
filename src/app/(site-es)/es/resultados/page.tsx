import Link from "next/link";
import type { Metadata } from 'next';
import { ArrowRight, ChevronDown, Scale, ShieldCheck } from 'lucide-react';
import { CaseStoryCard } from '@/components/marketing/CaseStoryPage';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { ResultsExplorer } from '@/components/marketing/ResultsExplorer';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { flagshipResults, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { spanishCaseStoryLinks } from '@/lib/marketing/data/spanishCaseStories';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { caseStoryPathForLocale, translateResultToSpanish } from '@/lib/marketing/spanishResults';

export const metadata: Metadata = {
  title: 'Veredictos y acuerdos | Kyle Scott Law',
  description: 'Veredictos y acuerdos publicados por Kyle Scott Law en casos de abuso, escuelas, accidentes, mordeduras y negligencia profesional. Consulta gratuita.',
  alternates: localizedAlternates('/es/resultados'),
};

const translatedFlagship = flagshipResults.map(translateResultToSpanish);

/** The case stories section shows this many, newest first; the rest open on request (as on /results). */
const STORIES_SHOWN = 6;

export default function SpanishResultsPage() {
  const storyLinks = spanishCaseStoryLinks();
  return (
    <main className="results-page">
      <SiteHeader locale="es" />
      <section className="results-hero" aria-labelledby="results-title">
        <div className="results-hero-copy"><p className="eyebrow">Resultados de casos</p><h1 id="results-title">Veredictos y acuerdos</h1><p>Recuperaciones publicadas seleccionadas en asuntos de responsabilidad escolar e institucional, abuso, accidentes, propiedades peligrosas, mordeduras, negligencia profesional y otras lesiones graves.</p><Link className="primary-button" href="/es/contacto#revision-del-caso">Comenzar una consulta gratuita <ArrowRight aria-hidden="true" /></Link></div>
        <aside className="results-hero-note"><Scale aria-hidden="true" /><div><strong>Cada reclamo es único.</strong><p>Una recuperación depende de la evidencia, los daños, el seguro, las partes y la ley aplicable al asunto específico.</p></div></aside>
      </section>
      <section className="flagship-results" aria-labelledby="flagship-title"><div className="flagship-heading"><p className="eyebrow" id="flagship-title">Recuperaciones destacadas</p><p>Asuntos seleccionados de más de tres décadas de representación.</p></div><div className="flagship-grid">{translatedFlagship.map((result) => <article className={result.story ? 'has-story' : undefined} key={result.amount}><span>{resultOutcomeLabel(result)}</span><strong>{result.amount}</strong><h2>{result.story ? <Link className="flagship-story-link" href={caseStoryPathForLocale(result.story, 'es')}>{result.title}</Link> : result.title}</h2><p>{result.detail}</p>{result.story ? <p className="flagship-story-cue">Leer la historia del caso <ArrowRight aria-hidden="true" /></p> : null}</article>)}</div><p className="results-disclaimer">Los resultados anteriores no garantizan un resultado similar.</p></section>
      <section className="recent-results case-stories-section" aria-labelledby="case-stories-title">
        <div className="recent-results-heading"><div><p className="eyebrow">Historias de casos</p><h2 id="case-stories-title">La historia detrás del resultado.</h2></div><p>Cómo se desarrollaron algunos casos, desde lo que ocurrió hasta el veredicto o el acuerdo. Los más recientes primero.</p></div>
        <div className="case-story-grid is-compact">
          {storyLinks.slice(0, STORIES_SHOWN).map((link) => <CaseStoryCard link={link} locale="es" key={link.href} />)}
        </div>
        {storyLinks.length > STORIES_SHOWN ? (
          <details className="case-story-all">
            <summary>
              <span className="case-story-all-closed">Ver las {storyLinks.length} historias de casos</span>
              <span className="case-story-all-open">Ver menos</span>
              <ChevronDown aria-hidden="true" />
            </summary>
            <div className="case-story-grid is-compact">
              {storyLinks.slice(STORIES_SHOWN).map((link) => <CaseStoryCard link={link} locale="es" key={link.href} />)}
            </div>
          </details>
        ) : null}
      </section>
      <ResultsExplorer locale="es" />
      <section className="results-cta" aria-labelledby="results-cta-title"><ShieldCheck aria-hidden="true" /><div><p className="eyebrow">Revisión gratuita</p><h2 id="results-cta-title">Cuéntenos qué ocurrió.</h2><p>Llame a la oficina de Tustin o envíe una solicitud confidencial y concisa.</p></div><Link className="primary-button" href="/es/contacto#revision-del-caso">Solicitar revisión del caso <ArrowRight aria-hidden="true" /></Link></section>
      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
