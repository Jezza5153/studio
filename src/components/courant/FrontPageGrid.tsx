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
        <section className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:px-8">
            {/* Section divider */}
            <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Vandaag op de voorpagina
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-0">
                {/* Left: Story Column (5 cols) */}
                <div className="lg:col-span-5 lg:pr-6">
                    <StoryColumn stories={stories} />
                </div>

                {/* Middle: Instagram Gallery (4 cols) */}
                <div className="lg:col-span-4 lg:border-l lg:border-border/40 lg:px-6">
                    <InstagramLivingGallery posts={instagramPosts} />
                </div>

                {/* Right: Live Rail (3 cols) */}
                <div className="lg:col-span-3 lg:border-l lg:border-border/40 lg:pl-6">
                    <LiveRail
                        settings={settings}
                        reviews={reviews}
                        pressItems={pressItems}
                    />
                </div>
            </div>
        </section>
    );
}
