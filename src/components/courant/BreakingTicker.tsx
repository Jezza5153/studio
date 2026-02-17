"use client";

import { useEffect, useRef, useState } from "react";
import type { FeedItem, Settings } from "@prisma/client";
import { TONIGHT_STATUS_CONFIG } from "@/lib/constants";

interface BreakingTickerProps {
    pinnedItems: FeedItem[];
    settings: Settings | null;
    reviewQuote?: FeedItem | null;
}

export function BreakingTicker({ pinnedItems, settings, reviewQuote }: BreakingTickerProps) {
    const [isPaused, setIsPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mql.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    // Build ticker items
    const tickerItems: string[] = [];

    if (settings) {
        const cfg = TONIGHT_STATUS_CONFIG[settings.tonightStatus];
        if (cfg) tickerItems.push(cfg.tickerLabel);
        if (settings.tonightNote) tickerItems.push(settings.tonightNote);
    }

    pinnedItems.forEach((item) => {
        tickerItems.push(`📌 ${item.title}`);
    });

    if (reviewQuote?.body) {
        const snippet = reviewQuote.body.length > 60
            ? reviewQuote.body.slice(0, 60) + "…"
            : reviewQuote.body;
        tickerItems.push(`⭐ "${snippet}" — ${reviewQuote.authorName || "Gast"}`);
    }

    if (tickerItems.length === 0) return null;

    const tickerContent = tickerItems.join("   ●   ");

    // Static mode for reduced motion
    if (reducedMotion) {
        return (
            <div
                className="border-y border-foreground/10 bg-foreground/5 px-4 py-2"
                role="region"
                aria-label="Laatste nieuwtjes"
            >
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    {tickerItems.map((item, i) => (
                        <span key={i}>{item}</span>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative overflow-hidden border-y border-foreground/10 bg-foreground/5"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
            role="marquee"
            aria-label="Laatste nieuwtjes"
            aria-live="off"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="flex whitespace-nowrap py-2">
                <div
                    ref={scrollRef}
                    className="flex animate-ticker-scroll gap-0"
                    style={{ animationPlayState: isPaused ? "paused" : "running" }}
                >
                    {/* Duplicate for seamless loop */}
                    {[0, 1, 2].map((copy) => (
                        <span
                            key={copy}
                            className="inline-block px-8 text-sm font-medium text-muted-foreground"
                        >
                            {tickerContent}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
