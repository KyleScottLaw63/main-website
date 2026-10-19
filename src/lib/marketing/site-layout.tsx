import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { RoutePrefetch } from '@/components/marketing/RoutePrefetch';
import { SiteAnalytics } from '@/components/marketing/SiteAnalytics';
import { StructuredData } from '@/components/marketing/StructuredData';
import { practiceAreas } from '@/lib/marketing/data/practiceAreas';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';
import { firmIdentity, SITE_URL } from '@/lib/marketing/site';
import { attorneyEntityId, websiteStructuredData } from '@/lib/marketing/structured-data';

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
    alternateName: 'KJS Law',
    // The plain-language facts an answer engine quotes: what the firm is, who leads it, what it handles, where.
    description: spanish
      ? 'Bufete de lesiones personales en Tustin, California, fundado por el abogado litigante Kyle J. Scott (Colegio de Abogados de California, 1991). Representa a personas lesionadas en accidentes de auto, motocicleta, camión, Uber y Lyft y atropellos, caídas, mordeduras de perro, negligencia médica, abuso de personas mayores, lesiones cerebrales, abuso sexual, negligencia escolar y muerte injusta, en el Condado de Orange y en toda California. Consulta gratuita en español o inglés.'
      : 'Personal injury law firm in Tustin, California, founded by trial attorney Kyle J. Scott (State Bar of California, 1991). Represents people injured in car, motorcycle, truck, rideshare, and pedestrian accidents, falls, dog bites, medical malpractice, elder abuse, brain injury, sexual abuse, school negligence, and wrongful death, in Orange County and throughout California. Free consultation in English or Spanish.',
    foundingDate: '2003',
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
    // The county, each city with its own page, and the state.
    areaServed: [
      { '@type': 'AdministrativeArea', name: spanish ? 'Condado de Orange, California' : 'Orange County, California' },
      ...serviceAreas.map((area) => ({ '@type': 'City', name: `${area.city}, California` })),
      { '@type': 'State', name: 'California' },
    ],
    // The office's location and hours, as the Google Business Profile states them (2026-10-09).
    geo: { '@type': 'GeoCoordinates', latitude: 33.7481961, longitude: -117.8239349 },
    hasMap: 'https://maps.google.com/?q=Kyle+Scott+Law+17671+Irvine+Blvd+Suite+210+Tustin+CA+92780',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:00',
    },
    knowsLanguage: ['en', 'es'],
    // One Service per practice page, in the page's language, so the list of what the firm handles is machine-readable.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: spanish ? 'Áreas de práctica' : 'Practice areas',
      itemListElement: (spanish ? spanishPracticeAreas : practiceAreas).map((area) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: area.shortTitle, description: area.description, url: `${SITE_URL}${area.path}` },
      })),
    },
    // The firm's own profiles elsewhere; the attorney's are on his Person node (structured-data.ts).
    sameAs: [
      'https://www.instagram.com/KJS_Law/',
      'https://www.youtube.com/channel/UCfF9jCbtt6aqBOkXnAGJpnw',
      'https://x.com/KyleScottLaw2',
      'https://www.facebook.com/kylescottlaw/',
      'https://www.avvo.com/attorneys/92780-ca-kyle-scott-225782.html',
      'https://lawyers.justia.com/lawyer/kyle-joseph-scott-1503298',
      'https://apps.calbar.ca.gov/attorney/Licensee/Detail/155434',
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
        <StructuredData data={websiteStructuredData(language === 'es-US' ? 'es' : 'en')} />
        {children}
        <RoutePrefetch />
        <SiteAnalytics />
      </body>
    </html>
  );
}
