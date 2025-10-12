import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { contactDetails, reservationFaq } from "@/lib/data";
import { Phone } from "lucide-react";

export default function ReserverenPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Reserveer uw tafel</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We kijken ernaar uit u te mogen verwelkomen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Online reserveren</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Reserverings-widget placeholder</p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Lukt het online niet of heeft u speciale wensen? Bel ons gerust!
              </p>
              <Button asChild className="mt-4 w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href={`tel:${contactDetails.phone}`}><Phone className="mr-2 h-4 w-4"/> Bel ons</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="font-headline text-3xl mb-6">Veelgestelde Vragen</h2>
          <Accordion type="single" collapsible className="w-full">
            {reservationFaq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-semibold text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-headline text-3xl mb-6 text-center">Waar u ons kunt vinden</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Adres</CardTitle>
                </CardHeader>
                <CardContent>
                    <address className="not-italic text-muted-foreground">
                        <p>De Tafelaar</p>
                        <p>{contactDetails.address.split(',').slice(1).join(',')}</p>
                    </address>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Kaart placeholder</p>
                </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
