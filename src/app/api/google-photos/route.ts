import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side proxy for Google Places (New) photo media.
 *
 * The cron stores URLs of the form `/api/google-photos?name=places/.../photos/...`
 * in Settings.googlePhotos. This route fetches the photo bytes from Google with
 * the server-side API key and streams them to the browser — keeps the key off
 * the client and bypasses any HTTP-referrer / domain restrictions on the key
 * that would block the browser from calling Google directly.
 *
 * Backwards-compatible: also accepts `?u=<encoded full Google URL>` so any
 * historical DB rows with the old `https://places.googleapis.com/...` URLs
 * still resolve while the next cron run rewrites them to the proxy format.
 *
 * Cache aggressively: photos are stable artifacts; 1 day at the edge + a
 * stale-while-revalidate window keeps repeat loads cheap.
 */
export async function GET(request: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env var" },
            { status: 500 }
        );
    }

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const u = searchParams.get("u");
    const maxWidthPx = searchParams.get("maxWidthPx") || "800";

    let upstream: string;
    if (name) {
        // Validate: name must look like "places/{id}/photos/{id}" — guards
        // against this route being abused as an open redirect / proxy.
        if (!/^places\/[A-Za-z0-9_-]+\/photos\/[A-Za-z0-9_-]+$/.test(name)) {
            return NextResponse.json(
                { error: "Invalid photo name" },
                { status: 400 }
            );
        }
        upstream = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=${encodeURIComponent(
            maxWidthPx
        )}&key=${apiKey}`;
    } else if (u) {
        // Backwards-compat: only allow exact places.googleapis.com hosts to
        // avoid the route being misused as a general fetch proxy.
        try {
            const parsed = new URL(u);
            if (parsed.host !== "places.googleapis.com") {
                return NextResponse.json(
                    { error: "Unsupported host" },
                    { status: 400 }
                );
            }
            upstream = parsed.toString();
        } catch {
            return NextResponse.json(
                { error: "Invalid u parameter" },
                { status: 400 }
            );
        }
    } else {
        return NextResponse.json(
            { error: "Missing 'name' or 'u' query parameter" },
            { status: 400 }
        );
    }

    const res = await fetch(upstream, {
        // Server-side fetch — referrer restrictions on the API key don't
        // block this. Google redirects to a signed lh3 URL; fetch follows it.
        redirect: "follow",
    });

    if (!res.ok) {
        const detail = await res.text().catch(() => "");
        console.error(
            `[google-photos] upstream ${res.status}: ${detail.slice(0, 200)}`
        );
        return NextResponse.json(
            { error: "Upstream error", status: res.status },
            { status: 502 }
        );
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const body = await res.arrayBuffer();

    return new NextResponse(body, {
        status: 200,
        headers: {
            "content-type": contentType,
            // Photos are stable artifacts — cache hard at the edge.
            "cache-control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        },
    });
}
