export default function sitemap() {
    const base = "https://tafelaaramersfoort.nl";
    const lastModified = new Date();
    return [
      { url: `${base}/`, lastModified },
      { url: `${base}/menu`, lastModified },
      { url: `${base}/filosofie`, lastModified },
      { url: `${base}/openingstijden`, lastModified },
      { url: `${base}/reserveren`, lastModified },
    ];
  }
  