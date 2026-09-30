import type { Metadata } from 'next';
import { ServiceAreaPage } from '@/components/marketing/ServiceAreaPage';
import { serviceAreaByKey } from '@/lib/marketing/data/serviceAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';

const area = serviceAreaByKey['santa-ana'];
export const metadata: Metadata = { title: `${area.title} | Kyle Scott Law`, description: area.metaDescription, alternates: localizedAlternates(area.path) };
export default function Page() { return <ServiceAreaPage area={area} />; }
