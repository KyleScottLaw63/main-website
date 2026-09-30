import type { Metadata } from 'next';
import { LegalInformationPage } from '@/components/marketing/LegalInformationPage';
import { legalPage } from '@/lib/marketing/data/legalPages';
import { localizedAlternates } from '@/lib/marketing/i18n';

const content = legalPage('es', 'privacy');

export const metadata: Metadata = {
  title: 'Política de privacidad | Kyle Scott Law',
  description: content.description,
  alternates: localizedAlternates(content.path),
};

export default function SpanishPrivacyPage() {
  return <LegalInformationPage content={content} />;
}
