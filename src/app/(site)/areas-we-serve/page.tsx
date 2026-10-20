import type { Metadata } from 'next';
import { AreasWeServePage } from '@/components/marketing/AreasWeServePage';
import { areasWeServe } from '@/lib/marketing/data/areasWeServe';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = {
  title: `${areasWeServe.title} | Kyle Scott Law`,
  description: areasWeServe.metaDescription,
  alternates: localizedAlternates(areasWeServe.path),
};

export default function Page() {
  return <AreasWeServePage />;
}
