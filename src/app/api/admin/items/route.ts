import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";

// GET all items (paginated, filterable)
export async function GET(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
    const type = searchParams.get("type") || undefined;
    const search = searchParams.get("q") || undefined;

    const where: Record<string, unknown> = {};
    if (type && type !== "all") where.type = type;
    if (search) {
        where.OR = [
            { title: { contains: search } },
            { body: { contains: search } },
        ];
    }

    const [items, total] = await Promise.all([
        prisma.feedItem.findMany({
            where,
            orderBy: { publishedAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.feedItem.count({ where }),
    ]);

    return NextResponse.json({
        items,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    });
}

// POST create new item
export async function POST(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Auto-generate slug if not provided
        if (!body.slug) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")
                .slice(0, 80)
                + "-" + Date.now().toString(36);
        }

        const item = await prisma.feedItem.create({
            data: {
                type: body.type || "MANUAL",
                category: body.category || "algemeen",
                title: body.title,
                slug: body.slug,
                body: body.body || null,
                media: body.media || null,
                rating: body.rating || null,
                authorName: body.authorName || null,
                sourceUrl: body.sourceUrl || null,
                pinned: body.pinned || false,
                publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
            },
        });

        return NextResponse.json(item, { status: 201 });
    } catch (err) {
        console.error("Create failed:", err);
        return NextResponse.json({ error: "Create failed" }, { status: 500 });
    }
}
