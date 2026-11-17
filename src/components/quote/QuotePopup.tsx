'use client';

import { useEffect, useRef } from 'react';
import { Popup } from 'konsta/react';
import { X } from 'lucide-react';
import QuoteFlow from './QuoteFlow';

/**
 * Il preventivo sopra qualsiasi pagina: popup Konsta, a tutto schermo sul
 * telefono e centrato da tablet in su.
 */
export default function QuotePopup({ open, service, onClose }: { open: boolean; service: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  // Il focus entra nel popup all'apertura e torna a chi l'ha aperto.
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => ref.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true }), 350);
    return () => {
      window.clearTimeout(t);
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <Popup
      opened={open}
      onBackdropClick={onClose}
      colors={{ bg: 'bg-gesso' }}
      className="!z-[70] md:!h-[min(760px,92dvh)] md:!w-[600px] md:!rounded-[6px]"
      role="dialog"
      aria-modal="true"
      aria-label="Richiesta di preventivo"
      {...(open ? {} : { inert: true })}
    >
      <div ref={ref} className="flex h-full flex-col overflow-y-auto overscroll-contain pt-[env(safe-area-inset-top)]" data-lenis-prevent>
        <div className="flex items-center justify-between border-b border-grafite/10 py-3 pl-5 pr-3 sm:pl-7">
          <p className="text-[15px] font-[600] tracking-[-0.01em] text-grafite">
            Preventivo gratuito <span className="font-[500] text-grafite-mute">· risposta in 24 ore</span>
          </p>
          <button type="button" data-autofocus onClick={onClose} aria-label="Chiudi" className="grid h-10 w-10 place-items-center rounded-[3px] text-grafite hover:bg-grafite/5">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <QuoteFlow variant="popup" service={service} onClose={onClose} />
      </div>
    </Popup>
  );
}
