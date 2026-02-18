"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ArticleSection } from "@/lib/article-utils";

interface RelatedStory {
    slug: string;
    title: string;
    media: string | null;
    publishedAt: string;
}

interface ArticleRailProps {
    sections: ArticleSection[];
    relatedStories: RelatedStory[];
    prevStory?: { slug: string; title: string } | null;
    nextStory?: { slug: string; title: string } | null;
}

function getThumb(media: string | null): string | null {
    if (!media) return null;
    try {
        const parsed = JSON.parse(media);
        return parsed[0]?.url || null;
    } catch {
        return null;
    }
}

export function ArticleRail({ sections, relatedStories, prevStory, nextStory }: ArticleRailProps) {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const hasTOC = sections.filter(s => s.title).length >= 3;
    const tocSections = sections.filter(s => s.title);

    // IntersectionObserver for TOC highlighting + back-to-top
    useEffect(() => {
        if (typeof window === "undefined") return;

        const sectionEls = sections
            .map(s => document.getElementById(s.id))
            .filter(Boolean) as HTMLElement[];

        if (sectionEls.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                }
            },
            { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" }
        );

        sectionEls.forEach(el => observer.observe(el));

        // Back-to-top: show when scrolled past intro
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 600);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sections]);

    return (
        <div className="space-y-6">
            {/* Reserveer CTA */}
            <button
                onClick={() => window.eventsOpen?.()}
                className="w-full rounded-xl border border-primary/30 bg-primary/5 py-3 text-center text-sm font-semibold text-primary transition-all hover:bg-primary/10 active:scale-[0.98]"
            >
                Reserveer
            </button>

            {/* Table of Contents */}
            {hasTOC && (
                <div className="rounded-xl border border-border/50 bg-foreground/[0.02] p-4">
                    <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        Inhoud
                    </h4>
                    <nav className="space-y-1.5">
                        {tocSections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`block rounded-md px-2 py-1 text-xs font-medium transition-all ${activeSection === section.id
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                </div>
            )}

            {/* Back to top */}
            {showBackToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="w-full rounded-lg border border-border/40 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
                >
                    ↑ Terug naar boven
                </button>
            )}

            {/* Related stories */}
            {relatedStories.length > 0 && (
                <div>
                    <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        Gerelateerd
                    </h4>
                    <div className="space-y-2">
                        {relatedStories.map((story) => {
                            const thumb = getThumb(story.media);
                            return (
                                <Link
                                    key={story.slug}
                                    href={`/updates/${story.slug}`}
                                    className="group flex gap-3 rounded-lg p-2 transition-all hover:bg-foreground/5"
                                >
                                    {thumb && (
                                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                            <Image
                                                src={thumb}
                                                alt={story.title}
                                                fill
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <span className="text-xs font-medium leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                        {story.title}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Prev / Next navigation */}
            {(prevStory || nextStory) && (
                <div className="space-y-2 border-t border-border/40 pt-4">
                    {prevStory && (
                        <Link
                            href={`/updates/${prevStory.slug}`}
                            className="block rounded-lg p-2 text-xs text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
                        >
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">← Vorig</span>
                            <span className="mt-0.5 block font-medium line-clamp-1">{prevStory.title}</span>
                        </Link>
                    )}
                    {nextStory && (
                        <Link
                            href={`/updates/${nextStory.slug}`}
                            className="block rounded-lg p-2 text-xs text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
                        >
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">Volgend →</span>
                            <span className="mt-0.5 block font-medium line-clamp-1">{nextStory.title}</span>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
