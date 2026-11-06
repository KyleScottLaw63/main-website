import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { allResults } from '@/lib/marketing/data/results';

/**
 * Medical malpractice, which the firm took off the website on 2026-11-05 (docs/website-content-compliance.md,
 * "Practices the firm does not offer"): its practice, city, and guide pages and its eight archived
 * articles are gone, in English and Spanish, and their addresses answer 410 (src/lib/site-proxy.ts, which
 * is why the proxy is not scanned here). Nothing on the site may link to them, offer the practice in a
 * menu or the chat, or show a medical malpractice result.
 */
const REMOVED_ADDRESS =
  /medical-malpractice-(?:attorney|lawyer|statute-of-limitations|damages-cap|law-in|verdicts|damages-looking)|negligencia-medica|attorney-on-medical-malpractice|limits-pain-suffering-medical-malpractice|medical-malpractice-statute-limitation|victims-medical-malpractice|prop-46-increase-malpractice/;

const ROOT = process.cwd();
const SITE_ROOTS = ['src/app/(site)', 'src/app/(site-es)', 'src/lib/marketing', 'src/components/marketing', 'public/data'];
const SITE_FILES = ['src/app/sitemap.ts', 'public/llms.txt'];

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : walk(full);
    return /\.(tsx?|json|mjs|css|txt)$/.test(entry.name) ? [full] : [];
  });
}

const files = [...SITE_ROOTS.flatMap((dir) => walk(path.join(ROOT, dir))), ...SITE_FILES.map((file) => path.join(ROOT, file))];

describe('medical malpractice is off the site', () => {
  it('no page, menu, data file, search index, or llms.txt points at a removed address', () => {
    const hits = files.flatMap((file) =>
      readFileSync(file, 'utf8')
        .split('\n')
        .flatMap((line, index) => (REMOVED_ADDRESS.test(line) ? [`${path.relative(ROOT, file)}:${index + 1}`] : [])),
    );
    expect(hits).toEqual([]);
  });

  it('the routes are gone', () => {
    const routes = [...walk(path.join(ROOT, 'src/app/(site)')), ...walk(path.join(ROOT, 'src/app/(site-es)'))].map((file) => path.relative(ROOT, file));
    expect(routes.filter((route) => /malpractice|negligencia-medica/.test(route))).toEqual([]);
  });

  it('no result is a medical malpractice result', () => {
    expect(allResults.filter((result) => /medical malpractice|medical negligence|failure to diagnose/i.test(`${result.title} ${result.detail ?? ''}`)).map((result) => result.title)).toEqual([]);
  });

  it('the chat does not offer it as a matter type', () => {
    const chat = readFileSync(path.join(ROOT, 'src/components/marketing/ChatWidgetPanel.tsx'), 'utf8');
    expect(chat).not.toMatch(/med_mal|Medical malpractice|Negligencia médica/);
  });
});
