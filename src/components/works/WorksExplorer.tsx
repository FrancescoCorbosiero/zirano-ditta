'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/lib/media';
import { SERVICES } from '@/lib/services';
import { WORKS, pad } from '@/lib/works';

/**
 * L'archivio dei lavori: i filtri riordinano la griglia con una transizione
 * FLIP (le schede scivolano al nuovo posto, quelle escluse si ritirano).
 * Senza JavaScript la griglia è completa e i filtri non servono.
 */
export default function WorksExplorer() {
  const [filter, setFilter] = useState('tutti');
  const grid = useRef<HTMLUListElement>(null);
  const filters = [{ slug: 'tutti', title: 'Tutti' }, ...SERVICES.filter((s) => WORKS.some((w) => w.service === s.slug))];
  const count = (slug: string) => (slug === 'tutti' ? WORKS.length : WORKS.filter((w) => w.service === slug).length);

  const choose = async (slug: string) => {
    if (slug === filter) return;
    const root = grid.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setFilter(slug);
    const [{ default: gsap }, { Flip }, { flushSync }] = await Promise.all([import('gsap'), import('gsap/Flip'), import('react-dom')]);
    gsap.registerPlugin(Flip);
    const items = Array.from(root.children);
    const state = Flip.getState(items);
    flushSync(() => setFilter(slug));
    Flip.from(state, {
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.035,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'expo.out' }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.35 }),
      onComplete: () => void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh()),
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtra per servizio">
        {filters.map((f) => (
          <button key={f.slug} type="button" className="chip" aria-pressed={filter === f.slug} onClick={() => void choose(f.slug)}>
            {f.title}
            <sup>{pad(count(f.slug))}</sup>
          </button>
        ))}
      </div>

      <ul ref={grid} className="mt-[clamp(40px,5vw,72px)] grid gap-x-[clamp(20px,3vw,48px)] gap-y-[clamp(48px,6vw,96px)] md:grid-cols-2">
        {WORKS.map((w, i) => {
          const shown = filter === 'tutti' || w.service === filter;
          const m = media(w.cover);
          return (
            <li key={w.slug} className={`${shown ? '' : 'hidden'} ${filter === 'tutti' && i % 2 === 1 ? 'md:mt-[clamp(48px,9vw,144px)]' : ''}`}>
              <Link href={`/lavori/${w.slug}`} data-cursor="Apri" className="group block">
                <div data-tilt className="relative">
                  <div className="frame" style={{ aspectRatio: filter === 'tutti' && i % 3 === 0 ? '4 / 4.6' : '16 / 11' }}>
                    <Image src={m.src} alt={m.alt} fill sizes="(min-width: 768px) 50vw, 100vw" unoptimized priority={i < 2} className="zoom" />
                    <span className="glare" />
                    <span className="tag-glass">
                      <span className="mono">{w.tags[0]}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4">
                  <span className="mono text-[var(--accent)]">{pad(i + 1)}</span>
                  <h2 className="h3">{w.title}</h2>
                  <span className="mono text-[var(--fg-mute)]">
                    {w.place} · {w.year}
                  </span>
                  <p className="col-span-2 col-start-2 mt-2 max-w-[48ch] text-[15px] text-[var(--fg-soft)]">{w.summary}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
