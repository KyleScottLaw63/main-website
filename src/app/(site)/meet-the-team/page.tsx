import Image from 'next/image';
import Link from "next/link";
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  MapPin,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { attorneyProfileStructuredData } from '@/lib/marketing/structured-data';

export const metadata: Metadata = {
  title: 'Meet the Team | Kyle Scott Law',
  description: 'Meet trial attorney Kyle J. Scott and the Kyle Scott Law team serving injured clients from the firm’s Tustin office throughout Orange County and California.',
  alternates: localizedAlternates('/meet-the-team'),
};

const teamMembers = [
  {
    name: 'Naomi Moore',
    role: 'Office Manager',
    image: '/naomi-moore.webp',
    className: '',
  },
  {
    name: 'Evan Scott',
    role: 'Legal Assistant',
    image: '/evan-scott.webp',
    className: '',
  },
  {
    name: 'Jacqualine Scott',
    role: 'Administrator',
    image: '/jacqualine-scott.webp',
    className: '',
  },
];

export default function MeetTheTeamPage() {
  return (
    <main className="team-page">
      <StructuredData data={attorneyProfileStructuredData('en')} />
      <SiteHeader />

      <section className="team-hero" aria-labelledby="team-title">
        <div className="team-hero-copy">
          <h1 className="team-hero-title" id="team-title">Meet the team</h1>
          <p>Trial attorney Kyle J. Scott and the professional staff serving clients from the firm’s Tustin office.</p>
        </div>
        <figure className="team-hero-photo">
          <Image src="/team-group-original.webp" alt="The Kyle Scott Law team outside the firm’s Tustin office" width={900} height={600} loading="eager" fetchPriority="high" />
          <figcaption><span>Kyle Scott Law</span><strong>Tustin, California</strong></figcaption>
        </figure>
      </section>

      <section className="team-facts" aria-label="Kyle Scott Law firm facts">
        <article><Scale aria-hidden="true" /><span><strong>Trial attorney</strong><small>Kyle J. Scott</small></span></article>
        <article><ShieldCheck aria-hidden="true" /><span><strong>California Bar</strong><small>Admitted in 1991</small></span></article>
        <article><MapPin aria-hidden="true" /><span><strong>Tustin office</strong><small>Serving Orange County and California</small></span></article>
        <article><UserRoundCheck aria-hidden="true" /><span><strong>Focused team</strong><small>Attorney and professional staff</small></span></article>
      </section>

      <section className="lead-attorney" aria-labelledby="kyle-title">
        <div className="lead-attorney-photo"><Image src="/kyle-scott-original.webp" alt="Trial attorney Kyle J. Scott" width={600} height={900} loading="lazy" /><span>California attorney no. 155434</span></div>
        <div className="lead-attorney-copy">
          <p className="eyebrow light-eyebrow">Founder and trial attorney</p>
          <h2 id="kyle-title">Kyle J. Scott</h2>
          <p className="lead-attorney-intro">Kyle Scott has practiced law in California since 1991 and has focused his career on representing injured clients in personal injury matters.</p>
          <p>He earned a B.A. in Political Science from UCLA in 1986 and a J.D. from Loyola Law School in 1991. He is admitted to practice in California and in the United States District Courts for the Central and Southern Districts of California.</p>
          <p>Kyle has operated his own firm since 2003. His work includes vehicle crashes, premises liability, dog bites, traumatic brain injuries, medical malpractice, sexual abuse and harassment, institutional liability, and other serious injury claims. He is a member of the Consumer Attorneys of Los Angeles.</p>
          <div className="attorney-credentials" aria-label="Kyle Scott education and professional credentials">
            <article><BookOpen aria-hidden="true" /><span><strong>UCLA</strong><small>B.A., Political Science · 1986</small></span></article>
            <article><BookOpen aria-hidden="true" /><span><strong>Loyola Law School</strong><small>J.D. · 1991</small></span></article>
            <article><Scale aria-hidden="true" /><span><strong>State Bar of California</strong><small>Active · Admitted 1991</small></span></article>
            <article><BriefcaseBusiness aria-hidden="true" /><span><strong>Kyle Scott Law</strong><small>Firm owner since 2003</small></span></article>
          </div>
          <div className="lead-attorney-links">
            <a className="light-link" href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/155434">View State Bar profile <ArrowRight aria-hidden="true" /></a>
            <Link className="light-link" href="/results">Review case results <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="team-roster" aria-labelledby="roster-title">
        <div className="team-roster-heading">
          <h2 id="roster-title">Our team.</h2>
        </div>
        <div className="team-roster-grid">
          {teamMembers.map((member) => (
            <article className="team-member-card" key={member.name}>
              <div className={`team-member-photo ${member.className}`}><Image src={member.image} alt={`${member.name}, ${member.role} at Kyle Scott Law`} width={600} height={900} loading="lazy" /></div>
              <div className="team-member-copy"><span>{member.role}</span><h3>{member.name}</h3></div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
