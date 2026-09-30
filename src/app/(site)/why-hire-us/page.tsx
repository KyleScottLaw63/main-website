import type { Metadata } from 'next';
import { WhyHireUsPage } from '@/components/marketing/WhyHireUsPage';
import { whyHireUs } from '@/lib/marketing/data/whyHireUs';
import { localizedAlternates } from '@/lib/marketing/i18n';

const content = whyHireUs.en;
export const metadata: Metadata = { title: `${content.title} | Kyle Scott Law`, description: content.metaDescription, alternates: localizedAlternates(content.path) };
export default function Page() { return <WhyHireUsPage locale="en" />; }
