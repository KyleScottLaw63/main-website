import type { MetadataRoute } from 'next';

/**
 * Web app manifest for the public website: home-screen name, icons, and
 * colours. Served at /manifest.webmanifest and linked from every page.
 * The icons are generated from the KJS monogram (public/icons, app/apple-icon.png).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kyle Scott Law',
    short_name: 'KJS Law',
    description: 'Orange County personal injury attorneys. Free consultation; no fee unless there is a recovery.',
    start_url: '/',
    display: 'minimal-ui',
    background_color: '#f8fbff',
    theme_color: '#063675',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
