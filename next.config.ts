import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // ✅ Wikimedia Commons CDN (for Amersfoort city shots)
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      // ✅ Unsplash CDN (optional: if you use Unsplash photos)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // (Optional) Keep placeholders you already used
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
