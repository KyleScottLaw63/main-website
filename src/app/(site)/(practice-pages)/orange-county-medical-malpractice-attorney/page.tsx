import type { Metadata } from 'next';
import { PracticeAreaPage } from '@/components/marketing/PracticeAreaPage';
import { practiceAreaByKey } from '@/lib/marketing/data/practiceAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';

const area = practiceAreaByKey['medical-malpractice'];
export const metadata: Metadata = { title: `${area.title} | Kyle Scott Law`, description: area.metaDescription, alternates: localizedAlternates(area.path) };
export default function Page() { return <PracticeAreaPage area={area} />; }
