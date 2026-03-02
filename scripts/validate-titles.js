#!/usr/bin/env node
/**
 * validate-titles.js
 * 
 * Checks that artwork titles in data/artworks.ts match the locked
 * titles in data/locked-titles.json.
 * 
 * Usage:
 *   node scripts/validate-titles.js          # check only
 *   node scripts/validate-titles.js --lock   # update the lock file with current titles
 * 
 * Exit codes:
 *   0 = all titles match (or lock updated)
 *   1 = mismatches found
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ARTWORKS_PATH = path.join(ROOT, 'data', 'artworks.ts');
const LOCK_PATH = path.join(ROOT, 'data', 'locked-titles.json');

function extractTitles(content) {
    const map = {};
    const regex = /id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
        map[m[1]] = m[2];
    }
    return map;
}

// --lock mode: update the lock file
if (process.argv.includes('--lock')) {
    const content = fs.readFileSync(ARTWORKS_PATH, 'utf8');
    const titles = extractTitles(content);
    const output = {
        _warning: "⚠️ LOCKED TITLES — Do not modify unless manually updating artwork names. Run 'node scripts/validate-titles.js' to verify.",
        _lockedAt: new Date().toISOString(),
        titles
    };
    fs.writeFileSync(LOCK_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
    console.log(`✅ Locked ${Object.keys(titles).length} titles → ${path.relative(ROOT, LOCK_PATH)}`);
    process.exit(0);
}

// Validation mode
if (!fs.existsSync(LOCK_PATH)) {
    console.error('❌ No locked-titles.json found. Run with --lock first to create one.');
    process.exit(1);
}

const lockData = JSON.parse(fs.readFileSync(LOCK_PATH, 'utf8'));
const lockedTitles = lockData.titles;

const content = fs.readFileSync(ARTWORKS_PATH, 'utf8');
const currentTitles = extractTitles(content);

let mismatches = 0;
const changes = [];

for (const [id, lockedTitle] of Object.entries(lockedTitles)) {
    if (currentTitles[id] && currentTitles[id] !== lockedTitle) {
        changes.push({ id, locked: lockedTitle, current: currentTitles[id] });
        mismatches++;
    }
}

if (mismatches === 0) {
    console.log(`✅ All ${Object.keys(lockedTitles).length} artwork titles match the lock file.`);
    process.exit(0);
} else {
    console.error(`\n❌ ${mismatches} TITLE MISMATCH(ES) DETECTED:\n`);
    changes.forEach(c => {
        console.error(`  ${c.id}:`);
        console.error(`    Locked:  "${c.locked}"`);
        console.error(`    Current: "${c.current}"  ← CHANGED`);
        console.error('');
    });
    console.error(`To intentionally update titles, manually edit locked-titles.json`);
    console.error(`or run: node scripts/validate-titles.js --lock\n`);
    process.exit(1);
}
