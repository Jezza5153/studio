import { NextResponse, type NextRequest } from "next/server";
import { kerstdinerActief } from "@/content/kerstdiner";

// Na het kerstdiner (25 december) stuurt /kerstdiner-amersfoort door naar de agenda.
// Tijdelijk (307), zodat hetzelfde adres volgend jaar weer kan worden gebruikt.
export function middleware(request: NextRequest) {
  if (!kerstdinerActief()) {
    return NextResponse.redirect(new URL("/agenda", request.url), 307);
  }
  return NextResponse.next();
}

// Draait alleen op deze ene pagina, de rest van de site merkt er niets van.
export const config = {
  matcher: ["/kerstdiner-amersfoort"],
};
