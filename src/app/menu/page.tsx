import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function MenuPage() {
  const pdfUrl = "/menu/tafelaar-menu.pdf";

  return (
    <div className="container mx-auto flex h-[calc(100vh-7rem)] flex-col px-4 py-8 sm:px-6 md:px-8">
      <header className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl">
            Ons Menu
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Bekijk hieronder onze volledige menukaart.
          </p>
        </div>
        <Button asChild>
          <a href={pdfUrl} download="De-Tafelaar-Menu.pdf">
            <Download className="mr-2" />
            Download Menu
          </a>
        </Button>
      </header>

      <div className="flex-1 overflow-hidden rounded-2xl border shadow-lg">
        <iframe
          src={pdfUrl}
          title="De Tafelaar Menu"
          className="h-full w-full"
          aria-label="Menu PDF"
        />
      </div>

       <div className="mt-8 text-center text-sm text-muted-foreground md:mt-12">
        <p>Heeft u een allergie? Meld het ons!</p>
      </div>
    </div>
  );
}
