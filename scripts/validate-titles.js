#!/usr/bin/env node
/**
 * validate-titles.js
 * 
 * Checks that artwork titles AND image mappings in data/artworks.ts
 * match the locked snapshot in data/locked-titles.json.
 * 
 * Usage:
 *   node scripts/validate-titles.js          # check titles + images
 *   node scripts/validate-titles.js --lock   # update the lock file
 * 
 * Exit codes:
 *   0 = everything matches (or lock updated)
 *   1 = mismatches found
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ARTWORKS_PATH = path.join(ROOT, 'data', 'artworks.ts');
const LOCK_PATH = path.join(ROOT, 'data', 'locked-titles.json');

function extractArtworks(content) {
    const map = {};
    const regex = /id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?imageUrl:\s*"([^"]+)"/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
        map[m[1]] = { title: m[2], imageUrl: m[3] };
    }
    return map;
}

// --lock mode: snapshot current state
if (process.argv.includes('--lock')) {
    const content = fs.readFileSync(ARTWORKS_PATH, 'utf8');
    const artworks = extractArtworks(content);
    const output = {
        _warning: "⚠️ LOCKED — artwork titles and image mappings. Do not modify programmatically.",
        _usage: "Run 'pnpm validate:titles' to check, 'pnpm lock:titles' to update after intentional changes.",
        _lockedAt: new Date().toISOString(),
        artworks
    };
    fs.writeFileSync(LOCK_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
    console.log(`🔒 Locked ${Object.keys(artworks).length} artworks (title + image) → ${path.relative(ROOT, LOCK_PATH)}`);
    process.exit(0);
}

// Validation mode
if (!fs.existsSync(LOCK_PATH)) {
    console.error('❌ No locked-titles.json found. Run with --lock first.');
    process.exit(1);
}

const lockData = JSON.parse(fs.readFileSync(LOCK_PATH, 'utf8'));
const locked = lockData.artworks || lockData.titles; // backward compat

const content = fs.readFileSync(ARTWORKS_PATH, 'utf8');
const current = extractArtworks(content);

let issues = 0;

for (const [id, lockedData] of Object.entries(locked)) {
    if (!current[id]) continue;

    // Handle old format (just string title) vs new format (object)
    const lockedTitle = typeof lockedData === 'string' ? lockedData : lockedData.title;
    const lockedImage = typeof lockedData === 'object' ? lockedData.imageUrl : null;

    if (current[id].title !== lockedTitle) {
        console.error(`❌ TITLE CHANGED — ${id}:`);
        console.error(`   Locked:  "${lockedTitle}"`);
        console.error(`   Current: "${current[id].title}"`);
        issues++;
    }

    if (lockedImage && current[id].imageUrl !== lockedImage) {
        console.error(`❌ IMAGE CHANGED — ${id}:`);
        console.error(`   Locked:  "${lockedImage}"`);
        console.error(`   Current: "${current[id].imageUrl}"`);
        issues++;
    }
}

if (issues === 0) {
    const count = Object.keys(locked).length;
    console.log(`✅ All ${count} artwork titles and image mappings match the lock file.`);
    process.exit(0);
} else {
    console.error(`\n${issues} issue(s) found. To update intentionally: pnpm lock:titles\n`);
    process.exit(1);
}
