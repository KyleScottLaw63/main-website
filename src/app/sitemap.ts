import type { MetadataRoute } from 'next';
import { caseStories } from '@/lib/marketing/data/caseStories';
import { legacyPostIsIndexable, legacyPosts } from '@/lib/marketing/data/legacyPosts';
import { caseStoryPath } from '@/lib/marketing/data/results';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { localizedRoutes } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';

/**
 * Every URL is built from SITE_URL — the apex https://kjslaw.com, the primary
 * domain (www redirects to it) — never from NEXT_PUBLIC_APP_ORIGIN, so how that
 * setting is written (a trailing slash, a preview host) cannot change the
 * sitemap. robots.txt decides whether crawlers may use it (app/robots.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const localizedEntries = localizedRoutes.flatMap((route) =>
    ([route.en, route.es] as const).map((path, index) => {
      const englishPath = route.en;
      const isHome = englishPath === '/';
      const isPracticeHub = englishPath === '/practice-areas';
      const isPrimaryPractice =
        englishPath === '/personal-injury-lawyer-orange-county';
      const isNewsArticle = englishPath.startsWith('/news/');
      const isUtilityPage = [
        '/privacy',
        '/disclaimer',
        '/accessibility',
      ].includes(englishPath);
      const isPracticePage =
        !isHome &&
        !isNewsArticle &&
        !isUtilityPage &&
        ![
          '/practice-areas',
          '/results',
          '/meet-the-team',
          '/testimonials',
          '/news',
          '/contact',
        ].includes(englishPath);

      return {
        url: `${SITE_URL}${path === '/' ? '' : path}`,
        changeFrequency:
          englishPath === '/news' || isNewsArticle
            ? ('weekly' as const)
            : isUtilityPage
              ? ('yearly' as const)
              : ('monthly' as const),
        priority: isHome
          ? index === 0
            ? 1
            : 0.95
          : isPracticeHub || isPrimaryPractice
            ? 0.9
            : isPracticePage
              ? 0.8
              : isUtilityPage
                ? 0.4
                : 0.7,
      };
    }),
  );

  const serviceAreaEntries = serviceAreas.map((area) => ({
    url: `${SITE_URL}${area.path}`,
    lastModified: '2026-10-06',
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const legacyPostEntries = legacyPosts.filter(legacyPostIsIndexable).map((post) => ({
    url: `${SITE_URL}${post.path}`,
    lastModified: post.modifiedTime,
    changeFrequency: 'yearly' as const,
    priority:
      post.evergreen === 'high'
        ? 0.65
        : post.evergreen === 'medium'
          ? 0.55
          : 0.4,
  }));

  const guideEntries = [
    {
      url: `${SITE_URL}/guides`,
      lastModified: '2026-09-01',
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    ...legalGuides.map((guide) => ({
      url: `${SITE_URL}${guide.path}`,
      lastModified: guide.updated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];

  const caseStoryEntries = caseStories.map((story) => ({
    url: `${SITE_URL}${caseStoryPath(story.slug)}`,
    lastModified: story.published,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [...localizedEntries, ...serviceAreaEntries, ...guideEntries, ...caseStoryEntries, ...legacyPostEntries];
}
