"use client";

import { useState, useCallback, useTransition } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@prisma/client";
import { parseMedia } from "@/lib/queries/feed";
import { TYPE_LABELS, FEED_TYPE_TABS } from "@/lib/constants";



function WallCard({ item, batchIndex }: { item: FeedItem; batchIndex: number }) {
    const reducedMotion = useReducedMotion();
    const [imgError, setImgError] = useState(false);
    const media = parseMedia(item.media as string | null);
    const thumb = media[0];

    const isReview = item.type === "GOOGLE_REVIEW";
    const isIG = item.type === "INSTAGRAM";
    const rating = item.rating || 5;


    return (
        <motion.article
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: batchIndex * 0.05, duration: 0.3 }}
            className="group break-inside-avoid mb-4"
        >
            <Link
                href={`/updates/${item.slug}`}
                className="block overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
                {/* Image */}
                {thumb && !imgError && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                            src={thumb.url}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            onError={() => setImgError(true)}
                            className="object-cover"
                        />
                        {/* Type badge */}
                        <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase text-white backdrop-blur-sm">
                            {isIG ? "📸 Instagram" : isReview ? "⭐ Review" : item.type === "PRESS" ? "📰 Press" : "📝 Update"}
                        </span>
                    </div>
                )}

                {/* Content */}
                <div className="p-4">
                    {/* Review stars */}
                    {isReview && item.rating && (
                        <div
                            className="mb-1 flex text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]"
                            role="img"
                            aria-label={`${rating} van 5 sterren`}
                        >
                            {Array.from({ length: rating }).map((_, i) => (
                                <span key={i} className="text-lg" aria-hidden="true">★</span>
                            ))}
                        </div>
                    )}

                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>

                    {item.body && (
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                            {item.body}
                        </p>
                    )}

                    <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground/70">
                        {item.authorName && <span>— {item.authorName}</span>}
                        <time dateTime={new Date(item.publishedAt).toISOString().slice(0, 10)}>
                            {new Date(item.publishedAt).toLocaleDateString("nl-NL", {
                                day: "numeric",
                                month: "short",
                            })}
                        </time>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

function SkeletonCard() {
    return (
        <div className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border/50 bg-background">
            <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
            <div className="space-y-2 p-4">
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-2 w-full animate-pulse rounded bg-muted" />
                <div className="h-2 w-2/3 animate-pulse rounded bg-muted" />
            </div>
        </div>
    );
}

interface TheLiveWallProps {
    initialItems: FeedItem[];
    initialHasMore: boolean;
}

export function TheLiveWall({ initialItems, initialHasMore }: TheLiveWallProps) {
    const [items, setItems] = useState(initialItems);
    const [activeFilter, setActiveFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Reset when filter changes — keep old items visible until new data arrives
    const switchFilter = useCallback((newFilter: string) => {
        if (newFilter === activeFilter) return;
        setActiveFilter(newFilter);
        setLoading(true);

        const params = new URLSearchParams({ page: "1", pageSize: "12" });
        if (newFilter !== "all") params.set("type", newFilter);

        fetch(`/api/feed?${params}`)
            .then((res) => res.json())
            .then((data) => {
                startTransition(() => {
                    setItems(data.items);
                    setHasMore(data.hasMore);
                    setPage(1);
                });
            })
            .finally(() => setLoading(false));
    }, [activeFilter]);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const nextPage = page + 1;
        const params = new URLSearchParams({ page: String(nextPage), pageSize: "12" });
        if (activeFilter !== "all") params.set("type", activeFilter);

        try {
            const res = await fetch(`/api/feed?${params}`);
            const data = await res.json();
            setItems((prev) => [...prev, ...data.items]);
            setHasMore(data.hasMore);
            setPage(nextPage);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, page, activeFilter]);

    // Calculate batch-relative index for smooth animation delays
    const batchSize = 12;

    return (
        <section className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:px-8">
            {/* Section divider */}
            <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Het Levende Prikbord
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            {/* Filter tabs */}
            <div className="mb-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter op type">
                {FEED_TYPE_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        role="tab"
                        aria-selected={activeFilter === tab.value}
                        onClick={() => switchFilter(tab.value)}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${activeFilter === tab.value
                            ? "bg-foreground text-background shadow-sm"
                            : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Masonry grid */}
            <div className={`columns-1 gap-4 sm:columns-2 lg:columns-3 transition-opacity duration-200 ${isPending ? "opacity-60" : ""}`}>
                <AnimatePresence>
                    {items.map((item, i) => (
                        <WallCard key={item.id} item={item} batchIndex={i % batchSize} />
                    ))}
                </AnimatePresence>

                {/* Skeleton loaders */}
                {loading &&
                    Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={`skel-${i}`} />
                    ))}
            </div>

            {/* Load more */}
            {hasMore && !loading && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={loadMore}
                        className="rounded-full border border-border px-6 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:text-foreground"
                    >
                        Meer laden…
                    </button>
                </div>
            )}

            {!hasMore && items.length > 0 && (
                <p className="mt-8 text-center text-xs text-muted-foreground/60">
                    — Alle berichten geladen —
                </p>
            )}
        </section>
    );
}
