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
};

/** The outcome line a result card shows: "Jury verdict · 2019", or the outcome alone when no year is on record. */
export function resultOutcomeLabel(result: Pick<CaseResult, 'outcome' | 'year'>, fallback = '') {
  const outcome = result.outcome ?? fallback;
  if (!result.year) return outcome;
  return outcome ? `${outcome} · ${result.year}` : String(result.year);
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
    detail: 'Two-week jury trial · Los Angeles Superior Court · Claim against LBUSD',
    category: 'Abuse & school liability',
    outcome: 'Jury verdict',
    year: 2019,
  },
];

export const historicalResults: CaseResult[] = [
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
    // Year: the firm's Apr. 14, 2017 post — "We were able to obtain a $928,493.12 verdict for our
    // client … yesterday when an Orange County jury found the Orange County Transportation Authority" liable.
    amount: '$928,493.12',
    title: 'OCTA bus crashes into minivan; man suffers cognitive problems',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Jury verdict',
    year: 2017,
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
    title: 'Wrongful death of a Marine in an Osprey crash near Tucson',
    detail: 'Los Angeles Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$700,000',
    title: 'Serious back injury in crash with a medical-device salesperson',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$697,000',
    title: 'Dangerous flooring causes neck injury and cognitive issues',
    detail: 'Orange County Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
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
    amount: '$475,000',
    title: 'Trip and fall causes head injury and aggravated seizures',
    detail: 'Riverside Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
  {
    amount: '$455,000',
    title: 'Car crash causes neck injuries and headaches',
    detail: 'Riverside Superior Court · UM and bad-faith claims',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$430,000',
    title: 'Rear-end crash causes lumbar radiculopathy',
    detail: 'Orange County Superior Court · UM claim',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$350,000',
    title: 'Motorcycle rider suffers fractures in collision with minivan',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$325,000',
    title: 'Man injured while working for homeowner',
    detail: 'San Joaquin Superior Court',
    category: 'Other injury claims',
    outcome: 'Recovery',
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
    amount: '$275,000',
    title: 'Medical-supply employee injured in auto crash',
    detail: 'San Bernardino Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$270,000',
    title: 'Shoulder surgery after slip and fall in supermarket',
    detail: 'Los Angeles Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
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
    amount: '$235,000',
    title: 'Woman suffers hip fracture',
    detail: 'Confidential matter',
    category: 'Other injury claims',
    outcome: 'Recovery',
  },
  {
    amount: '$225,000',
    title: 'Car crash causes neck injury and headaches',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Settlement during trial',
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
    amount: '$175,000',
    title: 'Child suffers dog bites to abdomen',
    detail: 'Riverside Superior Court',
    category: 'Dog bites',
    outcome: 'Recovery',
  },
  {
    amount: '$151,000',
    title: 'Woman suffers wrist nerve damage from dog bite',
    detail: 'Orange County Superior Court',
    category: 'Dog bites',
    outcome: 'Recovery',
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
    amount: '$125,000',
    title: 'Back surgery after auto crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$125,000',
    title: 'Woman suffers dog bite to face',
    detail: 'Orange County Superior Court',
    category: 'Dog bites',
    outcome: 'Recovery',
  },
  {
    amount: '$125,900',
    title: 'Woman suffers head injury in auto crash',
    detail: 'Los Angeles Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$125,000',
    title: 'Man beaten by police suffers excessive force',
    detail: 'Los Angeles Superior Court',
    category: 'Assault & civil rights',
    outcome: 'Jury verdict',
  },
  {
    amount: '$122,000',
    title: 'Woman suffers wrist fracture in auto incident',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$115,000',
    title: 'Rear-end freeway crash causes back injury',
    detail: 'Los Angeles Superior Court',
    category: 'Auto & transportation',
    outcome: 'Jury verdict',
  },
  {
    amount: '$112,500',
    title: 'Office Depot truck crash causes back injury',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
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
    amount: '$97,383.89',
    title: 'Hip injury after car crash',
    detail: 'Riverside Superior Court',
    category: 'Auto & transportation',
    outcome: 'Jury verdict',
  },
  {
    amount: '$90,000',
    title: 'Knee injury after slipping on water in supermarket',
    detail: 'Orange County Superior Court',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
  {
    amount: '$90,000',
    title: 'Back injury after slip and fall',
    detail: 'Binding arbitration',
    category: 'Premises liability',
    outcome: 'Arbitration award',
  },
  {
    amount: '$90,000',
    title: 'Pedestrian struck by pickup suffers back injury',
    detail: 'Orange County Superior Court',
    category: 'Auto & transportation',
    outcome: 'Recovery',
  },
  {
    amount: '$85,000',
    title: 'Woman molested by hospital employee',
    detail: 'San Bernardino Superior Court',
    category: 'Abuse & school liability',
    outcome: 'Recovery',
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
    amount: '$65,000',
    title: 'Woman suffers wrist fracture on Disneyland escalator',
    detail: 'Orange County',
    category: 'Premises liability',
    outcome: 'Recovery',
  },
];

export const allResults = [...flagshipResults, ...historicalResults];

