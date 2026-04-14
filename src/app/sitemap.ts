
import type { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://tafelaaramersfoort.nl";
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/menu`, lastModified, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/eten-voor-theater-de-flint`, lastModified, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/bourgondisch-eten-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/nieuw-restaurant-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/buurtgids`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/over-ons`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/over-onze-makers`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/impressie`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/contact`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/reserveren`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/verhuur-en-groepen`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/catering`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/openingstijden`, lastModified, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/drank`, lastModified, priority: 0.6, changeFrequency: "weekly" },
    { url: `${base}/agenda`, lastModified, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/updates`, lastModified, priority: 0.7, changeFrequency: "weekly" },
    { url: `${base}/restaurant-amersfoort-centrum`, lastModified, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/borrel-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/uit-eten-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/romantisch-diner-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/duurzaam-restaurant-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/feestlocatie-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/bedrijfsdiner-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/prive-diner-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/vegetarisch-amersfoort`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/beste-restaurant-amersfoort`, lastModified, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/moederdag-high-tea-amersfoort`, lastModified, priority: 0.9, changeFrequency: "weekly" },
  ];

  // Dynamic article pages from database
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.feedItem.findMany({
      where: { type: "MANUAL" },
      select: { slug: true, publishedAt: true },
      orderBy: { publishedAt: "desc" },
    });

    articlePages = articles.map((article) => ({
      url: `${base}/updates/${article.slug}`,
      lastModified: article.publishedAt,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    }));
  } catch {
    // DB unavailable at build time — static pages only
  }

  return [...staticPages, ...articlePages];
}


