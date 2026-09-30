import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Gavel, Landmark, Phone, Scale } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { caseStoryHeadline, caseStoryLinks, type CaseStory, type CaseStoryLink } from '@/lib/marketing/data/caseStories';
import { caseStoryPath, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { SITE_URL } from '@/lib/marketing/site';

/** Figures that are words ("Confidential", "New trial") are set smaller than amounts; long amounts too. */
function figureClass(base: string, figure: string) {
  if (!figure.startsWith('$')) return `${base} is-text`;
  return figure.length > 8 ? `${base} is-long` : base;
}

/** One story behind a result: a case story or a published case announcement (the case stories section of /results, "More case stories"). */
export function CaseStoryCard({ link }: { link: CaseStoryLink }) {
  return (
    <Link className="case-story-card" href={link.href}>
      <span className="case-story-card-kicker">{link.kicker}</span>
      <strong className={figureClass('case-story-card-figure', link.figure)}>{link.figure}</strong>
      <h3>{link.title}</h3>
      <p>{link.summary}</p>
      <span className="case-story-card-cta">Read the story <ArrowRight aria-hidden="true" /></span>
    </Link>
  );
}

export function CaseStoryPage({ story }: { story: CaseStory }) {
  const headline = caseStoryHeadline(story);
  const path = caseStoryPath(story.slug);
  const pageUrl = `${SITE_URL}${path}`;
  const moreStories = caseStoryLinks().filter((link) => link.href !== path).slice(0, 3);
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
        inLanguage: 'en-US',
        mainEntityOfPage: pageUrl,
        author: { '@id': `${SITE_URL}/#legal-service` },
        publisher: { '@id': `${SITE_URL}/#legal-service` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Verdicts & Settlements', item: `${SITE_URL}/results` },
          { '@type': 'ListItem', position: 3, name: headline.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="case-story-page">
      <StructuredData data={schema} />
      <SiteHeader />

      <article aria-labelledby="case-story-title">
        <header className="case-story-hero">
          <div className="case-story-hero-inner">
            <nav className="case-story-breadcrumb" aria-label="Breadcrumb">
              <Link href="/results"><ArrowLeft aria-hidden="true" />Verdicts &amp; Settlements</Link>
            </nav>
            <div className="case-story-hero-grid">
              <div>
                <p className="case-story-kicker"><span>Case story</span>{resultOutcomeLabel(headline)}</p>
                <strong className={figureClass('case-story-amount', headline.figure)}>{headline.figure}</strong>
                <h1 id="case-story-title">{headline.title}</h1>
                <p className="case-story-dek">{story.summary}</p>
              </div>
              <aside className="case-story-facts" aria-label="Case at a glance">
                <dl>
                  <div><dt><Gavel aria-hidden="true" />Outcome</dt><dd>{headline.confidential ? 'Confidential settlement' : headline.outcome}</dd></div>
                  {headline.year ? <div><dt><CalendarDays aria-hidden="true" />Year</dt><dd>{headline.year}</dd></div> : null}
                  <div><dt><Landmark aria-hidden="true" />Court</dt><dd>{story.court}</dd></div>
                  <div><dt><Scale aria-hidden="true" />Practice area</dt><dd><Link href={story.practiceArea.href}>{story.practiceArea.label}</Link></dd></div>
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

            <aside className="news-detail-disclaimer" aria-label="About case results">
              <Scale aria-hidden="true" />
              <p>Every case is different. Prior results do not guarantee a similar outcome. This page describes a past case and is not legal advice.</p>
            </aside>
          </div>

          <aside className="news-detail-sidebar case-story-sidebar" aria-label="Talk to the firm">
            <p className="eyebrow">Free case review</p>
            <h2>Questions about a similar injury?</h2>
            <p>Call the Tustin office or send the basic facts for a confidential review.</p>
            <a className="case-story-call" href="tel:+17145441460"><Phone aria-hidden="true" /><span><small>Call the office</small>714-544-1460</span></a>
            <Link className="primary-button" href="/contact#case-review">Request a case review <ArrowRight aria-hidden="true" /></Link>
            <Link className="news-detail-secondary-link" href={story.practiceArea.href}>{story.practiceArea.label} <ArrowRight aria-hidden="true" /></Link>
            {story.announcement ? (
              <Link className="news-detail-secondary-link" href={story.announcement.href}>{story.announcement.label} <ArrowRight aria-hidden="true" /></Link>
            ) : null}
            <Link className="news-detail-secondary-link" href="/results">All verdicts and settlements <ArrowRight aria-hidden="true" /></Link>
          </aside>
        </div>
      </article>

      {moreStories.length > 0 ? (
        <section className="case-story-more" aria-labelledby="case-story-more-title">
          <div className="case-story-more-heading">
            <div><p className="eyebrow">More case stories</p><h2 id="case-story-more-title">Read another case.</h2></div>
            <Link href="/results#case-stories-title">All case stories <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="case-story-grid is-compact">{moreStories.map((link) => <CaseStoryCard link={link} key={link.href} />)}</div>
        </section>
      ) : null}

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
