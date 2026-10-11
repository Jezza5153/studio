import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/site-metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqList } from "@/components/faq-list";
import { MapPin, Clock, Users, Utensils, Phone, Car } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: { absolute: "Eten voor Theater Amersfoort | Restaurant vlakbij de Flint | De Tafelaar" },
    description:
        "Eten voor of na het theater in Amersfoort? De Tafelaar ligt op ongeveer 400 meter van de Flint (circa 5 min lopen). Shared dining met lokale gerechten. Reserveer nu.",
    alternates: {
        canonical: "/eten-voor-theater-de-flint",
    },
    openGraph: {
        ...sharedOpenGraph,
        images: [{ url: "/pics/terras-kamp.jpg", width: 1800, height: 1200 }],
        title: "Eten voor Theater Amersfoort | Restaurant vlakbij de Flint",
        description: "Shared dining op 5 minuten lopen van de Flint. Perfect voor of na de voorstelling in Amersfoort.",
    },
    keywords: [
        "eten voor theater amersfoort",
        "restaurant vlakbij flint",
        "eten vlakbij flint amersfoort",
        "restaurant bij theater amersfoort",
        "eten voor voorstelling amersfoort",
        "restaurant naast flint",
        "diner voor theater amersfoort",
        "restaurant theater amersfoort",
        "eten voor flint amersfoort",
        "uit eten voor theater",
    ],
};

// FAQ data for schema and display
const faqs = [
    {
        question: "Hoe ver is De Tafelaar lopen naar de Flint?",
        answer: "De Tafelaar ligt op de Kamp 8, op ongeveer 400 meter van Theater de Flint. Dat is circa 5 minuten lopen. Je loopt via de Kamp rechtstreeks naar de ingang van de Flint.",
    },
    {
        question: "Kunnen we op tijd eten voor de voorstelling?",
        answer: "Ja, wij adviseren om een tafel te boeken 2 uur voor aanvang van de show. Dan heb je rustig de tijd om te genieten van shared dining en op tijd bij het theater te zijn. Voorstellingen in Flint beginnen meestal om 20:00 of 20:15, boek dan rond 18:00.",
    },
    {
        question: "Kunnen we snel shared dining doen (60-75 minuten)?",
        answer: "Jazeker, laat bij je reservering weten dat je naar de Flint gaat en hoe laat de voorstelling begint. Wij stemmen het tempo van de gerechten daarop af zodat je op tijd bent.",
    },
    {
        question: "Is er ruimte voor groepen na een show?",
        answer: "Absoluut. We ontvangen graag groepen na de voorstelling. Vanaf 7 personen werken we met een Chef's Choice arrangement (EUR 48 p.p.). Reserveer vooraf en vermeld dat het na Flint is.",
    },
    {
        question: "Waar kan ik parkeren bij de Flint en De Tafelaar?",
        answer: "Parkeergarage Beestenmarkt ligt op 2 minuten lopen van De Tafelaar, een goede optie als je eerst eet en daarna naar de voorstelling loopt. Parking Flint (Stadsring) zit naast het theater en op circa 5 minuten lopen van De Tafelaar. Op straat parkeren kan op de Kamp en omliggende straten (betaald tot 21:00).",
    },
    {
        question: "Wat kost eten bij De Tafelaar?",
        answer: "Gerechten varieren van EUR 3,50 tot EUR 15,50. Reken op gemiddeld EUR 25-35 per persoon voor eten. Ons Chef's Choice arrangement kost EUR 48 p.p., optioneel met bijpassend wijnarrangement voor EUR 28 p.p.",
    },
    {
        question: "Hebben jullie rekening met dieetwensen en allergieën?",
        answer: "Wij werken met verse, lokale producten en kunnen vrijwel altijd rekening houden met allergieën en dieetwensen. Op de menukaart staat bij elk gerecht een markering voor vegetarisch, glutenvrij en lactosevrij. Vermeld specifieke wensen bij je reservering.",
    },
    {
        question: "Kan ik na een middagvoorstelling in de Flint bij jullie terecht?",
        answer: "Ja. Op vrijdag, zaterdag en zondag zijn we open vanaf 15:00, dus na een middagvoorstelling loop je in 5 minuten naar de Kamp voor een borrel of een vroeg diner.",
    },
    {
        question: "Kunnen we na de voorstelling nog iets drinken?",
        answer: "Ja. Op vrijdag en zaterdag zijn we open tot 00:00, op maandag, donderdag en zondag tot 23:00. Na een avondvoorstelling schuif je aan voor een drankje, een borrelplank of een dessert.",
    },
    {
        question: "Hoe laat beginnen voorstellingen in Flint meestal?",
        answer: "De meeste avondvoorstellingen in Flint beginnen om 20:00 of 20:15. Middagvoorstellingen starten meestal rond 14:30 of 15:00. Check de Flint-website voor exacte tijden. Wij raden aan om 2 uur voor aanvang te reserveren voor een ontspannen diner.",
    },
];

// FAQ JSON-LD schema
function faqJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
    return JSON.stringify(data);
}

export default function EtenVoorDeFlintPage() {
    return (
        <>
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
            />

            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="mb-12 border-[5px] border-foreground bg-white px-6 py-10 text-center sm:px-10 sm:py-12">
                    <p className="mb-4 inline-block bg-foreground px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.2em] text-background">
                        Op 5 min lopen van de Flint
                    </p>
                    <h1 className="font-headline text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                        Eten voor het theater in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Op zoek naar een restaurant voor of na het theater in Amersfoort? De Tafelaar ligt op
                        400 meter van Theater de Flint, shared dining met lokale, seizoensgebonden gerechten.
                    </p>
                </header>

                {/* Praktische info */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="border-2 border-foreground">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-5 w-5" />
                                    <CardTitle className="text-lg">Locatie</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Kamp 8, Amersfoort</p>
                                <p>~400 meter van de Flint</p>
                                <p>~5 minuten lopen via de Kamp</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-foreground">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Clock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Voor de show</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Boek 2 uur voor aanvang</p>
                                <p>Shows beginnen meestal 20:00/20:15</p>
                                <p>Reserveer rond 18:00 voor rustig diner</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-foreground">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Concept</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Shared dining</p>
                                <p>Gerechten om te delen</p>
                                <p>Lokaal &amp; seizoensgebonden</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-foreground">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Car className="h-5 w-5" />
                                    <CardTitle className="text-lg">Parkeren</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Parkeergarage Beestenmarkt (2 min)</p>
                                <p>Of Parking Flint bij het theater (~5 min)</p>
                                <p>Ook: Koestraat, Smallepad, straatparkeren Kamp</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-foreground">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Users className="h-5 w-5" />
                                    <CardTitle className="text-lg">Groepen</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Groepsarrangement</p>
                                <p>Chef&apos;s Choice vanaf 7 pers.</p>
                                <p>&euro;48 p.p. + opt. wijnarrangement</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton
                            size="lg"
                            className="shadow-sm"
                            label="Reserveer nu"
                        />
                        <p className="mt-3 text-sm text-muted-foreground">
                            Vermeld bij uw reservering dat u naar de Flint gaat!
                        </p>
                    </div>
                </section>

                {/* Uitleg: zelfstandige antwoordblokken voor Google en AI-zoekmachines */}
                <section className="max-w-3xl mx-auto mb-12 space-y-8" aria-label="Eten voor of na de Flint">
                    <div>
                        <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-3">
                            Waar eet je in Amersfoort voor een voorstelling in de Flint?
                        </h2>
                        <p className="text-muted-foreground">
                            De Tafelaar zit op de Kamp 8 in Amersfoort centrum, op ongeveer 400 meter (circa 5 minuten
                            lopen) van Theater de Flint. Je bestelt een paar gerechten en deelt ze samen aan tafel: kazen,
                            charcuterie, warme seizoensgerechten en desserts, gemaakt met producten van makers uit de regio.
                            Reken op 2 à 3 gerechten per persoon, gemiddeld €25-35 per persoon. Vertel bij je reservering
                            hoe laat de voorstelling begint, dan stemt de keuken het tempo daarop af.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-3">
                            Hoe laat reserveer je voor de voorstelling?
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-2 border-foreground bg-white text-sm">
                                <thead className="bg-secondary text-left">
                                    <tr>
                                        <th className="px-4 py-2.5">Voorstelling</th>
                                        <th className="px-4 py-2.5">Begint meestal</th>
                                        <th className="px-4 py-2.5">Bij De Tafelaar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-border">
                                        <td className="px-4 py-2.5 font-semibold text-foreground">Avond</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">20:00 of 20:15</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">Reserveer rond 18:00 (maandag en donderdag open vanaf 17:00, vrijdag t/m zondag vanaf 15:00)</td>
                                    </tr>
                                    <tr className="border-t border-border">
                                        <td className="px-4 py-2.5 font-semibold text-foreground">Middag</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">14:30 of 15:00</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">Na afloop welkom vanaf 15:00 (vrijdag t/m zondag)</td>
                                    </tr>
                                    <tr className="border-t border-border">
                                        <td className="px-4 py-2.5 font-semibold text-foreground">Na de voorstelling</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">Rond 22:00 of later</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">Open tot 00:00 op vrijdag en zaterdag, tot 23:00 op maandag, donderdag en zondag</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Aanvangstijden verschillen per voorstelling; kijk op de website van de Flint voor de exacte tijd.
                        </p>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen
                    </h2>
                    <FaqList faqs={faqs} />
                </section>

                {/* Links */}
                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/menu">
                            <Button variant="outline" className="">
                                Bekijk ons menu
                            </Button>
                        </Link>
                        <Link href="/buurtgids">
                            <Button variant="outline" className="">
                                Buurtgids Flint
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="">
                                <Phone className="mr-2 h-4 w-4" />
                                Contact
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
