import Image from 'next/image';
import { Phone } from 'lucide-react';
import { LanguageSwitcher } from '@/components/marketing/LanguageSwitcher';
import { MobileNav } from '@/components/marketing/MobileNav';
import type { SiteLocale } from '@/lib/marketing/i18n';

const navigation = {
  en: [
    ['Practice Areas', '/practice-areas'],
    ['Results', '/results'],
    ['Meet The Team', '/meet-the-team'],
    ['Testimonials', '/testimonials'],
    ['Legal Guides', '/guides'],
    ['Latest News', '/news'],
    ['Contact', '/contact'],
  ],
  es: [
    ['Áreas de práctica', '/es/areas-de-practica'],
    ['Resultados', '/es/resultados'],
    ['El equipo', '/es/equipo'],
    ['Testimonios', '/es/testimonios'],
    ['Guías legales', '/es/guias'],
    ['Noticias', '/es/noticias'],
    ['Contacto', '/es/contacto'],
  ],
};

export function SiteHeader({ locale = 'en' }: { locale?: SiteLocale }) {
  const spanish = locale === 'es';
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href={spanish ? '/es' : '/'} aria-label={spanish ? 'Inicio de Kyle Scott Law' : 'Kyle Scott Law home'}><Image src="/kjs-logo.jpeg" alt="Kyle Scott Law" width={170} height={120} loading="eager" /></a>
        <nav aria-label={spanish ? 'Navegación principal' : 'Primary navigation'}>
          {navigation[locale].map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          {/* Most people call: the header button dials; the hero keeps "Start a free consultation". */}
          <a className="primary-button header-cta" href="tel:+17145441460"><Phone aria-hidden="true" />{spanish ? 'Llame al 714-544-1460' : 'Call 714-544-1460'}</a>
          <LanguageSwitcher compact />
          <a className="mobile-header-phone" href="tel:+17145441460" aria-label={spanish ? 'Llame a Kyle Scott Law al 714-544-1460' : 'Call Kyle Scott Law at 714-544-1460'}><Phone aria-hidden="true" /></a>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
