import type { Metadata } from "next";
import Link from "next/link";
import { LUNCH_MENU } from "@/content/menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReserveerButton } from "@/components/reserveer-button";

export const metadata: Metadata = {
    title: "Lunchkaart De Tafelaar | Lunch in Amersfoort Centrum",
    description:
        "Lunchen bij De Tafelaar op Kamp 8 in Amersfoort centrum: verse broodjes (desem of maïsbrood), salades, de Tafelaarsplank om te delen, bao buns en soep. Bekijk de lunchkaart.",
    alternates: {
        canonical: "/lunch",
    },
    openGraph: {
        title: "Lunchkaart De Tafelaar | Lunch in Amersfoort Centrum",
        description:
            "Verse broodjes, salades, gerechten om te delen en iets warms. Lunchen bij De Tafelaar op Kamp 8 in Amersfoort centrum.",
    },
    keywords: [
        "lunch amersfoort",
        "lunchen amersfoort centrum",
        "lunchkaart de tafelaar",
        "broodjes amersfoort",
        "salades amersfoort",
        "high tea lunch amersfoort",
        "lunchroom amersfoort centrum",
    ],
};

const SITE_URL = "https://tafelaaramersfoort.nl";

function menuJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${SITE_URL}/lunch#menu`,
        name: LUNCH_MENU.title,
        description:
            "Lunchkaart van De Tafelaar — verse broodjes, salades, gerechten om te delen, warme gerechten en desserts in Amersfoort centrum.",
        url: `${SITE_URL}/lunch`,
        hasMenuSection: LUNCH_MENU.categories.map((category) => ({
            "@type": "MenuSection",
            name: category.name,
            description: category.note ?? undefined,
            hasMenuItem: category.items
                .filter((item) => !item.unavailable)
                .map((item) => ({
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

const lunchFaqs = [
    {
        question: "Wat staat er op de lunchkaart van De Tafelaar?",
        answer:
            "De lunchkaart bevat broodjes met keuze uit desembrood of maïsbrood (€13,50–€15) — met carpaccio, vitello tonnato, gerookte zalm, rode biet met geitenkaas, oude kaas of Fiore kaas. Daarnaast salades (€14–€16), de Echte Tafelaarsplank om te delen (€18,50 vanaf 2 personen), warme gerechten zoals seizoenssoep, bao buns en gehaktballetje, en desserts (€7,50).",
    },
    {
        question: "Wanneer kan ik lunchen bij De Tafelaar?",
        answer:
            "De lunchkaart wordt overdag geserveerd op Kamp 8 in Amersfoort centrum. Bel gerust om de actuele lunchtijden te checken — de kaart wisselt mee met het seizoen.",
    },
    {
        question: "Zijn er vegetarische en vegan lunchopties?",
        answer:
            "Ja. De Bietelaar (rode biet, geitenkaas), De Kaaskop, De Oudwijkenaar en De Mediterrane Salade zijn vegetarisch (V), de Mediterrane Salade is zelfs vegan (VG), en als dessert is er de vegan Snicker. Veel salades zijn glutenvrij (GF).",
    },
    {
        question: "Kan ik met een groep komen lunchen?",
        answer:
            "Zeker. De Echte Tafelaarsplank (vanaf 2 personen) is ideaal om samen te delen. Voor grotere groepen kijk je op onze pagina Verhuur en Groepen of neem je contact met ons op.",
    },
];

function lunchFaqJsonLd() {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: lunchFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    });
}

export default function LunchLayout({
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
                dangerouslySetInnerHTML={{ __html: lunchFaqJsonLd() }}
            />
            {children}

            <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24 space-y-12">
                {/* About */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4 text-center">
                        Over onze lunchkaart
                    </h2>
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Overdag draait De Tafelaar om een ontspannen lunch: verse broodjes met keuze
                                uit desembrood of maïsbrood, frisse salades met little gems, en warme
                                gerechten zoals seizoenssoep en bao buns. Alles wordt gemaakt met
                                seizoensgebonden ingrediënten van lokale producenten uit de regio Amersfoort.
                            </p>
                            <p>
                                Kom je met z&apos;n tweeën of meer? De Echte Tafelaarsplank (vanaf 2 personen)
                                is een plank vol lunchgerechtjes, broodjes, salade en warme hapjes om samen te
                                delen. &lsquo;s Avonds schuif je aan voor{" "}
                                <Link href="/menu" className="underline hover:text-foreground">shared dining van de dinerkaart</Link>.
                            </p>
                            <p className="text-xs">
                                Lunchkaart bijgewerkt: voorjaar 2026. De kaart kan tussentijds wijzigen op basis
                                van seizoen en beschikbaarheid.
                            </p>
                        </div>
                    </Card>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen over de lunch
                    </h2>
                    <div className="space-y-4">
                        {lunchFaqs.map((faq, i) => (
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
                        <Link href="/menu">
                            <Button variant="outline" className="rounded-xl">Dinerkaart</Button>
                        </Link>
                        <Link href="/drank">
                            <Button variant="outline" className="rounded-xl">Drankenkaart</Button>
                        </Link>
                        <Link href="/ophalen">
                            <Button variant="outline" className="rounded-xl">Ophalen</Button>
                        </Link>
                        <Link href="/verhuur-en-groepen">
                            <Button variant="outline" className="rounded-xl">Groepen &amp; verhuur</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
