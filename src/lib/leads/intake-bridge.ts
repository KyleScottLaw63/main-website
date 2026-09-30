import { publicLeadMessages, type PublicLeadLocale } from './public-lead-rules';

/**
 * Hands a website inquiry to the firm's intake system: the firm app's
 * (Matterfold) token bridge, POST /api/public/leads
 * (docs/website-lead-intake-bridge.md).
 * The website validates nothing the backend does not validate again and
 * stores nothing: the backend checks, rate-limits, records, and alerts staff,
 * and its answer — already in the visitor's language — is relayed as sent.
 *
 *   MATTERFOLD_INTAKE_ENDPOINT  the bridge URL (https://<backend host>/api/public/leads)
 *   MATTERFOLD_INTAKE_TOKEN     the bearer token; the backend holds the same value as WEBSITE_INTAKE_TOKEN
 *
 * Until both are set, every inquiry is refused with the "please call" line and
 * a server log line — the site never tells a visitor an inquiry was received
 * when nobody will read it.
 */

/** The firm's number as the website prints it (the visitor messages name it). */
const FIRM_PHONE = '714-544-1460';

/** What the bridge accepts (its FIELDS list); anything else a browser sends is dropped. */
const FIELDS = [
  'fullName', 'email', 'phone', 'preferredContact', 'caseType', 'incidentDate', 'incidentCounty',
  'adverseParty', 'briefSummary', 'companyWebsite', 'elapsedMs', 'sourcePage',
  'utmSource', 'utmMedium', 'utmCampaign', 'consentVersion',
] as const;

/** A slow backend never holds the visitor's browser longer than this. */
const BRIDGE_TIMEOUT_MS = 10_000;

export type BridgeConfig = { endpoint: string; token: string };
export type BridgeAnswer = { status: number; message: string };

/** The bridge settings from the environment, or null while the backend is not connected. */
export function intakeBridgeConfig(env: Record<string, string | undefined> = process.env): BridgeConfig | null {
  const endpoint = env.MATTERFOLD_INTAKE_ENDPOINT?.trim() ?? '';
  const token = env.MATTERFOLD_INTAKE_TOKEN?.trim() ?? '';
  if (!endpoint || !token) return null;
  try {
    const url = new URL(endpoint);
    // The token rides in a header: never over plain HTTP except to a backend on this machine.
    const local = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '[::1]';
    if (url.protocol !== 'https:' && !(url.protocol === 'http:' && local)) return null;
  } catch {
    return null;
  }
  return { endpoint, token };
}

/**
 * The JSON route accepts only the site's own pages: the browser's Origin must
 * be this host. Browsers send Origin on every POST; without one, only a
 * same-origin fetch metadata header is accepted.
 */
export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return request.headers.get('sec-fetch-site') === 'same-origin';
  let parsed: URL;
  try {
    parsed = new URL(origin);
  } catch {
    return false;
  }
  const host = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '').split(',')[0].trim().toLowerCase();
  return host !== '' && parsed.host.toLowerCase() === host;
}

/** The visitor's address as the hosting edge reports it (Vercel sets both headers itself), for the backend's rate limit. */
export function visitorAddress(headers: Headers) {
  const address = (headers.get('x-real-ip') ?? headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
  return address && address.length <= 64 ? address : null;
}

/** The bridge payload: the known fields as strings, the consent flag, the language, the entry, and the visitor's address. */
export function bridgePayload(body: Record<string, unknown>, clientIp: string | null) {
  const fields: Record<string, string | boolean | null> = {};
  for (const key of FIELDS) {
    const value = body[key];
    fields[key] = value === undefined || value === null ? '' : String(value);
  }
  fields.consentToContact = body.consentToContact === true;
  // The lead pipeline stores en/es/vi; keep the other site locales visible to staff.
  const siteLanguage = typeof body.language === 'string' ? body.language : 'en';
  fields.language = siteLanguage === 'es' || siteLanguage === 'vi' ? siteLanguage : 'en';
  if ((siteLanguage === 'zh-Hans' || siteLanguage === 'zh-Hant') && fields.briefSummary) {
    fields.briefSummary = `Preferred language: ${siteLanguage}\n\n${fields.briefSummary}`.slice(0, 600);
  }
  fields.entry = body.entry === 'chat' ? 'chat' : 'form';
  fields.clientIp = clientIp;
  return fields;
}

function logFailure(stage: string, detail: string | number) {
  // Never the visitor's name, contact details, or message: only what went wrong where.
  console.error(`[lead] intake bridge: ${stage}`, { detail: String(detail).slice(0, 120) });
}

/**
 * Sends one inquiry across the bridge. Never throws. A received inquiry (201),
 * a refusal of the visitor's input (400), and the backend's rate limit (429)
 * are relayed with the backend's own message; anything else — not connected,
 * a wrong token, the backend down or slow — is logged and becomes the
 * "please call" line in the page's language.
 */
export async function forwardToIntake(
  payload: Record<string, unknown>,
  locale: PublicLeadLocale,
  config: BridgeConfig | null,
  fetchImpl: typeof fetch = fetch,
): Promise<BridgeAnswer> {
  const text = publicLeadMessages(locale, FIRM_PHONE);
  if (!config) {
    logFailure('not connected (set MATTERFOLD_INTAKE_ENDPOINT and MATTERFOLD_INTAKE_TOKEN); inquiry not delivered', 'unconfigured');
    return { status: 503, message: text.failed };
  }

  let response: Response;
  try {
    response = await fetchImpl(config.endpoint, {
      method: 'POST',
      headers: { authorization: `Bearer ${config.token}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(BRIDGE_TIMEOUT_MS),
    });
  } catch (error) {
    // TimeoutError (slow backend), TypeError (DNS, TLS, refused, or a redirect — a POST is never followed).
    logFailure('unreachable', error instanceof Error ? `${error.name}: ${error.message}` : 'failed');
    return { status: 502, message: text.failed };
  }

  const result = (await response.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof result.message === 'string' && result.message.trim() && result.message.length <= 400 ? result.message : '';
  if (response.status === 201) return { status: 201, message: message || text.received };
  if ((response.status === 400 || response.status === 429) && message) return { status: response.status, message };
  logFailure('refused', response.status);
  return { status: 502, message: text.failed };
}
