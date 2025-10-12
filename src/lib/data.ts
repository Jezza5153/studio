export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/filosofie", label: "Filosofie" },
  { href: "/producenten", label: "Producenten" },
  { href: "/reserveren", label: "Reserveren" },
];

export const homeContent = {
  hero: {
    headline: "Samen aan tafel. Kleine gerechten, grote gezelligheid.",
    subhead: "Ontdek onze shared dining ervaring, met liefde voor duurzame producten, en een passie voor borrel & bites.",
  },
  highlights: [
    { title: "Shared dining", description: "Deel & proef samen van onze met zorg bereide gerechtjes." },
    { title: "Lokale makers", description: "Onze kaas en charcuterie komen van de beste regionale leveranciers." },
    { title: "Duurzaam", description: "Wij koken met het seizoen mee en kiezen voor biologische ingrediënten." },
    { title: "Centrale locatie", description: "U vindt ons in het hart van Amersfoort, op Kamp 8." },
  ],
  howItWorks: {
    title: "Hoe het werkt",
    description: "Ongeveer drie van onze gerechtjes staan gelijk aan een goede avondmaaltijd. Voel je vrij om te mixen en matchen, of kies een van onze samengestelde planken voor een complete proeverij."
  },
  seasonalTeaser: {
    title: "Seizoens-specials",
    description: "Elk seizoen brengt nieuwe smaken. Vraag onze medewerkers naar de specials van het moment of houd ons krijtbord in de gaten!"
  }
};

export const menuContent = {
  // SHARING IS CARING / HET BEPROEFDE RECEPT (Starters & kleine gerechten)
  gerechtjes: [
    { name: "Gehaktballetjes", description: "Kalf – parmesan – bieslook", price: "20" },
    { name: "Bruschetta", description: "Knoflook – olijfolie – tomaat – focaccia", price: "20" },
    { name: "Vegan", description: "Beschrijf de ingrediënten en details (chef’s keuze)", price: "20" },
    { name: "Gevuld tomaatje", description: "Garnaal – cocktailsaus – tomaat", price: "20" },
    { name: "Peppadews", description: "Gegrilde paprika – roomkaas", price: "20" },
    { name: "Gevulde eitjes", description: "Mayonaise – bieslook", price: "20" },
    { name: "Bao bun", description: "Bao – brisket of tofu – sriracha-mayo", price: "20" },
    { name: "Carpaccio", description: "Rund – truffelmayo – parmesan", price: "20" },
    { name: "Biet tartaar", description: "Geitenkaas – walnoot – honing", price: "20" },
    { name: "Vitello tonnato", description: "Rund – tonijnmayonaise – kappertjes", price: "20" },
    { name: "Gerookte zalm", description: "Citroen – dille – komkommer", price: "20" },
    { name: "Caprese", description: "Tomaat – basilicum – mozzarella", price: "20" }
  ],

  // COMFORT – Het bekende comfort, de gezonde keuze
  comfort: [
    { name: "Jan zijn soepje", description: "Groenten van de buren – even vragen", price: "20" },
    { name: "Runder stoofpotje", description: "Ui – wortel – pastinaak", price: "20" },
    { name: "Ossobuco", description: "Polenta – gremolata", price: "20" },
    { name: "Courgettesoep", description: "Courgette – knoflook – ui – basilicum", price: "20" }
  ],

  // ZOETIGHEID (Desserts)
  zoet: [
    { name: "Appeltaartje", description: "Appel – caramel – amandel – slagroom", price: "20" },
    { name: "Parfait", description: "Fruit van nu – crumble", price: "20" },
    { name: "Dame Blanche", description: "Warme chocolade – vanille-ijs – slagroom", price: "20" },
    { name: "Crème brûlée", description: "Een Franse afscheid", price: "20" },
    // Optioneel extra zoals vermeld onder ‘De Tafelaar’
    { name: "Vanille-ijs of citroensorbet", description: "Supplement", price: "+2" }
  ],

  // KAZEN
  kazen: [
    // PDF noemt specifiek ‘Veluwnaartje’; overige kazen stonden niet uitgewerkt
    { name: "Veluwnaartje", description: "Walnoot – gepekeld bietje", price: "20" }
  ],

  // BORREL – CHARCUTERIE
  charcuterie: [
    { name: "Prosciutto", description: "Geconfijte knoflook – crouton", price: "20" },
    { name: "Venkelworstje", description: "Met venkel ‘shotje’", price: "20" },
    { name: "Spinata", description: "Parmesan – hazelnoot", price: "20" },
    { name: "Fuet", description: "Gepekeld dingetje", price: "20" }
  ],

  // PLANKJEUH – De Tafelaar
  planken: [
    { name: "Beetje van beiden", description: "2 Kaasjes – 2 Charcuterietjes", price: "34" },
    { name: "Flinke jongen", description: "3 Kaasjes – 3 Charcuterietjes – 3 Gerechtjes", price: "74" },
    { name: "Tafeltje dekken", description: "5 Kaasjes – 5 Charcuterietjes – 5 Gerechtjes", price: "115" },
    { name: "Kan niet kiezen", description: "6 Kaasjes – 6 Charcuterietjes – 8 Gerechtjes", price: "149" }
  ],

  // (Historische secties ‘bites’ uit je oude kaart zijn verwijderd i.v.m. PDF-indeling)
  bites: []
};

export const philosophyContent = {
  title: "Onze Filosofie",
  mission: {
    title: "Warm, gastvrij en eerlijk",
    text: "Bij Tafelaar geloven we in de kracht van samenzijn. Onze missie is simpel: een plek creëren waar je je thuis voelt, met gerechten die met zorg en aandacht zijn bereid. Kwaliteit staat bij ons boven ingewikkelde verhalen. We kiezen voor lokale en biologische producten omdat ze beter smaken en goed zijn voor onze omgeving. We gaan verspilling tegen door slim in te kopen en seizoensgericht te koken."
  },
  whySharedDining: {
    title: "Waarom shared dining?",
    text: "Shared dining is voor ons de meest sociale en ontspannen manier van eten. Het zorgt voor een rustige, continue stroom van gerechten uit de keuken, zonder de pieken van een traditioneel 3-gangenmenu. Dit maakt de ervaring voor iedereen aangenamer, van gast tot kok. Het nodigt uit tot proeven, delen en ontdekken, en maakt een avond uit toegankelijk en verrassend."
  }
};

export const producers = [
    { name: "Bastiaansen", location: "Bodegraven", description: "Ambachtelijke kaasmakers met een passie voor biologische geiten- en schapenkazen." },
    { name: "Oudwijker", location: "Lopikerkapel", description: "Specialisten in het maken van kazen met een Italiaanse flair, maar dan van Hollandse bodem." },
    { name: "Weerribben XO", location: "Delden", description: "Bekend om hun uitzonderlijke, langgerijpte Goudse kazen met een unieke kristalstructuur." },
    { name: "Remeker", location: "Lunteren", description: "Pioniers in natuurlijke landbouw, hun kazen van Jersey-koeien zijn puur en vol van smaak." },
    { name: "Gerrit Takke", location: "Utrecht", description: "Een meesterslager die traditionele, gedroogde worsten en vleeswaren maakt met een moderne twist." },
    { name: "De Slagerij", location: "Amersfoort", description: "Onze lokale held voor verse en ambachtelijke vleeswaren, met oog voor dierwelzijn." },
];

export const reservationFaq = [
    {
        question: "Wat zijn de openingstijden?",
        answer: "Wij zijn geopend van woensdag tot en met zondag, van 15:00 tot 23:00. Houd onze social media in de gaten voor speciale openingen, zoals onze maandelijkse maandagavond-pilot."
    },
    {
        question: "Kan ik met een dieet of allergie bij jullie terecht?",
        answer: "Jazeker! Geef uw dieetwensen of allergieën aan bij de reservering of aan onze medewerkers. We denken graag met u mee en hebben diverse opties."
    },
    {
        question: "Nemen jullie groepsreserveringen aan?",
        answer: "Ja, voor groepen hebben we speciale arrangementen. Neem telefonisch contact met ons op om de mogelijkheden te bespreken."
    },
    {
        question: "Zijn er kinderstoelen aanwezig?",
        answer: "We hebben een beperkt aantal kinderstoelen beschikbaar. Geef het even aan bij de reservering als u er een nodig heeft, dan zorgen we dat deze voor u klaarstaat."
    }
];

export const openingHours = {
    title: "Openingstijden",
    schedule: [
        { day: "Maandag", time: "Gesloten*", special: "1x per maand open, check Instagram" },
        { day: "Dinsdag", time: "Gesloten" },
        { day: "Woensdag", time: "15:00 – 23:00" },
        { day: "Donderdag", time: "15:00 – 23:00" },
        { day: "Vrijdag", time: "15:00 – 23:00" },
        { day: "Zaterdag", time: "15:00 – 23:00" },
        { day: "Zondag", time: "15:00 – 23:00" },
    ],
    footer: "* Momenteel draaien we een pilot om één maandag per maand open te zijn. De precieze datum wordt aangekondigd op onze Instagram-pagina."
}

export const contactDetails = {
    address: "Kamp 8, 3811 AR Amersfoort",
    phone: "+31 33 123 4567",
    email: "info@tafelaaramersfoort.nl",
    domain: "tafelaaramersfoort.nl"
}
