"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

interface MediaItem {
    url: string;
    thumbUrl?: string;
    width?: number;
    height?: number;
    kind?: string;
    videoUrl?: string;
}

interface ArticleHeroProps {
    title: string;
    media: MediaItem[];
    /** Optional caption line under the hero */
    caption?: string;
}

/* ─── Lightbox: single-image carousel, ESC close, arrows, scroll lock ─── */
function Lightbox({
    media,
    initialIndex,
    onClose,
}: {
    media: MediaItem[];
    initialIndex: number;
    onClose: () => void;
}) {
    const [index, setIndex] = useState(initialIndex);
    const containerRef = useRef<HTMLDivElement>(null);
    const current = media[index];

    const next = useCallback(() => setIndex((i) => (i + 1) % media.length), [media.length]);
    const prev = useCallback(() => setIndex((i) => (i - 1 + media.length) % media.length), [media.length]);

    // Touch swipe support
    const touchStartX = useRef(0);
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);
    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
    }, [next, prev]);

    // ESC close + arrow keys
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, next, prev]);

    // Scroll lock + focus
    useEffect(() => {
        const scrollY = window.scrollY;
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        containerRef.current?.focus();

        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollY);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${index + 1} van ${media.length}`}
            tabIndex={-1}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md outline-none"
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
                <span className="text-sm text-white/60 font-medium" aria-live="polite">
                    {index + 1} / {media.length}
                </span>
                <button
                    onClick={onClose}
                    aria-label="Sluiten"
                    className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-150"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Main image — fills viewport */}
            <div
                className="relative flex items-center justify-center w-full h-full px-12 sm:px-20 py-16"
                onClick={(e) => e.stopPropagation()}
            >
                {current.kind === "video" && current.videoUrl ? (
                    <video
                        src={current.videoUrl}
                        poster={current.url}
                        controls
                        autoPlay
                        className="max-h-full max-w-full rounded-lg"
                    />
                ) : (
                    <Image
                        key={index}
                        src={current.url}
                        alt={`Foto ${index + 1}`}
                        width={current.width || 1200}
                        height={current.height || 800}
                        className="max-h-full max-w-full rounded-lg object-contain animate-in fade-in duration-200"
                    />
                )}
            </div>

            {/* Navigation arrows */}
            {media.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        aria-label="Vorige foto"
                        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-sm transition-all duration-150 hover:bg-white/25 hover:scale-110"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        aria-label="Volgende foto"
                        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-sm transition-all duration-150 hover:bg-white/25 hover:scale-110"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dot indicators at bottom */}
            {media.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {media.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Ga naar foto ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-200 ${i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


export function ArticleHero({ title, media, caption }: ArticleHeroProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const heroImage = media[0];
    const hasMultiple = media.length > 1;

    const openLightbox = useCallback((idx: number) => {
        setLightboxIndex(idx);
    }, []);

    // No images — clean gradient placeholder
    if (!heroImage) {
        return (
            <div className="relative h-[25svh] min-h-[180px] max-h-[300px] w-full bg-gradient-to-br from-primary/10 to-accent/10" />
        );
    }

    return (
        <>
            <div className="group relative w-full overflow-hidden">
                {/* Hero image container — explicit ratio prevents CLS */}
                <div
                    className={`relative w-full ${hasMultiple ? "h-[35svh] min-h-[250px] max-h-[400px]" : "h-[30svh] min-h-[220px] max-h-[360px]"}`}
                    style={{ aspectRatio: hasMultiple ? "16 / 7" : "16 / 9" }}
                >
                    <Image
                        src={heroImage.url}
                        alt={title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[center_60%] transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* #5: Stronger dark gradient for title readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 via-40% to-black/20" />

                    {/* Gallery controls — only for multi-image */}
                    {hasMultiple && (
                        <>
                            {/* Photo count badge */}
                            <button
                                onClick={() => openLightbox(0)}
                                className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-150 hover:bg-black/70 active:scale-95"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {media.length} foto&apos;s
                            </button>

                            {/* #2: Thumbnail strip — HIDDEN on mobile to prevent overlap with title */}
                            {media.length >= 3 && (
                                <div className="absolute bottom-4 left-4 z-10 hidden gap-1.5 md:flex">
                                    {media.slice(1, 4).map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => openLightbox(i + 1)}
                                            className="relative h-12 w-12 overflow-hidden rounded-md border-2 border-white/30 transition-all duration-150 hover:border-white/60 hover:scale-105 active:scale-95"
                                        >
                                            <Image
                                                src={img.url}
                                                alt={`Foto ${i + 2}`}
                                                fill
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                            {i === Math.min(2, media.length - 2) && media.length > 4 && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-[10px] font-bold text-white">
                                                    +{media.length - 4}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Single image: clickable, no collage */}
                    {!hasMultiple && (
                        <button
                            onClick={() => openLightbox(0)}
                            className="absolute inset-0 z-10 cursor-zoom-in"
                            aria-label="Vergroot afbeelding"
                        />
                    )}
                </div>

                {/* #16: Caption */}
                {caption && (
                    <p className="container mx-auto max-w-6xl px-4 sm:px-6 mt-2 text-[11px] text-muted-foreground/60 italic">
                        📷 {caption}
                    </p>
                )}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    media={media}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
}
