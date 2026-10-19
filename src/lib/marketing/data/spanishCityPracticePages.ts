import type { PracticeAreaData } from '@/lib/marketing/data/practiceAreas';

/** City + case pages in Spanish; each `parentKey` names a Spanish practice key. See cityPracticePages.ts. */
export const spanishCityPracticePages: (PracticeAreaData & { englishKey: string })[] = [];

export const spanishCityPracticePageByKey = Object.fromEntries(spanishCityPracticePages.map((page) => [page.key, page])) as Record<string, PracticeAreaData & { englishKey: string }>;
