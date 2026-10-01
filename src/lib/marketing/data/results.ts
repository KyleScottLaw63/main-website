export type ResultCategory =
  | 'Abuse & school liability'
  | 'Auto & transportation'
  | 'Premises liability'
  | 'Dog bites'
  | 'Malpractice'
  | 'Assault & civil rights'
  | 'Other injury claims';

export type CaseResult = {
  amount: string;
  title: string;
  detail: string;
  category: ResultCategory;
  outcome?: string;
  /**
   * The year of the verdict or settlement — only where the firm's own record states it (the source
   * is noted beside each). Left out when unknown, never estimated: a guessed year on a result is
   * itself misleading advertising (docs/website-content-compliance.md, "Case results").
   */
  year?: number;
  /**
   * The slug of this result's case story (caseStories.ts, /results/<slug>), when the firm has
   * approved one for the website. The card links to it; the story reads its amount, title,
   * outcome, and year from this card (docs/case-stories.md).
   */
  story?: string;
};

/** The outcome line a result card shows: "Jury verdict · 2019", or the outcome alone when no year is on record. */
export function resultOutcomeLabel(result: Pick<CaseResult, 'outcome' | 'year'>, fallback = '') {
  const outcome = result.outcome ?? fallback;
  if (!result.year) return outcome;
  return outcome ? `${outcome} · ${result.year}` : String(result.year);
}

/** Where a case story lives: /results/<slug>. */
export function caseStoryPath(slug: string) {
  return `/results/${slug}`;
}

export const flagshipResults: CaseResult[] = [
  {
    // Year: the firm's May 11, 2020 post — "In 2004 my firm along with another firm had what was at
    // that time the largest sexual assault settlement in the history of California, which was $6,800,000."
    amount: '$6.8M',
    title: 'Elementary school boys molested by a teacher',
    detail: 'School district negligence · Confidential · Largest molestation settlement at the time',
    category: 'Abuse & school liability',
    outcome: 'Settlement',
    year: 2004,
  },
  {
    amount: '$6M',
    title: 'Huntington Beach student molested by her teacher and coach',
    detail: 'Former teacher · Orange County Superior Court · Claim against school district',
    category: 'Abuse & school liability',
    outcome: 'Recovery',
  },
  {
    // From the firm's own record: its Nov. 2019 news post (jury verdict after a two-week
    // trial) and the old site's case list ("Kody R. v. Long Beach U.S.D., LA Sup. Ct.,
    // $5,750,000"). The old card's "Former teacher · OC Sup. Ct." was pasted from the $6M card.
    // Year: that Nov. 16, 2019 post, and the Apr. 23, 2020 post ("60th largest verdict in California in 2019").
    amount: '$5.75M',
    title: 'Student suffers skull fracture and brain bleed',
    detail: 'Two-week jury trial · Los Angeles Superior Court · Claim against school district',
    category: 'Abuse & school liability',
    outcome: 'Jury verdict',
    year: 2019,
    story: 'student-skull-fracture-verdict',
  },
];

export const historicalResults: CaseResult[] = [
  {
    // Its case story (2026-10-01): the insurer accepted a joint demand for five injured people, three of
    // them the firm's clients; the firm's records date the acceptance to September 2026. The card, like
    // the story, gives the combined figure and says so.
    amount: '$2.7M',
    title: 'Mother and her children hurt in a Fontana intersection crash',
    detail: 'San Bernardino Superior Court · Combined settlement for five injured people',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2026,
    story: 'fontana-intersection-crash-settlement',
  },
  {
    // The firm's post of Dec. 26, 2024 (kjslaw.com/2024/12/26/kyle-scott-wins-jury-verdict-in-riverside-superior-court/,
    // now /news/riverside-jury-verdict-2-3-million); it published no facts about the parties or the claim.
    amount: '$2.3M',
    title: 'Riverside Superior Court jury verdict',
    detail: 'Riverside Superior Court · Details not published',
    category: 'Other injury claims',
    outcome: 'Jury verdict',
    year: 2024,
  },
  {
    // The firm's post of Dec. 26, 2024 (kjslaw.com/2024/12/26/kyle-scott-settles-a-sexual-molestation-sexual-battery-lawsuit-for-2-2-million-details-confidential/,
    // now /news/sexual-molestation-battery-settlement-2-2-million).
    amount: '$2.2M',
    title: 'Sexual molestation and sexual battery lawsuit',
    detail: 'Details confidential',
    category: 'Abuse & school liability',
    outcome: 'Settlement',
    year: 2024,
  },
  {
    amount: '$2M',
    title: 'Teenage boy molested by church employee',
    detail: 'Clergy malpractice · Riverside County Superior Court',
    category: 'Abuse & school liability',
    outcome: 'Jury verdict',
  },
  {
    // The firm's settlement records (added 2026-09-30).
    amount: '$1,450,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2024,
  },
  {
    // Year: the firm's Apr. 14, 2017 post — "We were able to obtain a $928,493.12 verdict for our
    // client … yesterday when an Orange County jury found the Orange County Transportation Authority" liable.
    amount: '$928,493.12',
    title: 'Transit bus crashes into minivan; man suffers cognitive problems',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Jury verdict',
    year: 2017,
    story: 'octa-bus-crash-verdict',
  },
  {
    // The firm's settlement records (added 2026-09-30).
    amount: '$880,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
  },
  {
    // The firm's settlement records (added 2026-09-30).
    amount: '$800,000',
    title: 'Personal injury settlement',
    detail: 'Orange County Superior Court',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2023,
  },
  {
    amount: '$750,000',
    title: 'Slip-and-fall claim involving complex regional pain syndrome',
    detail: 'San Bernardino Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
  {
    amount: '$750,000',
    title: 'Wrongful death of a Marine in a military aircraft crash near Tucson',
    detail: 'Los Angeles Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // Year: the firm's settlement records. Title and outcome: its case story, from the complaint
    // and the executed settlement (2026-10-01). The old title's "medical-device salesperson" has
    // no support in either document.
    amount: '$700,000',
    title: 'Driver needs a lower-back disc replacement after a freeway rear-end crash',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2015,
    story: 'freeway-rear-end-settlement',
  },
  {
    // Amount: the firm's settlement records ($697,500; previously listed as $697,000).
    amount: '$697,500',
    title: 'Dangerous flooring causes neck injury and cognitive issues',
    detail: 'Orange County Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records (added 2026-09-30).
    amount: '$650,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2022,
  },
  {
    // The firm's settlement records (added 2026-09-30; case type from the records, 2026-10-01).
    amount: '$600,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2024,
  },
  {
    // The firm's settlement records (added 2026-09-30; case type from the records, 2026-10-01).
    amount: '$505,000',
    title: 'Slip or trip and fall settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2019,
  },
  {
    amount: '$500,000',
    title: 'Client suffers shooting and battery injuries',
    detail: 'Los Angeles Superior Court',
    category: 'Assault & civil rights',
    outcome: 'Recovery',
  },
  {
    amount: '$500,000',
    title: 'Trip-and-fall claim involving a knee injury',
    detail: 'Orange County Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$500,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2024,
  },
  {
    // Year: the firm's settlement records (Settlement List 2026-09-30: settled in 2021; the only $475,000 premises matter, a fall at a Riverside County business).
    amount: '$475,000',
    title: 'Trip and fall causes head injury and aggravated seizures',
    detail: 'Riverside Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
    year: 2021,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$475,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2024,
  },
  {
    amount: '$455,000',
    title: 'Car crash causes neck injuries and headaches',
    detail: 'Riverside Superior Court · UM and bad-faith claims',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // Year: the firm's settlement records.
    amount: '$430,000',
    title: 'Rear-end crash causes lumbar radiculopathy',
    detail: 'Orange County Superior Court · UM claim',
    category: 'Auto & transportation',
    outcome: 'Recovery',
    year: 2019,
  },
  {
    // The firm's settlement records (added 2026-09-30; case type from the records, 2026-10-01).
    amount: '$400,000',
    title: 'Motor vehicle crash claim against a city',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2025,
  },
  {
    // The firm's settlement records (added 2026-09-30; case type from the records, 2026-10-01).
    amount: '$375,000',
    title: 'Nursing-home neglect settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2024,
  },
  {
    // Year: the firm's settlement records.
    amount: '$350,000',
    title: 'Motorcycle rider suffers fractures in collision with minivan',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
    year: 2010,
  },
  {
    // The firm's settlement records (added 2026-09-30).
    amount: '$336,932',
    title: 'Underinsured-motorist claim',
    detail: 'Settlement and arbitration award',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // Year: the firm's settlement records (Settlement List 2026-09-30: settled in 2015; the only $325,000 matter of this kind, in San Joaquin Superior Court).
    amount: '$325,000',
    title: 'Man injured while working for homeowner',
    detail: 'San Joaquin Superior Court',
    category: 'Other injury claims',
    outcome: 'Recovery',
    year: 2015,
  },
  {
    amount: '$305,000',
    title: 'Couple suffers neck, back, and shoulder injuries in car crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Settlement during trial',
  },
  {
    amount: '$300,000',
    title: 'Trip-and-fall claim involving a neck injury',
    detail: 'Orange County Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
  {
    amount: '$299,640',
    title: 'Couple and child injured in car crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records (added 2026-09-30; case type from the records, 2026-10-01).
    amount: '$295,000',
    title: 'Workers’ compensation settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2022,
  },
  {
    // The firm's settlement records (added 2026-09-30; case type from the records, 2026-10-01).
    amount: '$280,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2021,
  },
  {
    amount: '$275,000',
    title: 'Medical-supply employee injured in auto crash',
    detail: 'San Bernardino Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$275,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2013,
  },
  {
    amount: '$270,000',
    title: 'Shoulder surgery after slip and fall in supermarket',
    detail: 'Los Angeles Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records (added 2026-09-30; case type from the records, 2026-10-01).
    amount: '$252,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2022,
  },
  {
    amount: '$250,000',
    title: 'Knee injury and arthroscopic surgery after car crash',
    detail: 'Orange County',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$250,000',
    title: 'Auto crash causes back injury',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // Year: the firm's settlement records.
    amount: '$235,000',
    title: 'Woman suffers hip fracture',
    detail: 'Confidential matter',
    category: 'Other injury claims',
    outcome: 'Recovery',
    year: 2016,
  },
  {
    amount: '$225,000',
    title: 'Car crash causes neck injury and headaches',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Settlement during trial',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$225,000',
    title: 'Slip or trip and fall settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2024,
  },
  {
    amount: '$220,000',
    title: 'Knee surgery after collision with drunk driver',
    detail: 'Orange County',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$217,000',
    title: 'Shoulder surgery after auto crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Jury verdict',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$215,000',
    title: 'Premises liability settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2025,
  },
  {
    amount: '$205,000',
    title: 'Neck injury and epidural injections after car crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$200,000',
    title: 'Mother and daughter suffer back injuries in auto crash',
    detail: 'Riverside County',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$195,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$185,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2015,
  },
  {
    amount: '$175,000',
    title: 'Child suffers dog bites to abdomen',
    detail: 'Riverside Superior Court',
    category: 'Dog bites',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$175,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2022,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$155,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2020,
  },
  {
    amount: '$151,000',
    title: 'Woman suffers wrist nerve damage from dog bite',
    detail: 'Orange County Superior Court',
    category: 'Dog bites',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$150,001',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2014,
  },
  {
    amount: '$150,000',
    title: 'Neck and back injuries after auto crash',
    detail: 'Uninsured-motorist claim',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$150,000',
    title: 'Woman suffers dog bite injuries',
    detail: 'Orange County',
    category: 'Dog bites',
    outcome: 'Recovery',
  },
  {
    amount: '$150,000',
    title: 'Drunk driver causes neck and back injuries',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$150,000',
    title: 'Nursing-home neglect settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2023,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$150,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2018,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$150,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2021,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$150,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$150,000',
    title: 'Premises liability settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2016,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$145,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2018,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$141,000',
    title: 'Dog bite settlement',
    detail: 'Details not published',
    category: 'Dog bites',
    outcome: 'Settlement',
    year: 2014,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$136,718.35',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2012,
  },
  {
    amount: '$135,000',
    title: 'Neck injuries requiring epidural injections after crash',
    detail: 'Underinsured-motorist claim',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$135,000',
    title: 'Store shelf strikes woman and causes chronic pain',
    detail: 'Riverside Superior Court',
    category: 'Premises liability',
    outcome: 'Jury verdict',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$130,000',
    title: 'Slip or trip and fall settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2016,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$127,165.44',
    title: 'Wrongful death settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2020,
  },
  {
    // Year: the firm's settlement records.
    amount: '$125,900',
    title: 'Woman suffers head injury in auto crash',
    detail: 'Los Angeles Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
    year: 2008,
  },
  {
    amount: '$125,000',
    title: 'Back surgery after auto crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // Year: the firm's settlement records (Settlement List 2026-09-30: settled in 2011; the only $125,000 dog-bite matter, a bite to the face).
    amount: '$125,000',
    title: 'Woman suffers dog bite to face',
    detail: 'Orange County Superior Court',
    category: 'Dog bites',
    outcome: 'Recovery',
    year: 2011,
  },
  {
    amount: '$125,000',
    title: 'Man beaten by police suffers excessive force',
    detail: 'Los Angeles Superior Court',
    category: 'Assault & civil rights',
    outcome: 'Jury verdict',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$125,000',
    title: 'Workers’ compensation settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2017,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$125,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2024,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$125,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2021,
  },
  {
    // Year: the firm's settlement records.
    amount: '$122,000',
    title: 'Woman suffers wrist fracture in auto incident',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
    year: 2007,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$121,133',
    title: 'Uninsured/underinsured-motorist claim',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2011,
  },
  {
    // Year: the firm's settlement records.
    amount: '$115,000',
    title: 'Rear-end freeway crash causes back injury',
    detail: 'Los Angeles Superior Court',
    category: 'Auto & transportation',
    outcome: 'Jury verdict',
    year: 2018,
  },
  {
    // Year: the firm's settlement records (Settlement List 2026-09-30: closing statement dated in 2006, after February; the only $112,500 auto matter, a commercial truck crash).
    amount: '$112,500',
    title: 'Commercial truck crash causes back injury',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
    year: 2006,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$105,000',
    title: 'Uninsured/underinsured-motorist claim',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2010,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$101,695',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2012,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,437.41',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2020,
  },
  {
    amount: '$100,000',
    title: 'Child suffers dog bite to face',
    detail: 'Orange County',
    category: 'Dog bites',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Bicyclist struck by car suffers back injury',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Young man suffers dog bite injuries',
    detail: 'Orange County',
    category: 'Dog bites',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Neighbor battery causes eye injury',
    detail: 'Riverside Superior Court',
    category: 'Assault & civil rights',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Bar patron battered by security guard',
    detail: 'Orange County Superior Court',
    category: 'Assault & civil rights',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Woman suffers back injuries in car crash',
    detail: 'Los Angeles Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Attorney malpractice while handling personal-injury claim',
    detail: 'Confidential · San Bernardino Superior Court',
    category: 'Malpractice',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Woman injured in car crash',
    detail: 'Riverside Superior Court · UM claim',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Back surgery after motorcycle crash',
    detail: 'San Bernardino Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Man suffers back injury in automobile crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Female student molested at charter elementary school',
    detail: 'Riverside Superior Court',
    category: 'Abuse & school liability',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Woman suffers neck injury requiring epidural injections after crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$100,000',
    title: 'Woman suffers neck injury in car crash',
    detail: 'Orange County Superior Court · UM claim',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2013,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2005,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2010,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Uninsured/underinsured-motorist claim',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2020,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2005,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2009,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Uninsured/underinsured-motorist claim',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2018,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2006,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Slip or trip and fall settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2010,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Slip or trip and fall settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2021,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2008,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2020,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Workers’ compensation settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2018,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Slip or trip and fall settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2021,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2005,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$100,000',
    title: 'Medical malpractice settlement',
    detail: 'Details not published',
    category: 'Malpractice',
    outcome: 'Settlement',
  },
  {
    amount: '$97,383.89',
    title: 'Hip injury after car crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Jury verdict',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$95,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2014,
  },
  {
    // Year: the firm's settlement records (Settlement List 2026-09-30: notice of settlement in 2016; the only $90,000 premises matter, against a supermarket).
    amount: '$90,000',
    title: 'Knee injury after slipping on water in supermarket',
    detail: 'Orange County Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
    year: 2016,
  },
  {
    amount: '$90,000',
    title: 'Back injury after slip and fall',
    detail: 'Binding arbitration',
    category: 'Premises liability',
    outcome: 'Arbitration award',
  },
  {
    // Year: the firm's settlement records (Settlement List 2026-09-30: settled in 2008; the only $90,000 auto matter, a truck-versus-pedestrian crash).
    amount: '$90,000',
    title: 'Pedestrian struck by pickup suffers back injury',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
    year: 2008,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$87,000',
    title: 'Premises liability settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2016,
  },
  {
    amount: '$85,000',
    title: 'Woman molested by hospital employee',
    detail: 'San Bernardino Superior Court',
    category: 'Abuse & school liability',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$85,000',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2004,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$85,000',
    title: 'Assault and battery settlement',
    detail: 'Details not published',
    category: 'Assault & civil rights',
    outcome: 'Settlement',
    year: 2006,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$80,000',
    title: 'Uninsured/underinsured-motorist claim',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2009,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$80,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2016,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$80,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2012,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$80,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2018,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$80,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2011,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$78,000',
    title: 'Dog bite settlement',
    detail: 'Details not published',
    category: 'Dog bites',
    outcome: 'Settlement',
    year: 2020,
  },
  {
    amount: '$75,000',
    title: 'Medical malpractice involving failure to diagnose',
    detail: 'San Bernardino Superior Court',
    category: 'Malpractice',
    outcome: 'Recovery',
  },
  {
    amount: '$75,000',
    title: 'Neck injury after auto crash in San Bernardino',
    detail: 'Uninsured-motorist claim',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$75,000',
    title: 'Premises liability settlement',
    detail: 'Details not published',
    category: 'Premises liability',
    outcome: 'Settlement',
    year: 2010,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$75,000',
    title: 'Employment claim settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2011,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$75,000',
    title: 'Uninsured/underinsured-motorist claim',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2006,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$75,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2007,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$75,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2023,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$73,000',
    title: 'Sexual abuse settlement',
    detail: 'Details not published',
    category: 'Abuse & school liability',
    outcome: 'Settlement',
    year: 2008,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$72,327.60',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2012,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$70,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2016,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$68,000',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2013,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$67,707.55',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2015,
  },
  {
    amount: '$65,000',
    title: 'Woman suffers wrist fracture on theme park escalator',
    detail: 'Orange County',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$64,254.18',
    title: 'Personal injury settlement',
    detail: 'Details not published',
    category: 'Other injury claims',
    outcome: 'Settlement',
    year: 2009,
  },
  {
    // The firm's settlement records, over $60,000 (added 2026-10-01).
    amount: '$62,500',
    title: 'Motor vehicle crash settlement',
    detail: 'Details not published',
    category: 'Auto & transportation',
    outcome: 'Settlement',
    year: 2014,
  },
];

export const allResults = [...flagshipResults, ...historicalResults];

