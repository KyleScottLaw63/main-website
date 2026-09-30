import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

type RedirectRule = { source: string; destination: string };
type LegacyRedirect = { legacyPath: string; canonicalPath: string };

function readJson<T>(relative: string): T {
  return JSON.parse(readFileSync(path.join(__dirname, relative), "utf8")) as T;
}

const stripTrailingSlash = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

/**
 * The firm app's address (Matterfold, deployed on its own subdomain), taken from
 * the form's bridge setting so the two can never point at different apps: the
 * origin of MATTERFOLD_INTAKE_ENDPOINT, HTTPS (plain HTTP only on this machine).
 * Null until the form is connected. See docs/website-lead-intake-bridge.md.
 */
export function firmAppOrigin(endpoint = process.env.MATTERFOLD_INTAKE_ENDPOINT): string | null {
  try {
    const url = new URL(endpoint?.trim() ?? "");
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    return url.protocol === "https:" || (url.protocol === "http:" && local) ? url.origin : null;
  } catch {
    return null;
  }
}

// Security baseline for every response. A strict script-src policy is a
// separate decision: nonces would force dynamic rendering (and lose the
// back/forward cache) on the public site, so scripts are not restricted here.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  // HTTPS-only for two years on the host that served the response (kjslaw.com). Deliberately
  // without includeSubDomains/preload: those would force HTTPS on every *.kjslaw.com name
  // (mail and vendor hosts included) and preload is slow to undo — add them only once every
  // subdomain is confirmed HTTPS. Browsers ignore this header on plain http://localhost.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // No built-in trailing-slash 308: it ran before every rule below, so each old
  // WordPress URL (/old-page/) took two hops. Next matches every redirect rule
  // with or without the trailing slash, so the rules answer both forms in one
  // hop, and the proxy (src/lib/site-proxy.ts) normalizes any other /page/ →
  // /page in one 308 while leaving /api, files, and assets exactly as requested.
  // See docs/legacy-url-redirects.md.
  skipTrailingSlashRedirect: true,
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
  // Full-document 404 for unmatched URLs; required because the site has two
  // root layouts (English and /es). See app/global-not-found.tsx.
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  // Old kjslaw.com (WordPress) URLs → this site, as 301s, each straight to its
  // final page (one hop, with or without the old trailing slash). Order matters:
  // specific rules before catch-alls. Rules: src/lib/marketing/data/redirect-rules.json;
  // dated blog permalinks: legacyPosts.json. Verify with `npm run verify:redirects`.
  async redirects() {
    const { redirects: rules } = readJson<{ redirects: RedirectRule[] }>("src/lib/marketing/data/redirect-rules.json");
    const { redirects: legacy } = readJson<{ redirects: LegacyRedirect[] }>("src/lib/marketing/data/legacyPosts.json");
    // Staff shortcuts: kjslaw.com/admin (and /login) open the firm app's sign-in page. Temporary
    // (307), so browsers never pin an address that may change; absent until the form is connected.
    const app = firmAppOrigin();
    const staffShortcuts = app
      ? ["/admin", "/admin/:path*", "/login"].map((source) => ({ source, destination: `${app}/login`, permanent: false }))
      : [];
    return [
      ...staffShortcuts,
      ...rules.map((rule) => ({ source: rule.source, destination: rule.destination, statusCode: 301 })),
      ...legacy.map((entry) => ({ source: stripTrailingSlash(entry.legacyPath), destination: entry.canonicalPath, statusCode: 301 })),
    ];
  },
};

export default nextConfig;
