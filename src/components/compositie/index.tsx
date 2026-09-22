import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// "De Tafelaar Compositie" building blocks: thick slate frames, offset block
// shadows and one accent plane per section. Shared by every page so the whole
// site reads as one composition.

export const LIJN = "border-foreground border-[5px]";
export const BLOK_SCHADUW = "shadow-[4px_4px_0_hsl(var(--foreground))]";

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block bg-foreground px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.2em] text-background",
        className,
      )}
    >
      {children}
    </span>
  );
}

const BALK: Record<string, string> = {
  brons: "bg-primary",
  zand: "bg-secondary",
  salie: "bg-accent",
  lei: "bg-foreground",
};

export function SectionLabel({
  children,
  balk = "brons",
  id,
  className,
}: {
  children: ReactNode;
  balk?: keyof typeof BALK;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex items-center gap-4", className)}>
      <span aria-hidden className={cn("h-[10px] w-16 shrink-0", BALK[balk])} />
      <h2 id={id} className="font-headline text-[clamp(26px,3.8vw,46px)] font-extrabold leading-none tracking-tight">
        {children}
      </h2>
      <span aria-hidden className="h-[2px] flex-1 bg-foreground" />
    </div>
  );
}

export function Chip({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="border-2 border-foreground bg-white px-[18px] py-[10px] text-[12.5px] font-bold tracking-wide text-foreground shadow-[3px_3px_0_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-px hover:-translate-y-px hover:bg-secondary hover:shadow-[4px_4px_0_hsl(var(--foreground))]"
    >
      {children}
    </Link>
  );
}

export function Sticker({ rating, count, className }: { rating: string; count: string; className?: string }) {
  return (
    <div
      className={cn(
        "grid h-[116px] w-[116px] place-items-center rounded-full border-2 border-foreground bg-primary text-center text-[12px] font-bold uppercase leading-tight tracking-wide text-white",
        BLOK_SCHADUW,
        className,
      )}
    >
      <span>
        <b className="block font-headline text-[28px] font-black">{rating}</b>
        op Google
        <br />
        {count} reviews
      </span>
    </div>
  );
}

// Marquee: three copies so the 33.333% keyframe loops seamlessly; static when
// the visitor prefers reduced motion.
export function Ticker({ items }: { items: string[] }) {
  const strip = (
    <>
      {items.map((t) => (
        <span key={t} className="inline-block">
          {t}
          <em className="mx-[18px] not-italic text-primary">★</em>
        </span>
      ))}
    </>
  );
  return (
    <div aria-hidden className="overflow-hidden whitespace-nowrap border-b-[5px] border-foreground bg-foreground py-[13px] text-background">
      <div className="inline-block text-[13.5px] font-bold uppercase tracking-[0.08em] motion-safe:animate-ticker-scroll">
        {strip}
        {strip}
        {strip}
      </div>
    </div>
  );
}

export function Balk({ kleur = "brons", className }: { kleur?: keyof typeof BALK; className?: string }) {
  return <span aria-hidden className={cn("block h-[10px] w-16", BALK[kleur], className)} />;
}
