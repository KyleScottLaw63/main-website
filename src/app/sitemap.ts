import type { MetadataRoute } from 'next';
import { areasWeServe } from '@/lib/marketing/data/areasWeServe';
import { caseStories } from '@/lib/marketing/data/caseStories';
import { cityPracticePages } from '@/lib/marketing/data/cityPracticePages';
import { legacyPostIsIndexable, legacyPosts } from '@/lib/marketing/data/legacyPosts';
import { caseStoryPath } from '@/lib/marketing/data/results';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { northWestCountyServiceAreas } from '@/lib/marketing/data/serviceAreasNorthWestCounty';
import { regionalServiceAreas } from '@/lib/marketing/data/serviceAreasRegional';
import { southCountyServiceAreas } from '@/lib/marketing/data/serviceAreasSouthCounty';
import { spanishCityPracticePages } from '@/lib/marketing/data/spanishCityPracticePages';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { spanishServiceAreas } from '@/lib/marketing/data/spanishServiceAreas';
import { spanishRoundFourServiceAreas } from '@/lib/marketing/data/spanishServiceAreasRoundFour';
import { localizedRoutes } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';

/**
 * Every URL is built from SITE_URL — the apex https://kjslaw.com, the primary
 * domain (www redirects to it) — never from NEXT_PUBLIC_APP_ORIGIN, so how that
 * setting is written (a trailing slash, a preview host) cannot change the
 * sitemap. robots.txt decides whether crawlers may use it (app/robots.ts).
 */
// The Spanish city pages: content round 3, approved by the Spanish-reading reviewer and published 2026-10-10.
const spanishServiceAreasDate = '2026-10-10';
// Content round 4: the new city, regional, and city + case pages and the areas index, approved by Kyle J. Scott
// (Spanish by the Spanish-reading reviewer) and published 2026-10-19.
const roundFourDate = '2026-10-19';
const roundFourAreaPaths = new Set([...northWestCountyServiceAreas, ...southCountyServiceAreas, ...regionalServiceAreas, ...spanishRoundFourServiceAreas].map((area) => area.path));

export default function sitemap(): MetadataRoute.Sitemap {
  // The guides and the translated city pages are paired for the language switcher too, but take
  // their entries, with dates, below.
  const pairedElsewhere = new Set(['/guides', ...serviceAreas.map((area) => area.path), ...cityPracticePages.map((page) => page.path)]);
  const localizedEntries = localizedRoutes.filter((route) => !route.en.startsWith('/guides/') && !pairedElsewhere.has(route.en)).flatMap((route) =>
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
        '/terms',
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

  const serviceAreaEntries = [
    ...serviceAreas.map((area) => ({
      url: `${SITE_URL}${area.path}`,
      lastModified: roundFourAreaPaths.has(area.path) ? roundFourDate : '2026-10-06',
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...spanishServiceAreas.map((area) => ({
      url: `${SITE_URL}${area.path}`,
      lastModified: roundFourAreaPaths.has(area.path) ? roundFourDate : spanishServiceAreasDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];

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
    {
      url: `${SITE_URL}/es/guias`,
      // The Spanish library changes when a translation does.
      lastModified: spanishLegalGuides.map((guide) => guide.updated).sort().at(-1),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    ...legalGuides.map((guide) => ({
      url: `${SITE_URL}${guide.path}`,
      lastModified: guide.updated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...spanishLegalGuides.map((guide) => ({
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

  // City + case pages pair with their Spanish versions through localizedRoutes, but take their entries here.
  const cityPracticeEntries = [...cityPracticePages, ...spanishCityPracticePages, areasWeServe].map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: roundFourDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...localizedEntries, ...serviceAreaEntries, ...cityPracticeEntries, ...guideEntries, ...caseStoryEntries, ...legacyPostEntries];
}
