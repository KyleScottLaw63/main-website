import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { SITE_URL } from '@/lib/marketing/site';

/**
 * Launch gate: search engines are admitted only on the production domain.
 * Any other host serving this build — a *.vercel.app deployment, a preview,
 * localhost — answers "Disallow: /", so a staging copy never competes with
 * kjslaw.com in search results. The host is read per request (robots.txt is
 * the one dynamic metadata route; every page stays static), so pointing the
 * domain at the deployment is the whole cutover — there is no setting to flip
 * and none to forget. www.kjslaw.com must redirect to the apex (Vercel domain
 * settings); served as-is it is treated as a non-production host.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host')?.trim().toLowerCase() ?? '';

  if (host !== new URL(SITE_URL).host) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
