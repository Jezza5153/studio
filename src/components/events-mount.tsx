"use client";
import dynamic from "next/dynamic";

const EventsWidget = dynamic(() => import("./events-widget"), { ssr: false });

export function EventsMount() {
    return <EventsWidget />;
}
