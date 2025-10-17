import { menuContent } from "@/lib/data";
import { MenuClient } from "./menu-client";

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
      <header className="mb-8 text-center md:mb-12">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
          Ons Menu
        </h1>
        <p className="mx-auto mt-4 max-w-prose text-base text-muted-foreground sm:text-lg">
          Onze menukaart is met zorg samengesteld en wisselt met de seizoenen
          mee. Ontdek onze gerechtjes om te delen.
        </p>
      </header>

      <MenuClient menuContent={menuContent} />

      <div className="mt-8 text-center text-sm text-muted-foreground md:mt-12">
        <p>{menuContent.disclaimer}</p>
      </div>
    </div>
  );
}
