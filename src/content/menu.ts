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
};

export type MenuCategory = { name: string; items: MenuItem[] };

export type MenuData = {
  title: string;
  currency: string;
  categories: MenuCategory[];
};

export const MENU: MenuData = {
  title: "De Tafelaar Menu",
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
        },
        {
          name: "Parfait",
          description: "Vanille · salted caramel",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "ei"],
        },
        {
          name: "Dessertje van de week",
          description: "Vraag de bediening voor meer informatie",
          price: 7.5,
          tags: [],
          allergens: ["lactose", "noten", "gluten"],
        },
        {
          name: "Snicker",
          description: "Snicker, maar dan vegan.",
          price: 7.5,
          tags: ["VG"],
          allergens: ["pinda", "noten"],
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
        },
      ],
    },
  ],
};
