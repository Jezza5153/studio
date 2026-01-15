// Redirect old WordPress URLs to home
import { redirect } from "next/navigation";

export default function OldWordPressPost() {
    redirect("/");
}
