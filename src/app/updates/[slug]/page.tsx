import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug, getRelatedStories, getAdjacentStories, getLatestStories, parseMedia } from "@/lib/queries/feed";
import { parseArticleSections } from "@/lib/article-utils";
import { CATEGORY_LABELS } from "@/lib/constants";
import { ArticleHero } from "@/components/article/ArticleHero";
import { ArticleMetaBar } from "@/components/article/ArticleMetaBar";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleRail } from "@/components/article/ArticleRail";
import { ArticleActions } from "@/components/article/ArticleActions";
import { ReadingProgress } from "@/components/article/ReadingProgress";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const story = await getStoryBySlug(slug);
    if (!story) return { title: "Niet gevonden" };

    const media = parseMedia(story.media as string | null);
    const ogImage = media[0]?.url || "/pics/homepage.png";
    const description = story.body?.slice(0, 160).replace(/\n/g, " ").trim() || "Lees meer op De Tafelaar Courant.";
    const canonicalUrl = `https://detafelaar.nl/updates/${slug}`;

    return {
        title: `${story.title} | De Tafelaar Courant`,
        description,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: story.title,
            description,
            images: [{ url: ogImage }],
            type: "article",
            publishedTime: story.publishedAt.toISOString(),
            authors: story.authorName ? [story.authorName] : ["De Tafelaar"],
            url: canonicalUrl,
        },
        twitter: {
            card: "summary_large_image",
            title: story.title,
            description,
            images: [ogImage],
        },
    };
}

export default async function StoryPage({ params }: PageProps) {
    const { slug } = await params;
    const story = await getStoryBySlug(slug);

    if (!story) notFound();

    const media = parseMedia(story.media as string | null);
    const article = parseArticleSections(story.body);
    const isReview = story.type === "GOOGLE_REVIEW";
    const rating = story.rating || 5;
    const categoryLabel = CATEGORY_LABELS[story.category] || story.category;

    // Fetch related + adjacent + fallback latest in parallel
    const [relatedStories, { prev: prevStory, next: nextStory }, latestStories] = await Promise.all([
        getRelatedStories(story.category, story.slug, 3),
        getAdjacentStories(story.publishedAt, story.slug),
        getLatestStories(undefined, 3),
    ]);

    // Serialize for client components
    const serializeStories = (items: typeof relatedStories) =>
        items.map(s => ({
            slug: s.slug,
            title: s.title,
            media: (s as { media?: string | null }).media as string | null ?? null,
            publishedAt: s.publishedAt.toISOString(),
        }));

    const relatedForClient = serializeStories(relatedStories);
    const latestForClient = serializeStories(
        latestStories.filter(s => s.slug !== story.slug).slice(0, 3)
    );

    // Hero caption
    const heroCaption = media.length > 0 ? `${categoryLabel} · ${story.publishedAt.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}` : undefined;

    // JSON-LD: Article + BreadcrumbList
    const ogImage = media[0]?.url || "/pics/homepage.png";
    const canonicalUrl = `https://detafelaar.nl/updates/${slug}`;
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "NewsArticle",
                headline: story.title,
                description: story.body?.slice(0, 160).replace(/\n/g, " ").trim() || "",
                image: ogImage,
                datePublished: story.publishedAt.toISOString(),
                author: {
                    "@type": "Organization",
                    name: story.authorName || "De Tafelaar",
                },
                publisher: {
                    "@type": "Organization",
                    name: "De Tafelaar",
                    url: "https://detafelaar.nl",
                },
                mainEntityOfPage: canonicalUrl,
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://detafelaar.nl" },
                    { "@type": "ListItem", position: 2, name: "Courant", item: "https://detafelaar.nl/updates" },
                    { "@type": "ListItem", position: 3, name: story.title },
                ],
            },
        ],
    };

    return (
        <>
            <ReadingProgress />

            {/* JSON-LD structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="pb-12">
                {/* Hero */}
                <ArticleHero title={story.title} media={media} caption={heroCaption} />

                {/* Content area: 8+4 grid */}
                <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                    <div className={media.length > 0 ? "-mt-16 relative z-10" : "pt-8"}>
                        {/* Title */}
                        <h1 className="font-headline text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
                            {story.title}
                        </h1>

                        {/* Author */}
                        {story.authorName && (
                            <p className="mt-2 text-sm font-medium text-muted-foreground">
                                Door {story.authorName}
                            </p>
                        )}

                        {/* Rating (reviews) */}
                        {isReview && story.rating && (
                            <div className="mt-2 flex items-center gap-2">
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

                        {/* Meta bar */}
                        <div className="mt-4 mb-6">
                            <ArticleMetaBar
                                category={story.category}
                                publishedAt={story.publishedAt.toISOString()}
                                readTime={article.readTime}
                                slug={story.slug}
                            />
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-border mb-8" />

                        {/* 8 + 4 grid */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            {/* Main content — 8 cols */}
                            <div className="lg:col-span-8">
                                <ArticleBody article={article} />

                                {/* Source link */}
                                {story.sourceUrl && (
                                    <div className="mt-8">
                                        <a
                                            href={story.sourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-foreground/10"
                                        >
                                            Bekijk origineel →
                                        </a>
                                    </div>
                                )}

                                {/* ────── P1: Bottom-of-article "Next actions" ────── */}
                                <ArticleActions nextStory={nextStory} />

                                {/* Back link */}
                                <div className="mt-6 pt-4 border-t border-border/20">
                                    <Link
                                        href="/updates"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                                    >
                                        ← Terug naar alle updates
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar — 4 cols */}
                            <aside className="hidden lg:block lg:col-span-4">
                                <div className="sticky top-24">
                                    <ArticleRail
                                        sections={article.sections}
                                        relatedStories={relatedForClient}
                                        latestStories={latestForClient}
                                        prevStory={prevStory}
                                        nextStory={nextStory}
                                    />
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
