import { menuContent } from "@/lib/data";
import { MenuClient } from "./menu-client";

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
      <header className="text-center mb-10 sm:mb-12">
        <h1 className="font-headline text-2xl sm:text-3xl md:text-5xl leading-tight">
          Ons Menu
        </h1>
        <p className="mt-4 max-w-prose mx-auto text-base sm:text-lg text-muted-foreground">
          Shared dining, seizoensgebonden en gezellig. Ontdek onze met zorg
          bereide gerechtjes.
        </p>
      </header>

      <MenuClient menuContent={menuContent} />
    </div>
  );
}
