import type { Metadata } from 'next';
import { LegalInformationPage } from '@/components/marketing/LegalInformationPage';
import { legalPage } from '@/lib/marketing/data/legalPages';
import { localizedAlternates } from '@/lib/marketing/i18n';

const content = legalPage('es', 'accessibility');

export const metadata: Metadata = {
  title: 'Declaración de accesibilidad | Kyle Scott Law',
  description: content.description,
  alternates: localizedAlternates(content.path),
};

export default function SpanishAccessibilityPage() {
  return <LegalInformationPage content={content} />;
}
