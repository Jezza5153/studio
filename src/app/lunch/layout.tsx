import type { Metadata } from "next";
import Link from "next/link";
import { LUNCH_MENU } from "@/content/menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReserveerButton } from "@/components/reserveer-button";

export const metadata: Metadata = {
    title: "Lunchkaart De Tafelaar | Lunch in Amersfoort Centrum",
    description:
        "Lunchen bij De Tafelaar op Kamp 8 in Amersfoort centrum, 11:00-15:00: verse broodjes, salades met brood, bao buns, clubsandwich en de Tafelaars Plank om te delen. Bekijk de lunchkaart.",
    alternates: {
        canonical: "/lunch",
    },
    openGraph: {
        title: "Lunchkaart De Tafelaar | Lunch in Amersfoort Centrum",
        description:
            "Verse broodjes, salades met brood, bao buns en gerechten om te delen. Lunchen bij De Tafelaar op Kamp 8 in Amersfoort centrum, 11:00-15:00.",
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

const SITE_URL = "https://www.tafelaaramersfoort.nl";

function menuJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${SITE_URL}/lunch#menu`,
        name: LUNCH_MENU.title,
        description:
            "Lunchkaart van De Tafelaar, verse broodjes, salades met brood, bao buns, de Tafelaars Plank om te delen en zoete hapjes. Geserveerd van 11:00 tot 15:00 in Amersfoort centrum.",
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
            "De lunchkaart bevat broodjes (€15,50-€17,50) met carpaccio, zalm, clubsandwich, huisgemaakte ricotta, vitello of Fiore kaas. Daarnaast salades geserveerd met brood (€15,50) met watermeloen, mediterraan, carpaccio of vitello, warme gerechten zoals bao buns en gehaktballetjes (€15,50-€16,50), de Tafelaars Plank om te delen (€19,50 vanaf 2 personen) en zoete hapjes vanaf €6.",
    },
    {
        question: "Hoe laat wordt de lunch geserveerd?",
        answer:
            "De lunchkaart serveren we van 11:00 tot 15:00 op Kamp 8 in Amersfoort centrum. Vanaf 17:00 gaat de dinerkaart open. Kazen en charcuterie zijn de hele dag beschikbaar.",
    },
    {
        question: "Zijn er vegetarische en glutenvrije lunchopties?",
        answer:
            "Ja. De salades watermeloen en mediterraan zijn vegetarisch, net als de Bao Buns Inari en alle zoete hapjes. Bij vrijwel elk broodje is glutenvrij brood mogelijk voor €1,50 extra, en meerdere gerechten zijn lactosevrij of glutenvrij, de markering staat bij elk gerecht op de kaart.",
    },
    {
        question: "Kan ik met een groep komen lunchen?",
        answer:
            "Zeker. De Tafelaars Plank (vanaf 2 personen, €19,50 p.p.) met diverse lunchgerechten, broodjes, salade en warme hapjes is ideaal om samen te delen. Voor grotere groepen kijk je op onze pagina Verhuur en Groepen of neem je contact met ons op.",
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
                    <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-4 text-center">
                        Over onze lunchkaart
                    </h2>
                    <Card className=" border-2 border-foreground p-6 sm:p-8">
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Van 11:00 tot 15:00 draait De Tafelaar om een ontspannen lunch: verse broodjes,
                                frisse salades met little gem, geserveerd met brood, en warme gerechten zoals
                                bao buns en gehaktballetjes. Alles wordt gemaakt met seizoensgebonden
                                ingrediënten van lokale producenten uit de regio Amersfoort. Glutenvrij brood is
                                bij vrijwel elk broodje mogelijk voor €1,50 extra.
                            </p>
                            <p>
                                Kom je met z&apos;n tweeën of meer? De Tafelaars Plank (vanaf 2 personen) is een
                                plank vol lunchgerechten, broodjes, salade en warme hapjes om samen te delen.
                                Onze kazen en charcuterie zijn de hele dag beschikbaar, en vanaf 17:00 schuif je
                                aan voor{" "}
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
                    <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen over de lunch
                    </h2>
                    <div className="space-y-4">
                        {lunchFaqs.map((faq, i) => (
                            <Card key={i} className=" border-2 border-foreground p-4 sm:p-6">
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
                            <Button variant="outline" className="">Dinerkaart</Button>
                        </Link>
                        <Link href="/drank">
                            <Button variant="outline" className="">Drankenkaart</Button>
                        </Link>
                        <Link href="/ophalen">
                            <Button variant="outline" className="">Tafelaar Thuis (ophalen)</Button>
                        </Link>
                        <Link href="/verhuur-en-groepen">
                            <Button variant="outline" className="">Groepen &amp; verhuur</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
