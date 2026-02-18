"use client";

import Link from "next/link";

interface ArticleActionsProps {
    nextStory?: { slug: string; title: string } | null;
}

export function ArticleActions({ nextStory }: ArticleActionsProps) {
    return (
        <div className="mt-12 pt-8 border-t border-border/40">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Volgende stap
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
                {/* Reserveer */}
                <button
                    onClick={() => window.eventsOpen?.()}
                    className="group rounded-xl border border-primary/30 bg-primary/5 p-4 text-left transition-all duration-150 hover:bg-primary/10"
                >
                    <span className="text-lg">🍽️</span>
                    <span className="mt-1 block text-sm font-semibold text-primary">Reserveer een tafel</span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">Proef het zelf</span>
                </button>

                {/* Bekijk menu */}
                <Link
                    href="/menu"
                    className="group rounded-xl border border-border/50 bg-foreground/[0.02] p-4 text-left transition-all duration-150 hover:bg-foreground/5"
                >
                    <span className="text-lg">📋</span>
                    <span className="mt-1 block text-sm font-semibold text-foreground">Bekijk menu</span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">Seizoensgerechten</span>
                </Link>

                {/* Next story / All updates fallback */}
                {nextStory ? (
                    <Link
                        href={`/updates/${nextStory.slug}`}
                        className="group rounded-xl border border-border/50 bg-foreground/[0.02] p-4 text-left transition-all duration-150 hover:bg-foreground/5"
                    >
                        <span className="text-lg">📰</span>
                        <span className="mt-1 block text-sm font-semibold text-foreground line-clamp-1">Volgend verhaal</span>
                        <span className="mt-0.5 block text-[11px] text-muted-foreground line-clamp-1">{nextStory.title}</span>
                    </Link>
                ) : (
                    <Link
                        href="/updates"
                        className="group rounded-xl border border-border/50 bg-foreground/[0.02] p-4 text-left transition-all duration-150 hover:bg-foreground/5"
                    >
                        <span className="text-lg">📰</span>
                        <span className="mt-1 block text-sm font-semibold text-foreground">Alle updates</span>
                        <span className="mt-0.5 block text-[11px] text-muted-foreground">Terug naar de Courant</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
