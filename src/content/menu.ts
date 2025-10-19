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
          name: "Bruchetta",
          description: "Knoflook - Olijfolie - Tomaat - Focaccia",
          price: 6.5,
          tags: ["V"],
          allergens: ["gluten"],
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
          description: "Garnaal - cocktailsaus - tomaat",
          price: 7.5,
          tags: [],
          allergens: ["schaaldieren"],
        },
        {
          name: "Bietjes Tartaar",
          description: "Geitenkaas - Walnoot - Honing",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "noten"],
        },
        {
          name: "Gevulde eitjes",
          description: "Mayonaise - bieslook",
          price: 6.5,
          tags: ["V"],
          allergens: ["eieren"],
        },
        {
          name: "Vitello Tonnato",
          description: "Biologisch kalfsvlees - tonijnmayonaise - kappertjes",
          price: 10.5,
          tags: [],
          allergens: ["vis", "eieren"],
        },
      ],
    },
    {
      name: "Warm",
      items: [
        {
          name: "Jan zijn soepje",
          description: "Groenten van de buren - even vragen",
          price: 8.0,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Spare Ribs",
          description: "Van het bot vallend — sweet & spicy",
          price: 10.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch kalfsvlees - Parmezaan",
          price: 9.5,
          tags: [],
          allergens: ["melk", "gluten", "eieren"],
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
          allergens: ["melk"],
        },
        {
          name: "Dumplings",
          description: "Groente-dumplings - crispy onions",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
        {
          name: "Bao Bun",
          description: "Bao - pulled pork of inari - sriracha mayo",
          price: 8.5,
          tags: [],
          allergens: ["gluten", "soja", "eieren","Vega optie"],
        },
        {
          name: "Vegan",
          description: "Vraag de keuken naar ingrediënten en bereidingswijze.",
          price: 7.5,
          tags: ["VG"],
          allergens: [],
        },
      ],
    },
    {
      name: "Dessert",
      items: [
        {
          name: "Dame Blanche",
          description: "Warme chocolade - Vanille-ijs - Slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Parfait",
          description: "Vanille - salted caramel",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk", "eieren"],
        },
        {
          name: "Appel gemakje",
          description: "Appel - caramel - amandel - slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk", "noten", "gluten"],
        },
        {
          name: "Vanille-ijs of Citroen-sorbet",
          price: 2,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Dessert plankje",
          description: "Kan je niet kiezen? Neem dan een beetje van alles optioneel 2 koffie voor maar 5 euro",
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
          description: "Vijgenchutney - De Tafelaar crackers",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Wilde Bloemenkaas",
          description: "Rozijnen - dadelbrood",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Hoeve Goud Intens",
          description: "Rozijnen - dadelbrood",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Oudwijker Fiore",
          description: "Biermosterd - dadelbrood",
          price: 8.5,
          tags: ["V"],
          allergens: ["melk", "gluten", "mosterd"],
        },
        {
          name: "Manchego",
          description: "Geroosterde notenmix - biermosterd",
          price: 9.0,
          tags: ["V"],
          allergens: ["melk", "noten", "mosterd"],
        },
        {
          name: "Arcadie Blauw",
          description: "Vijgencompote - De Tafelaar cracker",
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
          description: "Kesbeke uitjes",
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Venkelworstje",
          description: "Kesbeke cornichon",
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Prosciutto",
          description: "Geconfijte knoflook - crouton",
          price: 8.0,
          tags: [],
          allergens: ["gluten"],
        },
        {
          name: "Peperworstje",
          description: "Kesbeke cornichon",
          price: 7.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Gedroogde Twentse worst",
          description: "Kesbeke cornichon",
          price: 6.0,
          tags: [],
          allergens: [],
        },
        {
          name: "Sardientjes",
          description: "Courgette - knoflook - ui - basilicum",
          price: 6.5,
          tags: [],
          allergens: ["vis"],
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
          description: "De Tafelaar kruidenmix",
          price: 4.5,
          tags: ["V", "VG", "GF"],
          allergens: [],
        },
        {
          name: "Gerookte Notenmix",
          description: "Huisgemaakte notenmix — Jan zijn recept",
          price: 3.5,
          tags: ["V", "VG", "GF"],
          allergens: ["noten"],
        },
      ],
    },
    {
      name: "Arrangementen",
      items: [
        {
          name: "Lekker borrelen",
          description: "Een leuk charcuterie- en kaasplankje (p.p.)",
          price: 12.5,
          tags: [],
          allergens: ["melk", "gluten", "noten"],
        },
        {
          name: "Chef's Choice",
          description: "Vier gerechten die de chef speciaal voor u maakt",
          price: 38.0,
          tags: [],
          allergens: [],
        },
      ],
    },
  ],
};
