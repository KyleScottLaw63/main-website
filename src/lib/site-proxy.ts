import { NextResponse, type NextRequest } from 'next/server';

/**
 * Old kjslaw.com paths that are gone for good: WordPress internals and
 * filler pages with no successor. 410 tells search engines to drop them
 * faster than a 404 would. Everything with a successor is a 301 in
 * next.config.ts (redirect-rules.json / legacyPosts.json).
 */
const GONE = [
  /^\/sample-page\/?$/,
  /^\/top-orange-county-restaurants\/?$/,
  /^\/tustin-californias-best-restaurants\/?$/,
  /^\/orange-county-sports-teams\/?$/,
  /^\/orange-county-history\/?$/,
  /^\/wp-admin(\/|$)/,
  // A file name keeps its trailing slash (see KEEP_TRAILING_SLASH), so both forms are listed.
  /^\/wp-login\.php\/?$/,
  /^\/xmlrpc\.php\/?$/,
  /^\/wp-content(\/|$)/,
  /^\/wp-includes(\/|$)/,
  /^\/wp-json(\/|$)/,
  // The Riverside jury verdict's posts, withdrawn by the firm (2026-10-01): their old and new addresses.
  /^\/2024\/12\/26\/kyle-scott-wins-jury-verdict-in-riverside-superior-court\/?$/,
  /^\/2021\/08\/12\/kyle-scott-law-delivers-justice-475000-slip-fall-settlement\/?$/,
  /^\/news\/riverside-jury-verdict-2-3-million\/?$/,
  /^\/es\/noticias\/veredicto-jurado-riverside-2-3-millones\/?$/,
  /^\/news\/kyle-scott-law-delivers-justice-475000-slip-fall-settlement\/?$/,
];

/**
 * Trailing slashes: canonical URLs have none, and every slashed URL gets there
 * in one hop. next.config.ts sets skipTrailingSlashRedirect, so Next's own 308
 * (/page/ → /page) no longer runs ahead of the old-URL rules — those match
 * /old-page and /old-page/ alike and point straight at the new page — and
 * trailingSlashRedirect() below answers the single 308 for every other page.
 * These are served exactly as requested, slash or not, never redirected: the
 * /api routes, Next's own assets, /.well-known, and file names.
 */
const KEEP_TRAILING_SLASH = [
  /^\/api(\/|$)/,
  /^\/_next(\/|$)/,
  /^\/\.well-known(\/|$)/,
  /\/[^/]+\.\w+\/+$/, // a file name: /robots.txt/, /llms.txt/
];

/** The same URL without its trailing slash (query kept), or null when the path is served as requested. */
export function trailingSlashRedirect(requestUrl: string): URL | null {
  const url = new URL(requestUrl);
  if (url.pathname === '/' || !url.pathname.endsWith('/')) return null;
  if (KEEP_TRAILING_SLASH.some((re) => re.test(url.pathname))) return null;
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  return url;
}

const GONE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page removed | Kyle Scott Law</title><style>body{margin:0;font-family:system-ui,sans-serif;background:#f7f9fc;color:#0b2d5b}main{max-width:560px;margin:14vh auto;padding:0 24px}h1{font-size:28px;margin:0 0 12px}p{font-size:16px;line-height:1.6}a{color:#0759c7;font-weight:700}</style></head><body><main><h1>This page has been removed.</h1><p>It no longer exists on kjslaw.com. Visit the <a href="/">Kyle Scott Law homepage</a> or call 714-544-1460 for a free consultation.</p></main></body></html>`;

/**
 * The website's proxy (src/proxy.ts). No session, cookie, or database work:
 * every page stays static and cacheable (docs/public-site-rendering.md).
 *
 *   1. a gone WordPress path → 410, directly, slash or not;
 *   2. a slashed URL → one 308 to the canonical URL, query kept;
 *   3. otherwise the request goes on with x-site-locale, which the global 404
 *      reads for its language: es-US for /es and paths under /es/ only.
 */
export function siteProxy(request: NextRequest) {
  if (GONE.some((re) => re.test(request.nextUrl.pathname))) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=86400' },
    });
  }

  const canonical = trailingSlashRedirect(request.url);
  if (canonical) return NextResponse.redirect(canonical, 308);

  const headers = new Headers(request.headers);
  headers.set('x-site-locale', /^\/es(\/|$)/.test(request.nextUrl.pathname) ? 'es-US' : 'en-US');
  return NextResponse.next({ request: { headers } });
}
