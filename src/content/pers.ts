// Redactionele aandacht voor De Tafelaar (geen betaalde artikelen). Nieuw artikel? Bovenaan toevoegen.
// Wordt getoond op /over-ons#pers en de homepage, en als subjectOf in de Restaurant-gegevens voor Google en AI.

export type PersItem = {
  medium: string;
  titel: string;
  url: string;
  /** JJJJ-MM-DD, of alleen JJJJ als de exacte datum onbekend is */
  datum: string;
  soort: "artikel" | "podcast";
};

export const pers: PersItem[] = [
  {
    medium: "Trouw",
    titel: "Chefkok Jeremy bouwde samen met ChatGPT een reserveringssysteem",
    url: "https://www.trouw.nl/duurzaamheid-economie/chefkok-jeremy-bouwde-samen-met-chatgpt-een-reserveringssysteem~b6f25c8e/",
    datum: "2026-05-22",
    soort: "artikel",
  },
  {
    medium: "Entree Magazine",
    titel: "Nieuwe restaurants in Amersfoort die een bezoek waard zijn",
    url: "https://www.entreemagazine.nl/openingen-design/nieuwe-restaurants-amersfoort-deze-6-zijn-een-bezoek-waard-tips",
    datum: "2026",
    soort: "artikel",
  },
  {
    medium: "AD Amersfoort",
    titel: "Amersfoortse te zien in Winter Vol Liefde, een gastchef-avond bij De Tafelaar en meer nieuwtjes van afgelopen week",
    url: "https://www.ad.nl/amersfoort/amersfoortse-te-zien-in-winter-vol-liefde-een-gastchef-avond-bij-de-tafelaar-en-meer-nieuwtjes-van-afgelopen-week~a2791ec1/",
    datum: "2026-02-08",
    soort: "artikel",
  },
  {
    medium: "Gooische Business (podcast)",
    titel: "Interview met chef Jeremy Arrascaeta en eigenaar Jan Molmans",
    url: "https://open.spotify.com/episode/67uEJeqkVDtZD6Sryv4RMF",
    datum: "2026-02-06",
    soort: "podcast",
  },
  {
    medium: "AD Amersfoort",
    titel: "Uittip! Restaurant De Tafelaar organiseert eerste gastchef-avond",
    url: "https://www.ad.nl/amersfoort/uittip-restaurant-de-tafelaar-organiseert-eerste-gastchef-avond~a88c021a/",
    datum: "2026-02-04",
    soort: "artikel",
  },
  {
    medium: "indebuurt Amersfoort",
    titel: "Jan opent (nu echt!) restaurant De Tafelaar in Amersfoort",
    url: "https://indebuurt.nl/amersfoort/nieuws/nieuw-in/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~343981/",
    datum: "2025-11-22",
    soort: "artikel",
  },
  {
    medium: "AD Amersfoort",
    titel: "Jan begint restaurant De Tafelaar in Amersfoort: 'Ook in je eentje mag je bij mij aanschuiven'",
    url: "https://www.ad.nl/amersfoort/jan-begint-restaurant-de-tafelaar-in-amersfoort-ook-in-je-eentje-mag-je-bij-mij-aanschuiven~a03f2282/",
    datum: "2025-09-20",
    soort: "artikel",
  },
  {
    medium: "indebuurt Amersfoort",
    titel: "Jan begint restaurant De Tafelaar in Amersfoort: 'Ook in je eentje mag je bij mij aanschuiven'",
    url: "https://indebuurt.nl/amersfoort/amersfoorters/jan-begint-restaurant-de-tafelaar-in-amersfoort-ook-in-je-eentje-mag-je-bij-mij-aanschuiven~339967/",
    datum: "2025-09-19",
    soort: "artikel",
  },
];

/** Unieke mediumnamen in volgorde van verschijnen, voor de regel "Bekend van ..." */
export const persMedia = [...new Set(pers.map((p) => p.medium.replace(/ \(podcast\)$/, "")))];

export function persDatum(datum: string) {
  if (/^\d{4}$/.test(datum)) return datum;
  return new Date(`${datum}T12:00:00`).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

/** schema.org subjectOf voor de Restaurant-entiteit */
export function persJsonLd() {
  return pers.map((p) =>
    p.soort === "podcast"
      ? { "@type": "PodcastEpisode", name: p.titel, url: p.url, datePublished: p.datum }
      : {
          "@type": "NewsArticle",
          headline: p.titel,
          url: p.url,
          ...(p.datum.length > 4 ? { datePublished: p.datum } : {}),
          publisher: { "@type": "Organization", name: p.medium },
        },
  );
}
