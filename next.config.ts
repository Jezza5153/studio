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
      // Instagram CDN
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.*.fbcdn.net',
      },
      // Behold.so CDN (Instagram feed images)
      {
        protocol: 'https',
        hostname: 'behold.pictures',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.behold.pictures',
      },
    ],
  },
};

export default nextConfig;
