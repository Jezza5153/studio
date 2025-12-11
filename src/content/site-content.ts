// This file contains all the static text content for the website.
// By centralizing it here, we can easily manage and update site-wide content without touching the component files.

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/over-onze-makers", label: "Over Onze Makers" },
  { href: "/verhuur-en-groepen", label: "Verhuur en Groepen" },
  { href: "/impressie", label: "Impressie" },
  { href: "/contact", label: "Contact" },
];

export const contactDetails = {
  // Belangrijk: elke regel scheiden met "\n" zodat we hard afbreken in UI
  address: `De Tafelaar
Kamp 8
3811 AR Amersfoort`,
  phone: "+31 6 341 279 32",
  email: "reserveren@tafelaaramersfoort.nl",
  socials: {
    facebook: "https://www.facebook.com/people/Tafelaar-Amersfoort",
    instagram: "https://instagram.com/tafelaaramersfoort",
  },
};

export const openingHours = {
  title: "Openingstijden",
  schedule: [
    { day: "Maandag", time: "Gesloten" },
    { day: "Dinsdag", time: "Gesloten" },
    { day: "Woensdag", time: "17:00 - 23:00" },
    { day: "Donderdag", time: "17:00 - 23:00" },
    { day: "Vrijdag", time: "15:00 - 00:00" },
    { day: "Zaterdag", time: "15:00 - 00:00" },
    { day: "Zondag", time: "17:00 - 23:00", special: "Lunch & Borrel" },
  ],
  footer:
    "Let op: openingstijden kunnen afwijken tijdens feestdagen en evenementen.",
};

export const homeContent = {
  hero: {
    headline: "Samen aan tafel. Kleine gerechten, grote gezelligheid.",
    subhead:
      "Welkom bij De Tafelaar. Ontdek onze passie voor shared dining, duurzame, lokale ingrediënten en een onvergetelijke sfeer in hartje Amersfoort.",
  },
  highlights: [
    {
      title: "Shared dining",
      description:
        "Proef en deel een verscheidenheid aan kleine, seizoensgebonden gerechtjes.",
    },
    {
      title: "Lokale makers",
      description:
        "We werken samen met lokale boeren en producenten voor de verste smaken.",
    },
    {
      title: "Duurzaam",
      description:
        "Onze keuken is gericht op duurzaamheid, met respect voor mens en natuur.",
    },
    {
      title: "Centrale locatie",
      description:
        "Gevestigd in de historische binnenstad van Amersfoort, makkelijk bereikbaar.",
    },
  ],
  howItWorks: {
    title: "Hoe werkt het?",
    description:
      "Bij shared dining bestel je meerdere kleine gerechten die je deelt met je tafelgenoten. Zo kun je van alles proeven en samen een culinaire reis maken. We adviseren 2-3 gerechtjes per persoon om mee te beginnen. Ons team helpt je graag met kiezen!",
  },
  seasonalTeaser: {
    title: "Nieuw op de kaart: Lente! 🌷",
    description:
      "De lente is hier! Ontdek onze nieuwe seizoensgerechten met verse asperges, lam en rabarber. Perfect om te delen op ons zonnige terras.",
  },
};

export const reservationFaq = [
  {
    question: "Hoe werkt shared dining?",
    answer:
      "U bestelt diverse kleine gerechten van de kaart die in het midden van de tafel worden geplaatst, zodat iedereen kan proeven en delen. We raden 2-3 gerechten per persoon aan om mee te starten.",
  },
  {
    question: "Houden jullie rekening met dieetwensen of allergieën?",
    answer:
      "Jazeker. Geef uw dieetwensen of allergieën aan bij de reservering of aan uw tafel, dan kan onze keuken hier rekening mee houden. Veel van onze gerechten zijn aan te passen.",
  },
  {
    question: "Kan ik voor een grote groep reserveren?",
    answer:
      "Absoluut. Voor groepen vanaf 7 personen vragen we u om telefonisch of per e-mail contact met ons op te nemen, zodat we de mogelijkheden kunnen bespreken.",
  },
  {
    question: "Is het restaurant rolstoeltoegankelijk?",
    answer:
      "Ons restaurant is gelegen in een historisch pand en daardoor beperkt toegankelijk. Neem alstublieft contact met ons op voor meer informatie over de mogelijkheden.",
  },
];

// content/site-content.ts

export const philosophyContent = {
  title: "Over Ons",

  intro: {
    heading: "Welkom bij De Tafelaar",
    lead:
      "Bij De Tafelaar draait het om samen genieten: uit eten met vrienden, een avond uitgebreid tafelen of juist spontaan aanschuiven aan onze gezamenlijke tafel. Alles kan, niets hoeft.",
    body:
      "In het hart van Amersfoort hebben we een plek gecreëerd waar gezelligheid, goed eten en lokale betrokkenheid vanzelf samenkomen.",
  },

  etenEnDrinken: {
    title: "Eten & drinken",
    text: [
      "Onze menukaart bestaat uit kleine gerechten om te delen: charcuterie, kazen, klassiekers, warme en koude gerechtjes en seizoensspecials. Alles is bedoeld om samen te ontdekken.",
      "Kun je niet kiezen? Dan is onze Chef’s Choice een fijne start: een selectie van gerechten waar wij zelf blij van worden.",
      "Ook aan de bar houden we het dichtbij: Amersfoortse bieren, biologische wijnen van de wijnwinkel in de straat, biologische koffie en een drankkaart die past bij ons eten én onze sfeer.",
    ],
  },

  values: {
    title: "Waar we in geloven",
    intro:
      "Bij De Tafelaar draait alles om aandacht. Aandacht voor smaak, voor het product, voor duurzaamheid en voor onze gasten. Daarom kiezen we voor:",
    bullets: [
      "lokale en duurzame leveranciers",
      "eerlijke ingrediënten",
      "seizoensgebonden gerechten",
      "samenwerken met ondernemers uit de buurt",
      "een ontspannen shared-dining ervaring",
    ],
    outro:
      "We willen een plek zijn waar je je meteen thuis voelt, of je nu even binnenloopt of de hele avond blijft hangen.",
  },

  origin: {
    title: "Hoe het begon",
    text: [
      "De Tafelaar ontstond uit een liefde voor horeca en het simpele idee dat een tafel mensen bij elkaar brengt.",
      "Na jaren ervaring in verschillende zaken groeide het verlangen naar een eigen plek die warm, toegankelijk en écht is.",
      "Geen poeha, geen haast — maar een plek waar je rustig kunt zitten, kunt delen en kunt genieten. Een plek die voelt alsof je aanschuift aan een grote, gezellige tafel.",
    ],
  },

  why: {
    title: "Waarom we dit doen",
    text: [
      "Omdat tafelen verbindt.",
      "Omdat het delen van eten iets gezelligs en menselijks heeft.",
      "En omdat een fijne avond begint op een plek waar je je welkom voelt.",
      "We hopen dat je bij ons binnenstapt, aanschuift en vooral een ontspannen, lekkere avond hebt.",
    ],
  },

  cta: {
    title: "Kom langs",
    text:
      "Schuif aan, proef, deel en ervaar zelf wat De Tafelaar zo’n fijne plek maakt. Wij zorgen dat je welkom bent.",
  },

  // NEW: optional niceties (page renders fine without these)
  usps: ["Shared dining", "Lokaal & seizoensgebonden", "Warm & ontspannen"],
  quote: {
    text: "Geen poeha, geen haast — gewoon samen aan tafel. Dat is waar we het voor doen.",
    author: "Jan Molmans",
  },
  gallery: [
    // Map these to ids in your PlaceHolderImages
    { id: "philosophy-image" },
    { id: "kitchen-1" },
    { id: "dish-1" },
  ],
  ctaLinks: {
    reserve: "/reserveren",
    menu: "/menu",
  },

  // legacy fields (keep for other pages that might use them)
  mission: {
    title: "Missie: Samen Genieten",
    text:
      "Bij De Tafelaar geloven we dat eten een verbindende ervaring is. Onze missie is om een plek te creëren waar gasten samenkomen om niet alleen heerlijke gerechten, maar ook verhalen en momenten te delen. We streven naar een sfeer van 'grote gezelligheid' waarin iedereen zich welkom en op zijn gemak voelt.",
  },
  whySharedDining: {
    title: "Waarom Shared Dining?",
    text:
      "Shared dining doorbreekt de traditionele restaurant-ervaring. Het moedigt interactie aan, nodigt uit tot proeven en zorgt voor een dynamische, sociale maaltijd. Het is de perfecte manier om nieuwe smaken te ontdekken en samen een culinair avontuur te beleven, hapje voor hapje.",
  },
};
// content/site-content.ts

export type Maker = {
  slug: string;
  name: string;
  category: "Brouwerij" | "Koffie" | "Wijn" | "Vlees" | "Overig";
  location?: string;
  blurb: string;            // short card text
  story?: string[];         // long detail paragraphs
  website?: string;
  imageId?: string;         // id from PlaceHolderImages
};

export const makersIntro = {
  title: "Onze Makers",
  kicker: "Over onze makers",
  lead:
    "Bij De Tafelaar werken we het liefst met mensen en producten van dichtbij. Makers die met aandacht werken, houden van hun vak en staan voor kwaliteit. Van lokale brouwers tot duurzame en biologische leveranciers — zij maken een belangrijk deel uit van wat je bij ons proeft en drinkt.",
  cta:
    "Klik op een van de makers hieronder en leer hun verhaal kennen.",
};

export const makers: Maker[] = [
  {
    slug: "farmfields",
    name: "Farmfields",
    category: "Vlees",
    location: "Nederland",
    blurb:
      "Biologisch rundvlees met Beter Leven 4-sterren — herkomst, transparantie en dierenwelzijn voorop.",
    website: "https://farmfields.nl",
    imageId: "producer-farmfields",
    story: [
      "Farmfields is voor De Tafelaar een belangrijke partner als het gaat om eerlijk, duurzaam en bewust werken.",
      "Het vlees draagt het 4-sterren Beter Leven-keurmerk: ruimte, natuurlijk gedrag en maximale zorg in de hele keten.",
      "Korte ketens en vaste boeren zorgen voor balans tussen mens, dier en omgeving — dat proef je terug.",
      "Deze werkwijze sluit naadloos aan bij onze kernwaarden. Daarom vind je Farmfields met trots terug op onze kaart.",
    ],
  },
  {
    slug: "boot-koffie",
    name: "Boot Koffie",
    category: "Koffie",
    location: "Baarn",
    blurb:
      "Ambachtelijke, biologische koffie — zorgvuldig geselecteerd en gebrand met aandacht voor mens en milieu.",
    website: "https://www.bootkoffie.nl",
    imageId: "producer-boot",
    story: [
      "Boot Koffie staat voor kwaliteit, duurzaamheid en transparantie.",
      "De bonen worden met zorg gebrand zodat de natuurlijke smaken optimaal tot hun recht komen — puur zoals koffie bedoeld is.",
      "Past perfect bij De Tafelaar: biologisch, lokaal betrokken en met aandacht voor kwaliteit.",
    ],
  },
  {
    slug: "rock-city-brewing",
    name: "Rock City Brewing",
    category: "Brouwerij",
    location: "Amersfoort",
    blurb:
      "Eigenzinnige brouwerij waar craft en creativiteit samenkomen — van graankorrel tot glas.",
    website: "https://rockcitybrewing.com",
    imageId: "producer-rockcity",
    story: [
      "Rock City brouwt met aandacht en lef om te experimenteren.",
      "Kwaliteit, balans en beleving vormen de basis van elk bier.",
      "Ambacht, creativiteit en lokale betrokkenheid passen perfect bij wie wij zijn.",
    ],
  },
  {
    slug: "de-drie-ringen",
    name: "Stadsbrouwerij De Drie Ringen",
    category: "Brouwerij",
    location: "Amersfoort",
    blurb:
      "Historische stadsbrouwerij (1989 heropend) — traditie met een frisse blik.",
    website: "https://www.dedrieringen.nl",
    imageId: "producer-drieringen",
    story: [
      "Na het sluiten van Phoenix in 1969 verdween de brouwerstraditie, maar in 1989 werd De Drie Ringen heropend.",
      "Sinds 2021 geeft Hugo Langelaan een nieuw hoofdstuk aan de brouwerij: respect voor geschiedenis, ruimte voor innovatie.",
      "Rondleidingen, proeverijen en verhalen maken het tot een Amersfoorts icoon.",
    ],
  },
  {
    slug: "t-mirakel",
    name: "Brouwerij ’t Mirakel",
    category: "Brouwerij",
    location: "Amersfoort",
    blurb:
      "Kleine batches met karakter, geïnspireerd op het Mirakel van Amersfoort (1444).",
    website: "https://brouwerijmirakel.nl",
    imageId: "producer-mirakel",
    story: [
      "Zeven Amersfoorters bliezen het lokale mirakel nieuw leven in met ambachtelijke speciaalbieren.",
      "Bekende bieren: De Vondst en Lieve Vrouw — karaktervol, net als de stad.",
      "Past naadloos bij De Tafelaar: lokaal, smaakvol en met verhaal.",
    ],
  },
  {
    slug: "eem-bier",
    name: "Eem Bier",
    category: "Brouwerij",
    location: "Regio Amersfoort",
    blurb:
      "Nuchtere brouwerij vernoemd naar de rivier de Eem — doordrinkbaar, eerlijk en puur.",
    website: "https://eembier.nl",
    imageId: "producer-eem",
    story: [
      "Vakmanschap, balans en zuiverheid staan centraal.",
      "Herkenbare bieren die passen bij een goed gerecht én een gezellig moment.",
      "Lokale roots en eigen brouwhuis sluiten aan bij onze manier van werken.",
    ],
  },
  {
    slug: "korte-garde",
    name: "Korte Garde",
    category: "Wijn",
    location: "Amersfoort",
    blurb:
      "Biologische & natuurwijnen met verhaal — selectie op herkomst, stijl en match met onze keuken.",
    website: "https://kortegarde.nl",
    imageId: "producer-kortegarde",
    story: [
      "Sterke focus op kwaliteit, vakkennis en persoonlijk advies.",
      "Samen selecteren we wijnen die puur en verantwoord zijn gemaakt.",
      "De korte lijnen en gedeelde liefde voor mooie producten maken de samenwerking vanzelfsprekend.",
    ],
  },
];

