import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GovernmentClaimDeadlineTool } from '@/components/marketing/GovernmentClaimDeadlineTool';
import { todayPT } from '@/lib/rules/dates';

afterEach(cleanup);

describe('government-claim deadline tool', () => {
  it('prerenders no date limit, and the browser sets today’s after hydration', async () => {
    // The guide page is static: whatever max the server renders is frozen at build time,
    // because React leaves an input's max alone while hydrating.
    const html = renderToString(<GovernmentClaimDeadlineTool />);
    expect(html).not.toMatch(/\bmax=/);

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
    await act(async () => {
      hydrateRoot(container, <GovernmentClaimDeadlineTool />);
    });
    expect(container.querySelector('input[type="date"]')).toHaveAttribute('max', todayPT());
    container.remove();
  });

  it('sets no text under 13px (AGENTS.md rule 6): the "Date of injury" label, the cards, and the note', () => {
    const css = readFileSync(path.join(process.cwd(), 'src/app/(site)/globals.css'), 'utf8');
    const rules = [...css.matchAll(/^\.legal-guide-tool[^{]*\{[^}]*\}/gm)].map((match) => match[0]);
    expect(rules.some((rule) => rule.startsWith('.legal-guide-tool-form label span'))).toBe(true);
    const small = rules.flatMap((rule) => [...rule.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)].filter(([, px]) => Number(px) < 13).map(() => rule.slice(0, 60)));
    expect(small).toEqual([]);
  });

  it('still refuses a future injury date', () => {
    render(<GovernmentClaimDeadlineTool />);
    fireEvent.change(screen.getByLabelText('Date of injury'), { target: { value: '2999-01-01' } });
    expect(screen.getByText('Enter a date on or before today.')).toBeInTheDocument();
  });
});

describe('government-claim deadline tool after the deadlines pass (Gov. Code §§ 911.4, 945.6, 946.6)', () => {
  // Today, in the firm's time zone, is fixed at September 24, 2026.
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-09-24T19:00:00Z'));
  });
  afterEach(() => vi.useRealTimers());

  function check(injuryDate: string) {
    render(<GovernmentClaimDeadlineTool />);
    fireEvent.change(screen.getByLabelText('Date of injury'), { target: { value: injuryDate } });
    return document.body.textContent ?? '';
  }

  it('after the one-year late-claim limit: the window has closed, relief only after a denied application, and no lawsuit dates', () => {
    const text = check('2025-01-10');
    expect(text).toContain(
      '257 days ago — the late-claim window has closed. A court can excuse a missed claim only when a late-claim application was presented within this year and denied (§ 946.6). Speak to a lawyer immediately.',
    );
    // The two-year date assumes a claim was presented (§ 945.6(a)(2)); none can be now.
    expect(text).not.toMatch(/If the claim is presented on time/);
    expect(text).not.toMatch(/January 10, 2027/);
    expect(text).not.toMatch(/only a court petition/);
  });

  it('within the late-claim year: the lawsuit dates show, headed "If the claim is presented on time…"', () => {
    const text = check('2026-01-15');
    expect(text).toMatch(/days ago — see the late-claim window below/);
    expect(text).toMatch(/Friday, January 15, 2027/);
    expect(text).toMatch(/If the claim is presented on time…/);
    expect(text).toMatch(/Saturday, January 15, 2028/);
    expect(text).not.toMatch(/late-claim window has closed/);
  });

  it('within the six months: the lawsuit dates show, headed "If the claim is presented on time…"', () => {
    const text = check('2026-08-01');
    expect(text).toMatch(/Monday, February 1, 2027/);
    expect(text).toMatch(/If the claim is presented on time…/);
    expect(text).toMatch(/Tuesday, August 1, 2028/);
  });
});
