# Website Lead Intake (the bridge to the firm app)

How an inquiry from kjslaw.com reaches the firm's staff. The website stores nothing: the consultation form and the chat post to this site's own `/api/consultation`, which hands the inquiry to the firm app (Matterfold, deployed separately) over its token bridge, `POST <app>/api/public/leads`. The app validates it, rate-limits it, records the lead, and alerts staff; its answer — already in the visitor's language — is what the visitor reads.

```
visitor's browser ──JSON──▶ kjslaw.com /api/consultation ──Bearer token──▶ app /api/public/leads ──▶ lead + staff alert
   (ConsultationForm,          (src/app/api/consultation,                     (the app's bridge;
    ChatWidgetPanel)            src/lib/leads/intake-bridge.ts)                  contract in its own docs)
```

## Entry points

| Where | Sends | Entry |
|---|---|---|
| Consultation form (`ConsultationForm`, English and Spanish pages) | `POST /api/consultation` (JSON) | `form` |
| Chat assistant (`ChatWidgetPanel`) | `POST /api/consultation` (JSON) | `chat` |

The chat is a short structured form, not an AI: nothing is sent anywhere but the firm app.

## Settings

| Setting (Vercel → Project → Settings → Environment Variables) | Value |
|---|---|
| `MATTERFOLD_INTAKE_ENDPOINT` | `https://<app host>/api/public/leads` — HTTPS (plain HTTP only to a backend on the same machine, for development) |
| `MATTERFOLD_INTAKE_TOKEN` | the same long random value as the app's `WEBSITE_INTAKE_TOKEN` (32+ characters). Server-only: never `NEXT_PUBLIC_`. Rotate both together. |

**Until both are set, the site takes no inquiries**: the form and the chat answer "Your request could not be submitted. Please call 714-544-1460." (Spanish on the Spanish pages), and the server logs `[lead] intake bridge: not connected …`. The site never tells a visitor an inquiry was received when nobody will read it. Every page works without these settings.

## What the visitor is told

| The app answers | The visitor reads |
|---|---|
| 201 | the app's confirmation, and the form shows its thank-you panel |
| 400 (what was typed needs fixing) or 429 (too many inquiries from one connection) | the app's own message, as sent; the form keeps what was typed |
| anything else — not connected, a wrong token (401), the bridge off or the app's Company Profile not set up (503), the app down, slower than 10 seconds, or a redirect | "Your request could not be submitted. Please call 714-544-1460." (logged as `[lead] intake bridge: refused <status>` or `unreachable`) |

A redirect is never followed: a POST that is redirected can arrive as a GET and lose the inquiry, so the endpoint must be the app's final address (no `www` hop, no trailing slash).

## What crosses the bridge

`src/lib/leads/intake-bridge.ts` (`bridgePayload`) sends exactly the fields the app's bridge reads, as text, plus:

- `consentToContact`: the JSON boolean `true` only (the form sends it after the visitor ticks the box);
- `language`: `en`, `es`, or `vi` (another site language reaches staff as English with "Preferred language: …" at the top of the description);
- `entry`: `form` or `chat` — which consent sentence the visitor saw;
- `clientIp`: the visitor's address as Vercel reports it (`x-real-ip`), so the app's rate limit counts visitors, not the website.

Fields the browser sends that the bridge does not know are dropped. The website's own route checks only what protects the door itself: the Origin must be this host (`isSameOriginRequest`), the body must be JSON of at most 24,000 characters, and it must be an object. Everything else — the name, phone or email, description length, consent, the consent version, the honeypot (`companyWebsite`), the fill-time check (`elapsedMs`), duplicates, rate limits — is the app's to check, once.

## The consent wording must match the app word for word

The app never takes consent wording from the request: it rebuilds it from `consentVersion`, `entry`, and `language`, **naming the firm exactly as in the app's Settings → Company Profile**, and stores that as what the visitor saw. The website shows its own copy of the same wording (`src/lib/leads/public-lead-rules.ts`: `contactConsentText`, `smsDisclosureText`, `PUBLIC_CONSENT_VERSION`, with `WEBSITE_FIRM_NAME = "Kyle Scott Law"`). So:

- the app's Company Profile name must be exactly **Kyle Scott Law**;
- `public-lead-rules.ts` is shared with the app — the consent sentences, the SMS disclosure, and the version must stay identical on both sides. A new wording gets a new version on both sides together; published versions are never edited.

`npm run check:intake` proves it: it asks the app's bridge for its wording (`GET /api/public/leads`, same token; nothing is submitted) and compares the version and all eight texts (form and chat, English and Spanish, permission sentence and SMS disclosure) with the site's. It explains a 401 (token), 404 (address), or 503 (bridge off, or Company Profile not set up).

## Connecting the form (once the app is deployed)

1. In the app: set `WEBSITE_INTAKE_TOKEN` (a new random value, e.g. `openssl rand -base64 48`), make sure Settings → Company Profile is filled in with the name **Kyle Scott Law** and the firm's telephone, and redeploy.
2. In this project on Vercel: set `MATTERFOLD_INTAKE_ENDPOINT` and `MATTERFOLD_INTAKE_TOKEN` (Production, and Preview if previews should reach the app), then redeploy.
3. Locally, with the same two values in `.env.local`: `npm run check:intake` → "Connected: … all 8 texts match".
4. Send one test inquiry through the live form with obviously fictional details, confirm it appears in the app's lead inbox with its consent wording, then close it there.

Connected on 2026-10-08: both projects run on Vercel (team `kyle-scott-law`, projects `main-website` and `app`), the token was rotated on both sides that day, `npm run check:intake` reported all 8 texts matching, and a fictional test inquiry sent through the live form reached the app's lead inbox (reference L-2026-001002), to be closed there.

Rotating again (Vercel CLI, logged in to the team): the token is stored as a sensitive variable, so `vercel env pull` writes a placeholder for it and the only way back to a known value is a fresh one on both sides. Generate it locally, keep it in this machine's `.env.local`, then `vercel env add MATTERFOLD_INTAKE_TOKEN production --sensitive --force --yes < token.txt` here and `vercel env add WEBSITE_INTAKE_TOKEN production --sensitive --force --yes --cwd <folder linked to the app project> < token.txt`, then `vercel redeploy <latest production deployment>` for each project — the form answers "please call" between the two redeploys. An app redeploy can fail once on a transient `next/font/google` resolution error; a retry passes.

## Staff shortcut: kjslaw.com/admin

The app runs on its own subdomain (for example `https://app.kjslaw.com`): it must own a whole origin (its release gate refuses an address with a path), and a separate origin keeps staff sessions away from the public site's pages and scripts. For convenience, once `MATTERFOLD_INTAKE_ENDPOINT` is set, `next.config.ts` redirects `/admin`, anything under it, and `/login` to `<the endpoint's origin>/login` — a 307, so no browser pins it, in one hop, slash or not. Without the setting those paths are ordinary 404s. Test: `src/lib/__tests__/staff-shortcuts.test.ts`.

## Guardrails that stay in the browser

- **Nothing in a URL.** Both forms send their JSON from `onSubmit` and carry a function `action` (`submitsThroughOnSubmit`), so a press before the page has finished loading is held in the browser instead of going out as a GET with the visitor's details in the address (test: `src/components/shared/__tests__/form-native-submission.test.tsx`).
- **Page-language errors.** A refusal from the server keeps its own message; anything the form did not create itself (a dropped connection makes the browser throw "Failed to fetch" or "Load failed", always in English) shows the "could not be submitted, please call" line in the page's language (`src/components/marketing/submission-error.ts`; test: `public-forms.test.tsx`).
- **SMS disclosure beside the choice.** When "Text message" is chosen, the disclosure appears beside it (English and Spanish); choosing it records the lead's text consent in the app.

## Verification

- Unit: `npx vitest run src/lib/leads src/app/__tests__/consultation-route.test.ts` — the settings rule (both values, HTTPS), the payload (fields, boolean consent, entry, language, visitor address), what the visitor is told for 201/400/429 and for every failure, same-origin, and the route's guards (403, 415, 413, 400) with nothing sent.
- Connection: `npm run check:intake` against the deployed app.
