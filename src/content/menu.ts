/* eslint-disable */
// This is the single source of truth for the menu.
// To update the menu, edit this file directly.

export const __MENU_DEBUG_SOURCE = ">>> USING src/content/menu.ts <<<";

export type MenuItem = {
  name: string;
  description?: string | null;
  price: number | null;
  tags: string[];
  allergens: string[]; // Gebruik "lactose" i.p.v. "melk"
  /** Optional internal grouping key — never rendered publicly. Lets us link
   *  the lunch + diner version of the same dish (e.g. both "De Klassiekelaar"
   *  and dinner "Vitello Tonnato" share baseDishKey: "vitello-tonnato").
   *  Editorial copy / price stay independent. */
  baseDishKey?: string;
  /** Optional inline badge on the row, e.g. "Vanaf 2 personen". */
  badge?: string;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
  /** Optional sub-heading shown beneath the category title
   *  (e.g. Broodjes: "Broodkeuze: desembrood of maïsbrood"). */
  note?: string;
};

export type MenuData = {
  title: string;
  currency: string;
  categories: MenuCategory[];
};

export const DINNER_MENU: MenuData = {
  title: "Dinerkaart",
  currency: "EUR",
  categories: [
    // 1) ARRANGEMENTEN
    {
      name: "Arrangementen",
      items: [
        {
          name: "Lekker Borrelen",
          description: "Een leuk charcuterie- en kaasplankje (p.p.)",
          price: 12.5,
          tags: [],
          allergens: ["lactose", "gluten", "noten"],
        },
        {
          name: "Chef’s Choice",
          description: "Uitgebreid genieten",
          price: 45,
          tags: [],
          allergens: [],
        },
        {
          name: "Bijpassend wijnarrangement",
          description: "Bij Chef’s Choice",
          price: 28,
          tags: [],
          allergens: [],
        },
      ],
    },

    // 2) KAZEN
    {
      name: "Kazen",
      items: [
        {
          name: "Geitenbrie",
          description: "Vijgenchutney · Sfoglie",
          price: 7,
          tags: ["V"],
          allergens: ["lactose", "gluten"],
        },
        {
          name: "Hoeve Goud Intens",
          description: "Biermosterd · Dadelbrood",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "gluten", "noten"],
        },
        {
          name: "Oudwijker Fiore",
          description: "Biermosterd · Dadelbrood",
          price: 8.5,
          tags: ["V"],
          allergens: ["lactose", "gluten", "mosterd"],
        },
        {
          name: "Manchego",
          description: "Geroosterde notenmix · Biermosterd",
          price: 9,
          tags: ["V"],
          allergens: ["lactose", "noten", "mosterd"],
        },
        {
          name: "Arcadia Blauw",
          description: "Vijgencompote · Sfoglie",
          price: 8.5,
          tags: ["V"],
          allergens: ["lactose", "gluten"],
        },
      ],
    },

    // 3) CHARCUTERIE
    {
      name: "Charcuterie",
      items: [
        {
          name: "Veluwnaartje",
          description: "Biologisch rundvlees · Kesbeke smuluitjes",
          price: 7,
          tags: [],
          allergens: [],
        },
        {
          name: "Venkelworstje",
          description: "Biologisch rundvlees · Kesbeke cornichon",
          price: 7,
          tags: [],
          allergens: [],
        },
        {
          name: "Serrano ham",
          description: "Handgesneden · Geconfijte knoflook · Croutons",
          price: 8,
          tags: [],
          allergens: ["gluten"],
        },
        {
          name: "Peperworstje",
          description: "Biologisch rundvlees · Kesbeke cornichon",
          price: 7,
          tags: [],
          allergens: [],
        },
        {
          name: "Gedroogde Twentse Worst",
          description: "Kesbeke cornichon",
          price: 6.5,
          tags: [],
          allergens: [],
        },
      ],
    },

    // 4) BORREL
    {
      name: "Borrel",
      items: [
        {
          name: "Peppadews",
          description: "Gevulde pepertjes met roomkaas",
          price: 6.5,
          tags: ["V"],
          allergens: ["lactose"],
        },
        {
          name: "Olijven",
          description: "In De Tafelaar kruidenmix",
          price: 4.5,
          tags: ["VG"],
          allergens: [],
        },
        {
          name: "Gerookte Notenmix",
          description: "Huisgemaakte notenmix",
          price: 3.5,
          tags: ["VG"],
          allergens: ["noten"],
        },
      ],
    },

    // 5) KOUD
    {
      name: "Koud",
      items: [
        {
          name: "Carpaccio van Bieten",
          description: "Geitenkaas · Walnoot · Honing",
          price: 9,
          tags: ["V"],
          allergens: ["lactose", "noten"],
        },
        {
          name: "Bruschetta",
          description: "Knoflook · Olijfolie · Tomaat · 3 stuks (+1 €3)",
          price: 9,
          tags: ["VG"],
          allergens: ["gluten"],
        },
        {
          name: "Gevulde Eitjes",
          description: "Mayonaise · Bieslook · 3 stuks (+1 €2,50)",
          price: 7.5,
          tags: ["V"],
          allergens: ["ei", "ui"],
        },
        {
          name: "Broodplankje",
          description: "Met wisselende dips",
          price: 6.5,
          tags: [],
          allergens: [],
        },
      ],
    },

    // 6) KLASSIEKERS
    {
      name: "Klassiekers",
      items: [
        {
          name: "Vitello Tonnato",
          description: "Biologisch kalfsvlees · Tonijnmayonaise · Kappertjes",
          price: 12.5,
          tags: [],
          allergens: ["vis", "ei"],
        },
        {
          name: "Carpaccio",
          description: "Biologisch rundvlees · Truffelmayonaise · Parmezaan",
          price: 12.5,
          tags: [],
          allergens: ["lactose", "ei"],
        },
        {
          name: "Gerookte Zalm",
          description: "Citroen · Dille · Komkommer",
          price: 11.5,
          tags: [],
          allergens: ["vis"],
        },
      ],
    },

    // 7) WARM (8)
    {
      name: "Warm",
      items: [
        {
          name: "Ossobuco",
          description: "Polenta · Gremolata",
          price: 12.5,
          tags: [],
          allergens: ["lactose"],
        },
        {
          name: "Japanse curry",
          description: "Seizoensgroente · Curry · Udon noodles",
          price: 11.5,
          tags: ["VG"],
          allergens: ["gluten", "soja"],
        },
        {
          name: "Bao Bun Pulled Pork",
          description: "Bao · Pulled pork · Sriracha mayonaise · 3 stuks (+1 €3,75)",
          price: 11.5,
          tags: [],
          allergens: ["gluten", "soja", "ei"],
        },
        {
          name: "Bao Bun Inari",
          description: "Bao · Inari · Sriracha mayonaise · 3 stuks (+1 €3,75)",
          price: 11.5,
          tags: ["V"],
          allergens: ["gluten", "soja", "ei"],
        },
        {
          name: "Kippenvleugels",
          description: "Sticky wings · Knoflook crumble",
          price: 10.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Spare Ribs",
          description: "Van het bot vallend · Sweet and Spicy",
          price: 11.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch kalfsvlees · Parmezaan · Tomatensaus",
          price: 9.5,
          tags: [],
          allergens: ["gluten", "ei"],
        },
        {
          name: "Gehackte balletjes",
          description: "Van De Vegetarische Slager · Tomatensaus",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
      ],
    },

    // 8) DESSERT (6)
    {
      name: "Dessert",
      items: [
        {
          name: "Dame Blanche",
          description: "Warme chocolade · vanille-ijs · slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose"],
          baseDishKey: "dame-blanche",
        },
        {
          name: "Parfait",
          description: "Vanille · salted caramel",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "ei"],
          baseDishKey: "parfait",
        },
        {
          name: "Dessertje van de week",
          description: "Vraag de bediening voor meer informatie",
          price: 7.5,
          tags: [],
          allergens: ["lactose", "noten", "gluten"],
          baseDishKey: "dessertje-van-de-week",
        },
        {
          name: "Snicker",
          description: "Snicker, maar dan vegan.",
          price: 7.5,
          tags: ["VG"],
          allergens: ["pinda", "noten"],
          baseDishKey: "snicker",
        },
        {
          name: "Extra",
          description: "Keuze uit vanille-ijs of citroensorbet",
          price: 2,
          tags: ["V"],
          allergens: ["lactose"],
        },
        {
          name: "Kaasplankje",
          description: "Selectie van 3 verschillende kazen",
          price: 15,
          tags: [],
          allergens: ["lactose", "gluten", "ei", "noten"],
          baseDishKey: "kaasplankje",
        },
      ],
    },
  ],
};

// Backwards-compatible alias — existing imports (`import { MENU } from
// "@/content/menu"`) continue to work and resolve to the diner menu.
export const MENU: MenuData = DINNER_MENU;

// =========================================================================
// LUNCHKAART
// =========================================================================
// Source: /Users/jezza/Documents/Tafelaar_Lunchkaart_2.pdf
//
// TODO(owner-confirm): All lunch tags/allergens below are INFERRED from
// the matching dinner items (e.g. lunch Bao Buns reuse the gluten/soja/ei
// signature from the dinner Bao Bun row). Verify each row with the chef
// before serving guests with allergies. Wrong allergen info is worse than
// missing info — when in doubt, clear the field and we surface the
// "Heeft u een allergie?" footer prompt instead.
// =========================================================================
export const LUNCH_MENU: MenuData = {
  title: "Lunchkaart",
  currency: "EUR",
  categories: [
    // 1) BROODJES
    {
      name: "Broodjes",
      note: "Broodkeuze: desembrood of maïsbrood",
      items: [
        {
          name: "De Rauwe Tafelaar",
          description: "Carpaccio · parmezaan · truffelmayonaise · rucola",
          price: 15,
          tags: [],
          allergens: ["gluten", "lactose", "ei"],
          baseDishKey: "carpaccio",
        },
        {
          name: "De Klassiekelaar",
          description: "Vitello tonnato · kalfsvlees · tonijnmayo · kappertjes · rucola",
          price: 15,
          tags: [],
          allergens: ["gluten", "vis", "ei"],
          baseDishKey: "vitello-tonnato",
        },
        {
          name: "De Hengelaar",
          description: "Gerookte zalm · komkommer · dille en nori-mayonaise",
          price: 15,
          tags: [],
          allergens: ["gluten", "vis", "ei"],
          baseDishKey: "gerookte-zalm",
        },
        {
          name: "De Bietelaar",
          description: "Rode biet · geitenkaas · honing · walnoot en appel",
          price: 14,
          tags: ["V"],
          allergens: ["gluten", "lactose", "noten"],
          baseDishKey: "biet-geitenkaas",
        },
        {
          name: "De Kaaskop",
          description: "Oude kaas met biermosterd",
          price: 13.5,
          tags: ["V"],
          allergens: ["gluten", "lactose", "mosterd"],
        },
        {
          name: "De Oudwijkenaar",
          description: "Fiore kaas · huisgemaakte vijgenchutney · balsamico · rucola",
          price: 15,
          tags: ["V"],
          allergens: ["gluten", "lactose"],
          baseDishKey: "fiore-vijgen",
        },
      ],
    },

    // 2) SALADES
    {
      name: "Salades",
      items: [
        {
          name: "Mediterrane Salade",
          description: "Olijven · cherrytomaatjes en rucola",
          price: 16,
          tags: ["VG", "GF"],
          allergens: [],
        },
        {
          name: "De Rauwe Tafelaar",
          description: "Carpaccio · parmezaan · truffelmayonaise · pijnboompitten · little gems",
          price: 15,
          tags: ["GF"],
          allergens: ["lactose", "ei", "noten"],
          baseDishKey: "carpaccio",
        },
        {
          name: "De Klassiekelaar",
          description: "Vitello tonnato met kalfsvlees · tonijnmayonaise · kappertjes · little gems",
          price: 15,
          tags: ["GF"],
          allergens: ["vis", "ei"],
          baseDishKey: "vitello-tonnato",
        },
        {
          name: "De Hengelaar",
          description: "Gerookte zalm · gemarineerde komkommer · dille · nori-mayo · little gems",
          price: 15,
          tags: ["GF"],
          allergens: ["vis", "ei"],
          baseDishKey: "gerookte-zalm",
        },
        {
          name: "De Bietelaar",
          description: "Rode biet · geitenkaas · honing · walnoot · appel · little gems",
          price: 14,
          tags: ["V", "GF"],
          allergens: ["lactose", "noten"],
          baseDishKey: "biet-geitenkaas",
        },
      ],
    },

    // 3) OM TE DELEN
    {
      name: "Om Te Delen",
      items: [
        {
          name: "De Echte Tafelaarsplank",
          description: "Een plank met lunchgerechtjes, broodjes, salade en warme hapjes — vanaf 2 personen.",
          price: 18.5,
          tags: [],
          allergens: ["gluten", "lactose", "ei", "vis", "noten"],
          badge: "Vanaf 2 personen",
        },
      ],
    },

    // 4) IETS WARMS
    {
      name: "Iets Warms",
      items: [
        {
          name: "Seizoenssoep",
          description: "Soep van het seizoen met toast",
          price: 8.5,
          tags: [],
          allergens: ["gluten"],
        },
        {
          name: "Bao Buns Pulled Pork",
          description: "Pulled pork · gepekelde wortels · sriracha mayo",
          price: 15,
          tags: [],
          allergens: ["gluten", "soja", "ei"],
          baseDishKey: "bao-pulled-pork",
        },
        {
          name: "Bao Buns Inari",
          description: "Inari · gepekelde wortels · sriracha mayo",
          price: 15,
          tags: ["V"],
          allergens: ["gluten", "soja", "ei"],
          baseDishKey: "bao-inari",
        },
        {
          name: "De Hollander",
          description: "Gehaktballetje in tomatensaus",
          price: 14.5,
          tags: [],
          allergens: ["gluten", "ei"],
          baseDishKey: "gehaktballetje",
        },
      ],
    },

    // 5) DESSERTS
    {
      name: "Desserts",
      items: [
        {
          name: "Dame Blanche",
          description: "Warme chocolade · vanille ijs · slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose"],
          baseDishKey: "dame-blanche",
        },
        {
          name: "Parfait",
          description: "Vanille · salted caramel",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "ei"],
          baseDishKey: "parfait",
        },
        {
          name: "Dessertje van de Week",
          description: "Vraag de bediening voor meer informatie",
          price: 7.5,
          tags: [],
          allergens: ["lactose", "noten", "gluten"],
          baseDishKey: "dessertje-van-de-week",
        },
        {
          name: "Snicker",
          description: "Snicker, maar dan vegan",
          price: 7.5,
          tags: ["VG"],
          allergens: ["pinda", "noten"],
          baseDishKey: "snicker",
        },
        {
          name: "Kaasplankje",
          description: "Selectie van 3 verschillende kazen",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "gluten", "noten"],
          baseDishKey: "kaasplankje",
        },
      ],
    },
  ],
};
