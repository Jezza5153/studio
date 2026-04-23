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
    /**
     * One or more Event nodes. Pass an array when an event has multiple
     * sittings / sub-events that should each be bookable in Google rich
     * results (e.g. Moederdag high tea 12:00 + 14:00).
     */
    eventJsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
    faqItems?: FaqItem[];
}

export const SEO_OVERRIDES: Record<string, SeoOverride> = {
    "moederdag-high-tea-amersfoort-2026": {
        seoTitle: "Moederdag High Tea Amersfoort 2026 – De Tafelaar",
        metaDescription:
            "Verras je moeder met een uitgebreide high tea bij De Tafelaar in Amersfoort centrum. Shared dining high tea met hartige hapjes, zoete lekkernijen en lokale thee & koffie. Zondag 10 mei. Reserveer nu.",
        eventJsonLd: [
            {
                "@type": "Event",
                "@id": "https://tafelaaramersfoort.nl/moederdag-high-tea-amersfoort#sitting-12",
                name: "Moederdag High Tea 2026 — Sitting 12:00",
                startDate: "2026-05-10T12:00",
                endDate: "2026-05-10T14:30",
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
                    url: "https://tafelaaramersfoort.nl/moederdag-high-tea-amersfoort",
                },
                description:
                    "Bourgondische shared dining high tea op Moederdag bij De Tafelaar in Amersfoort. Verse croissants, vers brood, beenham, jonge kaas, huisgemaakte eiersalade, jammetjes, zalm met nori mayo, gegrilde ribeye en bladerdeeghapjes met asperges. Inclusief thee, koffie van Boot Koffie en een glas bubbels voor mama.",
                image: "https://tafelaaramersfoort.nl/pics/homepage.png",
                organizer: {
                    "@type": "Organization",
                    name: "De Tafelaar",
                    url: "https://tafelaaramersfoort.nl",
                },
            },
            {
                "@type": "Event",
                "@id": "https://tafelaaramersfoort.nl/moederdag-high-tea-amersfoort#sitting-14",
                name: "Moederdag High Tea 2026 — Sitting 14:00",
                startDate: "2026-05-10T14:00",
                endDate: "2026-05-10T16:30",
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
                    url: "https://tafelaaramersfoort.nl/moederdag-high-tea-amersfoort",
                },
                description:
                    "Bourgondische shared dining high tea op Moederdag bij De Tafelaar in Amersfoort. Verse croissants, vers brood, beenham, jonge kaas, huisgemaakte eiersalade, jammetjes, zalm met nori mayo, gegrilde ribeye en bladerdeeghapjes met asperges. Inclusief thee, koffie van Boot Koffie en een glas bubbels voor mama.",
                image: "https://tafelaaramersfoort.nl/pics/homepage.png",
                organizer: {
                    "@type": "Organization",
                    name: "De Tafelaar",
                    url: "https://tafelaaramersfoort.nl",
                },
            },
        ],
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
                answer: "Een bourgondische shared dining high tea om samen te delen. Op tafel: verse croissants, een variatie aan vers brood, beenham, jonge kaas, huisgemaakte eiersalade, diverse jammetjes, zalm met nori mayo, gegrilde ribeye en bladerdeeghapjes met asperges. Daarbij thee, koffie van Boot Koffie en een glas bubbels voor mama.",
            },
            {
                question: "Is de high tea geschikt voor kinderen?",
                answer: "Ja, kinderen zijn van harte welkom. Er is een kindertarief en de gerechten zijn ook voor de kleinsten geschikt.",
            },
            {
                question: "Hoe laat is de Moederdag high tea?",
                answer: "Zondag 10 mei 2026. We werken met twee sittings: 12:00 en 14:00. Elke sitting duurt ongeveer 2,5 uur. Kies de tijd die past en reserveer op tijd — het aantal plaatsen is beperkt.",
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
