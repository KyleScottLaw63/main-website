import type { Metadata } from 'next';
import { PracticeAreaPage } from '@/components/marketing/PracticeAreaPage';
import { spanishPracticeAreaByKey } from '@/lib/marketing/data/spanishPracticeAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';

const area = spanishPracticeAreaByKey['personal-injury'];
export const metadata: Metadata = { title: 'Abogado de Lesiones Personales en el Condado de Orange: Casos que Atendemos | Kyle Scott Law', description: area.metaDescription, alternates: localizedAlternates(area.path) };
export default function Page() { return <PracticeAreaPage area={area} locale="es" />; }
