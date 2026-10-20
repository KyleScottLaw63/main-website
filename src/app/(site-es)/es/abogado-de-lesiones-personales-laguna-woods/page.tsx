import type { Metadata } from 'next';
import { ServiceAreaPage } from '@/components/marketing/ServiceAreaPage';
import { spanishServiceAreaByKey } from '@/lib/marketing/data/spanishServiceAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';

const area = spanishServiceAreaByKey['laguna-woods'];
export const metadata: Metadata = { title: `${area.title} | Kyle Scott Law`, description: area.metaDescription, alternates: localizedAlternates(area.path) };
export default function Page() { return <ServiceAreaPage area={area} locale="es" />; }
