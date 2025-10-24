// This file contains all the static text content for the website.
// By centralizing it here, we can easily manage and update site-wide content without touching the component files.

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/filosofie", label: "Filosofie" },
  { href: "/openingstijden", label: "Openingstijden" },
];

export const contactDetails = {
  // Belangrijk: elke regel scheiden met "\n" zodat we hard afbreken in UI
  address: `De Tafelaar
Kamp 8
3811 AR Amersfoort`,
  phone: "+31 6 341 279 32",
  email: "info@tafelaaramersfoort.nl",
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

export const philosophyContent = {
  title: "Onze Filosofie",
  mission: {
    title: "Missie: Samen Genieten",
    text: "Bij De Tafelaar geloven we dat eten een verbindende ervaring is. Onze missie is om een plek te creëren waar gasten samenkomen om niet alleen heerlijke gerechten, maar ook verhalen en momenten te delen. We streven naar een sfeer van 'grote gezelligheid' waarin iedereen zich welkom en op zijn gemak voelt.",
  },
  whySharedDining: {
    title: "Waarom Shared Dining?",
    text: "Shared dining doorbreekt de traditionele restaurant-ervaring. Het moedigt interactie aan, nodigt uit tot proeven en zorgt voor een dynamische, sociale maaltijd. Het is de perfecte manier om nieuwe smaken te ontdekken en samen een culinair avontuur te beleven, hapje voor hapje.",
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
