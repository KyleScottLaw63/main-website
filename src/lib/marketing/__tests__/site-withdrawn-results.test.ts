import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Results the firm withdrew from the whole website (docs/website-content-compliance.md). The $2.3M
 * Riverside jury verdict went on 2026-10-01 with both of its posts: the Dec. 26, 2024 announcement and
 * the archived Aug. 12, 2021 post titled with it. Their addresses answer 410 (src/lib/site-proxy.ts,
 * which is why the proxy is not scanned here).
 */
const WITHDRAWN = [
  /\$2\.3 ?M\b/,
  /\$2,300,000/,
  /\b2\.3 (?:million|millones)\b/i,
  /riverside-jury-verdict|veredicto-jurado-riverside|kyle-scott-wins-jury-verdict|kyle-scott-law-delivers-justice-475000/,
];

const ROOT = process.cwd();
const SITE_ROOTS = ['src/app/(site)', 'src/app/(site-es)', 'src/lib/marketing', 'src/components/marketing', 'public/data'];
const SITE_FILES = ['src/app/sitemap.ts', 'public/llms.txt'];

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : walk(full);
    return /\.(tsx?|json|mjs|css)$/.test(entry.name) ? [full] : [];
  });
}

describe('withdrawn results', () => {
  it('leave no trace on the site: no amount, title, link, or address of the $2.3M verdict (the firm, 2026-10-01)', () => {
    const files = [...SITE_ROOTS.flatMap((root) => walk(path.join(ROOT, root))), ...SITE_FILES.map((file) => path.join(ROOT, file))];
    const hits = files.flatMap((file) => {
      const text = readFileSync(file, 'utf8');
      return WITHDRAWN.filter((pattern) => pattern.test(text)).map((pattern) => `${path.relative(ROOT, file)}: ${pattern}`);
    });
    expect(hits).toEqual([]);
  });
});
