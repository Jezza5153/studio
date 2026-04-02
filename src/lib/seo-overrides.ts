/**
 * SEO overrides for specific article slugs.
 * Allows custom titles, meta descriptions, and structured data
 * without requiring database schema changes.
 */

export interface FaqItem {
    question: string;
    answer: string;
}

export interface SeoOverride {
    seoTitle?: string;
    metaDescription?: string;
    eventJsonLd?: Record<string, unknown>;
    faqItems?: FaqItem[];
}

export const SEO_OVERRIDES: Record<string, SeoOverride> = {
    "paasbrunch-amersfoort-2026": {
        seoTitle: "Paasbrunch Amersfoort 2026 – De Tafelaar",
        metaDescription:
            "Vier Pasen met een uitgebreide paasbrunch bij De Tafelaar in het centrum van Amersfoort. Shared dining brunch met brood, croissants, eiergerechten en meer. Reserveer nu.",
        eventJsonLd: {
            "@type": "Event",
            name: "Paasbrunch 2026 bij De Tafelaar",
            startDate: "2026-04-05T11:00",
            endDate: "2026-04-06T15:00",
            eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
                "@type": "Place",
                name: "De Tafelaar",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Kamp 8",
                    addressLocality: "Amersfoort",
                    addressCountry: "NL",
                },
            },
            offers: {
                "@type": "Offer",
                price: "32.50",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: "https://tafelaaramersfoort.nl/updates/paasbrunch-amersfoort-2026",
            },
            description:
                "Vier Pasen met een uitgebreide shared dining brunch bij De Tafelaar in Amersfoort. Brood, croissants, eiergerechten en meer.",
            image: "https://tafelaaramersfoort.nl/pics/homepage.png",
            organizer: {
                "@type": "Organization",
                name: "De Tafelaar",
                url: "https://tafelaaramersfoort.nl",
            },
        },
        faqItems: [
            {
                question: "Moet ik reserveren voor de paasbrunch?",
                answer: "Ja, reserveren wordt aanbevolen omdat het aantal plaatsen beperkt is.",
            },
            {
                question: "Is de paasbrunch geschikt voor kinderen?",
                answer: "Ja, kinderen zijn welkom en er geldt een speciaal tarief voor kinderen tot en met 12 jaar.",
            },
            {
                question: "Wat voor soort brunch serveren jullie?",
                answer: "We serveren een shared dining brunch met verschillende kleine gerechten om samen te delen.",
            },
            {
                question: "Waar ligt De Tafelaar?",
                answer: "De Tafelaar ligt in het centrum van Amersfoort aan de Kamp.",
            },
        ],
    },
};

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
