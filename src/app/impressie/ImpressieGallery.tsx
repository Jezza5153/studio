"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewSnippet {
    body: string;
    authorName: string;
    rating: number;
}

/** Truncate text at the last sentence boundary (. ! ? ,) within maxLen */
function smartTruncate(text: string, maxLen: number): string {
    if (text.length <= maxLen) return text;
    // Look for the last sentence-ending punctuation within the limit
    const slice = text.slice(0, maxLen);
    const lastBreak = Math.max(
        slice.lastIndexOf(". "),
        slice.lastIndexOf("! "),
        slice.lastIndexOf("? "),
        slice.lastIndexOf(", "),
        slice.lastIndexOf(".\n"),
    );
    // If we found a good break point, use it (include the punctuation)
    if (lastBreak > maxLen * 0.3) {
        return slice.slice(0, lastBreak + 1).trim();
    }
    // Fallback: break at last space to avoid mid-word cut
    const lastSpace = slice.lastIndexOf(" ");
    if (lastSpace > maxLen * 0.3) {
        return slice.slice(0, lastSpace).trim();
    }
    return slice.trim();
}

interface ImpressieGalleryProps {
    photosJson: string;
    reviews: ReviewSnippet[];
}

function ExpandableReviewCard({ review, index }: { review: ReviewSnippet; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = review.body.length > 120;

    return (
        <motion.div
            className="rounded-xl border border-border/50 bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            <blockquote className="text-sm italic leading-relaxed text-foreground/80">
                &ldquo;{expanded || !isLong
                    ? review.body
                    : review.body.slice(0, 120) + "…"
                }&rdquo;
            </blockquote>
            {isLong && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-1 text-xs font-medium text-primary hover:underline"
                >
                    {expanded ? "Minder" : "Lees meer"}
                </button>
            )}
            <div className="mt-3 flex items-center gap-2">
                <div className="flex text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.3)]">
                    {Array.from({ length: review.rating }).map((_, j) => (
                        <span key={j} className="text-base">
                            ★
                        </span>
                    ))}
                </div>
                <span className="text-xs text-muted-foreground">
                    — {review.authorName}
                </span>
            </div>
        </motion.div>
    );
}

export function ImpressieGallery({ photosJson, reviews }: ImpressieGalleryProps) {
    const photos: string[] = useMemo(() => {
        try {
            return JSON.parse(photosJson);
        } catch {
            return [];
        }
    }, [photosJson]);

    const [selected, setSelected] = useState<number | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Pair each photo with a review (cycle reviews if fewer than photos)
    const pairedItems = useMemo(() => {
        return photos.map((url, i) => ({
            url,
            review: reviews.length > 0 ? reviews[i % reviews.length] : null,
        }));
    }, [photos, reviews]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (selected === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null);
            if (e.key === "ArrowRight")
                setLightboxIndex((i) => (i + 1) % photos.length);
            if (e.key === "ArrowLeft")
                setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [selected, photos.length]);

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        setSelected(index);
    }, []);

    if (photos.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-muted-foreground">
                    Foto&apos;s worden geladen… Kom binnenkort terug.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* ─── Masonry Grid ─── */}
            <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                    {pairedItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className="group break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm transition-shadow hover:shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.5) }}
                            onClick={() => openLightbox(i)}
                        >
                            {/* Photo — zoomed out with padding */}
                            <div className="relative bg-muted/30">
                                <img
                                    src={item.url}
                                    alt={`Sfeerimpressie De Tafelaar ${i + 1}`}
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                    loading="lazy"
                                    style={{ objectPosition: "center" }}
                                />
                            </div>

                            {/* Always-visible quote + author beneath photo */}
                            {item.review && (
                                <div className="px-4 py-3 border-t border-border/30">
                                    <blockquote className="text-sm italic leading-relaxed text-foreground/70 line-clamp-2">
                                        &ldquo;{smartTruncate(item.review.body, 100)}{item.review.body.length > 100 ? "…" : ""}&rdquo;
                                    </blockquote>
                                    <div className="mt-1.5 flex items-center gap-2">
                                        <div className="flex text-amber-500">
                                            {Array.from({ length: item.review.rating }).map(
                                                (_, j) => (
                                                    <span key={j} className="text-xs">
                                                        ★
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            — {item.review.authorName}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── Review Highlights Strip ─── */}
            {reviews.length > 0 && (
                <section className="border-y border-border/50 bg-foreground/[0.02] py-10">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-border" />
                            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                ⭐ Wat gasten zeggen
                            </h2>
                            <div className="h-px flex-1 bg-border" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {reviews.slice(0, 6).map((review, i) => (
                                <ExpandableReviewCard key={i} review={review} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Lightbox ─── */}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                            onClick={() => setSelected(null)}
                            aria-label="Sluiten"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Main image */}
                        <motion.img
                            key={lightboxIndex}
                            src={photos[lightboxIndex]}
                            alt={`Sfeerimpressie ${lightboxIndex + 1}`}
                            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Review quote beneath lightbox image */}
                        {pairedItems[lightboxIndex]?.review && (
                            <motion.div
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 max-w-lg text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <blockquote className="text-sm italic text-white/90">
                                    &ldquo;
                                    {smartTruncate(pairedItems[lightboxIndex].review!.body, 160)}
                                    {pairedItems[lightboxIndex].review!.body.length > 160
                                        ? "…"
                                        : ""}
                                    &rdquo;
                                </blockquote>
                                <div className="mt-2 flex items-center justify-center gap-2">
                                    <div className="flex text-amber-400">
                                        {Array.from({
                                            length: pairedItems[lightboxIndex].review!.rating,
                                        }).map((_, j) => (
                                            <span key={j} className="text-sm">
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-white/60">
                                        — {pairedItems[lightboxIndex].review!.authorName}
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation arrows */}
                        {photos.length > 1 && (
                            <>
                                <button
                                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightboxIndex(
                                            (i) => (i - 1 + photos.length) % photos.length
                                        );
                                    }}
                                    aria-label="Vorige foto"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightboxIndex((i) => (i + 1) % photos.length);
                                    }}
                                    aria-label="Volgende foto"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Photo counter */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                            {lightboxIndex + 1} / {photos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
