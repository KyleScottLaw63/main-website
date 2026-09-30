'use client';

import { useId, useState, useSyncExternalStore } from 'react';
import { CalendarClock, TriangleAlert } from 'lucide-react';
import { submitsThroughOnSubmit } from '@/components/shared/form-submit';
import { addYears, daysUntil, todayPT, type ISODate } from '@/lib/rules/dates';
import { govClaimDeadline } from '@/lib/rules/deadlines';

/**
 * Government-claim deadline tool. Uses the same date arithmetic the firm's
 * case system uses for its own deadlines (Gov. Code § 911.2: six months from
 * accrual). Informational only: accrual can differ from the incident date,
 * some claims are exempt, and a last day that falls on a weekend or holiday
 * generally moves to the next business day — the copy says so.
 */
function formatLong(date: ISODate) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00Z`));
}

function isISODate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

// The guide is prerendered at build time, and React does not patch an input's `max`
// while hydrating, so a render-time todayPT() froze the date picker at the build date.
// The server snapshot is null (no max in the HTML); the browser supplies today's date
// right after hydration.
const noSubscription = () => () => {};
function useBrowserToday(): ISODate | null {
  return useSyncExternalStore(noSubscription, () => todayPT(), () => null);
}

export function GovernmentClaimDeadlineTool() {
  const id = useId();
  const [accrual, setAccrual] = useState('');
  const today = useBrowserToday();
  const valid = today !== null && isISODate(accrual) && accrual <= today;
  const claimBy = valid ? govClaimDeadline(accrual as ISODate) : null;
  const lateBy = valid ? addYears(accrual as ISODate, 1) : null;
  const noNoticeSuitBy = valid ? addYears(accrual as ISODate, 2) : null;
  const claimDays = claimBy && today ? daysUntil(claimBy, today) : null;
  const lateDays = lateBy && today ? daysUntil(lateBy, today) : null;

  return (
    <section className="legal-guide-tool" id="deadline-tool" aria-labelledby="deadline-tool-title">
      <p className="eyebrow"><CalendarClock aria-hidden="true" /> Deadline check</p>
      <h2 id="deadline-tool-title">When would a government claim be due?</h2>
      <p>Enter the date of the injury. The dates below use the same six-month rule the firm’s own case system applies to every public-entity claim it handles.</p>
      <form className="legal-guide-tool-form" action={submitsThroughOnSubmit} onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={`${id}-date`}><span>Date of injury</span><input id={`${id}-date`} type="date" max={today ?? undefined} value={accrual} onChange={(event) => setAccrual(event.target.value)} /></label>
      </form>
      {accrual && !valid ? <p className="legal-guide-tool-note">Enter a date on or before today.</p> : null}
      {claimBy && lateBy && noNoticeSuitBy && claimDays !== null && lateDays !== null ? (
        <div className="legal-guide-tool-results" aria-live="polite">
          <article className={claimDays < 0 ? 'is-past' : ''}>
            <span>Last day to present the government claim (Gov. Code § 911.2, six months)</span>
            <strong>{formatLong(claimBy)}</strong>
            <span>{claimDays < 0 ? `${Math.abs(claimDays)} days ago — see the late-claim window below` : claimDays === 0 ? 'Today' : `${claimDays} days from today`}</span>
          </article>
          <article className={lateDays < 0 ? 'is-past' : ''}>
            <span>Outer limit for a late-claim application (§ 911.4, one year, qualifying reason required)</span>
            <strong>{formatLong(lateBy)}</strong>
            <span>{lateDays < 0 ? `${Math.abs(lateDays)} days ago — the late-claim window has closed. A court can excuse a missed claim only when a late-claim application was presented within this year and denied (§ 946.6). Speak to a lawyer immediately.` : `${lateDays} days from today`}</span>
          </article>
          {/* The lawsuit deadlines assume a claim was presented (§ 945.6), so they show only while one still can be. */}
          {lateDays >= 0 ? (
            <article>
              <span><b>If the claim is presented on time…</b> a written rejection leaves six months from the notice to file the lawsuit (§ 945.6(a)(1)). If the entity never sends written notice, the lawsuit is due by</span>
              <strong>{formatLong(noNoticeSuitBy)}</strong>
              <span>Two years from the date of injury (§ 945.6(a)(2))</span>
            </article>
          ) : null}
        </div>
      ) : null}
      <p className="legal-guide-tool-note"><TriangleAlert aria-hidden="true" /> General information, not legal advice. The clock runs from the date the claim accrued, which is usually but not always the injury date; childhood sexual assault claims are exempt from this requirement; federal agencies follow a different system; and a last day that falls on a weekend or court holiday generally moves to the next business day. Confirm your dates with a lawyer before relying on them.</p>
    </section>
  );
}
