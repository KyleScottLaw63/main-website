import { ArrowRight, Check, ChevronDown, MapPin, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { flagshipResults, historicalResults } from '@/lib/marketing/data/results';
import { whyHireUs } from '@/lib/marketing/data/whyHireUs';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { SITE_URL } from '@/lib/marketing/site';
import { translateResultToSpanish } from '@/lib/marketing/spanishResults';

/**
 * "Why hire us" — reuses the practice-page layout and styles so it reads as
 * part of the same site: hero, page navigation, numbered reasons, the fee
 * explained, the first week, questions with FAQ schema, results, and the CTA.
 */
export function WhyHireUsPage({ locale = 'en' }: { locale?: SiteLocale }) {
  const spanish = locale === 'es';
  const content = whyHireUs[locale];
  const homePath = spanish ? '/es' : '/';
  const contactPath = spanish ? '/es/contacto' : '/contact';
  const teamPath = spanish ? '/es/equipo' : '/meet-the-team';
  const resultsPath = spanish ? '/es/resultados' : '/results';
  const allResults = [...flagshipResults, ...historicalResults];
  const results = content.featuredResults
    .map((title) => allResults.find((result) => result.title === title))
    .filter((result) => result !== undefined)
    .map((result) => (spanish ? translateResultToSpanish(result) : result));

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: spanish ? 'Inicio' : 'Home', item: `${SITE_URL}${homePath === '/' ? '' : homePath}` },
        { '@type': 'ListItem', position: 2, name: content.title, item: `${SITE_URL}${content.path}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${content.path}#faq`,
      mainEntity: content.questions.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];

  return (
    <main className="practice-detail-page practice-why-hire-us">
      <StructuredData data={structuredData} />
      <SiteHeader locale={locale} />

      <section className="practice-detail-hero" aria-labelledby="why-title">
        <div className="practice-detail-copy">
          <nav className="practice-breadcrumb" aria-label={spanish ? 'Ruta de navegación' : 'Breadcrumb'}><a href={homePath}>{spanish ? 'Inicio' : 'Home'}</a><span>/</span><span aria-current="page">{content.title}</span></nav>
          <p className="eyebrow light-eyebrow">{content.eyebrow}</p>
          <h1 id="why-title">{content.heading}</h1>
          <p>{content.lede}</p>
        </div>
        <aside className="practice-hero-summary" aria-label={spanish ? 'Datos del despacho' : 'Firm facts'}>
          <span className="practice-hero-icon"><UserRoundCheck aria-hidden="true" /></span>
          <p>{spanish ? 'Kyle Scott Law' : 'Kyle Scott Law'}</p>
          <strong>{spanish ? 'Abogado litigante desde 1991' : 'Trial attorney since 1991'}</strong>
          <ul>
            <li><MapPin aria-hidden="true" />{spanish ? 'Tustin · Condado de Orange' : 'Tustin · Orange County'}</li>
            <li><ShieldCheck aria-hidden="true" />{spanish ? 'Sin honorarios a menos que haya recuperación' : 'No fee unless there is a recovery'}</li>
          </ul>
        </aside>
      </section>

      <div className="practice-content-layout">
        <aside className="practice-page-nav" aria-label={spanish ? 'Navegación de la página' : 'Page navigation'}>
          <p>{spanish ? 'En esta página' : 'On this page'}</p>
          <a href="#reasons">{spanish ? 'Cuatro razones' : 'Four reasons'}</a>
          <a href="#fee">{spanish ? 'Cómo funciona el honorario' : 'How the fee works'}</a>
          <a href="#first-week">{spanish ? 'La primera semana' : 'The first week'}</a>
          <a href="#questions">{spanish ? 'Preguntas para cualquier abogado' : 'Questions to ask'}</a>
          <a href="#results">{spanish ? 'Resultados publicados' : 'Published results'}</a>
          <div className="practice-sidebar-contact"><MapPin aria-hidden="true" /><strong>Kyle Scott Law</strong><span>17671 Irvine Blvd., Suite 210<br />Tustin, CA 92780</span><a href={contactPath}>{spanish ? 'Solicitar consulta' : 'Request a consultation'}</a></div>
        </aside>

        <article className="practice-article">
          <section className="practice-overview" id="reasons" aria-labelledby="reasons-title">
            <p className="eyebrow">{spanish ? 'Cuatro razones' : 'Four reasons'}</p>
            <h2 id="reasons-title">{spanish ? 'Lo que distingue al despacho, sin adornos.' : 'What sets the firm apart, without the polish.'}</h2>
            <div className="practice-key-points">
              {content.reasons.map((reason, index) => <article key={reason.title}><span>0{index + 1}</span><h3>{reason.title}</h3><p>{reason.body}</p></article>)}
            </div>
          </section>

          <section className="practice-matters" id="fee" aria-labelledby="fee-title">
            <div className="practice-section-heading"><p className="eyebrow">{content.fee.eyebrow}</p><h2 id="fee-title">{content.fee.title}</h2><p>{content.fee.intro}</p></div>
            <div className="practice-matter-grid">{content.fee.points.map((point) => <div key={point}><Check aria-hidden="true" /><span>{point}</span></div>)}</div>
          </section>

          <section className="practice-overview" id="first-week" aria-labelledby="first-week-title">
            <p className="eyebrow">{content.firstWeek.eyebrow}</p>
            <h2 id="first-week-title">{content.firstWeek.title}</h2>
            <div className="practice-key-points">
              {content.firstWeek.steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
            </div>
          </section>

          <section className="practice-faq" id="questions" aria-labelledby="questions-title">
            <div className="practice-section-heading"><p className="eyebrow">{content.questions.eyebrow}</p><h2 id="questions-title">{content.questions.title}</h2><p>{content.questions.intro}</p></div>
            <div className="practice-faq-list">
              {content.questions.items.map((item) => <details key={item.question}><summary><span>{item.question}</span><ChevronDown aria-hidden="true" /></summary><p>{item.answer}</p></details>)}
            </div>
            <p className="practice-information-note">{spanish ? 'Esta página ofrece información general, no asesoría legal. Se necesita una consulta para evaluar los hechos, plazos, partes y leyes que pueden aplicarse a un asunto específico.' : 'This page offers general information, not legal advice. A consultation is needed to evaluate the facts, deadlines, parties, and law that may apply to a specific matter.'}</p>
          </section>

          <section className="practice-related-results" id="results" aria-labelledby="why-results-title">
            <div className="practice-results-heading"><div><p className="eyebrow">{spanish ? 'Resultados publicados' : 'Published case results'}</p><h2 id="why-results-title">{spanish ? 'Resultados que las aseguradoras conocen.' : 'Results the insurers know about.'}</h2></div><a href={resultsPath}>{spanish ? 'Ver todos los resultados' : 'View all results'} <ArrowRight aria-hidden="true" /></a></div>
            <div className={`practice-results-grid results-count-${results.length}`}>
              {results.map((result) => <article key={result.title}><span>{result.outcome ?? (spanish ? 'Recuperación' : 'Recovery')}</span><strong>{result.amount}</strong><h3>{result.title}</h3><p>{result.detail}</p></article>)}
            </div>
            <p className="results-disclaimer">{spanish ? 'Los resultados anteriores no garantizan un resultado similar.' : 'Prior results do not guarantee a similar outcome.'}</p>
          </section>

          <section className="practice-more" aria-labelledby="team-link-title">
            <div className="practice-results-heading"><div><p className="eyebrow">{spanish ? 'El equipo' : 'The team'}</p><h2 id="team-link-title">{spanish ? 'Conozca al abogado que atenderá su caso.' : 'Meet the attorney who will handle your case.'}</h2></div><a href={teamPath}>{spanish ? 'Conocer al equipo' : 'Meet the team'} <ArrowRight aria-hidden="true" /></a></div>
          </section>
        </article>
      </div>

      <section className="practice-trust-strip practice-trust-closing" aria-label={spanish ? 'Información de Kyle Scott Law' : 'Kyle Scott Law information'}>
        <article><strong>{spanish ? 'Más de 30 años' : '30+ years'}</strong><span>{spanish ? 'Experiencia en lesiones personales' : 'Personal injury experience'}</span></article>
        <article><strong>{spanish ? 'Oficina en Tustin' : 'Tustin office'}</strong><span>{spanish ? 'Servicio al Condado de Orange y California' : 'Serving Orange County and California'}</span></article>
        <article><strong>{noRecoveryTerms[locale].label}</strong><span>{noRecoveryTerms[locale].condition}</span></article>
      </section>

      <section className="practice-final-cta" aria-labelledby="why-cta-title">
        <div><p className="eyebrow light-eyebrow">{content.cta.eyebrow}</p><h2 id="why-cta-title">{content.cta.title}</h2><p>{content.cta.body}</p></div>
        <div><a className="primary-button" href={`${contactPath}#${spanish ? 'revision-del-caso' : 'case-review'}`}>{content.cta.button} <ArrowRight aria-hidden="true" /></a><a href="tel:+17145441460">714-544-1460</a></div>
      </section>

      <SiteFooter locale={locale} />
      <ChatWidget locale={locale} />
    </main>
  );
}
