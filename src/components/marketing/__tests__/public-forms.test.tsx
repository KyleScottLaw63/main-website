import '@testing-library/jest-dom/vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { ChatWidgetPanel } from '@/components/marketing/ChatWidgetPanel';
import { ConsultationForm } from '@/components/marketing/ConsultationForm';
import { publicLeadMessages } from '@/lib/leads/public-lead-rules';

/**
 * The website's consultation form and chat (fictional visitor, rule 10): what they say when sending
 * fails, and the chat button's spoken name. Nothing reaches a server: fetch is replaced.
 */

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const FAILED = { en: publicLeadMessages('en', '714-544-1460').failed, es: publicLeadMessages('es', '714-544-1460').failed };

function stubFetch(result: Error | { status: number; body: unknown }) {
  vi.stubGlobal('fetch', vi.fn(async () => {
    if (result instanceof Error) throw result;
    return new Response(JSON.stringify(result.body), { status: result.status, headers: { 'content-type': 'application/json' } });
  }));
}

async function sendConsultation(locale: 'en' | 'es') {
  const { container } = render(<ConsultationForm locale={locale} />);
  const form = container.querySelector('form')!;
  fireEvent.change(form.querySelector('input[name="fullName"]')!, { target: { value: 'Rosa Fictional' } });
  fireEvent.change(form.querySelector('input[name="phone"]')!, { target: { value: '7145550100' } });
  fireEvent.change(form.querySelector('select[name="caseTypeChoice"]')!, { target: { value: 'car_truck' } });
  fireEvent.change(form.querySelector('textarea[name="briefSummary"]')!, { target: { value: 'A fictional crash on a fictional street.' } });
  fireEvent.click(screen.getByRole('checkbox'));
  await act(async () => {
    fireEvent.submit(form);
  });
  return screen.getByRole('alert');
}

async function sendChat(locale: 'en' | 'es') {
  render(<ChatWidgetPanel locale={locale} />);
  const form = document.querySelector<HTMLFormElement>('form.chat-form')!;
  fireEvent.change(form.querySelector('select')!, { target: { value: 'auto' } });
  fireEvent.change(form.querySelector('input[name="fullName"]')!, { target: { value: 'Rosa Fictional' } });
  fireEvent.change(form.querySelector('input[name="phone"]')!, { target: { value: '7145550100' } });
  fireEvent.change(form.querySelector('textarea[name="briefSummary"]')!, { target: { value: 'A fictional crash on a fictional street.' } });
  fireEvent.click(screen.getByRole('checkbox'));
  await act(async () => {
    fireEvent.submit(form);
  });
  return screen.getByRole('alert');
}

describe('when sending fails, the forms speak the page’s language', () => {
  it('the consultation form: a dropped connection shows "could not be submitted, please call", never the browser’s English', async () => {
    stubFetch(new TypeError('Failed to fetch'));
    expect(await sendConsultation('es')).toHaveTextContent(FAILED.es);
    expect(document.body).not.toHaveTextContent('Failed to fetch');
    cleanup();
    stubFetch(new TypeError('Load failed'));
    expect(await sendConsultation('en')).toHaveTextContent(FAILED.en);
    expect(document.body).not.toHaveTextContent('Load failed');
  });

  it('the consultation form: a refusal from the server keeps the server’s own message', async () => {
    stubFetch({ status: 429, body: { message: publicLeadMessages('es', '714-544-1460').rateLimited } });
    expect(await sendConsultation('es')).toHaveTextContent(publicLeadMessages('es', '714-544-1460').rateLimited);
    cleanup();
    stubFetch({ status: 500, body: {} });
    expect(await sendConsultation('en')).toHaveTextContent(FAILED.en);
  });

  it('the chat: a dropped connection shows the same line in the page’s language', async () => {
    stubFetch(new TypeError('Load failed'));
    expect(await sendChat('es')).toHaveTextContent(FAILED.es);
    expect(document.body).not.toHaveTextContent('Load failed');
    cleanup();
    stubFetch(new TypeError('Failed to fetch'));
    expect(await sendChat('en')).toHaveTextContent(FAILED.en);
  });
});

describe('the chat button (WCAG 2.5.3, Label in Name)', () => {
  it('its spoken name starts with the words it shows, on both sites and in both states', () => {
    for (const locale of ['en', 'es'] as const) {
      render(<ChatWidget locale={locale} />);
      const button = screen.getByRole('button');
      const visible = button.textContent!.trim();
      expect(visible).toBe(locale === 'es' ? 'Pregunte a KJS' : 'Ask KJS');
      expect(button.getAttribute('aria-label')!.startsWith(visible)).toBe(true);
      cleanup();

      render(<ChatWidgetPanel locale={locale} />);
      const trigger = document.querySelector<HTMLButtonElement>('button.chat-launcher')!;
      expect(trigger.getAttribute('aria-label')!.startsWith(trigger.textContent!.trim())).toBe(true);
      cleanup();
    }
  });
});
