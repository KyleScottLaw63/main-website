import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { practiceIcons } from '@/components/marketing/practice-icons';
import { practiceGroups } from '@/lib/marketing/data/areasWeServe';
import { practiceAreaByKey } from '@/lib/marketing/data/practiceAreas';
import { spanishPracticeAreaByKey } from '@/lib/marketing/data/spanishPracticeAreas';
import type { SiteLocale } from '@/lib/marketing/i18n';

/** The one-line summary on each card, as short as the home page's eight featured cards (the practice's own eyebrow otherwise). */
const cardCopy: Record<SiteLocale, Record<string, string>> = {
  en: {
    'elder-abuse': 'Nursing home abuse and neglect',
    'school-liability': 'Injuries and abuse at school',
    'motorcycle-accidents': 'Crashes on streets and freeways',
    'rideshare-accidents': 'Uber and Lyft crashes',
    'truck-accidents': 'Big-rig and commercial vehicle crashes',
    'pedestrian-accidents': 'People struck by vehicles',
    'bicycle-accidents': 'Cyclists, e-bikes, and scooters',
    'burn-injuries': 'Fire, scald, electrical, and chemical burns',
    'bus-accidents': 'Transit, school, and charter buses',
    'catastrophic-injuries': 'Life-changing, permanent injuries',
    'child-sexual-abuse': 'Civil claims for survivors',
    'drunk-driver-accidents': 'Crashes caused by impaired drivers',
    'government-claims': 'Claims against public agencies',
    'hit-and-run-accidents': 'Hit-and-run and uninsured drivers',
    'insurance-bad-faith': 'When an insurer acts in bad faith',
    'premises-liability': 'Dangerous property conditions',
    'spinal-cord-injuries': 'Spinal cord, back, and neck injuries',
    'sports-injuries': 'Sports, recreation, and playgrounds',
  },
  es: {
    'elder-abuse': 'Abuso y negligencia en asilos',
    'school-liability': 'Lesiones y abuso en la escuela',
    'motorcycle-accidents': 'Choques en calles y autopistas',
    'rideshare-accidents': 'Choques de Uber y Lyft',
    'truck-accidents': 'Choques de camiones y vehículos comerciales',
    'pedestrian-accidents': 'Peatones atropellados por vehículos',
    'bicycle-accidents': 'Ciclistas, bicicletas eléctricas y patinetas',
    'burn-injuries': 'Quemaduras por fuego, líquidos, electricidad y químicos',
    'bus-accidents': 'Autobuses de transporte público, escolares y chárter',
    'catastrophic-injuries': 'Lesiones permanentes que cambian la vida',
    'child-sexual-abuse': 'Reclamos civiles para sobrevivientes',
    'drunk-driver-accidents': 'Choques causados por conductores ebrios',
    'government-claims': 'Reclamos contra agencias públicas',
    'hit-and-run-accidents': 'Conductores que huyen o sin seguro',
    'insurance-bad-faith': 'Cuando una aseguradora actúa de mala fe',
    'premises-liability': 'Condiciones peligrosas en propiedades',
    'spinal-cord-injuries': 'Lesiones de médula espinal, espalda y cuello',
    'sports-injuries': 'Deportes, recreación y parques infantiles',
  },
};

const copy = {
  en: { more: 'View more', fewer: 'Show fewer', all: 'View every practice area', allPath: '/practice-areas' },
  es: { more: 'Ver más', fewer: 'Mostrar menos', all: 'Ver todas las áreas de práctica', allPath: '/es/areas-de-practica' },
} satisfies Record<SiteLocale, unknown>;

/**
 * Under the home page's featured practice cards (eight, or four on a phone): a "View more" button that opens every other practice as the
 * same card (icon, name, one line, arrow), in the order of /areas-we-serve, from the practice data, so a new
 * practice page appears here once its record exists. Native <details>: no script, and the links stay in the page.
 */
export function MorePracticeCards({ locale = 'en', shownPaths }: { locale?: SiteLocale; shownPaths: string[] }) {
  const text = copy[locale];
  const shown = new Set(shownPaths);
  const cards = practiceGroups
    .flatMap((group) => group.keys)
    .flatMap((key) => {
      const page = (locale === 'es' ? spanishPracticeAreaByKey[key] : undefined) ?? practiceAreaByKey[key];
      return page && !shown.has(page.path) ? [{ key, page, inEnglish: locale === 'es' && !spanishPracticeAreaByKey[key] }] : [];
    });
  return (
    <details className="practice-more-cards">
      <summary><span className="when-closed">{text.more}</span><span className="when-open">{text.fewer}</span><ChevronDown aria-hidden="true" /></summary>
      <div className="practice-grid">
        {cards.map(({ key, page, inEnglish }) => {
          const Icon = practiceIcons[page.icon];
          return <a className="practice-card" href={page.path} key={key} {...(inEnglish ? { hrefLang: 'en', lang: 'en' } : {})}><span className="practice-icon"><Icon aria-hidden="true" /></span><span><strong>{page.shortTitle}</strong><small>{cardCopy[locale][key] ?? page.eyebrow}</small></span><ArrowRight className="card-arrow" aria-hidden="true" /></a>;
        })}
      </div>
      <Link className="practice-more-all" href={text.allPath}>{text.all} <ArrowRight aria-hidden="true" /></Link>
    </details>
  );
}
