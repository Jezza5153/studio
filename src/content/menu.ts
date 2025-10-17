/* eslint-disable */
// Canonical menu for De Tafelaar — cleaned to match the written card

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
  currency: string; // keep for potential future use; UI shows prices zonder €
  categories: MenuCategory[];
};

export const MENU: MenuData = {
  title: "Ons Menu",
  currency: "EUR",
  categories: [
    // ===================== KLASSIEKERS – KOUD =====================
    {
      name: "Klassiekers — Koud",
      items: [
        {
          name: "Vitello Tonnato",
          description: "Rund • Tonijnmayonaise • Kappertjes",
          price: 10.5,
          tags: [],
          allergens: ["vis", "eieren"],
        },
        {
          name: "Carpaccio",
          description: "Rund • Truffelmayo • Parmezaan",
          price: 10.5,
          tags: [],
          allergens: ["melk", "eieren"],
        },
        {
          name: "Gerookte Zalm",
          description: "Citroen • Dille • Komkommer",
          price: 10.5,
          tags: [],
          allergens: ["vis"],
        },
        {
          name: "Caprese",
          description: "Tomaat • Basilicum • Mozzarella",
          price: 10.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Gevuld Tomaatje",
          description: "Garnaal • Cocktailsaus • Tomaat",
          price: 10.5,
          tags: [],
          allergens: ["schaaldieren", "eieren"],
        },
        {
          name: "Biet Tartaar",
          description: "Geitenkaas • Walnoot • Honing",
          price: 10.5,
          tags: ["V"],
          allergens: ["melk", "noten"],
        },
        {
          name: "Bruschetta",
          description: "Knoflook • Olijfolie • Tomaat • Focaccia",
          price: 10.5,
          tags: ["V"],
          allergens: ["gluten"],
        },
        {
          name: "Gevulde Eitjes",
          description: "Mayonaise • Bieslook",
          price: 10.5,
          tags: ["V"],
          allergens: ["eieren", "mosterd"],
        },
      ],
    },

    // ===================== WARM =====================
    {
      name: "Warm",
      items: [
        {
          name: "Jan zijn soepje",
          description: "Groenten van de buren • Even vragen",
          price: 8.0,
          tags: ["V"],
          allergens: [],
        },
        {
          name: "Spare Ribs",
          description: "Van het bot vallend • Sweet & spicy",
          price: 9.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch kalfsvlees • Parmezaan",
          price: 9.5,
          tags: [],
          allergens: ["melk", "eieren"],
        },
        {
          name: "Vegetarische gehaktballetjes",
          description: "De Vegetarische Slager • Tomatensaus",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
        {
          name: "Ossobuco",
          description: "Polenta • Gremolata",
          price: 11.5,
          tags: [],
          allergens: [],
        },
        {
          name: "Dumplings",
          description: "Groenten dumplings • Crispy onions",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"],
        },
        {
          name: "Bao Bun",
          description: "Bao • Brisket of tofu • Sriracha-mayo",
          price: 8.5,
          tags: [],
          allergens: ["gluten", "soja", "eieren"],
        },
      ],
    },

    // ===================== DESSERT =====================
    {
      name: "Dessert",
      items: [
        {
          name: "Dame Blanche",
          description: "Warme chocolade • Vanille-ijs • Slagroom",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Parfait",
          description: "Vanille • Salted caramel",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "eieren"],
        },
        {
          name: "Appel gemakje",
          description: "Appel • Caramel • Amandel • Slagroom",
          price: 6.5,
          tags: ["V"],
          allergens: ["gluten", "noten", "melk"],
        },
        {
          name: "Vanille-ijs of Citroen sorbet (+2) — Vegan",
          description: "Keuze uit vanille-ijs of citroensorbet",
          price: 6.5,
          tags: ["VG"],
          allergens: [],
        },
        {
          name: "Dessert plankje",
          description: "Beetje van alles • 2 koffies + 5",
          price: 15.0,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
      ],
    },

    // ===================== KAZEN =====================
    {
      name: "Kazen",
      items: [
        {
          name: "Geiten brie",
          description: "Vijgenchutney • Jan z’n crackers",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Wilde Bloemenkaas",
          description: "Rozijnen • Dadelbrood",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Hoeve goud intens",
          description: "Rozijnen • Dadelbrood",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Oudwijker Fiore",
          description: "Biermosterd • Dadelbrood",
          price: 8.5,
          tags: ["V"],
          allergens: ["melk", "gluten", "mosterd"],
        },
        {
          name: "Manchego",
          description: "Geroosterde notenmix • Biermosterd",
          price: 9.0,
          tags: ["V"],
          allergens: ["melk", "noten", "mosterd"],
        },
        {
          name: "Arcadie Blauw",
          description: "Vijgencompote • Jan z’n cracker",
          price: 8.5,
          tags: ["V"],
          allergens: ["melk", "gluten"],
        },
      ],
    },

    // ===================== CHARCUTERIE =====================
    {
      name: "Charcuterie",
      items: [
        {
          name: "Veluwnaartje",
          description: "Kesbeke uitjes",
          price: 8.5,
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
          description: "Geconfijte knoflook • Crouton",
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
      ],
    },

    // ===================== BORREL & ARRANGEMENTEN =====================
    {
      name: "Borrel & arrangementen",
      items: [
        {
          name: "Peppadews",
          description: "Gevulde paprikatjes",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk"],
        },
        {
          name: "Olijven",
          description: "De Tafelaars kruidenmix",
          price: 4.5,
          tags: ["VG"],
          allergens: [],
        },
        {
          name: "Gerookte notenmix",
          description: "Huisgemaakte notenmix — Jan z’n recept",
          price: 3.5,
          tags: ["VG"],
          allergens: ["noten"],
        },
        {
          name: "Sardientjes",
          description: "Courgette • Knoflook • Ui • Basilicum",
          price: 6.5,
          tags: [],
          allergens: ["vis"],
        },
        {
          name: "Lekker borrellen",
          description: "Charcuterie- en kaasplankje",
          price: 12.5,
          tags: [],
          allergens: ["melk", "gluten"],
        },
        {
          name: "Chef’s choice",
          description: "4 gerechten die de chef speciaal voor u maakt",
          price: 38.0,
          tags: [],
          allergens: [],
        },
      ],
    },
  ],
};
