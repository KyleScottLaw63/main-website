// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({ Geist: () => ({ variable: 'font-geist' }) }));

import { metadata as englishNotFound } from '@/app/(site)/not-found';
import { generateMetadata as guideMetadata } from '@/app/(site)/guides/[slug]/page';
import { generateMetadata as newsMetadata } from '@/app/(site)/news/[slug]/page';
import { metadata as spanishNotFound } from '@/app/(site-es)/not-found';
import { generateMetadata as spanishNewsMetadata } from '@/app/(site-es)/es/noticias/[slug]/page';

/**
 * An unknown /news, /guides, or /es/noticias slug is a 404 with the not-found title and one robots
 * tag, Next's own noindex (docs/public-site-rendering.md). Next builds that page's head from the
 * layouts plus the not-found file, so the not-found files carry the metadata; the pages' own
 * generateMetadata returns the same for an unknown slug.
 */

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });
const ENGLISH = { title: 'Page not found | Kyle Scott Law', description: null, robots: null, alternates: null };
const SPANISH = { title: 'Página no encontrada | Kyle Scott Law', description: null, robots: null, alternates: null };

describe('a missing article or guide', () => {
  it('the not-found files replace the layout’s title, description, canonical link, and robots tag', () => {
    expect(englishNotFound).toEqual(ENGLISH);
    expect(spanishNotFound).toEqual(SPANISH);
  });

  it('the pages return the same metadata for a slug that matches nothing', async () => {
    expect(await newsMetadata(params('no-such-article'))).toEqual(ENGLISH);
    expect(await guideMetadata(params('no-such-guide'))).toEqual(ENGLISH);
    expect(await spanishNewsMetadata(params('no-existe'))).toEqual(SPANISH);
  });

  it('a real article keeps its own title and, unless withheld, no robots override', async () => {
    const article = await newsMetadata(params('punitive-damages-drunk-driver'));
    expect(article.title).toBe('Punitive damages after an injury caused by a drunk driver | Kyle Scott Law');
    expect(article.robots).toBeUndefined();
    const guide = await guideMetadata(params('government-injury-claim-orange-county'));
    expect(guide.title).toBe('Orange County Government Claim Deadline: The Six-Month Rule, Explained');
  });
});
