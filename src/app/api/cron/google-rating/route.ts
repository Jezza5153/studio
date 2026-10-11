import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

// Wekelijkse Google-score: de GitHub Action in .github/workflows/google-rating.yml leest
// score en aantal reviews van de openbare Google Maps-pagina (geen Google API) en post ze hierheen.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const secret = process.env.RATING_SYNC_SECRET?.trim();
    if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { rating?: unknown; count?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Body moet JSON zijn: { rating, count }" }, { status: 400 });
    }

    const rating = Number(body.rating);
    const count = Number(body.count);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5 || !Number.isInteger(count) || count < 1 || count > 100000) {
        return NextResponse.json({ error: "rating moet 1 t/m 5 zijn en count een heel getal", rating: body.rating, count: body.count }, { status: 400 });
    }

    const current = await prisma.settings.findUnique({
        where: { id: "singleton" },
        select: { googleRating: true, googleReviewCount: true },
    });

    // Een flinke daling in het aantal reviews wijst eerder op een verkeerd uitgelezen pagina dan op
    // echt verwijderde reviews: dan niets overschrijven en de Action laten falen (mail naar de eigenaar).
    if (current?.googleReviewCount && count < Math.floor(current.googleReviewCount * 0.8)) {
        return NextResponse.json({ error: "Aantal reviews daalt verdacht sterk, niet opgeslagen", current, rating, count }, { status: 409 });
    }

    const settings = await prisma.settings.upsert({
        where: { id: "singleton" },
        create: { id: "singleton", googleRating: rating, googleReviewCount: count },
        update: { googleRating: rating, googleReviewCount: count },
        select: { googleRating: true, googleReviewCount: true, updatedAt: true },
    });
    revalidatePath("/", "layout");

    return NextResponse.json({ ok: true, previous: current, saved: settings });
}
