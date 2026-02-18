import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Temporary debug endpoint — no auth required
// DELETE THIS after debugging
export async function GET() {
    const checks: Record<string, unknown> = {};

    // 1. Check env vars
    checks.DATABASE_URL = process.env.DATABASE_URL
        ? `set (starts: ${process.env.DATABASE_URL.substring(0, 25)}...)`
        : "NOT SET";
    checks.DATABASE_URL_UNPOOLED = process.env.DATABASE_URL_UNPOOLED
        ? `set (starts: ${process.env.DATABASE_URL_UNPOOLED.substring(0, 25)}...)`
        : "NOT SET";
    checks.ADMIN_USER = process.env.ADMIN_USER ? "set" : "NOT SET (fallback used)";
    checks.ADMIN_PASS = process.env.ADMIN_PASS ? "set" : "NOT SET (fallback used)";
    checks.NODE_ENV = process.env.NODE_ENV;

    // 2. Test DB connection
    try {
        const count = await prisma.feedItem.count();
        checks.db_connection = "OK";
        checks.feedItem_count = count;
    } catch (err) {
        checks.db_connection = "FAILED";
        checks.db_error = String(err);
    }

    // 3. Test settings fetch
    try {
        const settings = await prisma.settings.findFirst({ where: { id: "singleton" } });
        checks.settings = settings ? "OK (found)" : "OK (null — no singleton row)";
    } catch (err) {
        checks.settings = "FAILED";
        checks.settings_error = String(err);
    }

    return NextResponse.json(checks, { status: 200 });
}
