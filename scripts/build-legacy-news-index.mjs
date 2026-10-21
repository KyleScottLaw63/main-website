#!/usr/bin/env node
/**
 * Builds the search indexes the archives load on demand (LegacyNewsArchive.tsx):
 * public/data/legacy-news-index.json for /news, from src/lib/marketing/data/legacyPosts.json,
 * the single source for migrated posts, and public/data/legacy-news-index-es.json for
 * /es/noticias, from spanishLegacyPosts.json (its dates and topics from the English post).
 * Never edit an index by hand: a hand fix to one copy is how a retired phone number
 * stayed live in the other.
 *
 *   node scripts/build-legacy-news-index.mjs          rewrite the indexes
 *   node scripts/build-legacy-news-index.mjs --check  exit 1 if an index is stale
 *
 * The fields are LegacyPostSummary in src/lib/marketing/data/legacyPosts.ts; the
 * vitest suites legacy-posts.test.ts and spanish-legacy-posts.test.ts fail when they drift.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src/lib/marketing/data");
const SUMMARY_FIELDS = ["slug", "path", "dateTime", "date", "title", "excerpt", "category", "topic"];
const summary = (post) => Object.fromEntries(SUMMARY_FIELDS.map((field) => [field, post[field]]));

const { posts } = JSON.parse(readFileSync(path.join(dataDir, "legacyPosts.json"), "utf8"));
const englishBySlug = new Map(posts.map((post) => [post.slug, post]));
const { posts: spanishPosts } = JSON.parse(readFileSync(path.join(dataDir, "spanishLegacyPosts.json"), "utf8"));
const spanish = spanishPosts.map((post) => {
  const english = englishBySlug.get(post.englishSlug);
  return { ...post, dateTime: english.dateTime, topic: english.topic };
});

const indexes = [
  { file: "public/data/legacy-news-index.json", source: "legacyPosts.json", index: posts.map(summary) },
  { file: "public/data/legacy-news-index-es.json", source: "spanishLegacyPosts.json", index: spanish.map(summary) },
];

let stale = false;
for (const { file, source, index } of indexes) {
  const indexPath = path.join(root, file);
  const output = `${JSON.stringify(index)}\n`;
  if (process.argv.includes("--check")) {
    let current = "";
    try {
      current = readFileSync(indexPath, "utf8");
    } catch {
      // A missing index is stale.
    }
    if (current !== output) {
      console.error(`${file} is out of date. Run: node scripts/build-legacy-news-index.mjs`);
      stale = true;
    } else {
      console.log(`${path.basename(file)} matches ${source} (${index.length} posts).`);
    }
  } else {
    writeFileSync(indexPath, output, "utf8");
    console.log(`Wrote ${file} (${index.length} posts).`);
  }
}
if (stale) process.exit(1);
