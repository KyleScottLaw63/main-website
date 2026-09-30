import { bridgePayload, forwardToIntake, intakeBridgeConfig, isSameOriginRequest, visitorAddress } from '@/lib/leads/intake-bridge';
import { publicLeadMessages, type PublicLeadLocale } from '@/lib/leads/public-lead-rules';

export const runtime = 'nodejs';

const FIRM_PHONE = '714-544-1460';

/**
 * The website's consultation form and the chat assistant post here (JSON).
 * Only the site's own pages may post: the Origin must be this host and the
 * body JSON. The inquiry goes on to the firm's intake system over the token
 * bridge (src/lib/leads/intake-bridge.ts, docs/website-lead-intake-bridge.md);
 * every message the visitor sees is in the page's language and none carries
 * backend detail.
 */
export async function POST(request: Request) {
  const responseHeaders = { 'cache-control': 'no-store' };
  let locale: PublicLeadLocale = 'en';
  const answer = (status: number, message: string) => Response.json({ message }, { status, headers: responseHeaders });

  if (!isSameOriginRequest(request)) return answer(403, publicLeadMessages(locale, FIRM_PHONE).failed);
  if (!(request.headers.get('content-type') ?? '').toLowerCase().includes('application/json')) {
    return answer(415, publicLeadMessages(locale, FIRM_PHONE).failed);
  }
  if (Number(request.headers.get('content-length') ?? '0') > 24_000) {
    return answer(413, publicLeadMessages(locale, FIRM_PHONE).tooLarge);
  }

  // The header can be absent (a chunked body), so the length is checked again on what arrived.
  const raw = await request.text().catch(() => '');
  if (raw.length > 24_000) return answer(413, publicLeadMessages(locale, FIRM_PHONE).tooLarge);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed as Record<string, unknown>;
  } catch {
    return answer(400, publicLeadMessages(locale, FIRM_PHONE).review);
  }
  locale = body.language === 'es' ? 'es' : 'en';

  const result = await forwardToIntake(bridgePayload(body, visitorAddress(request.headers)), locale, intakeBridgeConfig());
  return answer(result.status, result.message);
}
