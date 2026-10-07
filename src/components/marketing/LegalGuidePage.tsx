import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  MapPin,
  Scale,
} from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { GovernmentClaimDeadlineTool } from '@/components/marketing/GovernmentClaimDeadlineTool';
import { legalGuideBySlug, type LegalGuide } from '@/lib/marketing/data/legalGuides';
import { spanishLegalGuideBySlug } from '@/lib/marketing/data/spanishLegalGuides';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';

/** The page's own words in each language; the guide supplies everything else. */
const copy = {
  en: {
    home: 'Home',
    homePath: '',
    library: 'Legal Guides',
    libraryPath: '/guides',
    breadcrumb: 'Breadcrumb',
    eyebrow: (category: string) => `${category} guide`,
    updated: 'Updated',
    place: 'Orange County & Tustin',
    placeSchema: 'Orange County, California',
    contents: 'Guide contents',
    inThisGuide: 'In this guide',
    shortAnswer: 'Short answer',
    deadlineCheck: 'Deadline check',
    keyPoints: 'Key points',
    questions: 'Questions',
    primarySources: 'Primary sources',
    directAnswer: 'Direct answer',
    whatMatters: 'What matters most',
    localTitle: 'Local context, not generic filler.',
    localBody: 'Kyle Scott Law is located in Tustin and represents clients in Orange County and throughout California. The agency, court, evidence, and deadline that apply still depend on the specific incident.',
    faqEyebrow: 'Frequently asked questions',
    faqTitle: 'Questions about this issue',
    sourcesTitle: 'California law and official guidance',
    sourcesNote: null,
    disclaimerTitle: 'General information only.',
    disclaimer: 'This guide is not legal advice and does not create an attorney-client relationship. Laws and deadlines can change, exceptions may apply, and a consultation is required to evaluate a specific matter.',
    continueReading: 'Continue reading',
    related: 'Related legal guides',
    viewAll: 'View all guides',
    readGuide: 'Read guide',
    ctaEyebrow: 'Free confidential consultation',
    ctaTitle: 'Discuss the facts with Kyle Scott Law.',
    ctaBody: 'Call the Tustin office or send a secure case-review request.',
    ctaButton: 'Request a case review',
    contactPath: '/contact#case-review',
    practiceLink: (label: string) => `Review ${label}`,
  },
  es: {
    home: 'Inicio',
    homePath: '/es',
    library: 'Guías legales',
    libraryPath: '/es/guias',
    breadcrumb: 'Ruta de navegación',
    eyebrow: (category: string) => `Guía · ${category}`,
    updated: 'Actualizada el',
    place: 'Condado de Orange y Tustin',
    placeSchema: 'Condado de Orange, California',
    contents: 'Contenido de la guía',
    inThisGuide: 'En esta guía',
    shortAnswer: 'Respuesta breve',
    deadlineCheck: 'Calcular el plazo',
    keyPoints: 'Puntos clave',
    questions: 'Preguntas',
    primarySources: 'Fuentes primarias',
    directAnswer: 'Respuesta directa',
    whatMatters: 'Lo más importante',
    localTitle: 'Contexto local, no relleno genérico.',
    localBody: 'Kyle Scott Law está en Tustin y representa a clientes en el Condado de Orange y en todo California. La agencia, el tribunal, las pruebas y el plazo que aplican dependen de cada incidente.',
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Preguntas sobre este tema',
    sourcesTitle: 'Leyes de California y fuentes oficiales',
    sourcesNote: 'La mayoría de estas fuentes oficiales están disponibles solo en inglés.',
    disclaimerTitle: 'Solo información general.',
    disclaimer: 'Esta guía no es asesoría legal y no crea una relación de abogado y cliente. Las leyes y los plazos pueden cambiar, puede haber excepciones y se necesita una consulta para evaluar un asunto específico.',
    continueReading: 'Siga leyendo',
    related: 'Guías legales relacionadas',
    viewAll: 'Ver todas las guías',
    readGuide: 'Leer la guía',
    ctaEyebrow: 'Consulta gratuita y confidencial',
    ctaTitle: 'Hable de los hechos con Kyle Scott Law.',
    ctaBody: 'Llame a la oficina de Tustin o envíe una solicitud segura de revisión de su caso.',
    ctaButton: 'Solicitar revisión del caso',
    contactPath: '/es/contacto#revision-del-caso',
    practiceLink: (label: string) => `Más sobre ${label.toLowerCase()}`,
  },
} satisfies Record<SiteLocale, unknown>;

/** The guide with the deadline tool, in either language. */
const DEADLINE_TOOL_GUIDE = 'government-injury-claim-orange-county';

export function LegalGuidePage({ guide, locale = 'en' }: { guide: LegalGuide & { englishSlug?: string }; locale?: SiteLocale }) {
  const text = copy[locale];
  const pageUrl = `${SITE_URL}${guide.path}`;
  const guideBySlug = locale === 'es' ? spanishLegalGuideBySlug : legalGuideBySlug;
  const relatedGuides = guide.relatedSlugs
    .map((slug) => guideBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const hasDeadlineTool = (guide.englishSlug ?? guide.slug) === DEADLINE_TOOL_GUIDE;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        headline: guide.title,
        description: guide.description,
        datePublished: guide.updated,
        dateModified: guide.updated,
        inLanguage: locale === 'es' ? 'es-US' : 'en-US',
        mainEntityOfPage: pageUrl,
        image: `${SITE_URL}/legal-guides-hero.webp`,
        about: [
          { '@type': 'Thing', name: guide.practiceLabel },
          { '@type': 'AdministrativeArea', name: text.placeSchema },
          { '@type': 'City', name: 'Tustin, California' },
        ],
        author: { '@id': `${SITE_URL}/#legal-service` },
        publisher: { '@id': `${SITE_URL}/#legal-service` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: text.home, item: `${SITE_URL}${text.homePath}` },
          { '@type': 'ListItem', position: 2, name: text.library, item: `${SITE_URL}${text.libraryPath}` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: guide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className="legal-guide-page">
      <StructuredData data={schema} />
      <SiteHeader locale={locale} />

      <article>
        <header className="legal-guide-hero">
          <nav aria-label={text.breadcrumb}>
            <Link href={text.libraryPath}><ArrowLeft aria-hidden="true" /> {text.library}</Link>
          </nav>
          <p className="eyebrow">{text.eyebrow(guide.category)}</p>
          <h1>{guide.title}</h1>
          <p className="legal-guide-description">{guide.description}</p>
          <div className="legal-guide-meta">
            <span><CalendarDays aria-hidden="true" /> {text.updated} {guide.updatedLabel}</span>
            <span><Clock3 aria-hidden="true" /> {guide.readingTime}</span>
            <span><MapPin aria-hidden="true" /> {text.place}</span>
          </div>
        </header>

        <div className="legal-guide-layout">
          <aside className="legal-guide-toc" aria-label={text.contents}>
            <p>{text.inThisGuide}</p>
            <a href="#answer">{text.shortAnswer}</a>
            {hasDeadlineTool ? <a href="#deadline-tool">{text.deadlineCheck}</a> : null}
            <a href="#key-points">{text.keyPoints}</a>
            {guide.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.heading}</a>)}
            <a href="#questions">{text.questions}</a>
            <a href="#sources">{text.primarySources}</a>
          </aside>

          <div className="legal-guide-content">
            <section className="legal-guide-answer" id="answer" aria-labelledby="guide-answer-title">
              <div><BookOpenCheck aria-hidden="true" /></div>
              <div>
                <p>{text.directAnswer}</p>
                <h2 id="guide-answer-title">{guide.query}</h2>
                <p>{guide.directAnswer}</p>
              </div>
            </section>

            {hasDeadlineTool ? <GovernmentClaimDeadlineTool locale={locale} /> : null}

            <section className="legal-guide-key-points" id="key-points" aria-labelledby="guide-points-title">
              <p className="eyebrow">{text.keyPoints}</p>
              <h2 id="guide-points-title">{text.whatMatters}</h2>
              <ul>{guide.takeaways.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul>
            </section>

            <div className="legal-guide-sections">
              {guide.sections.map((section) => (
                <section id={section.id} key={section.id}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                </section>
              ))}
            </div>

            <aside className="legal-guide-local-note">
              <MapPin aria-hidden="true" />
              <div><strong>{text.localTitle}</strong><p>{text.localBody}</p></div>
            </aside>

            <section className="legal-guide-faq" id="questions" aria-labelledby="guide-faq-title">
              <p className="eyebrow">{text.faqEyebrow}</p>
              <h2 id="guide-faq-title">{text.faqTitle}</h2>
              <div>{guide.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
            </section>

            <section className="legal-guide-sources" id="sources" aria-labelledby="guide-sources-title">
              <p className="eyebrow">{text.primarySources}</p>
              <h2 id="guide-sources-title">{text.sourcesTitle}</h2>
              {text.sourcesNote ? <p className="legal-guide-sources-note">{text.sourcesNote}</p> : null}
              <ul>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true" /></a></li>)}</ul>
            </section>

            <aside className="legal-guide-disclaimer">
              <Scale aria-hidden="true" />
              <p><strong>{text.disclaimerTitle}</strong> {text.disclaimer}</p>
            </aside>
          </div>
        </div>
      </article>

      <section className="legal-guide-related" aria-labelledby="related-guide-title">
        <header>
          <div><p className="eyebrow">{text.continueReading}</p><h2 id="related-guide-title">{text.related}</h2></div>
          <Link href={text.libraryPath}>{text.viewAll} <ArrowRight aria-hidden="true" /></Link>
        </header>
        <div>{relatedGuides.map((related) => <article key={related.slug}><span>{related.category}</span><h3>{related.title}</h3><p>{related.description}</p><Link href={related.path}>{text.readGuide} <ArrowRight aria-hidden="true" /></Link></article>)}</div>
      </section>

      <section className="legal-guide-cta" aria-labelledby="guide-cta-title">
        <div><p className="eyebrow light-eyebrow">{text.ctaEyebrow}</p><h2 id="guide-cta-title">{text.ctaTitle}</h2><p>{text.ctaBody}</p></div>
        <div><Link className="primary-button" href={text.contactPath}>{text.ctaButton} <ArrowRight aria-hidden="true" /></Link><Link href={guide.practicePath}>{text.practiceLink(guide.practiceLabel)} <ArrowRight aria-hidden="true" /></Link></div>
      </section>

      <SiteFooter locale={locale} />
      <ChatWidget locale={locale} />
    </main>
  );
}
