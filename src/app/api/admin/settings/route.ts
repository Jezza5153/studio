import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";

// GET settings
export async function GET(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const settings = await prisma.settings.findFirst({ where: { id: "singleton" } });
        return NextResponse.json(settings || { id: "singleton", tonightStatus: "OPEN", tonightNote: "", ownerReplyMessage: "", googleRating: 0, googleReviewCount: 0 });
    } catch (err) {
        console.error("Settings GET failed:", err);
        return NextResponse.json({ error: "Failed to fetch settings", details: String(err) }, { status: 500 });
    }
}

// PUT update settings
export async function PUT(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    try {
        const settings = await prisma.settings.upsert({
            where: { id: "singleton" },
            create: {
                id: "singleton",
                tonightStatus: body.tonightStatus || "OPEN",
                tonightNote: body.tonightNote || "",
                ownerReplyMessage: body.ownerReplyMessage || "",
            },
            update: {
                ...(body.tonightStatus !== undefined && { tonightStatus: body.tonightStatus }),
                ...(body.tonightNote !== undefined && { tonightNote: body.tonightNote }),
                ...(body.ownerReplyMessage !== undefined && { ownerReplyMessage: body.ownerReplyMessage }),
            },
        });
        return NextResponse.json(settings);
    } catch (err) {
        console.error("Settings update failed:", err);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
