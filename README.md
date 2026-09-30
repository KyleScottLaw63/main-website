# Kyle Scott Law — website

The public website of **Kyle Scott Law** (kjslaw.com), an Orange County personal-injury firm: practice-area and city pages, case results, team, testimonials, legal guides, news (including the 201 archived articles from the old WordPress site), and the Spanish site under `/es`.

It is a standalone front end. The firm's staff and client app (Matterfold) is deployed separately; the consultation form and the chat hand inquiries to it over a token bridge ([docs/website-lead-intake-bridge.md](docs/website-lead-intake-bridge.md)). The website itself has no database and stores nothing.

## Stack

Next.js 16.3 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Vitest. Every page is statically generated (475 at build time) and served from the CDN; only `/api/consultation`, `/robots.txt`, and the 404 run on the server.

## Run it

Node.js 20.9 or newer.

```bash
npm install
npm run dev          # http://localhost:3012
```

## Checks

```bash
npm run check        # lint + typecheck + unit tests
npm run build        # production build
npm start            # production server on http://localhost:3012
npm run verify:redirects   # (with npm start running) every old kjslaw.com URL: 301 → 200 in one hop, or 410
```

## Deploy (Vercel)

1. Vercel → **Add New… → Project** → import this GitHub repository.
2. Framework preset **Next.js** (detected), root directory **`./`**, build command and output left at their defaults. No environment variables are needed to deploy.
3. **Deploy.** The `*.vercel.app` address serves the full site, with `robots.txt` set to `Disallow: /` so it is never indexed.

### Going live on kjslaw.com

1. Vercel → Project → **Settings → Domains**: add `kjslaw.com` and `www.kjslaw.com`, with **www redirecting to the apex** (`kjslaw.com` is the canonical domain; every canonical link, the sitemap, and the structured data use it). Point the DNS records Vercel shows at the registrar.
2. Nothing else to switch: on `kjslaw.com` itself, `robots.txt` admits search engines and names the sitemap automatically (it is decided by the request's host).
3. Right after cutover: `node scripts/verify-redirects.mjs https://kjslaw.com` (all 445 old URLs), then submit `https://kjslaw.com/sitemap.xml` in Google Search Console.
4. Connect the form (below) **before** cutover if possible: until it is connected, the form and the chat ask visitors to call 714-544-1460 instead of taking their inquiry.

### Connecting the form to the firm app

Set two environment variables in this Vercel project, then redeploy:

| Variable | Value |
|---|---|
| `MATTERFOLD_INTAKE_ENDPOINT` | `https://<app host>/api/public/leads` |
| `MATTERFOLD_INTAKE_TOKEN` | the same value as the app's `WEBSITE_INTAKE_TOKEN` |

The app's Settings → Company Profile name must be exactly **Kyle Scott Law** (the consent wording the app stores names the firm from there). `npm run check:intake` (with the same two values in `.env.local`) confirms the connection and that the consent wording matches word for word, without submitting anything. Full steps: [docs/website-lead-intake-bridge.md](docs/website-lead-intake-bridge.md).

## Where things live

| Path | What |
|---|---|
| `src/app/(site)` | English pages and root layout |
| `src/app/(site-es)/es` | Spanish pages and root layout |
| `src/app/api/consultation` | the form and chat endpoint (forwards to the firm app) |
| `src/components/marketing` | page components, header/footer, forms, chat |
| `src/lib/marketing/data` | page content: practice areas, results, guides, news, archived posts, redirect rules |
| `src/lib/leads` | the lead bridge client and the consent wording shared with the app |
| `src/lib/site-proxy.ts` | 410s for dead WordPress paths, one-hop trailing-slash redirects, the 404's language |
| `public/` | photos, icons, share images, `llms.txt` |
| `data/redirect-map.csv` | every URL the old site published (the redirect gate's input) |
| `docs/` | how the site works: rendering, redirects, content rules, lead intake |

Rules for anyone (or any agent) editing the site — the canonical phone numbers, the fixed verdict labels, the content rules — are in [AGENTS.md](AGENTS.md).
