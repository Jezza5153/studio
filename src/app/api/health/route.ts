import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Health check. Public callers only learn whether the site can reach the
// database. Detailed diagnostics need the same Bearer CRON_SECRET as the cron
// routes. Never echo any part of a connection string or secret, authorized
// or not.
const NO_STORE = { "Cache-Control": "no-store" };

function isAuthorized(request: Request) {
    const secret = process.env.CRON_SECRET?.trim();
    // Without this guard an unset secret would accept "Bearer undefined".
    if (!secret) return false;
    return request.headers.get("authorization") === `Bearer ${secret}`;
}

// Error class and Prisma error code only: raw Prisma messages can include the
// database host and other connection details. The full error goes to the logs.
function describeError(err: unknown) {
    if (!(err instanceof Error)) return "unknown error";
    const { code, errorCode } = err as { code?: unknown; errorCode?: unknown };
    const prismaCode = typeof code === "string" ? code : typeof errorCode === "string" ? errorCode : null;
    return prismaCode ? `${err.name} (${prismaCode})` : err.name;
}

export async function GET(request: Request) {
    if (!isAuthorized(request)) {
        let dbOk = true;
        try {
            await prisma.$queryRaw`SELECT 1`;
        } catch (err) {
            dbOk = false;
            console.error("Health check DB probe failed:", err);
        }
        return NextResponse.json(
            { ok: dbOk, db: dbOk ? "OK" : "FAILED" },
            { status: dbOk ? 200 : 503, headers: NO_STORE },
        );
    }

    const checks: Record<string, unknown> = {};

    // 1. Env vars: presence only
    checks.DATABASE_URL = process.env.DATABASE_URL ? "set" : "NOT SET";
    checks.DATABASE_URL_UNPOOLED = process.env.DATABASE_URL_UNPOOLED ? "set" : "NOT SET";
    checks.ADMIN_USER = process.env.ADMIN_USER ? "set" : "NOT SET (fallback used)";
    checks.ADMIN_PASS = process.env.ADMIN_PASS ? "set" : "NOT SET (fallback used)";
    checks.NODE_ENV = process.env.NODE_ENV;

    // 2. Test DB connection
    let dbOk = false;
    try {
        const count = await prisma.feedItem.count();
        dbOk = true;
        checks.db_connection = "OK";
        checks.feedItem_count = count;
    } catch (err) {
        console.error("Health check DB query failed:", err);
        checks.db_connection = "FAILED";
        checks.db_error = describeError(err);
    }

    // 3. Test settings fetch
    try {
        const settings = await prisma.settings.findFirst({ where: { id: "singleton" } });
        checks.settings = settings ? "OK (found)" : "OK (null, no singleton row)";
        // updatedAt moves on any Settings write (tonight status included), so
        // it says when the owners last saved, not specifically the score.
        if (settings) {
            checks.googleRating = settings.googleRating;
            checks.googleReviewCount = settings.googleReviewCount;
            checks.settingsUpdatedAt = settings.updatedAt.toISOString();
        }
    } catch (err) {
        console.error("Health check settings query failed:", err);
        checks.settings = "FAILED";
        checks.settings_error = describeError(err);
    }

    return NextResponse.json(
        { ok: dbOk, db: dbOk ? "OK" : "FAILED", ...checks },
        { status: dbOk ? 200 : 503, headers: NO_STORE },
    );
}
