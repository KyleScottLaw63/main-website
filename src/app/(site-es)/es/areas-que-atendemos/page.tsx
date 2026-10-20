import type { Metadata } from 'next';
import { AreasWeServePage } from '@/components/marketing/AreasWeServePage';
import { areasWeServeEs } from '@/lib/marketing/data/areasWeServe';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = {
  title: `${areasWeServeEs.title} | Kyle Scott Law`,
  description: areasWeServeEs.metaDescription,
  alternates: localizedAlternates(areasWeServeEs.path),
};

export default function Page() {
  return <AreasWeServePage locale="es" />;
}
