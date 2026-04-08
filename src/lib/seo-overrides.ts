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
    "moederdag-high-tea-amersfoort-2026": {
        seoTitle: "Moederdag High Tea Amersfoort 2026 – De Tafelaar",
        metaDescription:
            "Verras je moeder met een uitgebreide high tea bij De Tafelaar in Amersfoort centrum. Shared dining high tea met hartige hapjes, zoete lekkernijen en lokale thee & koffie. Zondag 11 mei. Reserveer nu.",
        eventJsonLd: {
            "@type": "Event",
            name: "Moederdag High Tea 2026 bij De Tafelaar",
            startDate: "2026-05-11T12:00",
            endDate: "2026-05-11T17:00",
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
                    postalCode: "3811 AR",
                    addressCountry: "NL",
                },
            },
            offers: {
                "@type": "Offer",
                price: "37.50",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: "https://tafelaaramersfoort.nl/updates/moederdag-high-tea-amersfoort-2026",
            },
            description:
                "Vier Moederdag met een uitgebreide shared dining high tea bij De Tafelaar in Amersfoort. Hartige hapjes, zoete lekkernijen, lokale thee van Boot Koffie en meer.",
            image: "https://tafelaaramersfoort.nl/pics/homepage.png",
            organizer: {
                "@type": "Organization",
                name: "De Tafelaar",
                url: "https://tafelaaramersfoort.nl",
            },
        },
        faqItems: [
            {
                question: "Moet ik reserveren voor de Moederdag high tea?",
                answer: "Ja, reserveren is noodzakelijk. Het aantal plaatsen is beperkt en Moederdag is een populaire dag. Boek zo snel mogelijk via onze website of bel +31 6 341 279 32.",
            },
            {
                question: "Wat kost de Moederdag high tea?",
                answer: "De high tea kost €37,50 per persoon. Kinderen tot en met 12 jaar betalen een gereduceerd tarief. Inclusief thee, koffie en een glas bubbels voor mama.",
            },
            {
                question: "Wat wordt er geserveerd bij de high tea?",
                answer: "Een shared dining high tea met hartige hapjes (mini-sandwiches, quiche, kaasplanken), zoete lekkernijen (scones, taartjes, petit fours) en warme gerechten. Alles gemaakt met lokale, seizoensgebonden producten.",
            },
            {
                question: "Is de high tea geschikt voor kinderen?",
                answer: "Ja, kinderen zijn van harte welkom. Er is een kindertarief en de gerechten zijn ook voor de kleinsten geschikt.",
            },
            {
                question: "Hoe laat is de Moederdag high tea?",
                answer: "Zondag 11 mei 2026, van 12:00 tot 17:00. We adviseren om rond 12:00 of 14:00 te reserveren voor een ontspannen middag.",
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
