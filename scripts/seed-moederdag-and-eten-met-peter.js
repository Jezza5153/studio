// scripts/seed-moederdag-and-eten-met-peter.js
//
// One-shot DB sync to make the Courant lead-story / featured items reflect
// the CURRENT events:
//
//   - Moederdag High Tea (zondag 10 mei 2026)
//   - Eten met Peter — actie voor de Hersenstichting (maandag 11 mei 2026)
//
// And to drop the past Pasen content (5-6 april) out of the featured slots.
//
// `getLeadStory()` in src/lib/queries/feed.ts selects the most-recently-
// published pinned item (type MANUAL or PRESS). So:
//   1. Unpin the Pasen lead article (paasbrunch-amersfoort-2026)
//   2. Upsert Moederdag with pinned=true and a publishedAt earlier than ↓
//   3. Upsert Eten met Peter with pinned=true and the LATEST publishedAt
//      → it becomes the new lead story
//
// SEO satellite articles for Pasen (pasen-uit-eten-amersfoort,
// wat-te-doen-pasen-amersfoort) are already pinned=false — they stay live
// for evergreen "pasen amersfoort" search traffic, just not featured.
//
// Run with:
//   node scripts/seed-moederdag-and-eten-met-peter.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MOEDERDAG_MEDIA = JSON.stringify([
    {
        url: "/pics/homepage.png",
        thumbUrl: "/pics/homepage.png",
        width: 1408,
        height: 768,
        kind: "image",
    },
]);

const ETEN_MET_PETER_MEDIA = JSON.stringify([
    {
        url: "/pics/eten-met-peter.jpg",
        thumbUrl: "/pics/eten-met-peter.jpg",
        width: 1200,
        height: 1600,
        kind: "image",
    },
]);

const articles = [
    // 1. Moederdag — pinned, publishedAt slightly earlier than Eten met Peter
    //    (so Eten met Peter wins the lead-story slot since it's the closer
    //    event in time when the page is rendered today).
    {
        slug: "moederdag-high-tea-amersfoort-2026",
        type: "MANUAL",
        category: "events",
        pinned: true,
        title: "Moederdag High Tea bij De Tafelaar — zondag 10 mei",
        authorName: "De Tafelaar",
        media: MOEDERDAG_MEDIA,
        sourceUrl: "/moederdag-high-tea-amersfoort",
        body: `Verras je moeder met een bourgondische high tea bij De Tafelaar in het centrum van Amersfoort. Twee sittings op zondag 10 mei 2026: 12:00 en 14:00. Speciaal voor de allerliefste, perfect om samen te delen op Moederdag.

Op tafel komt een rijk gevulde shared dining high tea: verse croissants, een variatie aan vers brood, beenham, jonge kaas, huisgemaakte eiersalade, diverse jammetjes, zalm met nori mayo, gegrilde ribeye en bladerdeeghapjes met asperges. Daarbij thee, koffie van Boot Koffie en een glas bubbels voor mama.

PRAKTISCHE INFORMATIE
📅 Datum: zondag 10 mei 2026
🕛 Sittings: 12:00 of 14:00 (~2,5 uur per sitting)
💰 Prijs: €37,50 per persoon
👶 Kinderen tot en met 12 jaar: kindertarief
📍 Locatie: De Tafelaar, Kamp 8, Amersfoort
🥂 Inclusief glas bubbels voor mama

Reserveren is noodzakelijk — beperkt aantal plaatsen per sitting. Reserveer via onze reserveerflow op de site of bekijk de volledige menukaart op onze Moederdag-pagina.

👉 Volledige info en reserveren: /moederdag-high-tea-amersfoort`,
        publishedAt: new Date("2026-04-28T10:00:00Z"),
    },

    // 2. Eten met Peter — pinned, latest publishedAt → becomes the new
    //    lead story on /agenda. References the De Stad Amersfoort article.
    {
        slug: "eten-met-peter-hersenstichting-2026",
        type: "MANUAL",
        category: "events",
        pinned: true,
        title: "Eten met Peter — De Tafelaar in actie voor de Hersenstichting",
        authorName: "De Tafelaar",
        media: ETEN_MET_PETER_MEDIA,
        sourceUrl: "/eten-met-peter",
        body: `Op maandag 11 mei verzorgen gastkok Peter van den Heuvel en chef Jeremy Arrascaeta een speciale charity-avond bij De Tafelaar in het centrum van Amersfoort.

Peter van den Heuvel is auteur van de bundel 'Ik heb een heel klein gaatje gedicht' — een verzameling waarin gedichten, fotografie en recepten samenkomen. Onder dezelfde titel voert hij actie om geld op te halen voor de Hersenstichting. Op 11 mei brengt hij die actie naar Kamp 8: een vriendendiner uit zijn bundel, samen gekookt met onze chef Jeremy.

Eigenaar Jan Molmans stelt het restaurant open voor de avond. Chef Jeremy Arrascaeta doneert zijn tijd en inzet. Voor deze avond werken we uitsluitend met biologische producten. De volledige opbrengst gaat naar de actie van Peter van den Heuvel voor de Hersenstichting.

PRAKTISCHE INFORMATIE
📅 Datum: maandag 11 mei 2026
🕕 Vanaf: 18:00
💛 Doel: actie voor de Hersenstichting (volledige opbrengst)
🥬 Producten: 100% biologisch
👨‍🍳 Gastkok: Peter van den Heuvel
👨‍🍳 Chef: Jeremy Arrascaeta
📍 Locatie: De Tafelaar, Kamp 8, Amersfoort

Beperkt aantal plaatsen — reserveer op tijd via onze reserveerflow op de site.

Bron: De Stad Amersfoort, "De Tafelaar in actie voor de Hersenstichting" (22 april 2026).

👉 Volledige info en reserveren: /eten-met-peter`,
        publishedAt: new Date("2026-04-29T12:00:00Z"),
    },

    // 3. SEO satellite for Moederdag — algemeen / pinned=false. Boosts
    //    "moederdag amersfoort" search traffic. Internal links into the
    //    main moederdag article + landing page.
    {
        slug: "moederdag-uit-eten-amersfoort",
        type: "MANUAL",
        category: "algemeen",
        pinned: false,
        title: "Moederdag uit eten in Amersfoort: waarom een high tea perfect is",
        authorName: "De Tafelaar",
        media: "[]",
        body: `Moederdag is een mooi moment om samen met mama, oma of het hele gezin uit eten te gaan. In Amersfoort centrum zijn er meerdere mogelijkheden, maar een high tea is dit jaar de populairste keuze.

Bij De Tafelaar serveren we op zondag 10 mei een bourgondische shared dining high tea: hartige en zoete lekkernijen op één rijk gevulde tafel. Twee sittings (12:00 en 14:00), €37,50 per persoon inclusief thee, koffie en een glas bubbels voor mama. Kindertarief beschikbaar.

Of je nu op zoek bent naar 'moederdag uit eten amersfoort' of een 'high tea amersfoort centrum' wilt boeken — onze Moederdag High Tea is de perfecte keuze voor een ontspannen middag.

👉 Bekijk onze Moederdag High Tea: /moederdag-high-tea-amersfoort
👉 Lees de aankondiging: /updates/moederdag-high-tea-amersfoort-2026`,
        publishedAt: new Date("2026-04-28T09:00:00Z"),
    },
];

async function main() {
    console.log("Syncing Courant — Moederdag + Eten met Peter become featured\n");

    // Step 1: Unpin past Pasen lead article so it drops out of the lead-story
    // slot. We keep the article live (good for evergreen SEO) but pinned=false.
    const pasenResult = await prisma.feedItem.updateMany({
        where: {
            slug: { in: ["paasbrunch-amersfoort-2026", "paasbrunch-2026"] },
            pinned: true,
        },
        data: { pinned: false },
    });
    console.log(`  ✓ Unpinned ${pasenResult.count} past Pasen article(s)`);

    // Step 2: Upsert the new featured articles
    for (const article of articles) {
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
                sourceUrl: article.sourceUrl ?? "",
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
                sourceUrl: article.sourceUrl ?? "",
            },
        });
        const pinFlag = article.pinned ? "📌 pinned" : "       ";
        console.log(`  ✓ ${pinFlag}  ${article.title}`);
    }

    console.log(`\nDone — synced ${articles.length} articles.\n`);
    console.log("Lead story is now: Eten met Peter (latest publishedAt + pinned).");
    console.log("Second featured: Moederdag High Tea.");
    console.log("Past Pasen article: live as evergreen, no longer pinned.");
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });
