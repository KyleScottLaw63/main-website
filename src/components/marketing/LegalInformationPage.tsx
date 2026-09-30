import { Mail, MapPin, Phone } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import type { LegalPageContent } from '@/lib/marketing/data/legalPages';
import { SITE_URL, firmIdentity } from '@/lib/marketing/site';

export function LegalInformationPage({
  content,
}: {
  content: LegalPageContent;
}) {
  const spanish = content.locale === 'es';
  const pageUrl = `${SITE_URL}${content.path}`;
  const homeUrl = spanish ? `${SITE_URL}/es` : SITE_URL;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: content.title,
      description: content.description,
      url: pageUrl,
      inLanguage: spanish ? 'es-US' : 'en-US',
      dateModified: '2026-09-01',
      isPartOf: { '@type': 'WebSite', name: firmIdentity.name, url: homeUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: spanish ? 'Inicio' : 'Home',
          item: homeUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: content.title,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <main className="legal-page">
      <StructuredData data={schema} />
      <SiteHeader locale={content.locale} />

      <header className="legal-page-hero" aria-labelledby="legal-page-title">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="legal-page-title">{content.title}</h1>
        <p>{content.introduction}</p>
        <time dateTime="2026-09-01">{content.updatedLabel}</time>
      </header>

      <div className="legal-page-layout">
        <aside className="legal-page-toc" aria-label={content.contentsLabel}>
          <strong>{content.contentsLabel}</strong>
          <nav>
            {content.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
            <a href="#contact">{content.contactLabel}</a>
          </nav>
        </aside>

        <article className="legal-page-content">
          {content.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="legal-contact-card" id="contact">
            <div>
              <p className="eyebrow">Kyle Scott Law</p>
              <h2>{content.contactLabel}</h2>
              <p>
                {spanish
                  ? 'Comuníquese con la oficina de Tustin para obtener ayuda o presentar una solicitud relacionada con esta página.'
                  : 'Contact the Tustin office for help or to make a request related to this page.'}
              </p>
            </div>
            <div className="legal-contact-details">
              <a href={`tel:${firmIdentity.telephone}`}>
                <Phone aria-hidden="true" />
                714-544-1460
              </a>
              <a href={`mailto:${firmIdentity.email}`}>
                <Mail aria-hidden="true" />
                {firmIdentity.email}
              </a>
              <a href="https://maps.google.com/?q=Kyle+Scott+Law+17671+Irvine+Blvd+Suite+210+Tustin+CA+92780">
                <MapPin aria-hidden="true" />
                <span>
                  {firmIdentity.streetAddress}
                  <br />
                  {firmIdentity.addressLocality}, {firmIdentity.addressRegion}{' '}
                  {firmIdentity.postalCode}
                </span>
              </a>
            </div>
          </section>
        </article>
      </div>

      <SiteFooter locale={content.locale} />
      <ChatWidget locale={content.locale} />
    </main>
  );
}
