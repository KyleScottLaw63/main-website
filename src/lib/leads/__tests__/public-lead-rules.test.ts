import { describe, expect, it } from "vitest";
import {
  alertPhoneDigits,
  alertSafeEmail,
  alertSafeName,
  consentWording,
  contactConsentText,
  formFillCheck,
  isKnownConsentVersion,
  isPlausiblePhone,
  leadEntryLabel,
  MIN_FORM_FILL_MS,
  PUBLIC_CONSENT_VERSION,
  publicLeadMessages,
  rateLimitAddress,
  smsDisclosureText,
} from "../public-lead-rules";

describe("the fill-time check", () => {
  it("uses the time the browser measured, never its clock", () => {
    expect(formFillCheck({ elapsedMs: "900" })).toBe("too_fast");
    expect(formFillCheck({ elapsedMs: String(MIN_FORM_FILL_MS) })).toBe("ok");
    expect(formFillCheck({ elapsedMs: 86_400_000 * 3 })).toBe("ok");
    expect(formFillCheck({})).toBe("missing");
    expect(formFillCheck({ elapsedMs: "soon" })).toBe("missing");
  });

  it("ignores an absolute start time: only the measured duration counts", () => {
    expect(formFillCheck({ startedAt: String(Date.now() - 60_000) } as never)).toBe("missing");
  });
});

describe("phone numbers", () => {
  it("accepts numbers as people type them and refuses anything else", () => {
    for (const phone of ["(714) 544-1460", "714.544.1460", "+1 714 544 1460", "714-544-1460 ext 12"]) expect(isPlausiblePhone(phone)).toBe(true);
    for (const phone of ["call me", "https://evil.example", "12345", "714-544-1460; drop", "1".repeat(20)]) expect(isPlausiblePhone(phone)).toBe(false);
  });
});

describe("consent wording", () => {
  it("is the exact text each form shows, versioned, with the SMS disclosure when texts were chosen", () => {
    expect(isKnownConsentVersion(PUBLIC_CONSENT_VERSION)).toBe(true);
    expect(isKnownConsentVersion("")).toBe(false);
    expect(contactConsentText("form", "en", "Kyle Scott Law")).toBe("I give Kyle Scott Law permission to contact me about this inquiry. I understand that submitting this form does not create an attorney-client relationship.");
    expect(contactConsentText("chat", "es", "Kyle Scott Law")).toBe("Autorizo a Kyle Scott Law a comunicarse conmigo sobre esta solicitud.");
    const sms = consentWording({ entry: "form", locale: "en", firmName: "Kyle Scott Law", sms: true });
    expect(sms).toContain(smsDisclosureText("en", "Kyle Scott Law"));
    for (const words of ["Message frequency varies", "Message and data rates may apply", "Reply STOP", "HELP"]) expect(sms).toContain(words);
    const spanish = smsDisclosureText("es", "Kyle Scott Law");
    for (const words of ["La frecuencia de los mensajes varía", "tarifas de mensajes y datos", "STOP", "HELP"]) expect(spanish).toContain(words);
    expect(consentWording({ entry: "chat", locale: "en", firmName: "Kyle Scott Law", sms: false })).not.toContain("STOP");
  });
});

describe("visitor messages", () => {
  it("answer the Spanish site in Spanish, with the firm's number", () => {
    const text = publicLeadMessages("es", "714-544-1460");
    expect(text.tooFast).toMatch(/^Revise el formulario/);
    expect(text.failed).toBe("No se pudo enviar su solicitud. Llame al 714-544-1460.");
    expect(publicLeadMessages("en", "714-544-1460").rateLimited).toContain("714-544-1460");
  });
});

describe("what a staff alert may carry", () => {
  it("strips control and direction characters, links and addresses from the name, and bounds it", () => {
    expect(alertSafeName("Maria\u202e Delgado\u0007")).toBe("Maria Delgado");
    expect(alertSafeName("Win $$$ at https://evil.example/pay now")).toBe("Win $$$ at now");
    expect(alertSafeName("Call www.evil.example or evil.com/pay")).toBe("Call or");
    expect(alertSafeName("Pay me@evil.example")).toBe("Pay");
    expect(alertSafeName("Mary St.John")).toBe("Mary St.John");
    expect(Array.from(alertSafeName("A".repeat(140))).length).toBe(60);
    expect(alertSafeName("https://evil.example")).toBe("Name withheld");
  });

  it("keeps digits only for phones and plain addresses for email", () => {
    expect(alertPhoneDigits("(714) 544-1460")).toBe("7145441460");
    expect(alertPhoneDigits("call now")).toBeNull();
    expect(alertSafeEmail(" Maria.Delgado@Client.Example ")).toBe("maria.delgado@client.example");
    expect(alertSafeEmail("maria@client.example\nBcc: x@evil.example")).toBeNull();
    expect(alertSafeEmail("not an email")).toBeNull();
  });

  it("names the source generically, never the page", () => {
    expect(leadEntryLabel("form")).toBe("Website form");
    expect(leadEntryLabel("get_help")).toBe("Website form");
    expect(leadEntryLabel("chat")).toBe("Website chat");
  });
});

describe("the rate limit's network identity", () => {
  it("counts IPv4 addresses and IPv6 /64 prefixes", () => {
    expect(rateLimitAddress("203.0.113.7")).toBe("203.0.113.7");
    expect(rateLimitAddress("203.0.113.7, 10.0.0.1")).toBe("203.0.113.7");
    expect(rateLimitAddress("::ffff:203.0.113.7")).toBe("203.0.113.7");
    expect(rateLimitAddress("2001:db8:abcd:12::1")).toBe("2001:db8:abcd:12::/64");
    expect(rateLimitAddress("2001:0db8:abcd:0012:ffff:1:2:3")).toBe("2001:db8:abcd:12::/64");
    expect(rateLimitAddress(null)).toBe("unknown");
  });
});
