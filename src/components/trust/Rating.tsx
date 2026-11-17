import { RATING } from '@/lib/clients';

const fmt = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Cinque stelle disegnate (Archivo non ha il glifo): la quota piena è d'ottone. */
function Stars({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(1, score / 5)) * 100;
  const row = (fill: string) => (
    <svg viewBox="0 0 90 16" width="90" height="16" aria-hidden className="block">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} transform={`translate(${i * 18.5} 0)`} fill={fill} d="M8 .8l2.1 4.6 5 .5-3.8 3.4 1.1 4.9L8 11.7l-4.4 2.5 1.1-4.9L.9 5.9l5-.5z" />
      ))}
    </svg>
  );
  return (
    <span className="relative inline-block">
      {row('var(--line-strong)')}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
        {row('var(--color-ottone)')}
      </span>
    </span>
  );
}

/** La valutazione pubblica, con il link alla fonte. */
export default function Rating({ className = '' }: { className?: string }) {
  return (
    <a
      href={RATING.href}
      target="_blank"
      rel="noopener"
      className={`group inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 ${className}`}
      aria-label={`Valutazione media ${fmt.format(RATING.score)} su 5, ${RATING.count} recensioni su ${RATING.source}`}
    >
      <Stars score={RATING.score} />
      <span className="num text-[16px] font-[640]">{fmt.format(RATING.score)}</span>
      <span className="text-[15px] text-[var(--fg-mute)] transition-colors group-hover:text-[var(--fg)]">
        {RATING.count} recensioni su {RATING.source} →
      </span>
    </a>
  );
}
