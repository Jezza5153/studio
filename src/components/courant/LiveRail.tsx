"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { FeedItem, Settings } from "@prisma/client";
import { TONIGHT_STATUS_CONFIG } from "@/lib/constants";

// ─── TonightStatusCard ─────────────────────────────────────────────
function TonightStatusCard({ settings }: { settings: Settings | null }) {
    if (!settings) return null;

    const c = TONIGHT_STATUS_CONFIG[settings.tonightStatus] || TONIGHT_STATUS_CONFIG.OPEN;

    return (
        <button
            onClick={() => window.eventsOpen?.()}
            className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] ${c.bg} ${c.glow}`}
        >
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Vanavond
            </div>
            <div className="mt-1 flex items-center gap-2">
                <span className="text-lg">{c.emoji}</span>
                <span className="text-sm font-bold text-foreground">{c.label}</span>
            </div>
            {settings.tonightNote && (
                <p className="mt-2 text-xs text-muted-foreground">{settings.tonightNote}</p>
            )}
            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-primary/30 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10">
                Reserveer
            </div>
        </button>
    );
}

// ─── ReviewQuoteRotator ─────────────────────────────────────────────
function ReviewQuoteRotator({
    reviews,
    settings,
}: {
    reviews: FeedItem[];
    settings: Settings | null;
}) {
    const [index, setIndex] = useState(0);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reviews.length <= 1) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [reviews.length]);

    if (reviews.length === 0) return null;

    const currentRating = reviews[index].rating || 5;
    const googleRating = settings?.googleRating || 0;
    const reviewCount = settings?.googleReviewCount || 0;

    return (
        <div className="rounded-xl border border-border/50 bg-foreground/[0.03] p-4">
            {/* ── Google Overall Rating Card ── */}
            {googleRating > 0 && (
                <div className="mb-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] px-3 py-2.5">
                    <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5">
                        <svg className="h-3 w-3 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Google beoordeling
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-foreground">{googleRating.toFixed(1)}</span>
                        <div className="flex flex-col">
                            <div className="flex text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className="text-xs"
                                        style={{ opacity: i < Math.round(googleRating) ? 1 : 0.2 }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {reviewCount > 0 && (
                                <span className="text-[10px] text-muted-foreground/60">
                                    {reviewCount} reviews
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Section label for individual quotes ── */}
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                Wat gasten zeggen
            </div>


            {/* ── Rotating review quotes ── */}
            <div className="relative min-h-[80px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reducedMotion ? {} : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Clickable review — opens on Google Maps */}
                        <a
                            href={reviews[index].sourceUrl || "https://maps.google.com/?q=De+Tafelaar+Kamp+8+Amersfoort"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block cursor-pointer transition-opacity hover:opacity-80"
                        >
                            <blockquote className="text-sm italic leading-relaxed text-foreground/80">
                                &ldquo;{reviews[index].body?.slice(0, 120)}
                                {(reviews[index].body?.length || 0) > 120 ? "…" : ""}
                                &rdquo;
                            </blockquote>
                            <div className="mt-2 flex items-center gap-2">
                                <div
                                    className="flex text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]"
                                    role="img"
                                    aria-label={`${currentRating} van 5 sterren`}
                                >
                                    {Array.from({ length: currentRating }).map((_, i) => (
                                        <span key={i} className="text-lg" aria-hidden="true">★</span>
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    — {reviews[index].authorName || "Gast"}
                                </span>
                            </div>
                        </a>

                        {/* ── Owner reply (per-review, from Google) ── */}
                        {(() => {
                            try {
                                const m = JSON.parse(reviews[index].media || "{}");
                                if (!m.ownerReply) return null;
                                return (
                                    <div className="mt-3 rounded-lg border border-primary/10 bg-primary/5 p-2.5">
                                        <div className="flex items-start gap-2">
                                            <span className="mt-0.5 text-xs">💬</span>
                                            <div>
                                                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">
                                                    Reactie van de eigenaar
                                                </span>
                                                <p className="mt-0.5 text-xs leading-relaxed text-foreground/70">
                                                    {m.ownerReply.length > 100
                                                        ? m.ownerReply.slice(0, 100) + "…"
                                                        : m.ownerReply}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } catch { return null; }
                        })()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Dots indicator ── */}
            {reviews.length > 1 && (
                <div className="mt-3 flex justify-center gap-1">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${i === index ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
                                }`}
                            aria-label={`Review ${i + 1} van ${reviews.length}`}
                        />
                    ))}
                </div>
            )}

            {/* ── Google Maps link ── */}
            <a
                href="https://maps.google.com/?q=De+Tafelaar+Kamp+8+Amersfoort"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-medium text-muted-foreground/60 transition-colors hover:text-primary"
            >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
                Bekijk op Google
            </a>
        </div>
    );
}

// ─── PressClippingsStack ─────────────────────────────────────────────
function PressClippingsStack({ items }: { items: FeedItem[] }) {
    if (items.length === 0) return null;

    const rotations = [-2, 1.5, -1, 2];

    return (
        <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                📰 In de pers
            </div>
            <div className="space-y-2 overflow-visible">
                {items.slice(0, 3).map((item, i) => (
                    <a
                        key={item.id}
                        href={item.sourceUrl || `/updates/${item.slug}`}
                        className="group block rounded-lg border border-border/50 bg-background p-3 transition-all duration-300 hover:rotate-0 hover:shadow-md"
                        style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
                    >
                        <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                        </h4>
                        <p className="mt-1 text-[10px] text-muted-foreground line-clamp-1">
                            {item.body}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}

// ─── LiveRail (combined) ─────────────────────────────────────────────
interface LiveRailProps {
    settings: Settings | null;
    reviews: FeedItem[];
    pressItems: FeedItem[];
}

export function LiveRail({ settings, reviews, pressItems }: LiveRailProps) {
    return (
        <div className="space-y-4">
            <TonightStatusCard settings={settings} />
            <ReviewQuoteRotator reviews={reviews} settings={settings} />
            <PressClippingsStack items={pressItems} />
        </div>
    );
}
