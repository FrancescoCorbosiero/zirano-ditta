'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Popup } from 'konsta/react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { NAV, QUOTE_HREF, SITE } from '@/lib/site';
import { pad } from '@/lib/works';
import Logo from './Logo';

/** Il menu del telefono: un popup Konsta a tutto schermo, in notturna. */
export default function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <Popup
      opened={open}
      onBackdropClick={onClose}
      colors={{ bg: 'bg-notte' }}
      className={`tone-dark !z-[70] ${open ? 'menu-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      {...(open ? {} : { inert: true })}
    >
      <div className="flex h-full flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-[calc(env(safe-area-inset-top)+14px)]" data-lenis-prevent>
        <div className="flex items-center justify-between">
          <Logo size={30} />
          <button type="button" onClick={onClose} aria-label="Chiudi il menu" className="grid h-11 w-11 place-items-center rounded-[3px] border border-white/15">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mt-10 flex-1 overflow-y-auto" aria-label="Principale">
          <ul>
            {[{ href: '/', label: 'Home' }, ...NAV].map((item, i) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="menu-item border-b border-white/10" style={{ '--i': i } as React.CSSProperties}>
                  <Link href={item.href} onClick={onClose} aria-current={active ? 'page' : undefined} className="flex items-baseline gap-4 py-[15px]">
                    <span className="mono w-7 text-gelo-mute">{pad(i)}</span>
                    <span className="text-[30px] font-[480] leading-none tracking-[-0.03em]" style={{ fontStretch: '114%' }}>
                      {item.label}
                    </span>
                    {active && <span className="ml-auto h-[7px] w-[7px] self-center bg-ottone" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="menu-item mt-6 grid gap-4" style={{ '--i': 7 } as React.CSSProperties}>
          <div className="mono flex justify-between text-gelo-mute">
            <a href={SITE.phone.href}>{SITE.phone.label}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <Button href={QUOTE_HREF} variant="brass" className="w-full justify-between">
            Richiedi un preventivo
          </Button>
        </div>
      </div>
    </Popup>
  );
}
