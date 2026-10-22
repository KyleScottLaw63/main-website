import Link from "next/link";
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Newspaper, Scale } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { LegacyNewsArchive } from '@/components/marketing/LegacyNewsArchive';
import { LegacyNewsYearIndex } from '@/components/marketing/LegacyNewsYearIndex';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import { spanishCaseStoryByEnglishSlug, spanishCaseStoryHeadline } from '@/lib/marketing/data/spanishCaseStories';
import { spanishLegacyPostSummary, spanishLegacyPosts } from '@/lib/marketing/data/spanishLegacyPosts';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { spanishCaseStoryPath } from '@/lib/marketing/spanishResults';
import { newsCollectionStructuredData } from '@/lib/marketing/structured-data';

export const metadata: Metadata = {
  title: 'Noticias y Artículos Legales | Kyle Scott Law',
  description: 'Noticias de Kyle Scott Law y artículos legales sobre lesiones personales en el Condado de Orange y California. Consulta gratuita.',
  alternates: localizedAlternates('/es/noticias'),
};

const localizedNews = newsArticlesForLocale('es');
const caseAnnouncements = localizedNews.filter((item) => item.kind === 'case').map((item) => ({ ...item, type: item.label, href: item.path }));
/**
 * The $5.75M verdict's Spanish case story joins the firm's case announcements, in the place of the
 * Riverside verdict post the firm deleted (the owner's choice, 2026-10-01), as on /news. Newest first.
 */
const verdictStory = spanishCaseStoryByEnglishSlug('student-skull-fracture-verdict')!;
const verdictHeadline = spanishCaseStoryHeadline(verdictStory);
const caseNews = [
  ...caseAnnouncements.map(({ type, dateTime, date, result, title, excerpt, href }) => ({ type, dateTime, date, result, title, excerpt, href, cta: 'Leer el caso' })),
  { type: verdictHeadline.outcome, dateTime: verdictStory.resolved, date: String(verdictHeadline.year), result: verdictHeadline.figure, title: verdictHeadline.title, excerpt: verdictStory.summary, href: spanishCaseStoryPath(verdictStory.slug), cta: 'Leer la historia del caso' },
].sort((a, b) => b.dateTime.localeCompare(a.dateTime));
const legalArticles = localizedNews.filter((item) => item.kind === 'article').map((item) => ({ ...item, category: item.label, href: item.path }));
const legacyArticleSummaries = spanishLegacyPosts.slice(0, 24).map(spanishLegacyPostSummary);
// The Spanish versions of the three guides /news features.
const featuredGuides = legalGuides.slice(0, 3).map((guide) => spanishLegalGuides.find((spanish) => spanish.englishSlug === guide.slug)!);

const newsCollectionSchema = newsCollectionStructuredData('es', [
  ...caseAnnouncements.map((item) => ({
    type: 'NewsArticle' as const,
    title: item.title,
    description: item.excerpt,
    datePublished: item.dateTime,
    url: item.href,
    sourceUrl: item.sourceUrl,
  })),
  ...legalArticles.map((item) => ({
    type: 'Article' as const,
    title: item.title,
    description: item.excerpt,
    datePublished: item.dateTime,
    url: item.href,
    sourceUrl: item.sourceUrl,
  })),
  ...spanishLegacyPosts.slice(0, 24).map((item) => ({
    type: 'Article' as const,
    title: item.title,
    description: item.excerpt,
    datePublished: item.dateTime,
    url: item.path,
    sourceUrl: item.sourceUrl,
  })),
]);

export default function SpanishNewsPage() {
  return (
    <main className="news-page">
      <StructuredData data={newsCollectionSchema} />
      <SiteHeader locale="es" />

      <section className="news-page-hero" aria-labelledby="news-page-title">
        <div className="news-page-hero-copy">
          <p className="eyebrow">Noticias</p>
          <h1 id="news-page-title">Noticias del Despacho y Artículos Legales</h1>
          <p>Resultados de casos, novedades del despacho y artículos publicados por Kyle Scott Law.</p>
          <nav className="news-page-jump-links" aria-label="Secciones de noticias">
            <a href="#case-news">Resultados y Noticias</a>
            <a href="#legal-articles">Artículos Legales</a>
            <a href="#legal-guides">Guías Legales</a>
            <a href="#article-archive">Archivo de Artículos</a>
          </nav>
        </div>
      </section>

      <section className="news-case-stream" id="case-news" aria-labelledby="case-news-title">
        <header className="news-stream-heading">
          <div><p>Asuntos publicados</p><h2 id="case-news-title">Resultados y Noticias del Despacho</h2></div>
          <Link href="/es/resultados">Ver todos los resultados <ArrowRight aria-hidden="true" /></Link>
        </header>
        <div className="news-case-grid">
          {caseNews.map((item, index) => (
            <article className="news-case-card" id={`story-${index + 1}`} key={item.href}>
              <div className="news-case-meta"><span>{item.type}</span><time dateTime={item.dateTime}>{item.date}</time></div>
              <strong className="news-case-result">{item.result}</strong>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <a href={item.href}>{item.cta} <ArrowRight aria-hidden="true" /></a>
            </article>
          ))}
        </div>
        <p className="news-results-disclaimer"><Scale aria-hidden="true" />Los resultados anteriores no garantizan un resultado similar.</p>
      </section>

      <section className="news-article-stream" id="legal-articles" aria-labelledby="legal-articles-title">
        <header className="news-article-heading">
          <div><p className="eyebrow">Del despacho</p><h2 id="legal-articles-title">Artículos Legales</h2></div>
          <p>Información general de Kyle Scott Law sobre reclamos por lesiones personales y el proceso legal. Estos artículos no constituyen asesoría legal.</p>
        </header>
        <div className="news-article-grid">
          {legalArticles.map((item, index) => (
            <article className="news-article-card" id={`story-${caseNews.length + index + 1}`} key={item.href}>
              <span className="news-article-icon"><BookOpen aria-hidden="true" /></span>
              <div className="news-article-card-copy">
                <div className="news-article-meta"><span>{item.category}</span><time dateTime={item.dateTime}>{item.date}</time></div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <a href={item.href}>Leer el artículo <ArrowRight aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="news-article-note"><Newspaper aria-hidden="true" />Consulte el historial completo de publicaciones más abajo.</p>
      </section>

      <section className="news-guide-feature" id="legal-guides" aria-labelledby="news-guide-title">
        <header><div><p className="eyebrow">Guías legales</p><h2 id="news-guide-title">Empiece con una respuesta directa.</h2></div><p>Guías detalladas y respaldadas por fuentes sobre los plazos, las pruebas, los seguros y el proceso legal en los casos de lesiones en California.</p></header>
        <div>{featuredGuides.map((guide) => <article key={guide.slug}><span>{guide.category}</span><h3>{guide.title}</h3><p>{guide.description}</p><Link href={guide.path}>Leer la guía <ArrowRight aria-hidden="true" /></Link></article>)}</div>
        <Link className="news-guide-all" href="/es/guias">Ver las {spanishLegalGuides.length} guías legales <ArrowRight aria-hidden="true" /></Link>
      </section>

      <LegacyNewsArchive posts={legacyArticleSummaries} totalCount={spanishLegacyPosts.length} locale="es">
        <LegacyNewsYearIndex posts={spanishLegacyPosts.map(spanishLegacyPostSummary)} locale="es" />
      </LegacyNewsArchive>

      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
