/** @type {import('next').NextConfig} */
const scriptSrc = process.env.NODE_ENV === 'production'
  ? "script-src 'self' 'unsafe-inline'"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "form-action 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
].join('; ');

// Permanent redirects from the old numbered work URLs to the readable
// slug URLs (and the same for each work's spec-sheet download). Slugs are
// derived from the locked work titles; see lib/artwork-utils.ts.
const workRedirects = [
  ['new-work-1', 'sitting-monkey'],
  ['new-work-2', 'the-bear'],
  ['new-work-3', 'rebirth-in-silence'],
  ['new-work-5', 'sitting-bear'],
  ['new-work-6', 'steel-balls'],
  ['new-work-7', 'metal-sphere'],
  ['new-work-8', 'the-open-gates-soul'],
  ['new-work-10', 'formless'],
  ['new-work-11', 'chrome-drop'],
  ['new-work-12', 'bowling-man'],
  ['new-work-13', 'sangeeta'],
  ['new-work-14', 'throne-of-steel'],
  ['new-work-15', 'formula-1'],
  ['new-work-16', 'the-owl'],
  ['new-work-17', 'the-strawberry'],
  ['new-work-18', 'chilled-owl'],
  ['new-work-19', 'gesture-of-genius'],
  ['new-work-20', 'mona-lisa'],
  ['new-work-21', 'reclining-buddha'],
  ['new-work-22', 'forest-lady'],
  ['new-work-23', 'tiger-man'],
  ['new-work-24', 'the-bunny'],
  ['new-work-25', 'drowning-man'],
  ['new-work-26', 'the-bull'],
  ['new-work-27', 'table-horse'],
  ['new-work-28', 'medusa'],
  ['new-work-29', 'the-moon'],
  ['new-work-30', 'the-hearing-heart'],
  ['new-work-31', 'golden-petals'],
  ['new-work-32', 'koi-fish'],
  ['new-work-33', 'the-apple-cage'],
  ['new-work-34', 'metalic-wave'],
  ['new-work-35', 'forest-panther'],
  ['new-work-36', 'fish-in-spectrum'],
  ['new-work-37', 'king-kong'],
  ['new-work-38', 'the-cactus'],
  ['new-work-39', 'astronaut'],
  ['new-work-40', 'the-color-of-fabric'],
];

const nextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 82, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  serverExternalPackages: ['nodemailer'],
  async redirects() {
    return workRedirects.flatMap(([oldId, slug]) => [
      { source: `/work/${oldId}`, destination: `/work/${slug}`, permanent: true },
      { source: `/work/${oldId}/spec-sheet`, destination: `/work/${slug}/spec-sheet`, permanent: true },
    ]);
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          { key: 'Origin-Agent-Cluster', value: '?1' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/:path*.pdf',
        headers: [
          { key: 'Cache-Control', value: 'public, no-cache, must-revalidate' },
        ],
      },
    ];
  },
}

export default nextConfig
