// Submit the production sitemap URLs to IndexNow (free, no account).
// Usage:
//   node scripts/submit-indexnow.mjs
//   node scripts/submit-indexnow.mjs https://hookkapani.com/ https://hookkapani.com/portfolio
// With no arguments, URLs are read from the production sitemap XML.
// The key is public by design: it is also served at
// https://hookkapani.com/a7c3e9f1b2d84a6f0e5c7a9d3b1f6e28.txt
// Env overrides: INDEXNOW_HOST, INDEXNOW_KEY, SITEMAP_URL.

const HOST = process.env.INDEXNOW_HOST || 'hookkapani.com';
const KEY = process.env.INDEXNOW_KEY || 'a7c3e9f1b2d84a6f0e5c7a9d3b1f6e28';
const SITEMAP_URL = process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`;
const BATCH_SIZE = 10000;

async function urlsFromSitemap() {
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap ${SITEMAP_URL}: ${response.status}`);
  }
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith(`https://${HOST}/`));
  return [...new Set(urls)];
}

async function submit(urlList) {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow rejected ${urlList.length} URLs (${response.status}): ${body}`);
  }
  console.log(`IndexNow accepted ${urlList.length} URLs.`);
}

const urls = process.argv.slice(2).length > 0 ? process.argv.slice(2) : await urlsFromSitemap();
if (urls.length === 0) {
  throw new Error('No URLs to submit to IndexNow.');
}
for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  await submit(urls.slice(i, i + BATCH_SIZE));
}
console.log(`Submitted ${urls.length} URLs to IndexNow for ${HOST}.`);
