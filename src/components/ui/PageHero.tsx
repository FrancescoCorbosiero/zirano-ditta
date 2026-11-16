import type { ReactNode } from 'react';
import Link from 'next/link';

/**
 * Testata delle pagine interne: fascia notturna con griglia, briciole,
 * numero di tavola e titolo grande. `aside` ospita ciò che sta a destra
 * (testo, bottoni, un cartiglio).
 */
export default function PageHero({
  n,
  label,
  title,
  children,
  trail = [],
  bottom,
}: {
  n: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  trail?: { name: string; href: string }[];
  bottom?: ReactNode;
}) {
  return (
    <section data-hero className="tone-dark relative overflow-hidden pt-[132px] lg:pt-[168px]">
      <div className="grid-plan" />
      <div className="wrap relative">
        <nav aria-label="Percorso" className="mono flex flex-wrap gap-x-2.5 text-[var(--fg-mute)]" data-hero-fade>
          <Link href="/" className="hover:text-[var(--fg)]">
            Home
          </Link>
          {trail.map((t) => (
            <span key={t.href} className="flex gap-2.5">
              <span aria-hidden>/</span>
              <Link href={t.href} className="hover:text-[var(--fg)]">
                {t.name}
              </Link>
            </span>
          ))}
        </nav>
        <div className="mt-10 grid gap-x-12 gap-y-8 pb-[clamp(48px,6vw,88px)] lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="tav" data-hero-fade>
              Tav. {n} <b>— {label}</b>
            </p>
            <h1 className="display mt-6 !text-[clamp(2.5rem,6.4vw,6rem)]" data-split>
              {title}
            </h1>
          </div>
          {children && (
            <div className="grid content-end gap-6 lg:col-span-4" data-hero-fade>
              {children}
            </div>
          )}
        </div>
      </div>
      {bottom}
    </section>
  );
}
