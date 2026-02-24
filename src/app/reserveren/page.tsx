
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ReserveerButton } from "@/components/reserveer-button";
import { Button } from "@/components/ui/button";

export default function ReserverenPage() {

  useEffect(() => {
    // Open de Events booking widget direct bij het laden van de pagina.
    // Dit is een 'soft' redirect naar de reserveringsfunctionaliteit.
    const openTimeout = setTimeout(() => {
      window.eventsOpen?.();
    }, 100);

    return () => clearTimeout(openTimeout);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-20 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="font-headline text-3xl sm:text-4xl tracking-tight">
          Moment geduld...
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          De reserveringsmodule wordt geopend.
        </p>

        <div className="mt-6 border rounded-xl p-4 bg-secondary/30">
          <p className="text-sm text-muted-foreground mb-3">
            Zie je de widget niet? Geen zorgen. Gebruik de knoppen hieronder.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ReserveerButton label="Open reserveringen" />
            <Button asChild variant="outline">
              <Link href="/contact">Contact & Vragen</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

