import Link from "next/link";
import type { Metadata } from 'next';
import { ArrowRight, Scale, ShieldCheck } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { ResultsExplorer } from '@/components/marketing/ResultsExplorer';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { flagshipResults, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = {
  title: 'Verdicts & Settlements | Kyle Scott Law',
  description: 'Review published Kyle Scott Law jury verdicts and settlements involving abuse, school liability, vehicle crashes, premises liability, dog bites, malpractice, and other serious injury matters.',
  alternates: localizedAlternates('/results'),
};

const recentPublications = [
  {
    amount: '$2.3M',
    label: 'Jury verdict',
    title: 'Riverside Superior Court jury verdict',
    date: 'December 26, 2024',
    href: '/news/riverside-jury-verdict-2-3-million',
  },
  {
    amount: '$2.2M',
    label: 'Confidential settlement',
    title: 'Sexual molestation and sexual battery lawsuit',
    date: 'December 26, 2024',
    href: '/news/sexual-molestation-battery-settlement-2-2-million',
  },
];

export default function ResultsPage() {
  return (
    <main className="results-page">
      <SiteHeader />

      <section className="results-hero" aria-labelledby="results-title">
        <div className="results-hero-copy">
          <p className="eyebrow">Case results</p>
          <h1 id="results-title">Verdicts &amp; Settlements</h1>
          <p>Selected published recoveries involving school and institutional liability, abuse, vehicle crashes, premises liability, dog bites, malpractice, and other serious injury matters.</p>
          <Link className="primary-button" href="/contact#case-review">Start a free consultation <ArrowRight aria-hidden="true" /></Link>
        </div>
        <aside className="results-hero-note"><Scale aria-hidden="true" /><div><strong>Every claim is unique.</strong><p>A recovery depends on the evidence, damages, insurance, parties, and law that apply to that specific matter.</p></div></aside>
      </section>

      <section className="flagship-results" aria-labelledby="flagship-title">
        <div className="flagship-heading"><p className="eyebrow" id="flagship-title">Notable recoveries</p><p>Selected matters from more than three decades of representation.</p></div>
        <div className="flagship-grid">
          {flagshipResults.map((result) => <article key={result.amount}><span>{resultOutcomeLabel(result)}</span><strong>{result.amount}</strong><h2>{result.title}</h2><p>{result.detail}</p></article>)}
        </div>
        <p className="results-disclaimer">Prior results do not guarantee a similar outcome.</p>
      </section>

      <section className="recent-results" aria-labelledby="recent-results-title">
        <div className="recent-results-heading"><div><p className="eyebrow">Recently published</p><h2 id="recent-results-title">Read the case stories.</h2></div><p>These published firm updates provide more context about two recent outcomes.</p></div>
        <div className="recent-results-grid">
          {recentPublications.map((item) => <a href={item.href} key={item.href}><span>{item.label} · {item.date}</span><strong>{item.amount}</strong><h3>{item.title}</h3><p>Read the published case story <ArrowRight aria-hidden="true" /></p></a>)}
        </div>
      </section>

      <ResultsExplorer />

      <section className="results-cta" aria-labelledby="results-cta-title"><ShieldCheck aria-hidden="true" /><div><p className="eyebrow">Free case review</p><h2 id="results-cta-title">Tell the firm what happened.</h2><p>Call the Tustin office or send a concise, confidential consultation request.</p></div><Link className="primary-button" href="/contact#case-review">Request a case review <ArrowRight aria-hidden="true" /></Link></section>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
