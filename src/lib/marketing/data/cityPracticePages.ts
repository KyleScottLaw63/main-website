import type { PracticeAreaData } from '@/lib/marketing/data/practiceAreas';

/**
 * City + case pages (e.g. /tustin-dog-bite-lawyer): a county-wide practice (`parentKey`) told for one
 * city (`city`). Rendered by PracticeAreaPage; kept out of practiceAreas so the practice hub, the
 * firm's OfferCatalog, and the related-practice rotation list each practice once.
 */
export const cityPracticePages: PracticeAreaData[] = [];

export const cityPracticePageByKey = Object.fromEntries(cityPracticePages.map((page) => [page.key, page])) as Record<string, PracticeAreaData>;
