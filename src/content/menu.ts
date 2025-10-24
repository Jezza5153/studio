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
    // 1) KLASSIEKERS
    {
      name: "Klassiekers",
      items: [
        {
          name: "Vitello Tonnato",
          description: "Biologisch Kalfsvlees - Tonijnmayonaise - Kappertjes",
          price: 10.5,
          tags: [],
          allergens: ["vis", "eieren"],
        },
        {
          name: "Carpaccio",
          description: "Biologisch Rundvlees - Truffelmayo - Parmezaan",
          price: 10.5,
          tags: [],
          allergens: ["lactose", "eieren"],
        },
        {
          name: "Gerookte Zalm",
          description: "Citroen - Dille - Komkommer",
          price: 10.5,
          tags: [],
          allergens: ["vis"],
        },
        {
          name: "Caprese",
          description: "Tomaat - Basilicum - Mozzarella",
          price: 10.5,
          tags: ["V"],
          allergens: ["lactose"],
        },
      ],
    },

    // 2) KOUD
    {
      name: "Koud",
      items: [
        {
          name: "Gevuld Tomaatje",
          description: "Garnaal - Cocktailsaus - Tomaat",
          price: 7.5,
          tags: [],
          allergens: ["schaaldieren", "eieren"],
        },
        {
          name: "Bietjes Tartaar",
          description: "Geitenkaas - Walnoot - Honing",
          price: 7.0,
          tags: ["V"],
          allergens: ["lactose", "noten"],
        },
        {
          name: "Bruschetta",
          description: "Knoflook - Olijfolie - Tomaat - Focaccia",
          price: 6.5,
          tags: ["V"],
          allergens: ["gluten"],
        },
        {
          name: "Gevulde Eitjes",
          description: "Mayonaise - Bieslook",
          price: 6.5,
          tags: ["V"],
          allergens: ["eieren"],
        },
      ],
    },

    // 3) WARM
    {
      name: "Warm",
      items: [
        {
          name: "Jan Zijn Soepje",
          description: "Bloemkool - Sambal",
          price: 8.0,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Spare Ribs",
          description: "Van het bot vallend - sweet and spicy",
          price: 9.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch kalfsvlees - Parmezaan - Tomatensaus",
          price: 9.5,
          tags: [],
          allergens: ["lactose", "gluten", "eieren"],
        },
        {
          name: "Gehaktballetjes (Vega)",
          description: "De Vegetarische Slager - Tomatensaus",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
        {
          name: "Ossobuco",
          description: "Polenta - Gremolata",
          price: 11.5,
          tags: [],
          allergens: ["lactose"],
        },
        {
          name: "Dumplings",
          description: "Groentendumplings - Crispy Onions",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
        // ⬇️ Bao Bun opgesplitst in twee varianten
        {
          name: "Bao Bun Pulled Pork",
          description: "Bao - Pulled Pork - Sriracha Mayo",
          price: 8.5,
          tags: [],
          allergens: ["gluten", "soja", "eieren"],
        },
        {
          name: "Bao Bun Inari",
          description: "Bao - Inari - Sriracha Mayo",
          price: 8.5,
          tags: ["V"],
          allergens: ["gluten", "soja", "eieren"],
        },
      ],
    },

    // 4) DESSERT
    {
      name: "Dessert",
      items: [
        {
          name: "Dame Blanche",
          description: "Warme Chocolade - Vanille-ijs - Slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose"],
        },
        {
          name: "Parfait",
          description: "Vanille - Salted Caramel",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "eieren"],
        },
        {
          name: "Appel Gemakje",
          description: "Appel - Caramel - Amandel - Slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "noten", "gluten"],
        },
        {
          name: "Vanille-ijs of Citroensorbet",
          description: "Keuze uit vanille-ijs of citroensorbet",
          price: 6.5,
          tags: ["V"],
          allergens: ["lactose"], // sorbet is lactosevrij; als duo-item tonen we 'lactose' i.v.m. vanille-ijs
        },
        {
          name: "Extra: Toeslag (+2)",
          description: "Toeslag voor extra bol ijs of sorbet",
          price: 2.0,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Vegan Snicker",
          description: "Snicker, maar dan vegan",
          price: 7.5,
          tags: ["VG"],
          allergens: ["pinda", "noten"],
        },
        {
          name: "Dessert Plankje",
          description:
            "Kan je niet kiezen? Proef een beetje van al onze desserts. Optioneel met 2 koffies voor 5 euro extra.",
          price: 15.0,
          tags: ["V"],
          allergens: ["lactose", "gluten", "eieren", "noten"],
        },
      ],
    },

    // 5) KAZEN
    {
      name: "Kazen",
      items: [
        {
          name: "Geitenbrie",
          description: "Vijgenchutney - Sfoglie",
          price: 6.5,
          tags: ["V"],
          allergens: ["lactose", "gluten"],
        },
        {
          name: "Wilde Bloemenkaas",
          description: "Rozijnen - Dadelbrood",
          price: 7.0,
          tags: ["V"],
          allergens: ["lactose", "gluten", "noten"],
        },
        {
          name: "Hoeve Goud Intens",
          description: "Rozijnen - Dadelbrood",
          price: 7.5,
          tags: ["V"],
          allergens: ["lactose", "gluten", "noten"],
        },
        {
          name: "Oudwijker Fiore",
          description: "Biermosterd - Dadelbrood",
          price: 8.5,
          tags: ["V"],
          allergens: ["lactose", "gluten", "mosterd"],
        },
        {
          name: "Manchego",
          description: "Geroosterde Notenmix - Biermosterd",
          price: 9.0,
          tags: ["V"],
          allergens: ["lactose", "noten", "mosterd"],
        },
        {
          name: "Arcadie Blauw",
          description: "Vijgencompote - Sfoglie",
          price: 8.5,
          tags: ["V"],
          allergens: ["lactose", "gluten"],
        },
        // Weetje-onderregel voor hele kaas-sectie:
        {
          name: "— Weetje —",
          description:
            "Veel (lang) gerijpte harde kazen bevatten doorgaans geen meetbare lactose; vraag gerust naar de opties.",
          price: null,
          tags: [],
          allergens: [],
        },
      ],
    },

    // 6) CHARCUTERIE
    {
      name: "Charcuterie",
      items: [
        {
          name: "Veluwnaartje",
          description: "Kesbeke Uitjes",
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Venkelworstje",
          description: "Kesbeke Cornichon",
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Serrano Ham van het Bot",
          description: "Geconfijte Knoflook - Crouton",
          price: 8.0,
          tags: [],
          allergens: ["gluten"],
        },
        {
          name: "Peperworstje",
          description: "Kesbeke Cornichon",
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Gedroogde Twentse Worst",
          description: "Kesbeke Cornichon",
          price: 6.0,
          tags: [],
          allergens: [],
        },
      ],
    },

    // 7) BORREL
    {
      name: "Borrel",
      items: [
        {
          name: "Peppedews",
          description: "Gevulde Paprikatjes",
          price: 6.5,
          tags: ["V"],
          allergens: ["lactose"],
        },
        {
          name: "Olijven",
          description: "De Tafelaars Kruidenmix",
          price: 4.5,
          tags: ["V", "VG", "GF"],
          allergens: [],
        },
        {
          name: "Gerookte Notenmix",
          description: "Huisgemaakte Notenmix - Jan Zijn Recept",
          price: 3.5,
          tags: ["V", "VG", "GF"],
          allergens: ["noten"],
        },
        {
          name: "Sardientjes",
          description: "Courgette - Knoflook - Ui - Basilicum",
          price: 6.5,
          tags: [],
          allergens: ["vis"],
        },
      ],
    },

    // 8) ARRANGEMENTEN
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
          description: "4 Gerechten die de chef speciaal voor u maakt",
          price: 38.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Dessert Plankje",
          description:
            "Kan je niet kiezen? Proef een beetje van al onze desserts. Optioneel met 2 koffies voor 5 euro extra.",
          price: 15.0,
          tags: ["V"],
          allergens: ["lactose", "gluten", "eieren", "noten"],
        },
      ],
    },
  ],
};
