// Vacatures van De Tafelaar. Tekst aanpassen? Alleen dit bestand; de pagina /vacatures leest hieruit.
// Een vacature weghalen = het blok verwijderen. Zonder vacatures toont de pagina alleen de open sollicitatie.

export type Vacature = {
  slug: string;
  titel: string;
  dienstverband: string;
  uren: string;
  /** Voor Google Jobs (schema.org JobPosting) */
  employmentType: ("PART_TIME" | "FULL_TIME")[];
  intro: string;
  doen: string[];
  zoeken: string[];
  bieden: string[];
  /** JJJJ-MM-DD; validThrough is de datum tot wanneer de vacature open staat */
  datePosted: string;
  validThrough: string;
};

export const vacatures: Vacature[] = [
  {
    slug: "medewerker-bediening",
    titel: "Medewerker bediening",
    dienstverband: "Parttime",
    uren: "12 tot 24 uur per week, avonden en weekenden",
    employmentType: ["PART_TIME"],
    intro:
      "Jij bent het gezicht van De Tafelaar. Je ontvangt gasten, legt uit hoe shared dining werkt, adviseert over de kaart en de lokale bieren en wijnen, en zorgt dat een tafel vanzelf een avond wordt.",
    doen: [
      "Gasten ontvangen en helpen bij het samenstellen van hun tafel",
      "Gerechten en dranken serveren en het verhaal van onze makers vertellen",
      "Samen met het team de zaak netjes en gezellig houden, van mise en place tot afsluiten",
    ],
    zoeken: [
      "Ervaring in de bediening is fijn, een open en gastvrije instelling is belangrijker",
      "Beschikbaar op avonden van woensdag t/m zondag en in het weekend ook overdag voor de lunch",
      "Je spreekt goed Nederlands en houdt van lekker eten",
    ],
    bieden: [
      "Salaris volgens de horeca-cao, afhankelijk van leeftijd en ervaring",
      "Een klein, hecht team en korte lijnen met de eigenaren",
      "Maandag en dinsdag zijn we gesloten, dus twee vaste vrije dagen",
      "Een personeelsmaaltijd en de kans om de hele kaart te leren proeven",
    ],
    datePosted: "2026-09-22",
    validThrough: "2026-12-31",
  },
  {
    slug: "zelfstandig-werkend-kok",
    titel: "Zelfstandig werkend kok",
    dienstverband: "Parttime of fulltime",
    uren: "24 tot 38 uur per week",
    employmentType: ["PART_TIME", "FULL_TIME"],
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
      "Beschikbaar van woensdag t/m zondag, in overleg ook overdag voor lunch en catering",
    ],
    bieden: [
      "Salaris volgens de horeca-cao, afhankelijk van ervaring",
      "Een keuken zonder franje waar smaak en product vooropstaan",
      "Twee vaste vrije dagen: maandag en dinsdag",
      "Werken naast een chef met ervaring in high-end keukens in Nederland en Australië",
    ],
    datePosted: "2026-09-22",
    validThrough: "2026-12-31",
  },
  {
    slug: "afwasser-keukenhulp",
    titel: "Afwasser / keukenhulp",
    dienstverband: "Weekend en bijbaan",
    uren: "8 tot 16 uur per week, vooral vrijdag t/m zondag",
    employmentType: ["PART_TIME"],
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
    datePosted: "2026-09-22",
    validThrough: "2026-12-31",
  },
];

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
    titel: "Twee vaste vrije dagen",
    tekst: "We zijn open van woensdag t/m zondag. Maandag en dinsdag is de zaak dicht, dus die dagen ben jij ook vrij.",
  },
  {
    titel: "Shared dining is teamwerk",
    tekst: "Gasten delen alles aan tafel en wij delen het werk. Keuken en bediening lopen in elkaar over, en je krijgt ruimte om te groeien.",
  },
];

export const vacatureFaqs = [
  {
    question: "Kan ik ook zonder ervaring bij De Tafelaar werken?",
    answer:
      "Ja. Voor de bediening en als keukenhulp is een gastvrije, nuchtere instelling belangrijker dan ervaring. We leren je de kaart, de makers en onze manier van werken. Voor de functie van zelfstandig werkend kok vragen we wel een opleiding of een paar jaar keukenervaring.",
  },
  {
    question: "Op welke dagen werk je bij De Tafelaar?",
    answer:
      "We zijn open van woensdag t/m zondag: woensdag en donderdag vanaf 17:00, vrijdag t/m zondag vanaf 11:00 voor lunch, borrel en diner. Maandag en dinsdag is de zaak gesloten. Je rooster spreken we samen af.",
  },
  {
    question: "Hoe solliciteer ik?",
    answer:
      "Mail een korte introductie (wie je bent, wat je zoekt en wanneer je beschikbaar bent) naar reserveren@tafelaaramersfoort.nl met de functie in het onderwerp. Bellen of gewoon even binnenlopen op de Kamp 8 mag ook. We nodigen je dan uit voor een kop koffie en een proefdienst.",
  },
  {
    question: "Zoeken jullie ook stagiairs?",
    answer:
      "Een stage in de keuken of de bediening is bespreekbaar. Stuur je vraag met opleiding en periode naar reserveren@tafelaaramersfoort.nl, dan kijken we wat past.",
  },
];
