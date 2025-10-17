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
      name: "Kazen",
      items: [
        {
          name: "Geiten brie",
          description: "vijgen chutney - jan zen crackers",
          price: 6.50,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Wilde Bloemenkaas",
          description: "rozijnen - dadelbrood",
          price: 7.00,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Hoeve goud intens",
          description: "rozijnen - dadelbrood",
          price: 7.50,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Oudwijker Fiore",
          description: "bier mostard - dadel brood",
          price: 8.50,
          tags: ["V"],
          allergens: ["melk", "gluten", "mosterd"],
        },
        {
          name: "Manchego",
          description: "geroosterde noten mix - bier mostard",
          price: 9.00,
          tags: ["V"],
          allergens: ["melk", "noten", "mosterd"],
        },
        {
          name: "Arcadie Blauw",
          description: "vijgen compote - jan zen cracker",
          price: 8.50,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
      ],
    },
    {
      name: "Charcuterie",
      items: [
        {
          name: "Veluwnaartje",
          description: "kesbeke uitjes",
          price: 7.00,
          tags: [],
          allergens: [],
        },
        {
          name: "Venkelworstje",
          description: "kesbeke cornichon",
          price: 7.00,
          tags: [],
          allergens: [],
        },
        {
          name: "Prosciutto",
          description: "Geconfijte Knoflook - Crouton",
          price: 8.00,
          tags: [],
          allergens: ["gluten"],
        },
        {
          name: "Peperworstje",
          description: "kesbeke cornichon",
          price: 7.00,
          tags: [],
          allergens: [],
        },
        {
          name: "Gedroogde Twentse worst",
          description: "kesbeke cornichon",
          price: 6.00,
          tags: [],
          allergens: [],
        },
      ],
    },
    {
      name: "Borrel",
      items: [
        {
          name: "Peppedews",
          description: "Gevulde paprikatjes",
          price: 6.50,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Olijven",
          description: "de tafelaars kruiden mix",
          price: 4.50,
          tags: ["V", "VG", "GF"],
          allergens: [],
        },
        {
          name: "Gerookte Notenmix",
          description: "Huis gemaakte noten mix Jan zijn recept",
          price: 3.50,
          tags: ["V", "VG", "GF"],
          allergens: ["noten"],
        },
        {
          name: "Sardientjes",
          description: "Courgette - Knoflook - Ui - Basilicum",
          price: 6.50,
          tags: ["GF"],
          allergens: ["vis"],
        },
      ],
    },
    {
      name: "Arrangementen",
      items: [
        {
          name: "Lekker borrellen (p.p.)",
          description: "Een leuk carcuterie en kaas plankje",
          price: 12.50,
          tags: [],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Chefs choice",
          description: "4 gerechten die de chef speciaal voor u maakt",
          price: 38.00,
          tags: [],
          allergens: [],
        },
        {
            name: "Dessert plankje",
            description: "Kan je niet kiezen neem dan beetje van alles - 2 koffies",
            price: 5.00,
            tags: ["V"],
            allergens: ["melk", "gluten", "eieren", "noten"],
        }
      ],
    },
  ],
};
