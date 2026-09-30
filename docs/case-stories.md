# Case Stories

## Purpose

A case story tells how a published result came about, from what happened to the verdict or settlement, on its own page at `/results/<slug>`. The results page links each story from its card and lists all of them in a "Case stories" section. Stories are attorney advertising (California Rules of Professional Conduct 7.1–7.5), like every result on the site.

## The rule: only what the attorney approved

- A story goes on the site only after Kyle J. Scott approves it. The firm drafts stories for review ("Case Stories — Draft for Review") and gives each one a status. Only a story approved for publication is added.
- Never a matter on hold. That covers confidential settlements (agreements that bar disclosing their terms; some bar disclosing even that a settlement happened), matters not yet funded, and minors' compromises awaiting court approval.
- Never the drafts' internal material: internal amounts, review notes, sources, "before publishing" notes, co-counsel, client names, case numbers, or any name the draft says to leave out.
- The story text is the approved text, word for word. The site splits it into short chapters with plain headings ("What happened", "The injuries", "The trial") and adds nothing else. The one-sentence summary above the story uses only facts from that text.

## How a story attaches to a result

- `src/lib/marketing/data/caseStories.ts` holds the stories. A result card with a story names it (`story` in `results.ts`), and the story takes the card's amount, title, outcome, and year, so a card and its story never disagree.
- A story never gets a card of its own. When the draft matches a card already on the site, the story attaches to that card. The card's title can be corrected from its story, as the $700,000 card's was.
- The three flagship labels stay fixed (AGENTS.md). The $5.75M story sits behind the unchanged flagship card.

## The page

`src/app/(site)/results/[slug]/page.tsx` renders `CaseStoryPage` (`src/components/marketing/CaseStoryPage.tsx`), statically generated from `caseStories`.

- **Hero (navy):** the outcome and year, the amount, the card's title as the page's only `<h1>`, the one-sentence summary, and a "Case at a glance" panel: outcome, year, court, and practice area.
- **Body:** the story in numbered chapters. Where the story states two figures, such as what the defense argued the case was worth and the verdict, they are drawn side by side to scale.
- **Disclaimer:** "Every case is different. Prior results do not guarantee a similar outcome. This page describes a past case and is not legal advice."
- **Sidebar:** the tap-to-call number, the case-review link, the practice page, and the firm's original announcement when it published one.
- **"More case stories":** cards for the other stories.
- **Metadata:** the title "<amount> <outcome>: <card title> | Kyle Scott Law", the summary as description, and the canonical `/results/<slug>`. Stories are English only: no Spanish page exists, so hreflang points at the page itself. The page carries an `Article` + `BreadcrumbList` structured-data graph and is in the sitemap.
- **On `/results`:** a flagship or ledger card that has a story is clickable as a whole and says "Read the case story". The "Case stories" section shows the story cards. The Spanish results page links no stories.

## Stories added 2026-10-01

These come from "Case Stories — Draft for Review (updated 2026-09-30 v2)": the three it marks ready for review. Each needs Kyle's approval before it is deployed.

| Page | Card | Notes |
|---|---|---|
| `/results/student-skull-fracture-verdict` | $5.75M jury verdict · 2019 | Flagship card unchanged; links the firm's November 2019 announcement |
| `/results/octa-bus-crash-verdict` | $928,493.12 jury verdict · 2017 | Card unchanged; draws OCTA's $157,000 valuation against the verdict; links the April 2017 announcement |
| `/results/freeway-rear-end-settlement` | $700,000 settlement · 2015 | Card retitled from the story; the old "medical-device salesperson" has no support in the complaint or release. The release was read by OCR, so Kyle confirms it has no confidentiality clause |

The draft's nine other stories (2, 3, 4, 5, 7, 8, 9, 11, 12) are on hold: confidential agreements, one not yet funded. They are not on the site, not even as drafts in the code.

## Adding a story

1. Kyle approves the story (the draft's decision box).
2. Add it to `caseStories`: slug, summary, court, practice area, the approved text as chapters, and `published`.
3. Set `story: '<slug>'` on its result card in `results.ts`.
4. Run `npm run check`. `src/lib/marketing/__tests__/case-stories.test.ts` fails if a story:
   - has no card, or more than one;
   - states a dollar figure other than its own result's or its comparison's;
   - carries the drafts' internal wording;
   - links a practice page that does not exist, or an announcement that is not an archived post;
   - has a duplicate title or an over-long summary.

   `src/components/marketing/__tests__/case-story-page.test.tsx` renders every story (one `<h1>`, the disclaimer, tap-to-call, structured data) and checks that the results page links each one.
5. Build, start, and check the page's title, description, canonical, and single `<h1>` (docs/public-site-rendering.md).
