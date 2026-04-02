import type { Metadata } from "next";
import { MENU } from "@/content/menu";

export const metadata: Metadata = {
    title: "Menukaart De Tafelaar | Shared Dining Gerechten Amersfoort",
    description: "Bekijk de menukaart van De Tafelaar: shared dining gerechten, borrelplanken, vegetarische opties en seizoensgebonden ingrediënten uit de regio Amersfoort.",
    alternates: {
        canonical: "/menu",
    },
    openGraph: {
        title: "Menukaart De Tafelaar Amersfoort",
        description: "Shared dining met lokale, seizoensgebonden gerechten. Bekijk ons menu.",
    },
    keywords: [
        "menukaart de tafelaar",
        "shared dining menu amersfoort",
        "kleine gerechten amersfoort",
        "borrelplanken amersfoort",
        "restaurant menu amersfoort centrum",
    ],
};

function menuJsonLd() {
    const siteUrl = "https://tafelaaramersfoort.nl";

    const data = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${siteUrl}/menu#menu`,
        name: "Menukaart De Tafelaar",
        description: "Shared dining menu met kleine gerechten, kazen, charcuterie en desserts van lokale, seizoensgebonden ingrediënten.",
        url: `${siteUrl}/menu`,
        mainEntity: MENU.categories.map((category) => ({
            "@type": "MenuSection",
            name: category.name,
            hasMenuItem: category.items.map((item) => ({
                "@type": "MenuItem",
                name: item.name,
                description: item.description ?? undefined,
                offers: item.price != null ? {
                    "@type": "Offer",
                    price: item.price,
                    priceCurrency: "EUR",
                } : undefined,
                suitableForDiet: [
                    ...(item.tags.includes("V") ? ["https://schema.org/VegetarianDiet"] : []),
                    ...(item.tags.includes("VG") ? ["https://schema.org/VeganDiet"] : []),
                    ...(item.tags.includes("GF") ? ["https://schema.org/GlutenFreeDiet"] : []),
                ].length > 0 ? [
                    ...(item.tags.includes("V") ? ["https://schema.org/VegetarianDiet"] : []),
                    ...(item.tags.includes("VG") ? ["https://schema.org/VeganDiet"] : []),
                    ...(item.tags.includes("GF") ? ["https://schema.org/GlutenFreeDiet"] : []),
                ] : undefined,
            })),
        })),
    };

    return JSON.stringify(data);
}

function menuFaqJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Wat kost een diner bij De Tafelaar?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "De gerechten variëren van €3,50 tot €15. Een compleet Chef's Choice arrangement kost €45 per persoon, optioneel met bijpassend wijnarrangement voor €28. Borrelgerechten beginnen vanaf €3,50.",
                },
            },
            {
                "@type": "Question",
                name: "Hoeveel gerechten moet ik bestellen bij shared dining?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We raden aan om 3 tot 5 gerechten per persoon te bestellen om samen te delen. Of kies ons Chef's Choice arrangement en laat de chef het voor je uitzoeken.",
                },
            },
            {
                "@type": "Question",
                name: "Zijn er vegetarische en vegan opties op het menu?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ja, ons menu bevat meerdere vegetarische (V) en vegan (VG) opties, waaronder carpaccio van bieten, bruschetta, Japanse curry met udon noodles, Bao Bun Inari en een vegan Snicker als dessert.",
                },
            },
        ],
    };

    return JSON.stringify(data);
}

export default function MenuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: menuJsonLd() }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: menuFaqJsonLd() }}
            />
            {children}
        </>
    );
}
