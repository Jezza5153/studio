import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
        const placePhotos = data.photos || [];

        // Build photo objects paired with review quotes (up to 30)
        const goodReviews = reviews
            .filter((r: any) => {
                const rMap: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
                return (rMap[r.rating] || 5) >= 4 && (r.text?.text || r.originalText?.text || "").trim();
            });
        const photoItems: { url: string; name?: string; quote?: string }[] = [];
        for (const [idx, photo] of placePhotos.slice(0, 30).entries()) {
            if (photo.name) {
                const pairedReview = goodReviews.length > 0
                    ? goodReviews[idx % goodReviews.length]
                    : null;
                const reviewBody = pairedReview
                    ? (pairedReview.text?.text || pairedReview.originalText?.text || "").slice(0, 100)
                    : undefined;
                const reviewAuthor = pairedReview
                    ? pairedReview.authorAttribution?.displayName || "Gast"
                    : undefined;
                photoItems.push({
                    url: `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=800&key=${apiKey}`,
                    name: reviewAuthor,
                    quote: reviewBody,
                });
            }
        }

        // Update Settings with overall rating, count, and place photos
        await prisma.settings.upsert({
            where: { id: "singleton" },
            create: {
                id: "singleton",
                googleRating: overallRating,
                googleReviewCount: totalReviewCount,
                googlePhotos: JSON.stringify(photoItems),
            },
            update: {
                googleRating: overallRating,
                googleReviewCount: totalReviewCount,
                googlePhotos: JSON.stringify(photoItems),
            },
        });

        let upserted = 0;

        for (const review of reviews) {
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
            const body = translatedText || originalText;

            // Skip reviews without text
            if (!body.trim()) continue;

            const authorName =
                review.authorAttribution?.displayName || "Gast";
            const ownerReplyText =
                review.ownerResponse?.text || "";

            // Store extra data in the media JSON field
            const mediaData = JSON.stringify({
                ownerReply: ownerReplyText || undefined,
                authorPhotoUri:
                    review.authorAttribution?.photoUri || undefined,
            });

            const title =
                body.slice(0, 60) + (body.length > 60 ? "…" : "") ||
                `Review van ${authorName}`;

            // sourceUrl = Google Maps URI (clicking opens Google)
            await prisma.feedItem.upsert({
                where: { slug },
                create: {
                    type: "GOOGLE_REVIEW",
                    category: "algemeen",
                    title,
                    slug,
                    body: body.slice(0, 500),
                    rating,
                    authorName,
                    sourceUrl: placeUri || null,
                    media: mediaData,
                    publishedAt: new Date(
                        review.publishTime || Date.now()
                    ),
                },
                update: {
                    body: body.slice(0, 500),
                    rating,
                    authorName,
                    sourceUrl: placeUri || null,
                    media: mediaData,
                },
            });
            upserted++;
        }

        return NextResponse.json({
            success: true,
            upserted,
            overallRating,
            totalReviewCount,
            photosFound: photoItems.length,
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
