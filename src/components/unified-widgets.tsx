"use client";
import { useEffect, useRef, useState } from "react";
import { TAPLA_ORIGIN, TAPLA_IFRAME_SRC } from "@/lib/tapla";
import { EVENTS_IFRAME_SRC } from "@/lib/events";

type ActiveWidget = "none" | "tapla" | "events";

export default function UnifiedWidgets() {
    const taplaRef = useRef<HTMLIFrameElement | null>(null);
    const eventsRef = useRef<HTMLIFrameElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState<ActiveWidget>("none");
    const [taplaLoaded, setTaplaLoaded] = useState(false);
    const [eventsLoaded, setEventsLoaded] = useState(false);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;

        const send = (msg: string) => {
            taplaRef.current?.contentWindow?.postMessage(msg, TAPLA_ORIGIN);
        };

        window.taplaOpen = () => {
            send("TAPLA_OPEN");
            setActive("tapla");
        };
        window.taplaClose = () => {
            send("TAPLA_CLOSE");
            setActive("none");
        };
        window.eventsOpen = () => setActive("events");
        window.eventsClose = () => setActive("none");

        const onMessage = (event: MessageEvent) => {
            if (event.origin !== TAPLA_ORIGIN) return;
            const data = event.data;
            const type = typeof data === "string" ? data : data?.type;
            if (type === "TAPLA_OPEN") setActive("tapla");
            if (type === "TAPLA_CLOSE") setActive("none");
        };

        window.addEventListener("message", onMessage);
        return () => {
            window.removeEventListener("message", onMessage);
            delete window.taplaOpen;
            delete window.taplaClose;
            delete window.eventsOpen;
            delete window.eventsClose;
        };
    }, [mounted]);

    if (!mounted) return null;

    const isLoading = (active === "events" && !eventsLoaded) || (active === "tapla" && !taplaLoaded);

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

            {/* Preload iframes (hidden) */}
            <div style={{ position: "absolute", left: -9999, top: -9999, opacity: 0, pointerEvents: "none" }}>
                <iframe
                    ref={taplaRef}
                    src={TAPLA_IFRAME_SRC}
                    onLoad={() => setTaplaLoaded(true)}
                    style={{ width: 1, height: 1 }}
                    title="Tapla preload"
                />
                <iframe
                    ref={eventsRef}
                    src={EVENTS_IFRAME_SRC}
                    onLoad={() => setEventsLoaded(true)}
                    style={{ width: 1, height: 1 }}
                    title="Events preload"
                />
            </div>

            <div
                style={{
                    position: "fixed",
                    bottom: "max(16px, env(safe-area-inset-bottom))",
                    right: "max(16px, env(safe-area-inset-right))",
                    zIndex: 50,
                }}
            >
                {/* Events Widget */}
                {active === "events" && (
                    <div
                        style={{
                            position: "relative",
                            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        <button
                            onClick={() => setActive("none")}
                            onMouseEnter={() => setHoveredButton("close")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                zIndex: 10,
                                background: hoveredButton === "close" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50%",
                                width: 34,
                                height: 34,
                                cursor: "pointer",
                                fontSize: 18,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                                transform: hoveredButton === "close" ? "scale(1.1)" : "scale(1)",
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
                                    borderRadius: 20,
                                    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
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
                                    border: "3px solid #ddd",
                                    borderTopColor: "#D4AF37",
                                    borderRadius: "50%",
                                    animation: "spin 0.8s linear infinite",
                                }} />
                            </div>
                        )}

                        <iframe
                            title="EVENTS Booking Widget"
                            src={EVENTS_IFRAME_SRC}
                            onLoad={() => setEventsLoaded(true)}
                            style={{
                                width: 380,
                                height: 600,
                                maxWidth: "calc(100vw - 32px)",
                                maxHeight: "calc(100dvh - 100px)",
                                border: 0,
                                borderRadius: 20,
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,.25)",
                                background: "#fff",
                                opacity: eventsLoaded ? 1 : 0,
                                transition: "opacity 0.3s ease",
                            }}
                        />
                    </div>
                )}

                {/* Tapla Widget */}
                {active === "tapla" && (
                    <div style={{ animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                        {/* Loading skeleton */}
                        {!taplaLoaded && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: 16,
                                    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
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
                                    border: "3px solid #ddd",
                                    borderTopColor: "#2D9B7A",
                                    borderRadius: "50%",
                                    animation: "spin 0.8s linear infinite",
                                }} />
                            </div>
                        )}

                        <iframe
                            title="Reserveren bij De Tafelaar (Tapla)"
                            src={TAPLA_IFRAME_SRC}
                            onLoad={() => setTaplaLoaded(true)}
                            style={{
                                width: 354,
                                height: 600,
                                maxWidth: "100vw",
                                maxHeight: "100dvh",
                                border: 0,
                                borderRadius: 16,
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,.25)",
                                background: "#fff",
                                opacity: taplaLoaded ? 1 : 0,
                                transition: "opacity 0.3s ease",
                            }}
                        />
                    </div>
                )}

                {/* Two Separate Button Blocks */}
                {active === "none" && (
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            animation: "fadeIn 0.25s ease-out",
                        }}
                    >
                        {/* EVENTS Block */}
                        <button
                            onClick={() => setActive("events")}
                            onMouseEnter={() => setHoveredButton("events")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                padding: "16px 22px",
                                background: hoveredButton === "events" ? "#2a2a2a" : "#1a1a1a",
                                color: "#D4AF37",
                                border: "none",
                                borderRadius: 14,
                                fontWeight: 700,
                                fontSize: 14,
                                letterSpacing: "0.5px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                transition: "all 0.2s ease",
                                boxShadow: hoveredButton === "events"
                                    ? "0 12px 32px rgba(0,0,0,.25)"
                                    : "0 8px 24px rgba(0,0,0,.15)",
                                transform: hoveredButton === "events" ? "translateY(-2px)" : "translateY(0)",
                            }}
                        >
                            <span style={{ fontSize: 16 }}>🎫</span>
                            EVENTS
                        </button>

                        {/* Reserveren Block */}
                        <button
                            onClick={() => setActive("tapla")}
                            onMouseEnter={() => setHoveredButton("tapla")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                padding: "16px 22px",
                                background: hoveredButton === "tapla" ? "#35b08c" : "#2D9B7A",
                                color: "#fff",
                                border: "none",
                                borderRadius: 14,
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                transition: "all 0.2s ease",
                                boxShadow: hoveredButton === "tapla"
                                    ? "0 12px 32px rgba(0,0,0,.25)"
                                    : "0 8px 24px rgba(0,0,0,.15)",
                                transform: hoveredButton === "tapla" ? "translateY(-2px)" : "translateY(0)",
                            }}
                        >
                            <span style={{ fontSize: 16 }}>📅</span>
                            Reserveren
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
