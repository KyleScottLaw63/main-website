/**
 * Google Analytics 4 for the public website (docs/website-analytics.md).
 *
 * The measurement ID is public (it sits in every page's source), so it lives here rather than in an
 * environment setting. Empty means analytics is off: the pages carry no tag at all. The tag runs only
 * on the production host, so previews, localhost, and *.vercel.app deployments send nothing.
 */
export const GA_MEASUREMENT_ID = 'G-TGKDKL8GZ5';
export const ANALYTICS_HOST = 'kjslaw.com';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/**
 * Records a completed inquiry as a GA4 lead, named by where it came from: the consultation form or
 * the chat assistant. A no-op while analytics is off or the tag has not loaded. Nothing about the
 * inquiry itself is sent.
 */
export function trackLead(method: 'form' | 'chat') {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'generate_lead', { method });
}
