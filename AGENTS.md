# AGENTS.md — working rules for the Kyle Scott Law website

The public website of Kyle Scott Law (kjslaw.com), a personal-injury firm in Tustin, Orange County, CA. A standalone Next.js front end: no database, no sign-in. The firm's staff and client app (Matterfold) is a separate deployment; this site reaches it only through the lead bridge.

## Hard rules (violating these is a wrong answer, not a style choice)

1. **Canonical firm facts only.** Kyle Scott Law · 17671 Irvine Blvd., Suite 210, Tustin, CA 92780 · **714-544-1460** (every instance tap-to-call, `tel:+17145441460`) · fax 714-544-1463 · toll-free 866-757-0959 · **Team@kjslaw.com** (`firmIdentity.email`; never Info@, `site-email.test.ts`) · Mon–Fri 8:30 AM–5:00 PM. The old site published wrong numbers — never use 544-1450, 544-1469, 540-1460, 943-423-3944, or the placeholder (949) 555-0134. `site-phone-numbers.test.ts` enforces this across source and data.
2. **Verdict labels are fixed:** $6.8M school negligence · $6M abuse case · $5.75M brain injury. Never relabel.
3. **Fees statement lives in one place**: `src/lib/marketing/no-recovery-terms.ts` ("No fees or costs unless there is a recovery."). Never write another copy, and never "risk-free" / "no financial risk" (docs/website-content-compliance.md).
4. **Testimonials are from clients only** — no staff, family, or referral sources (Rule 7.1).
5. **Pages stay static.** No `headers()`, `cookies()`, `searchParams`, `connection()`, or `force-dynamic` in `src/app/(site)` or `src/app/(site-es)` (docs/public-site-rendering.md). The Spanish site is its own root layout.
6. **Old URLs keep working.** Every URL the old WordPress site published reaches a live page in one 301, or is 410. Change redirects in `src/lib/marketing/data/redirect-rules.json` (specific before catch-alls, destination = final page) and re-run the redirect test and `npm run verify:redirects` (docs/legacy-url-redirects.md).
7. **The form never pretends.** Inquiries go only to the firm app over the bridge (`src/lib/leads/intake-bridge.ts`); no mailto, no second endpoint, no browser-side call to the app. Until `MATTERFOLD_INTAKE_ENDPOINT` and `MATTERFOLD_INTAKE_TOKEN` are set, the form tells the visitor to call. The token is server-only (never `NEXT_PUBLIC_`).
8. **Consent wording is shared with the app, word for word.** `src/lib/leads/public-lead-rules.ts` (consent sentences, SMS disclosure, `PUBLIC_CONSENT_VERSION`) must match the app's copy; a new wording is a new version on both sides together. `npm run check:intake` compares them (docs/website-lead-intake-bridge.md).
9. **No form puts fields in a URL.** A `<form>` with `onSubmit` also carries `action={submitsThroughOnSubmit}` (src/components/shared/form-submit.ts); a test scans for it.
10. **Real alt text on every image; type floor 13px; WCAG 2.1 AA.** Fictional data only in tests (555-01xx numbers, "Rosa Fictional").
11. **Results and case stories are the attorney's call.**
    - A case story (`/results/<slug>`) goes up only once Kyle J. Scott approves it (docs/case-stories.md). Never a confidential, unfunded, or court-pending matter, and never the drafts' internal amounts, sources, or review notes. A confidential settlement's amount appears only with written consent to publish it, on the attorney's instruction (seven on 2026-10-01; docs/case-stories.md).
    - Results come from the firm's own records, under the rules in docs/website-content-compliance.md ("Case results"). The firm's settlement list is internal: publish only gross amount, year, court, outcome, and case type from it, never names, case numbers, fees, or net amounts.
    - What /results shows names the kind of party a claim was against, never which one: "Claim against school district", not "LBUSD" (docs/website-content-compliance.md).

## Workflows

- `npm run dev` → http://localhost:3012 · `npm run check` (lint, typecheck, tests) before every commit · `npm run build` must stay green.
- Content refreshes: build, `npm start`, then crawl every sitemap URL for title, description, canonical, one `<h1>`, and language (docs/public-site-rendering.md).
- Docs: every behaviour has a doc in `docs/` (subject-first kebab-case names). A change isn't done until its doc says how it works.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
