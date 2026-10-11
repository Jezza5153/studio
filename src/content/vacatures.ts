// Vacatures van De Tafelaar. Tekst aanpassen? Alleen dit bestand: /vacatures en /vacatures/[slug] lezen hieruit.
// Vacature weghalen = het blok verwijderen (de pagina verdwijnt dan ook uit de sitemap en uit Google Jobs).
// Zet `bijgewerkt` op de datum van je laatste wijziging; Google en AI-zoekmachines kijken naar versheid.

export const VACATURES_BIJGEWERKT = "2026-10-11";

export type Vacature = {
  slug: string;
  titel: string;
  /** Korte omschrijving voor de lijst en de meta description (max ~150 tekens). */
  samenvatting: string;
  dienstverband: string;
  uren: string;
  dagen: string;
  /** Voor Google Jobs (schema.org JobPosting) */
  employmentType: ("PART_TIME" | "FULL_TIME")[];
  /** Geen ervaring of opleiding nodig: Google Jobs toont dit als filter. */
  zonderErvaring: boolean;
  /** Bruto uurloon volgens de horeca-cao; Google Jobs toont vacatures met salaris prominenter. */
  salaris?: { min: number; max?: number; tekst: string };
  /** Gevraagde ervaring, in het overzichtsblok en de kop van de vacaturepagina */
  ervaring: string;
  afbeelding: { src: string; alt: string };
  intro: string;
  doen: string[];
  zoeken: string[];
  bieden: string[];
  /** JJJJ-MM-DD; validThrough is de datum tot wanneer de vacature open staat */
  datePosted: string;
  validThrough: string;
};

const WERKDAGEN = "Donderdagavond en vrijdag t/m zondag vanaf 15:00";

// Horeca-cao loontabel per 1 juli 2026: basisloon functiegroep V (20 jaar of ouder) is €15,21 per uur.
// Bediening (functiegroep III, cao-minimum €14,99) krijgt bewust hetzelfde startloon.
const STARTLOON = { min: 15.21, tekst: "Vanaf €15,21 bruto per uur (21 jaar of ouder), volgens de horeca-cao" };

export const vacatures: Vacature[] = [
  {
    slug: "medewerker-bediening",
    titel: "Medewerker bediening",
    samenvatting:
      "Parttime in de bediening op de Kamp in Amersfoort centrum, vanaf €15,21 per uur. Ervaring is fijn, gastvrijheid is belangrijker.",
    dienstverband: "Parttime",
    uren: "12 tot 24 uur per week",
    dagen: WERKDAGEN,
    employmentType: ["PART_TIME"],
    zonderErvaring: true,
    ervaring: "Niet nodig, we leren je alles",
    salaris: STARTLOON,
    afbeelding: { src: "/pics/gasten-bar.jpg", alt: "Het team van De Tafelaar serveert gasten aan de bar" },
    intro:
      "Jij bent het gezicht van De Tafelaar. Je ontvangt gasten, legt uit hoe shared dining werkt, adviseert over de kaart en de lokale bieren en wijnen, en zorgt dat een tafel vanzelf een avond wordt.",
    doen: [
      "Gasten ontvangen en helpen bij het samenstellen van hun tafel",
      "Gerechten en dranken serveren en het verhaal van onze makers vertellen",
      "Samen met het team de zaak netjes en gezellig houden, van mise en place tot afsluiten",
    ],
    zoeken: [
      "Ervaring in de bediening is fijn, een open en gastvrije instelling is belangrijker",
      "Beschikbaar op donderdagavond en in het weekend (vrijdag t/m zondag vanaf 15:00)",
      "Je spreekt goed Nederlands en houdt van lekker eten",
    ],
    bieden: [
      "Vanaf €15,21 bruto per uur (21 jaar of ouder), volgens de horeca-cao",
      "Een klein, hecht team en korte lijnen met de eigenaren",
      "Vaste vrije dagen: op maandag, dinsdag en woensdag is de zaak dicht",
      "Een personeelsmaaltijd en de kans om de hele kaart te leren proeven",
    ],
    datePosted: "2026-10-11",
    validThrough: "2027-01-31",
  },
  {
    slug: "assistent-leidinggevende",
    titel: "Assistent leidinggevende",
    samenvatting:
      "Assistant restaurant manager: je stuurt de bediening aan tijdens de service, op de Kamp in Amersfoort centrum. Vanaf €15,21 per uur.",
    dienstverband: "Parttime of fulltime",
    uren: "24 uur of meer per week, in overleg",
    dagen: WERKDAGEN,
    employmentType: ["PART_TIME", "FULL_TIME"],
    zonderErvaring: false,
    ervaring: "Een paar jaar ervaring in de bediening, liefst met leidinggeven",
    salaris: STARTLOON,
    afbeelding: { src: "/pics/hero-gasten.jpg", alt: "Gasten aan tafel en het team in de bediening bij De Tafelaar" },
    intro:
      "Als assistent leidinggevende ben je de rechterhand van de eigenaren Jan en Sabine. Tijdens de service stuur je het team in de bediening aan, zorg je dat gasten zich welkom voelen en dat de avond soepel loopt, en spring je zelf bij waar het nodig is.",
    doen: [
      "Het team in de bediening aansturen tijdens de service en zelf meewerken op de vloer",
      "Roosters maken, taken verdelen en nieuwe collega's inwerken",
      "De zaak openen en afsluiten, inclusief kassa en dagafsluiting",
      "Gasten, groepen en reserveringen ontvangen en groepsaanvragen afhandelen",
      "Meedenken over de kaart, de drankenkaart en hoe het nog beter kan",
    ],
    zoeken: [
      "Een paar jaar ervaring in de bediening, liefst ook als leidinggevende of shiftleader",
      "Overzicht en rust als het druk is, en een gastvrije houding",
      "Beschikbaar op donderdagavond en in het weekend (vrijdag t/m zondag vanaf 15:00)",
      "Je spreekt goed Nederlands; een Verklaring Sociale Hygiëne is een pre",
    ],
    bieden: [
      "Vanaf €15,21 bruto per uur (21 jaar of ouder), volgens de horeca-cao, afhankelijk van ervaring",
      "Verantwoordelijkheid en ruimte om mee te bouwen aan een jonge zaak met een eigen concept",
      "Vaste vrije dagen: op maandag, dinsdag en woensdag is de zaak dicht",
      "Korte lijnen met de eigenaren en een personeelsmaaltijd tijdens je dienst",
    ],
    datePosted: "2026-10-11",
    validThrough: "2027-01-31",
  },
  {
    slug: "zelfstandig-werkend-kok",
    titel: "Zelfstandig werkend kok",
    samenvatting:
      "Koken in een open keuken met lokale seizoensproducten en gerechten om te delen. Vanaf €15,21 per uur, parttime of fulltime, Amersfoort centrum.",
    dienstverband: "Parttime of fulltime",
    uren: "24 uur of meer per week, in overleg",
    dagen: `${WERKDAGEN}, in overleg ook overdag voor catering`,
    employmentType: ["PART_TIME", "FULL_TIME"],
    zonderErvaring: false,
    ervaring: "Een koksopleiding of een paar jaar keukenervaring",
    salaris: STARTLOON,
    afbeelding: { src: "/pics/gerecht-boven.jpg", alt: "Seizoensgerecht om te delen uit de keuken van De Tafelaar" },
    intro:
      "In onze open keuken kook je gerechten die zijn samengesteld om te delen, met producten van makers uit de regio. De kaart beweegt mee met het seizoen, dus je krijgt ruimte om mee te denken.",
    doen: [
      "Mise en place en service draaien in een compacte keuken",
      "Meedenken over de seizoenskaart en het Chef's Choice arrangement",
      "Werken met verse producten van lokale boeren, brouwers en makers",
    ],
    zoeken: [
      "Een afgeronde koksopleiding of een paar jaar ervaring in een goede keuken",
      "Zelfstandig, netjes en rustig als het druk is",
      "Beschikbaar van donderdag t/m zondag, in overleg ook overdag voor catering",
    ],
    bieden: [
      "Vanaf €15,21 bruto per uur (21 jaar of ouder), volgens de horeca-cao, afhankelijk van ervaring",
      "Een keuken zonder franje waar smaak en product vooropstaan",
      "Vaste vrije dagen: op maandag, dinsdag en woensdag is de zaak dicht",
      "Werken naast een chef met ervaring in high-end keukens in Nederland en Australië",
    ],
    datePosted: "2026-10-11",
    validThrough: "2027-01-31",
  },
  {
    slug: "afwasser-keukenhulp",
    titel: "Afwasser / keukenhulp",
    samenvatting:
      "Bijbaan in de keuken, vooral in het weekend. Geen ervaring nodig, vanaf 16 jaar. Goed te combineren met school of studie.",
    dienstverband: "Bijbaan",
    uren: "8 tot 16 uur per week",
    dagen: "Vooral vrijdag t/m zondag vanaf 15:00",
    employmentType: ["PART_TIME"],
    zonderErvaring: true,
    ervaring: "Niet nodig, we leren je alles",
    afbeelding: { src: "/pics/huiskamer-vol.jpg", alt: "De volle huiskamer van De Tafelaar met de open keuken achterin" },
    intro:
      "Handen uit de mouwen in de keuken: afwassen, schoonmaken en de koks helpen met voorbereiden. Ideaal als bijbaan naast school of studie.",
    doen: [
      "De afwas en de keuken schoon en op orde houden tijdens en na de service",
      "De koks helpen met snijden, voorbereiden en opruimen",
      "Meedraaien in een klein team waar iedereen elkaar helpt",
    ],
    zoeken: [
      "Minimaal 16 jaar en beschikbaar in het weekend",
      "Een aanpakker die het niet erg vindt om vies te worden",
      "Ervaring is niet nodig, we leren je alles",
    ],
    bieden: [
      "Salaris volgens de horeca-cao",
      "Vaste dagen in overleg, goed te combineren met school of studie",
      "Een gezellig team en een warme maaltijd tijdens je dienst",
    ],
    datePosted: "2026-10-11",
    validThrough: "2027-01-31",
  },
];

export function getVacature(slug: string) {
  return vacatures.find((v) => v.slug === slug);
}

export const waaromTafelaar = [
  {
    titel: "Klein en hecht team",
    tekst: "Geen grote keten, maar een restaurant van Jan, Sabine en chef Jeremy. Je werkt direct met de mensen die de zaak runnen.",
  },
  {
    titel: "Lokaal en seizoensgebonden",
    tekst: "Producten van makers uit Amersfoort en omstreken, een kaart die meebeweegt met het seizoen. Je leert elke week iets nieuws over eten en drinken.",
  },
  {
    titel: "Vaste vrije dagen",
    tekst: "We zijn open van donderdag t/m zondag. Maandag, dinsdag en woensdag is de zaak dicht, dus dan ben jij ook vrij.",
  },
  {
    titel: "Shared dining is teamwerk",
    tekst: "Gasten delen alles aan tafel en wij delen het werk. Keuken en bediening lopen in elkaar over, en je krijgt ruimte om te groeien.",
  },
];

export const vacatureFaqs = [
  {
    question: "Welke vacatures heeft De Tafelaar in Amersfoort?",
    answer:
      "De Tafelaar zoekt een medewerker bediening (parttime), een assistent leidinggevende (assistant restaurant manager), een zelfstandig werkend kok (parttime of fulltime) en een afwasser/keukenhulp (bijbaan, vooral in het weekend). Een open sollicitatie is ook welkom. Het restaurant zit op de Kamp 8 in Amersfoort centrum.",
  },
  {
    question: "Kan ik ook zonder ervaring bij De Tafelaar werken?",
    answer:
      "Ja. Voor de bediening en als afwasser/keukenhulp is een gastvrije, nuchtere instelling belangrijker dan ervaring. We leren je de kaart, de makers en onze manier van werken. Voor zelfstandig werkend kok vragen we een opleiding of een paar jaar keukenervaring, en voor assistent leidinggevende een paar jaar ervaring in de bediening.",
  },
  {
    question: "Op welke dagen werk je bij De Tafelaar?",
    answer:
      "We zijn open op donderdag van 17:00 tot 23:00, op vrijdag en zaterdag van 15:00 tot 00:00 en op zondag van 15:00 tot 23:00. Maandag, dinsdag en woensdag is de zaak gesloten. Je rooster spreken we samen af.",
  },
  {
    question: "Wat verdien je bij De Tafelaar?",
    answer:
      "We betalen volgens de horeca-cao. In de bediening, als assistent leidinggevende en als zelfstandig werkend kok verdien je vanaf €15,21 bruto per uur (21 jaar of ouder), daarboven afhankelijk van ervaring. Voor de afwas en keukenhulp hangt het uurloon af van je leeftijd; dat bespreken we in het eerste gesprek. Tijdens je dienst eet je mee.",
  },
  {
    question: "Hoe solliciteer ik bij De Tafelaar?",
    answer:
      "Mail een korte introductie (wie je bent, wat je zoekt en wanneer je beschikbaar bent) naar reserveren@tafelaaramersfoort.nl met de functie in het onderwerp. Bellen of gewoon even binnenlopen op de Kamp 8 mag ook. We nodigen je dan uit voor een kop koffie en een proefdienst.",
  },
  {
    question: "Zoeken jullie ook stagiairs?",
    answer:
      "Een stage in de keuken of de bediening is bespreekbaar. Stuur je vraag met opleiding en periode naar reserveren@tafelaaramersfoort.nl, dan kijken we wat past.",
  },
];

export const sollicitatieStappen = [
  {
    titel: "Mail, bel of loop binnen",
    tekst: "Een korte mail is genoeg. Bellen of even langskomen op de Kamp 8 (donderdag t/m zondag) mag ook.",
  },
  {
    titel: "Koffie op de Kamp",
    tekst: "We drinken een kop koffie, laten de zaak zien en vertellen hoe wij werken. Jij vertelt wat je zoekt.",
  },
  {
    titel: "Proefdienst",
    tekst: "Je draait een dienst mee, zodat we allebei weten of het klikt. Daarna maken we afspraken over uren en start.",
  },
];
