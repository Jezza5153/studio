"use client";

import { getPersonalizedMenuRecommendations, PersonalizedMenuRecommendationsInput } from "@/ai/flows/personalized-menu-recommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { menuContent } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type MenuClientProps = {
  menuContent: typeof menuContent;
  menuItemsString: string;
};

const FormSchema = z.object({
  visitorPreferences: z.string().min(10, {
    message: "Vertel ons iets meer over uw smaak.",
  }),
});

export function MenuClient({ menuContent, menuItemsString }: MenuClientProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      visitorPreferences: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendations([]);

    const input: PersonalizedMenuRecommendationsInput = {
      ...data,
      menuItems: menuItemsString,
    };

    try {
      const result = await getPersonalizedMenuRecommendations(input);
      const recommended = result.recommendedItems.split(',').map(item => item.trim());
      setRecommendations(recommended);
      toast({
        title: "Aanbevelingen zijn binnen!",
        description: "We hebben een paar gerechten voor u uitgelicht.",
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        variant: "destructive",
        title: "Oeps, er ging iets mis.",
        description: "We konden geen aanbevelingen ophalen. Probeer het later opnieuw.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const menuCategories = Object.keys(menuContent).filter(key => key !== 'disclaimer');

  const renderMenuItem = (item: any, index: number) => {
    const isRecommended = recommendations.some(rec => item.name.toLowerCase().includes(rec.toLowerCase()));
    
    return (
      <Card key={index} className={`transition-all duration-300 ${isRecommended ? 'border-primary shadow-lg scale-105' : ''}`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-start">
            <span>{item.name}</span>
            {isRecommended && <Sparkles className="h-5 w-5 text-primary" />}
          </CardTitle>
          {item.description && <CardDescription>{item.description}</CardDescription>}
          {item.pairing && <p className="text-sm text-muted-foreground pt-1">Paired with: {item.pairing}</p>}
          {item.producer && <p className="text-sm text-muted-foreground pt-1">From: {item.producer}</p>}
        </CardHeader>
        <CardFooter>
          <p className="font-semibold text-foreground">€{item.price}</p>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <Card className="mb-12 bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2"><Sparkles className="text-primary"/>Vind uw perfecte gerecht</CardTitle>
          <CardDescription>
            Laat onze AI-assistent u helpen kiezen. Vertel ons wat u lekker vindt, en we lichten de beste opties voor u uit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="visitorPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uw voorkeuren</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="bv. 'Ik hou van pittig eten, maar eet geen varkensvlees. Ik ben op zoek naar iets lichts.' of 'vegetarische opties graag'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Aan het denken...
                  </>
                ) : (
                  "Krijg aanbevelingen"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Tabs defaultValue="gerechtjes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
          {menuCategories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">{category}</TabsTrigger>
          ))}
        </TabsList>
        {menuCategories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(menuContent as any)[category].map(renderMenuItem)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="text-center mt-12 text-sm text-muted-foreground">
        <p>{menuContent.disclaimer}</p>
      </div>
    </>
  );
}
