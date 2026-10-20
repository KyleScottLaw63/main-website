import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { menuRegions } from '@/lib/marketing/data/areasWeServe';
import { serviceAreaByKey } from '@/lib/marketing/data/serviceAreas';
import { spanishServiceAreaByKey } from '@/lib/marketing/data/spanishServiceAreas';
import type { SiteLocale } from '@/lib/marketing/i18n';

export type AreaMenuGroup = { name: string; cities: { name: string; href: string; english?: boolean }[] };

/**
 * The four "Service Areas" categories with their cities, built on the server (the page data stays out of the
 * browser bundle). In Spanish, a city links its Spanish page where there is one, otherwise the English page.
 */
export function areaMenu(locale: SiteLocale): AreaMenuGroup[] {
  return menuRegions.map((region) => ({
    name: region[locale],
    cities: region.keys
      .flatMap((key) => {
        const spanish = locale === 'es' ? spanishServiceAreaByKey[key] : undefined;
        const area = spanish ?? serviceAreaByKey[key];
        return area ? [{ name: area.city, href: area.path, ...(locale === 'es' && !spanish ? { english: true } : {}) }] : [];
      })
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

export const areaMenuCopy = {
  en: { label: 'Service Areas', all: 'All areas we serve' },
  es: { label: 'Áreas de servicio', all: 'Todas las áreas que atendemos (en inglés)' },
} satisfies Record<SiteLocale, unknown>;

/**
 * Desktop header menu: hover or keyboard focus on "Service Areas" opens four categories; hovering or focusing a
 * category shows its cities beside it (the first category shows until another is chosen). Pure CSS, so it works
 * without script and the page stays static. The trigger itself links /areas-we-serve, for touch screens.
 */
export function ServiceAreasMenu({ locale = 'en' }: { locale?: SiteLocale }) {
  const text = areaMenuCopy[locale];
  const groups = areaMenu(locale);
  return (
    <div className="nav-menu">
      <Link className="nav-menu-trigger" href="/areas-we-serve" aria-haspopup="true" {...(locale === 'es' ? { hrefLang: 'en' } : {})}>{text.label}<ChevronDown aria-hidden="true" /></Link>
      <div className="nav-menu-panel">
        <ul className="nav-menu-regions">
          {groups.map((group) => (
            <li className="nav-menu-region" key={group.name}>
              <Link className="nav-menu-region-link" href="/areas-we-serve" {...(locale === 'es' ? { hrefLang: 'en' } : {})}>{group.name}<ChevronRight aria-hidden="true" /></Link>
              <ul className="nav-menu-cities" aria-label={group.name}>
                {group.cities.map((city) => <li key={city.href}><a href={city.href} {...(city.english ? { hrefLang: 'en', lang: 'en' } : {})}>{city.name}</a></li>)}
              </ul>
            </li>
          ))}
        </ul>
        <Link className="nav-menu-all" href="/areas-we-serve" {...(locale === 'es' ? { hrefLang: 'en' } : {})}>{text.all}</Link>
      </div>
    </div>
  );
}
