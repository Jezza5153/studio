import type { Metadata } from "next";
import { NeighborhoodGuideClient } from "./neighborhood-guide-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Buurtgids | De Tafelaar Amersfoort",
  description:
    "Ontdek de belangrijkste plekken rond De Tafelaar (Kamp, De Flint, parkeren) en plan je avond in de binnenstad van Amersfoort.",
};

export default function BuurtgidsPage() {
  return <NeighborhoodGuideClient />;
}
