import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { firmIdentity } from '@/lib/marketing/site';

/**
 * The firm's public email address is Team@kjslaw.com (firmIdentity.email; it replaced Info@kjslaw.com
 * on 2026-10-01). It is the only @kjslaw.com address anywhere in the public website's source and
 * data: the footer and the structured data read the constant, and the privacy and accessibility
 * pages and the archived posts name it (docs/website-content-compliance.md, "Email address").
 */
/** The one other address a page may name: the attorney's own, in two archived posts' text. */
const ATTORNEY_ADDRESS = 'Kyle@kjslaw.com';

const ROOT = process.cwd();
const SITE_ROOTS = ['src/app/(site)', 'src/app/(site-es)', 'src/app/api', 'src/lib/marketing', 'src/lib/leads', 'src/components/marketing', 'public/data'];
const SITE_FILES = ['src/app/sitemap.ts', 'src/app/robots.ts', 'src/app/manifest.ts', 'src/app/global-not-found.tsx', 'src/app/global-error.tsx', 'public/llms.txt'];

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : walk(full);
    return /\.(tsx?|json|mjs|css)$/.test(entry.name) ? [full] : [];
  });
}

function siteFiles() {
  const files = SITE_ROOTS.flatMap((root) => walk(path.join(ROOT, root)));
  for (const file of SITE_FILES) {
    try {
      if (statSync(path.join(ROOT, file)).isFile()) files.push(path.join(ROOT, file));
    } catch {
      // optional file
    }
  }
  return files;
}

describe('the firm’s email address', () => {
  it('is Team@kjslaw.com', () => {
    expect(firmIdentity.email).toBe('Team@kjslaw.com');
  });

  it('is the only @kjslaw.com address anywhere in the public site besides the attorney’s own; Info@ is gone', () => {
    const others = siteFiles().flatMap((file) =>
      [...readFileSync(file, 'utf8').matchAll(/[\w.+-]+@kjslaw\.com/gi)]
        .map(([address]) => address)
        .filter((address) => address !== firmIdentity.email && address !== ATTORNEY_ADDRESS)
        .map((address) => `${path.relative(ROOT, file)}: ${address}`),
    );
    expect(others).toEqual([]);
  });
});
