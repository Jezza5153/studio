"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GuestHighlightsProps {
    photos: string[];
    googleRating?: number;
    reviewCount?: number;
}

export function GuestHighlights({
    photos,
    googleRating = 0,
    reviewCount = 0,
}: GuestHighlightsProps) {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const next = useCallback(() => {
        setCurrent((c) => (c + 1) % photos.length);
    }, [photos.length]);

    const prev = useCallback(() => {
        setCurrent((c) => (c - 1 + photos.length) % photos.length);
    }, [photos.length]);

    // Auto-advance every 5s
    useEffect(() => {
        if (photos.length <= 1 || isPaused) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [photos.length, isPaused, next]);

    if (photos.length === 0) return null;

    return (
        <section className="relative mx-auto max-w-7xl px-4 py-10">
            {/* Section header */}
            <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    ✨ Gastenhighlights
                </h2>
                <div className="h-px flex-1 bg-border" />
            </div>

            {/* Photo slideshow */}
            <div
                className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Main image */}
                <div className="relative aspect-[16/9] bg-muted">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={current}
                            src={photos[current]}
                            alt={`Gastenfoto ${current + 1}`}
                            className="absolute inset-0 h-full w-full object-cover"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6 }}
                        />
                    </AnimatePresence>

                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Bottom-left: rating badge */}
                    {googleRating > 0 && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-sm font-bold text-gray-900">
                                {googleRating.toFixed(1)}
                            </span>
                            <div className="flex text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className="text-xs"
                                        style={{ opacity: i < Math.round(googleRating) ? 1 : 0.25 }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {reviewCount > 0 && (
                                <span className="text-xs text-gray-500">
                                    ({reviewCount})
                                </span>
                            )}
                        </div>
                    )}

                    {/* Bottom-right: counter */}
                    <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {current + 1} / {photos.length}
                    </div>

                    {/* Nav arrows */}
                    {photos.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
                                aria-label="Vorige foto"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
                                aria-label="Volgende foto"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnail strip */}
                {photos.length > 1 && (
                    <div className="flex gap-1 overflow-x-auto bg-foreground/[0.03] p-2">
                        {photos.map((url, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md transition-all ${i === current
                                        ? "ring-2 ring-primary ring-offset-1"
                                        : "opacity-50 hover:opacity-80"
                                    }`}
                            >
                                <img
                                    src={url}
                                    alt={`Thumbnail ${i + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* "See more on Google" link */}
            <div className="mt-4 flex justify-center">
                <a
                    href="https://maps.google.com/?q=De+Tafelaar+Kamp+8+Amersfoort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60 transition-colors hover:text-primary"
                >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                    Meer foto&apos;s op Google
                </a>
            </div>
        </section>
    );
}
