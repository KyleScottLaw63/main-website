import {
  ArrowRight,
  Brain,
  BriefcaseMedical,
  CarFront,
  Check,
  ChevronDown,
  Dog,
  HeartHandshake,
  MapPin,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react';
import Link from 'next/link';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { flagshipResults, historicalResults, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { legalGuidesForPractice } from '@/lib/marketing/data/legalGuides';
import { practiceAreas, type PracticeAreaData, type PracticeAreaIcon } from '@/lib/marketing/data/practiceAreas';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { SITE_URL } from '@/lib/marketing/site';
import { translateResultToSpanish } from '@/lib/marketing/spanishResults';

const iconMap = {
  shield: ShieldCheck,
  car: CarFront,
  fall: UserRoundCheck,
  medical: BriefcaseMedical,
  dog: Dog,
  brain: Brain,
  support: HeartHandshake,
  scale: Scale,
} satisfies Record<PracticeAreaIcon, typeof ShieldCheck>;

export function PracticeAreaPage({ area, locale = 'en' }: { area: PracticeAreaData; locale?: SiteLocale }) {
  const spanish = locale === 'es';
  const localizedPractices = spanish ? spanishPracticeAreas : practiceAreas;
  const homePath = spanish ? '/es' : '/';
  const practicesPath = spanish ? '/es/areas-de-practica' : '/practice-areas';
  const resultsPath = spanish ? '/es/resultados' : '/results';
  const contactPath = spanish ? '/es/contacto' : '/contact';
  const Icon = iconMap[area.icon];
  const allResults = [...flagshipResults, ...historicalResults];
  const results = area.featuredResults.map((title) => allResults.find((result) => result.title === title)).filter((result) => result !== undefined).map((result) => spanish ? translateResultToSpanish(result) : result);
  const currentIndex = localizedPractices.findIndex((item) => item.key === area.key);
  const related = [1, 2, 3].map((offset) => localizedPractices[(currentIndex + offset) % localizedPractices.length]);
  const guideLinks = spanish ? [] : legalGuidesForPractice(area.key);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}${area.path}#service`,
      name: area.title,
      description: area.metaDescription,
      url: `${SITE_URL}${area.path}`,
      provider: { '@id': `${SITE_URL}/#legal-service` },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Orange County, California' },
        { '@type': 'State', name: 'California' },
      ],
      serviceType: area.shortTitle,
      inLanguage: spanish ? 'es-US' : 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: spanish ? 'Inicio' : 'Home', item: `${SITE_URL}${homePath === '/' ? '' : homePath}` },
        { '@type': 'ListItem', position: 2, name: spanish ? 'Áreas de práctica' : 'Practice Areas', item: `${SITE_URL}${practicesPath}` },
        { '@type': 'ListItem', position: 3, name: area.shortTitle, item: `${SITE_URL}${area.path}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${area.path}#faq`,
      mainEntity: area.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return (
    <main className={`practice-detail-page practice-${area.key}`}>
      <StructuredData data={structuredData} />
      <SiteHeader locale={locale} />

      <section className="practice-detail-hero" aria-labelledby="practice-detail-title">
        <div className="practice-detail-copy">
          <nav className="practice-breadcrumb" aria-label={spanish ? 'Ruta de navegación' : 'Breadcrumb'}><a href={homePath}>{spanish ? 'Inicio' : 'Home'}</a><span>/</span><a href={practicesPath}>{spanish ? 'Áreas de práctica' : 'Practice Areas'}</a></nav>
          <p className="eyebrow light-eyebrow">{area.eyebrow}</p>
          <h1 id="practice-detail-title">{area.title}</h1>
          <p>{area.description}</p>
        </div>
        <aside className="practice-hero-summary" aria-label={spanish ? `Información sobre ${area.shortTitle}` : `${area.shortTitle} practice information`}>
          <span className="practice-hero-icon"><Icon aria-hidden="true" /></span>
          <p>{spanish ? 'Área de práctica' : 'Practice area'}</p>
          <strong>{area.shortTitle}</strong>
          <ul>
            <li><MapPin aria-hidden="true" />{spanish ? 'Condado de Orange y California' : 'Orange County and California'}</li>
            <li><ShieldCheck aria-hidden="true" />{spanish ? 'Consulta confidencial gratuita' : 'Free confidential consultation'}</li>
          </ul>
        </aside>
      </section>

      <div className="practice-content-layout">
        <aside className="practice-page-nav" aria-label={spanish ? 'Navegación de la página' : 'Page navigation'}>
          <p>{spanish ? 'En esta página' : 'On this page'}</p>
          <a href="#overview">{spanish ? 'Qué implica el reclamo' : 'What the claim involves'}</a>
          <a href="#matters">{spanish ? 'Casos que revisa el bufete' : 'Cases the firm reviews'}</a>
          <a href="#evidence">{spanish ? 'Información importante' : 'Information that can matter'}</a>
          <a href="#results">{spanish ? 'Resultados publicados' : 'Published results'}</a>
          {guideLinks.length ? <a href="#guides">Legal guides</a> : null}
          <a href="#questions">{spanish ? 'Preguntas frecuentes' : 'Common questions'}</a>
          <div className="practice-sidebar-contact"><MapPin aria-hidden="true" /><strong>Kyle Scott Law</strong><span>17671 Irvine Blvd., Suite 210<br />Tustin, CA 92780</span><a href={contactPath}>{spanish ? 'Contacte al bufete' : 'Contact the firm'} <ArrowRight aria-hidden="true" /></a></div>
        </aside>

        <article className="practice-article">
          <section className="practice-overview" id="overview" aria-labelledby="overview-title">
            <p className="eyebrow">{spanish ? 'Qué implica el reclamo' : 'What the claim involves'}</p>
            <h2 id="overview-title">{area.introTitle}</h2>
            <div className="practice-intro-copy">{area.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="practice-key-points">
              {area.keyPoints.map((point, index) => <article key={point.title}><span>0{index + 1}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}
            </div>
          </section>

          <section className="practice-matters" id="matters" aria-labelledby="matters-title">
            <div className="practice-section-heading"><p className="eyebrow">{spanish ? 'Casos que revisa el bufete' : 'Cases the firm reviews'}</p><h2 id="matters-title">{spanish ? `Asuntos comunes de ${area.shortTitle.toLowerCase()}.` : `Common ${area.shortTitle.toLowerCase()} matters.`}</h2></div>
            <div className="practice-matter-grid">{area.matters.map((matter) => <div key={matter}><Check aria-hidden="true" /><span>{matter}</span></div>)}</div>
          </section>

          <section className="practice-evidence" id="evidence" aria-labelledby="evidence-title">
            <div><p className="eyebrow light-eyebrow">{spanish ? 'Información que puede ser importante' : 'Information that can matter'}</p><h2 id="evidence-title">{spanish ? 'Un reclamo sólido comienza con la preservación de pruebas.' : 'A strong claim starts with preserved evidence.'}</h2><p>{spanish ? 'Los registros útiles varían según el caso. La revisión inicial identifica lo que existe, lo que debe solicitarse y lo que conviene preservar antes de que se pierda.' : 'The useful records vary by case. The initial review identifies what exists, what may need to be requested, and what should be preserved before it is lost.'}</p></div>
            <div className="practice-evidence-list">{area.evidence.map((item) => <div key={item}><ShieldCheck aria-hidden="true" /><span>{item}</span></div>)}</div>
          </section>

          <section className="practice-related-results" id="results" aria-labelledby="practice-results-title">
            <div className="practice-results-heading"><div><p className="eyebrow">{spanish ? 'Resultados publicados' : 'Published case results'}</p><h2 id="practice-results-title">{spanish ? 'Recuperaciones relacionadas.' : 'Related recoveries.'}</h2></div><a href={resultsPath}>{spanish ? 'Ver todos los resultados' : 'View all results'} <ArrowRight aria-hidden="true" /></a></div>
            <div className={`practice-results-grid results-count-${results.length}`}>
              {results.map((result) => <article key={result.title}><span>{resultOutcomeLabel(result, spanish ? 'Recuperación' : 'Recovery')}</span><strong>{result.amount}</strong><h3>{result.title}</h3><p>{result.detail}</p></article>)}
            </div>
            <p className="results-disclaimer">{spanish ? 'Los resultados anteriores no garantizan un resultado similar.' : 'Prior results do not guarantee a similar outcome.'}</p>
          </section>

          {guideLinks.length ? <section className="practice-guide-links" id="guides" aria-labelledby="practice-guide-title">
            <div className="practice-results-heading"><div><p className="eyebrow">Legal guides</p><h2 id="practice-guide-title">Answers to common {area.shortTitle.toLowerCase()} questions.</h2></div><Link href="/guides">View all guides <ArrowRight aria-hidden="true" /></Link></div>
            <div className="practice-guide-grid">{guideLinks.map((guide) => <Link href={guide.path} key={guide.slug}><span>{guide.category}</span><strong>{guide.title}</strong><small>{guide.readingTime}</small><ArrowRight aria-hidden="true" /></Link>)}</div>
          </section> : null}

          <section className="practice-faq" id="questions" aria-labelledby="practice-faq-title">
            <div className="practice-section-heading"><p className="eyebrow">{spanish ? 'Preguntas frecuentes' : 'Common questions'}</p><h2 id="practice-faq-title">{spanish ? `Preguntas sobre reclamos de ${area.shortTitle.toLowerCase()}.` : `Questions about ${area.shortTitle.toLowerCase()} claims.`}</h2></div>
            <div className="practice-faq-list">
              {area.faqs.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
            </div>
            <p className="practice-information-note">{spanish ? 'Esta página ofrece información general, no asesoría legal. Se necesita una consulta para evaluar los hechos, plazos, partes y leyes que pueden aplicarse a un asunto específico.' : 'This page provides general information, not legal advice. A consultation is needed to evaluate the facts, deadlines, parties, and law that may apply to a specific matter.'}</p>
          </section>

          <section className="practice-more" aria-labelledby="more-practices-title">
            <div className="practice-results-heading"><div><p className="eyebrow">{spanish ? 'Áreas de práctica relacionadas' : 'Related practice areas'}</p><h2 id="more-practices-title">{spanish ? 'Otros casos que maneja Kyle Scott Law.' : 'Other cases Kyle Scott Law handles.'}</h2></div><a href={practicesPath}>{spanish ? 'Ver todas las áreas de práctica' : 'View every practice area'} <ArrowRight aria-hidden="true" /></a></div>
            <div className="practice-more-grid">{related.map((item) => { const RelatedIcon = iconMap[item.icon]; return <a href={item.path} key={item.key}><RelatedIcon aria-hidden="true" /><span><strong>{item.shortTitle}</strong><small>{item.description}</small></span><ArrowRight aria-hidden="true" /></a>; })}</div>
          </section>
        </article>
      </div>

      <section className="practice-trust-strip practice-trust-closing" aria-label={spanish ? 'Información de práctica de Kyle Scott Law' : 'Kyle Scott Law practice information'}>
        <article><strong>{spanish ? 'Más de 30 años' : '30+ years'}</strong><span>{spanish ? 'Experiencia en lesiones personales' : 'Personal injury experience'}</span></article>
        <article><strong>{spanish ? 'Oficina en Tustin' : 'Tustin office'}</strong><span>{spanish ? 'Servicio al Condado de Orange y California' : 'Serving Orange County and California'}</span></article>
        <article><strong>{noRecoveryTerms[locale].label}</strong><span>{noRecoveryTerms[locale].condition}</span></article>
      </section>

      <section className="practice-final-cta" aria-labelledby="practice-cta-title"><div><p className="eyebrow light-eyebrow">{spanish ? 'Consulta gratuita' : 'Free consultation'}</p><h2 id="practice-cta-title">{spanish ? 'Hable sobre su caso con Kyle Scott Law.' : 'Discuss your case with Kyle Scott Law.'}</h2><p>{spanish ? 'Llame a la oficina de Tustin o envíe una solicitud confidencial de revisión del caso.' : 'Call the Tustin office or send a confidential case-review request.'}</p></div><div><a className="primary-button" href={`${contactPath}#${spanish ? 'revision-del-caso' : 'case-review'}`}>{spanish ? 'Solicitar revisión del caso' : 'Request a case review'} <ArrowRight aria-hidden="true" /></a><a href="tel:+17145441460">714-544-1460</a></div></section>

      <SiteFooter locale={locale} />
      <ChatWidget locale={locale} />
    </main>
  );
}
