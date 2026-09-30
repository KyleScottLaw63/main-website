'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type NetworkInformation = { effectiveType?: string; saveData?: boolean };

export function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData || connection?.effectiveType?.includes('2g')) return;

    const prefetched = new Set<string>();
    const routeFor = (anchor: HTMLAnchorElement) => {
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return null;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return null;
      return `${url.pathname}${url.search}`;
    };
    const prefetch = (anchor: HTMLAnchorElement | null) => {
      if (!anchor) return;
      const route = routeFor(anchor);
      if (!route || prefetched.has(route)) return;
      prefetched.add(route);
      router.prefetch(route);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        prefetch(entry.target as HTMLAnchorElement);
        observer.unobserve(entry.target);
      }),
      { rootMargin: '240px 0px' },
    );
    const observeLinks = (root: Document | HTMLElement) => root.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
      if (routeFor(anchor)) observer.observe(anchor);
    });

    const onIntent = (event: Event) => {
      const anchor = event.composedPath().find((target): target is HTMLAnchorElement => target instanceof HTMLAnchorElement);
      prefetch(anchor ?? null);
    };
    document.addEventListener('pointerover', onIntent, true);
    document.addEventListener('focusin', onIntent, true);

    const mutations = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node instanceof HTMLAnchorElement) observer.observe(node);
      else if (node instanceof HTMLElement) observeLinks(node);
    })));

    // Viewport prefetch waits out the initial-load window so it never competes
    // with the hero image and hydration; hover/focus intent stays instant.
    const startViewportPrefetch = window.setTimeout(() => {
      observeLinks(document);
      mutations.observe(document.body, { childList: true, subtree: true });
    }, 3500);

    return () => {
      window.clearTimeout(startViewportPrefetch);
      observer.disconnect();
      mutations.disconnect();
      document.removeEventListener('pointerover', onIntent, true);
      document.removeEventListener('focusin', onIntent, true);
    };
  }, [router]);

  return null;
}
