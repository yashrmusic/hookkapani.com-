/**
 * Captures the white portfolio page from the running dev server as a PDF.
 * 
 * Usage:
 *   1. Start the dev server: pnpm dev
 *   2. Run: node scripts/capture-portfolio-pdf.mjs
 */
import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const outputPath = path.join(rootDir, 'public', 'portfolio_v1.pdf');

// Use capture=true to avoid triggering window.print() and enable print-specific styles
const DEV_URL = 'http://localhost:3000/portfolio?print=true&capture=true';

async function generatePDF() {
    console.log('🚀 Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Set a wide viewport 
    await page.setViewportSize({ width: 1280, height: 2400 });

    console.log(`📄 Navigating to ${DEV_URL}...`);
    // Increased timeout and waited for networkidle
    await page.goto(DEV_URL, { waitUntil: 'networkidle', timeout: 90000 });

    console.log('🖼️  Ensuring all images are fully loaded...');

    // Robust check for image loading
    await page.evaluate(async () => {
        const images = Array.from(document.querySelectorAll('img'));
        await Promise.all(images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = resolve; // Continue even if one fails
                // Timeout after 15s for individual image
                setTimeout(resolve, 15000);
            });
        }));

        // Extra check for decoded images
        await Promise.all(images.map(img => {
            return img.decode().catch(() => { });
        }));
    });

    // Give a little extra time for layout stabilization
    await page.waitForTimeout(5000);

    // Hide the fixed download button and any nav before printing
    await page.evaluate(() => {
        // Hide the download button
        const downloadBtn = document.querySelector('a[download]');
        if (downloadBtn) downloadBtn.style.display = 'none';

        // Hide any nav/header elements
        const nav = document.querySelector('nav');
        if (nav) nav.style.display = 'none';

        // Hide any cursor effects or overlays
        document.querySelectorAll('[class*="cursor"], [class*="spotlight"]').forEach(el => {
            el.style.display = 'none';
        });
    });

    console.log('📝 Generating One-Artwork-Per-Page PDF...');
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0mm',    // Margins handled by component padding
            right: '0mm',
            bottom: '0mm',
            left: '0mm',
        },
        displayHeaderFooter: false,
        preferCSSPageSize: true,
    });

    await browser.close();

    const stats = fs.statSync(outputPath);
    console.log(`\n✅ Portfolio PDF saved to: ${outputPath}`);
    console.log(`📄 File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

generatePDF().catch((err) => {
    console.error('❌ Error generating PDF:', err.message);
    process.exit(1);
});
