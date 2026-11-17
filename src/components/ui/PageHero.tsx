import type { ReactNode } from 'react';
import Link from 'next/link';
import Dim from './Dim';

/**
 * Testata delle pagine interne: fascia notturna con griglia. Il percorso
 * in alto a sinistra, il titolo grande allineato a destra, il testo e i
 * bottoni in basso a sinistra: una diagonale, non la solita colonna.
 * Una linea di quota lega il testo al bordo destro.
 */
export default function PageHero({
  title,
  children,
  trail = [],
  bottom,
}: {
  title: ReactNode;
  children?: ReactNode;
  trail?: { name: string; href: string }[];
  bottom?: ReactNode;
}) {
  return (
    <section data-hero className="tone-dark relative overflow-hidden pt-[124px] lg:pt-[150px]">
      <div className="grid-plan" />
      <div className="wrap relative">
        <nav aria-label="Percorso" className="meta flex flex-wrap gap-x-2 text-[var(--fg-mute)]" data-hero-fade>
          <Link href="/" className="hover:text-[var(--fg)]">
            Home
          </Link>
          {trail.map((t, i) => (
            <span key={t.href} className="flex gap-2">
              <span aria-hidden>/</span>
              <Link href={t.href} className={`hover:text-[var(--fg)] ${i === trail.length - 1 ? 'text-[var(--fg)]' : ''}`} aria-current={i === trail.length - 1 ? 'page' : undefined}>
                {t.name}
              </Link>
            </span>
          ))}
        </nav>
        <div className="grid gap-y-9 pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,96px)] lg:grid-cols-12">
          <h1 className="display text-right !text-[clamp(2.5rem,6.6vw,6.4rem)] lg:col-span-11 lg:col-start-2" data-split>
            {title}
          </h1>
          {children && (
            <div className="grid content-start gap-6 lg:col-span-12 lg:grid-cols-12 lg:items-end">
              <div className="grid content-start gap-6 lg:col-span-5" data-hero-fade>
                {children}
              </div>
              <Dim className="hidden lg:col-span-6 lg:col-start-7 lg:mb-3 lg:block" from="end" />
            </div>
          )}
        </div>
      </div>
      {bottom}
    </section>
  );
}
