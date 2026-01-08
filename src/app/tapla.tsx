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

      if (type === 'TAPLA_OPEN') setOpen(true);
      if (type === 'TAPLA_CLOSE') setOpen(false);
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
