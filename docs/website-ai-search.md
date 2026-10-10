# Website AI search readiness

## Purpose

People increasingly ask an assistant (ChatGPT, Claude, Perplexity, Gemini, Copilot) to find them a lawyer instead of typing into Google. Those assistants answer from three things: a web search (ChatGPT and Copilot use Bing; Claude and Perplexity run their own crawlers and search), the business listings they can read (Google Business Profile, Bing Places, Apple Maps, Yelp, Avvo, Justia), and the plain facts a page states about itself. This doc records what the site does for each, and what is outside the repo.

## What the site does

1. **Every crawler is admitted.** `src/app/robots.ts` answers `User-agent: * / Allow: /` on kjslaw.com (and `Disallow: /` on every other host). No AI crawler is singled out, so GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Bingbot, and Googlebot all fetch pages; checked on 2026-10-09 with each user agent against the live site (all 200). If Vercel's bot protection or a firewall rule is ever turned on for the project, exempt these agents and repeat the check.
2. **`public/llms.txt`** is the plain-text summary an assistant reads first. It states, in one paragraph and a facts list, what the firm is, who leads it (bar admission 1991, firm since 2003), what it handles, where (the county, the ten cities with pages, the state), hours, languages, the fee-only line, the three fixed verdict labels, the profiles elsewhere, and then every practice, city, and guide page in both languages. `src/lib/marketing/__tests__/llms-txt.test.ts` fails when a practice, city, or guide page is missing from it, and when it carries any dollar amount beyond the three labels and the home page's "$50+ million". Keep it factual: no superlatives ("best", "top"), no statistics, no second copy of the fees statement (rule 3 in AGENTS.md).
3. **The `LegalService` node** on every page (`src/lib/marketing/site-layout.tsx`) carries the same facts machine-readably: `description`, `alternateName` (KJS Law), `foundingDate`, address, `geo`, `hasMap`, `openingHoursSpecification`, `knowsLanguage`, `areaServed` (county, each city page's city, state), `hasOfferCatalog` (one `Service` per practice page, in the page's language, built from `practiceAreas` / `spanishPracticeAreas`), `sameAs` (the firm's profiles), and the founder's Person entity. The attorney's Person node (`structured-data.ts`) carries his bar number, education, `knowsAbout`, and his profile links. Guides carry `Article` with `author`/`reviewedBy` and `FAQPage`; practice pages carry `FAQPage`.
4. **Pages answer the question in the words people use.** Guides are titled as the question ("How Much Is a Personal Injury Case Worth in California?"), open with a direct answer, and carry FAQs; practice and city pages carry FAQs in the same form. Titles and H1s use both "lawyer" and "attorney" across the site, and each city page names the city in its title. The home page's first paragraph states the firm, the office city, and the case types in one sentence, which is what an assistant quotes.
5. **IndexNow.** `public/indexnow-key.txt` holds the site's IndexNow key (served at `/indexnow-key.txt`, which the engines fetch to confirm ownership). `npm run submit:indexnow` posts every sitemap URL (or the paths given as arguments) to api.indexnow.org, which tells Bing, Yandex, Naver, and Seznam to fetch them now. Run it after a content release, after the deployment is live. Google ignores IndexNow; use Search Console's URL inspection for Google (docs/public-site-rendering.md). A 200 or 202 means accepted; a 422 means a URL was not on kjslaw.com or the key file was unreachable.

## Outside the repo (needs the firm's logins)

- **Bing Places for Business.** Bing shows a business card for the firm ("Legal services in Tustin, CA", 2026-10-09) that nobody has claimed; the category should be "Personal injury attorney" and the hours, photos, and description should match Google. Bing Places can import the Google Business Profile in one step.
- **Bing Webmaster Tools.** Import the property from Google Search Console (one click after signing in with the same Google account) to see what Bing has indexed and to submit the sitemap there too.
- **Listings consistency.** Assistants cross-check the name, address, and phone across Google, Yelp, Avvo, Justia, BBB, and Yellow Pages. The errors found on 2026-10-06 are listed in the firm's notes and need the owners' logins to fix.
- **Reviews.** Assistants quote review counts and ratings from Google and Yelp; the site itself makes no rating claim beyond the live Google rating on the home page.

## Checking

```bash
curl -A "Mozilla/5.0 (compatible; GPTBot/1.0)" -o NUL -w "%{http_code}" https://kjslaw.com/
curl https://kjslaw.com/llms.txt
curl https://kjslaw.com/indexnow-key.txt
```

Then search Bing for `"Kyle Scott Law" Tustin` and check that kjslaw.com pages and the business card appear, and ask an assistant with web search "personal injury lawyer in Tustin, California" to see what it quotes and from where.
