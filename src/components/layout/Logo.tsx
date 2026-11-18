import { SITE } from '@/lib/site';

/* =====================================================================
   LOGO SEGNAPOSTO — unico punto da sostituire quando arriva quello vero.
   Il segno: una stanza vista in pianta, con la porta che si apre e la Z
   tracciata all'interno. `LogoMark` è il solo simbolo, `Logo` aggiunge il
   nome. Con `draw` i tratti si disegnano (intro e piè di pagina).
   Per il logo definitivo: sostituire i tracciati di LogoMark (o rendere
   un <img>) mantenendo le stesse props; favicon in src/app/icon.svg.
   ===================================================================== */

export function LogoMark({ size = 36, draw = false, weight = 2, className = '' }: { size?: number; draw?: boolean; weight?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="square"
      className={`logo-mark ${draw ? 'logo-draw' : ''} ${className}`}
      aria-hidden
    >
      {/* le pareti della stanza, aperte dove sta la porta */}
      <path className="s" pathLength={1} d="M6 25V6h28v28H15" />
      {/* la Z */}
      <path className="s s2" pathLength={1} d="M15 12.5h12.5L15 26h13" strokeWidth={weight * 1.2} />
      {/* la porta: anta e arco di apertura */}
      <g className="door" stroke="var(--color-ottone)">
        <path className="s s3" pathLength={1} d="M6 34v-9" />
        <path className="s s3" pathLength={1} d="M15 34a9 9 0 0 0-9-9" strokeWidth={weight / 2} />
      </g>
    </svg>
  );
}

export default function Logo({
  size = 34,
  draw = false,
  stacked = false,
  className = '',
}: {
  size?: number;
  draw?: boolean;
  stacked?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center ${stacked ? 'flex-col gap-4 text-center' : 'gap-3'} ${className}`}>
      <LogoMark size={size} draw={draw} />
      <span className="flex flex-col leading-none">
        <span
          className="font-[620] uppercase"
          style={{ fontStretch: '125%', letterSpacing: '0.2em', fontSize: Math.max(13, size * 0.44), marginRight: '-0.2em' }}
        >
          Ziranu
        </span>
        <span className="mt-[5px] font-[540] uppercase opacity-60" style={{ fontStretch: '125%', fontSize: Math.max(8.5, size * 0.25), letterSpacing: '0.36em' }}>
          Arredi
        </span>
      </span>
      <span className="sr-only"> — {SITE.payoff}</span>
    </span>
  );
}
