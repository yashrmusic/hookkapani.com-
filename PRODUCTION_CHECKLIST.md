# Production Checklist

## Build and quality
- [x] `pnpm lint` passes
- [x] `pnpm build` passes
- [x] TypeScript build errors are failing build (no ignore flag)

## Core experience
- [x] Mobile-safe viewport and safe-area handling are enabled
- [x] Navigation, gallery, work detail, and portfolio routes build as static pages
- [x] Inquiry forms submit to `/api/commission`

## SEO
- [x] `robots.txt` exists
- [x] `sitemap.xml` exists
- [x] Sitemap includes home, studio, portfolio, and all `/work/[id]` routes
- [x] Canonical and social metadata configured

## Security headers
- [x] `X-Content-Type-Options: nosniff`
- [x] `X-Frame-Options: SAMEORIGIN`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy` restricted for camera/mic/geolocation

## Environment
- [x] `.env.example` added with `COMMISSION_WEBHOOK_URL`
- [ ] Set `COMMISSION_WEBHOOK_URL` in production environment

## Performance
- [x] Next image optimization enabled (webp/avif)
- [x] Large image quality defaults reduced in key views
- [x] Recompress source images in `public/images` for strongest real-device speed gains

## Device QA to run manually
- [ ] iPhone Safari (latest + one older)
- [ ] Android Chrome (latest + one older)
- [ ] Mac desktop Safari/Chrome
- [ ] Windows laptop Chrome/Edge
- [ ] Keyboard-only navigation
- [ ] Slow 4G throttling pass for home, work detail, and portfolio
