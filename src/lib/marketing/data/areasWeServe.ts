import type { PageSource } from '@/lib/marketing/data/practiceAreas';

/**
 * /areas-we-serve: every city page, grouped by part of the county (each city's own case-type pages are
 * linked from its city page), and every practice, grouped by kind of case (draft approved by Kyle J. Scott, 2026-10-19). The page builds its links from the city,
 * city + case, and practice data, so a new page appears here once its record exists; a key with no
 * record yet shows as plain text. The groupings are editorial and carry no legal meaning.
 * `areas-we-serve.test.ts` fails if a city or practice record is left out.
 */
export const areaRegions: { name: string; note?: string; keys: string[] }[] = [
  { name: 'Central Orange County', keys: ['tustin', 'irvine', 'orange', 'santa-ana'] },
  { name: 'North Orange County', keys: ['anaheim', 'brea', 'buena-park', 'fullerton', 'la-habra', 'placentia', 'villa-park', 'yorba-linda'] },
  { name: 'West Orange County', keys: ['cypress', 'fountain-valley', 'garden-grove', 'la-palma', 'los-alamitos', 'seal-beach', 'stanton', 'westminster'] },
  { name: 'Coastal Orange County', keys: ['costa-mesa', 'dana-point', 'huntington-beach', 'laguna-beach', 'newport-beach', 'san-clemente'] },
  { name: 'South Orange County', keys: ['aliso-viejo', 'laguna-hills', 'laguna-niguel', 'laguna-woods', 'lake-forest', 'mission-viejo', 'rancho-santa-margarita', 'san-juan-capistrano'] },
  { name: 'Beyond Orange County', note: 'The firm also represents people hurt elsewhere in Southern California.', keys: ['long-beach', 'inland-empire', 'southern-california'] },
];

export const practiceGroups: { name: string; keys: string[] }[] = [
  { name: 'Vehicle crashes', keys: ['car-accidents', 'truck-accidents', 'motorcycle-accidents', 'rideshare-accidents', 'pedestrian-accidents', 'bicycle-accidents', 'bus-accidents', 'hit-and-run-accidents', 'drunk-driver-accidents'] },
  { name: 'Unsafe property and places', keys: ['slip-and-fall', 'premises-liability', 'dog-bites', 'school-liability', 'sports-injuries', 'government-claims'] },
  { name: 'Serious injuries', keys: ['personal-injury', 'traumatic-brain-injury', 'spinal-cord-injuries', 'catastrophic-injuries', 'burn-injuries', 'wrongful-death'] },
  { name: 'Abuse, neglect, and professional negligence', keys: ['medical-malpractice', 'elder-abuse', 'sexual-harassment-abuse', 'child-sexual-abuse', 'insurance-bad-faith'] },
];

export const areasWeServe = {
  path: '/areas-we-serve',
  title: 'Areas We Serve in Orange County',
  metaDescription: 'Orange County personal injury lawyer serving every city from Brea to San Clemente from a Tustin office. Find your city. Free consultation.',
  intro: 'Kyle Scott Law represents people injured anywhere in Orange County, from Brea to San Clemente, from its office at 17671 Irvine Blvd., Suite 210, in Tustin. Find your city below to see how a case there works, or go straight to the type of case you have.',
  citiesBody: 'Each city page covers where injuries tend to happen there, which agencies investigate, where a case would be filed, and every type of case the firm handles for people who live or were hurt there.',
  unincorporated: 'Unincorporated communities such as North Tustin, Ladera Ranch, Rancho Mission Viejo, Coto de Caza, and Midway City are served too. For these areas, county agencies, not a city, usually handle reports and claims.',
  faqs: [
    { question: 'Does Kyle Scott Law handle cases in my Orange County city?', answer: 'Yes. The firm represents injured people in every Orange County city and in the county’s unincorporated communities. The office is in Tustin, near the 5 and the 55, which is central to most of the county. Find your city above to see how a case there works, or start with a free consultation by phone or video.' },
    { question: 'Do I have to come to the Tustin office?', answer: 'No. Your first conversation with Kyle Scott can be at the office on Irvine Boulevard, by phone, or by video, in English or Spanish. Many clients handle most of their case without frequent trips to the office. If your case is filed in court, the attorney appears for you at most hearings.' },
    { question: 'Where would my Orange County injury case be filed?', answer: 'Most Orange County injury lawsuits are filed in the Orange County Superior Court. Unlimited civil cases, those over $35,000 (Code of Civil Procedure § 85), are heard at the Central Justice Center in Santa Ana. Many claims resolve with the insurer before any lawsuit is filed.' },
    { question: 'Does the firm handle cases outside Orange County?', answer: 'The firm’s focus is Orange County, and it also represents people injured elsewhere in California. Some of its published results came from cases outside Orange County. Where the injury happened affects which court, agencies, and local rules apply, so the first consultation covers that.' },
    { question: 'What if my city or type of case isn’t listed?', answer: 'Call anyway. The lists above cover the firm’s main practice areas and every Orange County city. Injuries that don’t fit a category, or that happened just outside the county, may still be cases the firm can take or refer. The consultation is free.' },
  ],
  sources: [
    { label: 'Code of Civil Procedure § 85: limited civil cases ($35,000 or less) — California Legislative Information', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=85' },
    { label: 'Central Justice Center, Santa Ana — Superior Court of California, County of Orange', url: 'https://www.occourts.org/location/central-justice-center' },
  ] satisfies PageSource[],
};
