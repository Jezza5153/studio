"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@prisma/client";
import { parseMedia } from "@/lib/queries/feed";
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_PILLS } from "@/lib/constants";

interface StoryColumnProps {
    stories: FeedItem[];
}



function StoryCard({ item, index }: { item: FeedItem; index: number }) {
    const reducedMotion = useReducedMotion();
    const media = parseMedia(item.media as string | null);
    const thumb = media[0];

    return (
        <motion.article
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group"
        >
            <Link
                href={`/updates/${item.slug}`}
                className="flex gap-4 rounded-lg p-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground/5 hover:shadow-md"
            >
                {/* Thumbnail */}
                {thumb && (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-24">
                        <Image
                            src={thumb.url}
                            alt={item.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest ${CATEGORY_COLORS[item.category]?.text || "text-primary"}`}>
                        {CATEGORY_LABELS[item.category] || "Algemeen"}
                    </span>
                    <h3 className="mt-0.5 text-sm font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    {item.body && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {item.body}
                        </p>
                    )}
                    <time
                        dateTime={new Date(item.publishedAt).toISOString().slice(0, 10)}
                        className="mt-1 block text-[10px] text-muted-foreground/70"
                    >
                        {new Date(item.publishedAt).toLocaleDateString("nl-NL", {
                            day: "numeric",
                            month: "short",
                        })}
                    </time>
                </div>
            </Link>
        </motion.article>
    );
}

export function StoryColumn({ stories }: StoryColumnProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    const filtered = activeCategory === "all"
        ? stories
        : stories.filter((s) => s.category === activeCategory);

    return (
        <div>
            {/* Filter pills */}
            <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Categoriefilter">
                {CATEGORY_PILLS.map((pill) => (
                    <button
                        key={pill.value}
                        role="tab"
                        aria-selected={activeCategory === pill.value}
                        onClick={() => setActiveCategory(pill.value)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${activeCategory === pill.value
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
                            }`}
                    >
                        {pill.label}
                    </button>
                ))}
            </div>

            {/* Story list */}
            <div className="divide-y divide-border/50">
                {filtered.slice(0, 6).map((item, i) => (
                    <StoryCard key={item.id} item={item} index={i} />
                ))}
                {filtered.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        Geen berichten in deze categorie.
                    </p>
                )}
            </div>
        </div>
    );
}
