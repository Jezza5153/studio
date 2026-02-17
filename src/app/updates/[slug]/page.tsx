import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug, parseMedia } from "@/lib/queries/feed";
import { ReserveerButton } from "@/components/reserveer-button";
import { TYPE_LABELS, CATEGORY_LABELS } from "@/lib/constants";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const story = await getStoryBySlug(slug);
    if (!story) return { title: "Niet gevonden" };

    const media = parseMedia(story.media as string | null);
    const ogImage = media[0]?.url || "/pics/homepage.png";

    return {
        title: `${story.title} | De Tafelaar Courant`,
        description: story.body?.slice(0, 160) || "Lees meer op De Tafelaar Courant.",
        openGraph: {
            title: story.title,
            description: story.body?.slice(0, 160) || "",
            images: [{ url: ogImage }],
            type: "article",
            publishedTime: story.publishedAt.toISOString(),
            authors: story.authorName ? [story.authorName] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: story.title,
            description: story.body?.slice(0, 160) || "",
            images: [ogImage],
        },
    };
}

export default async function StoryPage({ params }: PageProps) {
    const { slug } = await params;
    const story = await getStoryBySlug(slug);

    if (!story) notFound();

    const media = parseMedia(story.media as string | null);
    const heroImage = media[0];
    const isReview = story.type === "GOOGLE_REVIEW";
    const rating = story.rating || 5;

    return (
        <article className="pb-12">
            {/* Hero image */}
            {heroImage && (
                <div className="relative h-[40vh] min-h-[300px] w-full sm:h-[50vh]">
                    <Image
                        src={heroImage.url}
                        alt={story.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">
                <div className={heroImage ? "-mt-20 relative z-10" : "pt-8"}>
                    {/* Meta */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                            {TYPE_LABELS[story.type] || "Update"}
                        </span>
                        <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-muted-foreground">
                            {CATEGORY_LABELS[story.category] || story.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="font-headline text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
                        {story.title}
                    </h1>

                    {/* Author + date */}
                    <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                        {story.authorName && (
                            <>
                                <span className="font-medium">{story.authorName}</span>
                                <span>·</span>
                            </>
                        )}
                        <time dateTime={new Date(story.publishedAt).toISOString().slice(0, 10)}>
                            {new Date(story.publishedAt).toLocaleDateString("nl-NL", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </time>
                    </div>

                    {/* Rating (reviews) */}
                    {isReview && story.rating && (
                        <div className="mt-3 flex items-center gap-2">
                            <div
                                className="flex text-amber-500 text-xl"
                                role="img"
                                aria-label={`${rating} van 5 sterren`}
                            >
                                {Array.from({ length: rating }).map((_, i) => (
                                    <span key={i} aria-hidden="true">★</span>
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {rating}/5 sterren
                            </span>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="my-6 h-px bg-border" />

                    {/* Body */}
                    {story.body && (
                        <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed">
                            {story.body.split("\n").map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    )}

                    {/* Source link */}
                    {story.sourceUrl && (
                        <div className="mt-6">
                            <a
                                href={story.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-foreground/10"
                            >
                                Bekijk origineel →
                            </a>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-8 rounded-xl border border-border/50 bg-foreground/[0.02] p-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Benieuwd naar meer? Reserveer een tafel en ervaar het zelf.
                        </p>
                        <div className="mt-3">
                            <ReserveerButton size="lg" label="Reserveer nu" />
                        </div>
                    </div>

                    {/* Back link */}
                    <div className="mt-8">
                        <Link
                            href="/updates"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            ← Terug naar alle updates
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
