#!/usr/bin/env node
/**
 * Builds public/data/legacy-news-index.json — the search index the /news archive
 * loads on demand (LegacyNewsArchive.tsx) — from src/lib/marketing/data/legacyPosts.json,
 * the single source for migrated posts. Never edit the index by hand: a hand fix to
 * one copy is how a retired phone number stayed live in the other.
 *
 *   node scripts/build-legacy-news-index.mjs          rewrite the index
 *   node scripts/build-legacy-news-index.mjs --check  exit 1 if the index is stale
 *
 * The fields are LegacyPostSummary in src/lib/marketing/data/legacyPosts.ts; the
 * vitest suite src/lib/marketing/__tests__/legacy-posts.test.ts fails when the two drift.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "src/lib/marketing/data/legacyPosts.json");
const indexPath = path.join(root, "public/data/legacy-news-index.json");
const SUMMARY_FIELDS = ["slug", "path", "dateTime", "date", "title", "excerpt", "category", "topic"];

const { posts } = JSON.parse(readFileSync(sourcePath, "utf8"));
const index = posts.map((post) => Object.fromEntries(SUMMARY_FIELDS.map((field) => [field, post[field]])));
const output = `${JSON.stringify(index)}\n`;

if (process.argv.includes("--check")) {
  const current = readFileSync(indexPath, "utf8");
  if (current !== output) {
    console.error("public/data/legacy-news-index.json is out of date. Run: node scripts/build-legacy-news-index.mjs");
    process.exit(1);
  }
  console.log(`legacy-news-index.json matches legacyPosts.json (${index.length} posts).`);
} else {
  writeFileSync(indexPath, output, "utf8");
  console.log(`Wrote ${path.relative(root, indexPath)} (${index.length} posts).`);
}
