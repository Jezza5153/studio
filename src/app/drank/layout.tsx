import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Drankenkaart De Tafelaar | Lokaal Bier & Wijn Amersfoort",
    description: "Ontdek onze drankkaart: lokale bieren, mooie wijnen, cocktails en fris. Perfect bij shared dining gerechten in Amersfoort.",
    alternates: {
        canonical: "/drank",
    },
    openGraph: {
        title: "Drankenkaart De Tafelaar Amersfoort",
        description: "Lokale bieren, wijnen en cocktails bij shared dining.",
    },
};

export default function DrankLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
