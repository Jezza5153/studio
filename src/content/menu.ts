/* eslint-disable */
// This is the single source of truth for the menu.
// To update the menu, edit this file directly.

export const __MENU_DEBUG_SOURCE = ">>> USING src/content/menu.ts <<<";

export type MenuItem = {
  name: string;
  description?: string | null;
  price: number | null;
  tags: string[];
  allergens: string[];
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
    {
      name: "Klassiekers Koud",
      items: [
        {
          name: "Vitello Tonnato",
          description: "Rund - Tonijn Mayonaise - Kappertjes",
          price: 10.5,
          tags: [],
          allergens: ["vis", "eieren"],
        },
        {
          name: "Carpaccio",
          description: "Rund - Truffelmayo - Parmesan",
          price: 10.5,
          tags: [],
          allergens: ["melk", "eieren"],
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
          description: "Tomaat - Basillicum - Mozzarella",
          price: 10.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Gevuld Tomaatje",
          description: "Garnaal - Cocktail sauce - tomaat",
          price: 8.0,
          tags: [],
          allergens: ["schaaldieren"],
        },
        {
          name: "Biet Tartaar",
          description: "Geitenkaas - Walnoot - Honing",
          price: 9.5,
          tags: ["V"],
          allergens: ["melk", "noten"],
        },
        {
          name: "Bruchetta",
          description: "Knoflook - Olijf Olie - tomaat - focaccia",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten"],
        },
        {
          name: "Gevulde eitjes",
          description: "mayonaise - bieslook",
          price: 9.5,
          tags: ["V"],
          allergens: ["eieren"],
        },
      ],
    },
    {
      name: "Warm",
      items: [
        {
          name: "Jan zijn soepje",
          description: "Groenten van de buren - Even Vragen",
          price: 9.5,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Spare Ribs",
          description: "van het bot vallend sweet and spicey",
          price: 11.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch kalfsvlees - Parmesan",
          price: 9.5,
          tags: [],
          allergens: ["melk", "gluten", "eieren"],
        },
        {
          name: "Gehaktballetjes (Vega)",
          description: "de vegatarische slagers balletjes - tomatensaus",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
        {
          name: "Ossobuco",
          description: "polenta - gremolata",
          price: 11.5,
          tags: [],
          allergens: ["melk"],
        },
        {
          name: "Dumplings (Vega)",
          description: "groenten dumplings - cruspy onions",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
        {
          name: "Bao Bun",
          description: "Bao - Brisket/tofu - siracha mayo",
          price: 9.5,
          tags: [],
          allergens: ["gluten", "soja", "eieren"],
        },
      ],
    },
    {
      name: "Dessert",
      items: [
        {
          name: "Dame Blanche",
          description: "Vanille - Chocolade",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Crème brûlée",
          description: "kokos - limoen",
          price: 7.5,
          tags: ["V"],
          allergens: ["eieren"],
        },
        {
          name: "Sgroppino",
          description: "Citroen - Wodka",
          price: 7.5,
          tags: [],
          allergens: [],
        },
      ],
    },
  ],
};
