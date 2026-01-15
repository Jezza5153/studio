
import type { Metadata } from "next";
import { NeighborhoodGuideClient } from "./neighborhood-guide-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Buurtgids De Flint & Kamp | Restaurant bij Theater De Flint Amersfoort",
  description:
    "Op zoek naar een restaurant bij Theater De Flint? De Tafelaar ligt op 2 minuten lopen. Ontdek parkeren, hotspots en de leukste eetplekken op de Kamp in Amersfoort.",
  alternates: {
    canonical: "/buurtgids",
  },
  openGraph: {
    title: "Buurtgids De Flint - Restaurants & Hotspots Amersfoort",
    description: "De beste restaurants en parkeren bij Theater De Flint. De Tafelaar ligt in de Kamp, op 2 min lopen.",
  },
  keywords: ["restaurant de flint", "eten theater amersfoort", "restaurant kamp amersfoort", "parkeren de flint", "shared dining amersfoort"],
};


export default function BuurtgidsPage() {
  return <NeighborhoodGuideClient />;
}

