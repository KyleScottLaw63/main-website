import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { PageSources } from '@/components/marketing/PageSources';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { areaNamesEs, areaRegions, areasWeServe, areasWeServeEs, practiceGroups } from '@/lib/marketing/data/areasWeServe';
import { practiceAreaByKey } from '@/lib/marketing/data/practiceAreas';
import { serviceAreaByKey } from '@/lib/marketing/data/serviceAreas';
import { spanishPracticeAreaByKey } from '@/lib/marketing/data/spanishPracticeAreas';
import { spanishServiceAreaByKey } from '@/lib/marketing/data/spanishServiceAreas';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { SITE_URL } from '@/lib/marketing/site';

const copy = {
  en: {
    home: 'Home', homeUrl: SITE_URL, crumb: 'Areas We Serve',
    eyebrow: 'Areas we serve · Orange County, California',
    points: ['Free consultation, in English or Spanish', 'Meet in Tustin, or by phone or video'],
    citiesEyebrow: 'Find your city', citiesTitle: 'Orange County cities.',
    casesEyebrow: 'Find your type of case', casesTitle: 'Every type of case the firm handles.', casesBody: 'These pages explain how each kind of claim works anywhere in Orange County.',
    more: [['View every practice area', '/practice-areas'], ['Read the legal guides', '/guides'], ['See verdicts and settlements', '/results']],
    faqEyebrow: 'Common questions', faqTitle: 'Questions about where the firm works.', note: 'This page provides general information, not legal advice.',
    ctaEyebrow: 'Free confidential consultation', ctaTitle: 'Talk with Kyle Scott Law.',
    ctaBody: 'Call 714-544-1460 or send the basic facts securely. Your first conversation is with Kyle Scott, at the Irvine Boulevard office in Tustin, by phone, or by video, in English or Spanish.',
    ctaButton: 'Request a case review', ctaPath: '/contact#case-review',
  },
  es: {
    home: 'Inicio', homeUrl: `${SITE_URL}/es`, crumb: 'Áreas que atendemos',
    eyebrow: 'Áreas que atendemos · Condado de Orange, California',
    points: ['Consulta gratuita, en inglés o en español', 'Reúnase en Tustin, o por teléfono o video'],
    citiesEyebrow: 'Busque su ciudad', citiesTitle: 'Ciudades del Condado de Orange.',
    casesEyebrow: 'Busque su tipo de caso', casesTitle: 'Todos los tipos de casos que maneja el bufete.', casesBody: 'Estas páginas explican cómo funciona cada tipo de reclamo en cualquier lugar del Condado de Orange.',
    more: [['Ver todas las áreas de práctica', '/es/areas-de-practica'], ['Leer las guías legales', '/es/guias'], ['Ver veredictos y acuerdos', '/es/resultados']],
    faqEyebrow: 'Preguntas frecuentes', faqTitle: 'Preguntas sobre dónde trabaja el bufete.', note: 'Esta página ofrece información general, no asesoría legal.',
    ctaEyebrow: 'Consulta gratuita y confidencial', ctaTitle: 'Hable con Kyle Scott Law.',
    ctaBody: 'Llame al 714-544-1460 o envíe los datos básicos de forma segura. Su primera conversación es con Kyle Scott, en la oficina de Irvine Boulevard en Tustin, por teléfono o por video, en inglés o en español.',
    ctaButton: 'Solicitar revisión del caso', ctaPath: '/es/contacto#revision-del-caso',
  },
} satisfies Record<SiteLocale, unknown>;

const slug = (name: string) => name.toLowerCase().normalize('NFD').replace(/[^a-z]+/g, '-');

/**
 * /areas-we-serve and /es/areas-que-atendemos: every city page grouped by part of the county, and every practice
 * grouped by kind of case, built from the data (docs/public-site-rendering.md). In Spanish each city and practice
 * links its Spanish page, and the English page where none exists yet.
 */
export function AreasWeServePage({ locale = 'en' }: { locale?: SiteLocale }) {
  const spanish = locale === 'es';
  const text = copy[locale];
  const page = spanish ? areasWeServeEs : areasWeServe;
  const name = (english: string) => (spanish ? areaNamesEs[english] ?? english : english);
  const city = (key: string) => (spanish ? spanishServiceAreaByKey[key] : undefined) ?? serviceAreaByKey[key];
  const practice = (key: string) => (spanish ? spanishPracticeAreaByKey[key] : undefined) ?? practiceAreaByKey[key];
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${page.path}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: text.home, item: text.homeUrl },
          { '@type': 'ListItem', position: 2, name: text.crumb, item: `${SITE_URL}${page.path}` },
        ],
      },
      { '@type': 'FAQPage', '@id': `${SITE_URL}${page.path}#faq`, inLanguage: spanish ? 'es-US' : 'en-US', mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ],
  };
  return (
    <main className="practice-hub-page areas-page">
      <StructuredData data={structuredData} />
      <SiteHeader locale={locale} />
      <section className="practice-hub-intro" aria-labelledby="areas-title">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1 id="areas-title">{page.title}</h1>
        <p>{page.intro}</p>
        <ul className="areas-intro-points">
          {text.points.map((point) => <li key={point}><MapPin aria-hidden="true" />{point}</li>)}
          <li><MapPin aria-hidden="true" />{noRecoveryTerms[locale].statement}</li>
        </ul>
      </section>

      <section className="areas-section" aria-labelledby="areas-cities-title">
        <p className="eyebrow">{text.citiesEyebrow}</p>
        <h2 id="areas-cities-title">{text.citiesTitle}</h2>
        <p>{page.citiesBody}</p>
        <div className="areas-region-grid">
          {areaRegions.map((region) => (
            <section key={region.name} aria-labelledby={`region-${slug(region.name)}`}>
              <h3 id={`region-${slug(region.name)}`}>{name(region.name)}</h3>
              {region.note ? <p>{name(region.note)}</p> : null}
              <ul>{region.keys.flatMap((key) => { const area = city(key); return area ? [<li key={key}><Link href={area.path}>{area.city}</Link></li>] : []; })}</ul>
            </section>
          ))}
        </div>
        <p className="areas-unincorporated">{page.unincorporated}</p>
      </section>

      <section className="areas-section" aria-labelledby="areas-cases-title">
        <p className="eyebrow">{text.casesEyebrow}</p>
        <h2 id="areas-cases-title">{text.casesTitle}</h2>
        <p>{text.casesBody}</p>
        <div className="areas-region-grid">
          {practiceGroups.map((group) => (
            <section key={group.name} aria-labelledby={`group-${slug(group.name)}`}>
              <h3 id={`group-${slug(group.name)}`}>{name(group.name)}</h3>
              <ul>{group.keys.flatMap((key) => { const area = practice(key); return area ? [<li key={key}><Link href={area.path}>{area.shortTitle}</Link></li>] : []; })}</ul>
            </section>
          ))}
        </div>
        <p className="areas-more-links">{text.more.map(([label, href]) => <Link href={href} key={href}>{label} <ArrowRight aria-hidden="true" /></Link>)}</p>
      </section>

      <section className="areas-section practice-faq" id="questions" aria-labelledby="areas-faq-title">
        <p className="eyebrow">{text.faqEyebrow}</p>
        <h2 id="areas-faq-title">{text.faqTitle}</h2>
        <div className="practice-faq-list">
          {page.faqs.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
        </div>
        <p className="practice-information-note">{text.note}</p>
      </section>

      <div className="areas-section"><PageSources sources={page.sources} locale={locale} /></div>

      <section className="practice-hub-note"><div><p className="eyebrow light-eyebrow">{text.ctaEyebrow}</p><h2>{text.ctaTitle}</h2><p>{text.ctaBody}</p></div><Link className="primary-button" href={text.ctaPath}>{text.ctaButton} <ArrowRight aria-hidden="true" /></Link></section>
      <SiteFooter locale={locale} />
      <ChatWidget locale={locale} />
    </main>
  );
}
