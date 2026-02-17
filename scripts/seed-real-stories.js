const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Slugs of placeholder stories to delete
const PLACEHOLDER_SLUGS = [
    "seizoensopening-lentemenu-2026",
    "wine-dine-natuurwijnen-loire",
    "nieuwe-winterkaart-wortelveloute",
    "leverancier-bunschoten",
    "valentijnsdag-2026",
    "live-jazz-zondag-feb",
];

// Real stories from krantartikel events.docx
const realStories = [
    {
        slug: "makkelijke-maandag",
        type: "MANUAL",
        title: "Makkelijke Maandag: een maaltijd, een glimlach en een goed gesprek",
        body: `Iedere eerste maandag van de maand openen we bij De Tafelaar onze deuren voor Makkelijke Maandag. Voor slechts tien euro kunt u genieten van een heerlijke daghap, bereid met verse ingrediënten en veel aandacht.

Voor mij gaat Makkelijke Maandag verder dan een voordelige maaltijd. Ik wilde een dag creëren waarop iedereen zich welkom voelt: studenten die het budget vriendelijk willen houden, volwassenen die alleen zijn, of gewoon mensen die zin hebben in een praatje. Aan onze aanschuiftafel kan iedereen een plekje voor één persoon reserveren en nieuwe mensen ontmoeten. Een klein gebaar, een glimlach, een goed gesprek – dat maakt voor mij deze maandag bijzonder.

Elke maand wisselt de daghap. Van een warme groentecurry tot een sappige gehaktbal met aardappelpuree, alles is eenvoudig maar met liefde bereid. Terwijl de pannen pruttelen, vult de ruimte zich met geuren die harten en magen verwarmen.

Ik hoop dat Makkelijke Maandag een plek wordt waar mensen samenkomen, genieten van lekker eten en elkaar ontmoeten. Kom langs, proef de daghap en schuif aan. Wie weet maakt u die avond een nieuwe connectie – dat is voor mij de essentie van Makkelijke Maandag bij De Tafelaar.

Geschreven door Jan Molmans, eigenaar van De Tafelaar.`,
        category: "evenement",
        publishedAt: new Date("2026-02-01T12:00:00Z"),
    },
    {
        slug: "de-borrelaar-podcast",
        type: "MANUAL",
        title: "De Borrelaar: nuchtere verhalen bij een goed glas",
        body: `Ik ben ontzettend enthousiast om te vertellen over iets nieuws dat we bij De Tafelaar gaan doen: een eigen podcast, genaamd De Borrelaar. Samen met onze chef-kok Jeremy ga ik hieraan zitten voor een nuchter, eerlijk en vooral gezellig gesprek over eten, drinken en alles wat daar omheen gebeurt.

Het idee ontstond eigenlijk tijdens een van onze borrels in het restaurant. Jeremy vertelde een hilarisch verhaal over een gerecht dat helemaal verkeerd liep en ik dacht: dit moeten meer mensen horen. De Borrelaar wordt dus geen ingewikkeld culinaire showtje, maar juist een plek waar we kunnen kletsen over de dingen die we meemaken in de keuken, bij gasten, en soms zelfs over ons eigen leven.

Elke aflevering zal een mix zijn van verhalen, praktische tips, grappige momenten en onverwachte gesprekken. Soms schuift er iemand van het team aan, of een gast die een bijzonder verhaal heeft. Het gaat vooral om sfeer, eerlijkheid en een goed glas erbij – net zoals je bij ons in het restaurant gewend bent.

Ik hoop dat De Borrelaar een plek wordt waar luisteraars kunnen lachen, herkennen en misschien zelfs inspiratie opdoen voor hun eigen culinaire avonturen. Houd de website in de gaten, want de eerste aflevering komt binnenkort online. En natuurlijk, wie weet drinken we binnenkort samen een glas, terwijl je ons verhaal beluistert.`,
        category: "nieuws",
        publishedAt: new Date("2026-02-05T12:00:00Z"),
    },
    {
        slug: "leerlingchef-sam-gastchefavond",
        type: "MANUAL",
        title: "Sam neemt het stokje over: een jonge chef in de spotlights",
        body: `Bij De Tafelaar geloven we in de kracht van leren door te doen. Daarom werken we graag met jonge talenten die elke dag bij ons groeien. Eén van die talenten is Sam, een fulltime leerling\u2011chef bij chef\u2011kok Jeremy en een geboren creatieveling in de keuken. Sam volgt zijn opleiding bij Leerhotel Het Klooster, de unieke combinatie van school en echte horecapraktijk in Amersfoort, waar studenten worden opgeleid in een realistische werkomgeving met echte gasten en echte service.

Op 30 maart organiseert Sam iets waar we al maanden naar uitkijken: zijn eigen avond als gastchef bij De Tafelaar. Samen met een klasgenoot werkt hij hard aan een menu dat begint met een verfijnde amuse en eindigt met een verrassend viergangenmenu. Nog volop in de ontwikkelingsfase, maar wat we al weten is dat de gerechten persoonlijk, creatief en vol smaak zullen zijn — precies wat je mag verwachten van een jonge chef met lef en visie.

Hoe bijzonder is het om te zien hoe iemand die ooit zijn eerste prakles kreeg bij Het Klooster nu zijn eigen diner samenstelt? Voor ons is het een bevestiging van waarom we kansen bieden aan jonge talenten. Sam brengt niet alleen techniek, maar ook nieuwsgierigheid en originaliteit mee naar de keuken, en dat proef je.

We zien dit diner niet alleen als een avond met goed eten, maar ook als een moment waarop u kunt proeven van het verhaal achter de personen die bij ons werken. Want bij De Tafelaar draait het niet alleen om wat er op uw bord ligt — het gaat om de verbinding tussen gast en maker, passie en ervaring.

Reserveer daarom een plekje op 30 maart en laat u verrassen door Sam's creaties. Wie weet ontmoet u hem zelf, hoort u zijn verhaal of deelt u zelfs uw eigen indruk van zijn gerechten. Een avond vol smaak én betekenis — dat is waar de toekomst van De Tafelaar om draait.`,
        category: "evenement",
        publishedAt: new Date("2026-02-10T12:00:00Z"),
    },
    {
        slug: "onze-missie-en-visie",
        type: "MANUAL",
        title: "Onze missie en visie: samen genieten, samen ontdekken",
        body: `Bij De Tafelaar geloven we in meer dan alleen goed eten — wij geloven in het samenbrengen van mensen. In onze visie draait alles om verbinding, aandacht en gedeelde momenten, precies zoals een tafel hoort te zijn: een plek waar iedereen welkom is, waar je geniet van heerlijke gerechten en waar gesprekken vanzelf ontstaan.

Onze missie is helder: wij willen een warme, gastvrije sfeer bieden waarin goed eten, bijzondere borrels en oprechte aandacht centraal staan. Tafelen is bij ons niet alleen eten en drinken — het is thuiskomen, verbinden en genieten met anderen, ongeacht leeftijd, achtergrond of gezelschap. Of je binnenloopt voor een borrel, deelgerechten met vrienden, een daghap op Makkelijke Maandag of een besloten bijeenkomst, bij ons voel je je welkom.

Wat ons uniek maakt, is onze focus op shared dining en lokale betrokkenheid. Onze kaart staat vol kleine gerechten om samen te delen, gemaakt met verse, seizoensgebonden en lokale producten. Hierbij werken we samen met producenten en leveranciers uit de regio, omdat we geloven in duurzaamheid, eerlijkheid en respect voor mens en natuur.

Onze visie is om dé ontmoetingsplek van Amersfoort te zijn, waar traditie en vernieuwing elkaar versterken. Met een herkenbare stijl, een steeds wisselend en kwalitatief aanbod en een sfeer waarin je je direct thuis voelt, willen we bijdragen aan een levendige horeca\u2011cultuur die draait om verbinding, verrassing en vertrouwdheid.

Bij De Tafelaar gaat het om meer dan wat er op tafel staat — het gaat om wat er aan tafel gebeurt. Samen eten, samen delen, samen verhalen maken.`,
        category: "over-ons",
        publishedAt: new Date("2026-01-15T12:00:00Z"),
    },
    {
        slug: "verhuur-en-catering",
        type: "MANUAL",
        title: "Eten bij De Tafelaar, ook buiten ons restaurant",
        body: `Bij De Tafelaar draait alles om samen genieten. Daarom brengen we onze gerechten en sfeer graag naar jou toe. Of het nu gaat om een teamlunch, borrel, verjaardag of privé\u2011diner, onze catering en groepsmogelijkheden maken elk moment bijzonder.

Onze lunchcatering is perfect voor bedrijven: vers belegde broodjes, bowls en lunchboxen, met aandacht voor smaak én dieetwensen. Voor privé\u2011bijeenkomsten bieden we maatwerk: van shared dining\u2011menu's tot volledige borrelarrangementen, met de warme, ontspannen sfeer die je in ons restaurant kent.

Of je nu binnen of buiten onze deuren eet, bij De Tafelaar staat kwaliteit, gezelligheid en verbinding altijd voorop. Heb je een idee of speciale wens? Vertel het ons, dan maken we er samen iets bijzonders van.`,
        category: "nieuws",
        publishedAt: new Date("2026-01-20T12:00:00Z"),
    },
    {
        slug: "waarom-lokale-producten",
        type: "MANUAL",
        title: "Waarom lokale producten voor ons meer betekenen dan alleen smaak",
        body: `Bij De Tafelaar staat samen genieten altijd centraal — niet alleen het diner zelf, maar de hele ervaring daaromheen. Een belangrijk onderdeel daarvan is onze keuze voor lokale, duurzame ingrediënten. Voor mij als eigenaar gaat het daarbij niet alleen om wat er op het bord ligt, maar om waarom die producten er liggen, wie ze heeft gemaakt en wat het betekent voor onze gemeenschap.

We werken met producten van lokale makers en producenten. Denk aan eieren en groenten van Het Derde Erf, ambachtelijk ijs van De IJsmakerij en lokale bieren van Rock City of De Drie Ringen. Die samenwerking maakt onze gerechten niet alleen smaakvoller, maar verbindt ons ook met de mensen achter de producten.

Lokale ingrediënten hebben iets bijzonders: ze zijn vaak verser, omdat ze niet dagenlang onderweg zijn voordat ze in onze keuken aankomen. Dat proef je terug in de volle smaak en kwaliteit van elk gerecht. Bovendien zorgt het kiezen voor lokale producten ervoor dat we seizoensgebonden kunnen koken, wat de variatie en creativiteit op onze kaart stimuleert.

Maar er is meer. Door lokaal te kopen, steunen we boeren en producenten in onze eigen regio. Het geld blijft hier — het helpt mede om werkgelegenheid te behouden en onze lokale economie te versterken. Dit betekent dat mensen in en om Amersfoort kunnen blijven genieten van ambachtelijke producten die met liefde en aandacht zijn gemaakt.

Voor mij persoonlijk is het belangrijk dat De Tafelaar een plek is waar iedereen welkom is en waar de herkomst van het eten even belangrijk is als de bereiding ervan. Het betekent dat we durven te kiezen voor kwaliteit boven kwantiteit, voor duurzaamheid boven gemak, en voor gemeenschap boven anonimiteit. Samen eten wordt zo een ervaring die verder gaat dan alleen smaak — het brengt mensen dichter bij elkaar én bij de plek waar zij wonen.

Bij De Tafelaar draait het om passie, aandacht en respect — voor onze gasten, voor de producten en voor de mensen die ze maken. En dat proef je bij elke hap.`,
        category: "achter-de-schermen",
        publishedAt: new Date("2026-01-25T12:00:00Z"),
    },
    {
        slug: "de-rijsttafelaar-gastchef-yulie",
        type: "MANUAL",
        title: "De Rijsttafelaar: een smakelijk succes",
        body: `Op maandag 9 februari vond bij De Tafelaar het evenement De Rijsttafelaar plaats, met gastchef Yulie aan het fornuis. Yulie bereidde een prachtige traditionele rijsttafel vol smaakvolle gerechten, waarbij gasten konden proeven, delen en genieten.

Het was een avond vol gezelligheid, verrassende combinaties en heerlijke smaken. Het evenement werd een groot succes, precies zoals we bij De Tafelaar willen: samen eten, samen genieten en nieuwe culinaire ervaringen ontdekken.

Interview met gastchef Yulie over De Rijsttafelaar

Hoe kijk je terug op De Rijsttafelaar op 9 februari? "Het was een supergezellig evenement," vertelt Yulie. "Ik heb heel veel mensen zien lachen en zien genieten, en het was bijzonder om te zien dat zelfs gasten die elkaar niet kenden, toch iets met elkaar deelden. Het voelde echt verbindend en positief."

Wat vond je het leukst aan deze avond? "Het mooiste moment was de stilte die viel toen iedereen aan het eten was. Dat besef dat mensen echt aan het genieten waren, gaf me een geweldig gevoel."

Was er iets dat je het meest verraste tijdens het evenement? "Eigenlijk hoe positief iedereen was en hoe goed het voelde om dit samen te doen."

Wat maakt deze rijsttafel volgens jou bijzonder? "Het zijn mijn favoriete gerechten. En als ik iets heel fijn of leuk vind, wil ik dat ook graag met anderen delen. Daarom voelde het extra bijzonder om dit menu te serveren."

Welke gerechten of combinaties waren voor jou het hoogtepunt? "Eigenlijk gaat het niet om één gerecht, maar om de combinatie van alles samen. Dat is juist wat het zo leuk maakt. Daarom had ik een hele lijst van gerechten samengesteld om bij elkaar te serveren."

Wat voor ervaring had je in de keuken voor dit evenement? "Eigenlijk had ik 0 ervaring in een professionele keuken, dus het was anders dan thuis koken. Maar het was leerzaam en gaf me nieuwe inzichten in hoe een keuken draait tijdens een evenement."

Hoe was het om samen te werken met het team van De Tafelaar? "Het was heel leuk en anders dan wat ik normaal doe. Omdat je vier uur intensief samen werkt, krijg je het gevoel dat je elkaar echt leert kennen. Het voelde echt bijzonder om dit zo samen te doen."

Wat maakt het zo bijzonder om gasten aan één tafel te laten delen? "Het mooie was dat mensen echt beseften dat het gezellig kan zijn met vreemde mensen aan tafel. Vaak zijn we te individueel ingesteld, maar door iedereen samen te zetten, ontstonden leuke gesprekken en ontmoetingen. Het was bijzonder om te zien hoe mensen daar van genoten."

Zou je in de toekomst nog een avond als deze willen organiseren? "Ja, absoluut. Het was een geweldig ervaring en het voelde echt speciaal om iets te creëren dat mensen samenbrengt."`,
        category: "evenement",
        publishedAt: new Date("2026-02-12T12:00:00Z"),
    },
];

async function main() {
    // 1. Delete placeholder stories
    const deleted = await prisma.feedItem.deleteMany({
        where: { slug: { in: PLACEHOLDER_SLUGS } },
    });
    console.log(`Deleted ${deleted.count} placeholder stories`);

    // 2. Insert real stories
    for (const story of realStories) {
        await prisma.feedItem.upsert({
            where: { slug: story.slug },
            update: {
                title: story.title,
                body: story.body,
                category: story.category,
                publishedAt: story.publishedAt,
                type: story.type,
                media: "[]",
            },
            create: {
                slug: story.slug,
                type: story.type,
                title: story.title,
                body: story.body,
                category: story.category,
                publishedAt: story.publishedAt,
                media: "[]",
                sourceUrl: "",
            },
        });
        console.log(`  ✓ ${story.title}`);
    }

    console.log(`\nDone! Added ${realStories.length} real stories.`);
}

main().then(() => prisma.$disconnect());
