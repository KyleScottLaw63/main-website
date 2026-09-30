import type { Metadata } from 'next';
import { PracticeAreaPage } from '@/components/marketing/PracticeAreaPage';
import { practiceAreaByKey } from '@/lib/marketing/data/practiceAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';

const area = practiceAreaByKey['personal-injury'];
export const metadata: Metadata = { title: 'Orange County Personal Injury Attorney: Cases We Handle | Kyle Scott Law', description: area.metaDescription, alternates: localizedAlternates(area.path) };
export default function Page() { return <PracticeAreaPage area={area} />; }
