import { type ISODate, addYears, addMonths, earlierOf } from "./dates";

/**
 * California deadline rules — versioned, effective-dated, counsel-reviewed.
 * See docs/california-rules.md and the published California Rule Pack.
 * These compute the STATUTORY defaults; tolling decisions are attorney work
 * recorded on the matter, never silently applied here.
 */
export const RULES_VERSION = { version: "2026.08", effectiveFrom: "2026-01-01" };

export type MatterType =
  | "auto"
  | "premises"
  | "med_mal"
  | "wrongful_death"
  | "other_pi";

/** CCP §335.1 — two years for PI/wrongful death. Med-mal handled separately. */
export function solDeadline(
  matterType: MatterType,
  dates: { injuryDate: ISODate; discoveryDate?: ISODate },
): ISODate {
  if (matterType === "med_mal") {
    // CCP §340.5 — earlier of 1yr from discovery or 3yrs from injury.
    const discovery = dates.discoveryDate ?? dates.injuryDate;
    return earlierOf(addYears(discovery, 1), addYears(dates.injuryDate, 3));
  }
  return addYears(dates.injuryDate, 2);
}

/**
 * Gov. Code §911.2 — six months to present a claim against a public entity.
 * DELIBERATELY independent of minority tolling: CCP §352(a) does NOT extend
 * this clock. That interaction is the classic malpractice trap.
 */
export function govClaimDeadline(accrualDate: ISODate): ISODate {
  return addMonths(accrualDate, 6);
}
