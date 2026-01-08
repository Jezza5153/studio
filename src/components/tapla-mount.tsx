'use client';

import dynamic from 'next/dynamic';
import { TAPLA_IFRAME_SRC } from '@/lib/tapla';

// Prevent SSR for the Tapla iframe to avoid hydration mismatches.
const Tapla = dynamic(() => import('@/app/tapla'), { ssr: false });

export function TaplaMount() {
  return <Tapla />;
}
