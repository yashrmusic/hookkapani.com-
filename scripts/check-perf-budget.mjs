import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function listFilesRecursive(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function totalBytes(dir, filter) {
  const files = listFilesRecursive(dir).filter(filter);
  return files.reduce((sum, file) => sum + statSync(file).size, 0);
}

function maxBytes(dir, filter) {
  const files = listFilesRecursive(dir).filter(filter);
  return files.reduce((max, file) => Math.max(max, statSync(file).size), 0);
}

const budgets = {
  imagesTotalMb: Number(process.env.BUDGET_IMAGES_TOTAL_MB || 40),
  jsTotalMb: Number(process.env.BUDGET_JS_TOTAL_MB || 2.5),
  largestChunkKb: Number(process.env.BUDGET_LARGEST_CHUNK_KB || 850),
};

const imagesTotal = totalBytes('public/images', (f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
const jsTotal = totalBytes('.next/static/chunks', (f) => /\.js$/i.test(f));
const largestChunk = maxBytes('.next/static/chunks', (f) => /\.js$/i.test(f));

const report = {
  imagesTotalMb: imagesTotal / (1024 * 1024),
  jsTotalMb: jsTotal / (1024 * 1024),
  largestChunkKb: largestChunk / 1024,
};

console.log('[perf-budget]', {
  budgets,
  current: {
    imagesTotalMb: report.imagesTotalMb.toFixed(2),
    jsTotalMb: report.jsTotalMb.toFixed(2),
    largestChunkKb: report.largestChunkKb.toFixed(1),
  },
});

const failures = [];
if (report.imagesTotalMb > budgets.imagesTotalMb) {
  failures.push(`public/images total ${report.imagesTotalMb.toFixed(2)}MB > ${budgets.imagesTotalMb}MB`);
}
if (report.jsTotalMb > budgets.jsTotalMb) {
  failures.push(`.next/static/chunks total ${report.jsTotalMb.toFixed(2)}MB > ${budgets.jsTotalMb}MB`);
}
if (report.largestChunkKb > budgets.largestChunkKb) {
  failures.push(`largest chunk ${report.largestChunkKb.toFixed(1)}KB > ${budgets.largestChunkKb}KB`);
}

if (failures.length > 0) {
  console.error('[perf-budget] failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('[perf-budget] passed');
