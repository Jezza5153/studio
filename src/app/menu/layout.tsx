import type { Metadata } from "next";
import Link from "next/link";
import { LUNCH_MENU, DINNER_MENU, type MenuData } from "@/content/menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReserveerButton } from "@/components/reserveer-button";

export const metadata: Metadata = {
    title: "Lunchkaart & Dinerkaart De Tafelaar | Shared Dining Amersfoort",
    description: "Lunch en diner bij De Tafelaar in Amersfoort centrum (Kamp 8). Lunchkaart met broodjes, salades en bao buns; dinerkaart met shared dining, kazen, charcuterie en Chef's Choice. Gerechten van €3,50–€18,50.",
    alternates: {
        canonical: "/menu",
    },
    openGraph: {
        title: "Lunchkaart & Dinerkaart De Tafelaar | Shared Dining Amersfoort",
        description: "Lunch en diner bij De Tafelaar: broodjes, salades, bao buns, shared dining gerechten, kazen, charcuterie en Chef's Choice in Amersfoort centrum.",
    },
    keywords: [
        "menukaart de tafelaar",
        "lunchkaart amersfoort",
        "lunch amersfoort",
        "broodjes amersfoort centrum",
        "shared dining menu amersfoort",
        "kleine gerechten amersfoort",
        "borrelplanken amersfoort",
        "restaurant menu amersfoort centrum",
    ],
};

const SITE_URL = "https://tafelaaramersfoort.nl";

/** Build a Schema.org Menu entity from a MenuData object. */
function menuEntity(menu: MenuData, slug: "lunch" | "dinner") {
    return {
        "@type": "Menu",
        "@id": `${SITE_URL}/menu#${slug}`,
        name: menu.title,
        url: `${SITE_URL}/menu#${slug === "lunch" ? "lunchkaart" : "dinerkaart"}`,
        hasMenuSection: menu.categories.map((category) => ({
            "@type": "MenuSection",
            name: category.name,
            description: category.note ?? undefined,
            hasMenuItem: category.items.map((item) => ({
                "@type": "MenuItem",
                name: item.name,
                description: item.description ?? undefined,
                offers: item.price != null ? {
                    "@type": "Offer",
                    price: item.price,
                    priceCurrency: "EUR",
                } : undefined,
                suitableForDiet: (() => {
                    const diets = [
                        ...(item.tags.includes("V") ? ["https://schema.org/VegetarianDiet"] : []),
                        ...(item.tags.includes("VG") ? ["https://schema.org/VeganDiet"] : []),
                        ...(item.tags.includes("GF") ? ["https://schema.org/GlutenFreeDiet"] : []),
                    ];
                    return diets.length > 0 ? diets : undefined;
                })(),
            })),
        })),
    };
}

function menuJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@graph": [
            menuEntity(LUNCH_MENU, "lunch"),
            menuEntity(DINNER_MENU, "dinner"),
        ],
    };
    return JSON.stringify(data);
}

const menuFaqs = [
    {
        question: "Wat staat er op de lunchkaart?",
        answer: "De lunchkaart bevat broodjes (keuze uit desembrood of maïsbrood) met carpaccio, vitello tonnato, gerookte zalm, rode biet met geitenkaas, oude kaas of Fiore kaas (€13,50–€15). Daarnaast salades (€14–€16), een gedeelde Tafelaarsplank (€18,50 vanaf 2 personen), warme gerechten zoals seizoenssoep, bao buns en gehaktballetjes, en desserts (€7,50).",
    },
    {
        question: "Wanneer kan ik komen lunchen bij De Tafelaar?",
        answer: "Lunch is op zaterdag vanaf 11:00 en op zondag van 11:00 tot 15:00. Op vrijdag opent de keuken om 15:00 met de dinerkaart. Tijdens drukke dagen is reserveren aan te raden.",
    },
    {
        question: "Wat kost een diner bij De Tafelaar?",
        answer: "De dinergerechten variëren van €3,50 tot €15. Een compleet Chef's Choice arrangement kost €45 per persoon, optioneel met bijpassend wijnarrangement voor €28. Borrelgerechten beginnen vanaf €3,50.",
    },
    {
        question: "Hoeveel gerechten moet ik bestellen bij shared dining?",
        answer: "We raden aan om 's avonds 3 tot 5 gerechten per persoon te bestellen om samen te delen. Of kies ons Chef's Choice arrangement en laat de chef het voor je uitzoeken. Bij de lunch is 1–2 gerechten per persoon meestal voldoende.",
    },
    {
        question: "Zijn er vegetarische en vegan opties op het menu?",
        answer: "Ja, zowel de lunchkaart als de dinerkaart bevatten meerdere vegetarische (V) en vegan (VG) opties — van De Bietelaar broodje en Mediterrane salade tot Bao Bun Inari, carpaccio van bieten, Japanse curry en een vegan Snicker als dessert.",
    },
    {
        question: "Kan ik het menu bekijken voor ik reserveer?",
        answer: "Ja, zowel de lunchkaart als de dinerkaart staan volledig op deze pagina. De kaart wisselt regelmatig met het seizoen — check voor je bezoek de meest actuele versie.",
    },
];

function menuFaqJsonLd() {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: menuFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    });
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

            {/* Below-menu content (server component) */}
            <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24 space-y-12">
                {/* About the menu */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4 text-center">
                        Over onze menukaart
                    </h2>
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                De menukaart van De Tafelaar bestaat uit een lunchkaart en een dinerkaart.
                                Overdag draait het om compacte, verse gerechten — broodjes (keuze uit desem of
                                maïsbrood), salades, bao buns en een gedeelde Tafelaarsplank. &lsquo;s Avonds
                                staat shared dining centraal: kleine gerechten die je samen deelt aan tafel,
                                met seizoensgebonden ingrediënten van lokale producenten uit de regio Amersfoort
                                — van kaas en charcuterie van Farmfields tot biologische koffie van Boot Koffie
                                uit Baarn.
                            </p>
                            <p>
                                De kaart wisselt regelmatig met het seizoen. Naast losse gerechten (€3,50–€15)
                                kun je &lsquo;s avonds kiezen voor het Chef&apos;s Choice arrangement
                                (€45 p.p.): een selectie van de mooiste gerechten van dat moment, samengesteld
                                door de keuken. Combineer met het wijnarrangement van Korte Garde (€28 p.p.)
                                voor een complete avond.
                            </p>
                            <p className="text-xs">
                                Menu bijgewerkt: voorjaar 2026. De kaart kan tussentijds wijzigen op basis van seizoen en beschikbaarheid.
                            </p>
                        </div>
                    </Card>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen over ons menu
                    </h2>
                    <div className="space-y-4">
                        {menuFaqs.map((faq, i) => (
                            <Card key={i} className="rounded-2xl border p-4 sm:p-6">
                                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA + internal links */}
                <section className="max-w-2xl mx-auto text-center space-y-6">
                    <ReserveerButton size="lg" className="shadow-sm" label="Reserveer een tafel" />
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/drank">
                            <Button variant="outline" className="rounded-xl">Drankenkaart</Button>
                        </Link>
                        <Link href="/verhuur-en-groepen">
                            <Button variant="outline" className="rounded-xl">Groepen &amp; verhuur</Button>
                        </Link>
                        <Link href="/vegetarisch-amersfoort">
                            <Button variant="outline" className="rounded-xl">Vegetarisch</Button>
                        </Link>
                        <Link href="/bourgondisch-eten-amersfoort">
                            <Button variant="outline" className="rounded-xl">Bourgondisch eten</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
