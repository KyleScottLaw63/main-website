// @vitest-environment node
import { describe, expect, it } from "vitest";
import { buildCustomRoute } from "next/dist/lib/build-custom-route";
import nextConfig from "../../../../next.config";
import { legacyRedirects } from "../data/legacyPosts";

/**
 * Old kjslaw.com URLs reach their page in one hop (docs/legacy-url-redirects.md).
 * That rests on three things pinned here: Next's own trailing-slash 308 is off;
 * Next compiles every redirect rule to match with or without the trailing slash
 * (checked with Next's own compiler, the one that writes routes-manifest.json
 * for `next start` and Vercel); and no rule points at a URL that another rule
 * redirects again. The HTTP gate is scripts/verify-redirects.mjs.
 */
const allRedirects = await nextConfig.redirects!();
/** The rules for requests on kjslaw.com itself; a host-conditioned rule (www) is tested on its own below. */
const redirects = allRedirects.filter((rule) => !rule.has);
const compiled = redirects.map((rule) => ({
  rule,
  regex: new RegExp(buildCustomRoute("redirect", rule, ["/_next"]).regex),
}));

/** The rule Next applies to a path: the first one that matches. */
const firstRule = (path: string) => compiled.find(({ regex }) => regex.test(path))?.rule;

/** A concrete path for a source or destination: each parameter becomes a fictional slug. */
const SAMPLES: Record<string, string> = { "/:path((?!api/).+)/feed": "/fictional-page/feed" };
const sample = (pattern: string) => SAMPLES[pattern] ?? pattern.replace(/:\w+[*+?]?/g, "fictional-slug");

describe("legacy URL redirects: one hop", () => {
  it("turns off Next's own trailing-slash 308, which ran ahead of every rule (the second hop)", () => {
    expect(nextConfig.skipTrailingSlashRedirect).toBe(true);
  });

  it("answers every old URL with its own rule, with or without the WordPress trailing slash", () => {
    for (const { source } of redirects) {
      const path = sample(source);
      expect(firstRule(path)?.source, path).toBe(source);
      expect(firstRule(`${path}/`)?.source, `${path}/`).toBe(source);
    }
  });

  it("sends each dated blog permalink straight to its /news post, slash or not", () => {
    expect(legacyRedirects.length).toBeGreaterThan(200);
    for (const { legacyPath, canonicalPath } of legacyRedirects) {
      const bare = legacyPath.replace(/\/+$/, "");
      expect(firstRule(legacyPath)?.destination, legacyPath).toBe(canonicalPath);
      expect(firstRule(bare)?.destination, bare).toBe(canonicalPath);
    }
  });

  it("points every rule at a final, slash-free page that no rule redirects again (no chains)", () => {
    for (const { source, destination } of redirects) {
      const target = sample(destination);
      expect(target === "/" || !target.endsWith("/"), `${source} → ${destination}`).toBe(true);
      expect(firstRule(target)?.source, `${source} → ${destination}`).toBeUndefined();
      expect(firstRule(`${target}/`)?.source, `${source} → ${destination}/`).toBeUndefined();
    }
  });

  it("never redirects the API (the consultation form's endpoint) or Next assets", () => {
    for (const path of [
      "/api/consultation",
      "/api/consultation/",
      "/api/feed",
      "/api/fictional/feed",
      "/api/fictional/feed/",
      "/_next/static/fictional/feed",
    ]) {
      expect(firstRule(path)?.source, path).toBeUndefined();
    }
  });
});

describe("www.kjslaw.com", () => {
  it("is sent to kjslaw.com first — every path, query kept by Next, permanently — and only on the www host", () => {
    const [first] = allRedirects;
    expect(first).toEqual({
      source: "/:path*",
      has: [{ type: "host", value: "www.kjslaw.com" }],
      destination: "https://kjslaw.com/:path*",
      permanent: true,
    });
    expect(allRedirects.filter((rule) => rule.has)).toHaveLength(1);
    const regex = new RegExp(buildCustomRoute("redirect", first, ["/_next"]).regex);
    for (const path of ["/", "/contact", "/contact-us/", "/news/fictional-slug", "/es/contacto"]) expect(regex.test(path), path).toBe(true);
  });
});
