import Script from 'next/script';
import { ANALYTICS_HOST, GA_MEASUREMENT_ID } from '@/lib/marketing/analytics';

/**
 * The Google Analytics 4 tag, in both root layouts. Renders nothing while GA_MEASUREMENT_ID is empty.
 * The inline script loads gtag.js only when the page is served from the production host, and reports
 * a `phone_call` event for every tap on a tel: link (GA4 does not count those by itself). Completed
 * inquiries are reported by the form and the chat assistant through `trackLead`.
 */
export function SiteAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;
  const id = JSON.stringify(GA_MEASUREMENT_ID);
  const host = JSON.stringify(ANALYTICS_HOST);
  const code = [
    '(function(){',
    `if(location.hostname!==${host})return;`,
    'window.dataLayer=window.dataLayer||[];',
    'function gtag(){dataLayer.push(arguments);}',
    'window.gtag=gtag;',
    "gtag('js',new Date());",
    `gtag('config',${id});`,
    'var s=document.createElement("script");s.async=true;',
    `s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(${id});`,
    'document.head.appendChild(s);',
    'document.addEventListener("click",function(e){',
    'var t=e.target;var a=t&&t.closest?t.closest(\'a[href^="tel:"]\'):null;',
    "if(a)gtag('event','phone_call',{link_url:a.getAttribute('href')});",
    '},true);',
    '})();',
  ].join('');
  return <Script id="site-analytics" strategy="afterInteractive">{code}</Script>;
}
