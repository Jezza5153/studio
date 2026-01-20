"use client";
import { useEffect, useRef, useState } from "react";
import { TAPLA_ORIGIN, TAPLA_IFRAME_SRC } from "@/lib/tapla";
import { EVENTS_IFRAME_SRC } from "@/lib/events";

type ActiveWidget = "none" | "tapla" | "events";

export default function UnifiedWidgets() {
    const taplaRef = useRef<HTMLIFrameElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState<ActiveWidget>("none");
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;

        const send = (msg: string) => {
            taplaRef.current?.contentWindow?.postMessage(msg, TAPLA_ORIGIN);
        };

        window.taplaOpen = () => {
            send("TAPLA_OPEN");
            handleOpen("tapla");
        };
        window.taplaClose = () => {
            send("TAPLA_CLOSE");
            handleClose();
        };
        window.eventsOpen = () => handleOpen("events");
        window.eventsClose = () => handleClose();

        const onMessage = (event: MessageEvent) => {
            if (event.origin !== TAPLA_ORIGIN) return;
            const data = event.data;
            const type = typeof data === "string" ? data : data?.type;
            if (type === "TAPLA_OPEN") handleOpen("tapla");
            if (type === "TAPLA_CLOSE") handleClose();
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

    const handleOpen = (widget: "tapla" | "events") => {
        setIsAnimating(true);
        setActive(widget);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setActive("none");
            setIsAnimating(false);
        }, 200);
    };

    if (!mounted) return null;

    // Shared animation styles
    const slideUpStyle = {
        animation: isAnimating ? "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
    };

    const fadeInStyle = {
        animation: "fadeIn 0.3s ease-out",
    };

    return (
        <>
            {/* Keyframe animations */}
            <style jsx global>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
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
                {/* Events Widget */}
                {active === "events" && (
                    <div style={{ position: "relative", ...slideUpStyle }}>
                        <button
                            onClick={() => handleClose()}
                            onMouseEnter={() => setHoveredButton("close-events")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                zIndex: 10,
                                background: hoveredButton === "close-events" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)",
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
                                transform: hoveredButton === "close-events" ? "scale(1.1)" : "scale(1)",
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
                                borderRadius: 20,
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,.25), 0 12px 24px -8px rgba(0,0,0,.15)",
                                background: "#fff",
                            }}
                        />
                    </div>
                )}

                {/* Tapla Widget */}
                {active === "tapla" && (
                    <div style={{ ...slideUpStyle }}>
                        <iframe
                            ref={taplaRef}
                            title="Reserveren bij De Tafelaar (Tapla)"
                            src={TAPLA_IFRAME_SRC}
                            style={{
                                width: 354,
                                height: 600,
                                maxWidth: "100vw",
                                maxHeight: "100dvh",
                                border: 0,
                                borderRadius: 16,
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,.25), 0 12px 24px -8px rgba(0,0,0,.15)",
                                background: "#fff",
                            }}
                        />
                    </div>
                )}

                {/* Unified Button Pill */}
                {active === "none" && (
                    <div
                        style={{
                            display: "flex",
                            borderRadius: 16,
                            overflow: "hidden",
                            boxShadow: "0 10px 40px rgba(0,0,0,.15), 0 4px 12px rgba(0,0,0,.1)",
                            ...fadeInStyle,
                        }}
                    >
                        {/* EVENTS button */}
                        <button
                            onClick={() => handleOpen("events")}
                            onMouseEnter={() => setHoveredButton("events")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                padding: "16px 22px",
                                background: hoveredButton === "events" ? "#2a2a2a" : "#1a1a1a",
                                color: "#D4AF37",
                                border: "none",
                                borderRight: "1px solid rgba(255,255,255,0.08)",
                                fontWeight: 700,
                                fontSize: 14,
                                letterSpacing: "0.5px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                                transform: hoveredButton === "events" ? "scale(1.02)" : "scale(1)",
                            }}
                        >
                            <span style={{
                                fontSize: 16,
                                transition: "transform 0.3s ease",
                                transform: hoveredButton === "events" ? "rotate(-10deg) scale(1.1)" : "rotate(0)",
                            }}>
                                🎫
                            </span>
                            EVENTS
                        </button>

                        {/* Reserveren button */}
                        <button
                            onClick={() => handleOpen("tapla")}
                            onMouseEnter={() => setHoveredButton("tapla")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                padding: "16px 22px",
                                background: hoveredButton === "tapla" ? "#35b08c" : "#2D9B7A",
                                color: "#fff",
                                border: "none",
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                                transform: hoveredButton === "tapla" ? "scale(1.02)" : "scale(1)",
                            }}
                        >
                            <span style={{
                                fontSize: 16,
                                transition: "transform 0.3s ease",
                                transform: hoveredButton === "tapla" ? "rotate(10deg) scale(1.1)" : "rotate(0)",
                            }}>
                                📅
                            </span>
                            Reserveren
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
