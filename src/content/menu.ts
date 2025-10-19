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
          description: "Garnaal - Cocktail sauce -tomaat",
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
          description: "Knoflook - Olijf Olie -tomaat - focaccia",
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
          price: 8.0,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Spare Ribs",
          description: "van het bot vallend sweet and spicey",
          price: 10.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch kalfsvlees - Parmesan",
          price: 9.5,
          tags: [],
          allergens: ["melk", "eieren", "gluten"],
        },
        {
          name: "Gehaktballetjes Vega",
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
          name: "Dumplings",
          description: "groenten dumplings - cruspy onions",
          price: 8.5,
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
          description: "Warme Chocolade - Vanille ijs - Slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Parfait",
          description: "Vanille - salted Caramel",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "eieren"],
        },
        {
          name: "Appel gemakje",
          description: "Appel - Caramel - Amandel - Slagroom",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk", "noten", "gluten"],
        },
        {
          name: "Extra: Vanille ijs of Citroen sorbet",
          description: "Voeg toe aan je Appel gemakje",
          price: 2,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Vegan Snickerbar",
          description: "Een heerlijke veganistische traktatie met pinda en chocolade.",
          price: 7.5,
          tags: ["VG"],
          allergens: ["pinda", "noten"],
        },
        {
          name: "Dessert plankje",
          description: "Kan je niet kiezen neem dan beetje van alles - 2 koffies + 5",
          price: 15.0,
          tags: ["V"],
          allergens: ["melk", "gluten", "eieren", "noten"],
        },
      ],
    },
    {
      name: "Kazen",
      items: [
        {
          name: "Geiten brie",
          description: "vijgen chutney - jan zen crackers",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Wilde Bloemenkaas",
          description: "rozijnen - dadelbrood",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Hoeve goud intens",
          description: "rozijnen - dadelbrood",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Oudwijker Fiore",
          description: "bier mostard - dadel brood",
          price: 8.5,
          tags: ["V"],
          allergens: ["melk", "gluten", "mosterd"],
        },
        {
          name: "Manchego",
          description: "geroosterde noten mix - bier mostard",
          price: 9.0,
          tags: ["V"],
          allergens: ["melk", "noten", "mosterd"],
        },
        {
          name: "Arcadie Blauw",
          description: "vijgen compote - jan zen cracker",
          price: 8.5,
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
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Venkelworstje",
          description: "kesbeke cornichon",
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Prosciutto",
          description: "Geconfijte Knoflook - Crouton",
          price: 8.0,
          tags: [],
          allergens: ["gluten"],
        },
        {
          name: "Peperworstje",
          description: "kesbeke cornichon",
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Gedroogde twentse worst",
          description: "kesbeke cornichon",
          price: 6.0,
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
          price: 6.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Olijven",
          description: "de tafelaars kruiden mix",
          price: 4.5,
          tags: ["V", "VG", "GF"],
          allergens: [],
        },
        {
          name: "Gerookte Notenmix",
          description: "Huis gemaakte noten mix Jan zijn recept",
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
    {
      name: "Arrangementen",
      items: [
        {
          name: "Lekker borrellen",
          description: "Een leuk carcuterie en kaas plankje (P.P.)",
          price: 12.5,
          tags: [],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Chefs choice",
          description: "4 gerechten die de chef speciaal voor u maakt",
          price: 38.0,
          tags: [],
          allergens: [],
        },
      ],
    },
  ],
};
