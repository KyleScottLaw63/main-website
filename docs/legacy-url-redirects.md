# Legacy URL Redirects

## Purpose

The previous kjslaw.com (WordPress) published 450 URLs that Google, directories, and clients' bookmarks still point at. Every one of them must land on a live page after cutover in one permanent redirect — no chains, no loops — so the rankings and links those URLs earned carry over. This is a launch gate.

## Three mechanisms

| Old URL kind | Mechanism | Where |
|---|---|---|
| Pages with a successor (`/contact-us`, Tustin doorway pages, "why hire us" silo → `/why-hire-us`, city guides, categories, tags, feeds) | 301 in `next.config.ts` `redirects()` | `src/lib/marketing/data/redirect-rules.json` — ordered, specific rules before catch-alls |
| The dated blog permalinks (`/2019/03/12/slug/`): 201, less the two withdrawn below | 301 in `next.config.ts`, generated from the migration data | `src/lib/marketing/data/legacyPosts.json` → `redirects[]` (`legacyPath` → `/news/<slug>`). The `[year]/[month]/[day]/[slug]` route remains as a fallback |
| Gone for good (WordPress internals, filler pages, withdrawn posts) | 410 from the proxy, directly, with or without the trailing slash | `GONE` list in `src/lib/site-proxy.ts` |

URLs that kept their exact path need nothing: the homepage, `/practice-areas`, `/meet-the-team`, `/testimonials`, `/contact`, the seven practice-area pages, and the three city pages (`/anaheim-personal-injury-attorney`, `/irvine-personal-injury-attorneys`, `/santa-ana-personal-injury-attorney`, rebuilt at their old URLs as service-area pages in `src/lib/marketing/data/serviceAreas.ts`). The old city guides `/about-orange-california` and `/about-costa-mesa-california` redirect to the Orange and Costa Mesa city pages added in content round 1 (2026-10-06). Before that they went to `/personal-injury-lawyer-orange-county`.

## Trailing slashes

WordPress URLs end in `/`; this site's canonical URLs have none. Every old URL reaches its page in **one hop**, with or without the slash:

- `next.config.ts` sets `skipTrailingSlashRedirect: true`. Without it, Next answers `/old-page/` with its own 308 to `/old-page` before any rule runs, so each WordPress URL took two hops (that 308, then the rule's 301).
- Next matches every rule in `redirects()` with or without a trailing slash (it compiles each source to end in `(?:/)?$`), so `/contact-us/` and `/contact-us` both get the rule's single 301 straight to `/contact`, query string kept. Each destination must be the final page. `src/lib/marketing/__tests__/legacy-url-redirects.test.ts` checks this with Next's own route compiler: every rule answers both forms, no destination is redirected again, and no rule matches an `/api` path (the `/…/feed` catch-all is `/:path((?!api/).+)/feed` for that reason).
- Every other slashed URL gets one 308 to the same URL without the slash, query kept, from the proxy (`trailingSlashRedirect()` in `src/lib/site-proxy.ts`): `/contact/` → `/contact`, `/es/contacto/` → `/es/contacto`. It runs right after the `GONE` check, so a retired path answers 410 at once, slash or not.
- Never redirected — served exactly as requested, slash or not: `/api` (the consultation form's endpoint), `/_next` assets, `/.well-known`, and file names such as `/robots.txt/` (tests: `src/lib/__tests__/site-proxy.test.ts`).

## Verification

```bash
npm run build && npm start                  # production server on http://localhost:3012
npm run verify:redirects                   # against http://localhost:3012
node scripts/verify-redirects.mjs https://kjslaw.com   # after cutover
```

The script fetches every crawled old URL (`data/redirect-map.csv`, from the 2026-08-31 audit of the old site) plus every legacy permalink three ways — as published (`/old-page/`), without the slash (`/old-page`), and as published with a query string — follows redirects by hand, and requires: `GONE` paths answer 410 directly, with no redirect first; everything else ends on a 200 after at most one redirect, and that redirect is permanent (301 or 308) — a second hop (a chain) or a repeated URL (a loop) fails; the final URL has no trailing slash and still carries the query string; legacy permalinks end on their canonical `/news` path; an old URL whose planned destination in `redirect-map.csv` (`new_path`) is a live page on the target server ends exactly there; other exact rules end on their destination; everything else ends on a 200.

The CSV check is what keeps the rules honest once a planned page ships. The six "why hire us" articles (`/choosing-a-lawyer-with-excellent-credentials`, `/long-history-of-trial-experience`, `/full-and-fair-financial-compensation`, `/are-your-injuries-serious`, `/compensation-from-insurance-company`, `/contact-with-insurance-company`) pointed at `/meet-the-team` after `/why-hire-us` existed; comparing against the rules file alone could not notice. Planned destinations the site renamed (`/blog` → `/news`, `/service-areas/…`, `/privacy-policy` → `/privacy`) redirect themselves, so they are not live and those rows fall back to the rules. The summary line reports how many rows were held to the CSV.

One post moved: `/news/tired-insurance-adjuster-telling-no-case-call-kyle-scott-949-423-3944` became `/news/tired-insurance-adjuster-telling-no-case-call-kyle-scott`, because the old slug carried a retired phone number. Its 2017 WordPress permalink redirects straight to the new path (`legacyPosts.json` → `redirects[]`); the old `/news` path existed only before launch.

A second moved on 2026-09-30: `/news/california-statute-limitations-car-accident-code-civil-procedure-%c2%a7-335-1` became `…-civil-procedure-335-1`. Its slug held the literal text `%c2%a7` (an encoded §); Vercel decodes a path before it looks for the page, so the page answered 404 there while a local `next start` served it. The 2014 WordPress permalink still redirects in one hop, now to the plain path. Every article address is plain lowercase letters, digits, and hyphens (`legacy-posts.test.ts`), and the archive index is regenerated, never hand-edited: `node scripts/build-legacy-news-index.mjs` (`--check` compares).

Two posts withdrawn on 2026-10-01, on the firm's instruction: the $2.3M Riverside jury verdict's announcement of Dec. 26, 2024 (`/news/riverside-jury-verdict-2-3-million`, `/es/noticias/veredicto-jurado-riverside-2-3-millones`) and the archived post of Aug. 12, 2021 titled with it (`/news/kyle-scott-law-delivers-justice-475000-slip-fall-settlement`). Their WordPress permalinks left `legacyPosts.json` → `redirects[]`, and those permalinks and the pages answer 410 from the `GONE` list, so search engines drop them rather than follow a redirect (`site-proxy.test.ts`). `redirect-map.csv` keeps its audit rows; the `GONE` check takes precedence over them.

## Adding or changing a redirect

Edit `redirect-rules.json` (a `why` per rule is required by convention), keep specific sources above catch-alls, point each rule at the final page (never at a URL that redirects again), and re-run `npx vitest run src/lib/marketing/__tests__/legacy-url-redirects.test.ts` and the script. The dev server must restart to pick up a `redirect-rules.json` change (`next.config.ts` reads it at startup). `GONE` paths are regexes in `src/lib/site-proxy.ts` (mirrored in `scripts/verify-redirects.mjs`); list a file name there with and without its slash (`/^\/wp-login\.php\/?$/`), because file names are never normalized.
