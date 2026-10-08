# Website Analytics (Google Analytics 4)

## Purpose

The public website reports page views, phone taps, and completed inquiries to the firm's Google Analytics 4 property, so the firm can see what visitors read and how they get in touch. Nothing about a visitor's inquiry (name, contact details, message) is ever sent to Google.

## How it works

| Piece | Where |
|---|---|
| The measurement ID | `GA_MEASUREMENT_ID` in `src/lib/marketing/analytics.ts`. It is public (it appears in every page's source), so it lives in the code, not in an environment setting. Empty means analytics is off and the pages carry no tag. |
| The tag | `src/components/marketing/SiteAnalytics.tsx`, rendered by both root layouts (`SiteRootLayout` in `src/lib/marketing/site-layout.tsx`). One inline script (`next/script`, `afterInteractive`): it returns at once unless `location.hostname` is `kjslaw.com` (`ANALYTICS_HOST`), so previews, `*.vercel.app` deployments, and localhost send nothing; otherwise it sets up `gtag`, configures the ID, and appends `gtag.js`. |
| Phone taps | The same script listens for clicks on `tel:` links anywhere on the page and sends a `phone_call` event with the link's `href`. GA4 does not count those by itself. |
| Inquiries | `trackLead('form' \| 'chat')` in `src/lib/marketing/analytics.ts` sends a `generate_lead` event with its source. The consultation form (`ConsultationForm.tsx`) and the chat assistant (`ChatWidgetPanel.tsx`) call it only after the intake bridge has accepted the inquiry. It is a no-op while the tag is absent. |
| Static pages | The script is the same on every page and reads nothing from the request, so every page stays statically rendered (docs/public-site-rendering.md). The site sets no strict `script-src`, so `googletagmanager.com` loads. |

GA4 anonymizes IP addresses on its own, keeps no raw IPs, and the site passes it no user identifiers. Google Signals and advertising features stay off in the property's settings.

## Privacy policy

The privacy pages (`/privacy`, `/es/privacidad`; `src/lib/marketing/data/legalPages.ts`, "Sale, sharing, cookies, and advertising") say that the site uses Google Analytics, that it sets cookies and sends usage data to Google, and how to opt out (Google's browser add-on, or blocking cookies). That wording went up with the tag on 2026-10-08, approved by the attorney; it is attorney-reviewed text, so change it only with the attorney's approval (docs/website-content-compliance.md). The property is the firm's, created under team@kjslaw.com on 2026-10-08; its web stream is `G-TGKDKL8GZ5`.

## Turning it on, and off

1. Create the GA4 property in the firm's Google account (Admin → Create property → Web data stream for `https://kjslaw.com`) and copy the Measurement ID (`G-…`).
2. Set `GA_MEASUREMENT_ID` to it, run `npm run check` and `npm run build`, and push. Within a minute or two, the Realtime report in GA shows visits.
3. To turn analytics off, set the ID back to `''`: the pages then carry no tag at all.

In GA4, mark `generate_lead` and `phone_call` as key events (Admin → Events) so the reports count them as conversions.

## Tests

`src/components/marketing/__tests__/site-analytics.test.tsx`: no tag without an ID; with one, the script checks the host, configures that ID, loads gtag.js, and reports phone taps; `trackLead` is a no-op without the tag and sends `generate_lead` with its source once it is there.
