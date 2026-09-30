import { publicLeadMessages, type PublicLeadLocale } from '@/lib/leads/public-lead-rules';

/** The firm's number as the website prints it. */
const FIRM_PHONE = '714-544-1460';

/** Thrown by a public form for a refusal the server sent back; its message is already in the page's language. */
export class ServerRefusal extends Error {}

/**
 * What the consultation form and the chat show when sending fails. A refusal from the server keeps
 * its own message. Anything else the form did not create itself (a dropped connection makes fetch
 * throw the browser's own English: "Failed to fetch", "Load failed") shows the page-language
 * "could not be submitted, please call" line the server uses for its own failures.
 */
export function submissionErrorMessage(error: unknown, locale: PublicLeadLocale) {
  return error instanceof ServerRefusal && error.message ? error.message : publicLeadMessages(locale, FIRM_PHONE).failed;
}
