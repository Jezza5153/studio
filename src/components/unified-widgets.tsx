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

    // When a widget is open, show it full screen
    if (active === "events") {
        return (
            <div
                style={{
                    position: "fixed",
                    bottom: "max(0px, env(safe-area-inset-bottom))",
                    right: "max(0px, env(safe-area-inset-right))",
                    zIndex: 50,
                }}
            >
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
                            boxShadow: "0 8px 24px rgba(0,0,0,.18)",
                            background: "#fff",
                        }}
                    />
                </div>
            </div>
        );
    }

    if (active === "tapla") {
        return (
            <div
                style={{
                    position: "fixed",
                    bottom: "max(0px, env(safe-area-inset-bottom))",
                    right: "max(0px, env(safe-area-inset-right))",
                    zIndex: 50,
                    opacity: taplaLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-out",
                }}
            >
                <iframe
                    ref={taplaRef}
                    title="Reserveren bij De Tafelaar (Tapla)"
                    src={TAPLA_IFRAME_SRC}
                    onLoad={() => setTaplaLoaded(true)}
                    style={{
                        width: 354,
                        height: 600,
                        maxWidth: "100vw",
                        maxHeight: "100dvh",
                        border: 0,
                        borderRadius: 12,
                        boxShadow: "0 8px 24px rgba(0,0,0,.18)",
                        background: "#fff",
                    }}
                />
            </div>
        );
    }

    // Closed state: show both buttons side by side in a unified pill
    return (
        <div
            style={{
                position: "fixed",
                bottom: "max(16px, env(safe-area-inset-bottom))",
                right: "max(16px, env(safe-area-inset-right))",
                zIndex: 50,
                display: "flex",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.1)",
            }}
        >
            {/* EVENTS button - left side */}
            <button
                onClick={() => setActive("events")}
                style={{
                    padding: "14px 18px",
                    background: "#1a1a1a",
                    color: "#D4AF37",
                    border: "none",
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.3px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                🎫 EVENTS
            </button>

            {/* Reserveren button - right side */}
            <button
                onClick={() => setActive("tapla")}
                style={{
                    padding: "14px 18px",
                    background: "#2D9B7A",
                    color: "#fff",
                    border: "none",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                📅 Reserveren
            </button>
        </div>
    );
}
