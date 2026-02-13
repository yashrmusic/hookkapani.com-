import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Enable compression
  compress: true,
  // Reduce bundle size by not including unused code
  modularizeImports: {
    '@radix-ui/react-icons': {
      transform: '@radix-ui/react-icons/{{member}}',
    },
  },
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
  },
  // Disable x-powered-by header
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
};

export default nextConfig;
