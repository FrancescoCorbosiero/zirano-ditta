/* =====================================================================
   La planimetria della hero: un appartamento 12,00 × 8,00 m disegnato su
   tre lastre sovrapposte (muri e quote, arredi, etichette) che il motore
   inclina in assonometria. I tratti .s si disegnano, i [data-piece]
   arrivano dall'ingresso e vanno ciascuno nella propria stanza.
   Puramente decorativa: aria-hidden.
   ===================================================================== */

const VB = '0 0 720 520';
const layer = 'absolute inset-0 h-full w-full overflow-visible';

/** Un tratto che si disegna (pathLength=1 normalizza la lunghezza). */
const S = ({ d, c }: { d: string; c: 'wall' | 'thin' | 'brass' }) => <path d={d} pathLength={1} className={`${c} s`} />;

/** Un arredo: parte spostato verso l'ingresso (405, 500) e torna al suo posto. */
function Piece({ cx, cy, children }: { cx: number; cy: number; children: React.ReactNode }) {
  return (
    <g data-piece data-dx={Math.round((405 - cx) * 0.55)} data-dy={Math.round((520 - cy) * 0.55)}>
      {children}
    </g>
  );
}

function Label({ x, y, name, area }: { x: number; y: number; name: string; area: string }) {
  return (
    <g data-fade>
      <text x={x} y={y} textAnchor="middle">
        {name}
      </text>
      <text x={x} y={y + 14} textAnchor="middle" className="q">
        {area}
      </text>
    </g>
  );
}

export default function FloorPlan({ className = '' }: { className?: string }) {
  return (
    <div data-plan data-draw="plan" aria-hidden className={`plan plan-stage relative aspect-[720/520] ${className}`}>
      <div className="plan-tilt absolute inset-0" style={{ transform: 'rotateX(54deg) rotateZ(-34deg)' }}>
        {/* la lastra su cui poggia la pianta: sembra vetro, ma senza sfocatura
            (dentro un contesto 3D in movimento costerebbe a ogni fotogramma) */}
        <div className="plan-sheet absolute inset-[4%_3%]" style={{ transform: 'translateZ(-2px)' }} />

        {/* 1 · muri, finestre, porte, quote */}
        <svg viewBox={VB} className={layer} fill="none">
          <S c="wall" d="M140 60H60V340" />
          <S c="wall" d="M60 420V460H380" />
          <S c="wall" d="M430 460H660V60H600" />
          <S c="wall" d="M300 60H480" />
          <S c="wall" d="M400 60V300" />
          <S c="wall" d="M60 300H120" />
          <S c="wall" d="M260 300H320" />
          <S c="wall" d="M380 300H440" />
          <S c="wall" d="M490 300H660" />
          <S c="wall" d="M300 300V460" />
          <S c="wall" d="M520 300V360" />
          <S c="wall" d="M520 405V460" />
          {/* finestre */}
          <S c="thin" d="M140 55H300M140 60H300M140 65H300" />
          <S c="thin" d="M480 55H600M480 60H600M480 65H600" />
          <S c="thin" d="M55 340V420M60 340V420M65 340V420" />
          {/* porte: anta e arco di apertura */}
          <S c="brass" d="M380 460V410A50 50 0 0 1 430 460" />
          <S c="brass" d="M440 300V250A50 50 0 0 1 490 300" />
          <S c="brass" d="M520 360H565A45 45 0 0 1 520 405" />
          {/* linee di quota */}
          <S c="thin" d="M60 28H660M60 21V35M660 21V35" />
          <S c="thin" d="M28 60V460M21 60H35M21 460H35" />
          <S c="thin" d="M60 492H660M60 485V499M300 485V499M520 485V499M660 485V499" />
          <g data-fade>
            <text x="360" y="18" textAnchor="middle" className="q">
              12,00 m
            </text>
            <text x="18" y="260" textAnchor="middle" className="q" transform="rotate(-90 18 260)">
              8,00 m
            </text>
            <text x="180" y="510" textAnchor="middle">
              4,80
            </text>
            <text x="410" y="510" textAnchor="middle">
              4,40
            </text>
            <text x="590" y="510" textAnchor="middle">
              2,80
            </text>
          </g>
        </svg>

        {/* 2 · arredi */}
        <svg viewBox={VB} className={layer} style={{ transform: 'translateZ(26px)' }}>
          <Piece cx={165} cy={120}>
            <rect className="piece" x="90" y="92" width="150" height="56" rx="4" />
            <rect className="piece" x="90" y="92" width="150" height="15" rx="3" />
            <path className="thin" d="M165 107V148" />
          </Piece>
          <Piece cx={165} cy={200}>
            <rect className="thin" x="100" y="166" width="130" height="72" strokeDasharray="3 4" />
            <rect className="piece" x="135" y="187" width="60" height="30" rx="2" />
          </Piece>
          <Piece cx={330} cy={220}>
            <circle className="piece" cx="330" cy="220" r="30" />
            <rect className="piece" x="319" y="176" width="22" height="10" rx="2" />
            <rect className="piece" x="319" y="254" width="22" height="10" rx="2" />
            <rect className="piece" x="286" y="209" width="10" height="22" rx="2" />
            <rect className="piece" x="364" y="209" width="10" height="22" rx="2" />
          </Piece>
          <Piece cx={565} cy={160}>
            <rect className="piece" x="500" y="84" width="130" height="150" rx="3" />
            <rect className="piece" x="509" y="92" width="52" height="26" rx="6" />
            <rect className="piece" x="569" y="92" width="52" height="26" rx="6" />
            <path className="thin" d="M500 150H630" />
            <rect className="piece" x="470" y="86" width="22" height="22" />
            <rect className="piece" x="636" y="86" width="16" height="22" />
          </Piece>
          <Piece cx={426} cy={160}>
            <rect className="piece" x="410" y="124" width="30" height="150" />
            <path className="thin" d="M410 174H440M410 224H440" />
          </Piece>
          <Piece cx={170} cy={400}>
            <path className="piece" d="M68 308H104V420H290V452H68Z" />
            <circle className="thin" cx="150" cy="436" r="6" />
            <circle className="thin" cx="172" cy="436" r="6" />
            <rect className="thin" x="214" y="427" width="44" height="18" rx="3" />
            <rect className="thin" x="74" y="330" width="24" height="36" />
          </Piece>
          <Piece cx={620} cy={370}>
            <rect className="piece" x="596" y="310" width="56" height="112" rx="12" />
            <rect className="thin" x="604" y="318" width="40" height="96" rx="9" />
            <circle className="piece" cx="545" cy="326" r="11" />
            <rect className="piece" x="528" y="428" width="24" height="26" rx="8" />
          </Piece>
          {/* gli scatoloni in ingresso: l'ottone del trasloco */}
          <Piece cx={345} cy={350}>
            <rect className="piece-b" x="316" y="318" width="30" height="30" />
            <path className="brass" d="M316 318 346 348M346 318 316 348" />
          </Piece>
          <Piece cx={365} cy={365}>
            <rect className="piece-b" x="350" y="340" width="24" height="24" />
            <path className="brass" d="M350 352H374" />
          </Piece>
          <Piece cx={335} cy={375}>
            <rect className="piece-b" x="320" y="354" width="26" height="26" />
            <path className="brass" d="M333 354V380" />
          </Piece>
        </svg>

        {/* 3 · etichette delle stanze */}
        <svg viewBox={VB} className={layer} style={{ transform: 'translateZ(52px)' }}>
          <Label x={320} y={104} name="Soggiorno" area="32,6 m²" />
          <Label x={560} y={262} name="Camera" area="25,0 m²" />
          <Label x={200} y={366} name="Cucina" area="15,4 m²" />
          <Label x={456} y={352} name="Ingresso" area="14,1 m²" />
          <Label x={585} y={446} name="Bagno" area="9,0 m²" />
        </svg>
      </div>
    </div>
  );
}
