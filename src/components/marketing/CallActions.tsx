import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import type { SiteLocale } from '@/lib/marketing/i18n';

/**
 * Ways to reach the firm that stay in view (docs/public-site-rendering.md, "Calls to action").
 * Every phone link is tap-to-call (`tel:+17145441460`), and the analytics script counts each tap as
 * a `phone_call` event (docs/website-analytics.md).
 */
const copy = {
  en: {
    call: 'Call 714-544-1460',
    review: 'Free case review',
    contactPath: '/contact#case-review',
    barLabel: 'Call or contact Kyle Scott Law',
  },
  es: {
    call: 'Llame al 714-544-1460',
    review: 'Consulta gratuita',
    contactPath: '/es/contacto#revision-del-caso',
    barLabel: 'Llame o contacte a Kyle Scott Law',
  },
} satisfies Record<SiteLocale, unknown>;

/** Call and case-review buttons under a page's heading, on the dark hero of practice and city pages. */
export function HeroCallActions({ locale = 'en' }: { locale?: SiteLocale }) {
  const text = copy[locale];
  return (
    <div className="hero-call-actions">
      <a className="hero-call-button" href="tel:+17145441460"><Phone aria-hidden="true" />{text.call}</a>
      <Link className="light-link" href={text.contactPath}>{text.review} <ArrowRight aria-hidden="true" /></Link>
    </div>
  );
}

/** A bar fixed to the bottom of the screen on phones and small tablets, on every page (rendered by the footer). */
export function MobileCallBar({ locale = 'en' }: { locale?: SiteLocale }) {
  const text = copy[locale];
  return (
    <div className="mobile-call-bar" role="region" aria-label={text.barLabel}>
      <a className="mobile-call-bar-call" href="tel:+17145441460"><Phone aria-hidden="true" /><span>{text.call}</span></a>
      <Link className="mobile-call-bar-review" href={text.contactPath}>{text.review}</Link>
    </div>
  );
}
