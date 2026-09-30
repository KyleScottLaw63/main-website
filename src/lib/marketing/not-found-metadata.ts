import type { Metadata } from 'next';
import type { SiteLocale } from '@/lib/marketing/i18n';

/**
 * Head tags for a /news, /guides, or /es/noticias address whose slug matches nothing. The page
 * then calls notFound(), and Next adds its own `<meta name="robots" content="noindex">`. Without
 * this, the page inherited the site layout's metadata: the home page's title, description and
 * canonical link, and a second robots tag saying "index, follow". The title matches the global 404
 * (src/app/global-not-found.tsx); `robots: null` leaves Next's noindex as the only robots tag
 * (docs/public-site-rendering.md).
 */
export function missingPageMetadata(locale: SiteLocale): Metadata {
  return {
    title: locale === 'es' ? 'Página no encontrada | Kyle Scott Law' : 'Page not found | Kyle Scott Law',
    description: null,
    robots: null,
    alternates: null,
  };
}
