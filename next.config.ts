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
      // Google user content (customer photos)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Oude evenementpagina's (Moederdag high tea, Eten met Peter) zijn weg;
        // nog geindexeerde en gedeelde links landen op de agenda.
        source: "/moederdag-high-tea-amersfoort",
        destination: "/agenda",
        permanent: true,
      },
      {
        source: "/eten-met-peter",
        destination: "/agenda",
        permanent: true,
      },
      {
        // Legacy lunch landing page. Lunch service is running again, so send
        // the still-indexed URL to the real lunchkaart instead of the diner menu.
        source: "/lunch-amersfoort",
        destination: "/lunch",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
