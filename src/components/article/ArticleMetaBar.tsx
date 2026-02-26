"use client";

import { useState, useEffect } from "react";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";

interface ArticleMetaBarProps {
    category: string;
    publishedAt: string; // ISO string
    readTime: string;
    slug: string;
    authorName?: string;
}

export function ArticleMetaBar({ category, publishedAt, readTime, slug, authorName }: ArticleMetaBarProps) {
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState("");
    const colors = CATEGORY_COLORS[category];
    const label = CATEGORY_LABELS[category] || category;
    const date = new Date(publishedAt);

    // Defer origin to after hydration to avoid SSR/client mismatch
    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    const dateStr = date.toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const shareUrl = `${origin}/updates/${slug}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
        }
    };

    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const mailUrl = `mailto:?subject=${encodeURIComponent("Lees dit artikel op De Tafelaar")}&body=${encodeURIComponent(shareUrl)}`;

    // Author initials for avatar
    const initials = authorName
        ? authorName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
        : null;

    return (
        <div className="space-y-3">
            {/* #9: Author byline */}
            {authorName && (
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {initials}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">Door {authorName}</p>
                        <p className="text-[11px] text-muted-foreground">De Tafelaar Courant</p>
                    </div>
                </div>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {/* Category badge */}
                <span className={`rounded-full px-2.5 py-0.5 font-semibold uppercase tracking-wider ${colors?.bg || "bg-primary/10"} ${colors?.text || "text-primary"}`}>
                    {label}
                </span>

                <span className="text-muted-foreground/40">·</span>

                {/* Date */}
                <time dateTime={date.toISOString().slice(0, 10)} className="font-medium">
                    {dateStr}
                </time>

                <span className="text-muted-foreground/40">·</span>

                {/* #15: Read time with clock icon */}
                <span className="inline-flex items-center gap-1 font-medium">
                    <svg width="14" height="14" className="text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" d="M12 6v6l4 2" />
                    </svg>
                    {readTime}
                </span>

                {/* #13: Share actions — expanded with Facebook, Email, Copy */}
                <span className="ml-auto flex items-center gap-1">
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all hover:bg-foreground/5 active:scale-95"
                        title="Kopieer link"
                    >
                        {copied ? (
                            <>
                                <svg width="14" height="14" className="text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Gekopieerd!
                            </>
                        ) : (
                            <>
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.915-3.172a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.656" />
                                </svg>
                                Link
                            </>
                        )}
                    </button>

                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all hover:bg-foreground/5"
                        title="Deel via WhatsApp"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        </svg>
                    </a>

                    <a
                        href={fbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all hover:bg-foreground/5"
                        title="Deel op Facebook"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>

                    <a
                        href={mailUrl}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all hover:bg-foreground/5"
                        title="Deel via e-mail"
                    >
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </a>
                </span>
            </div>
        </div>
    );
}
