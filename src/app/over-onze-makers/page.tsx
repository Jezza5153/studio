
// app/(site)/makers/page.tsx (server component)
import { makers } from "@/content/site-content";
import MakersClient from "./MakersClient";

export const dynamic = 'force-static';

export default function MakersPage() {
  // We can fetch or prepare any server-side data here
  // and pass it down to the client component.
  return <MakersClient makers={makers} />;
}
