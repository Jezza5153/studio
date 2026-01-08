
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ReserveerButton } from "@/components/reserveer-button";
import { Button } from "@/components/ui/button";

export default function ReserverenAliasPage() {
  useEffect(() => {
    // Open direct de Tapla widget
    window.taplaOpen?.();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8">
      <h1 className="font-headline text-3xl sm:text-4xl tracking-tight">Reserveren</h1>
      <p className="mt-4 text-muted-foreground">
        De reserveringswidget opent rechtsonder. Zie je hem niet? Klik dan hieronder.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <ReserveerButton label="Reserveer nu" />
        <Button asChild variant="outline">
          <Link href="/contact">Naar contact</Link>
        </Button>
      </div>
    </div>
  );
}
