#!/usr/bin/env node
/**
 * generate-catalogue.js
 * 
 * Generates a visual HTML catalogue from data/locked-titles.json
 * that shows each artwork image alongside its locked title, ID, 
 * and image path. Open the output file in a browser to visually
 * verify all image-to-title mappings.
 * 
 * Usage:
 *   node scripts/generate-catalogue.js
 *   # opens: data/artwork-catalogue.html
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCK_PATH = path.join(ROOT, 'data', 'locked-titles.json');
const OUT_PATH = path.join(ROOT, 'data', 'artwork-catalogue.html');

if (!fs.existsSync(LOCK_PATH)) {
    console.error('❌ No locked-titles.json found. Run pnpm lock:titles first.');
    process.exit(1);
}

const lockData = JSON.parse(fs.readFileSync(LOCK_PATH, 'utf8'));
const artworks = lockData.artworks || {};

const cards = Object.entries(artworks).map(([id, data], i) => {
    const title = typeof data === 'string' ? data : data.title;
    const img = typeof data === 'object' ? data.imageUrl : `/images/${id}.jpg`;
    return `
    <div class="card">
      <div class="num">#${i + 1}</div>
      <img src="../public${img}" alt="${title}" onerror="this.style.background='#333';this.alt='Image not found: ${img}'" />
      <div class="info">
        <div class="title">${title}</div>
        <div class="meta">${id}</div>
        <div class="meta">${img}</div>
      </div>
    </div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Hookkapaani — Artwork Catalogue (Locked Reference)</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; padding: 40px; }
  h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
  .subtitle { color: #888; font-size: 13px; margin-bottom: 40px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
  .card { background: #141414; border: 1px solid #222; overflow: hidden; position: relative; }
  .card img { width: 100%; height: 280px; object-fit: cover; display: block; }
  .info { padding: 16px; }
  .title { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
  .meta { font-size: 11px; color: #666; font-family: monospace; }
  .num { position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.7); color: #ff9500; font-size: 11px; font-family: monospace; padding: 2px 8px; z-index: 1; }
  .warn { background: #1a1200; border: 1px solid #ff9500; padding: 16px; margin-bottom: 32px; font-size: 13px; color: #ff9500; }
</style>
</head>
<body>
  <h1>🔒 Artwork Catalogue — Locked Reference</h1>
  <p class="subtitle">Generated ${new Date().toISOString()} · ${Object.keys(artworks).length} artworks</p>
  <div class="warn">⚠️ This is the locked image-to-title reference. If an image doesn't match its title, the mapping in artworks.ts is wrong.</div>
  <div class="grid">
    ${cards}
  </div>
</body>
</html>`;

fs.writeFileSync(OUT_PATH, html, 'utf8');
console.log(`📖 Catalogue generated → ${path.relative(ROOT, OUT_PATH)}`);
console.log(`   Open in browser to visually verify all ${Object.keys(artworks).length} mappings.`);
