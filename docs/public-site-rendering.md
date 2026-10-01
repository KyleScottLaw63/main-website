# Public Site Rendering and Caching

## Purpose

Every page of the public website (kjslaw.com: English and Spanish) is statically rendered at build time and served from Vercel's CDN. That is what makes the site fast on a phone, lets the browser's back/forward cache restore a page instantly when a visitor goes back, and keeps the server out of the request path for anonymous traffic.

## What keeps the public site static

| Piece | Rule |
|---|---|
| Two root layouts | `src/app/(site)/layout.tsx` (English, `<html lang="en-US">`) and `src/app/(site-es)/layout.tsx` (Spanish, everything under `/es`). Each knows its language from its position in the tree, so neither reads request headers. Shared pieces (metadata, schema, fonts, prefetch) live in `src/lib/marketing/site-layout.tsx`. |
| No request-time APIs in the site trees | `headers()`, `cookies()`, `searchParams`, `connection()`, and `force-dynamic` turn a page dynamic and stamp it `Cache-Control: no-store`, which also disables the back/forward cache. Only `src/app/global-not-found.tsx` (unmatched URLs) reads headers; a 404 may be dynamic. It reads `x-site-locale`, which the proxy (`src/lib/site-proxy.ts`) sets to `es-US` only for `/es` and paths under `/es/` (`/^\/es(\/\|$)/`): an English URL that merely begins with "es" (`/estate-planning`, `/escondido-personal-injury-attorney`) gets the English 404 (test: `src/lib/marketing/__tests__/site-locale-header.test.ts`). The same header sets the page language and its browser title (`generateMetadata`): "Página no encontrada \| Kyle Scott Law" on the Spanish site, "Page not found \| Kyle Scott Law" elsewhere (test: `src/app/__tests__/global-not-found.test.tsx`). It sets no robots tag of its own (`robots: null`): Next adds `<meta name="robots" content="noindex">` to every 404, and its former "noindex, nofollow" made a second tag. |
| A proxy with no session work | `src/lib/site-proxy.ts` (run by `src/proxy.ts`) answers gone WordPress paths with 410, slashed URLs with one 308, and otherwise only adds `x-site-locale`: no auth, no cookies, nothing that could make a page uncacheable. |
| Route-group 404s | `(site)/not-found.tsx` and `(site-es)/not-found.tsx` handle `notFound()` inside each tree without headers. Each exports its own `metadata` (`missingPageMetadata` in `src/lib/marketing/not-found-metadata.ts`): Next builds a not-found page's head from the layouts plus the not-found file, not from the page that threw, so without it an unknown `/news`, `/guides`, or `/es/noticias` slug carried the home page's title, description, and canonical link and a stray "index, follow" beside Next's own noindex. |
| One URL per page | Canonical URLs have no trailing slash. `/page/` gets a single 308 to `/page` (query kept) from the proxy, before any session work; `next.config.ts` sets `skipTrailingSlashRedirect` so Next's own normalization no longer runs ahead of the old-URL redirects, which answer both forms in one hop. `/api` routes, `/auth/confirm`, file names, and `/_next` assets are served as requested, never redirected. See [legacy-url-redirects.md](legacy-url-redirects.md). |

Switching language is a full page load (different root layouts). That is intended; it happens once per visit.

Where to switch:
- **Desktop header:** the switcher dropdown.
- **Mobile header (≤1180px):** a one-tap toggle beside the call button (`LanguageToggle`): "ES" on the English site, "EN" on the Spanish one. It opens this page's counterpart, or the other home page when the page has none. Its spoken name, "ES: ver esta página en español" or "EN: view this page in English", is in the target language.
- **Mobile menu:** keeps the full switcher.
- **Under 360px:** the header's three buttons shrink from 46 to 42px so the row fits beside the logo.

## Security headers

`next.config.ts` sends on every response: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` with `Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`, `Cross-Origin-Opener-Policy: same-origin`, a `Permissions-Policy` that turns off the camera, geolocation, microphone, payment, and USB, and `Strict-Transport-Security` (two years, apex only — see the comment in `next.config.ts` before adding `includeSubDomains` or `preload`). `X-Powered-By` is off.

A strict `script-src` policy is deliberately not set. Doing it properly on Next.js means per-request nonces, which forces dynamic rendering on the public site and gives up the CDN and the back/forward cache. If the firm ever wants it, the trade-off is documented here first.

## How to verify

After a deploy:

```bash
curl -sI https://kjslaw.com/ | grep -i "cache-control\|x-vercel-cache\|x-content-type\|referrer-policy\|frame"
curl -sI https://kjslaw.com/es | grep -i "cache-control"
curl -sI https://kjslaw.com/contact/ | grep -i "^HTTP\|^location"   # one 308 to /contact
```

Public pages must not show `no-store`; the CDN header shows `HIT` after the first request. In Lighthouse, "Page prevented back/forward cache restoration" should be gone, and the best-practices diagnostics for content sniffing, referrer, clickjacking, and origin isolation should pass. `npm run build` lists every page with the static marker (`○`/`●`), and only `/api/consultation`, `/robots.txt`, and the 404 as dynamic (`ƒ`).

## Metadata rules for the public pages

- Every page has a unique title tag and a meta description. Migrated posts without an excerpt get one from their opening text (`legacyPostDescription`); image-only posts get a dated journal line. A migrated post is offered to search engines only when `legacyPostIsIndexable` is true: not thin (`legacyPostIsThin`) and not withheld (`noindexReason` in `legacyPosts.json`, set for posts whose legal content still needs attorney review; see [website-content-compliance.md](website-content-compliance.md)). Otherwise the page is `noindex, follow` and left out of the sitemap; its URL keeps working for old links. `src/lib/marketing/__tests__/legacy-posts.test.ts` checks the sitemap and the robots rule agree, and that archived titles and descriptions are unique and never reuse a city page, guide, or news title.
- City pages (`ServiceAreaPage`) describe a `Service` in that city with the firm as `provider`, like the practice pages. The firm's single `LegalService` node, with its address, is emitted once by the root layout; a second `LegalService` per city would need its own address.
- Practice-overview pages carry their own title tags so they never duplicate the home pages.
- A missing article or guide (`/news/<unknown>`, `/guides/<unknown>`, `/es/noticias/<unknown>`) returns 404 with the not-found title ("Page not found | Kyle Scott Law", "Página no encontrada | Kyle Scott Law"), no description or canonical link, and exactly one robots tag: Next's own `noindex`, which `notFound()` always adds (`robots: null` in the not-found metadata keeps the layout's "index, follow" out). The pages' `generateMetadata` returns the same metadata for an unknown slug. Test: `src/app/__tests__/site-not-found-metadata.test.ts`; check with `curl -s <url> | grep -E '<title>|name="robots"'`.
- The KJS monogram icon set lives in `public/icons` and `src/app/apple-icon.png`; `src/app/manifest.ts` serves the web manifest, and both root layouts export the theme colour.
- **The home hero photo** (`public/kjs-team.jpg`, EN and ES) is a 3840×2560 master of the owner's upscaled team photo (2026-10-01): white frame trimmed, cut to 3:2. Browsers never download it as is. Next's image optimizer serves AVIF or WebP at the width each screen needs, up to 3840 px.
  - The `sizes` attribute must describe how wide the photo really renders. On desktop that is 52–56% of the viewport (748 px at 1440, 1,005 px at 1920, 1,389 px at 2560, 2,157 px at 3840), so it reads `(max-width: 1023px) 94vw, 57vw`.
  - It used to say `720px`, so large monitors fetched a ~750 px copy and stretched it, which looked soft.
  - Change `sizes` whenever the hero layout changes.
  - The team page's group photo (/meet-the-team, /es/equipo) is the same master. It renders full width up to 1,280 px (`.team-hero-photo`), so its `sizes` reads `(max-width: 1430px) 94vw, 1280px`; before, it had no `sizes` and used a 900×600 copy.
- The browser-tab icon, `src/app/favicon.ico` (16, 32, 48 and 64 px; Google's search results use it too), is the firm's logo mark: the grey K and the first two columns of blue squares, cropped from `public/kjs-logo.jpeg` onto a white rounded tile (2026-10-01). It replaced create-next-app's default Vercel triangle, which the site had shipped until then. The logo exists only at 170×120, so the icon stops at 64 px rather than being enlarged. Browsers cache favicons hard, and Google refreshes a result's icon only when it recrawls the home page.
- **robots.txt is decided by the request's host** (`src/app/robots.ts`): on `kjslaw.com` it admits crawlers (everything but `/api/`) and names the sitemap; on any other host — a `*.vercel.app` deployment, a preview, localhost — it answers `Disallow: /`. (`www.kjslaw.com` never gets that far: `next.config.ts` sends every www request to `https://kjslaw.com` with a 308, first rule of all; www stays attached to the Vercel project for its certificate.) So a staging copy is never indexed next to the real site, and pointing the domain at the deployment needs no setting changed. Test: `src/app/__tests__/robots.test.ts`.
- Re-check after content changes: build, start the production server, and crawl every prerendered route for title, description, canonical, single H1, and language alternates (the check used in the launch pass).
