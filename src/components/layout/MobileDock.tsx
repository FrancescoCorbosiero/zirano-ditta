'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone } from 'lucide-react';
import { useApp } from '@/components/app/AppProvider';
import { Arrow } from '@/components/ui/Button';
import { QUOTE_HREF, SITE } from '@/lib/site';

/** Barra in basso sul telefono: chiamare, scrivere, chiedere il preventivo. */
export default function MobileDock() {
  const pathname = usePathname();
  const { overlay } = useApp();
  if (pathname === QUOTE_HREF) return null;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
        overlay ? 'translate-y-[140%]' : ''
      }`}
    >
      <div className="glass-ink flex h-[58px] items-stretch p-[5px]">
        <a href={SITE.phone.href} aria-label="Chiama" className="grid w-[52px] place-items-center text-gelo/80">
          <Phone size={19} strokeWidth={1.5} />
        </a>
        <a href={SITE.whatsapp} target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp" className="grid w-[52px] place-items-center border-l border-white/10 text-gelo/80">
          <MessageCircle size={19} strokeWidth={1.5} />
        </a>
        <Link href={QUOTE_HREF} className="ml-[5px] flex flex-1 items-center justify-between rounded-[2px] bg-ottone pl-4 pr-3.5 text-[15px] font-[580] text-notte">
          Preventivo gratuito
          <Arrow />
        </Link>
      </div>
    </div>
  );
}
