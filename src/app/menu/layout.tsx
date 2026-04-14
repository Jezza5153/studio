import type { Metadata } from "next";
import Link from "next/link";
import { MENU } from "@/content/menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReserveerButton } from "@/components/reserveer-button";

export const metadata: Metadata = {
    title: "Menukaart De Tafelaar | Shared Dining Gerechten Amersfoort",
    description: "Bekijk de menukaart van De Tafelaar in Amersfoort centrum: shared dining gerechten van €3,50–€15. Kazen, charcuterie, vegetarisch en seizoensgebonden. Kamp 8.",
    alternates: {
        canonical: "/menu",
    },
    openGraph: {
        title: "Menukaart De Tafelaar | Shared Dining Gerechten Amersfoort",
        description: "Bekijk de menukaart van De Tafelaar: shared dining gerechten van €3,50–€15. Kazen, charcuterie, vegetarisch en seizoensgebonden.",
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

    return JSON.stringify(data);
}

const menuFaqs = [
    {
        question: "Wat kost een diner bij De Tafelaar?",
        answer: "De gerechten variëren van €3,50 tot €15. Een compleet Chef's Choice arrangement kost €45 per persoon, optioneel met bijpassend wijnarrangement voor €28. Borrelgerechten beginnen vanaf €3,50.",
    },
    {
        question: "Hoeveel gerechten moet ik bestellen bij shared dining?",
        answer: "We raden aan om 3 tot 5 gerechten per persoon te bestellen om samen te delen. Of kies ons Chef's Choice arrangement en laat de chef het voor je uitzoeken.",
    },
    {
        question: "Zijn er vegetarische en vegan opties op het menu?",
        answer: "Ja, ons menu bevat meerdere vegetarische (V) en vegan (VG) opties, waaronder carpaccio van bieten, bruschetta, Japanse curry met udon noodles, Bao Bun Inari en een vegan Snicker als dessert.",
    },
    {
        question: "Kan ik het menu bekijken voor ik reserveer?",
        answer: "Ja, ons volledige menu staat op deze pagina. De kaart wisselt regelmatig met het seizoen — check voor je bezoek de meest actuele versie.",
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
                                De menukaart van De Tafelaar draait om shared dining: kleine gerechten die je samen
                                deelt aan tafel. We werken met seizoensgebonden ingrediënten van lokale producenten
                                uit de regio Amersfoort — van kaas en charcuterie van Farmfields tot biologische
                                koffie van Boot Koffie uit Baarn.
                            </p>
                            <p>
                                De kaart wisselt regelmatig met het seizoen. Naast losse gerechten (€3,50–€15) kun
                                je kiezen voor het Chef&apos;s Choice arrangement (€45 p.p.): een selectie van de
                                mooiste gerechten van dat moment, samengesteld door de keuken. Combineer met het
                                wijnarrangement van Korte Garde (€28 p.p.) voor een complete avond.
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
