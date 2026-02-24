
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tafelaaramersfoort.nl";
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/menu`, lastModified, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/eten-voor-theater-de-flint`, lastModified, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/bourgondisch-eten-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/nieuw-restaurant-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/buurtgids`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/over-ons`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/over-onze-makers`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/filosofie`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/impressie`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/contact`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/reserveren`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/verhuur-en-groepen`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/catering`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/openingstijden`, lastModified, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/drank`, lastModified, priority: 0.6, changeFrequency: "weekly" },
    { url: `${base}/agenda`, lastModified, priority: 0.8, changeFrequency: "weekly" },
  ];
}


