import type { Metadata } from 'next';
import { newsArticleLocalizedRoutes } from '@/lib/marketing/data/newsArticles';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { legalGuideLocalizedRoutes } from '@/lib/marketing/data/spanishLegalGuides';
import { serviceAreaLocalizedRoutes } from '@/lib/marketing/data/spanishServiceAreas';
import { SITE_URL } from '@/lib/marketing/site';

export type SiteLocale = 'en' | 'es';

export const localeTags: Record<SiteLocale, string> = {
  en: 'en-US',
  es: 'es-US',
};

export const localizedRoutes = [
  { en: '/', es: '/es' },
  { en: '/practice-areas', es: '/es/areas-de-practica' },
  { en: '/results', es: '/es/resultados' },
  { en: '/meet-the-team', es: '/es/equipo' },
  { en: '/testimonials', es: '/es/testimonios' },
  { en: '/news', es: '/es/noticias' },
  { en: '/contact', es: '/es/contacto' },
  { en: '/privacy', es: '/es/privacidad' },
  { en: '/disclaimer', es: '/es/aviso-legal' },
  { en: '/accessibility', es: '/es/accesibilidad' },
  { en: '/terms', es: '/es/terminos' },
  {
    en: '/personal-injury-lawyer-orange-county',
    es: '/es/abogado-de-lesiones-personales-condado-de-orange',
  },
  {
    en: '/orange-county-auto-accidents-lawyer',
    es: '/es/abogado-de-accidentes-de-auto-condado-de-orange',
  },
  {
    en: '/orange-county-slip-and-fall-attorney',
    es: '/es/abogado-de-resbalones-y-caidas-condado-de-orange',
  },
  {
    en: '/orange-county-medical-malpractice-attorney',
    es: '/es/abogado-de-negligencia-medica-condado-de-orange',
  },
  {
    en: '/orange-county-elder-abuse-attorney',
    es: '/es/abogado-de-abuso-de-personas-mayores-condado-de-orange',
  },
  {
    en: '/dog-bite-attorney-in-orange-county',
    es: '/es/abogado-de-mordeduras-de-perro-condado-de-orange',
  },
  {
    en: '/orange-county-traumatic-brain-injury-attorney',
    es: '/es/abogado-de-lesion-cerebral-traumatica-condado-de-orange',
  },
  {
    en: '/sexual-harassment-lawyer-in-orange-county',
    es: '/es/abogado-de-acoso-y-abuso-sexual-condado-de-orange',
  },
  {
    en: '/orange-county-wrongful-death-attorney',
    es: '/es/abogado-de-muerte-injusta-condado-de-orange',
  },
  {
    en: '/orange-county-school-liability-attorney',
    es: '/es/abogado-de-responsabilidad-escolar-condado-de-orange',
  },
  {
    en: '/orange-county-motorcycle-accident-attorney',
    es: '/es/abogado-de-accidentes-de-motocicleta-condado-de-orange',
  },
  {
    en: '/orange-county-truck-accident-attorney',
    es: '/es/abogado-de-accidentes-de-camion-condado-de-orange',
  },
  {
    en: '/orange-county-pedestrian-accident-attorney',
    es: '/es/abogado-de-accidentes-de-peatones-condado-de-orange',
  },
  {
    en: '/orange-county-rideshare-accident-attorney',
    es: '/es/abogado-de-accidentes-de-uber-y-lyft-condado-de-orange',
  },
  { en: '/why-hire-us', es: '/es/por-que-elegirnos' },
  ...newsArticleLocalizedRoutes,
  ...legalGuideLocalizedRoutes,
  ...serviceAreaLocalizedRoutes(Object.fromEntries(serviceAreas.map((area) => [area.key, area.path]))),
] as const;

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

export function localeFromPath(pathname: string): SiteLocale {
  return normalizePath(pathname).startsWith('/es') ? 'es' : 'en';
}

export function routeForLocale(pathname: string, locale: SiteLocale) {
  const normalized = normalizePath(pathname);
  const match = localizedRoutes.find(
    (route) => route.en === normalized || route.es === normalized,
  );
  if (match) return match[locale];
  if (
    locale === 'es' &&
    (normalized.startsWith('/news/') ||
      /^\/\d{4}\/\d{2}\/\d{2}\//.test(normalized))
  )
    return '/es/noticias';
  if (locale === 'en' && normalized.startsWith('/es/noticias/')) return '/news';
  // A guide with no translation leads to the other language's guide library.
  if (locale === 'es' && normalized.startsWith('/guides/')) return '/es/guias';
  if (locale === 'en' && normalized.startsWith('/es/guias/')) return '/guides';
  return locale === 'es' ? '/es' : '/';
}

export function localizedAlternates(pathname: string): Metadata['alternates'] {
  const normalized = normalizePath(pathname);
  const match = localizedRoutes.find(
    (route) => route.en === normalized || route.es === normalized,
  );
  const canonical = `${SITE_URL}${normalized === '/' ? '' : normalized}`;
  // English-only pages (service areas, guides not yet translated) must not
  // claim a Spanish alternate they do not have; they point hreflang at themselves.
  if (!match) {
    return { canonical, languages: { 'en-US': canonical, 'x-default': canonical } };
  }
  return {
    canonical,
    languages: {
      'en-US': `${SITE_URL}${match.en === '/' ? '' : match.en}`,
      'es-US': `${SITE_URL}${match.es}`,
      'x-default': `${SITE_URL}${match.en === '/' ? '' : match.en}`,
    },
  };
}
