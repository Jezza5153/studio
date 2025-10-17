"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { menuContent } from "@/lib/data";

type MenuClientProps = {
  menuContent: typeof menuContent;
};

type MenuItem = {
  name: string;
  description: string;
  price: string;
};

const MenuCategory = ({
  title,
  items,
}: {
  title: string;
  items: MenuItem[];
}) => (
  <div className="space-y-6">
    <h2 className="font-headline text-2xl text-center md:text-3xl">{title}</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <div className="flex items-baseline justify-between">
              <CardTitle className="text-lg font-semibold">
                {item.name}
              </CardTitle>
              <span className="text-base font-semibold text-primary">
                €{item.price}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export function MenuClient({ menuContent }: MenuClientProps) {
  const categories = [
    {
      value: "gerechtjes",
      label: "Gerechtjes",
      items: menuContent.gerechtjes,
    },
    { value: "comfort", label: "Comfort", items: menuContent.comfort },
    {
      value: "charcuterie",
      label: "Charcuterie",
      items: menuContent.charcuterie,
    },
    { value: "kazen", label: "Kazen", items: menuContent.kazen },
    { value: "zoet", label: "Zoet", items: menuContent.zoet },
    { value: "planken", label: "Planken", items: menuContent.planken },
  ];

  return (
    <Tabs defaultValue="gerechtjes" className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-3 lg:flex">
        {categories.map((cat) => (
          <TabsTrigger key={cat.value} value={cat.value} className="w-full">
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-8">
        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            <MenuCategory title={cat.label} items={cat.items} />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
