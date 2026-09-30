// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../api/consultation/route';
import { publicLeadMessages } from '@/lib/leads/public-lead-rules';

/**
 * POST /api/consultation, the door the consultation form and the chat use: its guards, and that a
 * visitor's inquiry reaches the backend bridge exactly once. Fictional visitor; fetch is replaced.
 */

const EN = publicLeadMessages('en', '714-544-1460');
const ES = publicLeadMessages('es', '714-544-1460');
const INQUIRY = {
  fullName: 'Rosa Fictional', phone: '7145550100', email: '', preferredContact: 'phone', language: 'es', caseType: 'auto',
  briefSummary: 'Tipo de caso: Accidente de auto o camión\n\nA fictional crash.', consentToContact: true, consentVersion: '2026-09-24',
  companyWebsite: '', elapsedMs: 5200, entry: 'form', sourcePage: '/es/contacto', utmSource: '', utmMedium: '', utmCampaign: '',
};

function consultation(body: string, headers: Record<string, string> = {}) {
  return POST(new Request('https://kjslaw.com/api/consultation', {
    method: 'POST',
    headers: { origin: 'https://kjslaw.com', host: 'kjslaw.com', 'content-type': 'application/json', 'x-real-ip': '198.51.100.7', ...headers },
    body,
  }));
}

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  fetchMock.mockReset();
});

describe('POST /api/consultation', () => {
  it('connected: forwards the inquiry once, with the token and the visitor address, and relays the confirmation', async () => {
    vi.stubEnv('MATTERFOLD_INTAKE_ENDPOINT', 'https://backend.example/api/public/leads');
    vi.stubEnv('MATTERFOLD_INTAKE_TOKEN', 'fictional-token-0123456789abcdef');
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: ES.received }), { status: 201 }));
    const response = await consultation(JSON.stringify(INQUIRY));
    expect(response.status).toBe(201);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ message: ES.received });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://backend.example/api/public/leads');
    expect((init.headers as Record<string, string>).authorization).toBe('Bearer fictional-token-0123456789abcdef');
    expect(JSON.parse(String(init.body))).toMatchObject({ ...INQUIRY, elapsedMs: '5200', clientIp: '198.51.100.7' });
  });

  it('not connected yet: the "please call" line in the page’s language, and nothing is sent anywhere', async () => {
    vi.stubEnv('MATTERFOLD_INTAKE_ENDPOINT', '');
    vi.stubEnv('MATTERFOLD_INTAKE_TOKEN', '');
    const response = await consultation(JSON.stringify(INQUIRY));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ message: ES.failed });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('refuses another site, a non-JSON body, an oversized body, and a malformed one before anything is sent', async () => {
    expect((await consultation(JSON.stringify(INQUIRY), { origin: 'https://attacker.example' })).status).toBe(403);
    expect((await consultation('fullName=Rosa', { 'content-type': 'application/x-www-form-urlencoded' })).status).toBe(415);
    const large = await consultation(JSON.stringify({ ...INQUIRY, briefSummary: 'x'.repeat(30_000) }));
    expect(large.status).toBe(413);
    expect(await large.json()).toEqual({ message: EN.tooLarge });
    const malformed = await consultation('{"fullName":');
    expect(malformed.status).toBe(400);
    expect(await malformed.json()).toEqual({ message: EN.review });
    expect((await consultation('[1,2]')).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
