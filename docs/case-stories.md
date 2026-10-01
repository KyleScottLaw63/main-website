# Case Stories

## Purpose

A case story tells how a result came about, from what happened to the verdict or settlement, on its own page at `/results/<slug>`. The "Case stories" section of the results page lists the stories together with the firm's published case announcements, newest first. Stories are attorney advertising (California Rules of Professional Conduct 7.1–7.5), like every result on the site.

## The rules

- **Approval.** A story goes on the site only after Kyle J. Scott approves it. The firm drafts stories for review ("Case Stories — Draft for Review"). On 2026-10-01 the owner reported all twelve stories in the draft of 2026-09-30 approved, including those the draft had held.
- **Wording.** The story text is the approved text, word for word. The site splits it into short chapters with plain headings ("What happened", "The injuries", "The case") and adds nothing else. The one-sentence summary uses only facts from that text.
- **No defendant named on /results (2026-10-01).** The summary, which /results shows, names the kind of party only ("A transit bus", "The defense"), never which one. The story page's approved text is unchanged.
- **Never the drafts' internal material:** internal amounts, review notes, sources, "before publishing" notes, co-counsel, client names, case numbers, or any name the draft leaves out.

## How a story attaches to a result

- **Story with a published amount.** It belongs to that result's card: the card names it (`story` in `results.ts`), and the story takes the card's amount, title, outcome, and year, so the two never disagree. A story never adds a second card for a result already listed. When the draft matches a card on the site, the story attaches to it, and the card's title can be corrected from the story (the $700,000 card's was).
- **Confidential settlement.** It is told without its amount, as the draft requires ("A confidential amount appears on the website only as 'Confidential settlement'").
  - It has no card; `confidential.title` carries its title.
  - The figure reads "Confidential", and the outcome reads "Confidential settlement".
  - A year shows only where the story's own text states one.
  - It never links to a result card, so the page never pairs the story with an amount.
- **Confidential, then published with consent (2026-10-01).** On the attorney's instruction, with written consent to publish the amount, seven settlements the draft treated as confidential show their amounts. Each story attaches to its card like any other, and the card takes the story's title, court, and practice category; the $960,000 ballpark settlement has a new card. On the firm's instruction (2026-10-01), these stories no longer say their terms are confidential ("settled in 2024", not "settled in 2024 on confidential terms"); the rest of the approved text is unchanged.
- **Fixed labels.** The three flagship labels stay fixed (AGENTS.md). The $5.75M story sits behind the unchanged flagship card.
- **Order.** `resolved` (YYYY-MM, from the firm's records) orders the stories newest first. It is never shown.

## The page

`src/app/(site)/results/[slug]/page.tsx` renders `CaseStoryPage` (`src/components/marketing/CaseStoryPage.tsx`), statically generated from `caseStories`.

- **Hero (navy):** the outcome and year, the figure (the amount, or "Confidential"), the title as the page's only `<h1>`, the summary, and a "Case at a glance" panel: outcome, year, court, and practice area.
- **Body:** the story in numbered chapters. Where the story states two figures, such as what the defense argued the case was worth and the verdict, they are drawn to scale.
- **Disclaimer and sidebar:** the results disclaimer; a sidebar with the tap-to-call number, the case-review link, the practice page, and the firm's original announcement when it published one.
- **"More case stories":** the three most recent other stories.
- **Metadata:**
  - Title: "<amount> <outcome>: <title> | Kyle Scott Law", or "Confidential settlement: <title> | Kyle Scott Law".
  - The summary as description; canonical `/results/<slug>`.
  - English only: hreflang points at the page itself.
  - An `Article` + `BreadcrumbList` graph, and the sitemap.

## On /results

- **One section, "The story behind the result."** `caseStoryLinks()` merges every case story with the firm's published case announcements (news articles of kind `case`: the $2.2M settlement and the Court of Appeal new trial), newest first.
- **Left out (2026-10-01).** On the firm's instruction, the list (and "More case stories") leaves out the `school-counselor-abuse-settlement` story, which repeats the firm's own $2.2M announcement. Its page stays up, and the $2.2M card in the full list links to it. (The $2.3M Riverside verdict's announcement, once listed here, was deleted with the verdict: [website-content-compliance.md](website-content-compliance.md).)
- **What shows.** The six most recent appear as compact cards. The rest sit behind a native `<details>` ("Show all 13 case stories"), which needs no script and keeps every link in the HTML.
- **Card links.** A flagship or ledger card whose result has a story is clickable as a whole ("Read the case story").
- **Spanish.** The Spanish results page links no stories.

## Stories (added 2026-10-01)

From "Case Stories — Draft for Review (updated 2026-09-30 v2)":

| Page | Shows | Resolved |
|---|---|---|
| `fontana-intersection-crash-settlement` | $2.7M settlement · 2026, a new card: San Bernardino Superior Court, combined for five injured people | 2026-09 |
| `nursing-facility-pressure-wound-settlement` | Confidential | 2026-03 |
| `batting-practice-head-injury-settlement` | $880,000 settlement, card retitled from the story (consent, 2026-10-01) | 2026-01 |
| `crosswalk-pedestrian-settlement` | $1,450,000 settlement · 2024, card retitled from the story (consent, 2026-10-01) | 2024-09 |
| `school-counselor-abuse-settlement` | $2.2M settlement · 2024, the firm's 2024 card retitled from the story (consent, 2026-10-01); not in the list on /results | 2024-02 |
| `ballpark-warm-up-throw-settlement` | $960,000 settlement, a new card: Orange County Superior Court (consent, 2026-10-01; the order is not sealed) | 2023-04 |
| `store-floor-fall-settlement` | $800,000 settlement · 2023, card retitled from the story (consent, 2026-10-01) | 2023-02 |
| `chain-reaction-freeway-crash-settlement` | $650,000 settlement · 2022, card retitled from the story (consent, 2026-10-01) | 2022-05 |
| `waterpark-pool-deck-fall-settlement` | $697,500 settlement, card retitled from the story (consent, 2026-10-01) | 2020-02 |
| `student-skull-fracture-verdict` | $5.75M jury verdict · 2019 (flagship card) | 2019-09 |
| `octa-bus-crash-verdict` | $928,493.12 jury verdict · 2017, drawn against OCTA's $157,000 | 2017-04 |
| `freeway-rear-end-settlement` | $700,000 settlement · 2015, card retitled from the story | 2015-08 |

The draft's review notes flagged risks for the attorney; the site records none of them. Notes:
- **Confidentiality clauses.** Several settlement agreements are confidential, two of them ($1,450,000 and $800,000) even as to the fact of settlement. On 2026-10-01 the attorney reported written consent to publish seven of the amounts, and that the ballpark minor's compromise is not sealed.
- **$2.7M timing.** The settlement's funding and the court's approval of the minors' shares were pending on 2026-09-30.
- **Pending claims.** Claims against another defendant in the nursing-facility matter were still being litigated, and its settlement was partial. Its story stays confidential.
- **$700,000 release.** It was read by OCR.

## Adding a story

1. Kyle approves the story (the draft's decision box).
2. Add it to `caseStories`:
   - slug, summary, court, and practice area;
   - the approved text as chapters;
   - `resolved` and `published`;
   - for a confidential settlement, `confidential: { title }` and no card.
3. For a published amount, set `story: '<slug>'` on its result card in `results.ts`, or add the card.
4. Run `npm run check`. `src/lib/marketing/__tests__/case-stories.test.ts` fails if:
   - a story has the wrong number of cards (one, or none if confidential);
   - a dollar figure appears other than the result's own and its comparison's (none at all in a confidential story);
   - a confidential story shows a year its text does not state;
   - the drafts' internal wording appears;
   - a practice page or announcement is not a real page;
   - a title is duplicated or a summary is too long;
   - the combined list is not newest first.

   `src/components/marketing/__tests__/case-story-page.test.tsx` renders every story and the results page's six-plus-rest section.
5. Build, start, and check the page's title, description, canonical, and single `<h1>` (docs/public-site-rendering.md).
