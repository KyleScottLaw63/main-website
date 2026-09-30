import type { Metadata } from 'next';
import { LegalInformationPage } from '@/components/marketing/LegalInformationPage';
import { legalPage } from '@/lib/marketing/data/legalPages';
import { localizedAlternates } from '@/lib/marketing/i18n';

const content = legalPage('es', 'disclaimer');

export const metadata: Metadata = {
  title: 'Aviso legal | Kyle Scott Law',
  description: content.description,
  alternates: localizedAlternates(content.path),
};

export default function SpanishDisclaimerPage() {
  return <LegalInformationPage content={content} />;
}
