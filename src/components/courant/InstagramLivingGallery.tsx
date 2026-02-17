"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@prisma/client";
import { parseMedia } from "@/lib/queries/feed";

interface InstagramLivingGalleryProps {
    posts: FeedItem[];
}

function IGFrame({
    post,
    isLarge = false,
}: {
    post: FeedItem;
    isLarge?: boolean;
}) {
    const [imgError, setImgError] = useState(false);
    const media = parseMedia(post.media as string | null);
    const img = media[0];

    if (!img || imgError) return (
        <div className={`relative overflow-hidden rounded-lg bg-foreground/5 flex items-center justify-center ${isLarge ? "row-span-2 col-span-2 min-h-[280px]" : "aspect-square"}`}>
            <span className="text-muted-foreground/40 text-xs">📷</span>
        </div>
    );

    const isVideo = img.kind === "video" && img.videoUrl;

    return (
        <Link
            href={post.sourceUrl || `/updates/${post.slug}`}
            target={post.sourceUrl ? "_blank" : undefined}
            rel={post.sourceUrl ? "noopener noreferrer" : undefined}
            aria-label={`Instagram post: ${post.title}`}
            className={`group relative overflow-hidden rounded-lg bg-foreground/5 ${isLarge ? "row-span-2 col-span-2" : ""
                }`}
        >
            <div className={`relative w-full ${isLarge ? "h-full min-h-[280px]" : "aspect-square"}`}>
                {isVideo ? (
                    <video
                        src={img.videoUrl}
                        poster={img.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <Image
                        src={img.url}
                        alt={post.title}
                        fill
                        sizes={isLarge ? "400px" : "200px"}
                        onError={() => setImgError(true)}
                        className="object-cover transition-transform duration-700"
                    />
                )}

                {/* Reel indicator */}
                {img.kind === "video" && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        Reel
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {post.body && (
                        <p className="text-xs leading-relaxed text-white line-clamp-3 sm:text-sm">
                            {post.body}
                        </p>
                    )}
                    <span className="mt-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                        Bekijk op Instagram →
                    </span>
                </div>
            </div>
        </Link>
    );
}

export function InstagramLivingGallery({ posts }: InstagramLivingGalleryProps) {
    if (posts.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-border/50 p-6 text-center">
                <span className="text-2xl">📸</span>
                <p className="mt-2 text-sm text-muted-foreground">
                    Volg ons op Instagram
                </p>
                <a
                    href="https://instagram.com/tafelaaramersfoort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                >
                    @tafelaaramersfoort →
                </a>
            </div>
        );
    }

    const [first, ...rest] = posts;

    return (
        <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
                @tafelaaramersfoort
            </h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <IGFrame post={first} isLarge />
                {rest.slice(0, 3).map((post) => (
                    <IGFrame key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
