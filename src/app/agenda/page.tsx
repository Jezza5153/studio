import type { Metadata } from "next";
import Link from "next/link";
import {
    getLeadStory,
    getPinnedItems,
    getLatestStories,
    getInstagramPosts,
    getLatestReviews,
    getSettings,
    getFeedPage,
} from "@/lib/queries/feed";
import { CourantMasthead } from "@/components/courant/CourantMasthead";
import { BreakingTicker } from "@/components/courant/BreakingTicker";
import { LeadStoryHero } from "@/components/courant/LeadStoryHero";
import { FrontPageGrid } from "@/components/courant/FrontPageGrid";
import { TheLiveWall } from "@/components/courant/TheLiveWall";
import { GuestHighlights } from "@/components/courant/GuestHighlights";

export const revalidate = 60; // ISR: revalidate every 60s

export const metadata: Metadata = {
    title: "Agenda & Evenementen | De Tafelaar Amersfoort",
    description:
        "Agenda van De Tafelaar Amersfoort: evenementen, speciale menu's, reviews en updates. Shared dining restaurant op de Kamp, vlakbij Flint.",
    alternates: {
        canonical: "/agenda",
    },
    openGraph: {
        title: "Agenda & Evenementen | De Tafelaar Amersfoort",
        description:
            "Evenementen, speciale menu's en updates van De Tafelaar op de Kamp in Amersfoort centrum.",
        images: [{ url: "/pics/homepage.png" }],
    },
    keywords: [
        "agenda de tafelaar",
        "evenementen restaurant amersfoort",
        "de tafelaar nieuws",
        "speciale menu amersfoort",
        "restaurant evenement amersfoort",
    ],
};

export default async function AgendaPage() {
    const [leadStory, pinnedItems, stories, igPosts, reviews, settings, feedPage] =
        await Promise.all([
            getLeadStory(),
            getPinnedItems(),
            getLatestStories(undefined, 20),
            getInstagramPosts(12),
            getLatestReviews(10),
            getSettings(),
            getFeedPage(undefined, 1, 12),
        ]);

    // Separate press items from stories
    const pressItems = stories.filter((s) => s.type === "PRESS");
    const nonPressStories = stories.filter((s) => s.type !== "PRESS");

    return (
        <>
            <CourantMasthead />

            <BreakingTicker
                pinnedItems={pinnedItems}
                settings={settings}
                reviewQuote={reviews[0] ?? null}
            />

            {leadStory && <LeadStoryHero story={leadStory} />}

            <FrontPageGrid
                stories={nonPressStories}
                instagramPosts={igPosts}
                settings={settings}
                reviews={reviews}
                pressItems={pressItems}
            />

            {/* Guest photo highlights */}
            <GuestHighlights
                photos={settings?.googlePhotos || "[]"}
                googleRating={settings?.googleRating || 0}
                reviewCount={settings?.googleReviewCount || 0}
            />

            <TheLiveWall
                initialItems={feedPage.items}
                initialHasMore={feedPage.hasMore}
            />

            {/* SEO footer with internal links */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 py-12 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                    De Tafelaar is een shared dining restaurant op de Kamp 8 in Amersfoort centrum, op 2 minuten van Theater de Flint.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/updates" className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        Alle updates
                    </Link>
                    <Link href="/menu" className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        Menukaart
                    </Link>
                    <Link href="/reserveren" className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        Reserveren
                    </Link>
                    <Link href="/impressie" className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        Impressie
                    </Link>
                </div>
            </section>
        </>
    );
}
