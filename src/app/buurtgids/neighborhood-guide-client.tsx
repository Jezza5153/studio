
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Globe,
  Navigation,
  Car,
  Ticket,
  UtensilsCrossed,
  Star,
  ChevronLeft,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { contactDetails } from "@/content/site-content";
import { loadGoogleMaps } from "@/lib/load-google-maps";

type PlaceGroupKey = "tafelaar" | "theater" | "parking" | "kamp" | "search";

type Photo = {
  urlSmall: string;
  urlLarge: string;
  attrs?: string;
};

type DayHours = { days: string; hours: string };

type PlaceLite = {
  placeId: string;
  name?: string;
  coords?: any;
  types?: string[];
  typeLabel?: string;
  rating?: number;
  numReviews?: number;
  url?: string;
  website?: string;
  websiteDomain?: string;
  phoneNumber?: string;
  address?: string;
  openingHours?: DayHours[];
  photos?: Photo[];
  durationText?: string;
  group?: PlaceGroupKey;
};

// Kamp 8, 3811 AR Amersfoort - De Tafelaar
const CENTER = { lat: 52.1556, lng: 5.3876 };

const THEATERWEEKEND = {
  start: "2026-01-23",
  end: "2026-01-25",
  ctaHref: "/contact", // in this codebase the /contact page is your reservation page
  title: "Theaterweekend (23–25 jan)",
  subtitle:
    "Theateravond op de planning? Dan regelen wij het eten. Reserveer op tijd. Vol is vol.",
  bullets: [
    "Vlak bij De Flint",
    "Chef’s Choice 4 gangen",
    "Reserveren: 17:15 of 17:45",
  ],
};

// The "marketing-plan driven" short list: Flint + parkeren + Kamp eet/drink.
const CURATED_QUERIES: Array<{ group: PlaceGroupKey; label: string; query: string; icon: any }> = [
  // Theater & Cultuur
  { group: "theater", label: "Theater De Flint", query: "Theater De Flint Amersfoort", icon: Ticket },
  { group: "theater", label: "Pathé Amersfoort", query: "Pathé Amersfoort cinema", icon: Ticket },
  { group: "theater", label: "Onze Lieve Vrouwetoren", query: "Onze Lieve Vrouwetoren Amersfoort", icon: MapPin },
  { group: "theater", label: "Koppelpoort", query: "Koppelpoort Amersfoort", icon: MapPin },
  { group: "theater", label: "Museum Flehite", query: "Museum Flehite Amersfoort", icon: MapPin },
  { group: "theater", label: "Eemhuis", query: "Eemhuis Amersfoort bibliotheek", icon: MapPin },
  // Parkeren - closest to Kamp 8
  { group: "parking", label: "Parkeergarage Koestraat", query: "Parkeergarage Koestraat Amersfoort", icon: Car },
  { group: "parking", label: "Parkeergarage Flintplein", query: "Parkeergarage Flintplein Amersfoort", icon: Car },
  { group: "parking", label: "Parkeergarage Stadhuisplein", query: "Parkeergarage Stadhuisplein Amersfoort", icon: Car },
  { group: "parking", label: "Parkeergarage Beestenmarkt", query: "Parkeergarage Beestenmarkt Amersfoort", icon: Car },
  { group: "parking", label: "Parkeergarage St. Jorisplein", query: "Parkeergarage St. Jorisplein Amersfoort", icon: Car },
  // Kamp hotspots - restaurants & cafes on Kamp street
  { group: "kamp", label: "De Aubergerie", query: "De Aubergerie Kamp Amersfoort", icon: UtensilsCrossed },
  { group: "kamp", label: "Awazé", query: "Awazé restaurant Amersfoort", icon: UtensilsCrossed },
  { group: "kamp", label: "Indian Flavour", query: "Indian Flavour Amersfoort", icon: UtensilsCrossed },
  { group: "kamp", label: "Anna's Smaakatelier", query: "Anna's Smaakatelier Amersfoort", icon: UtensilsCrossed },
  { group: "kamp", label: "Theehuis Something Else", query: "Theehuis Something Else Amersfoort", icon: UtensilsCrossed },
  { group: "kamp", label: "Poke2go", query: "Poke2go Amersfoort", icon: UtensilsCrossed },
];

// Static fallback data - shown when Google Places API is unavailable
const FALLBACK_THEATER: PlaceLite[] = [
  { placeId: "flint", name: "Theater De Flint", typeLabel: "Theater", address: "Coninckstraat 60, 3811 WK Amersfoort", url: "https://www.google.com/maps/place/Theater+De+Flint", group: "theater" },
  { placeId: "pathe", name: "Pathé Amersfoort", typeLabel: "Bioscoop", address: "Stadsring 201, 3817 BA Amersfoort", url: "https://www.google.com/maps/place/Pathé+Amersfoort", group: "theater" },
  { placeId: "olvtoren", name: "Onze Lieve Vrouwetoren", typeLabel: "Bezienswaardigheid", address: "Lieve Vrouwekerkhof, Amersfoort", url: "https://www.google.com/maps/place/Onze+Lieve+Vrouwetoren", group: "theater" },
  { placeId: "koppelpoort", name: "Koppelpoort", typeLabel: "Monument", address: "Kleine Spui, Amersfoort", url: "https://www.google.com/maps/place/Koppelpoort", group: "theater" },
  { placeId: "flehite", name: "Museum Flehite", typeLabel: "Museum", address: "Westsingel 50, 3811 BC Amersfoort", url: "https://www.google.com/maps/place/Museum+Flehite", group: "theater" },
];

const FALLBACK_PARKING: PlaceLite[] = [
  { placeId: "koestraat", name: "Parkeergarage Koestraat", typeLabel: "Parkeergarage", address: "Koestraat 5, Amersfoort", url: "https://www.google.com/maps/place/Parkeergarage+Koestraat", group: "parking" },
  { placeId: "flintplein", name: "Parkeergarage Flintplein", typeLabel: "Parkeergarage", address: "Flintplein, Amersfoort", url: "https://www.google.com/maps/place/Parkeergarage+Flintplein", group: "parking" },
  { placeId: "stadhuis", name: "Parkeergarage Stadhuisplein", typeLabel: "Parkeergarage", address: "Stadhuisplein, Amersfoort", url: "https://www.google.com/maps/place/Parkeergarage+Stadhuisplein", group: "parking" },
  { placeId: "beestenmarkt", name: "Parkeergarage Beestenmarkt", typeLabel: "Parkeergarage", address: "Beestenmarkt, Amersfoort", url: "https://www.google.com/maps/place/Parkeergarage+Beestenmarkt", group: "parking" },
];

const FALLBACK_KAMP: PlaceLite[] = [
  { placeId: "aubergerie", name: "De Aubergerie", typeLabel: "Frans restaurant", address: "Kamp 38, 3811 AR Amersfoort", rating: 4.5, url: "https://www.google.com/maps/place/De+Aubergerie", group: "kamp" },
  { placeId: "awaze", name: "Awazé", typeLabel: "Ethiopisch restaurant", address: "Kamp 26, 3811 AR Amersfoort", rating: 4.6, url: "https://www.google.com/maps/place/Awazé", group: "kamp" },
  { placeId: "indianflavour", name: "Indian Flavour", typeLabel: "Indiaas/Surinaams", address: "Kamp 17, 3811 AR Amersfoort", rating: 4.4, url: "https://www.google.com/maps/place/Indian+Flavour", group: "kamp" },
  { placeId: "annas", name: "Anna's Smaakatelier", typeLabel: "Koffiebar & gebak", address: "Kamp 29, Amersfoort", rating: 4.7, url: "https://www.google.com/maps/place/Anna's+Smaakatelier", group: "kamp" },
  { placeId: "theehuis", name: "Theehuis Something Else", typeLabel: "Theehuis", address: "Kamp 41, Amersfoort", rating: 4.5, url: "https://www.google.com/maps/place/Theehuis+Something+Else", group: "kamp" },
  { placeId: "poke2go", name: "Poke2go", typeLabel: "Poké bowls", address: "Kamp 18, Amersfoort", rating: 4.3, url: "https://www.google.com/maps/place/Poke2go+Amersfoort", group: "kamp" },
];

function isTheaterWeekendNow(): boolean {
  // Local date (NL browser time). Keep it super simple.
  const now = new Date();
  const yyyyMmDd = now.toISOString().slice(0, 10);
  return yyyyMmDd >= THEATERWEEKEND.start && yyyyMmDd <= THEATERWEEKEND.end;
}

function safeHostname(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

function formatPlaceType(type?: string) {
  if (!type) return undefined;
  const s = type.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function parseDaysHours(weekdayText: string[]): DayHours[] {
  // Example input: ["Monday: 10:00 AM – 6:00 PM", ...]
  const daysHours = weekdayText
    .map((e) => e.split(/\:\s+/))
    .map((e) => ({ days: e[0].slice(0, 3), hours: e[1] }));

  // Collapse adjacent same hours
  for (let i = 1; i < daysHours.length; i++) {
    if (daysHours[i - 1].hours === daysHours[i].hours) {
      if (daysHours[i - 1].days.includes("-")) {
        daysHours[i - 1].days = daysHours[i - 1].days.replace(/\w+$/, daysHours[i].days);
      } else {
        daysHours[i - 1].days += " - " + daysHours[i].days;
      }
      daysHours.splice(i--, 1);
    }
  }

  return daysHours;
}

function googleMapsDirTo(placeId: string, origin?: { lat: number; lng: number }) {
  // Uses place_id for destination so it stays accurate.
  // If origin is omitted, Google uses the user's current location.
  const originPart = origin ? `&origin=${origin.lat},${origin.lng}` : "";
  return `https://www.google.com/maps/dir/?api=1${originPart}&destination_place_id=${encodeURIComponent(
    placeId
  )}&travelmode=walking`;
}

export function NeighborhoodGuideClient() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Theaterweekend mode is automatic based on date, but you can also force it with:
  // /buurtgids?theaterweekend=1
  const [theaterWeekendMode, setTheaterWeekendMode] = useState(false);

  const [placesByGroup, setPlacesByGroup] = useState<Record<PlaceGroupKey, PlaceLite[]>>({
    tafelaar: [],
    theater: FALLBACK_THEATER,
    parking: FALLBACK_PARKING,
    kamp: FALLBACK_KAMP,
    search: [],
  });

  const [selected, setSelected] = useState<PlaceLite | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Google services + map instances (refs to avoid re-init)
  const googleRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const placesServiceRef = useRef<any>(null);
  const directionsServiceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const distanceMatrixRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("theaterweekend") === "1";
    setTheaterWeekendMode(forced || isTheaterWeekendNow());
  }, []);

  // --- Map init + curated loading
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        setLoading(true);
        setLoadError(null);

        const google = await loadGoogleMaps({ apiKey, libraries: ["places", "geometry"] });
        if (cancelled) return;

        googleRef.current = google;

        // Enhanced map styling for premium look
        const map = new google.maps.Map(mapRef.current, {
          center: CENTER,
          zoom: 16,
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          zoomControl: true,
          maxZoom: 19,
          minZoom: 13,
          gestureHandling: "cooperative",
          styles: [
            // Subtle styling for a cleaner look
            { featureType: "poi.business", stylers: [{ visibility: "simplified" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
            { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#c8d7d4" }] },
          ],
        });
        mapInstanceRef.current = map;

        // Services
        placesServiceRef.current = new google.maps.places.PlacesService(map);
        directionsServiceRef.current = new google.maps.DirectionsService();
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          preserveViewport: true,
          polylineOptions: {
            strokeColor: "#e4572e",
            strokeWeight: 4,
            strokeOpacity: 0.8,
          },
        });
        distanceMatrixRef.current = new google.maps.DistanceMatrixService();

        // Center marker (De Tafelaar) - prominent red pin
        new google.maps.Marker({
          map,
          position: CENTER,
          title: "De Tafelaar - Kamp 8, Amersfoort",
          animation: google.maps.Animation.DROP,
        });

        // 1) Resolve “De Tafelaar” place + show top card (live details)
        const tafelaar = await findPlaceFromQuery(
          "De Tafelaar Kamp 8 3811 AR Amersfoort",
          "tafelaar"
        );
        if (!cancelled && tafelaar) {
          // also fetch full details so we can show phone/website/opening hours
          const full = await fetchDetails(tafelaar.placeId, tafelaar.group);
          upsertPlaces("tafelaar", [full || tafelaar]);
        }

        // 2) Curated: Flint + parkeer
        const curatedResults: PlaceLite[] = [];
        for (const item of CURATED_QUERIES) {
          const p = await findPlaceFromQuery(item.query, item.group);
          if (p) curatedResults.push(p);
        }
        if (!cancelled) {
          upsertPlaces("theater", curatedResults.filter((p) => p.group === "theater"));
          upsertPlaces("parking", curatedResults.filter((p) => p.group === "parking"));
          // Add curated Kamp hotspots (known real places on Kamp street)
          upsertPlaces("kamp", curatedResults.filter((p) => p.group === "kamp"));
        }

        // 3) Kamp hotspots: eateries / drinks within ~250m, filtered on street name “Kamp”
        await loadKampHotspots();

        // Setup search autocomplete
        setupAutocomplete();

        if (!cancelled) {
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setLoadError(e?.message || "Unknown error");
          setLoading(false);
        }
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function upsertPlaces(group: PlaceGroupKey, next: PlaceLite[]) {
    setPlacesByGroup((prev) => {
      const map = new Map(prev[group].map((p) => [p.placeId, p]));
      for (const p of next) map.set(p.placeId, p);
      return { ...prev, [group]: Array.from(map.values()) };
    });

    // Draw markers for new places
    for (const p of next) {
      if (p.coords) ensureMarker(p);
    }
  }

  function ensureMarker(place: PlaceLite) {
    const map = mapInstanceRef.current;
    const google = googleRef.current;
    if (!map || !google || !place.coords) return;

    if (markersRef.current.has(place.placeId)) return;

    const marker = new google.maps.Marker({
      map,
      position: place.coords,
      title: place.name || "",
    });
    marker.addListener("click", () => void onSelect(place));
    markersRef.current.set(place.placeId, marker);
  }

  async function findPlaceFromQuery(query: string, group: PlaceGroupKey): Promise<PlaceLite | null> {
    const google = googleRef.current;
    const placesService = placesServiceRef.current;
    if (!google || !placesService) return null;

    return new Promise((resolve) => {
      const request = {
        query,
        fields: ["place_id", "name", "geometry", "types", "rating", "user_ratings_total", "url"],
      };

      placesService.findPlaceFromQuery(request, (results: any[], status: any) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !results?.length) {
          resolve(null);
          return;
        }
        const r = results[0];
        const types: string[] | undefined = r.types;
        resolve({
          placeId: r.place_id,
          name: r.name,
          coords: r.geometry?.location,
          types,
          typeLabel: formatPlaceType(types?.[0]),
          rating: r.rating,
          numReviews: r.user_ratings_total,
          url: r.url,
          group,
        });
      });
    });
  }

  async function fetchDetails(placeId: string, group?: PlaceGroupKey): Promise<PlaceLite | null> {
    const google = googleRef.current;
    const placesService = placesServiceRef.current;
    if (!google || !placesService) return null;

    return new Promise((resolve) => {
      const request = {
        placeId,
        fields: [
          "place_id",
          "name",
          "types",
          "geometry",
          "formatted_address",
          "url",
          "website",
          "formatted_phone_number",
          "opening_hours",
          "rating",
          "user_ratings_total",
          "photos",
        ],
      };

      placesService.getDetails(request, (r: any, status: any) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !r) {
          resolve(null);
          return;
        }

        const photos: Photo[] | undefined = r.photos
          ? r.photos
            .slice(0, 6)
            .map((p: any) => ({
              urlSmall: p.getUrl({ maxWidth: 200, maxHeight: 200 }),
              urlLarge: p.getUrl({ maxWidth: 1200, maxHeight: 1200 }),
              attrs: (p.html_attributions || []).join(" "),
            }))
          : undefined;

        const types: string[] | undefined = r.types;
        resolve({
          placeId: r.place_id,
          name: r.name,
          coords: r.geometry?.location,
          types,
          typeLabel: formatPlaceType(types?.[0]),
          rating: r.rating,
          numReviews: r.user_ratings_total,
          url: r.url,
          website: r.website,
          websiteDomain: safeHostname(r.website),
          phoneNumber: r.formatted_phone_number,
          address: r.formatted_address,
          openingHours: r.opening_hours?.weekday_text
            ? parseDaysHours(r.opening_hours.weekday_text)
            : undefined,
          photos,
          group,
        });
      });
    });
  }

  async function loadKampHotspots() {
    const google = googleRef.current;
    const placesService = placesServiceRef.current;
    const map = mapInstanceRef.current;
    if (!google || !placesService || !map) return;

    const radius = 250;
    const allResults: any[] = [];

    const runNearby = (type: string) =>
      new Promise<void>((resolve) => {
        placesService.nearbySearch(
          {
            location: CENTER,
            radius,
            type,
          },
          (results: any[], status: any) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results?.length) {
              allResults.push(...results);
            }
            resolve();
          }
        );
      });

    // A couple of passes; we’ll filter down to “Kamp” in the address.
    await runNearby("restaurant");
    await runNearby("cafe");
    await runNearby("bar");

    // De-dup by place_id.
    const unique = new Map<string, any>();
    for (const r of allResults) {
      if (r.place_id) unique.set(r.place_id, r);
    }

    // Fetch details for a smaller list so we can filter on route.
    const candidates = Array.from(unique.values()).slice(0, 20);
    const kamp: PlaceLite[] = [];

    for (const c of candidates) {
      const full = await fetchDetails(c.place_id, "kamp");
      if (!full) continue;
      const addr = (full.address || "").toLowerCase();
      if (addr.includes("kamp") && !addr.includes("kampen")) {
        kamp.push(full);
      }
    }

    // Sort by rating + reviews (simple).
    kamp.sort((a, b) => {
      const ar = (a.rating || 0) * 1000 + (a.numReviews || 0);
      const br = (b.rating || 0) * 1000 + (b.numReviews || 0);
      return br - ar;
    });

    upsertPlaces("kamp", kamp.slice(0, 10));
  }

  function setupAutocomplete() {
    const google = googleRef.current;
    const map = mapInstanceRef.current;
    if (!google || !map) return;

    const input = document.getElementById("buurtgids-search") as HTMLInputElement | null;
    if (!input) return;

    const bounds = new google.maps.Circle({ center: CENTER, radius: 1500 }).getBounds();
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ["establishment"],
      fields: ["place_id", "name", "types", "geometry", "rating", "user_ratings_total", "url"],
      bounds,
      strictBounds: true,
    });

    autocomplete.addListener("place_changed", async () => {
      const p = autocomplete.getPlace();
      if (!p?.place_id) return;
      const lite: PlaceLite = {
        placeId: p.place_id,
        name: p.name,
        coords: p.geometry?.location,
        types: p.types,
        typeLabel: formatPlaceType(p.types?.[0]),
        rating: p.rating,
        numReviews: p.user_ratings_total,
        url: p.url,
        group: "search",
      };
      upsertPlaces("search", [lite]);
      await onSelect(lite, true);
      input.value = "";
      setSearchQuery("");
    });
  }

  async function enrichWithDuration(place: PlaceLite) {
    const google = googleRef.current;
    const dm = distanceMatrixRef.current;
    if (!google || !dm || !place.coords) return place;

    return new Promise((resolve) => {
      dm.getDistanceMatrix(
        {
          origins: [CENTER],
          destinations: [place.coords],
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result: any, status: any) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            const trip = result?.rows?.[0]?.elements?.[0];
            if (trip?.status === google.maps.DistanceMatrixElementStatus.OK) {
              resolve({ ...place, durationText: trip.duration?.text });
              return;
            }
          }
          resolve(place);
        }
      );
    });
  }

  async function drawDirections(to: PlaceLite | null) {
    const google = googleRef.current;
    const map = mapInstanceRef.current;
    const ds = directionsServiceRef.current;
    const dr = directionsRendererRef.current;
    if (!google || !map || !ds || !dr) return;

    if (!to?.coords) {
      dr.setMap(null);
      return;
    }

    return new Promise<void>((resolve) => {
      ds.route(
        {
          origin: CENTER,
          destination: to.coords,
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result: any, status: any) => {
          if (status === google.maps.DirectionsStatus.OK) {
            dr.setMap(map);
            dr.setDirections(result);
          } else {
            dr.setMap(null);
          }
          resolve();
        }
      );
    });
  }

  async function onSelect(place: PlaceLite, pan = false) {
    const map = mapInstanceRef.current;
    if (pan && map && place.coords) map.panTo(place.coords);

    // Fetch full details for the side panel
    const full = (await fetchDetails(place.placeId, place.group)) || place;
    const withDuration = await enrichWithDuration(full);

    setSelected(withDuration as PlaceLite);
    await drawDirections(withDuration as PlaceLite);
  }

  function clearSelection() {
    setSelected(null);
    void drawDirections(null);
  }

  const tafelaar = placesByGroup.tafelaar?.[0];
  const theaterPlaces = placesByGroup.theater;
  const parkingPlaces = placesByGroup.parking;
  const kampPlaces = placesByGroup.kamp;

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-headline text-3xl sm:text-4xl tracking-tight">Buurtgids</h1>
          <p className="mt-2 text-muted-foreground">
            De belangrijkste plekken rond <strong>De Tafelaar</strong>: De Flint, parkeren en de leukste spots in de straat.
          </p>
        </div>

        {loadError && (
          <Card className="rounded-2xl border mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Google Maps kan niet laden</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>{loadError}</p>
              <p>
                Check of je <strong>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</strong> hebt gezet en of de juiste APIs aan staan.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Theaterweekend banner */}
        {theaterWeekendMode && (
          <Card className="rounded-2xl border mb-6 bg-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Ticket className="h-5 w-5" />
                {THEATERWEEKEND.title}
                <Badge variant="secondary" className="ml-2">voor de show</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">{THEATERWEEKEND.subtitle}</p>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                {THEATERWEEKEND.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild>
                  <Link href={THEATERWEEKEND.ctaHref}>Reserveer</Link>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={tafelaar?.placeId ? googleMapsDirTo(tafelaar.placeId) : "https://www.google.com/maps"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Route naar De Tafelaar
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card className="rounded-2xl border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Zoek in de buurt
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative">
                  <Input
                    id="buurtgids-search"
                    placeholder="Zoek een plek (bijv. Flint, parkeren, café...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Tip: dit is de Google Places autocomplete. Klik op een suggestie en we tonen meteen route + details.
                </p>
              </CardContent>
            </Card>

            {/* De Tafelaar card (live from Places details) */}
            <Card className="rounded-2xl border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4" />
                  De Tafelaar
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <p className="font-medium">{tafelaar?.name || "De Tafelaar"}</p>
                  <p className="text-sm text-muted-foreground">
                    {tafelaar?.address || contactDetails.address.split("\n").slice(1).join(", ")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="secondary" size="sm">
                    <a
                      href={tafelaar?.placeId ? googleMapsDirTo(tafelaar.placeId) : "https://www.google.com/maps"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Route
                    </a>
                  </Button>
                  {tafelaar?.phoneNumber ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={`tel:${tafelaar.phoneNumber}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Bel
                      </a>
                    </Button>
                  ) : null}
                  {tafelaar?.website ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={tafelaar.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  ) : null}
                </div>
                {tafelaar?.openingHours?.length ? (
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium text-foreground/80 mb-1">Openingstijden</p>
                    <div className="space-y-0.5">
                      {tafelaar.openingHours.map((d) => (
                        <div key={d.days} className="flex justify-between gap-3">
                          <span className="min-w-[70px]">{d.days}</span>
                          <span className="text-right">{d.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* Lists */}
            <PlacesSection
              title="Theater & cultuur"
              subtitle="Handig rondom De Flint (en goed voor je timing)."
              places={theaterPlaces}
              onSelect={onSelect}
              icon={Ticket}
            />

            <PlacesSection
              title="Parkeren & bereikbaarheid"
              subtitle="Snel je auto kwijt. Daarna rustig aan tafel."
              places={parkingPlaces}
              onSelect={onSelect}
              icon={Car}
            />

            <PlacesSection
              title="Kamp hotspots"
              subtitle="Alleen eten/drinken in de straat (Kamp)."
              places={kampPlaces}
              onSelect={onSelect}
              icon={MapPin}
            />

            <p className="text-xs text-muted-foreground">
              Waarom dit er staat: in het marketingplan staat “De Flint + Q&A (parkeren, hoe werkt delen) + bewijs”.
              Dit kaartje doet dat allemaal in één klik.
            </p>
          </div>

          {/* Map + details */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="rounded-2xl border overflow-hidden">
              <div className="h-[60vh] min-h-[420px]" ref={mapRef} />
            </Card>

            {selected && (
              <Card className="rounded-2xl border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={clearSelection}
                          aria-label="Terug"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <span className="truncate">{selected.name}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        {typeof selected.rating === "number" && (
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {selected.rating.toFixed(1)}
                            {selected.numReviews ? ` (${selected.numReviews})` : ""}
                          </span>
                        )}
                        {selected.typeLabel ? <span>{selected.typeLabel}</span> : null}
                        {selected.durationText ? (
                          <Badge variant="secondary">{selected.durationText} lopen</Badge>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild size="sm">
                        <a
                          href={googleMapsDirTo(selected.placeId, CENTER)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="mr-2 h-4 w-4" />
                          Route
                        </a>
                      </Button>
                      {selected.url ? (
                        <Button asChild variant="outline" size="sm">
                          <a href={selected.url} target="_blank" rel="noopener noreferrer">
                            Open in Google
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  {selected.address ? (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{selected.address}</p>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {selected.phoneNumber ? (
                      <Button asChild variant="secondary" size="sm">
                        <a href={`tel:${selected.phoneNumber}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          Bel
                        </a>
                      </Button>
                    ) : null}
                    {selected.website ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={selected.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="mr-2 h-4 w-4" />
                          {selected.websiteDomain || "Website"}
                        </a>
                      </Button>
                    ) : null}
                  </div>

                  {selected.openingHours?.length ? (
                    <div className="rounded-xl bg-muted/30 p-4">
                      <p className="text-sm font-medium mb-2">Openingstijden</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {selected.openingHours.map((d) => (
                          <div key={d.days} className="flex justify-between gap-4">
                            <span className="min-w-[70px]">{d.days}</span>
                            <span className="text-right">{d.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {selected.photos?.length ? (
                    <>
                      <Separator />
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {selected.photos.map((p, i) => (
                          <a
                            key={i}
                            href={p.urlLarge}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.urlSmall}
                              alt="foto"
                              className="h-16 w-full object-cover rounded-lg"
                              loading="lazy"
                            />
                          </a>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Foto’s komen live uit Google Places.
                      </p>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {loading && !loadError ? (
          <p className="mt-6 text-sm text-muted-foreground">Kaart laden…</p>
        ) : null}
      </div>
    </div>
  );
}

function PlacesSection({
  title,
  subtitle,
  places,
  onSelect,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  places: PlaceLite[];
  onSelect: (p: PlaceLite, pan?: boolean) => Promise<void>;
  icon: any;
}) {
  return (
    <Card className="rounded-2xl border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="pt-0">
        {places?.length ? (
          <ul className="space-y-2">
            {places.map((p) => (
              <li key={p.placeId}>
                <button
                  type="button"
                  onClick={() => void onSelect(p, true)}
                  className={cn(
                    "w-full text-left rounded-xl border bg-card px-3 py-2 hover:bg-muted/40 transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {p.typeLabel || ""}
                      </p>
                    </div>
                    {typeof p.rating === "number" ? (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {p.rating.toFixed(1)}{p.numReviews ? ` (${p.numReviews})` : ""}
                      </span>
                    ) : null}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Nog niets gevonden.</p>
        )}
      </CardContent>
    </Card>
  );
}
