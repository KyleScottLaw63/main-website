import Link from "next/link";
import type { Metadata } from 'next';
import { ArrowRight, Scale, ShieldCheck } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { ResultsExplorer } from '@/components/marketing/ResultsExplorer';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { flagshipResults, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { translateResultToSpanish } from '@/lib/marketing/spanishResults';

export const metadata: Metadata = {
  title: 'Veredictos y acuerdos | Kyle Scott Law',
  description: 'Revise veredictos y acuerdos publicados de Kyle Scott Law en casos de abuso, escuelas, accidentes, propiedades peligrosas, mordeduras y negligencia profesional.',
  alternates: localizedAlternates('/es/resultados'),
};

const translatedFlagship = flagshipResults.map(translateResultToSpanish);
const recentPublications = [
  { amount: '$2.2M', label: 'Acuerdo confidencial', title: 'Demanda por abuso sexual', date: '26 de diciembre de 2024', href: '/es/noticias/acuerdo-abuso-sexual-2-2-millones' },
];

export default function SpanishResultsPage() {
  return (
    <main className="results-page">
      <SiteHeader locale="es" />
      <section className="results-hero" aria-labelledby="results-title">
        <div className="results-hero-copy"><p className="eyebrow">Resultados de casos</p><h1 id="results-title">Veredictos y acuerdos</h1><p>Recuperaciones publicadas seleccionadas en asuntos de responsabilidad escolar e institucional, abuso, accidentes, propiedades peligrosas, mordeduras, negligencia profesional y otras lesiones graves.</p><Link className="primary-button" href="/es/contacto#revision-del-caso">Comenzar una consulta gratuita <ArrowRight aria-hidden="true" /></Link></div>
        <aside className="results-hero-note"><Scale aria-hidden="true" /><div><strong>Cada reclamo es único.</strong><p>Una recuperación depende de la evidencia, los daños, el seguro, las partes y la ley aplicable al asunto específico.</p></div></aside>
      </section>
      <section className="flagship-results" aria-labelledby="flagship-title"><div className="flagship-heading"><p className="eyebrow" id="flagship-title">Recuperaciones destacadas</p><p>Asuntos seleccionados de más de tres décadas de representación.</p></div><div className="flagship-grid">{translatedFlagship.map((result) => <article key={result.amount}><span>{resultOutcomeLabel(result)}</span><strong>{result.amount}</strong><h2>{result.title}</h2><p>{result.detail}</p></article>)}</div><p className="results-disclaimer">Los resultados anteriores no garantizan un resultado similar.</p></section>
      <section className="recent-results" aria-labelledby="recent-results-title"><div className="recent-results-heading"><div><p className="eyebrow">Publicación reciente</p><h2 id="recent-results-title">Lea la historia del caso.</h2></div><p>Esta publicación del bufete ofrece más contexto sobre un resultado reciente.</p></div><div className="recent-results-grid">{recentPublications.map((item) => <a href={item.href} key={item.href}><span>{item.label} · {item.date}</span><strong>{item.amount}</strong><h3>{item.title}</h3><p>Leer el caso <ArrowRight aria-hidden="true" /></p></a>)}</div></section>
      <ResultsExplorer locale="es" />
      <section className="results-cta" aria-labelledby="results-cta-title"><ShieldCheck aria-hidden="true" /><div><p className="eyebrow">Revisión gratuita</p><h2 id="results-cta-title">Cuéntenos qué ocurrió.</h2><p>Llame a la oficina de Tustin o envíe una solicitud confidencial y concisa.</p></div><Link className="primary-button" href="/es/contacto#revision-del-caso">Solicitar revisión del caso <ArrowRight aria-hidden="true" /></Link></section>
      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
