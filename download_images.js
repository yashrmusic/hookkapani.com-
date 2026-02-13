const https = require('https');
const fs = require('fs');
const path = require('path');

const files = [
    { name: 'IMG_1499.PNG', id: '13nr8lgh8fxXoSIVj5T_FVxJI0JSxp9Vl' },
    { name: 'IMG_1500.PNG', id: '1TE-BPKr4g8SgnZYWr1gxaBCneS4Mas7U' },
    { name: 'IMG_1514.PNG', id: '1eK9aT3T_4oCfzsQ0BDl6PKQTxuRPhzjE' },
    { name: 'IMG_1516.PNG', id: '1Rm6B72BSwmIvSuvMu0NeSPjZpHbScisD' },
    { name: 'IMG_1518.PNG', id: '1-FPSBPRRX0sHJ5mIqShL-75WoC7LJfmJ' },
    { name: 'IMG_1521.PNG', id: '1xYAkGbaX5OEUyluFwHCjItpXnp7CvUEC' },
    { name: 'IMG_1523.PNG', id: '1TX4ulGtmfbwvTI2beLz1eFB1fpjo0BMh' },
    { name: 'IMG_1524.PNG', id: '1imzbxm89iNyaThRD8zj_YcMBhJg19N3y' },
    { name: 'IMG_1525.PNG', id: '1O1kVFj-KmHTgOofwA-PTKw2O6z7kujLE' },
    { name: 'IMG_1527.PNG', id: '1F32JHqU_ZyULqBbat-oj_u3OY92z1B-j' },
    { name: 'IMG_1529.PNG', id: '1SYc1WOyCvsFKkZ4AfElPUvDPXvD37LJl' },
    { name: 'IMG_1530.PNG', id: '1dWIW0Vci8AZL3taFxKQ3Fdel5E-Efa0I' },
    { name: 'IMG_1531.PNG', id: '1oqWovJh7GAaisle3hTjZcUb4eh0z__XJ' },
    { name: 'IMG_1576.PNG', id: '1_SK9_jc8-kPs48V7YW1xRfxsifon4pak' },
    { name: 'IMG_1577.PNG', id: '1HId_DyxAM_Z3_XHiFUqRWLJBnGRwGsas' },
    { name: 'IMG_1579.PNG', id: '1HNqTpsOl_EBtyRXDZ2ZQQooPi4k5w_BE' },
    { name: 'IMG_1580.PNG', id: '13X02BmFNeizQYY5kosqUS-GI4sXtbVH4' },
    { name: 'IMG_1581.PNG', id: '1Q_ZvHAU77fW0dd232t5qyy2I24_tnoAg' },
    { name: 'IMG_1583.JPG', id: '1PiqRAEYzKVY-Wu9PkVk4ZwZ-2jCVabA9' },
    { name: 'IMG_1586.PNG', id: '1fpnNOcRYt90brcx_0-MB74W1WkYH-yN5' },
    { name: 'IMG_1587.PNG', id: '1QSo6bYbfWcRX9Boqi-4Y-IIIf2Wxuwel' },
    { name: 'IMG_1596.PNG', id: '1Ydic1jZZ1b1UpcPDDEEjYfO43tXL0p-s' },
    { name: 'IMG_1597.PNG', id: '1xEZp1frPxLsFlTA0v1OJ41sP2tNUGenv' },
    { name: 'IMG_1598.PNG', id: '1my6KGd4nL9d1yOWc-8xXBE2j6G-LUf7I' },
    { name: 'IMG_1599.PNG', id: '1Q3ueSWGgH8hTreaUQHqVEl0NGUQXNgQ_' },
    { name: 'IMG_1600.PNG', id: '1P-UFPcrLYl2BULxYupUZIkAxNp_7o7m7' },
    { name: 'IMG_1601.PNG', id: '1a4QpuiBf-fahZSpaVCIM9xJY5-qjND9X' },
    { name: 'IMG_1602.PNG', id: '1C75QbsdvOVnGUfGnXrc7fkctYfqGme-H' },
];

const outDir = path.join(__dirname, 'gdrive_images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function downloadFile(file, retries = 3) {
    return new Promise((resolve, reject) => {
        const url = `https://drive.google.com/uc?export=download&id=${file.id}`;
        const filePath = path.join(outDir, file.name);

        const follow = (url, depth = 0) => {
            if (depth > 5) return reject(new Error('Too many redirects'));

            const protocol = url.startsWith('https') ? https : require('http');
            protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    return follow(res.headers.location, depth + 1);
                }
                if (res.statusCode !== 200) {
                    return reject(new Error(`HTTP ${res.statusCode} for ${file.name}`));
                }
                const ws = fs.createWriteStream(filePath);
                res.pipe(ws);
                ws.on('finish', () => {
                    ws.close();
                    const stats = fs.statSync(filePath);
                    console.log(`✓ ${file.name} (${(stats.size / 1024).toFixed(1)} KB)`);
                    resolve();
                });
            }).on('error', reject);
        };

        follow(url);
    });
}

async function main() {
    console.log(`Downloading ${files.length} images...`);

    // Download in batches of 4
    for (let i = 0; i < files.length; i += 4) {
        const batch = files.slice(i, i + 4);
        await Promise.all(batch.map(f => downloadFile(f).catch(e => console.error(`✗ ${f.name}: ${e.message}`))));
    }

    console.log('\nDone!');
}

main();
