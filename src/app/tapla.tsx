'use client';

import { useEffect, useRef, useState } from 'react';
import { TAPLA_ORIGIN, TAPLA_IFRAME_SRC } from '@/lib/tapla';

declare global {
  interface Window {
    taplaOpen?: () => void;
    taplaClose?: () => void;
  }
}

export default function Tapla() {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const sendToTapla = (cmd: 'TAPLA_OPEN' | 'TAPLA_CLOSE') => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(cmd, TAPLA_ORIGIN);
  };

  useEffect(() => {
    // Expose functions for CTA buttons anywhere in the site
    window.taplaOpen = () => {
      setOpen(true);
      // Tell Tapla inside the iframe to actually open the booking UI
      sendToTapla('TAPLA_OPEN');
    };
    window.taplaClose = () => {
      setOpen(false);
      sendToTapla('TAPLA_CLOSE');
    };

    // Optional: auto-open via URL param (great for ads/QR)
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('reserveer')) {
        window.taplaOpen();
      }
    } catch {}

    const handleMessage = (event: MessageEvent) => {
      // Only trust messages from Tapla
      if (event.origin !== TAPLA_ORIGIN) return;

      const data = event.data as any;

      // Tapla may send strings or objects depending on version
      const type =
        typeof data === 'string'
          ? data
          : typeof data === 'object' && data
          ? data.type || data.event || data.name
          : undefined;

      if (type === 'TAPLA_OPEN') setOpen(true);
      if (type === 'TAPLA_CLOSE') setOpen(false);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      delete window.taplaOpen;
      delete window.taplaClose;
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'max(0px, env(safe-area-inset-bottom))',
        right: 'max(0px, env(safe-area-inset-right))',
        zIndex: 50,
      }}
    >
      <iframe
        ref={iframeRef}
        title="Reserveren bij De Tafelaar (Tapla)"
        frameBorder={0}
        src={TAPLA_IFRAME_SRC}
        style={{
          width: open ? 354 : 160,
          height: open ? 600 : 60,
          maxWidth: '100vw',
          maxHeight: '100vh',
          outline: 'none',
          border: '0',
          borderRadius: 12,
          boxShadow:
            '0 8px 24px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.12)',
          transition: 'width .2s ease, height .2s ease',
          // Key fix: don’t render the expanded area as “transparent”
          background: '#fff',
        }}
        tabIndex={-1}
      />
    </div>
  );
}