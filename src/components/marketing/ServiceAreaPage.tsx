import { ArrowRight, Check, ChevronDown, MapPin, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import type { ServiceAreaData } from '@/lib/marketing/data/serviceAreas';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { SITE_URL } from '@/lib/marketing/site';

// Reuses the practice-page layout and styles so the city pages read as
// part of the same site. English only: the Spanish site links here from
// the flagship page rather than duplicating city copy.
export function ServiceAreaPage({ area }: { area: ServiceAreaData }) {
  const guides = legalGuides.filter((guide) => area.guideSlugs.some((slug) => guide.path.endsWith(`/${slug}`)));
  const related = practiceAreas.filter((practice) => area.relatedPracticePaths.includes(practice.path));

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
        areaServed: { '@type': 'City', name: area.city, containedInPlace: { '@type': 'AdministrativeArea', name: 'Orange County, California' } },
        serviceType: 'Personal injury representation',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${area.path}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Practice Areas', item: `${SITE_URL}/practice-areas` },
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
      <SiteHeader />

      <section className="practice-detail-hero" aria-labelledby="practice-detail-title">
        <div className="practice-detail-copy">
          <nav className="practice-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/practice-areas">Practice Areas</Link></nav>
          <p className="eyebrow light-eyebrow">{area.eyebrow}</p>
          <h1 id="practice-detail-title">{area.title}</h1>
          <p>{area.description}</p>
        </div>
        <aside className="practice-hero-summary" aria-label={`${area.city} service information`}>
          <span className="practice-hero-icon"><MapPin aria-hidden="true" /></span>
          <p>Service area</p>
          <strong>{area.city}, California</strong>
          <ul>
            <li><MapPin aria-hidden="true" />Office: 17671 Irvine Blvd., Suite 210, Tustin</li>
            <li><ShieldCheck aria-hidden="true" />Free confidential consultation</li>
          </ul>
        </aside>
      </section>

      <div className="practice-content-layout">
        <aside className="practice-page-nav" aria-label="Page navigation">
          <p>On this page</p>
          <a href="#overview">How the firm helps in {area.city}</a>
          <a href="#matters">Cases the firm reviews</a>
          <a href="#local">Courts, hospitals, and reports</a>
          {guides.length ? <a href="#guides">Legal guides</a> : null}
          <a href="#questions">Common questions</a>
          <div className="practice-sidebar-contact"><MapPin aria-hidden="true" /><strong>Kyle Scott Law</strong><span>17671 Irvine Blvd., Suite 210<br />Tustin, CA 92780</span><Link href="/contact#case-review">Contact the firm <ArrowRight aria-hidden="true" /></Link></div>
        </aside>

        <article className="practice-article">
          <section className="practice-overview" id="overview" aria-labelledby="overview-title">
            <p className="eyebrow">How the firm helps in {area.city}</p>
            <h2 id="overview-title">{area.introTitle}</h2>
            <div className="practice-intro-copy">{area.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="practice-key-points">
              {area.keyPoints.map((point, index) => <article key={point.title}><span>0{index + 1}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}
            </div>
          </section>

          <section className="practice-matters" id="matters" aria-labelledby="matters-title">
            <div className="practice-section-heading"><p className="eyebrow">Cases the firm reviews</p><h2 id="matters-title">Common {area.city} injury matters.</h2></div>
            <div className="practice-matter-grid">{area.matters.map((matter) => <div key={matter}><Check aria-hidden="true" /><span>{matter}</span></div>)}</div>
          </section>

          <section className="practice-evidence" id="local" aria-labelledby="local-title">
            <div><p className="eyebrow light-eyebrow">Courts, hospitals, and reports</p><h2 id="local-title">Where a {area.city} case actually happens.</h2><p>The facts of a claim live in specific places: the courthouse where it would be filed, the hospitals that hold the treatment records, and the agencies that wrote the report. Knowing them from day one shortens everything that follows.</p></div>
            <div className="practice-evidence-list">
              {area.local.flatMap((group) => group.items.map((item) => <div key={`${group.label}-${item}`}><ShieldCheck aria-hidden="true" /><span><strong>{group.label}:</strong> {item}</span></div>))}
            </div>
          </section>

          {guides.length ? <section className="practice-guide-links" id="guides" aria-labelledby="guide-title">
            <div className="practice-results-heading"><div><p className="eyebrow">Legal guides</p><h2 id="guide-title">Answers to questions {area.city} clients ask.</h2></div><Link href="/guides">View all guides <ArrowRight aria-hidden="true" /></Link></div>
            <div className="practice-guide-grid">{guides.map((guide) => <Link href={guide.path} key={guide.path}><span>{guide.category}</span><strong>{guide.title}</strong><small>{guide.readingTime}</small><ArrowRight aria-hidden="true" /></Link>)}</div>
          </section> : null}

          <section className="practice-faq" id="questions" aria-labelledby="faq-title">
            <div className="practice-section-heading"><p className="eyebrow">Common questions</p><h2 id="faq-title">Questions from {area.city} clients.</h2></div>
            <div className="practice-faq-list">
              {area.faqs.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
            </div>
            <p className="practice-information-note">This page provides general information, not legal advice. A consultation is needed to evaluate the facts, deadlines, parties, and law that may apply to a specific matter.</p>
          </section>

          <section className="practice-more" aria-labelledby="more-practices-title">
            <div className="practice-results-heading"><div><p className="eyebrow">Practice areas</p><h2 id="more-practices-title">Cases Kyle Scott Law handles for {area.city} clients.</h2></div><Link href="/practice-areas">View every practice area <ArrowRight aria-hidden="true" /></Link></div>
            <div className="practice-more-grid">{related.map((item) => <a href={item.path} key={item.key}><ShieldCheck aria-hidden="true" /><span><strong>{item.shortTitle}</strong><small>{item.description}</small></span><ArrowRight aria-hidden="true" /></a>)}</div>
          </section>
        </article>
      </div>

      <section className="practice-trust-strip practice-trust-closing" aria-label="Kyle Scott Law practice information">
        <article><strong>30+ years</strong><span>Personal injury experience</span></article>
        <article><strong>Tustin office</strong><span>Serving {area.city} and all of Orange County</span></article>
        <article><strong>{noRecoveryTerms.en.label}</strong><span>{noRecoveryTerms.en.condition}</span></article>
      </section>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
