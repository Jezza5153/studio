"use client";
import { useEffect, useRef, useState } from "react";
import { EVENTS_IFRAME_SRC } from "@/lib/events";

type ActiveWidget = "none" | "events";

export default function UnifiedWidgets() {
    const eventsRef = useRef<HTMLIFrameElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState<ActiveWidget>("none");
    const [eventsLoaded, setEventsLoaded] = useState(false);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;

        // Global open/close hooks used by ReserveerButton and other components
        window.eventsOpen = () => setActive("events");
        window.eventsClose = () => setActive("none");

        return () => {
            delete window.eventsOpen;
            delete window.eventsClose;
        };
    }, [mounted]);

    if (!mounted) return null;

    const isLoading = active === "events" && !eventsLoaded;

    return (
        <>
            <style jsx global>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <div
                style={{
                    position: "fixed",
                    bottom: "max(16px, env(safe-area-inset-bottom))",
                    right: "max(16px, env(safe-area-inset-right))",
                    zIndex: 50,
                }}
            >
                {/* Events / Booking Widget */}
                {active === "events" && (
                    <div
                        style={{
                            position: "relative",
                            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                            borderRadius: 16,
                            overflow: "hidden",
                            boxShadow: "0 25px 60px -12px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,0.06)",
                            background: "#1a1a1a",
                        }}
                    >
                        <button
                            onClick={() => setActive("none")}
                            onMouseEnter={() => setHoveredButton("close")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                zIndex: 10,
                                background: hoveredButton === "close" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50%",
                                width: 32,
                                height: 32,
                                cursor: "pointer",
                                fontSize: 16,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                                transform: hoveredButton === "close" ? "scale(1.1)" : "scale(1)",
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            ✕
                        </button>

                        {/* Loading skeleton */}
                        {!eventsLoaded && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(90deg, #222 25%, #2a2a2a 50%, #222 75%)",
                                    backgroundSize: "200% 100%",
                                    animation: "shimmer 1.5s infinite",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div style={{
                                    width: 32,
                                    height: 32,
                                    border: "3px solid #333",
                                    borderTopColor: "#D4AF37",
                                    borderRadius: "50%",
                                    animation: "spin 0.8s linear infinite",
                                }} />
                            </div>
                        )}

                        <iframe
                            ref={eventsRef}
                            title="Reserveren bij De Tafelaar"
                            src={EVENTS_IFRAME_SRC}
                            onLoad={() => setEventsLoaded(true)}
                            style={{
                                width: 380,
                                height: 580,
                                maxWidth: "calc(100vw - 32px)",
                                maxHeight: "calc(100dvh - 100px)",
                                border: 0,
                                borderRadius: 0,
                                background: "transparent",
                                display: "block",
                                opacity: eventsLoaded ? 1 : 0,
                                transition: "opacity 0.3s ease",
                            }}
                        />
                    </div>
                )}

                {/* Reserveren FAB Button */}
                {active === "none" && (
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            animation: "fadeIn 0.25s ease-out",
                        }}
                    >
                        <button
                            onClick={() => setActive("events")}
                            onMouseEnter={() => setHoveredButton("reserve")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                padding: "14px 20px",
                                background: hoveredButton === "reserve"
                                    ? "hsl(28, 62%, 52%)"
                                    : "hsl(28, 62%, 46%)",
                                color: "#fff",
                                border: "none",
                                borderRadius: 12,
                                fontWeight: 600,
                                fontSize: 14,
                                letterSpacing: "0.01em",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                transition: "all 0.2s ease",
                                boxShadow: hoveredButton === "reserve"
                                    ? "0 12px 32px rgba(0,0,0,.25)"
                                    : "0 8px 24px rgba(0,0,0,.15)",
                                transform: hoveredButton === "reserve" ? "translateY(-2px)" : "translateY(0)",
                            }}
                        >
                            Reserveer
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
