import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menukaart De Tafelaar | Shared Dining Gerechten Amersfoort",
    description: "Bekijk de menukaart van De Tafelaar: shared dining gerechten, borrelplanken, vegetarische opties en seizoensgebonden ingrediënten uit de regio Amersfoort.",
    alternates: {
        canonical: "/menu",
    },
    openGraph: {
        title: "Menukaart De Tafelaar Amersfoort",
        description: "Shared dining met lokale, seizoensgebonden gerechten. Bekijk ons menu.",
    },
};

export default function MenuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
