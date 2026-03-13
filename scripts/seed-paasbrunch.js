const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PAASBRUNCH_MEDIA = JSON.stringify([{
    url: "/pics/paasbrunch-2026.jpg",
    thumbUrl: "/pics/paasbrunch-2026.jpg",
    width: 640,
    height: 640,
    kind: "image",
}]);

const paasbrunchArticles = [
    {
        slug: "paasbrunch-amersfoort-2026",
        type: "MANUAL",
        category: "events",
        pinned: true,
        title: "Paasbrunch 2026 in Amersfoort bij De Tafelaar",
        authorName: "De Tafelaar",
        media: PAASBRUNCH_MEDIA,
        body: `Vier Pasen met een gezellige paasbrunch bij De Tafelaar in het centrum van Amersfoort. Op 5 en 6 april serveren we een uitgebreide shared dining brunch met verschillende gerechten om samen te delen.

Of je nu komt met familie, vrienden of kinderen: Pasen is het perfecte moment om samen aan tafel te zitten en rustig te genieten van goed eten.

Tijdens onze paasbrunch serveren we een selectie van brunchgerechten die perfect passen bij Pasen. Denk aan vers brood, croissants, hartige hapjes uit de oven, ei-gerechten en verschillende kleine gerechten om samen te delen.

De brunch wordt geserveerd als shared dining lunch, zodat iedereen verschillende smaken kan proeven. Een paasbrunch in Amersfoort centrum is het perfecte uitje voor het hele gezin.

De Tafelaar ligt in het centrum van Amersfoort aan de Kamp, een gezellige plek om Pasen te vieren met familie en vrienden. Of je nu op zoek bent naar een paasbrunch restaurant in Amersfoort of pasen uit eten wilt in Amersfoort, bij ons ben je van harte welkom.

PAASBRUNCH MENU
Shared dining brunch met:

• Plank met brood
• Croissants
• Boter
• Jam
• Verschillende soorten beleg
• Gevuld eitje van De Tafelaar
• Eiersalade
• Soep
• Bladerdeeghapje uit de oven
• Baba ganoush
• Club sandwich

DRANKEN
Tijdens de brunch kun je onder andere genieten van:

• (Alcoholvrije) mimosa – €8,50

Daarnaast zijn koffie, thee en andere drankjes beschikbaar van de kaart.

PRAKTISCHE INFORMATIE
📅 Datum: 5 en 6 april 2026

💰 Prijs: €32,50 per persoon

👶 Kinderen tot en met 12 jaar: €14,50

📍 Locatie: De Tafelaar, Kamp 8, Amersfoort

Wil je Pasen vieren met een gezellige brunch in Amersfoort? Reserveer op tijd een tafel voor onze paasbrunch bij De Tafelaar.

VEELGESTELDE VRAGEN
Moet ik reserveren voor de paasbrunch?
Ja, reserveren wordt aanbevolen omdat het aantal plaatsen beperkt is.

Is de paasbrunch geschikt voor kinderen?
Ja, kinderen zijn welkom en er geldt een speciaal tarief voor kinderen tot en met 12 jaar.

Wat voor soort brunch serveren jullie?
We serveren een shared dining brunch met verschillende kleine gerechten om samen te delen.

Waar ligt De Tafelaar?
De Tafelaar ligt in het centrum van Amersfoort aan de Kamp.`,
        publishedAt: new Date("2026-03-13T12:00:00Z"),
    },
    {
        slug: "pasen-uit-eten-amersfoort",
        type: "MANUAL",
        category: "algemeen",
        pinned: false,
        title: "Pasen uit eten in Amersfoort: waarom een brunch perfect is",
        authorName: "De Tafelaar",
        media: "[]",
        body: `Pasen is het perfecte moment om samen met familie of vrienden uit eten te gaan. In Amersfoort zijn er verschillende mogelijkheden, maar een paasbrunch is vaak de populairste keuze.

Bij De Tafelaar organiseren we daarom elk jaar een speciale paasbrunch met shared dining gerechten. Een gezellig paasontbijt of brunch in Amersfoort centrum, met vers brood, croissants, eiergerechten en meer.

Of je nu op zoek bent naar pasen uit eten in Amersfoort of een brunch amersfoort centrum wilt boeken, onze paasbrunch is de perfecte keuze voor een ontspannen Pasen met het hele gezin.

👉 Lees hier meer over onze paasbrunch: /updates/paasbrunch-amersfoort-2026`,
        publishedAt: new Date("2026-03-13T11:00:00Z"),
    },
    {
        slug: "wat-te-doen-pasen-amersfoort",
        type: "MANUAL",
        category: "algemeen",
        pinned: false,
        title: "Wat te doen met Pasen in Amersfoort",
        authorName: "De Tafelaar",
        media: "[]",
        body: `Tijdens Pasen zijn er in Amersfoort verschillende dingen te doen. Van wandelen door de historische binnenstad tot gezellig brunchen met familie.

Een van de leukste activiteiten is een paasbrunch in het centrum. Bij De Tafelaar serveren we op 5 en 6 april een uitgebreide shared dining brunch met verse, seizoensgebonden gerechten.

Of je nu op zoek bent naar een paasbrunch amersfoort of andere activiteiten met Pasen in Amersfoort, een brunch is altijd een goed idee om samen met je geliefden van te genieten.

👉 Bekijk onze paasbrunch bij De Tafelaar: /updates/paasbrunch-amersfoort-2026`,
        publishedAt: new Date("2026-03-13T10:00:00Z"),
    },
];

async function main() {
    console.log("Seeding paasbrunch articles...\n");

    for (const article of paasbrunchArticles) {
        await prisma.feedItem.upsert({
            where: { slug: article.slug },
            update: {
                title: article.title,
                body: article.body,
                category: article.category,
                publishedAt: article.publishedAt,
                type: article.type,
                pinned: article.pinned,
                authorName: article.authorName,
                media: article.media,
            },
            create: {
                slug: article.slug,
                type: article.type,
                title: article.title,
                body: article.body,
                category: article.category,
                publishedAt: article.publishedAt,
                pinned: article.pinned,
                authorName: article.authorName,
                media: article.media,
                sourceUrl: "",
            },
        });
        console.log(`  ✓ ${article.title}`);
    }

    console.log(`\nDone! Seeded ${paasbrunchArticles.length} paasbrunch articles.`);
}

main().then(() => prisma.$disconnect());
