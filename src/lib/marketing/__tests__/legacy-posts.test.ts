import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { legalGuides } from '@/lib/marketing/data/legalGuides';
import {
  legacyArchiveNoticeText,
  legacyPostDescription,
  legacyPostIsIndexable,
  legacyPostPlainText,
  legacyPosts,
  legacyPostSummary,
  legacyRedirects,
} from '@/lib/marketing/data/legacyPosts';
import { newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import { serviceAreas } from '@/lib/marketing/data/serviceAreas';
import { SITE_URL } from '@/lib/marketing/site';

const ROOT = process.cwd();

describe('archive search index (public/data/legacy-news-index.json)', () => {
  it('is exactly what scripts/build-legacy-news-index.mjs generates from legacyPosts.json', () => {
    const committed = readFileSync(path.join(ROOT, 'public/data/legacy-news-index.json'), 'utf8');
    // Same projection and format as the script: LegacyPostSummary, compact JSON, trailing newline.
    expect(committed).toBe(`${JSON.stringify(legacyPosts.map(legacyPostSummary))}\n`);
  });
});

describe('links inside archived articles', () => {
  // The WordPress export dropped the slash after the domain: https://kjslaw.comorange-county-…/
  const MALFORMED_HOST = /https?:\/\/(?:www\.)?kjslaw\.com[a-z0-9-]/i;

  function siteFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return entry.name === '__tests__' ? [] : siteFiles(full);
      return /\.(tsx?|json|mjs)$/.test(entry.name) ? [full] : [];
    });
  }

  it('no site file or article links to a kjslaw.com host with extra characters', () => {
    const roots = ['src/app/(site)', 'src/app/(site-es)', 'src/lib/marketing', 'src/components/marketing', 'public/data'];
    const offenders = roots
      .flatMap((root) => siteFiles(path.join(ROOT, root)))
      .filter((file) => MALFORMED_HOST.test(readFileSync(file, 'utf8')))
      .map((file) => path.relative(ROOT, file));
    expect(offenders).toEqual([]);
  });

  it('links to the firm’s own pages are site-relative and point at pages that exist', () => {
    const newsPaths = new Set([...legacyPosts.map((post) => post.path), ...newsArticlesForLocale('en').map((article) => article.path)]);
    const broken: string[] = [];
    for (const post of legacyPosts) {
      for (const [, href] of post.contentHtml.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
        if (/^https?:\/\/(?:www\.)?kjslaw\.com/i.test(href)) broken.push(`${post.slug}: absolute firm link ${href}`);
        if (href.startsWith('/news/') && !newsPaths.has(href.split('#')[0])) broken.push(`${post.slug}: ${href}`);
      }
    }
    expect(broken).toEqual([]);
  });
});

describe('archived posts flagged for legal review (blog plan; Rule 7.1)', () => {
  const flagged = legacyPosts.filter((post) => post.needsLegalReview);
  const text = (post: (typeof legacyPosts)[number]) => `${post.title} ${post.excerpt} ${legacyPostPlainText(post)}`;

  it('carry no self-promotional superlatives, comparisons, or result promises', () => {
    // The firm's own comparative claims. Attributed, dated third-party facts stay (a TopVerdict
    // ranking, Expertise.com's 2021 list), as does generic advice ("find the best, most
    // experienced attorney possible") and "a veteran lawyer … that's me".
    const claims = [
      /\bamong the (?:best|top|highest)\b(?!\s+verdicts)/i,
      /\b(?:first|obvious) choice\b/i,
      /\bthe most experienced \w+ (?:\w+ )?(?:lawyer|attorney) in your area\b/i,
      /\b(?:one of|as one of) (?:those |the )?top (?:\w+ )+(?:lawyers|attorneys)\b/i,
      /\bthe best (?:\w+ )+(?:lawyer|attorney)\b[^.]*\bthat’s (?:me|Kyle Scott)/i,
      /\b(?:Tustin|Orange County|Southern California), that’s (?:me|Kyle Scott)\b/i,
      /\bthe most money\b/i,
      /\bmaximum recovery amount\b/i,
      /\bwill be excellent\b/i,
      /enlist the services of the best/i,
      /\bconsiders us to be one of the best\b/i,
      /\bsuperlatives we write about ourselves\b/i,
    ];
    const hits = flagged.flatMap((post) => claims.filter((claim) => claim.test(text(post))).map((claim) => `${post.slug}: ${claim}`));
    expect(hits).toEqual([]);
    expect(flagged.filter((post) => /^(?:best|top)\b/i.test(post.title)).map((post) => post.slug)).toEqual([]);
  });

  it('posts whose other points still need attorney review are withheld from search and the sitemap only', () => {
    const withheld = legacyPosts.filter((post) => post.noindexReason);
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
    for (const post of withheld) {
      expect(post.noindexReason!.length, post.slug).toBeGreaterThan(20);
      expect(post.needsLegalReview, post.slug).toBe(true);
      expect(legacyPostIsIndexable(post), post.slug).toBe(false);
      expect(sitemapUrls.has(`${SITE_URL}${post.path}`), post.slug).toBe(false);
      // Still reachable from its old WordPress address.
      expect(legacyRedirects.some((redirect) => redirect.canonicalPath === post.path), post.slug).toBe(true);
    }
    for (const post of legacyPosts.filter(legacyPostIsIndexable)) {
      expect(sitemapUrls.has(`${SITE_URL}${post.path}`), post.slug).toBe(true);
    }
  });
});

describe('archived posts state the law in their own text (docs/website-content-compliance.md)', () => {
  type Post = (typeof legacyPosts)[number];
  /** Everything a reader sees of a post: its title, excerpt, and body. */
  const fullText = (post: Post) => `${post.title} ${post.excerpt} ${legacyPostPlainText(post)}`;
  const sentencesOf = (text: string) => text.split(/(?<=[.!?])\s+/);
  const states = (patterns: RegExp[], text: string) => patterns.some((pattern) => pattern.test(text));

  // A post is rewritten in place, in its own voice: no editor's note, and never a word that it was
  // wrong, misstated, or corrected.
  const EDITORIAL = [
    /editor[’']?s?\s+note/i,
    /legacy-editor-note/i,
    /incorrect even when/i,
    /misstat/i,
    /\b(?:was|were) wrong\b/i,
    /\b(?:wrong|incorrect|incomplete|inaccurate) when (?:it was|they were|this was) (?:published|written)\b/i,
    /\b(?:this|the) (?:post|article|paragraph|passage|statement|sentence)(?: above)? (?:has been|was|is) (?:corrected|updated|revised|incorrect|inaccurate)\b/i,
    /\bcorrections? (?:and|were|was|have been|has been)\b/i,
  ];
  // California has had pure comparative fault since Li v. Yellow Cab Co. (1975): no 50/51 percent
  // bar, no contributory-negligence bar (legalGuides: "at any percentage").
  const MODIFIED_COMPARATIVE_FAULT = [
    /\b(?:49|50|51|fifty|fifty-one)(?:[ -]?percent\b|%| per cent\b)[^.]*?\b(?:fault|negligen|responsib|to blame|liab)/i,
    /\b(?:fault|negligen\w*|responsib\w*|blame|liab\w*)\b[^.]*?\b(?:49|50|51|fifty|fifty-one)(?:[ -]?percent\b|%| per cent\b)/i,
    /\bmodified comparative (?:fault|negligence)\b/i,
    /\bcontributory negligence\b[^.]*?\b(?:bars?|barred|prevents?|no recovery|cannot recover)\b/i,
  ];
  // Minority tolling is the private-defendant rule: a claim against a public entity is due in six
  // months whatever the child's age (Gov. Code § 911.2; CCP § 352(b); AGENTS.md hard rule 3). A post
  // that states the tolling must say so in its own text.
  const MINORITY_EXTENSION = [
    /\b(?:20th|twentieth) birthday\b/i,
    /\buntil (?:[\w’']+ ){0,3}(?:is|are|turns?|reach(?:es)?|age(?: of)?) (?:20|twenty)\b/i,
    /\btwo years (?:after|from|past) (?:turning|reaching|(?:they|he|she|the (?:child|minor)) (?:turns?|reach(?:es)?)) (?:18|eighteen|majority|adulthood)\b/i,
    /\btoll(?:ed|ing|s)?\b[^.]*?\b(?:(?:18th|eighteenth) birthday|age of (?:18|eighteen|majority)|turns? (?:18|eighteen))\b/i,
  ];
  const GOVERNMENT_CLAIM_POINT = [/\bwithin six months\b/i, /\b911\.2\b/, /\bdoes not extend\b/i];
  // The Fair Employment and Housing Act's filing deadline is three years (Gov. Code § 12960, since
  // January 1, 2020): never "one year to file" in a harassment or FEHA context.
  const HARASSMENT_ONE_YEAR = [
    /\b(?:harass\w*|FEHA|Fair Employment and Housing|DFEH|Civil Rights Department|discriminat\w*)\b[^.]*?\b(?:one|1)[ -]year\b[^.]*?\b(?:file|filing|complaint|claim|charge)\b/i,
    /\b(?:one|1)[ -]year\b[^.]*?\b(?:to file|filing deadline|file (?:a|an|your) (?:\w+ )?(?:claim|complaint|charge))\b[^.]*?\b(?:harass\w*|FEHA|DFEH|discriminat\w*)\b/i,
    /\b(?:harass\w*|FEHA|DFEH|discriminat\w*)\b[^.]*?\bwithin (?:a|one|1)[ -]year\b/i,
  ];
  /** A sentence giving the pre-2023 MICRA figure as the cap. */
  const statesOldMicraCap = (sentence: string) =>
    /\$250,000(?:\.00)?(?!\/)/.test(sentence) && /MICRA|non-?economic|pain and suffering|3333\.2|\bcap\b|consortium/i.test(sentence);
  // Other superseded figures: the pre-2023 malpractice fee scale (Bus. & Prof. Code § 6146), the
  // pre-2025 auto minimums (Veh. Code § 16056), and the old $750 DMV reporting threshold (§ 16000).
  const OTHER_SUPERSEDED = [
    /\b40\s?%[\s\S]{0,80}?\b33\.33\s?%|1st \$50K/i,
    /\$15,000[\s\S]{0,200}?\$30,000[\s\S]{0,200}?\$5,000/,
    /\$750(?:\.00)?[^.]{0,120}(?:DMV|Department of Motor Vehicles)|(?:DMV|Department of Motor Vehicles)[^.]{0,120}\$750\b/,
  ];
  // Round 5: statements rewritten in place on 2026-09-24. `stale` is true for a sentence that states the
  // law the old way; the rewritten sentence passes.
  const STALE_STATEMENTS: { law: string; stale: (sentence: string) => boolean }[] = [
    { law: 'fault: anyone whose carelessness caused the harm can be responsible, not only the more careless side', stale: (s) => /\b(?:less careful|more negligent|more at fault)\b[^.]*?\b(?:is|are) (?:legally )?(?:responsible|liable)\b/i.test(s) },
    { law: 'UIM pays for injuries only, not vehicle repairs (Ins. Code §§ 11580.2(p), 11580.26)', stale: (s) => /\b(?:vehicle|car|auto) repair/i.test(s) && /\b(?:underinsured|uninsured|UIM|UM|policy limits?)\b/i.test(s) && !/\b(?:does not|doesn['’]t|will not|won['’]t) pay\b/i.test(s) },
    { law: 'Zubillaga: the Court of Appeal reversed summary judgment and awarded nothing', stale: (s) => /\breversed\b[^.]*\bawarded\b/i.test(s) },
    { law: 'premises: no invitee/licensee/trespasser test in California (Rowland v. Christian; Civ. Code § 1714)', stale: (s) => /\binvitee\b/i.test(s) && /\blicensee\b/i.test(s) && /\btrespasser\b/i.test(s) && /\b(?:depend|status|categor)/i.test(s) && !/\b(?:no longer|does not|doesn['’]t|not)\b/i.test(s) },
    { law: 'dog bites: precautions do not avoid liability (Civ. Code § 3342)', stale: (s) => /\bprecautions?\b[^.]*\bprotect (?:yourself|you) from (?:a )?(?:lawsuit|liability|being sued)\b/i.test(s) || /\bmust prove that others provoked\b/i.test(s) },
    { law: 'a dog that kills: a felony under Pen. Code § 399, not "negligent homicide"', stale: (s) => /\bnegligent homicide\b/i.test(s) },
    { law: 'state claims go to the Department of General Services (Gov. Code § 911.2(b), since 2016)', stale: (s) => /Victim Compensation and Government Claims Board/i.test(s) },
    { law: '§ 340.5 is in the Code of Civil Procedure', stale: (s) => /\bCivil Code (?:Section|§|sec\.?)\s?340\.5\b/i.test(s) },
    { law: 'Pen. Code § 152.3: a fine of up to $1,500, up to six months, or both', stale: (s) => /\bnotify a peace officer\b/i.test(s) && /\$1,000\b/.test(s) },
    { law: 'the lawsuit names the person who caused the crash, not the insurer', stale: (s) => /\bserve (?:it|the (?:lawsuit|complaint|summons)) on the (?:\w+['’]s )?insurance company\b/i.test(s) },
    { law: 'punitive damages against an individual driver: CACI No. 3940 (3945 is for an entity)', stale: (s) => /\bCACI (?:No\.?\s?)?3945\b/i.test(s) },
    { law: 'CCP § 667.7(c): installments for lost earnings continue after death', stale: (s) => /\b(?:installments?|periodic payments|payments)\b[^.]*\b(?:stop|end|terminate)s?\b[^.]*\bdies\b/i.test(s) && !/\bearnings\b/i.test(s) },
    { law: 'Elder Abuse Act: beyond the MICRA limit only for reckless neglect or abuse (W&I §§ 15657, 15657.2)', stale: (s) => /\bElder Abuse\b/i.test(s) && /\bnot limited by the MICRA\b/i.test(s) && !/\breckless/i.test(s) },
    { law: 'the 2020–2022 revival window for childhood sexual abuse claims has closed (CCP § 340.11(q))', stale: (s) => /\bwindow\b/i.test(s) && /\brevive/i.test(s) && !/\bclosed\b/i.test(s) },
  ];
  // A flat two-year deadline to sue must come with the six-month government claim (Gov. Code § 911.2).
  const TWO_YEAR_DEADLINE = [/\b(?:you have|have only|you only have|there is a) two years?\b[^.]*\b(?:file|sue|lawsuit|claim)\b/i];
  const SIX_MONTH_CLAIM = [/\bwithin six months\b/i, /\b911\.2\b/];
  // Childhood sexual abuse: no time limit for abuse on or after January 1, 2024 (CCP § 340.1); the age-40
  // rule covers earlier abuse (CCP § 340.11). A post that gives the age-40 rule says both.
  const CSA_AGE_40 = [/\b40th birthday\b/i, /\buntil (?:the survivor|they|he|she|the victim) (?:is|turns?|reach(?:es)?) (?:40|forty)\b/i, /\b22 years of the date the plaintiff attains the age of majority\b/i];
  const CSA_CURRENT_LAW = [/\bno time limit\b/i, /\bJanuary 1, 2024\b/, /\b340\.11\b/];
  const statesStale = (sentence: string) => STALE_STATEMENTS.filter((rule) => rule.stale(sentence)).map((rule) => rule.law);

  it('the patterns catch each stale statement and its variants, not ordinary figures or other deadlines', () => {
    for (const sentence of [
      'all of California uses the 51 percent comparative fault rule',
      'If you’re found 51 percent (or more) at fault for the accident',
      'you cannot recover if you are 50% responsible',
      'California follows modified comparative negligence',
      'contributory negligence bars any recovery',
    ]) expect(states(MODIFIED_COMPARATIVE_FAULT, sentence), sentence).toBe(true);
    for (const sentence of [
      'a minor has until their 20th birthday to file a lawsuit',
      'you don’t have to wait until you child is 20',
      'the child has until age 20 to sue',
      'until the age of twenty',
      'you have two years after they turn 18',
      'the limit is tolled until the minor’s 18th birthday',
    ]) expect(states(MINORITY_EXTENSION, sentence), sentence).toBe(true);
    for (const sentence of [
      'victims of sexual harassment in this state have one year from the date of the last harassment incident to file a claim',
      'you have 1 year to file a harassment complaint',
      'a FEHA complaint must be filed within one year',
      'workers who were sexually harassed have one-year to file with the DFEH',
      'employees facing discrimination have one year to file',
    ]) expect(states(HARASSMENT_ONE_YEAR, sentence), sentence).toBe(true);
    for (const text of [
      'the most pain and suffering that you can recover is $250,000.00',
      'MICRA limits non-economic damages to $250,000',
      'The plaintiff’s spouse can claim an additional $250,000 for Loss of Consortium.',
    ]) expect(statesOldMicraCap(text), text).toBe(true);
    for (const text of [
      'Limits on lawyers contingency fees: 1st $50K: 40% next $50K: 33.33 %',
      'mandated limits of $15,000 per person and $30,000 per incident liability coverage and $5,000 property damage',
      'If anyone is injured or the vehicle damage exceeds $750.00, you must report the accident to the Department of Motor Vehicles',
    ]) expect(states(OTHER_SUPERSEDED, text), text).toBe(true);
    for (const text of [
      'Editor’s note (September 2026): the cap changed.',
      'Some statements in it were incorrect even when it was published',
      'a post that misstated the law',
      'The paragraph above says one year. That was wrong when it was published.',
      'This article has been updated to reflect current law.',
      'Corrections and editor’s notes were added on September 24, 2026.',
    ]) {
      expect(states(EDITORIAL, text), text).toBe(true);
    }
    for (const sentence of [
      'traffic on the freeways was reduced to about 50% of regular levels',
      'a 10-year, 50 percent tax rebate on bed taxes',
      'claims up to their 40th birthday or within five years of discovery',
      'within 22 years of the date the plaintiff attains the age of majority',
      'the statute is tolled until the claimant discovers the injury',
      'she endured the harassment for one year before quitting',
      'harassment victims have three years to file with the Civil Rights Department',
      'you have one year to file a government claim late',
      'you can purchase liability coverage of $50,000/$100,000, $100,000/$300,000, $250,000/$500,000',
      'a settlement of $250,000 for a fractured wrist',
      'report the accident to the DMV within 10 days when property damage is more than $1,000',
      // The posts' own words that only look editorial.
      'a situation that should have been known to the owners and fixed',
      'injury as a result of incorrect or negligent medical treatment',
      'would have discovered and corrected the hazard',
      'the Court urges everyone to check for updates on its website',
    ]) {
      expect(states(MODIFIED_COMPARATIVE_FAULT, sentence), sentence).toBe(false);
      expect(states(MINORITY_EXTENSION, sentence), sentence).toBe(false);
      expect(states(HARASSMENT_ONE_YEAR, sentence), sentence).toBe(false);
      expect(statesOldMicraCap(sentence), sentence).toBe(false);
      expect(states(OTHER_SUPERSEDED, sentence), sentence).toBe(false);
      expect(states(EDITORIAL, sentence), sentence).toBe(false);
    }
  });

  it('the round-5 rules catch each old wording and pass its rewrite', () => {
    // The sentences as the posts had them.
    for (const sentence of [
      'Whoever is determined to have been less careful (i.e. more negligent), is legally responsible for at least part of the damages incurred.',
      'It will help pay for your medical bills and vehicle repair costs that may exceed the at-fault driver’s own policy limits.',
      'This court reversed the lower court’s decision and awarded the amount my client was seeking.',
      'The degree of legal responsibility of the property owner would depend on the status of the person: invitee, licensee or trespasser.',
      'And it means you must prove that others provoked the animal or intentionally bypassed these protections to protect yourself from a lawsuit.',
      'You could be charged with negligent homicide if your dogs have killed someone.',
      'the date the claim was presented to the California Victim Compensation and Government Claims Board is one of the following:',
      'That Statute of Limitation is set forth in Civil Code Section 340.5, which reads as follows:',
      'Failure to notify a peace officer of a sexual attack or physical assault on anyone under the age of 14 is now a misdemeanor punishable by a fine of up to $1,000 and a year in jail.',
      'You may have to start a court process and serve it on the insurance company to get the ball rolling, but your lawyer will take care of that for you.',
      'You can read in more detail about this in CACI 3945, which states in part:',
      '667.7 allows future damages of $250,000 or more to be paid in installments instead of a lump sum, with the payments to stop if the plaintiff dies.',
      'If the medical malpractice or negligence occurs to patient that also fall under the Elder Abuse Act, then the patient or her family can recover pain and suffering that is not limited by the MICRA limit.',
      'In addition, the new law allows for a new 3-year window to revive claims that would not otherwise have been permitted as of January 1, 2020.',
    ]) expect(statesStale(sentence), sentence).toHaveLength(1);
    // The sentences as rewritten.
    for (const sentence of [
      'In California anyone whose carelessness caused the harm can be held responsible for it, even if the other side was more careless, and an injured person’s own share of the fault only reduces what they recover; it does not bar the claim.',
      'UIM pays for your injuries — medical bills, lost earnings, and pain and suffering — beyond the at-fault driver’s own policy limits, up to your own limits.',
      'It does not pay for vehicle repairs; in California those come from your collision coverage or, when an identified driver had no insurance at all, from uninsured motorist property damage coverage of up to $3,500.',
      'This court reversed the lower court’s decision, holding that a jury could find Allstate acted unreasonably, and sent my client’s bad faith lawsuit back to the trial court.',
      'In California the owner’s duty no longer depends on whether the injured person was an invitee, a licensee or a trespasser; the question is whether the owner used reasonable care under all the circumstances.',
      'Take reasonable and ordinary precautions to protect others from the animal, but precautions will not protect you from paying for a bite: under Civil Code section 3342 an owner is liable when the dog bites someone in a public place or someone lawfully on private property, even if the dog never bit anyone before and the owner did everything right.',
      'You could face felony charges if your dogs have killed someone (Penal Code section 399).',
      'the date the claim was presented to the Department of General Services is one of the following:',
      'That Statute of Limitation is set forth in Code of Civil Procedure Section 340.5, which reads as follows:',
      'Failing to notify a peace officer after witnessing the murder, rape, or forcible lewd act of a child under 14 is now a misdemeanor punishable by a fine of up to $1,500, up to six months in jail, or both.',
      'You may have to file a lawsuit against the person who caused the crash to get the ball rolling; in California the lawsuit names that person, not their insurance company, but your lawyer will take care of that for you.',
      'You can read in more detail about this in CACI 3940, which states in part:',
      '667.7 allows future damages of $250,000 or more to be paid in installments instead of a lump sum, with payments for future medical care ending if the plaintiff dies, while payments for lost future earnings continue to the people the plaintiff supported (CCP section 667.7(c)).',
      'If a health care provider’s treatment of a patient who falls under the Elder Abuse Act goes beyond negligence to reckless neglect or abuse, proven by clear and convincing evidence, the patient can recover pain and suffering that is not limited by the MICRA limit; if the patient has died, that recovery is capped at the MICRA amount.',
      'The 2020 law also opened a three-year window, from January 1, 2020 through December 31, 2022, to revive claims that had already expired; that window has closed.',
    ]) expect(statesStale(sentence), sentence).toEqual([]);
    expect(states(TWO_YEAR_DEADLINE, 'So you have two years before you have to file a lawsuit after a car accident in California, or any other accident.')).toBe(true);
    expect(states(CSA_AGE_40, 'victims of sexual abuse can file claims up to their 40th birthday')).toBe(true);
  });

  it('no post states the law the old way (round 5)', () => {
    const hits = legacyPosts.flatMap((post) => sentencesOf(fullText(post)).flatMap((sentence) => statesStale(sentence).map((law) => `${post.slug}: ${law}`)));
    expect(hits).toEqual([]);
  });

  it('a post that gives two years to sue also states the six-month government claim', () => {
    const stating = legacyPosts.filter((post) => states(TWO_YEAR_DEADLINE, fullText(post)));
    expect(stating.map((post) => post.slug)).toContain('california-statute-limitations-car-accident-code-civil-procedure-%c2%a7-335-1');
    for (const post of stating) {
      for (const point of SIX_MONTH_CLAIM) expect(fullText(post), `${post.slug}: ${point}`).toMatch(point);
    }
  });

  it('a post that gives the age-40 rule for childhood sexual abuse also states the law since 2024', () => {
    const stating = legacyPosts.filter((post) => states(CSA_AGE_40, fullText(post)));
    expect(stating.map((post) => post.slug)).toContain('statute-of-limitations-for-childhood-sexual-abuse-victims-expanded');
    for (const post of stating) {
      for (const point of CSA_CURRENT_LAW) expect(fullText(post), `${post.slug}: ${point}`).toMatch(point);
    }
  });

  it('no post carries an editor’s note or says it was wrong, misstated, or corrected', () => {
    const offenders = legacyPosts.filter((post) => states(EDITORIAL, `${post.contentHtml} ${fullText(post)}`)).map((post) => post.slug);
    expect(offenders).toEqual([]);
    expect(legacyPosts.filter((post) => 'misstatedWhenPublished' in post).map((post) => post.slug)).toEqual([]);
  });

  it('no post states a 50/51 percent or contributory-negligence bar; the car-crash post states pure comparative fault', () => {
    expect(legacyPosts.filter((post) => sentencesOf(fullText(post)).some((sentence) => states(MODIFIED_COMPARATIVE_FAULT, sentence))).map((post) => post.slug)).toEqual([]);
    const crash = fullText(legacyPosts.find((post) => post.slug === 'when-do-you-need-to-hire-a-car-crash-attorney')!);
    expect(crash).toMatch(/\bpure comparative fault\b/);
    expect(crash).toMatch(/no percentage bars the claim/);
  });

  it('a post that states minority tolling also says a government claim is due in six months whatever the child’s age', () => {
    const stating = legacyPosts.filter((post) => states(MINORITY_EXTENSION, fullText(post)));
    expect(stating.map((post) => post.slug)).toContain('statute-limitations-california-minors');
    for (const post of stating) {
      for (const point of GOVERNMENT_CLAIM_POINT) expect(fullText(post), `${post.slug}: ${point}`).toMatch(point);
    }
    const minors = fullText(legacyPosts.find((post) => post.slug === 'statute-limitations-california-minors')!);
    expect(minors).toMatch(/two years after turning 18/);
    expect(minors).toContain('352(b)');
    expect(minors).toContain('911.4');
    expect(minors).not.toMatch(/\b20th birthday\b|\bis 20\b/);
  });

  it('no post gives one year to file for harassment; the harassment post states three years with the Civil Rights Department', () => {
    expect(legacyPosts.filter((post) => sentencesOf(fullText(post)).some((sentence) => states(HARASSMENT_ONE_YEAR, sentence))).map((post) => post.slug)).toEqual([]);
    const harassment = fullText(legacyPosts.find((post) => post.slug === 'can-sexual-harassment-turn-into-sexual-assault')!);
    expect(harassment).toMatch(/three years from the last incident of harassment to file a complaint with the California Civil Rights Department/);
    expect(harassment).toContain('12960');
  });

  it('MICRA: every post on the cap states the guide’s current figures, and none gives $250,000 as the cap', () => {
    const bullet = legalGuides.flatMap((guide) => guide.sections.flatMap((section) => section.bullets ?? [])).find((line) => line.startsWith('Medical malpractice caps.'));
    const figures = /(\$[\d,]+) in an injury case and (\$[\d,]+) in a wrongful death case/.exec(bullet ?? '');
    expect(figures, 'guide bullet with the current caps').not.toBeNull();
    const [, injuryCap, deathCap] = figures!;
    const micraPosts = legacyPosts.filter((post) => /MICRA|3333\.2|Proposition 46|Prop 46|non-?economic damages/i.test(fullText(post)));
    expect(micraPosts.length).toBeGreaterThan(5);
    for (const post of micraPosts) {
      const text = fullText(post);
      const stated = [...text.matchAll(/(\$[\d,]+) in an injury case and (\$[\d,]+) in a wrongful death case/g)];
      expect(stated.length, post.slug).toBeGreaterThan(0);
      // Every pair the post states is the guide's (update both each January).
      for (const [, injury, death] of stated) expect([injury, death], post.slug).toEqual([injuryCap, deathCap]);
    }
    expect(legacyPosts.filter((post) => sentencesOf(fullText(post)).some(statesOldMicraCap)).map((post) => post.slug)).toEqual([]);
  });

  it('no post states the pre-2023 fee scale, the pre-2025 auto minimums, or the old $750 DMV threshold', () => {
    expect(legacyPosts.filter((post) => states(OTHER_SUPERSEDED, fullText(post))).map((post) => post.slug)).toEqual([]);
  });

  it('the one notice on every archived post is neutral and dated', () => {
    for (const post of legacyPosts) {
      const month = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(new Date(`${post.dateTime}T12:00:00Z`));
      expect(legacyArchiveNoticeText(post), post.slug).toBe(`Originally published ${month}. General information, not legal advice.`);
    }
    expect(legacyArchiveNoticeText({ dateTime: '2021-01-07' })).toBe('Originally published January 2021. General information, not legal advice.');
    expect(legacyArchiveNoticeText({ dateTime: '2021-01-07' })).not.toMatch(/correct|wrong|updat|chang|accura|stood|revis|edit/i);
  });
});

describe('titles and descriptions are unique (docs/public-site-rendering.md)', () => {
  const indexable = legacyPosts.filter(legacyPostIsIndexable);

  it('no two indexable archived posts share a title or a meta description', () => {
    const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);
    expect(duplicates(indexable.map((post) => post.title.trim().toLowerCase()))).toEqual([]);
    expect(duplicates(indexable.map((post) => legacyPostDescription(post)))).toEqual([]);
  });

  it('no archived post reuses the title of a city page, guide, or news article', () => {
    const pageTitles = new Set(
      [...serviceAreas.map((area) => area.title), ...legalGuides.map((guide) => guide.seoTitle), ...newsArticlesForLocale('en').map((article) => article.title)].map((title) => title.trim().toLowerCase()),
    );
    expect(legacyPosts.filter((post) => pageTitles.has(post.title.trim().toLowerCase())).map((post) => post.slug)).toEqual([]);
  });
});
