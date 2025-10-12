import { menuContent } from "@/lib/data";
import { MenuClient } from "./menu-client";

export default function MenuPage() {
  const allMenuItems = Object.entries(menuContent).flatMap(([category, items]) => {
    if (Array.isArray(items)) {
      return items.map(item => ({ ...item, category }));
    }
    return [];
  });
  const menuItemsString = allMenuItems.map(item => `${item.name}: ${item.description || ''}`).join('\n');

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Ons Menu</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Een verzameling van kleine gerechten, met zorg bereid en perfect om te delen.
        </p>
      </div>

      <MenuClient menuContent={menuContent} menuItemsString={menuItemsString} />
    </div>
  );
}
