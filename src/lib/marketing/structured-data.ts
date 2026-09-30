import { localeTags, type SiteLocale } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';

const attorneyRoutes: Record<SiteLocale, string> = {
  en: '/meet-the-team',
  es: '/es/equipo',
};

const newsRoutes: Record<SiteLocale, string> = {
  en: '/news',
  es: '/es/noticias',
};

export type NewsCollectionItem = {
  type: 'NewsArticle' | 'Article';
  title: string;
  description: string;
  datePublished: string;
  url: string;
  sourceUrl: string;
};

export function attorneyEntityId(locale: SiteLocale) {
  return `${SITE_URL}${attorneyRoutes[locale]}#kyle-scott`;
}

export function attorneyProfileStructuredData(locale: SiteLocale) {
  const spanish = locale === 'es';
  const route = attorneyRoutes[locale];
  const pageUrl = `${SITE_URL}${route}`;
  const personId = attorneyEntityId(locale);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profile-page`,
        url: pageUrl,
        name: spanish
          ? 'Kyle J. Scott | Fundador y abogado litigante'
          : 'Kyle J. Scott | Founder and Trial Attorney',
        description: spanish
          ? 'Perfil profesional de Kyle J. Scott, fundador y abogado litigante de Kyle Scott Law en Tustin, California.'
          : 'Professional profile of Kyle J. Scott, founder and trial attorney at Kyle Scott Law in Tustin, California.',
        inLanguage: localeTags[locale],
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Kyle J. Scott',
        givenName: 'Kyle',
        additionalName: 'J.',
        familyName: 'Scott',
        jobTitle: spanish ? 'Fundador y abogado litigante' : 'Founder and Trial Attorney',
        description: spanish
          ? 'Kyle J. Scott ejerce la abogacía en California desde 1991 y representa a clientes lesionados en asuntos de lesiones personales.'
          : 'Kyle J. Scott has practiced law in California since 1991 and represents injured clients in personal injury matters.',
        url: pageUrl,
        image: `${SITE_URL}/kyle-scott-original.webp`,
        worksFor: { '@id': `${SITE_URL}/#legal-service` },
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'UCLA' },
          { '@type': 'CollegeOrUniversity', name: 'Loyola Law School' },
        ],
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'State Bar of California attorney number',
          value: '155434',
        },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: spanish ? 'Licencia de abogado' : 'Attorney license',
          identifier: '155434',
          recognizedBy: {
            '@type': 'Organization',
            name: 'State Bar of California',
            url: 'https://www.calbar.ca.gov/',
          },
        },
        knowsAbout: spanish
          ? [
              'Lesiones personales',
              'Accidentes vehiculares',
              'Responsabilidad de propiedad',
              'Mordeduras de perro',
              'Lesiones cerebrales traumáticas',
              'Negligencia médica',
              'Abuso y acoso sexual',
              'Responsabilidad institucional',
            ]
          : [
              'Personal injury',
              'Vehicle accidents',
              'Premises liability',
              'Dog bites',
              'Traumatic brain injuries',
              'Medical malpractice',
              'Sexual abuse and harassment',
              'Institutional liability',
            ],
        sameAs: [
          'https://apps.calbar.ca.gov/attorney/Licensee/Detail/155434',
          'https://www.instagram.com/KJS_Law/',
          'https://www.youtube.com/channel/UCfF9jCbtt6aqBOkXnAGJpnw',
          'https://x.com/KyleScottLaw2',
          'https://www.facebook.com/kylescottlaw/',
          'https://www.avvo.com/attorneys/92780-ca-kyle-scott-225782.html',
        ],
      },
    ],
  };
}

export function newsCollectionStructuredData(locale: SiteLocale, items: NewsCollectionItem[]) {
  const spanish = locale === 'es';
  const route = newsRoutes[locale];
  const pageUrl = `${SITE_URL}${route}`;
  const collectionId = `${pageUrl}#collection-page`;
  const itemListId = `${pageUrl}#article-list`;

  const articleEntities = items.map((item) => ({
    '@type': item.type,
    '@id': `${SITE_URL}${item.url}#article`,
    url: `${SITE_URL}${item.url}`,
    headline: item.title,
    abstract: item.description,
    datePublished: item.datePublished,
    inLanguage: localeTags[locale],
    mainEntityOfPage: `${SITE_URL}${item.url}`,
    isPartOf: { '@id': collectionId },
    isBasedOn: item.sourceUrl,
    author: { '@id': attorneyEntityId(locale) },
    publisher: { '@id': `${SITE_URL}/#legal-service` },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': collectionId,
        url: pageUrl,
        name: spanish
          ? 'Noticias del Despacho y Artículos Legales | Kyle Scott Law'
          : 'Firm News & Legal Articles | Kyle Scott Law',
        description: spanish
          ? 'Resultados de casos, noticias del despacho y artículos de Kyle Scott Law sobre asuntos de lesiones personales.'
          : 'Kyle Scott Law case results, firm news, and legal articles concerning personal injury matters.',
        inLanguage: localeTags[locale],
        mainEntity: { '@id': itemListId },
        about: { '@id': `${SITE_URL}/#legal-service` },
      },
      {
        '@type': 'ItemList',
        '@id': itemListId,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: items.length,
        itemListElement: articleEntities.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': article['@id'] },
        })),
      },
      ...articleEntities,
    ],
  };
}
