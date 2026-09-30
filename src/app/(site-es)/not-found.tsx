import { ChatWidget } from '@/components/marketing/ChatWidget';
import { NotFoundContent } from '@/components/marketing/NotFoundContent';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';

// Handles notFound() thrown inside the Spanish site (an unknown news slug).
// Its head: the Spanish not-found title and Next's noindex only (see (site)/not-found.tsx).
export const metadata = missingPageMetadata('es');

export default function SpanishSiteNotFound() {
  return (
    <main className="not-found-page">
      <SiteHeader locale="es" />
      <NotFoundContent locale="es" />
      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
