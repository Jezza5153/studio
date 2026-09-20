/**
 * SEO overrides for specific article slugs.
 * Allows custom titles, meta descriptions, and structured data
 * without requiring database schema changes.
 *
 * Add an entry per article slug when an update needs Event JSON-LD or its
 * own FAQ. Entries for past events must be removed together with the event
 * page, otherwise Google keeps seeing an "EventScheduled" in the past.
 */

export interface FaqItem {
    question: string;
    answer: string;
}

export interface SeoOverride {
    seoTitle?: string;
    metaDescription?: string;
    /**
     * One or more Event nodes. Pass an array when an event has multiple
     * sittings / sub-events that should each be bookable in Google rich
     * results.
     */
    eventJsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
    faqItems?: FaqItem[];
}

export const SEO_OVERRIDES: Record<string, SeoOverride> = {};

/** Get SEO override for a given slug, or undefined if none exists */
export function getSeoOverride(slug: string): SeoOverride | undefined {
    return SEO_OVERRIDES[slug];
}

/** Build FAQ JSON-LD from FAQ items */
export function buildFaqJsonLd(items: FaqItem[]) {
    return {
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}
