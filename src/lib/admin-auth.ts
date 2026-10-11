// src/lib/admin-auth.ts
// Shared admin authentication: validates Basic Auth credentials against
// ADMIN_USER and ADMIN_PASS. There is deliberately no fallback: the repo is
// public, so any default in source would be a known password. When either
// variable is unset or empty, every request is refused.

import { createHash, timingSafeEqual } from "node:crypto";

// Hashing first gives timingSafeEqual two buffers of equal length and keeps
// the comparison from leaking the length of the expected value.
function safeEqual(a: string, b: string): boolean {
    const hashA = createHash("sha256").update(a, "utf8").digest();
    const hashB = createHash("sha256").update(b, "utf8").digest();
    return timingSafeEqual(hashA, hashB);
}

/**
 * Checks the Authorization header for valid admin credentials.
 * Supports both:
 *   - Basic auth:  Authorization: Basic <base64(user:pass)>
 *   - Legacy token: Authorization: Bearer <base64(user:pass)>
 */
export function isAuthorized(request: Request): boolean {
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;
    if (!adminUser?.trim() || !adminPass?.trim()) return false;

    const authHeader = request.headers.get("authorization");
    if (!authHeader) return false;

    // Extract the token from "Basic xxx" or "Bearer xxx"
    const token = authHeader.replace(/^(Basic|Bearer)\s+/i, "");

    try {
        const decoded = Buffer.from(token, "base64").toString("utf-8");
        const [user, ...passParts] = decoded.split(":");
        const pass = passParts.join(":"); // password may contain colons
        // Compare both before combining, so a wrong username takes as long
        // as a wrong password.
        const userOk = safeEqual(user, adminUser);
        const passOk = safeEqual(pass, adminPass);
        return userOk && passOk;
    } catch {
        return false;
    }
}
