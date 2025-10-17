import { Button } from "@/components/ui/button";
import Link from "next/link";

const PDF_URL = "/menu/tafelaar-menu.pdf";

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
      <header className="text-center mb-6 sm:mb-8">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl leading-tight">
          Ons Menu
        </h1>
        <p className="mt-3 text-muted-foreground text-base sm:text-lg">
          Shared dining, seizoensgebonden en gezellig. Bekijk of download het menu hieronder.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={PDF_URL} target="_blank" rel="noopener">
              Open menu in nieuw tabblad
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={PDF_URL} download>
              Download PDF
            </Link>
          </Button>
        </div>
      </header>

      {/* Embedded PDF viewer with graceful fallback */}
      <div className="rounded-xl border overflow-hidden">
        <object
          data={PDF_URL}
          type="application/pdf"
          className="w-full h-[80svh]"
          aria-label="Menu PDF"
        >
          <iframe
            src={PDF_URL}
            className="w-full h-[80svh]"
            title="Menu PDF viewer"
          />
        </object>
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Werkt de viewer niet?{" "}
        <Link href={PDF_URL} target="_blank" rel="noopener" className="underline underline-offset-4">
          Klik hier om de PDF te openen
        </Link>
        .
      </p>
    </div>
  );
}
