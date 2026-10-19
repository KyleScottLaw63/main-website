import type { Metadata } from 'next';
import { LegalInformationPage } from '@/components/marketing/LegalInformationPage';
import { legalPage } from '@/lib/marketing/data/legalPages';
import { localizedAlternates } from '@/lib/marketing/i18n';

const content = legalPage('es', 'terms');

export const metadata: Metadata = {
  title: 'Términos y condiciones | Kyle Scott Law',
  description: content.description,
  alternates: localizedAlternates(content.path),
};

export default function SpanishTermsPage() {
  return <LegalInformationPage content={content} />;
}
