import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { safeText } from "@/lib/sanitize";

// Google Places API (New) — review + photo ingestion
// Uses API key auth (no OAuth needed)
// Triggered by cron, protected by CRON_SECRET
async function handleIngest(request: Request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET?.trim()}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!placeId) {
        return NextResponse.json(
            { error: "Missing GOOGLE_PLACE_ID env var" },
            { status: 500 }
        );
    }

    if (!apiKey) {
        return NextResponse.json(
            { error: "Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env var" },
            { status: 500 }
        );
    }

    try {
        // Google Places API (New) — Place Details with reviews + photos
        const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=nl`;
        const res = await fetch(url, {
            headers: {
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask":
                    "rating,userRatingCount,reviews,googleMapsUri,photos",
            },
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("Google Places API error:", errText);
            return NextResponse.json(
                { error: "Google Places API error", details: errText },
                { status: 502 }
            );
        }

        const data = await res.json();
        const reviews = data.reviews || [];
        const overallRating = data.rating || 0;
        const totalReviewCount = data.userRatingCount || 0;
        const placeUri = data.googleMapsUri || "";

        // Update Settings with overall rating + count only.
        //
        // NOTE: this cron deliberately does NOT write googlePhotos. The
        // "Gastenhighlights" carousel is owned solely by the Instagram ingest
        // cron (ingest-instagram), which is the live, working photo source.
        // Both crons used to write googlePhotos and clobber each other on every
        // run — whichever ran last won — which made the carousel flip-flop.
        // Keeping a single owner removes that race.
        await prisma.settings.upsert({
            where: { id: "singleton" },
            create: {
                id: "singleton",
                googleRating: overallRating,
                googleReviewCount: totalReviewCount,
            },
            update: {
                googleRating: overallRating,
                googleReviewCount: totalReviewCount,
            },
        });

        let upserted = 0;
        let failed = 0;

        for (const review of reviews) {
            try {
                const reviewId =
                    review.name?.split("/").pop() ||
                    review.name ||
                    `${Date.now()}-${upserted}`;
                const slug = `review-${reviewId}`;

                const ratingMap: Record<string, number> = {
                    ONE: 1,
                    TWO: 2,
                    THREE: 3,
                    FOUR: 4,
                    FIVE: 5,
                };
                const rating = ratingMap[review.rating] || 5;

                // Only keep 4★ and 5★ reviews
                if (rating < 4) continue;

                // Prefer translated text (Dutch via languageCode=nl), fall back to original
                // text.text = translated version, originalText.text = original language
                const translatedText = review.text?.text || "";
                const originalText = review.originalText?.text || "";
                const rawBody = translatedText || originalText;

                // Skip reviews without text
                if (!rawBody.trim()) continue;

                const authorName = safeText(review.authorAttribution?.displayName, 120) || "Gast";

                // Store extra data in the media JSON field
                const mediaData = JSON.stringify({
                    ownerReply: safeText(review.ownerResponse?.text, 500) || undefined,
                    authorPhotoUri:
                        review.authorAttribution?.photoUri || undefined,
                });

                // safeText: code-point-safe slice + NUL/lone-surrogate strip so an
                // emoji at the cut boundary can't corrupt the Postgres write.
                const body = safeText(rawBody, 500);
                const titleBase = safeText(rawBody, 60);
                const title = (titleBase + (Array.from(rawBody).length > 60 ? "…" : "")) || `Review van ${authorName}`;

                // sourceUrl = Google Maps URI (clicking opens Google)
                await prisma.feedItem.upsert({
                    where: { slug },
                    create: {
                        type: "GOOGLE_REVIEW",
                        category: "algemeen",
                        title,
                        slug,
                        body,
                        rating,
                        authorName,
                        sourceUrl: placeUri || null,
                        media: mediaData,
                        publishedAt: new Date(
                            review.publishTime || Date.now()
                        ),
                    },
                    update: {
                        body,
                        rating,
                        authorName,
                        sourceUrl: placeUri || null,
                        media: mediaData,
                    },
                });
                upserted++;
            } catch (reviewErr) {
                // One malformed review must not abort the whole ingest run.
                failed++;
                console.error(`Google review ${review?.name} upsert failed:`, reviewErr);
            }
        }

        return NextResponse.json({
            success: true,
            upserted,
            failed,
            overallRating,
            totalReviewCount,
        });
    } catch (err) {
        console.error("Google reviews ingestion error:", err);
        return NextResponse.json(
            { error: "Ingestion failed" },
            { status: 500 }
        );
    }
}

// Vercel crons use GET, manual triggers use POST
export const GET = handleIngest;
export const POST = handleIngest;
