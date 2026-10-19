import type { Metadata } from 'next';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { PageSources } from '@/components/marketing/PageSources';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { areaRegions, areasWeServe, practiceGroups } from '@/lib/marketing/data/areasWeServe';
import { cityPracticePages } from '@/lib/marketing/data/cityPracticePages';
import { practiceAreaByKey } from '@/lib/marketing/data/practiceAreas';
import { serviceAreaByKey } from '@/lib/marketing/data/serviceAreas';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: `${areasWeServe.title} | Kyle Scott Law`,
  description: areasWeServe.metaDescription,
  alternates: localizedAlternates(areasWeServe.path),
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${areasWeServe.path}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: `${SITE_URL}${areasWeServe.path}` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${areasWeServe.path}#faq`,
      mainEntity: areasWeServe.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
  ],
};

const slug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '-');

function CityEntry({ cityKey }: { cityKey: string }) {
  const area = serviceAreaByKey[cityKey];
  if (!area) return null;
  const spanish = spanishServiceAreas.find((page) => page.englishKey === area.key);
  const local = cityPracticePages.filter((page) => page.city === area.city);
  return (
    <li>
      <Link href={area.path}><strong>{area.city}</strong></Link>
      {spanish ? <> (<Link href={spanish.path} hrefLang="es" lang="es">en español</Link>)</> : null}
      {local.length ? <span className="areas-city-cases">Also: {local.map((page, index) => <span key={page.key}>{index ? ' · ' : ''}<Link href={page.path}>{page.shortTitle.toLowerCase()}</Link></span>)}</span> : null}
    </li>
  );
}

export default function AreasWeServePage() {
  return (
    <main className="practice-hub-page areas-page">
      <StructuredData data={structuredData} />
      <SiteHeader />
      <section className="practice-hub-intro" aria-labelledby="areas-title">
        <p className="eyebrow">Areas we serve · Orange County, California</p>
        <h1 id="areas-title">{areasWeServe.title}</h1>
        <p>{areasWeServe.intro}</p>
        <ul className="areas-intro-points">
          <li><MapPin aria-hidden="true" />Free consultation, in English or Spanish</li>
          <li><MapPin aria-hidden="true" />Meet in Tustin, or by phone or video</li>
          <li><MapPin aria-hidden="true" />{noRecoveryTerms.en.statement}</li>
        </ul>
      </section>

      <section className="areas-section" aria-labelledby="areas-cities-title">
        <p className="eyebrow">Find your city</p>
        <h2 id="areas-cities-title">Orange County cities.</h2>
        <p>{areasWeServe.citiesBody}</p>
        <div className="areas-region-grid">
          {areaRegions.map((region) => (
            <section key={region.name} aria-labelledby={`region-${slug(region.name)}`}>
              <h3 id={`region-${slug(region.name)}`}>{region.name}</h3>
              {region.note ? <p>{region.note}</p> : null}
              <ul>{region.keys.map((key) => <CityEntry cityKey={key} key={key} />)}</ul>
            </section>
          ))}
        </div>
        <p className="areas-unincorporated">{areasWeServe.unincorporated}</p>
      </section>

      <section className="areas-section" aria-labelledby="areas-cases-title">
        <p className="eyebrow">Find your type of case</p>
        <h2 id="areas-cases-title">Every type of case the firm handles.</h2>
        <p>These pages explain how each kind of claim works anywhere in Orange County.</p>
        <div className="areas-region-grid">
          {practiceGroups.map((group) => (
            <section key={group.name} aria-labelledby={`group-${slug(group.name)}`}>
              <h3 id={`group-${slug(group.name)}`}>{group.name}</h3>
              <ul>{group.keys.flatMap((key) => (practiceAreaByKey[key] ? [<li key={key}><Link href={practiceAreaByKey[key].path}>{practiceAreaByKey[key].shortTitle}</Link></li>] : []))}</ul>
            </section>
          ))}
        </div>
        <p className="areas-more-links"><Link href="/practice-areas">View every practice area <ArrowRight aria-hidden="true" /></Link><Link href="/guides">Read the legal guides <ArrowRight aria-hidden="true" /></Link><Link href="/results">See verdicts and settlements <ArrowRight aria-hidden="true" /></Link></p>
      </section>

      <section className="areas-section practice-faq" id="questions" aria-labelledby="areas-faq-title">
        <p className="eyebrow">Common questions</p>
        <h2 id="areas-faq-title">Questions about where the firm works.</h2>
        <div className="practice-faq-list">
          {areasWeServe.faqs.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
        </div>
        <p className="practice-information-note">This page provides general information, not legal advice.</p>
      </section>

      <div className="areas-section"><PageSources sources={areasWeServe.sources} locale="en" /></div>

      <section className="practice-hub-note"><div><p className="eyebrow light-eyebrow">Free confidential consultation</p><h2>Talk with Kyle Scott Law.</h2><p>Call 714-544-1460 or send the basic facts securely. Your first conversation is with Kyle Scott, at the Irvine Boulevard office in Tustin, by phone, or by video, in English or Spanish.</p></div><Link className="primary-button" href="/contact#case-review">Request a case review <ArrowRight aria-hidden="true" /></Link></section>
      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
