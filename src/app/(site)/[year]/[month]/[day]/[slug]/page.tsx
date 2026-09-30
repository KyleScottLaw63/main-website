import { notFound, permanentRedirect } from 'next/navigation';
import { legacyRedirectForPath, legacyRedirects } from '@/lib/marketing/data/legacyPosts';

type PageProps = {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
};

export function generateStaticParams() {
  return legacyRedirects.map(({ legacyPath }) => {
    const [year, month, day, slug] = legacyPath.split('/').filter(Boolean);
    return { year, month, day, slug };
  });
}

export default async function LegacyPostRedirect({ params }: PageProps) {
  const { year, month, day, slug } = await params;
  const redirect = legacyRedirectForPath(`/${year}/${month}/${day}/${slug}/`);
  if (!redirect) notFound();
  permanentRedirect(redirect.canonicalPath);
}
