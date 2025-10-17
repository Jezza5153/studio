import { menuContent } from "@/lib/data";
import { MenuClient } from "./menu-client";

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">Ons Menu</h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          Een verzameling van kleine gerechten, met zorg bereid en perfect om te delen.
        </p>
      </div>

      <MenuClient menuContent={menuContent} />
    </div>
  );
}
