import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Instagram ingestion via Behold.so feed
// Triggered by Vercel/Railway cron, protected by CRON_SECRET
const BEHOLD_FEED_URL = "https://feeds.behold.so/iUbmvQA9aGjYOxLLqttW";

async function handleIngest(request: Request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET?.trim()}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const res = await fetch(BEHOLD_FEED_URL, { next: { revalidate: 0 } });

        if (!res.ok) {
            const errText = await res.text();
            console.error("Behold API error:", errText);
            return NextResponse.json({ error: "Behold API error", details: errText }, { status: 502 });
        }

        const data = await res.json();
        const posts = data.posts || [];

        let upserted = 0;

        for (const post of posts) {
            const isVideo = post.mediaType === "VIDEO";

            // Use Behold's optimized CDN images (medium = 700px, good balance)
            const imageUrl = post.sizes?.medium?.mediaUrl
                || post.thumbnailUrl
                || post.mediaUrl;

            const thumbUrl = post.sizes?.small?.mediaUrl
                || post.thumbnailUrl
                || imageUrl;

            const slug = `ig-${post.id}`;
            const caption = post.caption || "";
            const title = caption.split("\n")[0]?.slice(0, 100) || "Instagram post";

            const mediaItem: Record<string, unknown> = {
                url: imageUrl,
                thumbUrl: thumbUrl,
                width: post.sizes?.medium?.width || 700,
                height: post.sizes?.medium?.height || 700,
                kind: isVideo ? "video" : "image",
            };
            // For reels/videos, also store the actual video URL
            if (isVideo && post.mediaUrl) {
                mediaItem.videoUrl = post.mediaUrl;
            }
            const media = JSON.stringify([mediaItem]);

            await prisma.feedItem.upsert({
                where: { slug },
                create: {
                    type: "INSTAGRAM",
                    category: "algemeen",
                    title,
                    slug,
                    body: caption.slice(0, 500),
                    media,
                    sourceUrl: post.permalink,
                    publishedAt: new Date(post.timestamp),
                },
                update: {
                    title,
                    body: caption.slice(0, 500),
                    media,
                    sourceUrl: post.permalink,
                },
            });
            upserted++;
        }

        // Also update guest highlight photos in Settings (IMAGE posts only, large)
        const photoUrls = posts
            .filter((p: any) => p.mediaType === "IMAGE")
            .slice(0, 10)
            .map((p: any) => p.sizes?.large?.mediaUrl || p.sizes?.medium?.mediaUrl || p.mediaUrl)
            .filter(Boolean);

        if (photoUrls.length > 0) {
            await prisma.settings.upsert({
                where: { id: "singleton" },
                create: { id: "singleton", googlePhotos: JSON.stringify(photoUrls) },
                update: { googlePhotos: JSON.stringify(photoUrls) },
            });
        }

        return NextResponse.json({ success: true, upserted });
    } catch (err) {
        console.error("Instagram ingestion error:", err);
        return NextResponse.json({ error: "Ingestion failed" }, { status: 500 });
    }
}

// Vercel crons use GET, manual triggers use POST
export const GET = handleIngest;
export const POST = handleIngest;
