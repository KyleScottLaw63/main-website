import Link from "next/link";
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  BadgeDollarSign,
  Brain,
  BriefcaseMedical,
  CarFront,
  Dog,
  HeartHandshake,
  FileSearch,
  MapPin,
  MessageSquareText,
  Phone,
  Scale,
  ShieldCheck,
  Star,
  UserRoundCheck,
} from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { ConsultationForm } from '@/components/marketing/ConsultationForm';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';

const terms = noRecoveryTerms.en;

const recoveries = [
  {
    amount: '$6.8M',
    type: 'School district negligence',
    title: 'Elementary school boys molested by a teacher',
    meta: 'Confidential • Largest molestation settlement at the time',
    date: '2004',
    href: '/results',
    cta: 'View in results',
  },
  {
    amount: '$5.75M',
    type: 'Jury verdict',
    title: 'Student suffers skull fracture and brain bleed',
    meta: 'Two-week jury trial • Los Angeles Superior Court',
    date: '2019',
    href: '/results/student-skull-fracture-verdict',
    cta: 'Read the case story',
  },
  {
    amount: '$2.2M',
    type: 'Confidential settlement',
    title: 'Sexual molestation and sexual battery lawsuit',
    meta: 'Details confidential',
    date: 'December 26, 2024',
    href: '/news/sexual-molestation-battery-settlement-2-2-million',
    cta: 'Read case',
  },
];

const practiceAreas = [
  { title: 'Personal Injury', copy: 'Serious injury and negligence claims', icon: ShieldCheck, href: '/personal-injury-lawyer-orange-county' },
  { title: 'Car Accidents', copy: 'Auto, truck, and rideshare crashes', icon: CarFront, href: '/orange-county-auto-accidents-lawyer' },
  { title: 'Slip & Fall', copy: 'Unsafe property and premises claims', icon: UserRoundCheck, href: '/orange-county-slip-and-fall-attorney' },
  { title: 'Medical Malpractice', copy: 'Injury caused by negligent care', icon: BriefcaseMedical, href: '/orange-county-medical-malpractice-attorney' },
  { title: 'Dog Bites', copy: 'Attacks and preventable animal injuries', icon: Dog, href: '/dog-bite-attorney-in-orange-county' },
  { title: 'Traumatic Brain Injury', copy: 'Concussion and life-changing trauma', icon: Brain, href: '/orange-county-traumatic-brain-injury-attorney' },
  { title: 'Sexual Harassment', copy: 'Abuse, assault, and workplace claims', icon: HeartHandshake, href: '/sexual-harassment-lawyer-in-orange-county' },
  { title: 'Wrongful Death', copy: 'Fatal negligence and family claims', icon: Scale, href: '/orange-county-wrongful-death-attorney' },
];

const newsItems = [
  {
    category: 'Confidential settlement',
    accent: '$2.2M',
    title: 'Sexual molestation and sexual battery lawsuit resolved for $2.2 million',
    excerpt: 'Kyle Scott Law discusses its work supporting survivors through confidential claims and the path toward recovery.',
    date: 'December 26, 2024',
    href: '/news/sexual-molestation-battery-settlement-2-2-million',
  },
  {
    category: 'Jury verdict',
    accent: '$5.75M',
    title: 'Student suffers skull fracture and brain bleed',
    excerpt: 'A kindergartner fractured his skull in a PE sprint drill. After a two-week trial in Los Angeles Superior Court, the jury returned a $5.75 million verdict.',
    date: '2019',
    href: '/results/student-skull-fracture-verdict',
  },
  {
    category: 'Appellate victory',
    accent: 'New trial',
    title: 'Court of Appeal victory protects a client’s right to present damages evidence',
    excerpt: 'Kyle Scott Law and appellate counsel secured reversal and a new trial after critical damages evidence was excluded.',
    date: 'June 9, 2019',
    href: '/news/court-of-appeal-new-trial',
  },
];

export default function Home() {
  return (
    <main>
      <section className="opening" aria-labelledby="home-title">
        <SiteHeader />

        <div className="hero" id="top">
          <div className="hero-copy">
            <h1 id="home-title">Orange County Personal Injury Lawyer</h1>
            <span className="headline-rule" aria-hidden="true" />
            <p className="hero-thesis">30+ years helping clients get the justice they deserve.</p>
            <p className="hero-description">From its Tustin office, Kyle Scott Law represents people injured in auto accidents, falls, dog bites, medical malpractice, brain injury, and abuse cases.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#consultation">Start a free consultation <ArrowRight aria-hidden="true" size={17} /></a>
              <a className="text-link" href="#results">View case results <ArrowRight aria-hidden="true" size={17} /></a>
            </div>
            <p className="no-fee-note">{terms.statement}.</p>
            <a className="hero-review-badge" href="https://www.google.com/maps/search/?api=1&query=Kyle+Scott+Law+17671+Irvine+Blvd+Tustin+CA">
              <span className="google-mark" aria-hidden="true">G</span>
              <span><strong>5.0 Google rating</strong><small><span className="stars" role="img" aria-label="Five stars"><Star /><Star /><Star /><Star /><Star /></span>View client reviews</small></span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="hero-media" aria-label="Kyle Scott and the Kyle Scott Law team">
            <Image src="/kjs-team.jpg" alt="Kyle Scott with the Kyle Scott Law team in Tustin" width={900} height={600} priority fetchPriority="high" quality={90} sizes="(max-width: 1023px) 94vw, 57vw" />
            <div className="photo-caption">Kyle Scott and the KJS Law team</div>
          </div>

          <div className="trust-rail" aria-label="Firm highlights">
            <div className="trust-item"><span className="trust-icon"><Award aria-hidden="true" /></span><span><strong>30+ years</strong><small>Personal injury trial experience</small></span></div>
            <div className="trust-item"><span className="trust-icon"><BadgeDollarSign aria-hidden="true" /></span><span><strong>$50+ million recovered</strong><small>Published verdicts &amp; settlements</small></span></div>
            <div className="trust-item"><span className="trust-icon"><Scale aria-hidden="true" /></span><span><strong>No fee</strong><small>Unless there is a recovery</small></span></div>
          </div>
        </div>

        <section className="recovery-rail" id="results" aria-labelledby="recovery-title">
          <div className="recovery-heading"><p className="eyebrow" id="recovery-title">Selected published recoveries</p><Link href="/results">View all results <ArrowRight aria-hidden="true" size={15} /></Link></div>
          <div className="recovery-grid">
            {recoveries.map((recovery) => (
              <article className="recovery-card" key={recovery.href}>
                <div className="recovery-card-top"><span>{recovery.type}</span><span>{recovery.date}</span></div>
                <div className="recovery-card-body"><strong>{recovery.amount}</strong><h2>{recovery.title}</h2><p>{recovery.meta}</p></div>
                <a className="recovery-read-link" href={recovery.href}>{recovery.cta} <ArrowRight aria-hidden="true" /></a>
              </article>
            ))}
          </div>
          <p className="results-disclaimer">Prior results do not guarantee a similar outcome.</p>
        </section>
      </section>

      <section className="section practice-section" id="practice-areas" aria-labelledby="practice-title">
        <div className="section-heading practice-heading">
          <div><p className="eyebrow">Practice areas</p><h2 id="practice-title">Personal injury cases we handle.</h2></div>
        </div>
        <div className="practice-grid">
          {practiceAreas.map((area) => {
            const Icon = area.icon;
              return <a className="practice-card" href={area.href} key={area.title}><span className="practice-icon"><Icon aria-hidden="true" /></span><span><strong>{area.title}</strong><small>{area.copy}</small></span><ArrowRight className="card-arrow" aria-hidden="true" /></a>;
          })}
        </div>
        <div className="practice-footer"><ShieldCheck aria-hidden="true" /><p><strong>No pressure. No generic intake line.</strong> Your consultation request goes directly into the firm’s private case-review system.</p></div>
      </section>

      <section className="firm-section" id="meet-the-team" aria-labelledby="firm-title">
        <div className="firm-intro">
          <div className="firm-photo"><Image src="/kyle-scott.jpg" alt="Trial attorney Kyle Scott" width={600} height={900} loading="lazy" sizes="(max-width: 1023px) 94vw, 520px" /><span>Trial attorney Kyle J. Scott</span></div>
          <div className="firm-copy">
            <h2 id="firm-title" className="firm-heading">About Us</h2>
            <p className="firm-lead">Kyle Scott Law helps injured clients pursue the full compensation available for their injuries and losses. The firm represents people involved in <Link href="/orange-county-auto-accidents-lawyer">auto and truck accidents</Link>, Uber and Lyft collisions, <Link href="/orange-county-slip-and-fall-attorney">slip-and-fall and trip-and-fall incidents</Link>, <Link href="/dog-bite-attorney-in-orange-county">dog bites</Link>, product-liability matters, <Link href="/orange-county-wrongful-death-attorney">wrongful-death claims</Link>, and <Link href="/orange-county-traumatic-brain-injury-attorney">traumatic brain injuries</Link>.</p>
            <p className="firm-experience">The practice also includes <Link href="/orange-county-medical-malpractice-attorney">medical malpractice</Link>, clergy and legal malpractice, school and institutional liability, <Link href="/sexual-harassment-lawyer-in-orange-county">sexual molestation and abuse, assault and battery, workplace sexual harassment</Link>, wrongful termination, and other employment-based discrimination.</p>
            <p className="firm-experience">From the Tustin office, the firm reviews the facts, identifies the people, businesses, professionals, or institutions that may be responsible, documents the resulting injuries and losses, and explains the available legal options. For more than 30 years, Kyle J. Scott has represented injured people and families throughout Orange County and California.</p>
            <div className="firm-actions">
              <Link className="primary-button firm-team-button" href="/meet-the-team">Meet the full team <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section process-section" id="process" aria-labelledby="process-title">
        <div className="case-path-shell">
          <div className="case-path-intro">
            <p className="eyebrow">What to expect</p>
            <h2 id="process-title">How your case moves forward.</h2>
            <p>Getting started takes one phone call or one short form. From there, the firm carries the case—the paperwork, the deadlines, the insurance calls—and keeps you informed at every step, in plain English.</p>
            <Link className="primary-button" href="/contact#case-review">Request a free case review <ArrowRight aria-hidden="true" /></Link>
            <p className="case-path-call">Prefer to talk it through? Call <a href="tel:+17145441460">714-544-1460</a>.</p>
            <div className="case-path-assurance"><ShieldCheck aria-hidden="true" /><span><strong>{terms.statement}.</strong><small>The free consultation creates no obligation and no attorney-client relationship.</small></span></div>
            <div className="case-path-assurance"><BadgeDollarSign aria-hidden="true" /><span><strong>The firm advances every case cost.</strong><small>Investigation, records, experts, filings—paid by the firm while the case is active and recovered from the result. Nothing comes out of your pocket up front.</small></span></div>
          </div>
          <ol className="case-path-steps">
            <li>
              <span className="case-path-number">01</span>
              <span className="case-path-icon"><MessageSquareText aria-hidden="true" /></span>
              <div><h3>Free case review</h3><p>Call <a href="tel:+17145441460">714-544-1460</a> or send the secure form—whichever is easier. Share the basic facts of what happened; no documents are needed yet, and there is no cost and no obligation.</p></div>
            </li>
            <li>
              <span className="case-path-number">02</span>
              <span className="case-path-icon"><FileSearch aria-hidden="true" /></span>
              <div><h3>Answers from a trial attorney</h3><p>Your case is reviewed by a trial attorney with more than 30 years of California experience—not a call center. You get straight answers about responsibility, deadlines, and the options worth pursuing.</p></div>
            </li>
            <li>
              <span className="case-path-number">03</span>
              <span className="case-path-icon"><ShieldCheck aria-hidden="true" /></span>
              <div><h3>The firm handles everything</h3><p>If the firm takes your case, the team gathers the evidence and medical records, takes over every insurer call and letter, and builds your claim—while you put your energy into recovery, not paperwork.</p></div>
            </li>
            <li>
              <span className="case-path-number">04</span>
              <span className="case-path-icon"><Scale aria-hidden="true" /></span>
              <div><h3>Negotiation or trial</h3><p>Every claim is prepared as if it is going to trial—insurers treat a case differently when the firm behind it is ready for court. If a fair settlement is not offered, the firm is prepared to try your case.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section news-section" id="news" aria-labelledby="news-title">
        <div className="news-heading">
          <div><p className="eyebrow">Latest from KJS Law</p><h2 id="news-title">Results, stories, and firm updates.</h2></div>
          <p>Read published case outcomes and legal developments from Kyle Scott Law. Every featured item opens its full page on this website.</p>
        </div>
        <div className="news-grid">
          {newsItems.map((item, index) => (
            <article className={index === 0 ? 'news-card news-card-featured' : 'news-card'} key={item.href}>
              <div className="news-card-meta"><span>{item.category}</span><time>{item.date}</time></div>
              <strong className="news-accent">{item.accent}</strong>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <a href={item.href}>Read the story <ArrowRight aria-hidden="true" /></a>
            </article>
          ))}
        </div>
        <Link className="news-archive-link" href="/news">View all news &amp; articles <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="consultation-section" id="consultation" aria-labelledby="consultation-title">
        <div className="consultation-copy">
          <p className="eyebrow">Free consultation</p><h2 id="consultation-title">Start with a free consultation.</h2><p>Tell the firm what happened and how to reach you. No fee is charged unless there is a recovery.</p>
          <div className="contact-card"><Phone aria-hidden="true" /><span><small>Call the firm directly</small><a href="tel:+17145441460">714-544-1460</a></span></div>
          <div className="contact-card"><MapPin aria-hidden="true" /><span><small>Tustin office</small><strong>17671 Irvine Blvd., Suite 210<br />Tustin, CA 92780</strong></span></div>
        </div>
        <ConsultationForm />
      </section>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
