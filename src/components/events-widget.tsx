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
    // Preload: start loading the iframe when user shows intent (hover/touch)
    const [preload, setPreload] = useState(false);

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

    // Trigger preload on hover or touchstart — iframe loads in background
    const handleIntent = () => {
        if (!preload) setPreload(true);
    };

    if (!mounted) return null;

    // Show iframe if open OR preloading (hidden when preloading)
    const shouldRenderIframe = isOpen || preload;

    return (
        <div
            style={{
                position: "fixed",
                bottom: "max(0px, env(safe-area-inset-bottom))",
                left: "auto",
                right: "max(16px, env(safe-area-inset-right))",
                zIndex: 50,
            }}
        >
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    onMouseEnter={handleIntent}
                    onTouchStart={handleIntent}
                    style={{
                        padding: "14px 22px",
                        background: "#2D9B7A",
                        color: "#fff",
                        border: "none",
                        borderRadius: 12,
                        fontWeight: 700,
                        fontSize: 15,
                        letterSpacing: "0.5px",
                        cursor: "pointer",
                        boxShadow: "0 8px 24px rgba(0,0,0,.18)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <span style={{ fontSize: 18 }}>🎫</span>
                    RESERVEREN
                </button>
            )}

            {/* Widget iframe — rendered on hover (hidden) or click (visible) */}
            {shouldRenderIframe && (
                <div
                    style={{
                        position: isOpen ? "relative" : "fixed",
                        // When preloading: render off-screen so browser loads all resources
                        ...(isOpen
                            ? {}
                            : {
                                visibility: "hidden" as const,
                                pointerEvents: "none" as const,
                                left: -9999,
                                top: -9999,
                                width: 0,
                                height: 0,
                                overflow: "hidden" as const,
                            }),
                    }}
                >
                    {isOpen && (
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
                    )}
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
                            boxShadow: isOpen
                                ? "0 8px 24px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.12)"
                                : "none",
                            background: "transparent",
                        }}
                    />
                </div>
            )}
        </div>
    );
}
