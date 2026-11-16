'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { KonstaProvider } from 'konsta/react';
import { lockScroll } from '@/lib/motion/scroll';
import { QUOTE_HREF } from '@/lib/site';

/* Preventivo e menu si scaricano solo al primo uso: chi legge e basta
   non porta con sé il codice dei moduli. */
const QuotePopup = dynamic(() => import('@/components/quote/QuotePopup'), { ssr: false });
const MenuSheet = dynamic(() => import('@/components/layout/MenuSheet'), { ssr: false });

type AppApi = {
  /** Apre il preventivo sopra la pagina, con un servizio già scelto se serve. */
  openQuote: (service?: string) => void;
  openMenu: () => void;
  closeAll: () => void;
  overlay: 'quote' | 'menu' | null;
};

const AppContext = createContext<AppApi | null>(null);

export function useApp(): AppApi {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp va usato dentro <AppProvider>');
  return ctx;
}

/**
 * Il guscio "app" del sito. Ogni link a /preventivo apre il modulo sul
 * posto, in un popup Konsta (i link restano link veri: senza JavaScript,
 * in una nuova scheda o per i motori di ricerca portano alla pagina).
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Un foglio resta aperto solo sulla pagina in cui è stato aperto: al
  // cambio pagina si chiude da sé.
  const [sheet, setSheet] = useState<{ kind: NonNullable<AppApi['overlay']>; path: string } | null>(null);
  const overlay = sheet?.path === pathname ? sheet.kind : null;
  const setOverlay = useCallback((kind: AppApi['overlay']) => setSheet(kind ? { kind, path: window.location.pathname } : null), []);
  const [quote, setQuote] = useState<{ id: number; service: string } | null>(null);
  const [menuMounted, setMenuMounted] = useState(false);

  const openQuote = useCallback((service = '') => {
    setQuote((q) => ({ id: (q?.id ?? 0) + 1, service }));
    // Un fotogramma dopo il montaggio, così il popup entra con la transizione.
    requestAnimationFrame(() => requestAnimationFrame(() => setOverlay('quote')));
  }, [setOverlay]);
  const openMenu = useCallback(() => {
    setMenuMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setOverlay('menu')));
  }, [setOverlay]);
  const closeAll = useCallback(() => setOverlay(null), [setOverlay]);

  useEffect(() => {
    if (!overlay) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOverlay(null);
    document.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      document.removeEventListener('keydown', onKey);
    };
  }, [overlay, setOverlay]);

  // I link al preventivo aprono il popup (tranne sulla pagina che lo ospita).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== QUOTE_HREF) return;
      if (window.location.pathname === QUOTE_HREF) return;
      e.preventDefault();
      e.stopPropagation();
      openQuote(url.searchParams.get('servizio') ?? '');
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [openQuote]);

  return (
    <KonstaProvider theme="ios" dark={false}>
      <AppContext.Provider value={{ openQuote, openMenu, closeAll, overlay }}>
        {children}
        {quote && <QuotePopup key={quote.id} open={overlay === 'quote'} service={quote.service} onClose={closeAll} />}
        {menuMounted && <MenuSheet open={overlay === 'menu'} onClose={closeAll} />}
      </AppContext.Provider>
    </KonstaProvider>
  );
}
