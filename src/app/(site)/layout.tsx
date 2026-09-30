import type { Metadata } from 'next';
import { SiteRootLayout, siteMetadata, siteViewport } from '@/lib/marketing/site-layout';
import './globals.css';

// English root layout. The Spanish site has its own root layout under
// src/app/(site-es) so neither needs request headers — every page here is
// statically rendered and cacheable.
export const metadata: Metadata = siteMetadata('en-US');
export const viewport = siteViewport;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteRootLayout language="en-US">{children}</SiteRootLayout>;
}
