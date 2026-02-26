import { cache } from "react";
import { prisma } from "@/lib/db";

export type FeedItemType = "MANUAL" | "INSTAGRAM" | "GOOGLE_REVIEW" | "PRESS";
export type FeedCategory = "vanavond" | "events" | "nieuwe_kaart" | "krant" | "behind" | "algemeen";
export type TonightStatus = "OPEN" | "FEW_LEFT" | "FULL";

export interface MediaItem {
    url: string;
    thumbUrl: string;
    width: number;
    height: number;
    kind: "image" | "video";
    videoUrl?: string;
}

export function parseMedia(media: string | null): MediaItem[] {
    if (!media) return [];
    try {
        return JSON.parse(media);
    } catch {
        return [];
    }
}

export async function getPinnedItems() {
    return prisma.feedItem.findMany({
        where: { pinned: true },
        orderBy: { publishedAt: "desc" },
    });
}

export async function getLeadStory() {
    return prisma.feedItem.findFirst({
        where: {
            pinned: true,
            type: { in: ["MANUAL", "PRESS"] },
        },
        orderBy: { publishedAt: "desc" },
    });
}

export async function getLatestStories(category?: string, limit = 6) {
    return prisma.feedItem.findMany({
        where: {
            type: { in: ["MANUAL", "PRESS"] },
            ...(category && category !== "all" ? { category } : {}),
        },
        orderBy: { publishedAt: "desc" },
        take: limit,
    });
}

export async function getInstagramPosts(limit = 12) {
    return prisma.feedItem.findMany({
        where: { type: "INSTAGRAM" },
        orderBy: { publishedAt: "desc" },
        take: limit,
    });
}

export async function getLatestReviews(limit = 10) {
    return prisma.feedItem.findMany({
        where: { type: "GOOGLE_REVIEW", rating: { gte: 4 }, body: { not: "" } },
        orderBy: [{ rating: "desc" }, { publishedAt: "desc" }],
        take: limit,
    });
}

export async function getFeedPage(
    type?: string,
    page = 1,
    pageSize = 12,
) {
    const where = type && type !== "all" ? { type } : {};
    const [items, total] = await Promise.all([
        prisma.feedItem.findMany({
            where,
            orderBy: { publishedAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.feedItem.count({ where }),
    ]);
    return { items, total, hasMore: page * pageSize < total };
}

/** Cached per-request: deduplicates generateMetadata + page component calls */
export const getStoryBySlug = cache(async (slug: string) => {
    return prisma.feedItem.findUnique({ where: { slug } });
});

/** Related stories in the same category (for the article rail) */
export async function getRelatedStories(category: string, excludeSlug: string, limit = 3) {
    return prisma.feedItem.findMany({
        where: {
            category,
            slug: { not: excludeSlug },
            type: { in: ["MANUAL", "PRESS"] },
        },
        orderBy: { publishedAt: "desc" },
        take: limit,
        select: { slug: true, title: true, media: true, publishedAt: true },
    });
}

/** Get prev/next stories by publish date */
export async function getAdjacentStories(publishedAt: Date, excludeSlug: string) {
    const [prev, next] = await Promise.all([
        prisma.feedItem.findFirst({
            where: { publishedAt: { lt: publishedAt }, slug: { not: excludeSlug }, type: { in: ["MANUAL", "PRESS"] } },
            orderBy: { publishedAt: "desc" },
            select: { slug: true, title: true },
        }),
        prisma.feedItem.findFirst({
            where: { publishedAt: { gt: publishedAt }, slug: { not: excludeSlug }, type: { in: ["MANUAL", "PRESS"] } },
            orderBy: { publishedAt: "asc" },
            select: { slug: true, title: true },
        }),
    ]);
    return { prev, next };
}

export async function getSettings() {
    return prisma.settings.findFirst({ where: { id: "singleton" } });
}

export async function searchFeed(query: string, page = 1, pageSize = 12) {
    if (!query || query.length < 2) {
        return getFeedPage(undefined, page, pageSize);
    }
    const where = {
        OR: [
            { title: { contains: query } },
            { body: { contains: query } },
        ],
    };
    const [items, total] = await Promise.all([
        prisma.feedItem.findMany({
            where,
            orderBy: { publishedAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.feedItem.count({ where }),
    ]);
    return { items, total, hasMore: page * pageSize < total };
}
