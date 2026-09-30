import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { legacyPosts } from '@/lib/marketing/data/legacyPosts';
import { firmIdentity } from '@/lib/marketing/site';

/**
 * The old kjslaw.com published wrong phone numbers (kjslaw-frontend-build-brief.md §4).
 * Every phone number anywhere in the public website's data and source must be one of
 * the firm's canonical numbers — or one of the few named exceptions below.
 */
const CANONICAL: Record<string, string> = {
  '7145441460': 'main office (every instance tap-to-call)',
  '7145441463': 'fax',
  '8667570959': 'toll-free',
};

/** Numbers that are not the firm's, allowed only where named. */
const THIRD_PARTY: Record<string, { owner: string; onlyInPost: string }> = {
  '7602450259': {
    owner: 'Advanced Chiropractic & Health Care, Victorville (named in a 2012 post)',
    onlyInPost: 'clients-recommend-dr-brad-byington-d-c-victorville',
  },
};

/** Published in error on the old site or found in the migrated archive; never again. */
const RETIRED = ['544-1450', '544-1469', '540-1460', '943-423-3944', '949-423-3944', '717-544-1460', '714-6544-1460', '714-544-460', '949-555-0134'];

const ROOT = process.cwd();
const SITE_ROOTS = ['src/app/(site)', 'src/app/(site-es)', 'src/app/api', 'src/lib/marketing', 'src/lib/leads', 'src/components/marketing', 'public/data'];
const SITE_FILES = ['src/app/sitemap.ts', 'src/app/robots.ts', 'src/app/manifest.ts', 'src/app/global-not-found.tsx', 'src/app/global-error.tsx', 'src/lib/site-proxy.ts', 'public/llms.txt'];
const LEGACY_POSTS_FILE = path.join('src', 'lib', 'marketing', 'data', 'legacyPosts.json');

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

// 7145441460, (714) 544-1460, 714.544.1460, 714 544-1460, +1-714-544-1460 — and malformed
// variants such as 714-6544-1460 or 714-544-460, which must be caught, not skipped.
const FULL_NUMBER = /(?<![\w$./-])(?:\+?1[\s.-]?)?(?:\((\d{3})\)\s?|(\d{3})[\s.-]?)(\d{3,4})[\s.-](\d{3,4})(?![\w-])/g;
// A number joined into a URL slug by hyphens ("…-call-kyle-scott-949-423-3944").
const SLUG_NUMBER = /(?<=^|[-/])(\d{3})-(\d{3,4})-(\d{3,4})(?=$|[-/"])/g;
// A seven-digit local form left over once full numbers are removed ("544-1450").
const LOCAL_NUMBER = /(?<![\w$./()-])(\d{3})-(\d{4})(?![\w-])/g;
const TEL_URI = /\btel:(\+?[\d().-]*\d)/g;

type Hit = { number: string; digits: string; where: string };

function phoneHits(text: string, where: string): Hit[] {
  const hits: Hit[] = [];
  const withoutFull = text
    .replace(FULL_NUMBER, (match, parenArea: string, area: string, prefix: string, line: string) => {
      hits.push({ number: match, digits: `${parenArea ?? area}${prefix}${line}`, where });
      return ' ';
    })
    .replace(SLUG_NUMBER, (match, area: string, prefix: string, line: string) => {
      hits.push({ number: match, digits: `${area}${prefix}${line}`, where });
      return ' ';
    });
  for (const match of withoutFull.matchAll(LOCAL_NUMBER)) {
    hits.push({ number: match[0], digits: `${match[1]}${match[2]}`, where });
  }
  for (const match of text.matchAll(TEL_URI)) {
    const digits = match[1].replace(/\D/g, '');
    hits.push({ number: match[0], digits: digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits, where: `${where} (tel: link)` });
  }
  return hits;
}

/** 555-0100…0199 is reserved for fiction (NANP); the form uses it as a placeholder. */
function isReservedFictional(digits: string) {
  return /^\d{3}5550(1\d\d)$/.test(digits);
}

function isAllowed(hit: Hit, postSlug?: string) {
  if (CANONICAL[hit.digits]) return true;
  if (CANONICAL[`714${hit.digits}`] && hit.digits.length === 7) return true; // local form of a canonical number
  const thirdParty = THIRD_PARTY[hit.digits];
  if (thirdParty) return postSlug === thirdParty.onlyInPost && !hit.where.includes('tel:');
  return isReservedFictional(hit.digits);
}

/**
 * legacyPosts.json is read field by field. legacyPath (a post's old WordPress address)
 * and sourceUrl (the same address as provenance) are the retired URLs themselves: they
 * exist only so next.config.ts can 301 them, and are never rendered.
 */
function legacyPostHits() {
  const hits: { hit: Hit; slug?: string }[] = [];
  for (const post of legacyPosts) {
    for (const [field, value] of Object.entries(post)) {
      if (field === 'legacyPath' || field === 'sourceUrl') continue;
      const text = typeof value === 'string' ? value : JSON.stringify(value);
      for (const hit of phoneHits(text, `legacyPosts.json ${post.slug}.${field}`)) hits.push({ hit, slug: post.slug });
    }
  }
  return hits;
}

describe('phone numbers on the public website', () => {
  it('the firm identity uses the canonical numbers', () => {
    expect(firmIdentity.telephone.replace(/\D/g, '')).toBe('17145441460');
    expect(firmIdentity.tollFree.replace(/\D/g, '')).toBe('18667570959');
  });

  it('every phone number in site source and data is canonical or a named exception', () => {
    const offenders: string[] = [];
    for (const file of siteFiles()) {
      const relative = path.relative(ROOT, file);
      if (relative === LEGACY_POSTS_FILE) continue; // read field by field below
      const text = readFileSync(file, 'utf8');
      for (const hit of phoneHits(text, relative)) {
        if (!isAllowed(hit)) offenders.push(`${hit.where}: ${hit.number}`);
      }
    }
    for (const { hit, slug } of legacyPostHits()) {
      if (!isAllowed(hit, slug)) offenders.push(`${hit.where}: ${hit.number}`);
    }
    expect(offenders).toEqual([]);
  });

  it('no retired or mistyped number appears in anything the site renders', () => {
    const renderedData = [
      ...siteFiles().filter((file) => path.relative(ROOT, file) !== LEGACY_POSTS_FILE).map((file) => readFileSync(file, 'utf8')),
      ...legacyPosts.map((post) => JSON.stringify({ ...post, legacyPath: '', sourceUrl: '' })),
    ].join('\n');
    for (const number of RETIRED) expect(renderedData, number).not.toContain(number);
  });

  it('every firm number in an archived article body is a tap-to-call link to that number', () => {
    const unlinked: string[] = [];
    for (const post of legacyPosts) {
      const tokens = post.contentHtml.split(/(<[^>]+>)/);
      let telHref: string | null = null;
      for (const token of tokens) {
        if (token.startsWith('<')) {
          const opening = /^<a\b[^>]*href="tel:([^"]+)"/i.exec(token);
          if (opening) telHref = opening[1];
          else if (/^<\/a>/i.test(token)) telHref = null;
          continue;
        }
        for (const hit of phoneHits(token, post.slug)) {
          if (!CANONICAL[hit.digits] || hit.digits === '7145441463') continue;
          if (telHref?.replace(/\D/g, '') !== `1${hit.digits}`) unlinked.push(`${post.slug}: ${hit.number}`);
        }
      }
    }
    expect(unlinked).toEqual([]);
  });
});
