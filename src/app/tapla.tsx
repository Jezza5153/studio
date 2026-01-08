'use client';

import { useEffect, useState } from 'react';
import { TAPLA_ORIGIN, TAPLA_IFRAME_SRC } from '@/lib/tapla';

declare global {
  interface Window {
    taplaOpen?: () => void;
    taplaClose?: () => void;
  }
}

export default function Tapla() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Expose controls to the rest of the site
    window.taplaOpen = () => setOpen(true);
    window.taplaClose = () => setOpen(false);

    // Optional: auto-open via URL param (great for ads/QR)
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('reserveer')) setOpen(true);
    } catch {}

    const handleMessage = (event: MessageEvent) => {
      // Only trust messages from Tapla
      if (event.origin !== TAPLA_ORIGIN) return;

      if (event.data === 'TAPLA_OPEN') setOpen(true);
      if (event.data === 'TAPLA_CLOSE') setOpen(false);
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
          background: 'transparent',
        }}
        tabIndex={-1}
      />
    </div>
  );
}
