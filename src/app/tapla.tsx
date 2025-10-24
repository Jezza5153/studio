'use client';

import { useEffect, useState } from 'react';

const TAPLA_ORIGIN = 'https://widget.tapla.nl';
// If Tapla ever changes the URL path, only update here:
const TAPLA_IFRAME_SRC =
  'https://widget.tapla.nl/book/e915e6ca-9391-4777-b651-7e2d2c145afc';

export default function Tapla() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // ✅ Only trust messages from Tapla
      if (event.origin !== TAPLA_ORIGIN) return;
      if (event.data === 'TAPLA_OPEN') setOpen(true);
      if (event.data === 'TAPLA_CLOSE') setOpen(false);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        // Respect safe areas on iOS/Android
        bottom: 'max(0px, env(safe-area-inset-bottom))',
        right: 'max(0px, env(safe-area-inset-right))',
        zIndex: 50, // a bit higher so it stays above sheets/modals
      }}
    >
      <iframe
        title="Reserveren bij De Tafelaar (Tapla)"
        frameBorder={0}
        src={TAPLA_IFRAME_SRC}
        // NOTE: If Tapla needs popups or payments, don't sandbox; if you want to sandbox:
        // sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
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
          // Smooth expand/collapse
          transition: 'width .2s ease, height .2s ease',
          background: 'transparent',
        }}
        tabIndex={-1}
      />
    </div>
  );
}
