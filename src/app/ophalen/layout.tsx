import type { Metadata } from "next";
import Link from "next/link";
import { OPHALEN_MENU } from "@/content/menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Ophalen bij De Tafelaar | Spare Ribs Afhalen Amersfoort",
    description:
        "Ophalen bij De Tafelaar op Kamp 8 in Amersfoort: sous-vide spare ribs (24u op 80°C), bijgerechten, huisgemaakte sauzen en dranken. Bekijk de ophalenkaart en bestel.",
    alternates: {
        canonical: "/ophalen",
    },
    openGraph: {
        title: "Ophalen bij De Tafelaar | Spare Ribs Afhalen Amersfoort",
        description:
            "Sous-vide spare ribs, bijgerechten en huisgemaakte sauzen om mee te nemen. Afhalen bij De Tafelaar op Kamp 8 in Amersfoort centrum.",
    },
    keywords: [
        "afhalen amersfoort",
        "ophalen amersfoort",
        "spare ribs afhalen amersfoort",
        "spare ribs amersfoort",
        "afhaal de tafelaar",
        "afhaalrestaurant amersfoort centrum",
        "sous vide spare ribs",
    ],
};

const SITE_URL = "https://tafelaaramersfoort.nl";

function menuJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${SITE_URL}/ophalen#menu`,
        name: OPHALEN_MENU.title,
        description:
            "Ophalenkaart van De Tafelaar — sous-vide spare ribs, bijgerechten, huisgemaakte sauzen, dranken en desserts om mee te nemen.",
        url: `${SITE_URL}/ophalen`,
        hasMenuSection: OPHALEN_MENU.categories.map((category) => ({
            "@type": "MenuSection",
            name: category.name,
            description: category.note ?? undefined,
            hasMenuItem: category.items
                // Schema.org should not advertise sold-out items as offered.
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

const ophalenFaqs = [
    {
        question: "Wat staat er op de ophalenkaart van De Tafelaar?",
        answer:
            "Onze sous-vide spare ribs (24 uur op 80°C in marinade, zoet en pittig) zijn de specialiteit — los voor €24,95 of als Spare Ribs Menu vanaf €34,95 inclusief bijgerecht, coleslaw en drankje. Daarnaast bijgerechten (coleslaw, gepofte aardappel, maïskolf, loaded potato met pulled pork), huisgemaakte sauzen, frisdranken, lokaal getapte bieren en desserts.",
    },
    {
        question: "Hoe bestel ik en wanneer kan ik ophalen?",
        answer:
            "Bel +31 6 341 279 32 om je bestelling door te geven en een ophaaltijd af te spreken. Ophalen op Kamp 8 in Amersfoort centrum tijdens openingstijden: woensdag, donderdag en zondag vanaf 17:00, vrijdag en zaterdag vanaf 15:00.",
    },
    {
        question: "Waarom zijn jullie spare ribs anders?",
        answer:
            "We garen onze spare ribs 24 uur sous vide op 80°C in marinade. Daardoor vallen ze van het bot en zit de smaak tot in de kern — niet alleen op de buitenkant.",
    },
    {
        question: "Zijn er vegetarische of alcoholvrije opties?",
        answer:
            "Ja. Bijgerechten zoals coleslaw, gepofte aardappel en maïskolf zijn vegetarisch (V), en onze Vegan Snicker is volledig plantaardig (VG). Bij de dranken hebben we Playground IPA 0,3% alcoholvrij, Lipton Ice Tea Green en Sparkling, en frisdranken.",
    },
];

function ophalenFaqJsonLd() {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: ophalenFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    });
}

export default function OphalenLayout({
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
                dangerouslySetInnerHTML={{ __html: ophalenFaqJsonLd() }}
            />
            {children}

            <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24 space-y-12">
                {/* About */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4 text-center">
                        Over onze ophalenkaart
                    </h2>
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Liever thuis genieten? Bij De Tafelaar kun je onze sous-vide spare ribs en
                                bijgerechten ook ophalen. De ribs worden 24 uur op 80°C in marinade gegaard
                                — daardoor vallen ze van het bot en zit de smaak tot in de kern. Kies de
                                ribs los, of pak het Spare Ribs Menu inclusief bijgerecht, coleslaw en
                                drankje.
                            </p>
                            <p>
                                Bel <a href="tel:+31634127932" className="underline hover:text-foreground">+31 6 341 279 32</a>{" "}
                                om je bestelling door te geven en een ophaaltijd af te spreken. Ophalen bij
                                Kamp 8 in Amersfoort centrum tijdens openingstijden.
                            </p>
                            <p className="text-xs">
                                Ophalenkaart bijgewerkt: voorjaar 2026. Beschikbaarheid van losse items kan
                                wisselen.
                            </p>
                        </div>
                    </Card>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen over ophalen
                    </h2>
                    <div className="space-y-4">
                        {ophalenFaqs.map((faq, i) => (
                            <Card key={i} className="rounded-2xl border p-4 sm:p-6">
                                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Internal links */}
                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/menu">
                            <Button variant="outline" className="rounded-xl">Bekijk menukaart</Button>
                        </Link>
                        <Link href="/lunch">
                            <Button variant="outline" className="rounded-xl">Lunchkaart</Button>
                        </Link>
                        <Link href="/drank">
                            <Button variant="outline" className="rounded-xl">Drankenkaart</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-xl">Contact</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
