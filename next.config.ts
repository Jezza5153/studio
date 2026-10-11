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
        source: "/vacatures/assistent-leidinggevende",
        destination: "/vacatures/eerste-medewerker-restaurant",
        permanent: true,
      },
      {
        // Korte reviewlinks voor tafelkaartjes, bonnetjes en QR-codes. Tijdelijk (307), zodat de
        // QR-codes blijven werken als de doelpagina ooit verandert.
        source: "/review",
        destination: "https://search.google.com/local/writereview?placeid=ChIJSW64-iRHxkcREn638_zQroA",
        permanent: false,
      },
      {
        source: "/tripadvisor",
        destination: "https://www.tripadvisor.nl/UserReviewEdit-g188613-d34027809-De_Tafelaar-Amersfoort.html",
        permanent: false,
      },
      {
        // Oud vercel.app-adres van productie: dubbele content, alles naar het echte domein.
        source: "/:path*",
        has: [{ type: "host", value: "studio-ten-ruby.vercel.app" }],
        destination: "https://www.tafelaaramersfoort.nl/:path*",
        permanent: true,
      },
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
        // Geen lunch meer sinds de openingstijden van oktober 2026 (vr t/m zo vanaf
        // 15:00). Tijdelijke redirect, zodat /lunch terug kan als de lunch terugkomt.
        source: "/lunch",
        destination: "/menu",
        permanent: false,
      },
      {
        source: "/lunch-amersfoort",
        destination: "/menu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
