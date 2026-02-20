
import type { Metadata } from "next";
import { NeighborhoodGuideClient } from "./neighborhood-guide-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buurtgids Flint & Kamp | Eten vlakbij Flint Amersfoort",
  description:
    "Op zoek naar eten dichtbij Flint? De Tafelaar ligt op 2 minuten lopen. Ontdek de beste restaurants nabij Flint, parkeren en hotspots op de Kamp in Amersfoort.",
  alternates: {
    canonical: "/buurtgids",
  },
  openGraph: {
    title: "Buurtgids Flint - Eten & Restaurants vlakbij Flint",
    description: "De beste restaurants en eten dichtbij Flint Amersfoort. De Tafelaar ligt in de Kamp, op 2 min lopen.",
  },
  keywords: [
    "eten dichtbij flint",
    "eten naast flint",
    "restaurant vlakbij flint",
    "eten theater amersfoort",
    "restaurant naast theater amersfoort",
    "eten theater amersfoort",
    "restaurant kamp amersfoort",
    "parkeren flint",
    "shared dining amersfoort"
  ],
};


export default function BuurtgidsPage() {
  return <NeighborhoodGuideClient />;
}

