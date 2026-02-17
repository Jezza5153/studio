import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { searchFeed, getFeedPage, parseMedia } from "@/lib/queries/feed";
import type { FeedItem } from "@prisma/client";
import { TYPE_LABELS } from "@/lib/constants";

export const dynamic = "force-static"; // SQLite only available at build time on Vercel

export const metadata: Metadata = {
    title: "Updates | De Tafelaar Courant",
    description: "Alle updates, evenementen, reviews en meer van De Tafelaar Amersfoort.",
};

function UpdateCard({ item }: { item: FeedItem }) {
    const media = parseMedia(item.media as string | null);
    const thumb = media[0];
    const isReview = item.type === "GOOGLE_REVIEW";
    const rating = item.rating || 5;

    return (
        <Link
            href={`/updates/${item.slug}`}
            className="group flex gap-4 rounded-xl border border-border/50 bg-background p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
            {thumb && (
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-28">
                    <Image
                        src={thumb.url}
                        alt={item.title}
                        fill
                        sizes="112px"
                        className="object-cover"
                    />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {TYPE_LABELS[item.type] || "Update"}
                    </span>
                    <time
                        dateTime={new Date(item.publishedAt).toISOString().slice(0, 10)}
                        className="text-[10px] text-muted-foreground/70"
                    >
                        {new Date(item.publishedAt).toLocaleDateString("nl-NL", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </time>
                </div>
                <h3 className="mt-1 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                </h3>
                {item.body && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {item.body}
                    </p>
                )}
                {isReview && item.rating && (
                    <div
                        className="mt-1 flex text-amber-500"
                        role="img"
                        aria-label={`${rating} van 5 sterren`}
                    >
                        {Array.from({ length: rating }).map((_, i) => (
                            <span key={i} className="text-xs" aria-hidden="true">★</span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default async function UpdatesPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; type?: string; page?: string }>;
}) {
    const params = await searchParams;
    const query = params.q || "";
    const type = params.type || undefined;
    const page = parseInt(params.page || "1", 10);

    const data = query
        ? await searchFeed(query, page, 12)
        : await getFeedPage(type, page, 12);

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:px-8">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
                    Het Archief
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Alle updates, evenementen, reviews en verhalen van De Tafelaar.
                </p>
            </div>

            {/* Search + Filters */}
            <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <form className="w-full sm:w-auto" action="/updates" method="get">
                    <div className="flex overflow-hidden rounded-lg border border-border focus-within:ring-2 focus-within:ring-primary/50">
                        <input
                            type="text"
                            name="q"
                            defaultValue={query}
                            placeholder="Zoeken..."
                            className="w-full bg-background px-4 py-2 text-sm outline-none sm:w-64"
                        />
                        <button
                            type="submit"
                            className="bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                        >
                            Zoek
                        </button>
                    </div>
                </form>

                <div className="flex flex-wrap gap-2">
                    {[
                        { label: "Alles", value: "" },
                        { label: "Updates", value: "MANUAL" },
                        { label: "Instagram", value: "INSTAGRAM" },
                        { label: "Reviews", value: "GOOGLE_REVIEW" },
                        { label: "Press", value: "PRESS" },
                    ].map((tab) => (
                        <Link
                            key={tab.value}
                            href={`/updates${tab.value ? `?type=${tab.value}` : ""}`}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${(type || "") === tab.value
                                ? "bg-foreground text-background"
                                : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
                                }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className="space-y-3">
                {data.items.map((item) => (
                    <UpdateCard key={item.id} item={item} />
                ))}
                {data.items.length === 0 && (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                        Geen resultaten gevonden.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-4">
                {page > 1 && (
                    <Link
                        href={`/updates?page=${page - 1}${type ? `&type=${type}` : ""}${query ? `&q=${query}` : ""}`}
                        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        ← Vorige
                    </Link>
                )}
                {data.hasMore && (
                    <Link
                        href={`/updates?page=${page + 1}${type ? `&type=${type}` : ""}${query ? `&q=${query}` : ""}`}
                        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Volgende →
                    </Link>
                )}
            </div>
        </div>
    );
}
