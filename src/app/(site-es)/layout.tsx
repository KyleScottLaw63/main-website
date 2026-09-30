import type { Metadata } from 'next';
import { SiteRootLayout, siteMetadata, siteViewport } from '@/lib/marketing/site-layout';
import '../(site)/globals.css';

// Spanish root layout (everything under /es). Separate from the English tree
// so <html lang>, the share card, and the schema are known statically.
export const metadata: Metadata = siteMetadata('es-US');
export const viewport = siteViewport;

export default function SpanishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteRootLayout language="es-US">{children}</SiteRootLayout>;
}
