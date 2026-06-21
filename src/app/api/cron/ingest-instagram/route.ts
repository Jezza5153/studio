import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { safeText } from "@/lib/sanitize";

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

        // Refresh the guest-highlights carousel photos FIRST, derived directly
        // from the live feed (not from DB writes). This must not be blocked by a
        // single malformed feed item further down — historically one bad caption
        // threw mid-loop and the carousel photos were never refreshed, so they
        // went stale and (after Behold migrated their CDN URL scheme) started
        // 404/403-ing. See safeText for the surrogate/NUL issue.
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

        let upserted = 0;
        let failed = 0;

        for (const post of posts) {
            try {
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
                // safeText: code-point-safe slice + NUL/lone-surrogate strip so an
                // emoji at the cut boundary can't corrupt the Postgres write.
                const title = safeText(caption.split("\n")[0], 100) || "Instagram post";
                const body = safeText(caption, 500);

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
                        body,
                        media,
                        sourceUrl: post.permalink,
                        publishedAt: new Date(post.timestamp),
                    },
                    update: {
                        title,
                        body,
                        media,
                        sourceUrl: post.permalink,
                    },
                });
                upserted++;
            } catch (postErr) {
                // One malformed post must not abort the whole ingest run.
                failed++;
                console.error(`Instagram post ${post?.id} upsert failed:`, postErr);
            }
        }

        return NextResponse.json({ success: true, upserted, failed, photosRefreshed: photoUrls.length });
    } catch (err) {
        console.error("Instagram ingestion error:", err);
        return NextResponse.json({ error: "Ingestion failed" }, { status: 500 });
    }
}

// Vercel crons use GET, manual triggers use POST
export const GET = handleIngest;
export const POST = handleIngest;
