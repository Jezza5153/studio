"use client";

import { useState, useCallback } from "react";
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

/** Lightbox modal — loaded inline (component is tiny) */
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
    const current = media[index];

    const next = () => setIndex((i) => (i + 1) % media.length);
    const prev = () => setIndex((i) => (i - 1 + media.length) % media.length);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-h-[90vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-medium transition-colors duration-150"
                >
                    Sluiten ✕
                </button>

                {current.kind === "video" && current.videoUrl ? (
                    <video
                        src={current.videoUrl}
                        poster={current.url}
                        controls
                        autoPlay
                        className="max-h-[85vh] max-w-[85vw] rounded-lg"
                    />
                ) : (
                    <Image
                        src={current.url}
                        alt={`Foto ${index + 1}`}
                        width={current.width || 1200}
                        height={current.height || 800}
                        className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
                    />
                )}

                {media.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all duration-150 hover:bg-white/20"
                        >
                            ←
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all duration-150 hover:bg-white/20"
                        >
                            →
                        </button>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60">
                            {index + 1} / {media.length}
                        </div>
                    </>
                )}
            </div>
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
                {/* Single image vs multi: different aspect ratios */}
                <div className={`relative w-full ${hasMultiple ? "h-[35svh] min-h-[250px] max-h-[400px]" : "h-[30svh] min-h-[220px] max-h-[360px]"}`}>
                    <Image
                        src={heroImage.url}
                        alt={title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[center_60%] transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-black/10" />

                    {/* Gallery controls — only for multi-image */}
                    {hasMultiple && (
                        <>
                            {/* Photo count badge + button — grouped bottom-right */}
                            <button
                                onClick={() => openLightbox(0)}
                                className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-150 hover:bg-black/70 active:scale-95"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {media.length} foto&apos;s
                            </button>

                            {/* Thumbnail strip — left side, only when 3+ images */}
                            {media.length >= 3 && (
                                <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
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
                                            {/* Photo count badge on last thumbnail */}
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

                {/* Caption */}
                {caption && (
                    <p className="container mx-auto max-w-6xl px-4 sm:px-6 mt-2 text-[11px] text-muted-foreground/60 italic">
                        {caption}
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
