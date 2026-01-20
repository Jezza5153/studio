"use client";
import { useEffect, useRef, useState } from "react";
import { TAPLA_ORIGIN, TAPLA_IFRAME_SRC } from "@/lib/tapla";
import { EVENTS_IFRAME_SRC } from "@/lib/events";

type ActiveWidget = "none" | "tapla" | "events";

export default function UnifiedWidgets() {
    const taplaRef = useRef<HTMLIFrameElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState<ActiveWidget>("none");
    const [taplaLoaded, setTaplaLoaded] = useState(false);

    useEffect(() => setMounted(true), []);

    // Tapla message handling
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

    return (
        <div
            style={{
                position: "fixed",
                bottom: "max(0px, env(safe-area-inset-bottom))",
                right: "max(0px, env(safe-area-inset-right))",
                zIndex: 50,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 12,
            }}
        >
            {/* Events iframe (when open) */}
            {active === "events" && (
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => setActive("none")}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 10,
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            cursor: "pointer",
                            fontSize: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ✕
                    </button>
                    <iframe
                        title="EVENTS Booking Widget"
                        src={EVENTS_IFRAME_SRC}
                        style={{
                            width: 380,
                            height: 600,
                            maxWidth: "calc(100vw - 32px)",
                            maxHeight: "calc(100dvh - 100px)",
                            border: 0,
                            borderRadius: 16,
                            boxShadow: "0 8px 24px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.12)",
                            background: "#fff",
                        }}
                    />
                </div>
            )}

            {/* Tapla iframe (always rendered for messages, visibility controlled) */}
            <div
                style={{
                    opacity: taplaLoaded ? 1 : 0,
                    transform: taplaLoaded ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                    display: active === "events" ? "none" : "block",
                }}
            >
                <iframe
                    ref={taplaRef}
                    title="Reserveren bij De Tafelaar (Tapla)"
                    src={TAPLA_IFRAME_SRC}
                    onLoad={() => setTaplaLoaded(true)}
                    style={{
                        width: active === "tapla" ? 354 : 160,
                        height: active === "tapla" ? 600 : 60,
                        maxWidth: "100vw",
                        maxHeight: "100dvh",
                        border: 0,
                        borderRadius: 12,
                        boxShadow: "0 8px 24px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.12)",
                        background: "#fff",
                        transition: "width 0.25s ease, height 0.25s ease",
                    }}
                />
            </div>

            {/* Button row (when no widget is fully open) */}
            {active === "none" && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 70,
                        right: 0,
                        display: "flex",
                        gap: 8,
                    }}
                >
                    <button
                        onClick={() => setActive("events")}
                        style={{
                            padding: "14px 20px",
                            background: "#000",
                            color: "#D4AF37",
                            border: "none",
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: 14,
                            letterSpacing: "0.5px",
                            cursor: "pointer",
                            boxShadow: "0 4px 16px rgba(0,0,0,.15)",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        🎫 EVENTS
                    </button>
                </div>
            )}
        </div>
    );
}
