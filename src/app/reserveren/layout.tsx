import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reserveren De Tafelaar | Tafel Boeken Amersfoort",
    description: "Reserveer online bij De Tafelaar in Amersfoort. Shared dining voor 2-100 personen. Makkelijk een tafel boeken via onze reserveringsmodule.",
    alternates: {
        canonical: "/reserveren",
    },
    openGraph: {
        title: "Reserveren bij De Tafelaar Amersfoort",
        description: "Boek nu een tafel voor shared dining in hartje Amersfoort.",
    },
};

export default function ReserverenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
