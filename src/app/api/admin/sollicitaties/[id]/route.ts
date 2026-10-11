import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";
import { SOLLICITATIE_STATUSSEN, type SollicitatieStatus } from "@/lib/sollicitatie";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

function nietGevonden(err: unknown) {
    return (err as { code?: unknown })?.code === "P2025";
}

// PATCH: status wijzigen (nieuw | afgehandeld)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    let status: unknown;
    try {
        status = (await request.json())?.status;
    } catch {
        return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400, headers: NO_STORE });
    }
    if (!SOLLICITATIE_STATUSSEN.includes(status as SollicitatieStatus)) {
        return NextResponse.json({ error: "Status moet nieuw of afgehandeld zijn" }, { status: 400, headers: NO_STORE });
    }

    try {
        const item = await prisma.sollicitatie.update({
            where: { id },
            data: { status: status as SollicitatieStatus },
        });
        return NextResponse.json(item, { headers: NO_STORE });
    } catch (err) {
        if (nietGevonden(err)) return NextResponse.json({ error: "Niet gevonden" }, { status: 404, headers: NO_STORE });
        console.error("Sollicitatie PATCH failed:", err instanceof Error ? err.name : "unknown");
        return NextResponse.json({ error: "Opslaan mislukt" }, { status: 500, headers: NO_STORE });
    }
}

// DELETE: sollicitatie definitief verwijderen (AVG)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    try {
        await prisma.sollicitatie.delete({ where: { id } });
        return NextResponse.json({ success: true }, { headers: NO_STORE });
    } catch (err) {
        if (nietGevonden(err)) return NextResponse.json({ error: "Niet gevonden" }, { status: 404, headers: NO_STORE });
        console.error("Sollicitatie DELETE failed:", err instanceof Error ? err.name : "unknown");
        return NextResponse.json({ error: "Verwijderen mislukt" }, { status: 500, headers: NO_STORE });
    }
}
