import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReserveerButton } from "@/components/reserveer-button";

export const metadata: Metadata = {
    title: "Drankenkaart De Tafelaar | Lokaal Bier & Wijn Amersfoort",
    description: "Lokale bieren, biologische wijnen en cocktails bij De Tafelaar in Amersfoort. Rock City, De Drie Ringen, Korte Garde en meer. Bekijk de volledige drankenkaart.",
    alternates: {
        canonical: "/drank",
    },
    openGraph: {
        title: "Drankenkaart De Tafelaar | Lokaal Bier & Wijn Amersfoort",
        description: "Lokale bieren, biologische wijnen en cocktails bij De Tafelaar in Amersfoort. Rock City, De Drie Ringen, Korte Garde en meer. Bekijk de volledige drankenkaart.",
    },
    keywords: [
        "drankenkaart de tafelaar",
        "bier amersfoort",
        "wijn amersfoort",
        "cocktails amersfoort",
        "lokaal bier amersfoort",
    ],
};

const drankFaqs = [
    {
        question: "Welke bieren hebben jullie?",
        answer: "We schenken lokale bieren uit Amersfoort en omgeving, waaronder bieren van Rock City Brewing, De Drie Ringen, Eem Bier en 't Mirakel. Het aanbod wisselt met het seizoen — vraag onze medewerkers naar de actuele selectie op tap en fles.",
    },
    {
        question: "Hebben jullie biologische wijnen?",
        answer: "Ja, onze wijnkaart is samengesteld door Korte Garde en bevat biologische en biodynamische wijnen. Onze sommelier kiest wijnen die passen bij de shared dining gerechten op het menu.",
    },
    {
        question: "Kan ik een wijnarrangement bestellen?",
        answer: "Zeker! Bij het Chef's Choice arrangement kun je een wijnarrangement toevoegen voor €28 per persoon. Je krijgt dan bij elke gang een bijpassend glas wijn, geselecteerd door Korte Garde.",
    },
    {
        question: "Hebben jullie ook alcoholvrije opties?",
        answer: "Absoluut. We hebben alcoholvrije bieren, huisgemaakte limonades, verse sapjes, koffie van Boot Koffie en diverse theesoorten. Vraag ook naar onze alcoholvrije cocktails.",
    },
];

function drankFaqJsonLd() {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: drankFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    });
}

export default function DrankLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: drankFaqJsonLd() }}
            />
            {children}

            {/* Below-menu content (server component) */}
            <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24 space-y-12">
                {/* About our drinks */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4 text-center">
                        Over onze dranken
                    </h2>
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Bij De Tafelaar werken we het liefst met brouwerijen en wijnmakers uit de regio. Op de tap
                                vind je bieren van Amersfoortse brouwerijen zoals Rock City Brewing, De Drie Ringen,
                                Eem Bier en &apos;t Mirakel. Het aanbod wisselt regelmatig, zodat er altijd iets nieuws
                                te ontdekken valt.
                            </p>
                            <p>
                                Onze wijnkaart wordt verzorgd door Korte Garde en bevat biologische en biodynamische
                                wijnen die perfect passen bij de shared dining gerechten op ons menu. Combineer het
                                Chef&apos;s Choice arrangement met het wijnarrangement (€28 p.p.) voor een volledig
                                verzorgde avond op Kamp 8 in Amersfoort centrum.
                            </p>
                            <p className="text-xs">
                                Drankenkaart bijgewerkt: voorjaar 2026. Het aanbod kan tussentijds wijzigen op basis van seizoen en beschikbaarheid.
                            </p>
                        </div>
                    </Card>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen over onze dranken
                    </h2>
                    <div className="space-y-4">
                        {drankFaqs.map((faq, i) => (
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
                            <Button variant="outline" className="rounded-xl">Menukaart</Button>
                        </Link>
                        <Link href="/borrel-amersfoort">
                            <Button variant="outline" className="rounded-xl">Borrel in Amersfoort</Button>
                        </Link>
                        <Link href="/bourgondisch-eten-amersfoort">
                            <Button variant="outline" className="rounded-xl">Bourgondisch eten</Button>
                        </Link>
                        <Link href="/over-onze-makers">
                            <Button variant="outline" className="rounded-xl">Over onze makers</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
