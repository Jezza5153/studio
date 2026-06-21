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
  /** Optional prefix shown before the price, e.g. "vanaf" for the
   *  ophalen "Spare Ribs Menu" (vanaf €34,95). */
  pricePrefix?: string;
  /** When true, the row renders muted with a "Tijdelijk niet leverbaar"
   *  note in place of the price. Used for sold-out ophalen items. */
  unavailable?: boolean;
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


