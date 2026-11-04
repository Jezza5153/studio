import Link from "next/link";
import { cn } from "@/lib/utils";
import { kerstdiner, kerstdinerActief, KERSTDINER_PAD } from "@/content/kerstdiner";

// Korte verwijzing naar /kerstdiner-amersfoort voor andere pagina's (menu, agenda,
// openingstijden). Rendert niets meer na 25 december; alle pagina's verversen elk uur.
export function KerstdinerMelding({ tekst, className }: { tekst?: string; className?: string }) {
  if (!kerstdinerActief()) return null;
  return (
    <Link
      href={KERSTDINER_PAD}
      className={cn(
        "group flex flex-col gap-1 border-2 border-foreground bg-white px-5 py-4 shadow-[4px_4px_0_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_hsl(var(--foreground))] sm:flex-row sm:items-center sm:justify-between sm:gap-6",
        className,
      )}
    >
      <span className="text-[14.5px] font-semibold text-foreground">
        <span aria-hidden className="mr-1.5 text-primary">★</span>
        {tekst ?? `Kerstdiner op ${kerstdiner.datumsKort}: kerstmenu €${kerstdiner.prijs} p.p., wijnarrangement €${kerstdiner.wijnarrangement} p.p.`}
      </span>
      <span className="shrink-0 text-[13px] font-bold text-primary group-hover:underline">Bekijk &amp; reserveer →</span>
    </Link>
  );
}
