// AUTO-GENERATED from De Tafelaar menu text
export type MenuTag = "V" | "VG" | "GF" | string;

export type MenuItem = {
  name: string;
  description?: string;
  price: number | null;
  tags: MenuTag[];
  allergens: string[];
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

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
      name: "Klassiekers - Koud",
      items: [
        {
          name: "Vitello Tonnato",
          description: "Rund - Tonijnmayonaise - Kappertjes",
          price: 10.5,
          tags: [],
          allergens: ["vis", "eieren"]
        },
        {
          name: "Carpaccio",
          description: "Rund - Truffelmayo - Parmesan",
          price: 10.5,
          tags: [],
          allergens: ["melk", "eieren"]
        },
        {
          name: "Gerookte Zalm",
          description: "Citroen - Dille - Komkommer",
          price: 10.5,
          tags: [],
          allergens: ["vis"]
        },
        {
          name: "Caprese",
          description: "Tomaat - Basillicum - Mozzarella",
          price: 10.5,
          tags: ["V"],
          allergens: ["melk"]
        },
        {
          name: "Gevuld Tomaatje",
          description: "Garnaal - Cocktailsaus - Tomaat",
          price: 10.5,
          tags: [],
          allergens: ["schaaldieren", "eieren"]
        },
        {
          name: "Biet Tartaar",
          description: "Geitenkaas - Walnoot - Honing",
          price: 10.5,
          tags: ["V"],
          allergens: ["melk", "noten"]
        },
        {
          name: "Bruschetta",
          description: "Knoflook - Olijfolie - Tomaat - Focaccia",
          price: 10.5,
          tags: ["V"],
          allergens: ["gluten"]
        },
        {
          name: "Gevulde Eitjes",
          description: "Mayonaise - Bieslook",
          price: 10.5,
          tags: ["V"],
          allergens: ["eieren", "mosterd"]
        }
      ]
    },
    {
      name: "Warm",
      items: [
        {
          name: "Jan zijn soepje",
          description: "Groenten van de buren - Even vragen",
          price: 8.0,
          tags: ["V"],
          allergens: []
        },
        {
          name: "Spare Ribs",
          description: "Van het bot vallend, sweet and spicy",
          price: 9.5,
          tags: [],
          allergens: []
        },
        {
          name: "Gehaktballetjes",
          description: "Biologisch kalfsvlees - Parmesan",
          price: 9.5,
          tags: [],
          allergens: ["melk", "eieren"]
        },
        {
          name: "Vegetarische gehaktballetjes",
          description: "De vegetarische slager balletjes - Tomatensaus",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"]
        },
        {
          name: "Ossobuco",
          description: "Polenta - Gremolata",
          price: 11.5,
          tags: [],
          allergens: []
        },
        {
          name: "Dumplings",
          description: "Groenten dumplings - Crispy onions",
          price: 9.5,
          tags: ["V"],
          allergens: ["gluten", "soja"]
        },
        {
          name: "Bao Bun",
          description: "Bao - Brisket of Tofu - Sriracha mayo",
          price: 9.5,
          tags: [],
          allergens: ["gluten", "soja", "eieren"]
        }
      ]
    },
    {
      name: "Dessert",
      items: [
        {
          name: "Dame Blanche",
          description: "Warme Chocolade - Vanille ijs - Slagroom",
          price: 8.5,
          tags: ["V"],
          allergens: ["melk"]
        },
        {
          name: "Parfait",
          description: "Vanille - Salted Caramel",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk", "eieren"]
        },
        {
          name: "Appel gemakje",
          description: "Appel - Caramel - Amandel - Slagroom",
          price: 7.0,
          tags: ["V"],
          allergens: ["gluten", "noten", "melk"]
        },
        {
          name: "Vanille ijs of Citroen sorbet + 2 Vegan",
          description: "Food description here, please explain",
          price: 6.5,
          tags: ["VG"],
          allergens: []
        },
        {
          name: "Dessert plankje",
          description: "Kan je niet kiezen? Neem een beetje van alles - 2 koffies + 5",
          price: 15.0,
          tags: ["V"],
          allergens: ["melk", "gluten"]
        }
      ]
    },
    {
      name: "Kazen",
      items: [
        {
          name: "Geiten brie",
          description: "Vijgen chutney - Jan zen crackers",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk", "gluten"]
        },
        {
          name: "Wilde Bloemenkaas",
          description: "Rozijnen - Dadelbrood",
          price: 7.0,
          tags: ["V"],
          allergens: ["melk", "gluten"]
        },
        {
          name: "Hoeve goud intens",
          description: "Rozijnen - Dadelbrood",
          price: 7.5,
          tags: ["V"],
          allergens: ["melk", "gluten"]
        },
        {
          name: "Oudwijker Fiore",
          description: "Bier mosterd - Dadel brood",
          price: 8.5,
          tags: ["V"],
          allergens: ["melk", "gluten", "mosterd"]
        },
        {
          name: "Manchego",
          description: "Geroosterde notenmix - Bier mosterd",
          price: 9.0,
          tags: ["V"],
          allergens: ["melk", "noten", "mosterd"]
        },
        {
          name: "Arcadie Blauw",
          description: "Vijgen compote - Jan zen cracker",
          price: 8.5,
          tags: ["V"],
          allergens: ["melk", "gluten"]
        }
      ]
    },
    {
      name: "Charcuterie",
      items: [
        {
          name: "Veluwnaartje",
          description: "Kesbeke uitjes",
          price: 8.5,
          tags: [],
          allergens: []
        },
        {
          name: "Venkelworstje",
          description: "Kesbeke cornichon",
          price: 7.0,
          tags: [],
          allergens: []
        },
        {
          name: "Prosciutto",
          description: "Geconfijte Knoflook - Crouton",
          price: 7.0,
          tags: [],
          allergens: ["gluten"]
        },
        {
          name: "Peperworstje",
          description: "Kesbeke cornichon",
          price: 8.0,
          tags: [],
          allergens: []
        },
        {
          name: "Gedroogde Twentse worst",
          description: "Kesbeke cornichon",
          price: 7.0,
          tags: [],
          allergens: []
        }
      ]
    },
    {
      name: "Borrel & Arrangementen",
      items: [
        {
          name: "Peppadews",
          description: "Gevulde paprikatjes",
          price: 6.5,
          tags: ["V"],
          allergens: ["melk"]
        },
        {
          name: "Olijven",
          description: "De Tafelaars kruidenmix",
          price: 4.5,
          tags: ["VG"],
          allergens: []
        },
        {
          name: "Gerookte Notenmix",
          description: "Huisgemaakte notenmix - Jan zijn recept",
          price: 3.5,
          tags: ["VG"],
          allergens: ["noten"]
        },
        {
          name: "Sardientjes",
          description: "Courgette - Knoflook - Ui - Basilicum",
          price: 6.5,
          tags: [],
          allergens: ["vis"]
        },
        {
          name: "Lekker borrellen",
          description: "Een leuk charcuterie en kaas plankje",
          price: 12.5,
          tags: [],
          allergens: ["melk", "gluten"]
        },
        {
          name: "Chefs choice",
          description: "4 gerechten die de chef speciaal voor u maakt",
          price: 38.0,
          tags: [],
          allergens: []
        }
      ]
    }
  ]
};
