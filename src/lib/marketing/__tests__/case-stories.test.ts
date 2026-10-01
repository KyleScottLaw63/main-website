import { describe, expect, it } from 'vitest';
import { caseStories, caseStoryHeadline, caseStoryLinks, caseStoryResult, caseStoryTitle } from '@/lib/marketing/data/caseStories';
import { legacyPostBySlug } from '@/lib/marketing/data/legacyPosts';
import { allResults, flagshipResults } from '@/lib/marketing/data/results';
import { localizedRoutes } from '@/lib/marketing/i18n';

/**
 * Case stories (docs/case-stories.md) carry only the approved story text — never an internal amount,
 * source, or review note from the drafts. A story with a published amount belongs to that result
 * card; a confidential settlement is told with no amount at all.
 */
const dollars = (text: string) =>
  [...text.matchAll(/\$(\d[\d,]*(?:\.\d+)?)\s*(million|M)?\b/g)].map(([, figure, million]) => Number(figure.replace(/,/g, '')) * (million ? 1_000_000 : 1));
const storyText = (story: (typeof caseStories)[number]) => [story.summary, ...story.chapters.flatMap((chapter) => chapter.paragraphs)].join(' ');

describe('case stories', () => {
  it('attaches each story with an amount to exactly one result card, and a confidential story to none', () => {
    for (const story of caseStories) {
      const cards = allResults.filter((result) => result.story === story.slug);
      expect(cards, story.slug).toHaveLength(story.confidential ? 0 : 1);
    }
    const slugs = new Set(caseStories.map((story) => story.slug));
    expect(slugs.size).toBe(caseStories.length);
    expect(allResults.filter((result) => result.story && !slugs.has(result.story)).map((result) => result.story)).toEqual([]);
  });

  it('tells the $5.75M story on the fixed flagship card (AGENTS.md: never relabel)', () => {
    const story = caseStories.find((item) => item.slug === 'student-skull-fracture-verdict')!;
    expect(caseStoryResult(story)).toBe(flagshipResults.find((result) => result.amount === '$5.75M'));
  });

  it('states no dollar figure but its own result and its comparison’s — and a confidential story none at all', () => {
    for (const story of caseStories) {
      const allowed = new Set(story.confidential ? [] : [...dollars(caseStoryHeadline(story).figure), ...(story.comparison?.figures.map((figure) => figure.value) ?? [])]);
      expect(dollars(storyText(story)).filter((value) => !allowed.has(value)), story.slug).toEqual([]);
    }
  });

  it('shows a confidential settlement as "Confidential", with a year only where its own text states it', () => {
    for (const story of caseStories.filter((item) => item.confidential)) {
      const headline = caseStoryHeadline(story);
      expect(headline.figure, story.slug).toBe('Confidential');
      if (headline.year) expect(storyText(story), story.slug).toContain(String(headline.year));
    }
  });

  it('carries none of the drafts’ internal material', () => {
    // The drafts' markers ("Internal: $…", "internal review only", "Review notes", "Before publishing", …);
    // a medical "internal derangement of the knees" is story text, not one of them.
    const INTERNAL = /\binternal(?::| amount| review| only| draft)|review notes?|before publishing|needs confirmation|decision:|\bsources?:/i;
    for (const story of caseStories) expect(JSON.stringify(story), story.slug).not.toMatch(INTERNAL);
  });

  it('links a real practice page and, where it names one, the firm’s own announcement', () => {
    const englishRoutes = new Set<string>(localizedRoutes.map((route) => route.en));
    for (const story of caseStories) {
      expect(englishRoutes.has(story.practiceArea.href), story.slug).toBe(true);
      if (story.announcement) expect(legacyPostBySlug(story.announcement.href.replace(/^\/news\//, '')), story.slug).toBeDefined();
    }
  });

  it('has a unique page title and a summary short enough for a meta description', () => {
    const titles = caseStories.map(caseStoryTitle);
    expect(new Set(titles).size).toBe(titles.length);
    const title = (slug: string) => caseStoryTitle(caseStories.find((story) => story.slug === slug)!);
    expect(title('octa-bus-crash-verdict')).toBe('$928,493.12 jury verdict: Transit bus crashes into minivan; man suffers cognitive problems | Kyle Scott Law');
    expect(title('crosswalk-pedestrian-settlement')).toBe('Confidential settlement: Pedestrian struck in a marked crosswalk | Kyle Scott Law');
    for (const story of caseStories) expect(story.summary.length, story.slug).toBeLessThanOrEqual(170);
    // /results shows the summary: the kind of party a claim was against, never which one (the firm, 2026-10-01).
    for (const story of caseStories) expect(story.summary, story.slug).not.toMatch(/\b(?:LBUSD|Long Beach Unified|OCTA|Orange County Transportation Authority|Office Depot|Disneyland|Osprey)\b/);
  });

  it('retitles the $700,000 card from its story: nothing supports "medical-device salesperson"', () => {
    expect(allResults.map((result) => result.title).join(' ')).not.toMatch(/medical-device salesperson/i);
  });

  it('lists every story and the firm’s published case announcements together, newest first', () => {
    const links = caseStoryLinks();
    expect(links).toHaveLength(caseStories.length + 3);
    expect(links.map((link) => link.date)).toEqual([...links.map((link) => link.date)].sort().reverse());
    expect(links[0]).toMatchObject({ href: '/results/fontana-intersection-crash-settlement', figure: '$2.7M', kicker: 'Settlement · 2026' });
    expect(links.map((link) => link.href)).toEqual(expect.arrayContaining(['/news/riverside-jury-verdict-2-3-million', '/news/sexual-molestation-battery-settlement-2-2-million', '/news/court-of-appeal-new-trial']));
  });
});
