import { philosophyContent } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function FilosofiePage() {
    const philosophyImage = PlaceHolderImages.find((img) => img.id === "philosophy-image");

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-3xl md:text-5xl">{philosophyContent.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            De gedachte achter onze gerechten en gastvrijheid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 md:order-2">
                <div>
                    <h2 className="font-headline text-2xl md:text-3xl mb-4">{philosophyContent.mission.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {philosophyContent.mission.text}
                    </p>
                </div>
                <div>
                    <h2 className="font-headline text-2xl md:text-3xl mb-4">{philosophyContent.whySharedDining.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {philosophyContent.whySharedDining.text}
                    </p>
                </div>
            </div>
            <div className="md:order-1">
                {philosophyImage && (
                <Image
                    src={philosophyImage.imageUrl}
                    alt={philosophyImage.description}
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-lg object-cover"
                    data-ai-hint={philosophyImage.imageHint}
                />
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
