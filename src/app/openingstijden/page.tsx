import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { openingHours } from "@/lib/data";

export default function OpeningstijdenPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">{openingHours.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Hieronder vindt u wanneer u bij ons terecht kunt voor een gezellige avond.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <ul className="divide-y">
              {openingHours.schedule.map((item) => (
                <li key={item.day} className="flex justify-between items-center py-4">
                  <span className="font-semibold text-lg">{item.day}</span>
                  <div className="text-right">
                    <span className="text-lg text-muted-foreground">{item.time}</span>
                    {item.special && (
                      <p className="text-sm text-accent">{item.special}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground text-center w-full">{openingHours.footer}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
