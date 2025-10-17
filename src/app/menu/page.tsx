
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div className="container mx-auto flex h-[50svh] flex-col items-center justify-center px-4 text-center sm:px-6 md:px-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
          Ons Menu
        </h1>
        <p className="mt-4 max-w-prose text-base text-muted-foreground sm:text-lg">
          Onze menukaart is met zorg samengesteld en wisselt met de seizoenen
          mee. Klik op de knop hieronder om de meest actuele versie van ons
          menu als PDF te bekijken of te downloaden.
        </p>
      </header>

      <Button asChild size="lg">
        <Link href="/menu/tafelaar-menu.pdf" target="_blank" rel="noopener noreferrer">
          <Download className="mr-2" />
          Bekijk menukaart (PDF)
        </Link>
      </Button>
    </div>
  );
}
