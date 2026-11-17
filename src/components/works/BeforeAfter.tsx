'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { media, type MediaKey } from '@/lib/media';

/**
 * Prima / dopo: una lama verticale da trascinare. Funziona con mouse, dito
 * (lo scroll verticale resta libero) e tastiera (frecce, Home, End).
 */
export default function BeforeAfter({ before, after }: { before: MediaKey; after: MediaKey }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="frame relative aspect-[16/10] cursor-ew-resize touch-pan-y select-none"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={media(after).src} alt={media(after).alt} fill sizes="100vw" unoptimized draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={media(before).src} alt={media(before).alt} fill sizes="100vw" unoptimized draggable={false} className="object-cover" />
      </div>

      <span className="meta absolute left-3 top-3 border border-white/15 bg-notte/55 px-3 py-1.5 text-gelo backdrop-blur-md">Prima</span>
      <span className="meta absolute right-3 top-3 bg-ottone px-3 py-1.5 text-notte">Dopo</span>

      <div className="absolute inset-y-0 w-px bg-gelo" style={{ left: `${pos}%` }}>
        <button
          type="button"
          role="slider"
          aria-label="Confronto prima e dopo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% prima`}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 10 : 4;
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - step));
            else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + step));
            else if (e.key === 'Home') setPos(0);
            else if (e.key === 'End') setPos(100);
            else return;
            e.preventDefault();
          }}
          className="glass-ink absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center"
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M6 1 1 6l5 5M16 1l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
