'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/components/app/AppProvider';
import Button from '@/components/ui/Button';
import { NAV, QUOTE_HREF, SITE } from '@/lib/site';
import Logo from './Logo';

/**
 * La barra in alto: una lastra di vetro scuro sospesa sulla pagina.
 * Scendendo si ritira, al primo cenno di risalita torna.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const { openMenu, overlay } = useApp();
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last.current) < 6) return;
      setHidden(y > 480 && y > last.current);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-700 ease-[var(--ease-out-expo)] sm:px-5 sm:pt-4 ${
        hidden && !overlay ? '-translate-y-[130%]' : ''
      }`}
    >
      <div className="glass-ink mx-auto flex h-[60px] max-w-[1400px] items-center justify-between pl-4 pr-2 sm:pl-5">
        <Link href="/" aria-label={`${SITE.name} — pagina iniziale`} className="flex items-center">
          <Logo size={30} />
        </Link>

        <nav className="hidden lg:flex" aria-label="Principale">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" aria-current={pathname.startsWith(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={SITE.phone.href} className="mono hidden px-3 text-gelo/70 transition-colors hover:text-gelo xl:block">
            {SITE.phone.label}
          </a>
          <Button href={QUOTE_HREF} variant="brass" small className="hidden sm:inline-flex">
            Preventivo
          </Button>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Apri il menu"
            aria-haspopup="dialog"
            className="grid h-[44px] w-[44px] place-items-center rounded-[3px] border border-white/12 lg:hidden"
          >
            <span className="grid gap-[6px]">
              <span className="block h-[1.5px] w-5 bg-current" />
              <span className="block h-[1.5px] w-3 bg-ottone" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
