"use client";

import { useEffect, useRef, useState } from "react";
import { TAPLA_ORIGIN, TAPLA_IFRAME_SRC } from "@/lib/tapla";


declare global {
  interface Window {
    taplaOpen?: () => void;
    taplaClose?: () => void;
  }
}

export default function Tapla() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  useEffect(() => {
    if (!mounted) return;

    const send = (msg: string) => {
      iframeRef.current?.contentWindow?.postMessage(msg, TAPLA_ORIGIN);
    };

    let fallbackTimeout: NodeJS.Timeout;

    window.taplaOpen = () => {
      // Try to command the iframe
      send("TAPLA_OPEN");

      // Fallback: open booking in a new tab if nothing happens quickly
      fallbackTimeout = setTimeout(() => {
        const bookingWindow = window.open(TAPLA_IFRAME_SRC, "_blank", "noopener,noreferrer");
        // Try to focus the new window, as some browsers might block it.
        if (bookingWindow) {
          bookingWindow.focus();
        }
      }, 400);
    };

    window.taplaClose = () => {
      send("TAPLA_CLOSE");
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== TAPLA_ORIGIN) return;
      
      // If we receive any message from Tapla, it means the widget is responsive.
      // We can cancel the fallback to prevent opening a new tab unnecessarily.
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
    };

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
      delete window.taplaOpen;
      delete window.taplaClose;
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
      }}
    >
      <iframe
        ref={iframeRef}
        title="Reserveren bij De Tafelaar (Tapla)"
        frameBorder={0}
        src={TAPLA_IFRAME_SRC}
        style={{
          width: 160,
          height: 60,
          border: 0,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.12)",
          background: "transparent"
        }}
      />
    </div>
  );
}
