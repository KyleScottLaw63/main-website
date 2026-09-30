/**
 * Website lead capture — the pure rules shared by the public forms (browser)
 * and the server (docs/website-lead-intake-bridge.md). No server imports.
 *
 *   - the consent wording each form shows, versioned, so the server stores
 *     exactly what the person agreed to (and the SMS disclosure beside the
 *     text-message option);
 *   - the fill-time check, measured by the browser itself (no clock compare);
 *   - visitor messages in English and Spanish;
 *   - what a staff alert may carry: bounded, normalized, attacker-proof fields.
 */

export type PublicLeadEntry = "form" | "chat" | "get_help";
export type PublicLeadLocale = "en" | "es";

/** The version of the consent wording below. Add a new one rather than editing a published version. */
export const PUBLIC_CONSENT_VERSION = "2026-09-24";
const KNOWN_CONSENT_VERSIONS = new Set([PUBLIC_CONSENT_VERSION]);

/** The firm's name as the public website's own pages print it (the marketing forms show this). */
export const WEBSITE_FIRM_NAME = "Kyle Scott Law";

/** A person needs longer than this to fill any of the forms; faster is a script. */
export const MIN_FORM_FILL_MS = 1500;

const CONTACT_CONSENT: Record<PublicLeadEntry, Record<PublicLeadLocale, (firm: string) => string>> = {
  form: {
    en: (firm) => `I give ${firm} permission to contact me about this inquiry. I understand that submitting this form does not create an attorney-client relationship.`,
    es: (firm) => `Autorizo a ${firm} a comunicarse conmigo sobre esta solicitud. Entiendo que enviar este formulario no crea una relación abogado-cliente.`,
  },
  chat: {
    en: (firm) => `I give ${firm} permission to contact me about this inquiry.`,
    es: (firm) => `Autorizo a ${firm} a comunicarse conmigo sobre esta solicitud.`,
  },
  get_help: {
    en: (firm) => `I give ${firm} permission to contact me about this inquiry. I understand that submitting this form does not create an attorney-client relationship and the firm has not accepted my case.`,
    es: (firm) => `Autorizo a ${firm} a comunicarse conmigo sobre esta solicitud. Entiendo que enviar este formulario no crea una relación abogado-cliente y que el bufete no ha aceptado mi caso.`,
  },
};

const SMS_DISCLOSURE: Record<PublicLeadLocale, (firm: string) => string> = {
  en: (firm) => `Text messages: by choosing text messages, you agree that ${firm} may text you about this inquiry at the number you gave. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of hiring the firm.`,
  es: (firm) => `Mensajes de texto: al elegir mensajes de texto, usted acepta que ${firm} le envíe mensajes de texto sobre esta solicitud al número que indicó. La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para cancelar o HELP para obtener ayuda. El consentimiento no es una condición para contratar al bufete.`,
};

/** The permission-to-contact sentence a form shows next to its checkbox. */
export function contactConsentText(entry: PublicLeadEntry, locale: PublicLeadLocale, firmName: string) {
  return CONTACT_CONSENT[entry][locale](firmName);
}

/** The text-message disclosure shown beside the "Text message" option. */
export function smsDisclosureText(locale: PublicLeadLocale, firmName: string) {
  return SMS_DISCLOSURE[locale](firmName);
}

export function isKnownConsentVersion(version: string) {
  return KNOWN_CONSENT_VERSIONS.has(version.trim());
}

/** Exactly what the person agreed to, as stored with the lead. */
export function consentWording(input: { entry: PublicLeadEntry; locale: PublicLeadLocale; firmName: string; sms: boolean }) {
  const contact = contactConsentText(input.entry, input.locale, input.firmName);
  return input.sms ? `${contact}\n${smsDisclosureText(input.locale, input.firmName)}` : contact;
}

/**
 * The fill-time check. The browser measures how long the form was open
 * (`elapsedMs`, from its monotonic clock, at submit) and sends that; nothing
 * compares the browser's clock with the server's, so a wrong computer clock
 * never blocks anyone, and a person's retry always passes.
 */
export function formFillCheck(fields: { elapsedMs?: unknown }): "ok" | "too_fast" | "missing" {
  const raw = fields.elapsedMs;
  if (raw === undefined || raw === null || String(raw).trim() === "") return "missing";
  const elapsed = Number(raw);
  if (!Number.isFinite(elapsed)) return "missing";
  return elapsed < MIN_FORM_FILL_MS ? "too_fast" : "ok";
}

/** A phone number as people type one: 7 to 15 digits, common separators, an optional extension. */
export function isPlausiblePhone(value: string) {
  const text = value.trim();
  if (!/^[0-9+().\-\s]{7,25}(\s*(?:x|ext\.?)\s*\d{1,6})?$/i.test(text)) return false;
  const digits = text.replace(/(\s*(?:x|ext\.?)\s*\d{1,6})$/i, "").replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export type PublicLeadMessages = {
  received: string;
  name: string;
  email: string;
  phone: string;
  contact: string;
  smsPhone: string;
  summary: string;
  summaryLong: string;
  consent: string;
  futureDate: string;
  tooFast: string;
  review: string;
  reload: string;
  tooLarge: string;
  rateLimited: string;
  failed: string;
};

/** Everything a visitor can be told, in the language of the page they used. */
export function publicLeadMessages(locale: PublicLeadLocale, telephone: string): PublicLeadMessages {
  if (locale === "es") {
    return {
      received: "Recibimos su información. Un integrante del bufete la revisará y se comunicará con usted.",
      name: "Escriba su nombre completo.",
      email: "Escriba un correo electrónico válido.",
      phone: "Escriba un número de teléfono válido.",
      contact: "Escriba un correo electrónico o un número de teléfono.",
      smsPhone: "Escriba el número de celular para los mensajes de texto.",
      summary: "Describa brevemente lo que ocurrió.",
      summaryLong: "La descripción debe tener menos de 600 caracteres.",
      consent: "Autorice al bufete para responderle.",
      futureDate: "La fecha del incidente no puede ser futura.",
      tooFast: "Revise el formulario un momento y vuelva a enviarlo.",
      review: "Revise el formulario e inténtelo de nuevo.",
      reload: "Este formulario se actualizó. Vuelva a cargar la página y envíelo de nuevo.",
      tooLarge: "La solicitud es demasiado larga. Acorte la descripción e inténtelo de nuevo.",
      rateLimited: `Recibimos varias solicitudes desde su conexión. Llame al ${telephone} o inténtelo más tarde.`,
      failed: `No se pudo enviar su solicitud. Llame al ${telephone}.`,
    };
  }
  return {
    received: "Your information was received. A member of the firm will review it and contact you.",
    name: "Enter your full name.",
    email: "Enter a valid email.",
    phone: "Enter a valid phone number.",
    contact: "Enter an email address or phone number.",
    smsPhone: "Enter the mobile number for text messages.",
    summary: "Give a brief description of what happened.",
    summaryLong: "Keep the description under 600 characters.",
    consent: "Permission to respond is required.",
    futureDate: "The incident date cannot be in the future.",
    tooFast: "Please take a moment to review the form, then submit it again.",
    review: "Review the form and try again.",
    reload: "This form was updated. Reload the page and submit it again.",
    tooLarge: "The inquiry is too long. Shorten the description and try again.",
    rateLimited: `We received several requests from your connection. Please call ${telephone}, or try again later.`,
    failed: `Your request could not be submitted. Please call ${telephone}.`,
  };
}

// ---------------------------------------------------------------- staff alerts

/** Where the inquiry came from, as a staff alert may say it. The page path stays in the database only. */
export function leadEntryLabel(entry: PublicLeadEntry) {
  return entry === "chat" ? "Website chat" : "Website form";
}

const CONTROL = /[\p{Cc}\p{Cf}\u2028\u2029]/gu;
const TLD = "(?:com|net|org|info|biz|io|co|us|me|ly|app|dev|xyz|top|site|online|shop|store|live|link|click|ru|cn|tk|ml|ga|cf|gq|ws|cc|tv|gg|to|ai|sh|la|pw|win|vip|club|fun|icu|buzz|cam|mx|ca|uk|de|fr|es|it|nl|br|in|au|jp|kr|eu|pro|page|world|news|space|website|tech|cloud|email|work|life|zone|gov|edu|mobi|asia|lol|best|bid|loan|men|date|party|review|trade|science|download|stream|help|support)";
const URLISH = new RegExp(String.raw`[a-z][a-z0-9+.-]*:\S+|www\.\S*|\S+@\S+|\b[\w-]+(?:\.[\w-]+)*\.${TLD}\b\S*`, "giu");

/** A name for an alert: no control or direction characters, no links or addresses, at most `max` characters. */
export function alertSafeName(value: string, max = 60) {
  const cleaned = value.normalize("NFKC").replace(CONTROL, " ").replace(URLISH, " ").replace(/[<>]/g, " ").replace(/\s+/g, " ").trim();
  const characters = Array.from(cleaned);
  const bounded = characters.length > max ? `${characters.slice(0, max - 1).join("").trimEnd()}…` : cleaned;
  return bounded || "Name withheld";
}

/** A phone number for an alert: digits only (7 to 15), or null. */
export function alertPhoneDigits(value: string | null | undefined) {
  const digits = (value ?? "").replace(/\D/g, "").slice(0, 15);
  return digits.length >= 7 ? digits : null;
}

/** An email address for an alert: a plain, lowercased address of a bounded length, or null. */
export function alertSafeEmail(value: string | null | undefined) {
  const email = (value ?? "").normalize("NFKC").trim().toLowerCase();
  return email.length <= 120 && /^[a-z0-9._%+-]{1,64}@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,24}$/.test(email) ? email : null;
}

// ---------------------------------------------------------------- rate limit

/**
 * The network identity a rate limit counts: an IPv4 address, or an IPv6
 * address's /64 (a host can rotate addresses inside its /64). The server
 * hashes it with a secret before it is stored.
 */
export function rateLimitAddress(raw: string | null | undefined) {
  const first = (raw ?? "").split(",")[0]?.trim() ?? "";
  if (!first) return "unknown";
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(first);
  if (mapped) return mapped[1];
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(first)) return first;
  if (first.includes(":")) {
    const bare = first.replace(/^\[/, "").replace(/\](?::\d+)?$/, "").split("%")[0].toLowerCase();
    const [head, tail] = bare.split("::");
    const headGroups = head ? head.split(":") : [];
    const tailGroups = tail === undefined ? [] : tail ? tail.split(":") : [];
    const groups = bare.includes("::")
      ? [...headGroups, ...Array<string>(Math.max(0, 8 - headGroups.length - tailGroups.length)).fill("0"), ...tailGroups]
      : headGroups;
    if (groups.length === 8 && groups.every((group) => /^[0-9a-f]{1,4}$/.test(group))) {
      return `${groups.slice(0, 4).map((group) => group.replace(/^0+(?=.)/, "")).join(":")}::/64`;
    }
  }
  return first.slice(0, 64);
}
