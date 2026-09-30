import { describe, expect, it } from 'vitest';
import { caseStories, caseStoryResult, caseStoryTitle } from '@/lib/marketing/data/caseStories';
import { legacyPostBySlug } from '@/lib/marketing/data/legacyPosts';
import { allResults, flagshipResults } from '@/lib/marketing/data/results';
import { localizedRoutes } from '@/lib/marketing/i18n';

/**
 * Case stories (docs/case-stories.md) carry only the approved story text, attached to the result
 * card it belongs to — never an internal amount, source, or review note from the drafts.
 */
const dollars = (text: string) =>
  [...text.matchAll(/\$(\d[\d,]*(?:\.\d+)?)\s*(million|M)?\b/g)].map(([, figure, million]) => Number(figure.replace(/,/g, '')) * (million ? 1_000_000 : 1));

describe('case stories', () => {
  it('each belongs to exactly one result card, and every card that names a story has one', () => {
    for (const story of caseStories) {
      expect(allResults.filter((result) => result.story === story.slug), story.slug).toHaveLength(1);
    }
    const slugs = new Set(caseStories.map((story) => story.slug));
    expect(slugs.size).toBe(caseStories.length);
    expect(allResults.filter((result) => result.story && !slugs.has(result.story)).map((result) => result.story)).toEqual([]);
  });

  it('tells the $5.75M story on the fixed flagship card (AGENTS.md: never relabel)', () => {
    const story = caseStories.find((item) => item.slug === 'student-skull-fracture-verdict')!;
    expect(caseStoryResult(story)).toBe(flagshipResults.find((result) => result.amount === '$5.75M'));
  });

  it('states no dollar figure but its own result and the figures its comparison draws', () => {
    for (const story of caseStories) {
      const allowed = new Set([...dollars(caseStoryResult(story).amount), ...(story.comparison?.figures.map((figure) => figure.value) ?? [])]);
      const text = [story.summary, ...story.chapters.flatMap((chapter) => chapter.paragraphs)].join(' ');
      expect(dollars(text).filter((value) => !allowed.has(value)), story.slug).toEqual([]);
    }
  });

  it('carries none of the drafts’ internal material', () => {
    const INTERNAL = /\binternal\b|review notes?|before publishing|needs confirmation|decision:|\bsources?:/i;
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
    expect(titles[1]).toBe('$928,493.12 jury verdict: OCTA bus crashes into minivan; man suffers cognitive problems | Kyle Scott Law');
    for (const story of caseStories) expect(story.summary.length, story.slug).toBeLessThanOrEqual(170);
  });

  it('retitles the $700,000 card from its story: nothing supports "medical-device salesperson"', () => {
    expect(allResults.map((result) => result.title).join(' ')).not.toMatch(/medical-device salesperson/i);
  });
});
