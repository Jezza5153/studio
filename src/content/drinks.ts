/* eslint-disable */
// Single source of truth for the drinks menu.
// Render however you like in your components (no € symbols included).
// Source: Drankkaart PDF (full transcription). :contentReference[oaicite:0]{index=0}

export type DrinkItem = {
  name: string;
  description?: string | null;
  // common price fields — use whichever applies for rendering
  price?: number | null;         // single price
  priceGlass?: number | null;    // per glass
  priceBottle?: number | null;   // per bottle
  priceSmall?: number | null;    // small
  priceLarge?: number | null;    // large
  // optional metadata
  abv?: string | null;           // e.g., "6.4%"
  notes?: string | null;         // extra notes (bio, serving note, etc.)
};

export type DrinkCategory = {
  name: string;
  items: DrinkItem[];
};

export type DrinkSection = {
  name: string;
  intro?: string | null;
  categories: DrinkCategory[];
};

export type DrinksData = {
  title: string;
  intro?: string | null;
  sections: DrinkSection[];
};

export const DRINKS: DrinksData = {
  title: "De Tafelaar Dranken",
  intro:
    "Bij De Tafelaar draait een drankje om verbinding. Van lokale bieren en biologische wijnen tot creatieve cocktails en kruidenrijke thee: elk drankje krijgt de aandacht die het verdient.",
  sections: [
    // ===== KOUDE DRANKEN =====
    {
      name: "Koude dranken",
      categories: [
        {
          name: "Biologische frisdranken",
          items: [
            { name: "Cola (Biologisch)", price: 3.2 },
            { name: "Cola zero", price: 3.2 },
            { name: "Sinas (Biologisch)", price: 3.2 },
            { name: "Tonic (Biologisch)", price: 3.2 },
            { name: "Ijsthee peach (Biologisch)", price: 3.2 },
            { name: "Coca Cola", price: 3.2 },
            { name: "Coca Cola zero", price: 3.2 },
            { name: "Spa blauw/rood", price: 3.0 },
            { name: "Spa blauw/rood (75 cl)", price: 6.75 },
            { name: "Fuze tea green", price: 3.2 },
            { name: "Fanta Cassis", price: 3.2 },
            { name: "Royal Bliss Bitter lemon", price: 3.2 },
            { name: "Royal Bliss Ginger ale", price: 3.2 },
            { name: "Rivella", price: 3.2 },
            { name: "Zuivelrijck Chocomelk", price: 3.2 },
            { name: "Fever Tree Gingerbeer", price: 4.5 },
            { name: "Fever Tree Indian Tonic", price: 4.5 },
            { name: "Fever Tree Tonic Clementine & Cinnamon", price: 4.5 },
          ],
        },
        {
          name: "Vruchtensappen",
          items: [
            { name: "Appelsap (Biologisch)", price: 3.5, notes: "Van de boomgaard." },
            { name: "Appelschorle (Biologisch, Appelsap & Bruiswater)", price: 3.5 },
            { name: "Jus d’Orange", price: 4.0 },
          ],
        },
        {
          name: "Roze Bunker siropen",
          items: [
            { name: "Citrus Movement", price: 3.5, notes: "Servering ± 35 ml siroop, met plat of bruisend water." },
            { name: "Gekke Bessen", price: 3.5 },
            { name: "Madame Gember", price: 3.5 },
            { name: "Bitter Bloed", price: 3.5 },
          ],
        },
      ],
    },

    // ===== WARME DRANKEN =====
    {
      name: "Warme dranken",
      categories: [
        {
          name: "Koffie",
          items: [
            { name: "Koffie", price: 3.2, notes: "Ook decafé / met havermelk verkrijgbaar." },
            { name: "Espresso (enkel)", price: 3.2 },
            { name: "Espresso (dubbel)", price: 4.2 },
            { name: "Cappuccino", price: 3.7 },
            { name: "Latte Macchiato", price: 4.2 },
            { name: "Flat White", price: 4.7 },
            { name: "Koffie verkeerd", price: 3.7 },
            { name: "Chai Latte", price: 4.7 },
          ],
        },
        {
          name: "Thee",
          items: [
            { name: "Thee (diverse smaken)", price: 3.0 },
            { name: "Verse Munt", price: 4.0 },
            { name: "Verse Gember", price: 4.0 },
            { name: "Verse Munt & Gember", price: 4.5 },
            { name: "Regenboogthee", price: 4.5, notes: "Verse munt, gember, sinaasappel & citroen" },
            { name: "Gember & Sinaasappel met Kaneel", price: 4.5 },
          ],
        },
        {
          name: "Warme Chocomelk",
          items: [
            { name: "Warme Chocomelk", price: 3.5, notes: "Met slagroom +0.5" },
          ],
        },
        {
          name: "Speciale Koffie",
          items: [
            { name: "Ijskoffie", price: 4.7 },
            { name: "Italian Coffee", price: 8.75 },
            { name: "French Coffee", price: 8.75 },
            { name: "Spanish Coffee", price: 8.75 },
            { name: "Irish Coffee", price: 8.75 },
            { name: "Baileys Coffee", price: 8.75 },
          ],
        },
      ],
    },

    // ===== BIEREN =====
    {
      name: "Bieren",
      intro:
        "Van Tafelaar Pils en Weizen tot lokale brouwsels. Vraag naar de wissel/seizoenstap. Ook 750 ml flessen beschikbaar.",
      categories: [
        {
          name: "Van de tap",
          items: [
            { name: "Tafelaar Pils", priceSmall: 3.5, priceLarge: 6.75 },
            { name: "Tafelaar Weizen", priceSmall: 6.0, priceLarge: 9.5 },
            { name: "Amersfoortse Wisseltap (33 cl)", price: 7.5 },
            { name: "Seizoenswissel Tap (33 cl)", price: 7.5 },
          ],
        },
        {
          name: "Bieren op fles of blik",
          items: [
            { name: "’t Mirakel Lieve Vrouw (blond)", abv: "6.4%", price: 6.5 },
            { name: "Eem Tierig (IPA)", abv: "6.7%", price: 7.0 },
            { name: "Rockcity Double Date (DIPA)", abv: "7.5%", price: 8.0 },
            { name: "Drie ringen Dubbel (dubbel)", abv: "6.5%", price: 7.0 },
            { name: "Drie ringen Silver (dunkelweizen)", abv: "5%", price: 7.0 },
            { name: "’t Mirakel de Vondst (tripel)", abv: "8.4%", price: 6.5 },
            { name: "Eem Potig (stout)", abv: "7.5%", price: 7.0 },
          ],
        },
        {
          name: "Alcoholvrije bieren",
          items: [
            { name: "Hertog Jan 0.0%", price: 4.0 },
            { name: "Amstel Radler 0.0%", price: 4.0 },
            { name: "vandeStreek Playground IPA 0.0%", price: 6.5 },
          ],
        },
      ],
    },

    // ===== WIJNEN =====
    {
      name: "Wijnen",
      intro:
        "Biologisch en karaktervol. Vraag naar de verdere selectie. Ook per fles en soms 350 ml beschikbaar.",
      categories: [
        // WIT
        {
          name: "Witte wijn",
          items: [
            {
              name: "Viognier (Languedoc, Frankrijk)",
              description: "Fris, bloemig, perzik, abrikoos, tropisch fruit, droog",
              priceBottle: 29.0,
              priceGlass: 5.75,
            },
            {
              name: "Pinot Grigio 'Berico' (Veneto, Italië)",
              description: "Fris, aperitief, kruisbesje, peertje, perzik, zuurtjes",
              priceBottle: 32.5,
              priceGlass: 6.5,
            },
            {
              name: "Rioja Blanco (Domeco de Jarauta, Rioja, Spanje)",
              description: "Garnacha/Viura, houttoets, elegant, rijk, zacht",
              priceBottle: 35.0,
              priceGlass: 7.0,
            },
            {
              name: "Riesling (Fränz Jäckel, Nahe, Duitsland)",
              description: "Verfijnd, speels, vol, zacht, buxus, prettig zurenspel",
              priceBottle: 37.5,
            },
            {
              name: "Albariño 'Antonio Montero' (Rias Baixas, Spanje)",
              description: "Complex, vol, fris, grapefruit, limoen, balans",
              priceBottle: 42.5,
            },
            {
              name: "Chardonnay (Nuiton-Beaunoy, Bourgogne, Frankrijk)",
              description: "Vol, zacht, breed, hout, vanille, boter",
              priceBottle: 47.5,
            },
            {
              name: "Lugana 'Sirmio' Sgreva (Gardameer, Italië)",
              description: "Vol, rijk, elegant, gul, rond, wit fruit, limoen",
              priceBottle: 47.5,
            },
            {
              name: "Blanc de Trílogía (Casa Los Frailes, Valencia, Spanje)",
              description: "Biodynamisch, zuurtjes, frisheid, elegant, finesse",
              priceBottle: 49.0,
            },
            {
              name: "Grand Blanc de Sannes (Les Préludes, Bourgogne, Frankrijk)",
              description: "Aromatisch, complexiteit, lengte, wit fruit, violet, specerijen, diep",
              priceBottle: 65.0,
            },
            {
              name: "Sancerre (Alphonse Dolly, Loire, Frankrijk)",
              description:
                "Citrusvruchten, exotisch fruit, expressief, verfijnd, fris, krachtig, complex",
              priceBottle: 65.0,
            },
            {
              name: "Saint-Véran 'Au bois de Fée' (Domaine Chardigny, Bourgogne, Frankrijk)",
              description: "Krachtig, vol, breed, diep, hout, geel fruit, complex",
              priceBottle: 82.5,
            },
          ],
        },
        // ROOD
        {
          name: "Rode wijn",
          items: [
            {
              name: "Merlot (Languedoc, Frankrijk)",
              description: "Soepel, fruitig, bessen, bramen, rond, zacht, elegant",
              priceBottle: 29.0,
              priceGlass: 5.75,
            },
            {
              name: "Montepulciano d'Abruzzo (El Origini, Abruzzo, Italië)",
              description: "Krachtig, rond, zachte tannines, bosaardbei, blauwe bes, smaakvol",
              priceBottle: 32.5,
              priceGlass: 6.5,
            },
            {
              name: "Rioja 'Vendimia Seleccionada' (Domeco de Jarauta, Rioja, Spanje)",
              description: "Rijk, hout, vanille, rood fruit, viooltjes, mineraal, gebalanceerd",
              priceBottle: 37.5,
              priceGlass: 7.5,
            },
            {
              name: "Monastrell (Casa Los Frailes, Valencia, Spanje)",
              description: "Biodynamisch, vin de plaisir, fris, zacht, sappig, rond",
              priceBottle: 37.5,
            },
            {
              name: "Rioja Crianza 2018 (Pago de Larrea, Rioja, Spanje)",
              description:
                "Hout, vanille, kers, rijp fruit, kruiden, vlezig, rijpe tannine, zacht",
              priceBottle: 40.0,
            },
            {
              name: "Valpolicella Classico Superiore (San Rustico, Verona, Italië)",
              description: "Aromatisch, kersen, bessen, kruiden, laurier, zurenspel",
              priceBottle: 42.5,
            },
            {
              name: "Pinot Noir (Nuiton-Beaunoy, Bourgogne, Frankrijk)",
              description: "Peperig, rood fruit, kers, framboos, houttoets, sappig",
              priceBottle: 49.0,
            },
            {
              name: "Cedro Riserva 2017 (Fattoria Lavacchio, Chianti Rufina, Italië)",
              description: "Biodynamisch, beheerst krachtig, hout, tabak, zoethout, kers",
              priceBottle: 58.0,
            },
            {
              name: "Jebatschin (Pasji Rep, Vipava Vallei, Slovenië)",
              description: "Biodynamisch, complex, robuust, richesse, boers, zwarte bes, bramen",
              priceBottle: 63.0,
            },
            {
              name: "Margaux (Château Desmirail, Bordeaux, Frankrijk)",
              description: "Expressief, floraal, cassis, peper, complex, rood fruit, tannine",
              priceBottle: 65.0,
            },
            {
              name: "Châteauneuf-du-Pape (Domaine de la Président, Rhône, Frankrijk)",
              description: "Dik hout, rood fruit, kersen, bramen, kruiderij, groots",
              priceBottle: 95.0,
            },
          ],
        },
        // ROSÉ
        {
          name: "Rosé",
          items: [
            {
              name: "Grenache (Languedoc, Frankrijk)",
              description: "Licht, fruitig, aardbei, framboos, bessen, kruidig, zacht, halfdroog",
              priceBottle: 29.0,
              priceGlass: 5.75,
            },
            {
              name: "Mon Minet (Bordeaux, Frankrijk)",
              description: "Bloemen, anijs, sappig, kruisbes, framboos, souplesse",
              priceBottle: 32.5,
              priceGlass: 6.5,
            },
            {
              name: "Moulin de Sannes (Château de Sannes, Luberon, Frankrijk)",
              description: "Rijk, sap, fruitig, aardbei, framboos, bes, elegant",
              priceBottle: 40.0,
            },
          ],
        },
        // BUBBELS
        {
          name: "Bubbels",
          items: [
            { name: "Prosecco Spumante (wit) – Villa Braida, Veneto", priceBottle: 39.5, priceGlass: 6.5 },
            { name: "Prosecco Spumante (rosé) – Villa Braida, Veneto", priceBottle: 39.5 },
          ],
        },
        // DESSERTWIJNEN
        {
          name: "Dessertwijnen",
          items: [
            { name: "Moscatel Liquor (Central-Portugal)", priceBottle: 48.0, priceGlass: 7.0 },
            { name: "Ruby Port (Douro, Portugal)", priceBottle: 52.0, priceGlass: 6.0 },
            { name: "Tawny Port (Douro, Portugal)", priceBottle: 55.0, priceGlass: 6.5 },
            { name: "LBV 2018 Port (Douro, Portugal)", priceBottle: 64.0, priceGlass: 7.5 },
          ],
        },
      ],
    },

    // ===== STERKE DRANK =====
    {
      name: "Sterke drank",
      categories: [
        {
          name: "Jenever",
          items: [
            { name: "Jajem Organic, jonge jenever", price: 4.5 },
            { name: "The Stillery's Ouwe Spelt Jenever", price: 7.0 },
          ],
        },
        {
          name: "Whisky’s",
          items: [
            { name: "The Famous Grouse", price: 5.0 },
            { name: "Jameson", price: 5.5 },
            { name: "Talisker Skye", price: 6.5 },
            { name: "Millstone Rye 92", price: 7.5 },
            { name: "Millstone Rye 100", price: 11.0 },
          ],
        },
        {
          name: "Gedistilleerd",
          items: [
            { name: "Eristoff Vodka", price: 4.5 },
            { name: "Bacardi Carte Blanca", price: 4.5 },
            { name: "Bacardi Carte Negra", price: 5.5 },
            { name: "Sierra Silver Tequila", price: 4.5 },
          ],
        },
        {
          name: "Likeuren",
          items: [
            { name: "Tafelaartje (venkel-likeur)", price: 5.0 },
            { name: "AMICI Limoncello", price: 6.0 },
            { name: "Dik en Schil Passievrucht", price: 7.0 },
            { name: "Dik en Schil Orangecello", price: 7.0 },
            { name: "Amaretto Disaronno", price: 5.0 },
            { name: "Malibu", price: 4.5 },
            { name: "Licor 43", price: 5.0 },
            { name: "Tia Maria", price: 5.0 },
            { name: "Kahlúa", price: 5.0 },
            { name: "Cointreau", price: 6.0 },
            { name: "Jägermeister", price: 4.5 },
            { name: "Salmari", price: 4.5 },
          ],
        },
      ],
    },

    // ===== COCKTAILS & MOCKTAILS =====
    {
      name: "Cocktails & Mocktails",
      categories: [
        {
          name: "Cocktails",
          items: [
            { name: "Aperol Spritz", description: "Aperol, Cava, bruiswater & sinaasappel", price: 9.5 },
            { name: "Limoncello Spritz", description: "Limoncello, Cava, bruiswater, limoen & citroen", price: 9.5 },
            { name: "Passie Spritz", description: "Passiecello, Cava, bruiswater & passievrucht", price: 9.5 },
            { name: "Moscow Mule", description: "Vodka, gingerbeer & limoen", price: 10.5 },
            { name: "Dark ‘n Stormy", description: "Donkere rum, gingerbeer & limoen", price: 10.5 },
            { name: "Mojito", description: "Witte rum, limoensap, bruiswater, rietsuiker & munt", price: 11.0 },
            { name: "Pornstar Martini", description: "Vodka, passievruchtsap, limoensap & vanillesuiker", price: 12.5 },
            { name: "Espresso Martini", description: "Vodka, Kahlúa, espresso & caramelsiroop", price: 12.5 },
          ],
        },
        {
          name: "Gin & Tonic’s",
          items: [
            { name: "Gin & Tonic", description: "Gin, tonic & komkommer", price: 9.5 },
            { name: "Gin & Tonic Citrus", description: "Lemon gin, tonic, limoen & citroen", price: 10.5 },
            { name: "Gin & Tonic Herfstig", description: "Gin, clementine & cinnamon tonic, sinaasappel & kaneel", price: 10.5 },
          ],
        },
        {
          name: "Mocktails",
          items: [
            { name: "Gin & Tonic 0.0%", description: "Gin 0.0%, tonic & komkommer", price: 9.0 },
            { name: "Ginger Mule", description: "Gingerbeer, limoensap & limoen", price: 8.5 },
            { name: "Virgin Mojito", description: "Limoensap, ginger ale, bruiswater, rietsuiker & munt", price: 9.0 },
          ],
        },
      ],
    },
  ],
};
