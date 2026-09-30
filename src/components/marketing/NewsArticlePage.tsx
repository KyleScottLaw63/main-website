import { ArrowLeft, ArrowRight, CalendarDays, Scale } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import type { SiteNewsArticle } from '@/lib/marketing/data/newsArticles';
import { localeTags } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';
import { attorneyEntityId } from '@/lib/marketing/structured-data';

export function NewsArticlePage({ article }: { article: SiteNewsArticle }) {
  const spanish = article.locale === 'es';
  const newsPath = spanish ? '/es/noticias' : '/news';
  const resultsPath = spanish ? '/es/resultados' : '/results';
  const contactPath = spanish ? '/es/contacto#revision-del-caso' : '/contact#case-review';
  const pageUrl = `${SITE_URL}${article.path}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': article.schemaType,
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        headline: article.title,
        description: article.excerpt,
        datePublished: article.dateTime,
        dateModified: article.dateTime,
        inLanguage: localeTags[article.locale],
        mainEntityOfPage: pageUrl,
        isBasedOn: article.sourceUrl,
        author: { '@id': attorneyEntityId(article.locale) },
        publisher: { '@id': `${SITE_URL}/#legal-service` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: spanish ? 'Inicio' : 'Home',
            item: spanish ? `${SITE_URL}/es` : SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: spanish ? 'Noticias' : 'News',
            item: `${SITE_URL}${newsPath}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="news-detail-page">
      <StructuredData data={schema} />
      <SiteHeader locale={article.locale} />

      <article>
        <header className="news-detail-hero">
          <nav className="news-detail-breadcrumb" aria-label={spanish ? 'Migas de pan' : 'Breadcrumb'}>
            <a href={newsPath}><ArrowLeft aria-hidden="true" />{spanish ? 'Noticias' : 'Firm news'}</a>
          </nav>
          <div className="news-detail-meta">
            <span>{article.label}</span>
            <time dateTime={article.dateTime}><CalendarDays aria-hidden="true" />{article.date}</time>
          </div>
          {article.result ? <strong className="news-detail-result">{article.result}</strong> : null}
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </header>

        <div className="news-detail-layout">
          <div className="news-detail-body">
            <p className="news-detail-lead">{article.lead}</p>
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              </section>
            ))}
            <aside className="news-detail-disclaimer">
              <Scale aria-hidden="true" />
              <p>{spanish
                ? 'Esta página ofrece información general y no constituye asesoría legal. Los resultados anteriores no garantizan un resultado similar.'
                : 'This page provides general information and is not legal advice. Prior results do not guarantee a similar outcome.'}</p>
            </aside>
          </div>

          <aside className="news-detail-sidebar" aria-label={spanish ? 'Enlaces relacionados' : 'Related links'}>
            <p className="eyebrow">{spanish ? 'Kyle Scott Law' : 'Kyle Scott Law'}</p>
            <h2>{spanish ? '¿Tiene preguntas sobre un reclamo?' : 'Questions about a potential claim?'}</h2>
            <p>{spanish
              ? 'Llame al despacho de Tustin o envíe los datos básicos para una revisión confidencial.'
              : 'Call the Tustin office or send the basic facts for a confidential review.'}</p>
            <a className="primary-button" href={contactPath}>{spanish ? 'Solicitar una revisión' : 'Request a case review'} <ArrowRight aria-hidden="true" /></a>
            <a className="news-detail-secondary-link" href={article.kind === 'case' ? resultsPath : newsPath}>
              {article.kind === 'case'
                ? (spanish ? 'Ver todos los resultados' : 'View all results')
                : (spanish ? 'Ver todos los artículos' : 'View all articles')}
              <ArrowRight aria-hidden="true" />
            </a>
          </aside>
        </div>
      </article>

      <SiteFooter locale={article.locale} />
      <ChatWidget locale={article.locale} />
    </main>
  );
}
