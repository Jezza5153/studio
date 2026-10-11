// Gedeelde metadata voor alle pagina's.
//
// Next.js voegt openGraph niet diep samen: zodra een pagina een eigen openGraph zet, vervalt die
// van de root layout volledig (ook og:site_name en og:locale). Spreid daarom sharedOpenGraph
// bovenaan elke openGraph. De sitenaam moet overal gelijk zijn aan de WebSite JSON-LD op de
// homepage, zodat Google "De Tafelaar" als sitenaam toont.
export const SITE_NAME = "De Tafelaar";
export const SITE_URL = "https://www.tafelaaramersfoort.nl";

export const sharedOpenGraph = {
  siteName: SITE_NAME,
  locale: "nl_NL",
  type: "website",
} as const;
