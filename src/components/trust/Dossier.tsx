'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { Arrow } from '@/components/ui/Button';
import { TESTIMONIALS, clientById } from '@/lib/clients';
import ClientMark from './ClientMark';

/**
 * Il dossier delle testimonianze: una citazione alla volta, grande e al
 * centro, con chi la firma e il lavoro in numeri. Sotto, l'indice dei
 * clienti fa da schede (frecce, Home e Fine da tastiera). I pannelli
 * stanno tutti nella stessa cella: cambiando non salta l'impaginazione.
 * Senza JavaScript il CSS li mostra tutti, uno sotto l'altro.
 */
export default function Dossier({ className = '' }: { className?: string }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = TESTIMONIALS.length;

  const select = (i: number, focus = false) => {
    const next = (i + n) % n;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    select(moves[e.key]!, true);
  };

  return (
    <div className={className}>
      <div className="dossier-panels">
        {TESTIMONIALS.map((t, i) => {
          const client = t.client ? clientById(t.client) : undefined;
          const on = i === active;
          return (
            <figure
              key={t.author}
              id={`${uid}-p${i}`}
              role="tabpanel"
              aria-labelledby={`${uid}-t${i}`}
              aria-hidden={!on}
              {...(on ? {} : { inert: true })}
              className="dossier-panel flex flex-col items-center text-center"
            >
              <span className="text-[clamp(1rem,1.4vw,1.25rem)] text-[var(--fg-mute)]" aria-hidden>
                {client ? <ClientMark client={client} /> : <span className="font-[560]">{t.role}</span>}
              </span>
              <blockquote className="mt-8 w-full">
                <p className="dossier-quote">{t.quote}</p>
              </blockquote>
              <figcaption className="mt-9 grid justify-items-center gap-1">
                <span className="text-[16px] font-[600]">{t.author}</span>
                <span className="text-[15px] text-[var(--fg-mute)]">
                  {t.role}
                  {client ? `, ${client.name}` : ''}
                </span>
                {/* il lavoro in numeri: in colonna sul telefono, in riga dal tablet in su */}
                <span className="meta mt-6 flex flex-col items-center gap-1 text-[var(--fg-soft)] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3">
                  {t.facts.map((f, k) => (
                    <span key={f} className="flex items-center gap-3">
                      {k > 0 && <span className="hidden h-[5px] w-[5px] bg-ottone sm:block" aria-hidden />}
                      {f}
                    </span>
                  ))}
                </span>
                {t.work && (
                  <Link href={`/lavori/${t.work}`} className="link-u mt-5 text-[15px]" tabIndex={on ? 0 : -1}>
                    Il lavoro raccontato <Arrow />
                  </Link>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div role="tablist" aria-label="Testimonianze" className="dossier-tabs mt-[clamp(48px,6vw,80px)]">
        {TESTIMONIALS.map((t, i) => {
          const client = t.client ? clientById(t.client) : undefined;
          const on = i === active;
          return (
            <button
              key={t.author}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-t${i}`}
              aria-selected={on}
              aria-controls={`${uid}-p${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onKey}
              className="dossier-tab"
            >
              <span className="meta text-[var(--fg-mute)]">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[15.5px] font-[600] leading-tight">{client?.name ?? t.author}</span>
              <span className="text-[13.5px] leading-snug text-[var(--fg-mute)]">{client?.sector ?? t.role}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
