import { type NextRequest } from 'next/server';
import { siteProxy } from '@/lib/site-proxy';

/** Next 16 proxy (formerly middleware): gone paths, trailing slashes, the 404's language. */
export default function proxy(request: NextRequest) {
  return siteProxy(request);
}

export const config = {
  matcher: [
    /* Everything except static assets and SEO files. */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)',
  ],
};
