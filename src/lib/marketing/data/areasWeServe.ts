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

const regionKeys = (...names: string[]) => names.flatMap((name) => areaRegions.find((region) => region.name === name)?.keys ?? []);

/**
 * The header's "Service Areas" menu (the firm, 2026-10-20): four categories built from the regions above, so a new
 * city in a region appears in the menu too. Cities are sorted by name where the menu is built (SiteHeader).
 */
export const menuRegions: { en: string; es: string; keys: string[] }[] = [
  { en: 'Central & West Orange County', es: 'Centro y oeste del Condado de Orange', keys: regionKeys('Central Orange County', 'West Orange County') },
  { en: 'North Orange County', es: 'Norte del Condado de Orange', keys: regionKeys('North Orange County') },
  { en: 'South Orange County & the Coast', es: 'Sur del Condado de Orange y la costa', keys: regionKeys('Coastal Orange County', 'South Orange County') },
  { en: 'Beyond Orange County', es: 'Fuera del Condado de Orange', keys: regionKeys('Beyond Orange County') },
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

/** /es/areas-que-atendemos: the Spanish version of the page above (content round 5, 2026-10-20), saying exactly the same. */
export const areasWeServeEs = {
  path: '/es/areas-que-atendemos',
  title: 'Áreas que atendemos en el Condado de Orange',
  metaDescription: 'Abogado de lesiones personales en el Condado de Orange para cada ciudad, de Brea a San Clemente, desde una oficina en Tustin. Consulta gratuita.',
  intro: 'Kyle Scott Law representa a personas lesionadas en cualquier lugar del Condado de Orange, de Brea a San Clemente, desde su oficina en 17671 Irvine Blvd., Suite 210, en Tustin. Busque su ciudad abajo para ver cómo funciona un caso allí, o vaya directamente al tipo de caso que tiene.',
  citiesBody: 'Cada página de ciudad explica dónde suelen ocurrir las lesiones allí, qué agencias investigan, dónde se presentaría un caso y todos los tipos de casos que el bufete maneja para las personas que viven o se lesionaron allí.',
  unincorporated: 'También atendemos comunidades no incorporadas como North Tustin, Ladera Ranch, Rancho Mission Viejo, Coto de Caza y Midway City. En esas zonas, normalmente son las agencias del condado, no una ciudad, las que se encargan de los reportes y los reclamos.',
  faqs: [
    { question: '¿Kyle Scott Law maneja casos en mi ciudad del Condado de Orange?', answer: 'Sí. El bufete representa a personas lesionadas en todas las ciudades del Condado de Orange y en las comunidades no incorporadas del condado. La oficina está en Tustin, cerca de la 5 y la 55, en el centro de la mayor parte del condado. Busque su ciudad arriba para ver cómo funciona un caso allí, o empiece con una consulta gratuita por teléfono o video.' },
    { question: '¿Tengo que ir a la oficina de Tustin?', answer: 'No. Su primera conversación con Kyle Scott puede ser en la oficina de Irvine Boulevard, por teléfono o por video, en inglés o en español. Muchos clientes manejan la mayor parte de su caso sin ir con frecuencia a la oficina. Si su caso se presenta ante el tribunal, el abogado se presenta por usted en la mayoría de las audiencias.' },
    { question: '¿Dónde se presentaría mi caso de lesiones en el Condado de Orange?', answer: 'La mayoría de las demandas por lesiones en el Condado de Orange se presentan ante el Tribunal Superior del Condado de Orange. Los casos civiles ilimitados, los de más de $35,000 (Código de Procedimiento Civil, § 85), se ven en el Central Justice Center de Santa Ana. Muchos reclamos se resuelven con la aseguradora antes de presentar una demanda.' },
    { question: '¿El bufete maneja casos fuera del Condado de Orange?', answer: 'El bufete se enfoca en el Condado de Orange, y también representa a personas lesionadas en otras partes de California. Algunos de sus resultados publicados provienen de casos fuera del Condado de Orange. El lugar donde ocurrió la lesión determina qué tribunal, qué agencias y qué reglas locales se aplican, y la primera consulta lo aclara.' },
    { question: '¿Qué pasa si mi ciudad o mi tipo de caso no aparece en la lista?', answer: 'Llame de todos modos. Las listas de arriba cubren las principales áreas de práctica del bufete y todas las ciudades del Condado de Orange. Las lesiones que no encajan en una categoría, o que ocurrieron justo fuera del condado, pueden ser casos que el bufete puede tomar o referir. La consulta es gratuita.' },
  ],
  sources: [
    { label: 'Código de Procedimiento Civil, § 85: casos civiles limitados ($35,000 o menos) — California Legislative Information', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=85' },
    { label: 'Central Justice Center, Santa Ana — Tribunal Superior de California, Condado de Orange', url: 'https://www.occourts.org/location/central-justice-center' },
  ] satisfies PageSource[],
};

/** Spanish names for the regions and practice groups above, by their English name. */
export const areaNamesEs: Record<string, string> = {
  'Central Orange County': 'Centro del Condado de Orange',
  'North Orange County': 'Norte del Condado de Orange',
  'West Orange County': 'Oeste del Condado de Orange',
  'Coastal Orange County': 'Costa del Condado de Orange',
  'South Orange County': 'Sur del Condado de Orange',
  'Beyond Orange County': 'Fuera del Condado de Orange',
  'The firm also represents people hurt elsewhere in Southern California.': 'El bufete también representa a personas lesionadas en otras partes del sur de California.',
  'Vehicle crashes': 'Choques de vehículos',
  'Unsafe property and places': 'Propiedades y lugares inseguros',
  'Serious injuries': 'Lesiones graves',
  'Abuse, neglect, and professional negligence': 'Abuso, negligencia y negligencia profesional',
};
