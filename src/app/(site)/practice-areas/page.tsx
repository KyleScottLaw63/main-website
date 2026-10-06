import Link from "next/link";
import type { Metadata } from 'next';
import { ArrowRight, Brain, BriefcaseMedical, CarFront, Dog, HandHeart, HeartHandshake, Scale, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { practiceAreas, type PracticeAreaIcon } from '@/lib/marketing/data/practiceAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = {
  title: 'Personal Injury Practice Areas | Kyle Scott Law',
  description: 'Review Kyle Scott Law practice areas, including personal injury, car accidents, unsafe property, malpractice, elder abuse, dog bites, brain injury, abuse, and wrongful death.',
  alternates: localizedAlternates('/practice-areas'),
};

const iconMap = { shield: ShieldCheck, car: CarFront, fall: UserRoundCheck, medical: BriefcaseMedical, dog: Dog, brain: Brain, support: HeartHandshake, scale: Scale, care: HandHeart } satisfies Record<PracticeAreaIcon, typeof ShieldCheck>;

export default function PracticeAreasPage() {
  return (
    <main className="practice-hub-page">
      <SiteHeader />
      <section className="practice-hub-intro" aria-labelledby="practice-hub-title">
        <h1 id="practice-hub-title">Practice Areas</h1>
        <p>Personal injury representation for clients throughout Orange County and California.</p>
      </section>
      <section className="practice-hub-grid-section" aria-label="Kyle Scott Law practice areas">
        <p className="eyebrow practice-hub-grid-label">Cases we handle</p>
        <div className="practice-hub-grid">
          {practiceAreas.map((area) => { const Icon = iconMap[area.icon]; return <a href={area.path} key={area.key}><span><Icon aria-hidden="true" /></span><div><strong>{area.shortTitle}</strong><p>{area.description}</p><small>Review this practice area <ArrowRight aria-hidden="true" /></small></div></a>; })}
        </div>
      </section>
      <section className="practice-hub-note"><div><p className="eyebrow light-eyebrow">Not sure which category applies?</p><h2>Tell the firm what happened.</h2><p>A short consultation request is enough to begin. Do not send medical records, Social Security numbers, or financial account information through the general form.</p></div><Link className="primary-button" href="/contact#case-review">Start a free consultation <ArrowRight aria-hidden="true" /></Link></section>
      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
