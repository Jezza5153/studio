import { PrismaClient } from "@prisma/client";

// This seed deletes every FeedItem and the Settings row. In Vercel, DATABASE_URL
// is the live database for Production, Preview AND Development, so the URL you get
// from `vercel env pull` / `vercel env run` is production. `npm run db:seed`,
// `prisma migrate reset` and `prisma migrate dev` all run this file, so it refuses
// any Neon database unless explicitly forced. Never print the URL: it holds the password.
const PRODUCTION_ENDPOINT = "ep-icy-scene-abjt6uye";
const FORCE_ENV = "ALLOW_SEED_ON_PRODUCTION";
const FORCE_VALUE = "yes-delete-everything";

function productionReason(url: string): string | null {
    if (url.toLowerCase().includes(PRODUCTION_ENDPOINT)) {
        return "DATABASE_URL points at the production Neon endpoint";
    }
    let host: string;
    try {
        // Drop trailing dots: "ep-x.neon.tech." is the same host to DNS.
        host = new URL(url).hostname.toLowerCase().replace(/\.+$/, "");
    } catch {
        return "DATABASE_URL could not be parsed, so its host can't be checked";
    }
    if (host === "neon.tech" || host.endsWith(".neon.tech")) {
        return "DATABASE_URL points at a Neon database (*.neon.tech)";
    }
    return null;
}

function assertNotProduction(url: string | undefined): asserts url is string {
    if (!url) {
        console.error(
            "Refusing to seed: DATABASE_URL is not set, so it can't be checked.\n" +
                "Run `npm run db:seed` (Prisma loads .env) or set DATABASE_URL to a local database."
        );
        process.exit(1);
    }
    const reason = productionReason(url);
    if (!reason) return;
    if (process.env[FORCE_ENV] === FORCE_VALUE) {
        console.warn(`⚠️  ${reason}, but ${FORCE_ENV} is set: seeding anyway.`);
        return;
    }
    console.error(
        [
            `Refusing to seed: ${reason}.`,
            "",
            "prisma/seed.ts deletes every FeedItem (all posts) and the Settings row",
            "(Google score, tonight status) before it inserts demo data. In Vercel,",
            "DATABASE_URL is the live database for Production, Preview and Development.",
            "",
            "Seed a local database instead, for example:",
            "  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tafelaar npm run db:seed",
            "",
            `To really wipe this database, run again with ${FORCE_ENV}=${FORCE_VALUE}`,
        ].join("\n")
    );
    process.exit(1);
}

// Check before the client exists, and hand it the checked URL so Prisma can't pick
// up a different one from .env.
const databaseUrl = process.env.DATABASE_URL;
assertNotProduction(databaseUrl);
const prisma = new PrismaClient({ datasourceUrl: databaseUrl });

const demoMedia = (src: string, w = 800, h = 600) =>
    JSON.stringify([
        {
            url: src,
            thumbUrl: src,
            width: w,
            height: h,
            kind: "image" as const,
        },
    ]);

async function main() {
    // Wipe existing data
    await prisma.feedItem.deleteMany();
    await prisma.settings.deleteMany();

    // Settings
    await prisma.settings.create({
        data: {
            id: "singleton",
            tonightStatus: "OPEN",
            tonightNote: "Vanavond plek vrij! Loop gerust binnen.",
        },
    });

    const now = new Date();
    const ago = (hours: number) => new Date(now.getTime() - hours * 3600_000);

    // === MANUAL / PRESS items ===
    await prisma.feedItem.createMany({
        data: [
            {
                type: "MANUAL",
                category: "vanavond",
                title: "Vanavond: Seizoensopening Lentemenù",
                slug: "seizoensopening-lentemenu-2026",
                body: "Vanavond vieren we de lente met een speciaal 5-gangen seizoensmenu. Chef Jeremy heeft een menu samengesteld met de eerste asperges, wilde knoflook en verse kruiden uit eigen tuin. Reserveer snel — er zijn nog maar een paar plekken!",
                media: demoMedia("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop", 1200, 800),
                pinned: true,
                publishedAt: ago(1),
            },
            {
                type: "MANUAL",
                category: "events",
                title: "Wine & Dine: Natuurwijnen uit de Loire",
                slug: "wine-dine-natuurwijnen-loire",
                body: "Donderdag 20 februari nemen we je mee op een reis door de Loire met 5 bijzondere natuurwijnen, elk gecombineerd met een passend gerecht van onze chef. Beperkt tot 24 gasten.",
                media: demoMedia("https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop"),
                pinned: false,
                publishedAt: ago(6),
            },
            {
                type: "MANUAL",
                category: "nieuwe_kaart",
                title: "Nieuwe winterkaart: Wortelvelouté & Ossobuco",
                slug: "nieuwe-winterkaart-wortelveloute",
                body: "De winterkaart is vernieuwd! Nieuwe highlights: romige wortelvelouté met za'atar, langzaam gegaarde ossobuco en onze signature citroentaart met meringue van het seizoen.",
                media: demoMedia("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"),
                pinned: false,
                publishedAt: ago(24),
            },
            {
                type: "PRESS",
                category: "krant",
                title: "AD: 'De Tafelaar is de verrassende nieuwkomer in Amersfoort'",
                slug: "ad-verrassende-nieuwkomer",
                body: "Het Algemeen Dagblad besteedde aandacht aan De Tafelaar als een van de opvallendste nieuwe restaurants in de regio Utrecht. 'Een plek waar gezelligheid en kwaliteit hand in hand gaan.'",
                media: demoMedia("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop"),
                pinned: false,
                publishedAt: ago(72),
            },
            {
                type: "MANUAL",
                category: "behind",
                title: "Achter de schermen: onze nieuwe leverancier uit Bunschoten",
                slug: "leverancier-bunschoten",
                body: "We zijn trots op onze samenwerking met Boerderij De Eemhof uit Bunschoten. Vanaf deze week serveren we hun biologische zuurdesembrood bij elk gerecht. Lokaal, vers en met liefde gebakken.",
                media: demoMedia("https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop"),
                pinned: false,
                publishedAt: ago(48),
            },
            {
                type: "MANUAL",
                category: "algemeen",
                title: "Reserveer nu voor Valentijnsdag!",
                slug: "valentijnsdag-2026",
                body: "Valentijnsdag bij De Tafelaar: een intieme avond met een speciaal samengesteld 4-gangen menu voor twee. Inclusief een glas champagne bij ontvangst. Reserveer via onze website.",
                media: demoMedia("https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop"),
                pinned: false,
                publishedAt: ago(96),
            },
            {
                type: "MANUAL",
                category: "events",
                title: "Live Jazz Zondag: het Amersfoort Jazz Trio",
                slug: "live-jazz-zondag-feb",
                body: "Elke laatste zondag van de maand verwelkomen we live jazz in De Tafelaar. Deze maand: het Amersfoort Jazz Trio met hun eigen mix van swing en bossa nova. Vrije inloop vanaf 17:00.",
                media: demoMedia("https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop"),
                pinned: false,
                publishedAt: ago(120),
            },

            // === INSTAGRAM items ===
            {
                type: "INSTAGRAM",
                category: "algemeen",
                title: "Vandaag op tafel 🍽️",
                slug: "ig-vandaag-op-tafel",
                body: "Onze signature tonijn tataki met ponzu en sesamolie. #sharedining #amersfoort #detafelaar",
                media: demoMedia("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop", 800, 800),
                sourceUrl: "https://instagram.com/p/example1",
                publishedAt: ago(2),
            },
            {
                type: "INSTAGRAM",
                category: "behind",
                title: "De keuken draait warm 🔥",
                slug: "ig-keuken-draait-warm",
                body: "Behind the scenes met chef Jeremy. Dag en nacht bezig met het perfectioneren van elk gerecht.",
                media: demoMedia("https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=800&fit=crop", 800, 800),
                sourceUrl: "https://instagram.com/p/example2",
                publishedAt: ago(8),
            },
            {
                type: "INSTAGRAM",
                category: "algemeen",
                title: "Sfeer op de Kamp ✨",
                slug: "ig-sfeer-kamp",
                body: "Amersfoort op z'n mooist. De Kamp in het avondlicht.",
                media: demoMedia("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop", 800, 800),
                sourceUrl: "https://instagram.com/p/example3",
                publishedAt: ago(16),
            },
            {
                type: "INSTAGRAM",
                category: "nieuwe_kaart",
                title: "Nieuwe dessert alert 🍰",
                slug: "ig-nieuwe-dessert",
                body: "Onze nieuwe citroentaart met Italiaanse meringue en basilicumsorbet. Nu op de kaart!",
                media: demoMedia("https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=800&fit=crop", 800, 800),
                sourceUrl: "https://instagram.com/p/example4",
                publishedAt: ago(32),
            },

            // === GOOGLE REVIEWS ===
            {
                type: "GOOGLE_REVIEW",
                category: "algemeen",
                title: "Fantastische ervaring!",
                slug: "review-jan-de-vries",
                body: "Wat een ontdekking! De gerechten zijn creatief, de sfeer is warm en het personeel is super vriendelijk. De tonijn tataki was een absolute topper. Zeker weer terugkomen!",
                rating: 5,
                authorName: "Jan de Vries",
                publishedAt: ago(4),
            },
            {
                type: "GOOGLE_REVIEW",
                category: "algemeen",
                title: "Perfect voor een avondje uit",
                slug: "review-lisa-bakker",
                body: "Samen met m'n vriend geweest voor onze verjaardag. Heerlijk gegeten, mooie wijnen en een dessert om van te dromen. De bediening was attent zonder opdringerig te zijn.",
                rating: 5,
                authorName: "Lisa Bakker",
                publishedAt: ago(12),
            },
            {
                type: "GOOGLE_REVIEW",
                category: "algemeen",
                title: "Aanrader vlak bij De Flint!",
                slug: "review-pieter-smit",
                body: "Na de voorstelling in De Flint hier gaan eten. Geweldige locatie, mooie sfeer en het eten smaakte fantastisch. De shared dining formule werkt echt goed met een groep.",
                rating: 5,
                authorName: "Pieter Smit",
                publishedAt: ago(36),
            },
            {
                type: "GOOGLE_REVIEW",
                category: "algemeen",
                title: "Lekkere gerechten, fijne sfeer",
                slug: "review-maria-jansen",
                body: "De wortelvelouté was verrukkelijk en de ossobuco smolt op je tong. Gezellige plek, leuk personeel. Enige minpuntje: iets druk op vrijdagavond, maar dat is ook wel een compliment.",
                rating: 4,
                authorName: "Maria Jansen",
                publishedAt: ago(60),
            },
            {
                type: "GOOGLE_REVIEW",
                category: "algemeen",
                title: "Verborgen parel in Amersfoort",
                slug: "review-thomas-de-boer",
                body: "Als Amersfoorter ken ik bijna alle restaurants, maar De Tafelaar verraste me echt. Verse, seizoensgebonden gerechten en een kaart die regelmatig wisselt. Top!",
                rating: 5,
                authorName: "Thomas de Boer",
                publishedAt: ago(84),
            },
        ],
    });

    const count = await prisma.feedItem.count();
    console.log(`✅ Seeded ${count} feed items + settings`);
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
