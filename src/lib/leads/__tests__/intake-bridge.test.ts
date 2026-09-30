// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { bridgePayload, forwardToIntake, intakeBridgeConfig, isSameOriginRequest, visitorAddress } from '@/lib/leads/intake-bridge';
import { publicLeadMessages } from '@/lib/leads/public-lead-rules';

/**
 * The website's half of the lead bridge (docs/website-lead-intake-bridge.md): what it sends to
 * the backend's POST /api/public/leads and what the visitor is told. Fictional visitor; fetch is
 * replaced, nothing leaves the test.
 */

const EN = publicLeadMessages('en', '714-544-1460');
const ES = publicLeadMessages('es', '714-544-1460');
const CONFIG = { endpoint: 'https://backend.example/api/public/leads', token: 'fictional-token-0123456789abcdef' };

function backend(status: number, body: unknown) {
  return vi.fn(async () => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } }));
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('the bridge settings', () => {
  it('are off until both the endpoint and the token are set', () => {
    expect(intakeBridgeConfig({})).toBeNull();
    expect(intakeBridgeConfig({ MATTERFOLD_INTAKE_ENDPOINT: CONFIG.endpoint })).toBeNull();
    expect(intakeBridgeConfig({ MATTERFOLD_INTAKE_TOKEN: CONFIG.token })).toBeNull();
    expect(intakeBridgeConfig({ MATTERFOLD_INTAKE_ENDPOINT: ` ${CONFIG.endpoint} `, MATTERFOLD_INTAKE_TOKEN: ` ${CONFIG.token} ` })).toEqual(CONFIG);
  });

  it('never send the token over plain HTTP, except to a backend on this machine', () => {
    expect(intakeBridgeConfig({ MATTERFOLD_INTAKE_ENDPOINT: 'http://backend.example/api/public/leads', MATTERFOLD_INTAKE_TOKEN: CONFIG.token })).toBeNull();
    expect(intakeBridgeConfig({ MATTERFOLD_INTAKE_ENDPOINT: 'not a url', MATTERFOLD_INTAKE_TOKEN: CONFIG.token })).toBeNull();
    expect(intakeBridgeConfig({ MATTERFOLD_INTAKE_ENDPOINT: 'http://127.0.0.1:3011/api/public/leads', MATTERFOLD_INTAKE_TOKEN: CONFIG.token })).not.toBeNull();
    expect(intakeBridgeConfig({ MATTERFOLD_INTAKE_ENDPOINT: 'http://localhost:3011/api/public/leads', MATTERFOLD_INTAKE_TOKEN: CONFIG.token })).not.toBeNull();
  });
});

describe('what crosses the bridge', () => {
  it('the fields the backend accepts, as strings, plus consent, language, entry, and the visitor address', () => {
    const payload = bridgePayload({
      fullName: 'Rosa Fictional', phone: '7145550100', email: null, preferredContact: 'phone', language: 'es', caseType: 'auto',
      briefSummary: 'A fictional crash.', consentToContact: true, consentVersion: '2026-09-24', companyWebsite: '', elapsedMs: 4200,
      entry: 'chat', sourcePage: '/es#chat', injected: 'dropped', clientIp: '203.0.113.9',
    }, '198.51.100.7');
    expect(payload).toMatchObject({
      fullName: 'Rosa Fictional', phone: '7145550100', email: '', language: 'es', caseType: 'auto', consentToContact: true,
      consentVersion: '2026-09-24', elapsedMs: '4200', entry: 'chat', sourcePage: '/es#chat', clientIp: '198.51.100.7',
    });
    expect(payload).not.toHaveProperty('injected');
  });

  it('consent is only ever the boolean true; unknown entries are the form; other site languages reach staff as English with a note', () => {
    const payload = bridgePayload({ consentToContact: 'yes', entry: 'get_help', language: 'zh-Hant', briefSummary: 'A fictional fall.' }, null);
    expect(payload.consentToContact).toBe(false);
    expect(payload.entry).toBe('form');
    expect(payload.language).toBe('en');
    expect(payload.briefSummary).toBe('Preferred language: zh-Hant\n\nA fictional fall.');
    expect(payload.clientIp).toBeNull();
  });

  it('the visitor address is the edge-reported one, first hop only, bounded', () => {
    expect(visitorAddress(new Headers({ 'x-real-ip': '203.0.113.9', 'x-forwarded-for': '198.51.100.1' }))).toBe('203.0.113.9');
    expect(visitorAddress(new Headers({ 'x-forwarded-for': '198.51.100.1, 10.0.0.1' }))).toBe('198.51.100.1');
    expect(visitorAddress(new Headers({ 'x-real-ip': 'x'.repeat(65) }))).toBeNull();
    expect(visitorAddress(new Headers())).toBeNull();
  });
});

describe('what the visitor is told', () => {
  it('a received inquiry: the backend’s own confirmation', async () => {
    const fetchImpl = backend(201, { message: ES.received });
    expect(await forwardToIntake({ fullName: 'Rosa Fictional' }, 'es', CONFIG, fetchImpl)).toEqual({ status: 201, message: ES.received });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(CONFIG.endpoint);
    expect(init.method).toBe('POST');
    expect((init.headers as Record<string, string>).authorization).toBe(`Bearer ${CONFIG.token}`);
    expect(init.redirect).toBe('error');
    expect(JSON.parse(String(init.body))).toEqual({ fullName: 'Rosa Fictional' });
  });

  it('a refusal of what was typed (400) or the rate limit (429): the backend’s message, same status', async () => {
    expect(await forwardToIntake({}, 'en', CONFIG, backend(400, { message: EN.phone }))).toEqual({ status: 400, message: EN.phone });
    expect(await forwardToIntake({}, 'es', CONFIG, backend(429, { message: ES.rateLimited }))).toEqual({ status: 429, message: ES.rateLimited });
  });

  it('not connected: the "please call" line, and nothing is sent', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchImpl = backend(201, {});
    expect(await forwardToIntake({}, 'es', null, fetchImpl)).toEqual({ status: 503, message: ES.failed });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('a wrong token, the backend down or unreachable, or an answer without a message: the "please call" line, never backend text', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    for (const [status, body] of [[401, { message: 'Unauthorized.' }], [503, { message: 'Website intake is not configured.' }], [500, {}], [400, {}], [302, {}]] as const) {
      expect(await forwardToIntake({}, 'en', CONFIG, backend(status, body)), String(status)).toEqual({ status: 502, message: EN.failed });
    }
    const unreachable = vi.fn(async () => { throw new TypeError('fetch failed'); });
    expect(await forwardToIntake({}, 'es', CONFIG, unreachable)).toEqual({ status: 502, message: ES.failed });
    // The log says what went wrong, never who wrote.
    expect(JSON.stringify(log.mock.calls)).not.toMatch(/Rosa|7145550100/);
  });
});

describe('same origin', () => {
  const post = (headers: Record<string, string>) => new Request('https://kjslaw.com/api/consultation', { method: 'POST', headers });

  it('accepts the site’s own pages', () => {
    expect(isSameOriginRequest(post({ origin: 'https://kjslaw.com', host: 'kjslaw.com' }))).toBe(true);
    expect(isSameOriginRequest(post({ origin: 'https://kjslaw.com', 'x-forwarded-host': 'kjslaw.com', host: 'internal' }))).toBe(true);
    expect(isSameOriginRequest(post({ 'sec-fetch-site': 'same-origin', host: 'kjslaw.com' }))).toBe(true);
  });

  it('refuses another site, a missing host, and a request with neither Origin nor same-origin metadata', () => {
    expect(isSameOriginRequest(post({ origin: 'https://attacker.example', host: 'kjslaw.com' }))).toBe(false);
    expect(isSameOriginRequest(post({ origin: 'https://kjslaw.com' }))).toBe(false);
    expect(isSameOriginRequest(post({ origin: 'null', host: 'kjslaw.com' }))).toBe(false);
    expect(isSameOriginRequest(post({ host: 'kjslaw.com' }))).toBe(false);
    expect(isSameOriginRequest(post({ 'sec-fetch-site': 'cross-site', host: 'kjslaw.com' }))).toBe(false);
  });
});
