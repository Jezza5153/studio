// src/lib/admin-auth.ts
// Shared admin authentication — validates Basic Auth credentials

const ADMIN_USER = process.env.ADMIN_USER || "Tafelaar1991";
const ADMIN_PASS = process.env.ADMIN_PASS || "Kamp8tafelaar!";

/**
 * Checks the Authorization header for valid admin credentials.
 * Supports both:
 *   - Basic auth:  Authorization: Basic <base64(user:pass)>
 *   - Legacy token: Authorization: Bearer <base64(user:pass)>
 */
export function isAuthorized(request: Request): boolean {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) return false;

    // Extract the token from "Basic xxx" or "Bearer xxx"
    const token = authHeader.replace(/^(Basic|Bearer)\s+/i, "");

    try {
        const decoded = Buffer.from(token, "base64").toString("utf-8");
        const [user, ...passParts] = decoded.split(":");
        const pass = passParts.join(":"); // password may contain colons
        return user === ADMIN_USER && pass === ADMIN_PASS;
    } catch {
        return false;
    }
}
