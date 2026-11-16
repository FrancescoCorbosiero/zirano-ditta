'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Durata dell'intro CSS (vedi globals.css): le animazioni aspettano il sipario. */
const INTRO_MS = 1500;
let first = true;

/**
 * Carica il motore delle animazioni dopo la pagina e lo riaccende a ogni
 * navigazione. Con "riduci movimento" non scarica nulla.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('motion')) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const intro = first && root.classList.contains('intro');
    first = false;

    import('@/lib/motion/engine')
      .then(({ initPage }) => {
        if (cancelled) return;
        cleanup = initPage({ delay: intro ? INTRO_MS / 1000 : 0 });
        (window as unknown as { __motion?: boolean }).__motion = true;
      })
      .catch(() => root.classList.remove('motion'));

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
