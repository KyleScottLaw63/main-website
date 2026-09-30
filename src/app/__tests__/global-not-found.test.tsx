// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

/**
 * The global 404 (URLs that match no route) takes its language from the proxy's
 * x-site-locale header — the page and its browser title alike, so /es/no-existe is
 * "Página no encontrada" in the tab, not English (docs/public-site-rendering.md).
 * It sets no robots tag of its own (`robots: null`): Next adds the one noindex tag to every 404.
 */

const request = vi.hoisted(() => ({ locale: null as string | null }));
vi.mock("next/headers", () => ({
  headers: async () => new Headers(request.locale ? { "x-site-locale": request.locale } : {}),
}));
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist" }) }));

const { generateMetadata } = await import("../global-not-found");

describe("the global 404's title", () => {
  it("is Spanish on the Spanish site", async () => {
    request.locale = "es-US";
    expect(await generateMetadata()).toEqual({ title: "Página no encontrada | Kyle Scott Law", robots: null });
  });

  it("is English everywhere else", async () => {
    for (const locale of ["en-US", null]) {
      request.locale = locale;
      expect(await generateMetadata()).toEqual({ title: "Page not found | Kyle Scott Law", robots: null });
    }
  });
});
