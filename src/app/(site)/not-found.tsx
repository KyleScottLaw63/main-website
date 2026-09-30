import { ChatWidget } from '@/components/marketing/ChatWidget';
import { NotFoundContent } from '@/components/marketing/NotFoundContent';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { missingPageMetadata } from '@/lib/marketing/not-found-metadata';

// Handles notFound() thrown inside the English site (an unknown guide or news
// slug). The Spanish tree has its own under src/app/(site-es). URLs that match
// no route at all use src/app/global-not-found.tsx.
//
// Next resolves a not-found page's head from the layouts plus this file, not from the
// page that threw: without this export it carried the home page's title, canonical link
// and "index, follow" beside Next's own noindex.
export const metadata = missingPageMetadata('en');

export default function SiteNotFound() {
  return (
    <main className="not-found-page">
      <SiteHeader locale="en" />
      <NotFoundContent locale="en" />
      <SiteFooter locale="en" />
      <ChatWidget locale="en" />
    </main>
  );
}
