import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const KAARTEN = [
  { key: "diner", href: "/menu", label: "Dinerkaart" },
  { key: "lunch", href: "/lunch", label: "Lunchkaart" },
  { key: "drank", href: "/drank", label: "Drankenkaart" },
  { key: "thuis", href: "/ophalen", label: "Tafelaar Thuiskaart" },
] as const;

export type KaartKey = (typeof KAARTEN)[number]["key"];

/** Eén rij kaart-knoppen boven elke kaart; de huidige kaart staat er als vast label bij (geen link naar zichzelf). */
export function KaartNav({
  current,
  size = "sm",
  className,
}: {
  current: KaartKey;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  return (
    <nav aria-label="Onze kaarten" className={cn("flex flex-wrap gap-2 sm:gap-3", className)}>
      {KAARTEN.map((kaart) =>
        kaart.key === current ? (
          <Button key={kaart.key} asChild size={size} variant="secondary" className="pointer-events-none">
            <span aria-current="page">{kaart.label}</span>
          </Button>
        ) : (
          <Button key={kaart.key} asChild size={size} variant="outline">
            <Link href={kaart.href}>{kaart.label}</Link>
          </Button>
        ),
      )}
    </nav>
  );
}
