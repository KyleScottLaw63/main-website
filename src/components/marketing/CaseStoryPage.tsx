import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Gavel, Landmark, Phone, Scale } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { caseStoryHeadline, caseStoryLinks, type CaseStory, type CaseStoryLink } from '@/lib/marketing/data/caseStories';
import { caseStoryPath, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { spanishCaseStoryHeadline, spanishCaseStoryLinks, type SpanishCaseStory } from '@/lib/marketing/data/spanishCaseStories';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';
import { spanishCaseStoryPath } from '@/lib/marketing/spanishResults';

/** The page's own words in each language; the story supplies everything else. */
const copy = {
  en: {
    inLanguage: 'en-US',
    home: 'Home',
    homePath: '',
    results: 'Verdicts & Settlements',
    resultsPath: '/results',
    breadcrumb: 'Breadcrumb',
    kicker: 'Case story',
    atAGlance: 'Case at a glance',
    outcome: 'Outcome',
    confidentialOutcome: 'Confidential settlement',
    year: 'Year',
    court: 'Court',
    practiceArea: 'Practice area',
    disclaimerLabel: 'About case results',
    disclaimer: 'Every case is different. Prior results do not guarantee a similar outcome. This page describes a past case and is not legal advice.',
    sidebarLabel: 'Talk to the firm',
    sidebarEyebrow: 'Free case review',
    sidebarTitle: 'Questions about a similar injury?',
    sidebarBody: 'Call the Tustin office or send the basic facts for a confidential review.',
    callLabel: 'Call the office',
    reviewButton: 'Request a case review',
    contactPath: '/contact#case-review',
    allResults: 'All verdicts and settlements',
    moreEyebrow: 'More case stories',
    moreTitle: 'Read another case.',
    allStories: 'All case stories',
    readStory: 'Read the story',
  },
  es: {
    inLanguage: 'es-US',
    home: 'Inicio',
    homePath: '/es',
    results: 'Veredictos y acuerdos',
    resultsPath: '/es/resultados',
    breadcrumb: 'Ruta de navegación',
    kicker: 'Historia del caso',
    atAGlance: 'El caso en resumen',
    outcome: 'Resultado',
    confidentialOutcome: 'Acuerdo confidencial',
    year: 'Año',
    court: 'Tribunal',
    practiceArea: 'Área de práctica',
    disclaimerLabel: 'Sobre los resultados de casos',
    disclaimer: 'Cada caso es diferente. Los resultados anteriores no garantizan un resultado similar. Esta página describe un caso anterior y no constituye asesoría legal.',
    sidebarLabel: 'Hable con el despacho',
    sidebarEyebrow: 'Revisión gratuita del caso',
    sidebarTitle: '¿Tiene preguntas sobre una lesión similar?',
    sidebarBody: 'Llame a la oficina de Tustin o envíe los datos básicos para una revisión confidencial.',
    callLabel: 'Llame a la oficina',
    reviewButton: 'Solicitar revisión del caso',
    contactPath: '/es/contacto#revision-del-caso',
    /** Beside a link to an English-only page. */
    inEnglish: '(en inglés)',
    allResults: 'Todos los veredictos y acuerdos',
    moreEyebrow: 'Más historias de casos',
    moreTitle: 'Lea otro caso.',
    allStories: 'Todas las historias de casos',
    readStory: 'Leer la historia',
  },
} satisfies Record<SiteLocale, unknown>;

/** A link label and its arrow. The label and its space stay one text node, so the English markup is unchanged. */
function Arrowed({ label }: { label: string }) {
  return <>{`${label} `}<ArrowRight aria-hidden="true" /></>;
}

/** Figures that are words ("Confidential", "New trial") are set smaller than amounts; long amounts too. */
function figureClass(base: string, figure: string) {
  if (!figure.startsWith('$')) return `${base} is-text`;
  return figure.length > 8 ? `${base} is-long` : base;
}

/** One story behind a result: a case story or a published case announcement (the case stories section of /results, "More case stories"). */
export function CaseStoryCard({ link, locale = 'en' }: { link: CaseStoryLink; locale?: SiteLocale }) {
  return (
    <Link className="case-story-card" href={link.href}>
      <span className="case-story-card-kicker">{link.kicker}</span>
      <strong className={figureClass('case-story-card-figure', link.figure)}>{link.figure}</strong>
      <h3>{link.title}</h3>
      <p>{link.summary}</p>
      <span className="case-story-card-cta"><Arrowed label={copy[locale].readStory} /></span>
    </Link>
  );
}

/** An English story at /results/<slug>, or its Spanish version at /es/resultados/<slug>. */
type CaseStoryPageProps = { story: CaseStory; locale?: 'en' } | { story: SpanishCaseStory; locale: 'es' };

export function CaseStoryPage(props: CaseStoryPageProps) {
  const { story } = props;
  const locale: SiteLocale = props.locale ?? 'en';
  const text = copy[locale];
  const headline = props.locale === 'es' ? spanishCaseStoryHeadline(props.story) : caseStoryHeadline(props.story);
  const path = props.locale === 'es' ? spanishCaseStoryPath(props.story.slug) : caseStoryPath(props.story.slug);
  // A Spanish story's announcement with no Spanish version opens the English post, and says so.
  const announcementInEnglish = props.locale === 'es' && Boolean(props.story.announcement?.inEnglish);
  const pageUrl = `${SITE_URL}${path}`;
  const moreStories = (locale === 'es' ? spanishCaseStoryLinks() : caseStoryLinks()).filter((link) => link.href !== path).slice(0, 3);
  const largest = Math.max(...(story.comparison?.figures ?? []).map((figure) => figure.value));
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        headline: headline.title,
        description: story.summary,
        datePublished: story.published,
        dateModified: story.published,
        inLanguage: text.inLanguage,
        mainEntityOfPage: pageUrl,
        author: { '@id': `${SITE_URL}/#legal-service` },
        publisher: { '@id': `${SITE_URL}/#legal-service` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: text.home, item: `${SITE_URL}${text.homePath}` },
          { '@type': 'ListItem', position: 2, name: text.results, item: `${SITE_URL}${text.resultsPath}` },
          { '@type': 'ListItem', position: 3, name: headline.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="case-story-page">
      <StructuredData data={schema} />
      <SiteHeader locale={locale} />

      <article aria-labelledby="case-story-title">
        <header className="case-story-hero">
          <div className="case-story-hero-inner">
            <nav className="case-story-breadcrumb" aria-label={text.breadcrumb}>
              <Link href={text.resultsPath}><ArrowLeft aria-hidden="true" />{text.results}</Link>
            </nav>
            <div className="case-story-hero-grid">
              <div>
                <p className="case-story-kicker"><span>{text.kicker}</span>{resultOutcomeLabel(headline)}</p>
                <strong className={figureClass('case-story-amount', headline.figure)}>{headline.figure}</strong>
                <h1 id="case-story-title">{headline.title}</h1>
                <p className="case-story-dek">{story.summary}</p>
              </div>
              <aside className="case-story-facts" aria-label={text.atAGlance}>
                <dl>
                  <div><dt><Gavel aria-hidden="true" />{text.outcome}</dt><dd>{headline.confidential ? text.confidentialOutcome : headline.outcome}</dd></div>
                  {headline.year ? <div><dt><CalendarDays aria-hidden="true" />{text.year}</dt><dd>{headline.year}</dd></div> : null}
                  <div><dt><Landmark aria-hidden="true" />{text.court}</dt><dd>{story.court}</dd></div>
                  <div><dt><Scale aria-hidden="true" />{text.practiceArea}</dt><dd><Link href={story.practiceArea.href}>{story.practiceArea.label}</Link></dd></div>
                </dl>
              </aside>
            </div>
          </div>
        </header>

        <div className="case-story-layout">
          <div className="case-story-body">
            <ol className="case-story-chapters">
              {story.chapters.map((chapter, index) => (
                <li key={chapter.heading}>
                  <span className="case-story-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2>{chapter.heading}</h2>
                    {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </li>
              ))}
            </ol>

            {story.comparison ? (
              <figure className="case-story-comparison">
                <figcaption>{story.comparison.caption}</figcaption>
                {story.comparison.figures.map((figure) => (
                  <div className="case-story-comparison-row" key={figure.label}>
                    <span>{figure.label}</span>
                    <strong>{figure.amount}</strong>
                    <span className="case-story-bar" aria-hidden="true">
                      <i style={{ width: `${Math.max(3, Math.round((figure.value / largest) * 100))}%` }} />
                    </span>
                  </div>
                ))}
              </figure>
            ) : null}

            <aside className="news-detail-disclaimer" aria-label={text.disclaimerLabel}>
              <Scale aria-hidden="true" />
              <p>{text.disclaimer}</p>
            </aside>
          </div>

          <aside className="news-detail-sidebar case-story-sidebar" aria-label={text.sidebarLabel}>
            <p className="eyebrow">{text.sidebarEyebrow}</p>
            <h2>{text.sidebarTitle}</h2>
            <p>{text.sidebarBody}</p>
            <a className="case-story-call" href="tel:+17145441460"><Phone aria-hidden="true" /><span><small>{text.callLabel}</small>714-544-1460</span></a>
            <Link className="primary-button" href={text.contactPath}><Arrowed label={text.reviewButton} /></Link>
            <Link className="news-detail-secondary-link" href={story.practiceArea.href}>{story.practiceArea.label} <ArrowRight aria-hidden="true" /></Link>
            {story.announcement ? (
              <Link className="news-detail-secondary-link" href={story.announcement.href} {...(announcementInEnglish ? { hrefLang: 'en' } : {})}>{announcementInEnglish ? `${story.announcement.label} ${copy.es.inEnglish}` : story.announcement.label} <ArrowRight aria-hidden="true" /></Link>
            ) : null}
            <Link className="news-detail-secondary-link" href={text.resultsPath}><Arrowed label={text.allResults} /></Link>
          </aside>
        </div>
      </article>

      {moreStories.length > 0 ? (
        <section className="case-story-more" aria-labelledby="case-story-more-title">
          <div className="case-story-more-heading">
            <div><p className="eyebrow">{text.moreEyebrow}</p><h2 id="case-story-more-title">{text.moreTitle}</h2></div>
            <Link href={`${text.resultsPath}#case-stories-title`}><Arrowed label={text.allStories} /></Link>
          </div>
          <div className="case-story-grid is-compact">{moreStories.map((link) => <CaseStoryCard link={link} locale={locale} key={link.href} />)}</div>
        </section>
      ) : null}

      <SiteFooter locale={locale} />
      <ChatWidget locale={locale} />
    </main>
  );
}
