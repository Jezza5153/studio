import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";
import { getVacature } from "@/content/vacatures";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

// GET: alle sollicitaties, nieuwste eerst, plus het aantal nieuwe.
export async function GET(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [rijen, nieuw] = await Promise.all([
            prisma.sollicitatie.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
            prisma.sollicitatie.count({ where: { status: "nieuw" } }),
        ]);
        const items = rijen.map((s) => ({
            ...s,
            vacatureTitel: getVacature(s.vacatureSlug)?.titel ?? s.vacatureSlug,
        }));
        return NextResponse.json({ items, nieuw }, { headers: NO_STORE });
    } catch (err) {
        console.error("Sollicitaties GET failed:", err instanceof Error ? err.name : "unknown");
        return NextResponse.json({ error: "Sollicitaties laden mislukt" }, { status: 500, headers: NO_STORE });
    }
}
