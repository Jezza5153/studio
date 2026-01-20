"use client";
import dynamic from "next/dynamic";

const UnifiedWidgets = dynamic(() => import("./unified-widgets"), { ssr: false });

export function UnifiedWidgetsMount() {
    return <UnifiedWidgets />;
}
