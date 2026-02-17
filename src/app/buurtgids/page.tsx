
import type { Metadata } from "next";
import { NeighborhoodGuideClient } from "./neighborhood-guide-client";

export const dynamic = "force-static"; // SQLite only available at build time on Vercel

export const metadata: Metadata = {
  title: "Buurtgids De Flint & Kamp | Eten bij Theater De Flint Amersfoort",
  description:
    "Op zoek naar eten dichtbij Theater De Flint? De Tafelaar ligt op 2 minuten lopen. Ontdek de beste restaurants naast De Flint, parkeren en hotspots op de Kamp in Amersfoort.",
  alternates: {
    canonical: "/buurtgids",
  },
  openGraph: {
    title: "Buurtgids De Flint - Eten & Restaurants naast Theater De Flint",
    description: "De beste restaurants en eten dichtbij Theater De Flint Amersfoort. De Tafelaar ligt in de Kamp, op 2 min lopen.",
  },
  keywords: [
    "eten dichtbij de flint",
    "eten naast de flint",
    "restaurant de flint",
    "eten theater de flint",
    "restaurant naast theater amersfoort",
    "eten theater amersfoort",
    "restaurant kamp amersfoort",
    "parkeren de flint",
    "shared dining amersfoort"
  ],
};


export default function BuurtgidsPage() {
  return <NeighborhoodGuideClient />;
}

