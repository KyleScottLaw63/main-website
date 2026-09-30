import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { headers } from 'next/headers';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { NotFoundContent } from '@/components/marketing/NotFoundContent';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import './(site)/globals.css';

// Global 404 for URLs that match no route (experimental.globalNotFound). The
// site has two root layouts (English and /es), so this file renders its own
// document, in the language the proxy (src/lib/site-proxy.ts) reports.
const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });

/** The proxy marks /es and paths under /es/ as Spanish (x-site-locale); everything else is English. */
async function siteLanguage() {
  return (await headers()).get('x-site-locale') === 'es-US' ? 'es-US' : 'en-US';
}

// The browser tab and search result title follow the page's language, like the page itself.
// No robots entry: Next adds <meta name="robots" content="noindex"> to every 404 itself, and a second
// tag here ("noindex, nofollow") made two (docs/public-site-rendering.md).
export async function generateMetadata(): Promise<Metadata> {
  const spanish = (await siteLanguage()) === 'es-US';
  return {
    title: spanish ? 'Página no encontrada | Kyle Scott Law' : 'Page not found | Kyle Scott Law',
    robots: null,
  };
}

export default async function GlobalNotFound() {
  const language = await siteLanguage();
  const locale = language === 'es-US' ? 'es' : 'en';
  return (
    <html lang={language}>
      <body className={geist.variable}>
        <main className="not-found-page">
          <SiteHeader locale={locale} />
          <NotFoundContent locale={locale} />
          <SiteFooter locale={locale} />
          <ChatWidget locale={locale} />
        </main>
      </body>
    </html>
  );
}
