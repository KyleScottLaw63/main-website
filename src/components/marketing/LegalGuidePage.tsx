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
import { SITE_URL } from '@/lib/marketing/site';

export function LegalGuidePage({ guide }: { guide: LegalGuide }) {
  const pageUrl = `${SITE_URL}${guide.path}`;
  const relatedGuides = guide.relatedSlugs
    .map((slug) => legalGuideBySlug(slug))
    .filter((item): item is LegalGuide => Boolean(item));
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
        inLanguage: 'en-US',
        mainEntityOfPage: pageUrl,
        image: `${SITE_URL}/legal-guides-hero.webp`,
        about: [
          { '@type': 'Thing', name: guide.practiceLabel },
          { '@type': 'AdministrativeArea', name: 'Orange County, California' },
          { '@type': 'City', name: 'Tustin, California' },
        ],
        author: { '@id': `${SITE_URL}/#legal-service` },
        publisher: { '@id': `${SITE_URL}/#legal-service` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Legal Guides', item: `${SITE_URL}/guides` },
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
      <SiteHeader />

      <article>
        <header className="legal-guide-hero">
          <nav aria-label="Breadcrumb">
            <Link href="/guides"><ArrowLeft aria-hidden="true" /> Legal Guides</Link>
          </nav>
          <p className="eyebrow">{guide.category} guide</p>
          <h1>{guide.title}</h1>
          <p className="legal-guide-description">{guide.description}</p>
          <div className="legal-guide-meta">
            <span><CalendarDays aria-hidden="true" /> Updated {guide.updatedLabel}</span>
            <span><Clock3 aria-hidden="true" /> {guide.readingTime}</span>
            <span><MapPin aria-hidden="true" /> Orange County &amp; Tustin</span>
          </div>
        </header>

        <div className="legal-guide-layout">
          <aside className="legal-guide-toc" aria-label="Guide contents">
            <p>In this guide</p>
            <a href="#answer">Short answer</a>
            {guide.slug === 'government-injury-claim-orange-county' ? <a href="#deadline-tool">Deadline check</a> : null}
            <a href="#key-points">Key points</a>
            {guide.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.heading}</a>)}
            <a href="#questions">Questions</a>
            <a href="#sources">Primary sources</a>
          </aside>

          <div className="legal-guide-content">
            <section className="legal-guide-answer" id="answer" aria-labelledby="guide-answer-title">
              <div><BookOpenCheck aria-hidden="true" /></div>
              <div>
                <p>Direct answer</p>
                <h2 id="guide-answer-title">{guide.query}</h2>
                <p>{guide.directAnswer}</p>
              </div>
            </section>

            {guide.slug === 'government-injury-claim-orange-county' ? <GovernmentClaimDeadlineTool /> : null}

            <section className="legal-guide-key-points" id="key-points" aria-labelledby="guide-points-title">
              <p className="eyebrow">Key points</p>
              <h2 id="guide-points-title">What matters most</h2>
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
              <div><strong>Local context, not generic filler.</strong><p>Kyle Scott Law is located in Tustin and represents clients in Orange County and throughout California. The agency, court, evidence, and deadline that apply still depend on the specific incident.</p></div>
            </aside>

            <section className="legal-guide-faq" id="questions" aria-labelledby="guide-faq-title">
              <p className="eyebrow">Frequently asked questions</p>
              <h2 id="guide-faq-title">Questions about this issue</h2>
              <div>{guide.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
            </section>

            <section className="legal-guide-sources" id="sources" aria-labelledby="guide-sources-title">
              <p className="eyebrow">Primary sources</p>
              <h2 id="guide-sources-title">California law and official guidance</h2>
              <ul>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true" /></a></li>)}</ul>
            </section>

            <aside className="legal-guide-disclaimer">
              <Scale aria-hidden="true" />
              <p><strong>General information only.</strong> This guide is not legal advice and does not create an attorney-client relationship. Laws and deadlines can change, exceptions may apply, and a consultation is required to evaluate a specific matter.</p>
            </aside>
          </div>
        </div>
      </article>

      <section className="legal-guide-related" aria-labelledby="related-guide-title">
        <header>
          <div><p className="eyebrow">Continue reading</p><h2 id="related-guide-title">Related legal guides</h2></div>
          <Link href="/guides">View all guides <ArrowRight aria-hidden="true" /></Link>
        </header>
        <div>{relatedGuides.map((related) => <article key={related.slug}><span>{related.category}</span><h3>{related.title}</h3><p>{related.description}</p><Link href={related.path}>Read guide <ArrowRight aria-hidden="true" /></Link></article>)}</div>
      </section>

      <section className="legal-guide-cta" aria-labelledby="guide-cta-title">
        <div><p className="eyebrow light-eyebrow">Free confidential consultation</p><h2 id="guide-cta-title">Discuss the facts with Kyle Scott Law.</h2><p>Call the Tustin office or send a secure case-review request.</p></div>
        <div><Link className="primary-button" href="/contact#case-review">Request a case review <ArrowRight aria-hidden="true" /></Link><Link href={guide.practicePath}>Review {guide.practiceLabel} <ArrowRight aria-hidden="true" /></Link></div>
      </section>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
