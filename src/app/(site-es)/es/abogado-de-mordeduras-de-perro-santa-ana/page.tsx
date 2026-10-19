import type { Metadata } from 'next';
import { PracticeAreaPage } from '@/components/marketing/PracticeAreaPage';
import { spanishCityPracticePageByKey } from '@/lib/marketing/data/spanishCityPracticePages';
import { localizedAlternates } from '@/lib/marketing/i18n';

const area = spanishCityPracticePageByKey['santa-ana-dog-bites'];
export const metadata: Metadata = { title: `${area.title} | Kyle Scott Law`, description: area.metaDescription, alternates: localizedAlternates(area.path) };
export default function Page() { return <PracticeAreaPage area={area} locale="es" />; }
