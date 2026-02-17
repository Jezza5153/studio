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
  title: "De Tafelaar Courant | Shared dining in Amersfoort",
  description:
    "Het laatste nieuws van De Tafelaar — shared dining restaurant vlakbij Theater De Flint in Amersfoort. Updates, evenementen, nieuwe gerechten en meer.",
  openGraph: {
    title: "De Tafelaar Courant",
    description:
      "Het levende voorblad van De Tafelaar Amersfoort. Vanavond, events, menu-updates en reviews — allemaal op één plek.",
    images: [{ url: "/pics/homepage.png" }],
  },
};

export default async function CourantHomePage() {
  // All data from DB — no external API calls
  const [leadStory, pinnedItems, stories, igPosts, reviews, settings, feedPage] =
    await Promise.all([
      getLeadStory(),
      getPinnedItems(),
      getLatestStories(undefined, 8),
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
      {(() => {
        let gPhotos: string[] = [];
        try { gPhotos = JSON.parse(settings?.googlePhotos || "[]"); } catch { }
        return gPhotos.length > 0 ? (
          <GuestHighlights
            photos={gPhotos}
            googleRating={settings?.googleRating || 0}
            reviewCount={settings?.googleReviewCount || 0}
          />
        ) : null;
      })()}

      <TheLiveWall
        initialItems={feedPage.items}
        initialHasMore={feedPage.hasMore}
      />
    </>
  );
}
