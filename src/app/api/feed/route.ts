import { NextResponse } from "next/server";
import { getFeedPage } from "@/lib/queries/feed";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = Math.min(parseInt(searchParams.get("pageSize") || "12", 10), 50);

    const data = await getFeedPage(type, page, pageSize);

    return NextResponse.json(data);
}
