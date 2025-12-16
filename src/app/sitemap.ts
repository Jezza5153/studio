export default function sitemap() {
    const base = "https://tafelaaramersfoort.nl";
    const lastModified = new Date();
    return [
      { url: `${base}/`, lastModified },
      { url: `${base}/menu`, lastModified },
      { url: `${base}/over-ons`, lastModified },
      { url: `${base}/over-onze-makers`, lastModified },
      { url: `${base}/verhuur-en-groepen`, lastModified },
      { url: `${base}/catering`, lastModified },
      { url: `${base}/impressie`, lastModified },
      { url: `${base}/contact`, lastModified },
      { url: `${base}/openingstijden`, lastModified },
      { url: `${base}/reserveren`, lastModified },
    ];
  }
  