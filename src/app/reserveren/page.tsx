import { redirect } from "next/navigation";

// Backwards-compatible route: old links to /reserveren should still work.
// We use the Tapla widget site-wide, so this now lives on /contact.
export default function ReserverenPage() {
  redirect("/contact");
}
