#!/usr/bin/env node
/**
 * Connection check for the consultation form (docs/website-lead-intake-bridge.md).
 * Asks the firm app's bridge for the consent wording it will store with every lead
 * (GET /api/public/leads, same bearer token) and compares it with the wording this
 * site shows beside its checkboxes. Nothing is submitted and no lead is created.
 *
 *   MATTERFOLD_INTAKE_ENDPOINT=https://<app host>/api/public/leads \
 *   MATTERFOLD_INTAKE_TOKEN=<token> npm run check:intake
 *
 * (Or put both in .env.local; this script reads it.) Exit code 0 only when the app
 * answers, the consent version matches, and all eight texts match word for word.
 * A mismatch usually means the app's Settings → Company Profile name is not exactly
 * "Kyle Scott Law", or one side changed its wording without the other.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = path.join(root, ".env.local");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  }
}

// Node 22.18+ runs the site's TypeScript rules file directly (type stripping; it has no imports).
const rules = await import(pathToFileURL(path.join(root, "src/lib/leads/public-lead-rules.ts")).href);

// The same settings rule as the site (intakeBridgeConfig in src/lib/leads/intake-bridge.ts).
const endpoint = process.env.MATTERFOLD_INTAKE_ENDPOINT?.trim() ?? "";
const token = process.env.MATTERFOLD_INTAKE_TOKEN?.trim() ?? "";
let secure = false;
try {
  const url = new URL(endpoint);
  secure = url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname));
} catch {
  secure = false;
}
if (!endpoint || !token || !secure) {
  console.error("Not connected: set MATTERFOLD_INTAKE_ENDPOINT (https://…/api/public/leads) and MATTERFOLD_INTAKE_TOKEN.");
  process.exit(1);
}
const config = { endpoint, token };

let response;
try {
  response = await fetch(config.endpoint, {
    headers: { authorization: `Bearer ${config.token}` },
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
} catch (error) {
  console.error(`Unreachable: ${config.endpoint} (${error instanceof Error ? error.message : error})`);
  process.exit(1);
}
const answer = await response.json().catch(() => ({}));
if (response.status !== 200) {
  const why = {
    401: "the token does not match the app's WEBSITE_INTAKE_TOKEN",
    404: "no bridge at that address (the endpoint must end in /api/public/leads)",
    405: "this app has no consent-wording endpoint (an older backend)",
    503: "the app's bridge is off (WEBSITE_INTAKE_TOKEN unset) or its Company Profile is not set up",
  }[response.status] ?? "unexpected answer";
  console.error(`The app answered ${response.status}: ${why}.${answer.message ? ` (“${answer.message}”)` : ""}`);
  process.exit(1);
}

const problems = [];
if (answer.consentVersion !== rules.PUBLIC_CONSENT_VERSION) {
  problems.push(`consent version: app ${answer.consentVersion}, site ${rules.PUBLIC_CONSENT_VERSION}`);
}
for (const entry of ["form", "chat"]) {
  for (const locale of ["en", "es"]) {
    const app = answer.entries?.[entry]?.[locale] ?? {};
    const site = {
      contactConsent: rules.contactConsentText(entry, locale, rules.WEBSITE_FIRM_NAME),
      smsDisclosure: rules.smsDisclosureText(locale, rules.WEBSITE_FIRM_NAME),
    };
    for (const key of ["contactConsent", "smsDisclosure"]) {
      if (app[key] !== site[key]) problems.push(`${entry}/${locale} ${key}:\n      app:  ${app[key]}\n      site: ${site[key]}`);
    }
  }
}

if (problems.length) {
  console.error(`Connected, but the consent wording differs (${problems.length}):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`Connected: ${config.endpoint} answers, consent version ${answer.consentVersion}, all 8 texts match the site word for word.`);
