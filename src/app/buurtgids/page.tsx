
import type { Metadata } from "next";
import { NeighborhoodGuideClient } from "./neighborhood-guide-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Buurtgids De Flint & Kamp | De Tafelaar Amersfoort",
  description:
    "Ontdek de beste plekken voor eten & drinken in Amersfoort centrum. Perfect voor een avond uit bij Theater De Flint of een bezoek aan de hotspots op de Kamp.",
  alternates: {
    canonical: "/buurtgids",
  },
};

export default function BuurtgidsPage() {
  return <NeighborhoodGuideClient />;
}

    