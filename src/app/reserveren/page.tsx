
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ReserveerButton } from "@/components/reserveer-button";
import { Button } from "@/components/ui/button";

export default function ReserverenPage() {

  useEffect(() => {
    const openTimeout = setTimeout(() => {
      window.boekeerlijk?.open();
    }, 100);

    return () => clearTimeout(openTimeout);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-20">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="font-headline text-3xl sm:text-4xl tracking-tight">
          Reserveren bij De Tafelaar
        </h1>
        <p className="mt-3 text-muted-foreground text-base sm:text-lg">
          Boek online een tafel voor shared dining in Amersfoort centrum. Beschikbaar voor
          2 tot 100 personen, woensdag t/m zondag. De reserveringsmodule opent automatisch.
        </p>

        <div className="mt-6 border rounded-xl p-4 bg-secondary/30">
          <p className="text-sm text-muted-foreground mb-3">
            Widget niet zichtbaar? Gebruik de knoppen hieronder.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ReserveerButton label="Open reserveringen" />
            <Button asChild variant="outline">
              <Link href="/contact">Contact &amp; vragen</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

