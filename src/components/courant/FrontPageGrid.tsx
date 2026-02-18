import type { FeedItem, Settings } from "@prisma/client";
import { StoryColumn } from "./StoryColumn";
import { InstagramLivingGallery } from "./InstagramLivingGallery";
import { LiveRail } from "./LiveRail";

interface FrontPageGridProps {
    stories: FeedItem[];
    instagramPosts: FeedItem[];
    settings: Settings | null;
    reviews: FeedItem[];
    pressItems: FeedItem[];
}

export function FrontPageGrid({
    stories,
    instagramPosts,
    settings,
    reviews,
    pressItems,
}: FrontPageGridProps) {
    return (
        <section className="container mx-auto px-4 py-4 sm:px-6 sm:py-6 md:px-8">
            {/* Section divider */}
            <div className="mb-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Vandaag op de voorpagina
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Left zone: Stories + Instagram (8 cols) */}
                <div className="lg:col-span-8">
                    <StoryColumn stories={stories} />

                    {/* Instagram below stories */}
                    {instagramPosts.length > 0 && (
                        <div className="mt-6 border-t border-border/40 pt-6">
                            <InstagramLivingGallery posts={instagramPosts} />
                        </div>
                    )}
                </div>

                {/* Right sidebar: Live Rail (4 cols) */}
                <aside className="lg:col-span-4 lg:border-l lg:border-border/40 lg:pl-6">
                    <div className="sticky top-4">
                        <LiveRail
                            settings={settings}
                            reviews={reviews}
                            pressItems={pressItems}
                        />
                    </div>
                </aside>
            </div>
        </section>
    );
}

