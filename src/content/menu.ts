/* eslint-disable */
// This is the single source of truth for the menu.
// To update the menu, edit this file directly.

export const __MENU_DEBUG_SOURCE = ">>> USING src/content/menu.ts <<<";

export type MenuItem = {
  name: string;
  description?: string | null;
  price: number | null;
  /** Dietary markers, matching the printed kaart legend:
   *  "V" vegetarisch · "GF" glutenvrij · "LF" lactosevrij ·
   *  "GFB" glutenvrij brood mogelijk (+€1,50) · "VG" vegan (ophalenkaart only). */
  tags: string[];
  /** Allergen keys — only used by the ophalenkaart. The lunch/dinerkaart follow
   *  the printed menu, which lists dietary markers instead of allergens; guests
   *  with an allergy are invited to ask (see the note under each menu). */
  allergens: string[];
  /** Optional internal grouping key — never rendered publicly. Lets us link
   *  the lunch + diner version of the same dish (e.g. lunch "Carpaccio" broodje
   *  and dinner "Carpaccio"). Editorial copy / price stay independent. */
  baseDishKey?: string;
  /** Optional inline badge on the row, e.g. "Vanaf 2 personen". */
  badge?: string;
  /** Optional prefix shown before the price, e.g. "vanaf". */
  pricePrefix?: string;
  /** Optional text shown instead of a number, e.g. "M.P." (marktprijs). */
  priceText?: string;
  /** When true, the row renders muted with a "Tijdelijk niet leverbaar"
   *  note in place of the price. Used for sold-out ophalen items. */
  unavailable?: boolean;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
  /** Optional sub-heading shown beneath the category title
   *  (e.g. Salades: "Geserveerd met brood"). */
  note?: string;
};

export type MenuData = {
  title: string;
  currency: string;
  categories: MenuCategory[];
  /** Optional service-time line, e.g. "Diner vanaf 17:00". */
  serviceNote?: string;
};

// =========================================================================
// DINERKAART — vanaf 17:00
// =========================================================================
// Source: printed kaart (Het Concept / Arrangementen / Kazen / Charcuterie /
// Borrel / Koud / Klassiekers / Warm / Desserts).
//
// Dietary markers come straight from the printed legend:
//   V = vegetarisch · GF = glutenvrij · LF = lactosevrij ·
//   GFB = glutenvrij brood mogelijk (+€1,50)
// =========================================================================
export const DINNER_MENU: MenuData = {
  title: "Dinerkaart",
  currency: "EUR",
  serviceNote: "Diner vanaf 17:00",
  categories: [
    // 1) ARRANGEMENTEN
    {
      name: "Arrangementen",
      items: [
        {
          name: "Lekker Borrelen",
          description: "Een leuk charcuterie- en kaasplankje. Minimaal 2 personen (p.p.)",
          price: 12.5,
          tags: [],
          allergens: [],
          badge: "Vanaf 2 personen",
        },
        {
          name: "Chef's Choice",
          description: "Uitgebreid genieten",
          price: 48,
          tags: [],
          allergens: [],
        },
        {
          name: "Bijpassend wijnarrangement",
          description: null,
          price: 28,
          tags: [],
          allergens: [],
        },
      ],
    },

    // 2) KAZEN — beschikbaar hele dag
    {
      name: "Kazen",
      note: "Beschikbaar hele dag",
      items: [
        {
          name: "Geitenbrie",
          description: "Vijgenchutney · Sfoglie",
          price: 7,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Brokkel Kaas",
          description: "Biermosterd · Dadelbrood",
          price: 7.5,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Oudwijker Fiore",
          description: "Vijgenchutney · Sfoglie",
          price: 8.5,
          tags: ["V"],
          allergens: [],
          baseDishKey: "fiore",
        },
        {
          name: "Jan zijn kaasje",
          description: "Wisselende kaas met bijpassende garnituren",
          price: 8,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Chefs Blauwtje",
          description: "Wisselende kaas met bijpassende garnituren",
          price: 8.5,
          tags: ["V"],
          allergens: [],
        },
      ],
    },

    // 3) CHARCUTERIE — beschikbaar hele dag
    {
      name: "Charcuterie",
      note: "Beschikbaar hele dag",
      items: [
        {
          name: "Venkelworstje",
          description: "Biologisch rundvlees · Kesbeke Zuur",
          price: 7,
          tags: ["GF", "LF"],
          allergens: [],
        },
        {
          name: "Serrano Ham",
          description: "Geconfijte knoflook · Croutons",
          price: 8,
          tags: ["LF", "GFB"],
          allergens: [],
        },
        {
          name: "Peper Fuet",
          description: "Varkensvlees · Kesbeke Zuur",
          price: 7,
          tags: ["GF", "LF"],
          allergens: [],
        },
        {
          name: "Truffel Fuet",
          description: "Kesbeke Zuur",
          price: 8.5,
          tags: ["GF", "LF"],
          allergens: [],
        },
        {
          name: "Chefs favorietje",
          description: "Vraag de bediening voor meer informatie",
          price: null,
          priceText: "M.P.",
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
          tags: ["V", "GF"],
          allergens: [],
        },
        {
          name: "Olijven",
          description: "In De Tafelaars kruidenmix",
          price: 4.5,
          tags: ["V", "GF", "LF"],
          allergens: [],
        },
        {
          name: "Gerookte Notenmix",
          description: null,
          price: 3.5,
          tags: ["V", "LF"],
          allergens: [],
        },
      ],
    },

    // 5) KOUD
    {
      name: "Koud",
      items: [
        {
          name: "Miso Zalm",
          description: "Kokos dressing · Krokantje · Nori",
          price: 15.5,
          tags: ["LF", "GF"],
          allergens: [],
          baseDishKey: "zalm",
        },
        {
          name: "Bieten Carpaccio",
          description: "Geitenkaas · Walnoot · Honing",
          price: 10.5,
          tags: ["V", "GF"],
          allergens: [],
        },
        {
          name: "Broodplankje",
          description: "Met verschillende dips",
          price: 7.5,
          tags: ["V", "GFB"],
          allergens: [],
        },
        {
          name: "Watermeloen",
          description: "Munt · Citroen · Feta",
          price: 13,
          tags: ["V", "GF"],
          allergens: [],
          baseDishKey: "watermeloen",
        },
      ],
    },

    // 6) KLASSIEKERS
    {
      name: "Klassiekers",
      items: [
        {
          name: "Gevulde Eitjes",
          description: "Mayonaise · Bieslook · 3 stuks",
          price: 7.5,
          tags: ["V", "GF", "LF"],
          allergens: [],
        },
        {
          name: "Carpaccio",
          description: "Biologisch rundvlees · Structuren van eigeel · Truffel",
          price: 12.5,
          tags: ["GF", "LF"],
          allergens: [],
          baseDishKey: "carpaccio",
        },
        {
          name: "Vitello Tonnato",
          description: "Biologisch kalfsvlees · Tonijnmayonaise · Kappertjes",
          price: 12.5,
          tags: ["LF", "GF"],
          allergens: [],
          baseDishKey: "vitello",
        },
        {
          name: "Bruschetta",
          description:
            "Knoflook · Olijfolie · Tomaat · 3 stuks (1 extra €3). Met serrano €1,50 per stuk",
          price: 9,
          tags: ["V", "LF", "GFB"],
          allergens: [],
        },
      ],
    },

    // 7) WARM
    {
      name: "Warm",
      items: [
        {
          name: "Spare Ribs",
          description: "Van het bot vallend · Sweet & Spicy",
          price: 13.5,
          tags: ["LF", "GF"],
          allergens: [],
          baseDishKey: "spare-ribs",
        },
        {
          name: "Runderballetjes",
          description: "Biologisch rund · Gremolata · Tomatensaus",
          price: 11,
          tags: [],
          allergens: [],
          baseDishKey: "gehaktballetjes",
        },
        {
          name: "Miso Groententuin",
          description: "Munt · Doperwten · Miso · Mediterrane groenten",
          price: 11.5,
          tags: ["V", "LF"],
          allergens: [],
        },
        {
          name: "Ossobuco",
          description: "Polenta · Gremolata · Demi Glace",
          price: 13.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Bao Bun Inari",
          description: "Sriracha mayonaise · Bosui",
          price: 12.5,
          tags: ["V", "LF"],
          allergens: [],
          baseDishKey: "bao-inari",
        },
        {
          name: "Bao Bun Pulled Pork",
          description: "Sriracha mayonaise · Bosui",
          price: 12.5,
          tags: ["LF"],
          allergens: [],
          baseDishKey: "bao-pulled-pork",
        },
        {
          name: "Japanse Curry",
          description: "Seizoensgroente · Udon noodles",
          price: 11.5,
          tags: [],
          allergens: [],
        },
      ],
    },

    // 8) DESSERTS
    {
      name: "Desserts",
      items: [
        {
          name: "Parfait",
          description: "Smaak van de week",
          price: 8.5,
          tags: ["V", "GF"],
          allergens: [],
          baseDishKey: "parfait",
        },
        {
          name: "Dame Blanche",
          description: "Warme chocolade · Vanille-ijs · Slagroom",
          price: 8.5,
          tags: ["V", "GF"],
          allergens: [],
          baseDishKey: "dame-blanche",
        },
        {
          name: "Snicker",
          description: "Snicker, maar dan vegan.",
          price: 8.5,
          tags: ["V", "GF", "LF"],
          allergens: [],
          baseDishKey: "snicker",
        },
        {
          name: "Local Dessert",
          description: "Vraag de bediening voor meer informatie",
          price: 9,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Kaasplankje",
          description: "Selectie van 3 verschillende kazen",
          price: 15,
          tags: ["V"],
          allergens: [],
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
// OPHALENKAART (takeaway)
// =========================================================================
// Spare-ribs focused takeaway menu. Items are picked up at the restaurant
// (Kamp 8, Amersfoort).
//
// TODO(owner-confirm): Allergen and dietary tags below are conservative
// guesses based on the dinner menu equivalents and standard ingredients.
// Walk the list with the chef and confirm before the page is shown to
// guests with allergies — wrong allergen info is worse than missing info.
// =========================================================================
export const OPHALEN_MENU: MenuData = {
  title: "Ophalenkaart",
  currency: "EUR",
  categories: [
    // 1) HOOFDGERECHTEN
    {
      name: "Hoofdgerechten",
      items: [
        {
          name: "Tafelaars spare ribs — zoet en pittig (Hollands pittig)",
          description:
            "Onze spare ribs worden 24 uur sous vide gegaard op 80°C in marinade. Daardoor vallen ze van het bot en zit de smaak tot in de kern.",
          price: 24.95,
          tags: [],
          allergens: ["mosterd", "soja"],
          baseDishKey: "spare-ribs",
        },
        {
          name: "Tafelaars Spare Ribs Menu",
          description:
            "Inclusief mais of gepofte aardappel, coleslaw en een drankje.",
          price: 34.95,
          pricePrefix: "vanaf",
          tags: [],
          allergens: ["mosterd", "soja", "lactose", "ei"],
          baseDishKey: "spare-ribs-menu",
        },
      ],
    },

    // 2) BIJGERECHTEN
    {
      name: "Bijgerechten",
      items: [
        {
          name: "Tafelaars Coleslaw",
          description: null,
          price: 4.5,
          tags: ["V"],
          allergens: ["lactose", "ei"],
        },
        {
          name: "Tafelaars Gepofte Aardappel met kruidenboter",
          description: null,
          price: 4.5,
          tags: ["V"],
          allergens: ["lactose"],
        },
        {
          name: "Tafelaars Maïskolf met kruidenboter",
          description: "Gegrilde maïskolf met kruidenboter.",
          price: 5.5,
          tags: ["V"],
          allergens: ["lactose"],
        },
        {
          name: "Loaded Potato met Pulled Pork",
          description: "Loaded potato met huisgemaakte pulled pork.",
          price: 8,
          tags: [],
          allergens: ["lactose"],
        },
      ],
    },

    // 3) SAUZEN
    {
      name: "Sauzen",
      note: "Onze huisgemaakte sauzen zijn om je vingers bij af te likken.",
      items: [
        {
          name: "Sriracha mayonaise",
          description: null,
          price: 1.5,
          tags: ["V"],
          allergens: ["ei"],
        },
        {
          name: "Tafelaars Knoflooksaus",
          description: null,
          price: 1.5,
          tags: ["V"],
          allergens: ["ei"],
        },
        {
          name: "Tafelaars Truffelmayonaise",
          description: null,
          price: 1.5,
          tags: ["V"],
          allergens: ["ei"],
        },
        {
          name: "Extra Tafelaar marinade",
          description: null,
          price: 3,
          tags: [],
          allergens: ["mosterd", "soja"],
        },
      ],
    },

    // 4) DRANKEN
    {
      name: "Dranken",
      items: [
        {
          name: "Coca-Cola 330ml",
          description: null,
          price: 2.95,
          tags: [],
          allergens: [],
        },
        {
          name: "Coca-Cola Zero 330ml",
          description: null,
          price: 2.95,
          tags: [],
          allergens: [],
        },
        {
          name: "Lipton Ice Tea Green 330ml",
          description: null,
          price: 2.95,
          tags: [],
          allergens: [],
        },
        {
          name: "Lipton Ice Tea Sparkling 330ml",
          description: null,
          price: 2.95,
          tags: [],
          allergens: [],
        },
        {
          name: "Red Bull 250ml",
          description: null,
          price: 3.9,
          tags: [],
          allergens: [],
        },
        {
          name: "Vers Tafelaars Pils 500ml",
          description:
            "Vers getapt pils in beugelfles (halve Leo). 18+ · excl. statiegeld €0,50 · 5% vol.",
          price: 4.95,
          tags: [],
          allergens: ["gluten"],
          badge: "18+",
        },
        {
          name: "Vers Tafelaars Weizen 500ml",
          description:
            "Vers getapt weizen in beugelfles — chef's choice. 18+ · excl. statiegeld €0,50 · 5% vol.",
          price: 6.95,
          tags: [],
          allergens: ["gluten"],
          badge: "18+",
        },
        {
          name: "Playground IPA 0,3% 330ml",
          description:
            "Fruitige alcoholvrije IPA van Van de Streek. Excl. statiegeld €0,15.",
          price: 5.95,
          tags: [],
          allergens: ["gluten"],
        },
        {
          name: "Fanta 330ml",
          description: null,
          price: null,
          tags: [],
          allergens: [],
          unavailable: true,
        },
      ],
    },

    // 5) DESSERTS
    {
      name: "Desserts",
      items: [
        {
          name: "Tafelaars Vegan Snicker",
          description: null,
          price: 7.5,
          tags: ["VG"],
          allergens: ["pinda", "noten"],
          baseDishKey: "snicker",
        },
        {
          name: "Tafelaars Parfait",
          description: "Vanille · salted caramel. Excl. statiegeld €0,50.",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "ei"],
          baseDishKey: "parfait",
        },
      ],
    },
  ],
};

// =========================================================================
// LUNCHKAART — 11:00 tot 15:00
// =========================================================================
// Source: printed Lunchkaart (Shared Lunch / Broodjes / Salades / Warm /
// Zoete Hapjes). Kazen en charcuterie zijn de hele dag beschikbaar en staan
// op de dinerkaart.
//
// Dietary markers come straight from the printed legend:
//   V = vegetarisch · GF = glutenvrij · LF = lactosevrij ·
//   GFB = glutenvrij brood mogelijk (+€1,50)
// =========================================================================
export const LUNCH_MENU: MenuData = {
  title: "Lunchkaart",
  currency: "EUR",
  serviceNote: "Lunch van 11:00 tot 15:00",
  categories: [
    // 1) SHARED LUNCH
    {
      name: "Shared Lunch",
      items: [
        {
          name: "Tafelaars Plank",
          description:
            "Een plank met diverse lunchgerechtjes, broodjes, salade en warme hapjes.",
          price: 19.5,
          tags: [],
          allergens: [],
          badge: "Vanaf 2 personen",
        },
      ],
    },

    // 2) BROODJES
    {
      name: "Broodjes",
      items: [
        {
          name: "Carpaccio",
          description: "Truffel · Eigeel gel · Smokey prei emulsie",
          price: 15.5,
          tags: ["LF", "GFB"],
          allergens: [],
          baseDishKey: "carpaccio",
        },
        {
          name: "Zalm",
          description: "Citroen · Radijs · Kapperappel",
          price: 15.5,
          tags: ["LF", "GFB"],
          allergens: [],
          baseDishKey: "zalm",
        },
        {
          name: "Clubsandwich",
          description: "Kip · Bacon · Ei · Tomaat · Chips",
          price: 17.5,
          tags: ["LF", "GFB"],
          allergens: [],
        },
        {
          name: "Ricotta Home Made",
          description:
            "Biologische ricotta · Tomaat · Serrano · Balsamico · Olijfolie",
          price: 16.5,
          tags: ["GFB"],
          allergens: [],
        },
        {
          name: "Vitello",
          description: "Biologisch kalfsvlees · Tonijnmayo · Rucola",
          price: 15.5,
          tags: ["LF", "GFB"],
          allergens: [],
          baseDishKey: "vitello",
        },
        {
          name: "Oudwijkenaar",
          description: "Fiore kaas · Vijgenchutney · Balsamico",
          price: 15.5,
          tags: ["GFB"],
          allergens: [],
          baseDishKey: "fiore",
        },
      ],
    },

    // 3) SALADES
    {
      name: "Salades",
      note: "Geserveerd met brood",
      items: [
        {
          name: "Watermeloen",
          description: "Feta · Munt · Limoen",
          price: 15.5,
          tags: ["V", "GFB"],
          allergens: [],
          baseDishKey: "watermeloen",
        },
        {
          name: "Mediteraan",
          description: "Olijven · Tomaten",
          price: 15.5,
          tags: ["V", "LF", "GFB"],
          allergens: [],
        },
        {
          name: "Carpaccio",
          description:
            "Biologisch rundvlees · Rucola · Little gem · Smokey prei mayo · Pijnboompitten",
          price: 15.5,
          tags: ["LF", "GFB"],
          allergens: [],
          baseDishKey: "carpaccio",
        },
        {
          name: "Vitello",
          description:
            "Biologisch kalfsvlees · Little gem · Kappertjes · Tonijnmayo",
          price: 15.5,
          tags: ["GFB"],
          allergens: [],
          baseDishKey: "vitello",
        },
      ],
    },

    // 4) WARM
    {
      name: "Warm",
      items: [
        {
          name: "Bao Buns Pulled Pork",
          description: "Gepekelde wortel · Sriracha mayo",
          price: 16.5,
          tags: ["LF"],
          allergens: [],
          baseDishKey: "bao-pulled-pork",
        },
        {
          name: "Bao Buns Inari",
          description: "Gepekelde wortel · Sriracha mayo",
          price: 16.5,
          tags: ["V", "LF"],
          allergens: [],
          baseDishKey: "bao-inari",
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch rund · Brood · Tomatensaus",
          price: 15.5,
          tags: ["LF"],
          allergens: [],
          baseDishKey: "gehaktballetjes",
        },
      ],
    },

    // 5) ZOETE HAPJES
    {
      name: "Zoete Hapjes",
      items: [
        {
          name: "Appel Taartje",
          description: "Met slagroom €0,50 · Bol ijs €2",
          price: 6,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Parfait",
          description: "Smaak van de week",
          price: 8.5,
          tags: ["V", "GF"],
          allergens: [],
          baseDishKey: "parfait",
        },
        {
          name: "Dame Blanche",
          description: "Warme chocoladesaus · Slagroom",
          price: 8.5,
          tags: ["V", "GF"],
          allergens: [],
          baseDishKey: "dame-blanche",
        },
        {
          name: "Kaasplankje",
          description: "Verschillende kaasjes",
          price: 15,
          tags: ["V"],
          allergens: [],
          baseDishKey: "kaasplankje",
        },
        {
          name: "Snicker",
          description: "Snicker, maar dan vegan.",
          price: 8.5,
          tags: ["V", "GF", "LF"],
          allergens: [],
          baseDishKey: "snicker",
        },
      ],
    },
  ],
};
