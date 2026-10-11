// Eenvoudige rate limit in het geheugen (sliding window per sleutel, bijv. IP).
// Per serverless-instantie, dus een rem op spam, geen harde garantie.

type Limiet = { max: number; vensterMs: number };

const emmers = new Map<string, Map<string, number[]>>();
const MAX_SLEUTELS = 5000;

/** true = toegestaan (en geteld), false = te veel pogingen in het venster. */
export function rateLimit(naam: string, sleutel: string, { max, vensterMs }: Limiet, nu = Date.now()): boolean {
  let emmer = emmers.get(naam);
  if (!emmer) {
    emmer = new Map();
    emmers.set(naam, emmer);
  }

  if (emmer.size > MAX_SLEUTELS) {
    for (const [k, tijden] of emmer) {
      if (tijden.every((t) => nu - t >= vensterMs)) emmer.delete(k);
    }
    // Nog steeds vol (veel verschillende IP's tegelijk): oudste sleutels eruit.
    for (const k of emmer.keys()) {
      if (emmer.size <= MAX_SLEUTELS) break;
      emmer.delete(k);
    }
  }

  const recent = (emmer.get(sleutel) ?? []).filter((t) => nu - t < vensterMs);
  if (recent.length >= max) {
    emmer.set(sleutel, recent);
    return false;
  }
  recent.push(nu);
  emmer.set(sleutel, recent);
  return true;
}

/** IP van de bezoeker achter de Vercel-proxy. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "onbekend";
}
