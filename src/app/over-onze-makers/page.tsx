
// app/(site)/makers/page.tsx (server component)
import type { Metadata } from "next";
import { makers } from "@/content/site-content";
import MakersClient from "./MakersClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Lokale Producenten & Makers | De Tafelaar Amersfoort",
  description: "Ontmoet de lokale producenten achter onze gerechten. Van boeren tot brouwers - wij werken samen met makers uit de regio Amersfoort.",
  alternates: {
    canonical: "/over-onze-makers",
  },
};

export default function MakersPage() {
  // We can fetch or prepare any server-side data here
  // and pass it down to the client component.
  return <MakersClient makers={makers} />;
}
