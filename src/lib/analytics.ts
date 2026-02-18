/**
 * Lightweight analytics helper — fires custom events.
 * Currently logs to console; swap in GA4 / Plausible / Umami when ready.
 *
 * Usage: trackEvent("reserveer_click", { source: "article_rail" })
 */
export function trackEvent(name: string, data?: Record<string, string | number | boolean>) {
    // GA4 / gtag
    if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", name, data);
        return;
    }

    // Fallback: console in dev
    if (process.env.NODE_ENV === "development") {
        console.log(`[analytics] ${name}`, data ?? "");
    }
}
