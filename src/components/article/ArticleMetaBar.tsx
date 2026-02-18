"use client";

import { useState } from "react";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";

interface ArticleMetaBarProps {
    category: string;
    publishedAt: string; // ISO string
    readTime: string;
    slug: string;
}

export function ArticleMetaBar({ category, publishedAt, readTime, slug }: ArticleMetaBarProps) {
    const [copied, setCopied] = useState(false);
    const colors = CATEGORY_COLORS[category];
    const label = CATEGORY_LABELS[category] || category;
    const date = new Date(publishedAt);

    const dateStr = date.toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const shareUrl = typeof window !== "undefined"
        ? `${window.location.origin}/updates/${slug}`
        : `/updates/${slug}`;

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

    return (
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

            {/* Read time */}
            <span className="font-medium">{readTime}</span>

            {/* Share actions */}
            <span className="ml-auto flex items-center gap-2">
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all hover:bg-foreground/5 active:scale-95"
                    title="Kopieer link"
                >
                    {copied ? (
                        <>
                            <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Gekopieerd
                        </>
                    ) : (
                        <>
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                    WhatsApp
                </a>
            </span>
        </div>
    );
}
