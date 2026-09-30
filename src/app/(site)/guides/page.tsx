import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, MapPin, SearchCheck, ShieldCheck } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'California Personal Injury Legal Guides | Kyle Scott Law',
  description: 'Practical legal guides answering common California personal injury questions for Orange County and Tustin residents, with primary-law and agency sources.',
  alternates: { canonical: `${SITE_URL}/guides`, languages: { 'en-US': `${SITE_URL}/guides`, 'x-default': `${SITE_URL}/guides` } },
  openGraph: { title: 'California Personal Injury Legal Guides | Kyle Scott Law', description: 'Clear answers to common California injury, insurance, evidence, and deadline questions.', images: [`${SITE_URL}/legal-guides-hero.webp`] },
};

const hubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/guides#collection`,
      url: `${SITE_URL}/guides`,
      name: 'California Personal Injury Legal Guides',
      description: 'Query-led California personal injury guides for Orange County and Tustin residents.',
      inLanguage: 'en-US',
      about: { '@id': `${SITE_URL}/#legal-service` },
      mainEntity: { '@id': `${SITE_URL}/guides#list` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/guides#list`,
      numberOfItems: legalGuides.length,
      itemListElement: legalGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `${SITE_URL}${guide.path}` })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/guides#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Legal Guides', item: `${SITE_URL}/guides` },
      ],
    },
  ],
};

export default function GuidesPage() {
  return (
    <main className="legal-guides-page">
      <StructuredData data={hubSchema} />
      <SiteHeader />

      <section className="legal-guides-hero" aria-labelledby="legal-guides-title">
        <div>
          <p className="eyebrow">California legal guides</p>
          <h1 id="legal-guides-title">Clear answers to the questions injured people ask.</h1>
          <p>Practical, source-backed guidance on California injury claims, insurance, evidence, and deadlines—with specific Orange County resources where they matter.</p>
          <div className="legal-guides-hero-points">
            <span><SearchCheck aria-hidden="true" /> Built around real search questions</span>
            <span><ShieldCheck aria-hidden="true" /> Linked to primary legal sources</span>
            <span><MapPin aria-hidden="true" /> Orange County and Tustin context</span>
          </div>
        </div>
        <figure><Image src="/legal-guides-hero.webp" alt="Navy legal folder, pen, and California outline on a desk" width={1600} height={900} priority sizes="(max-width: 800px) 100vw, 44vw" /></figure>
      </section>

      <section className="legal-guides-library" aria-labelledby="guide-library-title">
        <header><div><p className="eyebrow">Legal resource library</p><h2 id="guide-library-title">13 in-depth guides</h2></div><p>Start with the question closest to your situation. Each guide gives a direct answer first, then explains the evidence, law, local details, and next decisions.</p></header>
        <div className="legal-guide-card-grid">
          {legalGuides.map((guide, index) => (
            <article className="legal-guide-card" key={guide.slug}>
              <div className="legal-guide-card-top"><span>{String(index + 1).padStart(2, '0')}</span><small>{guide.category}</small></div>
              <BookOpenCheck aria-hidden="true" />
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <div className="legal-guide-card-meta"><span>{guide.readingTime}</span><span>Updated {guide.updatedLabel}</span></div>
              <Link href={guide.path}>Read guide <ArrowRight aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="legal-guides-method" aria-labelledby="guide-method-title">
        <div><p className="eyebrow light-eyebrow">How these guides are built</p><h2 id="guide-method-title">Useful before promotional.</h2></div>
        <div><article><strong>01</strong><h3>Answer first</h3><p>Every guide opens with a direct response instead of making readers search through a sales page.</p></article><article><strong>02</strong><h3>Primary sources</h3><p>California statutes, courts, state agencies, and Orange County resources are linked for verification.</p></article><article><strong>03</strong><h3>Clear limits</h3><p>No settlement calculators, guaranteed outcomes, or generic deadline promises. Every matter still needs individual review.</p></article></div>
      </section>

      <section className="legal-guides-cta" aria-labelledby="guides-cta-title"><div><p className="eyebrow">Need a case-specific answer?</p><h2 id="guides-cta-title">Talk with the Tustin office.</h2><p>Send the basic facts securely or call Kyle Scott Law at 714-544-1460.</p></div><Link className="primary-button" href="/contact#case-review">Request a case review <ArrowRight aria-hidden="true" /></Link></section>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
