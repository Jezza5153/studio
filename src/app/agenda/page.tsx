import type { Metadata } from "next";
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
    title: "Agenda & Updates | De Tafelaar Amersfoort",
    description:
        "Bekijk de agenda van De Tafelaar — evenementen, updates, nieuwe gerechten en meer. Shared dining restaurant vlakbij Flint in Amersfoort.",
    alternates: {
        canonical: "/agenda",
    },
    openGraph: {
        title: "Agenda & Updates | De Tafelaar",
        description:
            "Evenementen, updates, menu-nieuws en reviews van De Tafelaar Amersfoort. Alles op één plek.",
        images: [{ url: "/pics/homepage.png" }],
    },
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
        </>
    );
}
