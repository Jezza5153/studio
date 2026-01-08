'use client';

import dynamic from 'next/dynamic';

// Prevent SSR for the Tapla iframe to avoid hydration mismatches.
const Tapla = dynamic(() => import('@/app/tapla'), { ssr: false });

export function TaplaMount() {
  return <Tapla />;
}
