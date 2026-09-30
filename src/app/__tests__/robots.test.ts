// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

/**
 * robots.txt admits search engines only on https://kjslaw.com itself, decided by the request's
 * host (app/robots.ts): a vercel.app deployment, a preview, or localhost is never indexed, and
 * pointing the domain at the deployment needs no setting changed.
 */

const request = vi.hoisted(() => ({ host: null as string | null }));
vi.mock('next/headers', () => ({
  headers: async () => new Headers(request.host ? { host: request.host } : {}),
}));

const { default: robots } = await import('../robots');

describe('robots.txt', () => {
  it('on kjslaw.com: crawl everything but the API, with the sitemap', async () => {
    for (const host of ['kjslaw.com', 'KJSLAW.COM']) {
      request.host = host;
      expect(await robots()).toEqual({
        rules: { userAgent: '*', allow: '/', disallow: '/api/' },
        sitemap: 'https://kjslaw.com/sitemap.xml',
        host: 'https://kjslaw.com',
      });
    }
  });

  it('anywhere else: disallow everything', async () => {
    for (const host of ['kjslaw-website.vercel.app', 'kjslaw-website-git-main-fictional.vercel.app', 'www.kjslaw.com', 'localhost:3012', 'kjslaw.com.attacker.example', null]) {
      request.host = host;
      expect(await robots(), String(host)).toEqual({ rules: { userAgent: '*', disallow: '/' } });
    }
  });
});
