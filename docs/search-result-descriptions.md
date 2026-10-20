# Search-result descriptions

What Google shows under a page's title. In October 2026 the site appeared in search about 511,000 times and was rarely clicked, and many descriptions ran 170 to 250 characters, so Google cut them off mid-sentence. Every description is now short, specific to its page, and ends in a call to action.

## Where each description lives

| Page | Field |
| --- | --- |
| Practice pages (`practiceAreas.ts`, `practiceAreasRoundFour.ts`, `spanishPracticeAreas.ts`, `spanishPracticeAreasRoundFour.ts`) | `metaDescription` |
| City pages (`serviceAreas*.ts`, `spanishServiceAreas*.ts`) and city + case pages (`cityPracticePages.ts`, `spanishCityPracticePages.ts`) | `metaDescription` |
| Guides (`legalGuides.ts`, `spanishLegalGuides.ts`) | `metaDescription`; the guide's own `description` is shown on the page and in the library and is not the search text. The routes use `guide.metaDescription ?? guide.description` for the page, the openGraph card, and the twitter card. |
| Why hire us, areas we serve | `metaDescription` in `whyHireUs.ts` (EN/ES) and `areasWeServe.ts` |
| Home, practice areas, results, team, contact, testimonials, guides, news (EN) and their Spanish twins | `metadata.description` in each page file |

The visible page copy (`description`, intros) is a separate field and never changes with these.

## Rules

- **Length:** 120 to 155 characters, counted by code. Never over 155. (The test accepts 90 to 155.)
- **Front-load the phrase the page targets:** "Tustin dog bite lawyer...", "Abogado de mordeduras de perro en Santa Ana...".
- **Unique** within its language.
- **One hook from the page's own content:** a road, a district, a kind of case. No figure, no digit (so roads are named, never numbered: "Jamboree Road", not "the 405"), no dollar amount, no case result.
- **End with a call to action:** English "Free consultation." or "Call 714-544-1460 for a free consultation."; Spanish "Consulta gratuita." or "Llame al 714-544-1460."
- **Facts allowed:** Kyle Scott Law, attorney Kyle J. Scott, the Tustin office, since 1991, free consultation, English or Spanish, and the fee-only line "no fee unless there is a recovery" ("sin honorarios a menos que haya una recuperación"), used sparingly.
- **Never:** "no fee or costs", "no fees or costs", "risk-free", "no financial risk"; "best", "top", "#1", "leading", "expert", "specialist"; a guarantee; a party from the firm's cases; any phone number but 714-544-1460.
- **Spanish** is natural Spanish with usted and says what its English twin says, no more.

## Fee-only lines

Four descriptions state the fee-only line: the personal-injury practice page and why-hire-us, in English and Spanish. It needs no cost disclosure while the client never repays advanced costs (Business and Professions Code § 6157.2; [website-content-compliance.md](website-content-compliance.md)). If the terms ever change, those four need the disclosure. The test fails on any other fee wording.

## Tests

`src/lib/marketing/__tests__/meta-descriptions.test.ts` checks every practice, city, city + case, and guide record in both languages (plus why-hire-us and areas-we-serve): present (a guide must have its own), 90 to 155 characters, unique per language, no digit but 714-544-1460 and 1991, no `$` or `%`, no superlative or specialist word, no fee wording but the approved line, no party name, no other phone number, and the call to action at the end. The ten core pages' descriptions live in page files and are held to the same rules by review.
