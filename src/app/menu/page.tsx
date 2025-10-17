import { MENU, type MenuItem } from "@/content/menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function formatCurrency(price: number | null, currency: string) {
  if (price === null) return "";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: currency,
  }).format(price);
}

const TAG_MAP: Record<string, string> = {
  V: "Vegetarisch",
  VG: "Vegan",
  GF: "Glutenvrij",
};

const pdfUrl = "/menu/tafelaar-menu.pdf";

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8 sm:py-12 md:py-16">
      <header className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-8">
        <div className="text-center sm:text-left">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            {MENU.title}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Ontdek onze gerechtjes om te delen, met liefde voor het seizoen.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="outline">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2" />
              Open PDF
            </a>
          </Button>
          <Button asChild>
            <a href={pdfUrl} download="De-Tafelaar-Menu.pdf">
              <Download className="mr-2" />
              Download
            </a>
          </Button>
        </div>
      </header>

      <main className="space-y-12">
        {MENU.categories.map((category) => (
          <section key={category.name} id={category.name.toLowerCase()}>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-6 border-b pb-3">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {category.items.map((item) => (
                <MenuItemCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground md:mt-16">
        <p>Heeft u een allergie? Meld het ons!</p>
      </footer>
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex flex-col">
       <div className="flex justify-between gap-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-lg font-semibold shrink-0">
          {formatCurrency(item.price, MENU.currency)}
        </p>
      </div>

      <div className="flex-grow pr-4">
        {item.description && (
            <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{item.description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          {item.tags.length > 0 && (
            <div className="flex items-center gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-accent-foreground border-accent">
                  {TAG_MAP[tag] || tag}
                </Badge>
              ))}
            </div>
          )}
          {item.allergens.length > 0 && (
             <div className="flex items-center gap-1">
                <span className="text-muted-foreground font-medium">Allergenen:</span>
                <span className="text-muted-foreground">{item.allergens.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
