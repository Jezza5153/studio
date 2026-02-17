"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@prisma/client";
import { parseMedia } from "@/lib/queries/feed";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";

interface LeadStoryHeroProps {
    story: FeedItem;
}

export function LeadStoryHero({ story }: LeadStoryHeroProps) {
    const reducedMotion = useReducedMotion();
    const media = parseMedia(story.media as string | null);
    const heroImage = media[0];

    return (
        <section className="relative overflow-hidden bg-foreground/5">
            {/* Hero image with Ken Burns */}
            <div className="relative h-[50vh] min-h-[400px] w-full sm:h-[60vh] md:h-[65vh]">
                {heroImage ? (
                    <Image
                        src={heroImage.url}
                        alt={story.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-20">
                    {/* Category pill */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`mb-3 inline-block w-fit rounded-full ${CATEGORY_COLORS[story.category]?.pill || "bg-primary/90"} px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white`}
                    >
                        {CATEGORY_LABELS[story.category] || "Uitgelicht"}
                    </motion.span>

                    {/* Headline with stagger */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="max-w-3xl font-headline text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        {story.title}
                    </motion.h2>

                    {/* Body excerpt */}
                    {story.body && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-3 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
                        >
                            {story.body.length > 200
                                ? story.body.slice(0, 200) + "…"
                                : story.body}
                        </motion.p>
                    )}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-5"
                    >
                        <Link
                            href={`/updates/${story.slug}`}
                            className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20"
                        >
                            Lees verder
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
