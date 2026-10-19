import type { Metadata } from 'next';
import { LegalInformationPage } from '@/components/marketing/LegalInformationPage';
import { legalPage } from '@/lib/marketing/data/legalPages';
import { localizedAlternates } from '@/lib/marketing/i18n';

const content = legalPage('en', 'terms');

export const metadata: Metadata = {
  title: 'Terms & Conditions | Kyle Scott Law',
  description: content.description,
  alternates: localizedAlternates(content.path),
};

export default function TermsPage() {
  return <LegalInformationPage content={content} />;
}
