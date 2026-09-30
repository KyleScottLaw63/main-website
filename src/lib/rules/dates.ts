/**
 * Legal dates are DATE STRINGS ("YYYY-MM-DD"), never timestamps (see AGENTS.md).
 * All math is calendar math; the firm operates in America/Los_Angeles.
 */

export type ISODate = string; // YYYY-MM-DD

const RE = /^\d{4}-\d{2}-\d{2}$/;

export function assertISODate(d: string): asserts d is ISODate {
  if (!RE.test(d)) throw new Error(`Not an ISO date: ${d}`);
  const [y, m, day] = d.split("-").map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, day));
  if (
    parsed.getUTCFullYear() !== y ||
    parsed.getUTCMonth() !== m - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(`Not a real calendar date: ${d}`);
  }
}

function parts(d: ISODate): [number, number, number] {
  assertISODate(d);
  const [y, m, day] = d.split("-").map(Number);
  return [y, m, day];
}

function fmt(y: number, m: number, d: number): ISODate {
  return `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** Calendar-month addition with end-of-month clamp (Aug 31 + 6mo → Feb 28/29). */
export function addMonths(d: ISODate, months: number): ISODate {
  const [y, m, day] = parts(d);
  const total = y * 12 + (m - 1) + months;
  const ny = Math.floor(total / 12);
  const nm = (total % 12) + 1;
  return fmt(ny, nm, Math.min(day, daysInMonth(ny, nm)));
}

export function addYears(d: ISODate, years: number): ISODate {
  return addMonths(d, years * 12);
}

export function addDays(d: ISODate, days: number): ISODate {
  const [y, m, day] = parts(d);
  const t = new Date(Date.UTC(y, m - 1, day));
  t.setUTCDate(t.getUTCDate() + days);
  return fmt(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}

export function earlierOf(a: ISODate, b: ISODate): ISODate {
  return a <= b ? a : b;
}

/** Today as a PT date string. */
export function todayPT(now = new Date()): ISODate {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return f.format(now) as ISODate;
}

export function daysUntil(target: ISODate, from: ISODate): number {
  const toUTC = (d: ISODate) => {
    const [y, m, day] = parts(d);
    return Date.UTC(y, m - 1, day);
  };
  return Math.round((toUTC(target) - toUTC(from)) / 86_400_000);
}
