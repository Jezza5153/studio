import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";

// GET single item
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const item = await prisma.feedItem.findUnique({ where: { id } });
    if (!item) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
}

// PUT update item
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    try {
        const item = await prisma.feedItem.update({
            where: { id },
            data: {
                ...(body.type !== undefined && { type: body.type }),
                ...(body.category !== undefined && { category: body.category }),
                ...(body.title !== undefined && { title: body.title }),
                ...(body.slug !== undefined && { slug: body.slug }),
                ...(body.body !== undefined && { body: body.body }),
                ...(body.media !== undefined && { media: body.media }),
                ...(body.rating !== undefined && { rating: body.rating }),
                ...(body.authorName !== undefined && { authorName: body.authorName }),
                ...(body.sourceUrl !== undefined && { sourceUrl: body.sourceUrl }),
                ...(body.pinned !== undefined && { pinned: body.pinned }),
                ...(body.publishedAt !== undefined && { publishedAt: new Date(body.publishedAt) }),
            },
        });
        return NextResponse.json(item);
    } catch (err) {
        console.error("Update failed:", err);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

// DELETE item
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    try {
        await prisma.feedItem.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Delete failed:", err);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
