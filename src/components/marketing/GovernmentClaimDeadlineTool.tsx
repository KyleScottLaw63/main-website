'use client';

import { useId, useState, useSyncExternalStore } from 'react';
import { CalendarClock, TriangleAlert } from 'lucide-react';
import { submitsThroughOnSubmit } from '@/components/shared/form-submit';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { addYears, daysUntil, todayPT, type ISODate } from '@/lib/rules/dates';
import { govClaimDeadline } from '@/lib/rules/deadlines';

/**
 * Government-claim deadline tool. Uses the same date arithmetic the firm's
 * case system uses for its own deadlines (Gov. Code § 911.2: six months from
 * accrual). Informational only: accrual can differ from the incident date,
 * some claims are exempt, and a last day that falls on a weekend or holiday
 * generally moves to the next business day — the copy says so.
 */
const copy = {
  en: {
    dateLocale: 'en-US',
    eyebrow: 'Deadline check',
    title: 'When would a government claim be due?',
    intro: 'Enter the date of the injury. The dates below use the same six-month rule the firm’s own case system applies to every public-entity claim it handles.',
    dateLabel: 'Date of injury',
    futureDate: 'Enter a date on or before today.',
    claimLabel: 'Last day to present the government claim (Gov. Code § 911.2, six months)',
    claimPast: (days: number) => `${days} ${days === 1 ? 'day' : 'days'} ago — see the late-claim window below`,
    today: 'Today',
    ahead: (days: number) => `${days} ${days === 1 ? 'day' : 'days'} from today`,
    lateLabel: 'Outer limit for a late-claim application (§ 911.4, one year, qualifying reason required)',
    latePast: (days: number) => `${days} ${days === 1 ? 'day' : 'days'} ago — the late-claim window has closed. A court can excuse a missed claim only when a late-claim application was presented within this year and denied (§ 946.6). Speak to a lawyer immediately.`,
    suitLead: 'If the claim is presented on time…',
    suitBody: 'a written rejection leaves six months from the notice to file the lawsuit (§ 945.6(a)(1)). If the entity never sends written notice, the lawsuit is due by',
    suitNote: 'Two years from the date of injury (§ 945.6(a)(2))',
    note: 'General information, not legal advice. The clock runs from the date the claim accrued, which is usually but not always the injury date; childhood sexual assault claims are exempt from this requirement; federal agencies follow a different system; and a last day that falls on a weekend or court holiday generally moves to the next business day. Confirm your dates with a lawyer before relying on them.',
  },
  es: {
    dateLocale: 'es-US',
    eyebrow: 'Calcular el plazo',
    title: '¿Cuándo vencería el reclamo gubernamental?',
    intro: 'Ingrese la fecha de la lesión. Las fechas usan la misma regla de seis meses que el sistema de casos del despacho aplica a cada reclamo contra una entidad pública que maneja.',
    dateLabel: 'Fecha de la lesión',
    futureDate: 'Ingrese una fecha igual o anterior a hoy.',
    claimLabel: 'Último día para presentar el reclamo gubernamental (Código de Gobierno, § 911.2, seis meses)',
    claimPast: (days: number) => `Hace ${days} ${days === 1 ? 'día' : 'días'} — vea abajo el plazo para un reclamo tardío`,
    today: 'Hoy',
    ahead: (days: number) => `Dentro de ${days} ${days === 1 ? 'día' : 'días'}`,
    lateLabel: 'Límite máximo para una solicitud de reclamo tardío (§ 911.4, un año, con una razón que la ley acepte)',
    latePast: (days: number) => `Hace ${days} ${days === 1 ? 'día' : 'días'} — el plazo para un reclamo tardío ya venció. Un tribunal solo puede excusar un reclamo que no se presentó cuando una solicitud de reclamo tardío se presentó dentro de este año y fue denegada (§ 946.6). Hable con un abogado de inmediato.`,
    suitLead: 'Si el reclamo se presenta a tiempo…',
    suitBody: 'un rechazo por escrito deja seis meses a partir del aviso para presentar la demanda (§ 945.6(a)(1)). Si la entidad nunca envía un aviso por escrito, la demanda debe presentarse a más tardar el',
    suitNote: 'Dos años a partir de la fecha de la lesión (§ 945.6(a)(2))',
    note: 'Información general, no asesoría legal. El plazo corre desde la fecha en que surgió el reclamo, que por lo general, pero no siempre, es la fecha de la lesión; los reclamos por abuso sexual infantil están exentos de este requisito; las agencias federales siguen un sistema distinto; y un último día que cae en fin de semana o en un día feriado de los tribunales generalmente pasa al siguiente día hábil. Confirme sus fechas con un abogado antes de confiar en ellas.',
  },
} satisfies Record<SiteLocale, unknown>;

function formatLong(date: ISODate, locale: string) {
  return new Intl.DateTimeFormat(locale, { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00Z`));
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

export function GovernmentClaimDeadlineTool({ locale = 'en' }: { locale?: SiteLocale }) {
  const text = copy[locale];
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
      <p className="eyebrow"><CalendarClock aria-hidden="true" /> {text.eyebrow}</p>
      <h2 id="deadline-tool-title">{text.title}</h2>
      <p>{text.intro}</p>
      <form className="legal-guide-tool-form" action={submitsThroughOnSubmit} onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={`${id}-date`}><span>{text.dateLabel}</span><input id={`${id}-date`} type="date" max={today ?? undefined} value={accrual} onChange={(event) => setAccrual(event.target.value)} /></label>
      </form>
      {accrual && !valid ? <p className="legal-guide-tool-note">{text.futureDate}</p> : null}
      {claimBy && lateBy && noNoticeSuitBy && claimDays !== null && lateDays !== null ? (
        <div className="legal-guide-tool-results" aria-live="polite">
          <article className={claimDays < 0 ? 'is-past' : ''}>
            <span>{text.claimLabel}</span>
            <strong>{formatLong(claimBy, text.dateLocale)}</strong>
            <span>{claimDays < 0 ? text.claimPast(Math.abs(claimDays)) : claimDays === 0 ? text.today : text.ahead(claimDays)}</span>
          </article>
          <article className={lateDays < 0 ? 'is-past' : ''}>
            <span>{text.lateLabel}</span>
            <strong>{formatLong(lateBy, text.dateLocale)}</strong>
            <span>{lateDays < 0 ? text.latePast(Math.abs(lateDays)) : text.ahead(lateDays)}</span>
          </article>
          {/* The lawsuit deadlines assume a claim was presented (§ 945.6), so they show only while one still can be. */}
          {lateDays >= 0 ? (
            <article>
              <span><b>{text.suitLead}</b> {text.suitBody}</span>
              <strong>{formatLong(noNoticeSuitBy, text.dateLocale)}</strong>
              <span>{text.suitNote}</span>
            </article>
          ) : null}
        </div>
      ) : null}
      <p className="legal-guide-tool-note"><TriangleAlert aria-hidden="true" /> {text.note}</p>
    </section>
  );
}
