// Kerstdiner 2026: alle feiten op een plek. De balk en het blok op de voorpagina, de pagina
// /kerstdiner-amersfoort, de sitemap en de redirect in src/middleware.ts lezen hieruit.
//
// Na 25 december verdwijnt alles vanzelf: de voorpagina (ververst elk uur) laat de balk en
// het blok weg en /kerstdiner-amersfoort stuurt tijdelijk (307) door naar /agenda, zodat
// hetzelfde adres volgend jaar terug kan komen. Voor kerst 2027: datums, tijden en prijzen
// hieronder aanpassen en ZICHTBAAR_TOT een jaar verder zetten.

export const KERSTDINER_PAD = "/kerstdiner-amersfoort";

/** Eerste moment waarop het kerstdiner niet meer getoond wordt (26 december 00:00, Amsterdamse tijd). */
const ZICHTBAAR_TOT = "2026-12-26T00:00:00+01:00";

export function kerstdinerActief(now: Date = new Date()): boolean {
  return now.getTime() < Date.parse(ZICHTBAAR_TOT);
}

export const kerstdiner = {
  jaar: 2026,
  datumsKort: "24 & 25 december",
  datumsLang: "Donderdag 24 & vrijdag 25 december",
  dagen: [
    { naam: "Kerstavond", datum: "donderdag 24 december", iso: "2026-12-24" },
    { naam: "Eerste kerstdag", datum: "vrijdag 25 december", iso: "2026-12-25" },
  ],
  // Tweede tafel heeft geen eindtijd ("tot klaar").
  tafels: [
    { naam: "1e tafel", start: "17:30", eind: "20:00", tekst: "17:30 – 20:00" },
    { naam: "2e tafel", start: "20:15", eind: null, tekst: "vanaf 20:15, zonder eindtijd" },
  ],
  tafelsKort: "17:30 – 20:00 of vanaf 20:15",
  prijs: 65,
  wijnarrangement: 35,
  wijnarrangementTekst: "inclusief champagne bij ontvangst",
  alleenKerstmenu: "Op 24 en 25 december serveren we alleen het kerstmenu, niet de gewone kaart.",
  // Het menu volgt nog. Zolang het er niet is, toont de pagina deze tekst.
  menuVolgt: "We leggen de laatste hand aan het kerstmenu. Zodra het klaar is, lees je hier wat er op tafel komt.",
  foto: {
    src: "/pics/huiskamer-vol.jpg",
    alt: "Gasten proosten bij kaarslicht in de volle huiskamer van De Tafelaar op de Kamp in Amersfoort",
  },
} as const;
