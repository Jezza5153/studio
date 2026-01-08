'use client';

import { useEffect, useRef, useState } from 'react';

const TAPLA_ORIGIN = 'https://widget.tapla.nl';
// Update only if Tapla changes it:
const TAPLA_IFRAME_SRC =
  'https://widget.tapla.nl/book/e915e6ca-9391-4777-b651-7e2d2c145afc';

declare global {
  interface Window {
    taplaOpen?: () => void;
    taplaClose?: () => void;
  }
}

export default function Tapla() {
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Tapla widgets often decide what UI to render (button-only vs full booking)
  // based on iframe size *at load time*. If we resize AFTER load, you can end up
  // with a big white panel that still only shows the small button.
  //
  // Fix: keep the iframe ALWAYS at the "open" size, and when "closed" we simply
  // clip it to the button area by shrinking the wrapper + translating the iframe.
  const CLOSED_W = 160;
  const CLOSED_H = 60;
  const OPEN_W = 354;
  const OPEN_H = 600;

  // Helper to send commands to the iframe
  const sendToTapla = (cmd: 'TAPLA_OPEN' | 'TAPLA_CLOSE') => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      win.postMessage(cmd, TAPLA_ORIGIN);
    }
  };
  
  // Minimalist open request handler
  const requestOpen = () => {
    setIsOpen(true);
    sendToTapla("TAPLA_OPEN");
  };

  // Minimalist close request handler
  const requestClose = () => {
    setIsOpen(false);
    sendToTapla("TAPLA_CLOSE");
  };

  useEffect(() => {
    // Expose functions for CTA buttons anywhere in the site
    window.taplaOpen = requestOpen;
    window.taplaClose = requestClose;

    const handleMessage = (event: MessageEvent) => {
      // Only trust messages from Tapla
      if (event.origin !== TAPLA_ORIGIN) return;

      console.log("Tapla message:", event.data);

      const data = event.data as any;

      // Tapla may send strings or objects depending on version
      const type =
        typeof data === 'string'
          ? data
          : typeof data === 'object' && data
          ? data.type || data.event || data.name
          : undefined;

      if (type === 'TAPLA_OPEN') setIsOpen(true);
      if (type === 'TAPLA_CLOSE') setIsOpen(false);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'max(0px, env(safe-area-inset-bottom))',
        right: 'max(0px, env(safe-area-inset-right))',
        zIndex: 50,
      }}
      aria-label="Tapla reserveringswidget"
    >
      {/* Wrapper = the visible window. We animate this. */}
      <div
        style={{
          width: isOpen ? OPEN_W : CLOSED_W,
          height: isOpen ? OPEN_H : CLOSED_H,
          maxWidth: '100vw',
          maxHeight: '100vh',
          overflow: 'hidden',
          borderRadius: 12,
          boxShadow:
            '0 8px 24px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.12)',
          background: '#fff',
          transition: 'width .2s ease, height .2s ease',
        }}
      >
        <iframe
          ref={iframeRef}
          title="Reserveren bij De Tafelaar (Tapla)"
          frameBorder={0}
          src={TAPLA_IFRAME_SRC}
          style={{
            width: OPEN_W,
            height: OPEN_H,
            border: 0,
            outline: 'none',
            background: '#fff',
            // When closed, shift the big iframe so only its bottom-right corner
            // (where the green Tapla button sits) is visible.
            transform: isOpen
              ? 'translate(0px, 0px)'
              : `translate(${CLOSED_W - OPEN_W}px, ${CLOSED_H - OPEN_H}px)`,
            transition: 'transform .2s ease',
          }}
          tabIndex={-1}
          // If Tapla ever needs popups or payments, keep sandbox off.
        />
      </div>
    </div>
  );
}
