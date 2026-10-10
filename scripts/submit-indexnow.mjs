// Tells the IndexNow search engines (Bing, and through it the assistants that search with Bing;
// also Yandex, Naver, Seznam) which pages changed, so they fetch them now instead of on their next
// crawl. Google does not take part. Usage:
//   node scripts/submit-indexnow.mjs                 # every URL in the live sitemap
//   node scripts/submit-indexnow.mjs /guides /es/guias   # just these paths
// The key is the content of public/indexnow-key.txt, served at https://kjslaw.com/indexnow-key.txt;
// the engines fetch that file to confirm the submission comes from the site's owner.
import { readFileSync } from 'node:fs';

const SITE_URL = 'https://kjslaw.com';
const host = new URL(SITE_URL).host;
const key = readFileSync(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8').trim();
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('public/indexnow-key.txt must hold 8–128 letters, digits, or dashes');

async function sitemapUrls() {
  const response = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap: ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

const paths = process.argv.slice(2);
const urlList = paths.length ? paths.map((path) => (path.startsWith('http') ? path : `${SITE_URL}${path}`)) : await sitemapUrls();
const foreign = urlList.filter((url) => new URL(url).host !== host);
if (foreign.length) throw new Error(`not on ${host}: ${foreign.join(', ')}`);

// The protocol takes up to 10,000 URLs per request.
for (let start = 0; start < urlList.length; start += 10_000) {
  const batch = urlList.slice(start, start + 10_000);
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation: `${SITE_URL}/indexnow-key.txt`, urlList: batch }),
  });
  // 200 and 202 both mean accepted; 422 means a URL or the key was refused.
  console.log(`IndexNow: ${response.status} ${response.statusText} for ${batch.length} URL${batch.length === 1 ? '' : 's'}`);
  if (response.status >= 400) {
    console.log(await response.text());
    process.exit(1);
  }
}
