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
    { day: "Zondag", time: "15:00 - 23:00", special: "Lunch & Borrel" },
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
    author: "Het team van De Tafelaar",
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

export const producers = [
  {
    name: "Kaasboerderij Bastiaansen",
    location: "Leusden",
    description:
      "Levert ons een selectie van ambachtelijke, biologische kazen. Hun passie voor het vak proef je in elke hap.",
  },
  {
    name: "Slagerij Gerrit Takke",
    location: "Amersfoort",
    description:
      "Onze vertrouwde, lokale slager die zorgt voor het beste vlees en huisgemaakte charcuterie van topkwaliteit.",
  },
  {
    name: "De Verse Grond",
    location: "Bunschoten-Spakenburg",
    description:
      "Hier halen we onze dagverse, seizoensgebonden groenten. Duurzaam geteeld met respect voor de natuur.",
  },
];
