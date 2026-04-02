
export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        // Explicitly allow AI crawlers for GEO (Generative Engine Optimization)
        {
          userAgent: "GPTBot",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "ChatGPT-User",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "PerplexityBot",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "ClaudeBot",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "Google-Extended",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "Applebot-Extended",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "OAI-SearchBot",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "Claude-SearchBot",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "Claude-User",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "Meta-ExternalAgent",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
        {
          userAgent: "Amazonbot",
          allow: "/",
          disallow: ["/admin/", "/api/"],
        },
      ],
      sitemap: "https://tafelaaramersfoort.nl/sitemap.xml",
    };
  }

