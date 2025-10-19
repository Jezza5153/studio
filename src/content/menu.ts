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
          description: "Tomaat - Basilicum - Mozzarella",
          price: 10.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Gevuld Tomaatje",
          description: "Garnaal - Cocktailsaus - Tomaat",
          price: 8.0,
          tags: [],
          allergens: ["schaaldieren"],
        },
        {
          name: "Bietjes Tartaar",
          description: "Geitenkaas - Walnoot - Honing",
          price: 9.5,
          tags: ["V"],
          allergens: ["melk", "noten"],
        },
        {
          name: "Bruschetta",
          description: "Knoflook - Olijfolie - Tomaat - Focaccia",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten"],
        },
        {
          name: "Gevulde Eitjes",
          description: "Mayonaise - Bieslook",
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
          name: "Jan Zijn Soepje",
          description: "Groenten Van De Buren - Even Vragen",
          price: 8.0,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Spare Ribs",
          description: "Van Het Bot Vallend - Sweet And Spicy",
          price: 10.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch Kalfsvlees - Parmezaan",
          price: 9.5,
          tags: [],
          allergens: ["melk", "gluten", "eieren"],
        },
        {
          name: "Gehaktballetjes",
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
          allergens: ["Lactose"],
        },
        {
          name: "Dumplings",
          description: "dumplings - Crispy Onions",
          price: 8.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
        {
          name: "Bao Bun",
          description: "Bao - Pulled Pork Of Inari (Vega optie) - Sriracha Mayo",
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
          description: "Warme Chocoladesaus - Vanille-ijs - Slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Parfait",
          description: "Vanille - Salted Caramel",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "eieren"],
        },
        {
          name: "Appel Gemakje",
          description: "Appel - Amandel - Slagroom",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk", "noten", "gluten"],
        },
        {
          name: "Voeg Vanille-ijs Of Citroensorbet aan je Appel Gemakje",
          price: 3,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Vegan Snickerbar",
          price: 7.5,
          tags: ["VG"],
          allergens: ["Pinda","noten",],
        },
        {
          name: "Dessert Plankje",
          description: "Kan Je Niet Kiezen? Neem Dan Een Beetje Van Alles - wil je dan ook 2 Koffies (+5)",
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
          name: "Geiten Brie",
          description: "Vijgenchutney - Jan Zijn Crackers",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Wilde Bloemenkaas",
          description: "Rozijnen - Dadelbrood",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Hoeve Goud Intens",
          description: "Rozijnen - Dadelbrood",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Oudwijker Fiore",
          description: "Biermosterd - Dadelbrood",
          price: 8.5,
          tags: ["V"],
          allergens: ["melk", "gluten", "mosterd"],
        },
        {
          name: "Manchego",
          description: "Gerookte Notenmix - Biermosterd",
          price: 9.0,
          tags: ["V"],
          allergens: ["melk", "noten", "mosterd"],
        },
        {
          name: "Arcadie Blauw",
          description: "Vijgencompote - Jan Zijn Crackertjes",
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
          name: "Prosciutto",
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
    {
      name: "Borrel",
      items: [
        {
          name: "Peppedews",
          description: "Gevulde Paprikatjes",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk"],
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
          description: "Gerookte en geroosterde Notenmix",
          price: 3.5,
          tags: ["V", "VG", "GF"],
          allergens: ["noten"],
        },
        {
          name: "Sardientjes",
          description: "Sardientjes In Olie",
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
          name: "Lekker Borrelen",
          description: "Een Leuk Charcuterie- En Kaasplankje (P.P.)",
          price: 12.5,
          tags: [],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Chef’s Choice",
          description: "Vier Gerechten Die De Chef Speciaal Voor U Maakt",
          price: 38.0,
          tags: [],
          allergens: [],
        },
      ],
    },
  ],
};
