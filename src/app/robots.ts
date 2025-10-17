export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: "https://tafelaaramersfoort.nl/sitemap.xml",
    };
  }
  