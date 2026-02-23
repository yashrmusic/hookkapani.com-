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
const outputPath = path.join(rootDir, 'public', 'portfolio.pdf');

const DEV_URL = 'http://localhost:3000/portfolio';

async function generatePDF() {
    console.log('🚀 Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Set a wide viewport so we get the 2-column layout
    await page.setViewportSize({ width: 1280, height: 900 });

    console.log(`📄 Navigating to ${DEV_URL}...`);
    await page.goto(DEV_URL, { waitUntil: 'networkidle', timeout: 60000 });

    // Wait for all images to load
    console.log('🖼️  Waiting for images to load...');
    await page.waitForTimeout(3000);

    // Scroll to bottom to trigger lazy-loaded images
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 400;
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= document.body.scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });

    // Wait for images to finish loading after scroll
    await page.waitForTimeout(3000);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

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

    console.log('📝 Generating PDF...');
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '10mm',
            right: '10mm',
            bottom: '10mm',
            left: '10mm',
        },
        // No headers or footers (no timestamps!)
        displayHeaderFooter: false,
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
