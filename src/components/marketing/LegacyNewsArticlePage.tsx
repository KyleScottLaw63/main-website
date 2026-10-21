import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FileClock,
  Scale,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { legacyArchiveNoticeText, type LegacyPost } from '@/lib/marketing/data/legacyPosts';
import { spanishLegacyArchiveNoticeText } from '@/lib/marketing/data/spanishLegacyPosts';
import { localeTags, type SiteLocale } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';
import { attorneyEntityId } from '@/lib/marketing/structured-data';

const copy = {
  en: {
    home: 'Home',
    homeUrl: SITE_URL,
    news: 'News',
    newsPath: '/news',
    breadcrumb: 'Breadcrumb',
    backToArchive: 'News archive',
    noticeLabel: 'About this archived article',
    notice: legacyArchiveNoticeText,
    empty: 'This short firm update was published under the title above. Its original media is no longer available from the legacy website.',
    relatedEyebrow: 'Related information',
    relatedTitle: 'Practice-area resources',
    disclaimer: 'This page provides general information and is not legal advice. Prior results do not guarantee a similar outcome.',
    sidebarLabel: 'Contact Kyle Scott Law',
    sidebarTitle: 'Questions about a potential claim?',
    sidebarBody: 'Call the Tustin office or send the basic facts for a confidential review.',
    contactPath: '/contact#case-review',
    contactLabel: 'Request a case review',
    archivePath: '/news#article-archive',
    archiveLabel: 'Browse the article archive',
  },
  es: {
    home: 'Inicio',
    homeUrl: `${SITE_URL}/es`,
    news: 'Noticias',
    newsPath: '/es/noticias',
    breadcrumb: 'Migas de pan',
    backToArchive: 'Archivo de noticias',
    noticeLabel: 'Sobre este artículo archivado',
    notice: spanishLegacyArchiveNoticeText,
    empty: 'Esta breve noticia del despacho se publicó con el título de arriba. Su contenido multimedia original ya no está disponible en el sitio web anterior.',
    relatedEyebrow: 'Información relacionada',
    relatedTitle: 'Recursos por área de práctica',
    disclaimer: 'Esta página ofrece información general y no constituye asesoría legal. Los resultados anteriores no garantizan un resultado similar.',
    sidebarLabel: 'Comuníquese con Kyle Scott Law',
    sidebarTitle: '¿Tiene preguntas sobre un reclamo?',
    sidebarBody: 'Llame al despacho de Tustin o envíe los datos básicos para una revisión confidencial.',
    contactPath: '/es/contacto#revision-del-caso',
    contactLabel: 'Solicitar una revisión',
    archivePath: '/es/noticias#article-archive',
    archiveLabel: 'Ver el archivo de artículos',
  },
} as const;

/** An archived post (legacyPosts.json), or its Spanish version (spanishLegacyPosts.ts) with locale "es". */
export function LegacyNewsArticlePage({ article, locale = 'en' }: { article: LegacyPost; locale?: SiteLocale }) {
  const text = copy[locale];
  const pageUrl = `${SITE_URL}${article.path}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        headline: article.title,
        description: article.excerpt,
        datePublished: article.dateTime,
        dateModified: article.modifiedTime,
        inLanguage: localeTags[locale],
        mainEntityOfPage: pageUrl,
        // No isBasedOn: sourceUrl is the post's old WordPress address, which now 301s
        // to this page (so it names nothing new), and one of those old addresses still
        // carries a retired phone number (legacyPosts.json keeps it only as a redirect source).
        author: { '@id': attorneyEntityId(locale) },
        publisher: { '@id': `${SITE_URL}/#legal-service` },
        ...(article.featuredImage
          ? { image: `${SITE_URL}${article.featuredImage}` }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: text.home, item: text.homeUrl },
          {
            '@type': 'ListItem',
            position: 2,
            name: text.news,
            item: `${SITE_URL}${text.newsPath}`,
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
    <main className="legacy-news-page">
      <StructuredData data={schema} />
      <SiteHeader locale={locale} />

      <article>
        <header className="legacy-news-hero">
          <nav className="news-detail-breadcrumb" aria-label={text.breadcrumb}>
            <Link href={text.newsPath}>
              <ArrowLeft aria-hidden="true" />
              {text.backToArchive}
            </Link>
          </nav>
          <div className="legacy-news-meta">
            <span>{article.category}</span>
            <time dateTime={article.dateTime}>
              <CalendarDays aria-hidden="true" />
              {article.date}
            </time>
          </div>
          <h1>{article.title}</h1>
          {article.excerpt ? <p>{article.excerpt}</p> : null}
        </header>

        <div className="legacy-news-layout">
          <div className="legacy-news-main">
            {article.featuredImage ? (
              <figure className="legacy-news-image">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 900px) 100vw, 760px"
                  loading="eager"
                />
              </figure>
            ) : null}

            {/* The same short, neutral line above every archived post: when it was first
                published, and that it is general information. Each post's own text states
                the law; nothing here speaks of accuracy, corrections, or later changes
                (legacyArchiveNoticeText, docs/website-content-compliance.md). */}
            <aside
              className="legacy-archive-note"
              aria-label={text.noticeLabel}
            >
              <FileClock aria-hidden="true" />
              <p>{text.notice(article)}</p>
            </aside>

            {article.contentHtml ? (
              <div
                className="legacy-news-content"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            ) : (
              <div className="legacy-news-content legacy-news-empty">
                <p>{text.empty}</p>
              </div>
            )}

            <aside
              className="legacy-related-links"
              aria-labelledby="related-practice-title"
            >
              <div>
                <p className="eyebrow">{text.relatedEyebrow}</p>
                <h2 id="related-practice-title">{text.relatedTitle}</h2>
              </div>
              <nav>
                {article.relatedLinks.map(([label, href]) => (
                  <Link href={href} key={href}>
                    {label}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </aside>

            <aside className="news-detail-disclaimer">
              <Scale aria-hidden="true" />
              <p>{text.disclaimer}</p>
            </aside>
          </div>

          <aside
            className="news-detail-sidebar"
            aria-label={text.sidebarLabel}
          >
            <p className="eyebrow">Kyle Scott Law</p>
            <h2>{text.sidebarTitle}</h2>
            <p>{text.sidebarBody}</p>
            <Link className="primary-button" href={text.contactPath}>
              {text.contactLabel} <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              className="news-detail-secondary-link"
              href={text.archivePath}
            >
              {text.archiveLabel} <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </article>

      <SiteFooter locale={locale} />
      <ChatWidget locale={locale} />
    </main>
  );
}
