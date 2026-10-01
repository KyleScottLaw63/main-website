#!/usr/bin/env node
/**
 * Launch gate: every URL the old kjslaw.com published must reach a live page
 * (200) in exactly one permanent redirect (301/308) — never a chain, never a
 * loop — or be deliberately gone (410) at once. WordPress URLs end in "/", so
 * each old path is checked as published (/old-page/), without the slash
 * (/old-page), and as published with a query string, which must arrive intact.
 *
 *   node scripts/verify-redirects.mjs [baseUrl]   (default http://localhost:3012)
 *
 * Sources checked:
 *   - data/redirect-map.csv  (every crawled old URL, patterns skipped; from the 2026-08-31 audit)
 *   - src/lib/marketing/data/legacyPosts.json  (201 dated blog permalinks)
 * Expectations:
 *   - GONE paths (mirrors src/lib/site-proxy.ts) answer 410 directly, with no redirect first
 *   - every other URL ends on a 200 after at most one redirect, and that redirect is
 *     permanent (301/308). A second hop is a chain and a repeated URL is a loop: both fail.
 *   - the final URL is canonical: no trailing slash (except "/")
 *   - legacy permalinks end on their canonical /news path
 *   - a CSV row whose planned destination (new_path) is a live page on the target
 *     server must end exactly there — so a rule that still points somewhere else
 *     after the planned page ships (the "why hire us" silo → /meet-the-team) fails.
 *     Planned destinations the site renamed (/blog → /news, /service-areas/…) redirect
 *     themselves, are not live, and fall through to the rules below.
 *   - exact-source rules in redirect-rules.json must end on their destination
 *   - everything else must end on a 200
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const base = (process.argv[2] ?? "http://localhost:3012").replace(/\/+$/, "");
const MAX_HOPS = 1;
const FOLLOW_LIMIT = 6; // follow past the limit only to report the whole chain
const PERMANENT = new Set([301, 308]);
const QUERY = "kjslaw_qa=1";
const CONCURRENCY = 8;

const csv = readFileSync(path.join(root, "data", "redirect-map.csv"), "utf8");
const rules = JSON.parse(readFileSync(path.join(root, "src/lib/marketing/data/redirect-rules.json"), "utf8")).redirects;
const legacy = JSON.parse(readFileSync(path.join(root, "src/lib/marketing/data/legacyPosts.json"), "utf8")).redirects;

const GONE = [
  /^\/sample-page\/?$/, /^\/top-orange-county-restaurants\/?$/, /^\/tustin-californias-best-restaurants\/?$/,
  /^\/orange-county-sports-teams\/?$/, /^\/orange-county-history\/?$/, /^\/wp-admin(\/|$)/, /^\/wp-login\.php\/?$/,
  /^\/xmlrpc\.php\/?$/, /^\/wp-content(\/|$)/, /^\/wp-includes(\/|$)/, /^\/wp-json(\/|$)/,
  /^\/2024\/12\/26\/kyle-scott-wins-jury-verdict-in-riverside-superior-court\/?$/,
  /^\/2021\/08\/12\/kyle-scott-law-delivers-justice-475000-slip-fall-settlement\/?$/,
  /^\/news\/riverside-jury-verdict-2-3-million\/?$/, /^\/es\/noticias\/veredicto-jurado-riverside-2-3-millones\/?$/,
  /^\/news\/kyle-scott-law-delivers-justice-475000-slip-fall-settlement\/?$/,
];

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cells = line.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((cell) => cell.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, "\""));
    return Object.fromEntries(header.map((key, index) => [key, cells[index] ?? ""]));
  });
}

const strip = (pathname) => pathname.replace(/\/+$/, "") || "/";
const exactRules = new Map(rules.filter((rule) => !rule.source.includes(":")).map((rule) => [rule.source, rule.destination]));
const legacyMap = new Map(legacy.map((entry) => [strip(entry.legacyPath), entry.canonicalPath]));

const oldPaths = new Set();
const csvDestination = new Map();
for (const row of parseCsv(csv)) {
  if (row.type === "pattern" || !row.old_path.startsWith("/")) continue;
  oldPaths.add(strip(row.old_path));
  if (row.new_path.startsWith("/")) csvDestination.set(strip(row.old_path), strip(row.new_path));
}
for (const entry of legacy) oldPaths.add(strip(entry.legacyPath));

// Each old path as published (trailing slash), bare, and as published with a query string.
const requests = [];
for (const oldPath of oldPaths) {
  if (oldPath === "/") {
    requests.push({ oldPath, form: "published", url: "/" }, { oldPath, form: "query", url: `/?${QUERY}` });
    continue;
  }
  requests.push(
    { oldPath, form: "published", url: `${oldPath}/` },
    { oldPath, form: "bare", url: oldPath },
    { oldPath, form: "query", url: `${oldPath}/?${QUERY}` },
  );
}

async function get(url) {
  const response = await fetch(url, { redirect: "manual", headers: { "user-agent": "kjslaw-redirect-qa" } });
  await response.arrayBuffer().catch(() => null);
  return response;
}

// Which planned destinations are real pages on the target (200 without a redirect).
const liveCsvDestinations = new Set();
await Promise.all([...new Set(csvDestination.values())].map(async (destination) => {
  try {
    if ((await get(base + destination)).status === 200) liveCsvDestinations.add(destination);
  } catch {
    // unreachable destination: the rules below decide
  }
}));

function expectationFor(oldPath) {
  if (GONE.some((re) => re.test(oldPath))) return { kind: "gone" };
  if (legacyMap.has(oldPath)) return { kind: "path", path: legacyMap.get(oldPath) };
  const planned = csvDestination.get(oldPath);
  if (planned && liveCsvDestinations.has(planned)) return { kind: "path", path: planned, source: "csv" };
  if (exactRules.has(oldPath)) return { kind: "path", path: exactRules.get(oldPath) };
  return { kind: "live" };
}

/** Follows redirects by hand; stops at a non-redirect, a repeated URL (loop), or FOLLOW_LIMIT. */
async function follow(start) {
  const chain = [];
  const seen = new Set();
  let url = base + start;
  for (let hop = 0; hop <= FOLLOW_LIMIT; hop += 1) {
    if (seen.has(url)) return { chain, loop: true };
    seen.add(url);
    const response = await get(url);
    chain.push({ url, status: response.status });
    const location = response.headers.get("location");
    if (response.status < 300 || response.status >= 400 || !location) return { chain, loop: false };
    url = new URL(location, url).toString();
  }
  return { chain, loop: true };
}

function problemsWith(request, { chain, loop }, expected) {
  const problems = [];
  const last = chain[chain.length - 1];
  const hops = chain.length - 1;
  const final = new URL(last.url);
  if (loop) problems.push(`redirect loop (${FOLLOW_LIMIT}+ hops or a repeated URL)`);
  else if (last.status >= 300 && last.status < 400) problems.push(`redirect ${last.status} without a Location`);
  const temporary = chain.slice(0, -1).filter((step) => !PERMANENT.has(step.status));
  if (temporary.length) problems.push(`non-permanent redirect ${temporary.map((step) => step.status).join(", ")}`);
  if (expected.kind === "gone") {
    if (last.status !== 410) problems.push("wanted 410");
    if (hops > 0) problems.push("wanted the 410 directly, without a redirect first");
    return problems;
  }
  if (hops > MAX_HOPS) problems.push(`chain: ${hops} hops (wanted at most ${MAX_HOPS})`);
  if (last.status !== 200) problems.push("wanted a 200");
  if (final.pathname !== "/" && final.pathname.endsWith("/")) problems.push("final URL keeps a trailing slash");
  if (expected.kind === "path" && final.pathname !== strip(expected.path)) {
    problems.push(`wanted ${strip(expected.path)}${expected.source === "csv" ? " (redirect-map.csv new_path)" : ""}`);
  }
  if (request.form === "query" && !final.search.includes(QUERY)) problems.push(`query string lost (wanted ?${QUERY})`);
  return problems;
}

const results = [];
const queue = [...requests];
async function worker() {
  while (queue.length) {
    const request = queue.shift();
    const expected = expectationFor(request.oldPath);
    try {
      const followed = await follow(request.url);
      const hops = followed.chain.length - 1;
      const problems = problemsWith(request, followed, expected);
      results.push({ ...request, expected, chain: followed.chain, status: followed.chain[followed.chain.length - 1].status, hops, problems });
    } catch (error) {
      results.push({ ...request, expected, chain: [], status: 0, hops: 0, problems: [`request failed: ${error.message}`] });
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

results.sort((a, b) => a.oldPath.localeCompare(b.oldPath) || a.form.localeCompare(b.form));
const failures = results.filter((result) => result.problems.length);
const tally = (list, key) => list.reduce((acc, item) => ((acc[key(item)] = (acc[key(item)] ?? 0) + 1), acc), {});
const format = (counts, suffix = "") => Object.entries(counts).map(([value, count]) => `${value}${suffix}×${count}`).join("  ");
const csvHeld = new Set(results.filter((result) => result.expected.source === "csv").map((result) => result.oldPath));

console.log(`Checked ${oldPaths.size} old URLs against ${base} — ${results.length} requests (as published with "/", without it, and with a query string)`);
console.log(`  csv:          ${csvHeld.size} held to redirect-map.csv new_path (${liveCsvDestinations.size} planned destinations are live)`);
for (const form of ["published", "bare", "query"]) {
  const subset = results.filter((result) => result.form === form);
  console.log(`  ${form.padEnd(10)}    status ${format(tally(subset, (result) => result.status))}   hops ${format(tally(subset, (result) => result.hops), "-hop")}`);
}
if (failures.length) {
  console.log(`\n${failures.length} FAILED:`);
  for (const failure of failures) {
    const steps = failure.chain.map((step) => `${step.status} ${new URL(step.url).pathname}${new URL(step.url).search}`).join(" → ");
    console.log(`  ${failure.url}\n     ${steps || "-"}\n     ${failure.problems.join("; ")}`);
  }
  process.exit(1);
}
console.log(`\nAll old URLs resolve as expected: at most ${MAX_HOPS} permanent redirect, no chains, no loops.`);
