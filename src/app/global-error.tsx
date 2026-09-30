"use client";

import { useSyncExternalStore } from "react";
import { shortErrorReference } from "@/lib/error-reference";

const noSubscription = () => () => {};
/** The Spanish site lives under /es; the server snapshot is English. */
const pageLanguage = () => (/^\/es(\/|$)/.test(window.location.pathname) ? "es" : "en");
const serverLanguage = () => "en" as const;

const COPY = {
  en: {
    title: "Something went wrong",
    heading: "Sorry, this page didn’t load.",
    body: "Please try again in a moment.",
    retry: "Try again",
    reference: "Reference",
  },
  es: {
    title: "Algo salió mal",
    heading: "Lo sentimos, esta página no se cargó.",
    body: "Inténtelo de nuevo en un momento.",
    retry: "Intentar de nuevo",
    reference: "Referencia",
  },
} as const;

/**
 * Last-resort error page. It replaces whichever root layout failed — the
 * English site or the Spanish one (/es) — so it is deliberately plain: no
 * error message or stack, and only a short reference from the digest. It
 * renders its own document with inline styles because no app stylesheet is
 * loaded here.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const lang = useSyncExternalStore(noSubscription, pageLanguage, serverLanguage);
  const text = COPY[lang];
  const reference = shortErrorReference(error.digest);

  return (
    <html lang={lang}>
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif", background: "#f7f9fc", color: "#0b2d5b" }}>
        <title>{text.title}</title>
        <main role="alert" style={{ maxWidth: 560, margin: "14vh auto", padding: "0 24px" }}>
          <h1 style={{ fontSize: 28, lineHeight: 1.25, margin: "0 0 12px" }}>{text.heading}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 24px" }}>{text.body}</p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#ffffff",
              background: "#0759c7",
              border: 0,
              borderRadius: 12,
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            {text.retry}
          </button>
          {reference ? (
            <p style={{ fontSize: 13, color: "#4a5b75", marginTop: 24 }}>
              {text.reference} {reference}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
