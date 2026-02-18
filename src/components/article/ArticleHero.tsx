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
}

/** Lightbox modal */
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
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                    Sluiten ✕
                </button>

                {/* Image */}
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

                {/* Navigation */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                            ←
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
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

export function ArticleHero({ title, media }: ArticleHeroProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const hasGallery = media.length > 1;
    const heroImage = media[0];

    const openLightbox = useCallback((idx: number) => {
        // Respect reduced motion — skip animation but still open
        setLightboxIndex(idx);
    }, []);

    if (!heroImage) {
        return (
            <div className="relative h-[35svh] min-h-[250px] max-h-[400px] w-full bg-gradient-to-br from-primary/10 to-accent/10" />
        );
    }

    return (
        <>
            <div className="group relative h-[35svh] min-h-[250px] max-h-[400px] w-full overflow-hidden">
                {/* Main hero image */}
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

                {/* Gallery button */}
                {hasGallery && (
                    <button
                        onClick={() => openLightbox(0)}
                        className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Bekijk foto&apos;s ({media.length})
                    </button>
                )}

                {/* Collage grid for multi-image (show 2-3 thumbnails) */}
                {media.length >= 3 && (
                    <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
                        {media.slice(1, 4).map((img, i) => (
                            <button
                                key={i}
                                onClick={() => openLightbox(i + 1)}
                                className="relative h-12 w-12 overflow-hidden rounded-md border-2 border-white/30 transition-all hover:border-white/60 hover:scale-105 active:scale-95"
                            >
                                <Image
                                    src={img.url}
                                    alt={`Foto ${i + 2}`}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
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
