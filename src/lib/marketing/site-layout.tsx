import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { RoutePrefetch } from '@/components/marketing/RoutePrefetch';
import { StructuredData } from '@/components/marketing/StructuredData';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { firmIdentity, SITE_URL } from '@/lib/marketing/site';
import { attorneyEntityId } from '@/lib/marketing/structured-data';

/**
 * Shared root-layout pieces for the public website. The English and Spanish
 * trees are separate root layouts (route groups `(site)` and `(site-es)`) so
 * neither needs request headers to know its language — that keeps every
 * marketing page statically rendered and cacheable, which is what lets the
 * browser's back/forward cache work.
 */

export type SiteLanguage = 'en-US' | 'es-US';

/** Browser chrome colour on phones; matches the manifest and the brand navy. */
export const siteViewport: Viewport = { themeColor: '#063675', colorScheme: 'light' };

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });

function shareImage(spanish: boolean) {
  return {
    url: spanish ? '/og-default-es.jpg' : '/og-default.jpg',
    width: 1200,
    height: 630,
    alt: spanish
      ? 'Kyle Scott Law — abogados de lesiones personales en el Condado de Orange'
      : 'Kyle Scott Law — Orange County personal injury attorneys',
  };
}

// Pages inherit this share card unless they define their own openGraph
// (guides and news articles do). Titles and descriptions stay per page.
export function siteMetadata(language: SiteLanguage): Metadata {
  const spanish = language === 'es-US';
  const image = shareImage(spanish);
  return {
    metadataBase: new URL(SITE_URL),
    title: spanish
      ? 'Abogado de Lesiones Personales en el Condado de Orange | Kyle Scott Law'
      : 'Orange County Personal Injury Lawyer | Kyle Scott Law',
    description: spanish
      ? 'El abogado de lesiones personales Kyle Scott, en Tustin, representa a clientes del Condado de Orange en accidentes de auto, caídas, mordeduras de perro, negligencia médica, lesiones cerebrales, abuso y muerte injusta.'
      : 'Tustin personal injury lawyer Kyle Scott represents Orange County clients in auto accidents, falls, dog bites, malpractice, brain injury, abuse and wrongful death claims.',
    applicationName: 'Kyle Scott Law',
    referrer: 'origin-when-cross-origin',
    robots: { index: true, follow: true },
    alternates: localizedAlternates(spanish ? '/es' : '/'),
    openGraph: {
      type: 'website',
      siteName: 'Kyle Scott Law',
      locale: spanish ? 'es_US' : 'en_US',
      images: [image],
    },
    twitter: { card: 'summary_large_image', images: [image.url] },
  };
}

function legalServiceSchema(language: SiteLanguage) {
  const spanish = language === 'es-US';
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${SITE_URL}/#legal-service`,
    name: firmIdentity.name,
    url: spanish ? `${SITE_URL}/es` : SITE_URL,
    logo: `${SITE_URL}/kjs-logo.jpeg`,
    image: `${SITE_URL}/kyle-scott-original.webp`,
    telephone: firmIdentity.telephone,
    email: firmIdentity.email,
    inLanguage: language,
    priceRange: noRecoveryTerms[spanish ? 'es' : 'en'].priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: firmIdentity.streetAddress,
      addressLocality: firmIdentity.addressLocality,
      addressRegion: firmIdentity.addressRegion,
      postalCode: firmIdentity.postalCode,
      addressCountry: firmIdentity.country,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Orange County, California' },
      { '@type': 'State', name: 'California' },
    ],
    founder: {
      '@type': 'Person',
      '@id': attorneyEntityId(spanish ? 'es' : 'en'),
      name: 'Kyle J. Scott',
      jobTitle: spanish ? 'Fundador y abogado litigante' : 'Founder and Trial Attorney',
      url: spanish ? `${SITE_URL}/es/equipo` : `${SITE_URL}/meet-the-team`,
    },
  };
}

export function SiteRootLayout({ language, children }: { language: SiteLanguage; children: React.ReactNode }) {
  return (
    <html lang={language}>
      <body className={geist.variable}>
        <StructuredData data={legalServiceSchema(language)} />
        {children}
        <RoutePrefetch />
      </body>
    </html>
  );
}
