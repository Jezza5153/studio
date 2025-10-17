"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { menuContent as menuContentType } from "@/lib/data";

type MenuClientProps = {
  menuContent: typeof menuContentType;
};


export function MenuClient({ menuContent }: MenuClientProps) {

  const menuCategories = Object.keys(menuContent).filter(key => key !== 'disclaimer' && (menuContent as any)[key].length > 0);

  const renderMenuItem = (item: any, index: number) => {
    return (
      <Card key={index}>
        <CardHeader>
          <CardTitle className="flex justify-between items-start">
            <span>{item.name}</span>
          </CardTitle>
          {item.description && <CardDescription>{item.description}</CardDescription>}
        </CardHeader>
        <CardFooter>
          <p className="font-semibold text-foreground">€{item.price}</p>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <Tabs defaultValue="gerechtjes" className="w-full">
        <TabsList className="mb-8 h-auto flex-wrap justify-start md:justify-center">
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
