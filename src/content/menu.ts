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
      name: "Bites",
      items: [
        {
          name: "Olijven gemarineerd",
          description: "Huisgemarineerde olijven met citroen en kruiderij",
          price: 5.5,
          tags: [
            "V",
            "VG",
            "GF"
          ],
          allergens: []
        },
        {
          name: "Brood & boter",
          description: "Desem, gekarnde boter, zeezout",
          price: 6.5,
          tags: [
            "V"
          ],
          allergens: [
            "gluten",
            "melk"
          ]
        },
        {
          name: "Peppadews",
          description: "Gevulde pepertjes met roomkaas",
          price: 7.5,
          tags: [
            "V",
            "GF"
          ],
          allergens: [
            "melk"
          ]
        },
        {
          name: "Gevulde eitjes",
          description: "Mayonaise, bieslook, kerrie",
          price: 7,
          tags: [
            "V",
            "GF"
          ],
          allergens: [
            "eieren",
            "mosterd"
          ]
        },
        {
          name: "Fuet",
          description: "Spaanse gedroogde worst",
          price: 8.5,
          tags: [
            "GF"
          ],
          allergens: []
        }
      ]
    },
    {
      name: "Koud",
      items: [
        {
          name: "Runder tartaar",
          description: "Kappertjes, mosterd, eidooier",
          price: 13.5,
          tags: [],
          allergens: [
            "eieren",
            "mosterd"
          ]
        },
        {
          name: "Burrata",
          description: "Tomaat, basilicum, balsamico",
          price: 12.5,
          tags: [
            "V",
            "GF"
          ],
          allergens: [
            "melk"
          ]
        },
        {
          name: "Gerookte zalm",
          description: "Citroen, dille, komkommer",
          price: 13,
          tags: [
            "GF"
          ],
          allergens: [
            "vis"
          ]
        },
        {
          name: "Biet tartaar",
          description: "Geitenkaas, walnoot, honing",
          price: 11,
          tags: [
            "V",
            "GF"
          ],
          allergens: [
            "melk",
            "noten"
          ]
        },
        {
          name: "Vitello tonnato",
          description: "Kalf, tonijnmayonaise, kappertjes",
          price: 14,
          tags: [],
          allergens: [
            "vis",
            "eieren"
          ]
        },
        {
          name: "Carpaccio",
          description: "Rund, truffelmayo, parmezaan",
          price: 13.5,
          tags: [
            "GF"
          ],
          allergens: [
            "melk",
            "eieren"
          ]
        },
        {
          name: "Caprese",
          description: "Tomaat, basilicum, mozzarella",
          price: 10,
          tags: [
            "V",
            "GF"
          ],
          allergens: [
            "melk"
          ]
        }
      ]
    },
    {
      name: "Warm",
      items: [
        {
          name: "Gehaktballetjes",
          description: "Kalf, parmezaan, bieslook",
          price: 9.5,
          tags: [],
          allergens: [
            "melk",
            "gluten",
            "eieren"
          ]
        },
        {
          name: "Jan zijn soepje",
          description: "Vraag naar de soep van de dag",
          price: 7.5,
          tags: [],
          allergens: []
        },
        {
          name: "Runder stoofpotje",
          description: "Ui, wortel, pastinaak",
          price: 14.5,
          tags: [
            "GF"
          ],
          allergens: []
        },
        {
          name: "Ossobuco",
          description: "Polenta, gremolata",
          price: 16,
          tags: [
            "GF"
          ],
          allergens: []
        },
        {
          name: "Bao bun brisket",
          description: "Brisket, sriracha-mayo, lente-ui",
          price: 12.5,
          tags: [],
          allergens: [
            "gluten",
            "soja",
            "eieren"
          ]
        },
        {
          name: "Bao bun tofu",
          description: "Krokante tofu, sriracha-mayo, lente-ui",
          price: 12.5,
          tags: [
            "V"
          ],
          allergens: [
            "gluten",
            "soja",
            "eieren"
          ]
        }
      ]
    },
    {
      name: "Zoet",
      items: [
        {
          name: "Appeltaartje",
          description: "Appel, caramel, amandel, slagroom",
          price: 8,
          tags: [
            "V"
          ],
          allergens: [
            "gluten",
            "melk",
            "noten"
          ]
        },
        {
          name: "Parfait",
          description: "Fruit van het seizoen, crumble",
          price: 9,
          tags: [
            "V",
            "GF"
          ],
          allergens: [
            "melk",
            "eieren"
          ]
        },
        {
          name: "Dame Blanche",
          description: "Warme chocolade, vanille-ijs, slagroom",
          price: 8.5,
          tags: [
            "V",
            "GF"
          ],
          allergens: [
            "melk"
          ]
        },
        {
          name: "Crème brûlée",
          description: "Een Franse klassieker",
          price: 8.5,
          tags: [
            "V",
            "GF"
          ],
          allergens: [
            "melk",
            "eieren"
          ]
        }
      ]
    },
    {
      name: "Planken",
      items: [
        {
          name: "Beetje van beiden",
          description: "2 Kaasjes & 2 Charcuterietjes",
          price: 24.5,
          tags: [],
          allergens: [
            "melk",
            "gluten"
          ]
        },
        {
          name: "Flinke jongen",
          description: "3 Kaasjes, 3 Charcuterietjes & 3 Gerechtjes",
          price: 55,
          tags: [],
          allergens: [
            "melk",
            "gluten",
            "eieren",
            "vis"
          ]
        },
        {
          name: "Kan niet kiezen",
          description: "Laat de chef kiezen, een reis door de kaart (p.p.)",
          price: 45,
          tags: [],
          allergens: []
        }
      ]
    }
  ]
};
