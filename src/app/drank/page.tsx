import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuSwitcher } from "@/components/menu-switcher";
import { ExternalLink, Download } from "lucide-react";
import Link from "next/link";

export default function DrankPage() {
  const pdfHref = "/drankkaart.pdf"; // Zet jullie PDF in /public

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      <header className="mb-6 sm:mb-8">
        <MenuSwitcher active="drink" />
      </header>

      <div className="mb-8 sm:mb-10">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Drankkaart
        </h1>
        <p className="mt-2 max-w-prose text-base sm:text-lg text-muted-foreground leading-relaxed">
          Biologische frisdranken, lokale bieren, wijnen met karakter, creatieve cocktails en
          mooi gezette koffie & thee – precies zoals je het in onze huiskamer verwacht.
        </p>
      </div>

      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="flex items-center justify-between gap-4 sm:flex-row">
          <CardTitle className="font-headline text-2xl">Bekijk de drankkaart</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open volledig scherm
              </a>
            </Button>
            <Button asChild>
              <a href={pdfHref} download>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* In-page viewer (eenvoudig, breed ondersteund) */}
          <object
            data={pdfHref}
            type="application/pdf"
            aria-label="Drankkaart PDF"
            className="w-full h-[70vh]"
          >
            {/* Fallback als inline PDF niet werkt */}
            <div className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Kan de PDF niet inline tonen. Open of download de drankkaart hieronder:
              </p>
              <div className="flex justify-center gap-3">
                <Button asChild variant="outline">
                  <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open volledig scherm
                  </a>
                </Button>
                <Button asChild>
                  <a href={pdfHref} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </div>
          </object>
        </CardContent>
      </Card>

      {/* Extra: Quick links / toelichting (optioneel) */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Wijnen</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Biologisch & met karakter – vraag gerust om advies per glas of fles.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Bieren</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Tafelaar Pils & Weizen van de tap + wisseltap en lokale brouwsels.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Koffie & thee</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Boot Koffie, Clipper & Wilder Land – ook decafé of havermelk mogelijk.
          </p>
        </div>
      </div>
    </div>
  );
}
