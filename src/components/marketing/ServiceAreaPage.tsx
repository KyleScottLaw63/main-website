import { ArrowRight, Check, ChevronDown, MapPin, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { HeroCallActions } from '@/components/marketing/CallActions';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { PageSources } from '@/components/marketing/PageSources';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { cityPracticePages } from '@/lib/marketing/data/cityPracticePages';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { flagshipResults, historicalResults, resultOutcomeLabel } from '@/lib/marketing/data/results';
import type { ServiceAreaData } from '@/lib/marketing/data/serviceAreas';
import { spanishCityPracticePages } from '@/lib/marketing/data/spanishCityPracticePages';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { SITE_URL } from '@/lib/marketing/site';
import { translateResultToSpanish } from '@/lib/marketing/spanishResults';

/** "a Tustin case", "an Irvine case": the article follows the city name's first sound. */
export const withArticle = (city: string) => (/^[aeiou]/i.test(city) ? `an ${city}` : `a ${city}`);

/** The page's own words in each language; the city data supplies everything else. */
const copy = {
  en: {
    home: 'Home',
    homePath: '/',
    practices: 'Practice Areas',
    practicesPath: '/practice-areas',
    guidesPath: '/guides',
    contactPath: '/contact#case-review',
    breadcrumb: 'Breadcrumb',
    serviceInfo: (city: string) => `${city} service information`,
    serviceArea: 'Service area',
    office: 'Office: 17671 Irvine Blvd., Suite 210, Tustin',
    consultation: 'Free confidential consultation',
    pageNav: 'Page navigation',
    onThisPage: 'On this page',
    howHelps: (city: string) => `How the firm helps in ${city}`,
    cases: 'Cases the firm reviews',
    local: 'Courts, hospitals, and reports',
    guides: 'Legal guides',
    questions: 'Common questions',
    contact: 'Contact the firm',
    mattersTitle: (city: string) => `Common ${city} injury matters.`,
    localTitle: (city: string) => `Where ${withArticle(city)} case actually happens.`,
    localBody: 'The facts of a claim live in specific places: the courthouse where it would be filed, the hospitals that hold the treatment records, and the agencies that wrote the report. Knowing them from day one shortens everything that follows.',
    guidesTitle: (city: string) => `Answers to questions ${city} clients ask.`,
    allGuides: 'View all guides',
    faqTitle: (city: string) => `Questions from ${city} clients.`,
    note: 'This page provides general information, not legal advice. A consultation is needed to evaluate the facts, deadlines, parties, and law that may apply to a specific matter.',
    practicesEyebrow: 'Practice areas',
    practicesTitle: (city: string) => `Cases Kyle Scott Law handles for ${city} clients.`,
    allPractices: 'View every practice area',
    results: 'Published case results',
    resultsTitle: 'Related recoveries.',
    allResults: 'View all results',
    resultsPath: '/results',
    recovery: 'Recovery',
    disclaimer: 'Prior results do not guarantee a similar outcome.',
    everyCase: (city: string) => `Every type of case we handle for ${city} clients.`,
    sources: 'Sources',
    trustLabel: 'Kyle Scott Law practice information',
    years: '30+ years',
    yearsBody: 'Personal injury experience',
    officeTitle: 'Tustin office',
    officeBody: (city: string) => `Serving ${city} and all of Orange County`,
    serviceType: 'Personal injury representation',
    ctaEyebrow: 'Free consultation',
    ctaTitle: 'Discuss your case with Kyle Scott Law.',
    ctaBody: 'Call the Tustin office or send a confidential case-review request.',
    ctaButton: 'Request a case review',
  },
  es: {
    home: 'Inicio',
    homePath: '/es',
    practices: 'Áreas de práctica',
    practicesPath: '/es/areas-de-practica',
    guidesPath: '/es/guias',
    contactPath: '/es/contacto#revision-del-caso',
    breadcrumb: 'Ruta de navegación',
    serviceInfo: (city: string) => `Información del servicio en ${city}`,
    serviceArea: 'Área de servicio',
    office: 'Oficina: 17671 Irvine Blvd., Suite 210, Tustin',
    consultation: 'Consulta confidencial gratuita',
    pageNav: 'Navegación de la página',
    onThisPage: 'En esta página',
    howHelps: (city: string) => `Cómo ayuda el bufete en ${city}`,
    cases: 'Casos que revisa el bufete',
    local: 'Tribunales, hospitales y reportes',
    guides: 'Guías legales',
    questions: 'Preguntas frecuentes',
    contact: 'Contacte al bufete',
    mattersTitle: (city: string) => `Asuntos comunes de lesiones en ${city}.`,
    localTitle: (city: string) => `Dónde ocurre realmente un caso de ${city}.`,
    localBody: 'Los hechos de un reclamo viven en lugares concretos: el tribunal donde se presentaría, los hospitales que guardan los expedientes del tratamiento y las agencias que escribieron el reporte. Conocerlos desde el primer día acorta todo lo que sigue.',
    guidesTitle: (city: string) => `Respuestas a las preguntas que hacen los clientes de ${city}.`,
    allGuides: 'Ver todas las guías',
    faqTitle: (city: string) => `Preguntas de clientes de ${city}.`,
    note: 'Esta página ofrece información general, no asesoría legal. Se necesita una consulta para evaluar los hechos, plazos, partes y leyes que pueden aplicarse a un asunto específico.',
    practicesEyebrow: 'Áreas de práctica',
    practicesTitle: (city: string) => `Casos que Kyle Scott Law maneja para clientes de ${city}.`,
    allPractices: 'Ver todas las áreas de práctica',
    results: 'Resultados publicados',
    resultsTitle: 'Recuperaciones relacionadas.',
    allResults: 'Ver todos los resultados',
    resultsPath: '/es/resultados',
    recovery: 'Recuperación',
    disclaimer: 'Los resultados anteriores no garantizan un resultado similar.',
    everyCase: (city: string) => `Todos los tipos de casos que manejamos para clientes de ${city}.`,
    sources: 'Fuentes',
    trustLabel: 'Información de práctica de Kyle Scott Law',
    years: 'Más de 30 años',
    yearsBody: 'Experiencia en lesiones personales',
    officeTitle: 'Oficina en Tustin',
    officeBody: (city: string) => `Servicio a ${city} y a todo el Condado de Orange`,
    serviceType: 'Representación por lesiones personales',
    ctaEyebrow: 'Consulta gratuita',
    ctaTitle: 'Hable sobre su caso con Kyle Scott Law.',
    ctaBody: 'Llame a la oficina de Tustin o envíe una solicitud confidencial de revisión del caso.',
    ctaButton: 'Solicitar revisión del caso',
  },
} satisfies Record<SiteLocale, unknown>;

// Reuses the practice-page layout and styles so the city pages read as part of the same site.
// `guideSlugs` and `relatedPracticePaths` name the guides and practice pages of the page's own
// language; the Spanish city data lists Spanish slugs and paths.
export function ServiceAreaPage({ area, locale = 'en' }: { area: ServiceAreaData; locale?: SiteLocale }) {
  const spanish = locale === 'es';
  const text = copy[locale];
  const guides = (spanish ? spanishLegalGuides : legalGuides).filter((guide) => area.guideSlugs.includes(guide.slug));
  const localizedPractices = spanish ? spanishPracticeAreas : practiceAreas;
  const related = localizedPractices.filter((practice) => area.relatedPracticePaths.includes(practice.path));
  const allResults = [...flagshipResults, ...historicalResults];
  const results = (area.featuredResults ?? []).map((title) => allResults.find((result) => result.title === title)).filter((result) => result !== undefined).map((result) => (spanish ? translateResultToSpanish(result) : result));
  const placeName = area.placeName ?? `${area.city}, California`;
  // A practice with its own page for this city (e.g. Tustin dog bites) links that page instead of the county one,
  // which is how the city + case pages are reached from the rest of the site.
  const localPages = new Map((spanish ? spanishCityPracticePages : cityPracticePages).filter((page) => page.city === area.city && page.parentKey).map((page) => [page.parentKey!, page.path]));

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        // A service the firm offers in this city, not a second business: a LegalService
        // node here would need its own address. The firm (with its address) is the
        // provider, declared once by the site layout — same shape as the practice pages.
        '@type': 'Service',
        '@id': `${SITE_URL}${area.path}#service`,
        name: area.title,
        description: area.metaDescription,
        url: `${SITE_URL}${area.path}`,
        provider: { '@id': `${SITE_URL}/#legal-service` },
        areaServed: { '@type': area.placeType ?? 'City', name: area.city, containedInPlace: { '@type': 'AdministrativeArea', name: area.containedIn ?? 'Orange County, California' } },
        serviceType: text.serviceType,
        inLanguage: spanish ? 'es-US' : 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${area.path}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: text.home, item: spanish ? `${SITE_URL}/es` : SITE_URL },
          { '@type': 'ListItem', position: 2, name: text.practices, item: `${SITE_URL}${text.practicesPath}` },
          { '@type': 'ListItem', position: 3, name: area.title, item: `${SITE_URL}${area.path}` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}${area.path}#faq`,
        mainEntity: area.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      },
    ],
  };

  return (
    <main className={`practice-detail-page service-area-${area.key}`}>
      <StructuredData data={structuredData} />
      <SiteHeader locale={locale} />

      <section className="practice-detail-hero" aria-labelledby="practice-detail-title">
        <div className="practice-detail-copy">
          <nav className="practice-breadcrumb" aria-label={text.breadcrumb}><Link href={text.homePath}>{text.home}</Link><span>/</span><Link href={text.practicesPath}>{text.practices}</Link></nav>
          <p className="eyebrow light-eyebrow">{area.eyebrow}</p>
          <h1 id="practice-detail-title">{area.title}</h1>
          <p>{area.description}</p>
          <HeroCallActions locale={locale} />
        </div>
        <aside className="practice-hero-summary" aria-label={text.serviceInfo(area.city)}>
          <span className="practice-hero-icon"><MapPin aria-hidden="true" /></span>
          <p>{text.serviceArea}</p>
          <strong>{placeName}</strong>
          <ul>
            <li><MapPin aria-hidden="true" />{text.office}</li>
            <li><ShieldCheck aria-hidden="true" />{text.consultation}</li>
          </ul>
        </aside>
      </section>

      <div className="practice-content-layout">
        <aside className="practice-page-nav" aria-label={text.pageNav}>
          <p>{text.onThisPage}</p>
          <a href="#overview">{text.howHelps(area.city)}</a>
          <a href="#matters">{text.cases}</a>
          <a href="#local">{text.local}</a>
          {results.length ? <a href="#results">{text.results}</a> : null}
          {guides.length ? <a href="#guides">{text.guides}</a> : null}
          <a href="#questions">{text.questions}</a>
          {area.sources?.length ? <a href="#sources">{text.sources}</a> : null}
          <div className="practice-sidebar-contact"><MapPin aria-hidden="true" /><strong>Kyle Scott Law</strong><span>17671 Irvine Blvd., Suite 210<br />Tustin, CA 92780</span><Link href={text.contactPath}>{text.contact} <ArrowRight aria-hidden="true" /></Link></div>
        </aside>

        <article className="practice-article">
          <section className="practice-overview" id="overview" aria-labelledby="overview-title">
            <p className="eyebrow">{text.howHelps(area.city)}</p>
            <h2 id="overview-title">{area.introTitle}</h2>
            <div className="practice-intro-copy">{area.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="practice-key-points">
              {area.keyPoints.map((point, index) => <article key={point.title}><span>0{index + 1}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}
            </div>
          </section>

          <section className="practice-matters" id="matters" aria-labelledby="matters-title">
            <div className="practice-section-heading"><p className="eyebrow">{text.cases}</p><h2 id="matters-title">{text.mattersTitle(area.city)}</h2></div>
            <div className="practice-matter-grid">{area.matters.map((matter) => <div key={matter}><Check aria-hidden="true" /><span>{matter}</span></div>)}</div>
          </section>

          <section className="practice-evidence" id="local" aria-labelledby="local-title">
            <div><p className="eyebrow light-eyebrow">{text.local}</p><h2 id="local-title">{text.localTitle(area.city)}</h2><p>{text.localBody}</p></div>
            <div className="practice-evidence-list">
              {area.local.flatMap((group) => group.items.map((item) => <div key={`${group.label}-${item}`}><ShieldCheck aria-hidden="true" /><span><strong>{group.label}:</strong> {item}</span></div>))}
            </div>
          </section>

          {results.length ? <section className="practice-related-results" id="results" aria-labelledby="area-results-title">
            <div className="practice-results-heading"><div><p className="eyebrow">{text.results}</p><h2 id="area-results-title">{text.resultsTitle}</h2></div><Link href={text.resultsPath}>{text.allResults} <ArrowRight aria-hidden="true" /></Link></div>
            <div className={`practice-results-grid results-count-${results.length}`}>
              {results.map((result) => <article key={result.title}><span>{resultOutcomeLabel(result, text.recovery)}</span><strong>{result.amount}</strong><h3>{result.title}</h3><p>{result.detail}</p></article>)}
            </div>
            <p className="results-disclaimer">{text.disclaimer}</p>
          </section> : null}

          {guides.length ? <section className="practice-guide-links" id="guides" aria-labelledby="guide-title">
            <div className="practice-results-heading"><div><p className="eyebrow">{text.guides}</p><h2 id="guide-title">{text.guidesTitle(area.city)}</h2></div><Link href={text.guidesPath}>{text.allGuides} <ArrowRight aria-hidden="true" /></Link></div>
            <div className="practice-guide-grid">{guides.map((guide) => <Link href={guide.path} key={guide.path}><span>{guide.category}</span><strong>{guide.title}</strong><small>{guide.readingTime}</small><ArrowRight aria-hidden="true" /></Link>)}</div>
          </section> : null}

          <section className="practice-faq" id="questions" aria-labelledby="faq-title">
            <div className="practice-section-heading"><p className="eyebrow">{text.questions}</p><h2 id="faq-title">{text.faqTitle(area.city)}</h2></div>
            <div className="practice-faq-list">
              {area.faqs.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
            </div>
            <p className="practice-information-note">{text.note}</p>
          </section>

          <PageSources sources={area.sources} locale={locale} />

          <section className="practice-more" aria-labelledby="more-practices-title">
            <div className="practice-results-heading"><div><p className="eyebrow">{text.practicesEyebrow}</p><h2 id="more-practices-title">{text.practicesTitle(area.city)}</h2></div><Link href={text.practicesPath}>{text.allPractices} <ArrowRight aria-hidden="true" /></Link></div>
            <div className="practice-more-grid">{related.map((item) => <a href={item.path} key={item.key}><ShieldCheck aria-hidden="true" /><span><strong>{item.shortTitle}</strong><small>{item.description}</small></span><ArrowRight aria-hidden="true" /></a>)}</div>
            <h3 className="practice-every-case-title">{text.everyCase(area.city)}</h3>
            <ul className="practice-every-case">{localizedPractices.map((item) => <li key={item.key}><Link href={localPages.get(item.key) ?? item.path}>{item.shortTitle}</Link></li>)}{spanish ? null : <li><Link href="/areas-we-serve">All Orange County areas we serve</Link></li>}</ul>
          </section>
        </article>
      </div>

      <section className="practice-trust-strip practice-trust-closing" aria-label={text.trustLabel}>
        <article><strong>{text.years}</strong><span>{text.yearsBody}</span></article>
        <article><strong>{text.officeTitle}</strong><span>{text.officeBody(area.city)}</span></article>
        <article><strong>{noRecoveryTerms[locale].label}</strong><span>{noRecoveryTerms[locale].condition}</span></article>
      </section>

      <section className="practice-final-cta" aria-labelledby="area-cta-title"><div><p className="eyebrow light-eyebrow">{text.ctaEyebrow}</p><h2 id="area-cta-title">{text.ctaTitle}</h2><p>{text.ctaBody}</p></div><div><Link className="primary-button" href={text.contactPath}>{text.ctaButton} <ArrowRight aria-hidden="true" /></Link><a href="tel:+17145441460">714-544-1460</a></div></section>

      <SiteFooter locale={locale} />
      <ChatWidget locale={locale} />
    </main>
  );
}
