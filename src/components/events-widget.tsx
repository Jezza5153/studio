"use client";
import { useEffect, useRef, useState } from "react";
import { EVENTS_ORIGIN, EVENTS_IFRAME_SRC } from "@/lib/events";

declare global {
    interface Window {
        eventsOpen?: () => void;
        eventsClose?: () => void;
    }
}

export default function EventsWidget() {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        window.eventsOpen = () => setIsOpen(true);
        window.eventsClose = () => setIsOpen(false);
        return () => {
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
                right: "calc(170px + max(0px, env(safe-area-inset-right)))", // Next to Tapla on the RIGHT
                zIndex: 50,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            }}
        >
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        padding: "12px 20px",
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: 12,
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        boxShadow: "0 8px 24px rgba(0,0,0,.18)",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <span style={{ fontSize: 18 }}>🎫</span>
                    Events
                </button>
            )}

            {/* Widget iframe */}
            {isOpen && (
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 10,
                            background: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: 28,
                            height: 28,
                            cursor: "pointer",
                            fontSize: 16,
                        }}
                    >
                        ✕
                    </button>
                    <iframe
                        ref={iframeRef}
                        title="EVENTS Booking Widget"
                        src={EVENTS_IFRAME_SRC}
                        onLoad={() => setIsLoaded(true)}
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
        </div>
    );
}
