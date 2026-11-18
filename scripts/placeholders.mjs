/* =====================================================================
   Immagini segnaposto — "tavole" d'interni disegnate in SVG.
   Finché non arrivano le foto vere dei lavori, ogni immagine del sito è
   un prospetto illustrato generato da questo script (`npm run placeholders`).
   Per sostituirle: metti una foto con lo stesso nome (anche .jpg/.webp) in
   public/media e aggiorna l'estensione in src/lib/media.ts.
   ===================================================================== */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'media');
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;
const FLOOR = 740; // linea del pavimento

const BRASS = '#b58a52';
const KRAFT = '#c29a63';
const KRAFT_D = '#9c7745';
const INK = '#15181b';

let uid = 0;
const id = (p) => `${p}${++uid}`;

/* ── Primitive ─────────────────────────────────────────────────────── */
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const line = (x1, y1, x2, y2, stroke, sw = 2, extra = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
const shadow = (cx, w, o = 0.28, y = FLOOR + 6) =>
  `<ellipse cx="${cx}" cy="${y}" rx="${w / 2}" ry="${Math.max(8, w / 22)}" fill="#000" opacity="${o}" filter="url(#soft)"/>`;

/** Stanza: parete sfumata, pavimento, battiscopa, doghe in prospettiva. */
function room({ wall, wall2, floor, floor2, skirting = '#ffffff', boards = true, dark = false }) {
  const gw = id('gw');
  const gf = id('gf');
  let s = `<defs>
    <linearGradient id="${gw}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${wall}"/><stop offset="1" stop-color="${wall2}"/></linearGradient>
    <linearGradient id="${gf}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${floor}"/><stop offset="1" stop-color="${floor2}"/></linearGradient>
    <filter id="soft" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
    <radialGradient id="vig" cx="50%" cy="42%" r="75%"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${dark ? 0.5 : 0.22}"/></radialGradient>
  </defs>`;
  s += rect(0, 0, W, FLOOR, `url(#${gw})`);
  s += rect(0, FLOOR, W, H - FLOOR, `url(#${gf})`);
  if (boards) {
    for (let i = -6; i <= 22; i++) {
      const x0 = 800 + (i - 8) * 105;
      const x1 = 800 + (i - 8) * 330;
      s += line(x0, FLOOR, x1, H, '#000', 1.5, 'opacity="0.09"');
    }
  }
  s += rect(0, FLOOR - 14, W, 14, skirting, `opacity="${dark ? 0.12 : 0.7}"`);
  s += rect(0, FLOOR, W, 5, '#000', 'opacity="0.18"');
  return s;
}

const vignette = () => rect(0, 0, W, H, 'url(#vig)');

/** Finestra con cielo, montanti e lama di luce sul pavimento. */
function windowEl(x, y, w, h, { beam = true, night = false } = {}) {
  const g = id('sky');
  const b = id('beam');
  let s = `<defs>
    <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${night ? '#22303a' : '#dfe9ee'}"/><stop offset="1" stop-color="${night ? '#3d4d57' : '#f6f1e6'}"/></linearGradient>
    <linearGradient id="${b}" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.34"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>`;
  s += rect(x - 12, y - 12, w + 24, h + 24, '#f4f2ec');
  s += rect(x, y, w, h, `url(#${g})`);
  s += rect(x + w / 2 - 4, y, 8, h, '#f4f2ec');
  s += rect(x, y + h * 0.42, w, 6, '#f4f2ec');
  s += rect(x - 22, y + h + 12, w + 44, 12, '#f4f2ec');
  s += rect(x - 22, y + h + 24, w + 44, 5, '#000', 'opacity="0.12"');
  if (beam) {
    s += `<polygon points="${x},${y + h} ${x + w},${y + h} ${x + w + 520},${H} ${x + 230},${H}" fill="url(#${b})"/>`;
  }
  return s;
}

function frame(x, y, w, h, tone = '#2a3035', art = BRASS) {
  return (
    rect(x + 6, y + 8, w, h, '#000', 'opacity="0.16" filter="url(#soft)"') +
    rect(x, y, w, h, tone) +
    rect(x + 10, y + 10, w - 20, h - 20, '#efede7') +
    `<circle cx="${x + w * 0.42}" cy="${y + h * 0.55}" r="${Math.min(w, h) * 0.2}" fill="${art}" opacity="0.85"/>` +
    rect(x + w * 0.3, y + h * 0.6, w * 0.45, 3, INK, 'opacity="0.6"')
  );
}

function sofa(x, w, color, cushion) {
  const y = FLOOR - 150;
  let s = shadow(x + w / 2, w * 1.05);
  s += rect(x + 22, FLOOR - 26, 12, 26, '#3a2c1e') + rect(x + w - 34, FLOOR - 26, 12, 26, '#3a2c1e');
  s += rect(x, y - 70, w, 130, color, 'rx="26"');
  s += rect(x - 26, y - 14, 60, 140, color, 'rx="24"') + rect(x + w - 34, y - 14, 60, 140, color, 'rx="24"');
  s += rect(x + 30, y + 44, w - 60, 84, cushion, 'rx="16"');
  s += line(x + w / 2, y + 48, x + w / 2, y + 124, '#000', 2, 'opacity="0.25"');
  s += rect(x + 30, y + 44, w - 60, 10, '#fff', 'rx="5" opacity="0.08"');
  s += rect(x + w * 0.16, y - 12, 96, 70, KRAFT, 'rx="14" transform="rotate(-6 ' + (x + w * 0.2) + ' ' + y + ')"');
  return s;
}

function lamp(x, tone = INK) {
  let s = shadow(x, 110, 0.2);
  s += rect(x - 34, FLOOR - 8, 68, 8, tone, 'rx="4"');
  s += rect(x - 3, FLOOR - 400, 6, 394, tone);
  s += `<path d="M${x - 62} ${FLOOR - 400} L${x + 62} ${FLOOR - 400} L${x + 40} ${FLOOR - 492} L${x - 40} ${FLOOR - 492} Z" fill="#efe6d2"/>`;
  s += `<ellipse cx="${x}" cy="${FLOOR - 360}" rx="170" ry="120" fill="#ffd9a0" opacity="0.2" filter="url(#glow)"/>`;
  return s;
}

function plant(x, pot = '#e9e6df', leaf = '#4d5f52') {
  let s = shadow(x, 130, 0.22);
  s += `<path d="M${x - 48} ${FLOOR - 110} L${x + 48} ${FLOOR - 110} L${x + 36} ${FLOOR} L${x - 36} ${FLOOR} Z" fill="${pot}"/>`;
  const leaves = [
    [-70, -230, -24],
    [60, -250, 20],
    [-20, -310, -6],
    [30, -200, 34],
    [-90, -170, -44],
    [84, -160, 48],
  ];
  for (const [dx, dy, r] of leaves) {
    s += `<ellipse cx="${x + dx / 2}" cy="${FLOOR - 110 + dy / 2}" rx="26" ry="${Math.abs(dy) / 2}" fill="${leaf}" opacity="0.92" transform="rotate(${r} ${x} ${FLOOR - 110})"/>`;
  }
  return s;
}

/** Scatolone: nastro, maniglia, etichetta. */
function box(x, y, w, h, tone = KRAFT, dark = KRAFT_D) {
  let s = rect(x, y, w, h, tone);
  s += rect(x, y, w, h * 0.16, dark, 'opacity="0.35"');
  s += rect(x + w / 2 - w * 0.07, y, w * 0.14, h, '#e7d3ab', 'opacity="0.55"');
  s += rect(x + w * 0.12, y + h * 0.56, w * 0.26, h * 0.2, '#f1eee6', 'opacity="0.9"');
  s += rect(x + w * 0.16, y + h * 0.62, w * 0.16, 3, INK, 'opacity="0.55"');
  s += rect(x + w * 0.7, y + h * 0.3, w * 0.16, h * 0.07, '#000', 'rx="4" opacity="0.3"');
  s += rect(x + w - 6, y, 6, h, '#000', 'opacity="0.12"');
  return s;
}

function boxes(x, layout, scale = 1) {
  // layout: righe dal basso, ogni riga un elenco di [larghezza, altezza]
  let s = '';
  let y = FLOOR;
  let maxW = 0;
  layout.forEach((row, r) => {
    let cx = x + r * 18 * scale;
    let rowH = 0;
    row.forEach(([w, h]) => {
      s += box(cx, y - h * scale, w * scale, h * scale);
      cx += w * scale + 6;
      rowH = Math.max(rowH, h * scale);
    });
    maxW = Math.max(maxW, cx - x);
    y -= rowH + 3;
  });
  return shadow(x + maxW / 2, maxW * 1.1, 0.3) + s;
}

function wardrobe(x, w, h, body, { doors = 4, handles = BRASS, open = false } = {}) {
  const y = FLOOR - h;
  let s = shadow(x + w / 2, w * 1.05, 0.26);
  s += rect(x, y, w, h, body);
  s += rect(x, y, w, 10, '#000', 'opacity="0.1"');
  const dw = w / doors;
  for (let i = 0; i < doors; i++) {
    const dx = x + i * dw;
    if (open && i === doors - 1) {
      s += rect(dx + 6, y + 16, dw - 12, h - 28, '#1b2024');
      for (let k = 1; k <= 3; k++) s += rect(dx + 6, y + 16 + (k * (h - 28)) / 4, dw - 12, 6, body, 'opacity="0.8"');
      continue;
    }
    s += rect(dx + 5, y + 16, dw - 10, h - 28, '#fff', 'opacity="0.1"');
    s += line(dx, y + 10, dx, FLOOR, '#000', 2, 'opacity="0.2"');
    s += rect(dx + (i % 2 ? 14 : dw - 20), y + h * 0.46, 6, 90, handles, 'rx="3"');
  }
  s += rect(x, FLOOR - 16, w, 16, '#000', 'opacity="0.25"');
  return s;
}

function bed(x, w, frameC, linen, blanket) {
  let s = shadow(x + w / 2, w * 1.08, 0.26);
  s += rect(x - 14, FLOOR - 330, w + 28, 330, frameC, 'rx="14"');
  s += rect(x, FLOOR - 170, w, 150, linen, 'rx="18"');
  s += rect(x + 30, FLOOR - 236, w * 0.4, 86, '#fbfaf7', 'rx="22"');
  s += rect(x + w * 0.52, FLOOR - 236, w * 0.4, 86, '#fbfaf7', 'rx="22"');
  s += rect(x, FLOOR - 120, w, 100, blanket, 'rx="14"');
  s += rect(x, FLOOR - 120, w, 12, '#fff', 'opacity="0.12" rx="6"');
  s += rect(x - 14, FLOOR - 26, w + 28, 26, frameC);
  return s;
}

function sideTable(x, tone = '#3a2c1e') {
  return (
    shadow(x + 55, 130, 0.2) +
    rect(x, FLOOR - 150, 110, 12, tone, 'rx="3"') +
    rect(x + 10, FLOOR - 138, 6, 138, tone) +
    rect(x + 94, FLOOR - 138, 6, 138, tone) +
    rect(x + 30, FLOOR - 196, 50, 46, '#efe6d2', 'rx="8"')
  );
}

/** Cucina in linea: basi, pensili, piano, cappa, forno. */
function kitchen(x, w, base, upper, top) {
  const mod = w / 6;
  let s = shadow(x + w / 2, w * 1.02, 0.22);
  // pensili
  for (let i = 0; i < 6; i++) {
    if (i === 3) continue;
    s += rect(x + i * mod + 3, 170, mod - 6, 230, upper);
    s += rect(x + i * mod + 3, 170, mod - 6, 8, '#fff', 'opacity="0.18"');
    s += rect(x + i * mod + mod / 2 - 22, 384, 44, 5, BRASS, 'rx="2"');
  }
  // cappa
  s += `<path d="M${x + 3 * mod + 26} 170 L${x + 4 * mod - 26} 170 L${x + 4 * mod - 26} 330 L${x + 4 * mod + 4} 400 L${x + 3 * mod - 4} 400 L${x + 3 * mod + 26} 330 Z" fill="#2a3035"/>`;
  // paraschizzi
  s += rect(x, 400, w, FLOOR - 330 - 400 + 20, '#fff', 'opacity="0.16"');
  // piano
  s += rect(x - 10, FLOOR - 330, w + 20, 22, top);
  // basi
  for (let i = 0; i < 6; i++) {
    const bx = x + i * mod;
    s += rect(bx + 3, FLOOR - 304, mod - 6, 280, base);
    if (i === 3) {
      s += rect(bx + 16, FLOOR - 286, mod - 32, 150, '#0d1013', 'rx="6"');
      s += rect(bx + 22, FLOOR - 280, mod - 44, 60, '#fff', 'opacity="0.07" rx="4"');
      s += rect(bx + 22, FLOOR - 300, mod - 44, 5, '#c9ccd0', 'rx="2"');
    } else if (i === 1) {
      for (let k = 0; k < 3; k++) s += rect(bx + mod / 2 - 26, FLOOR - 286 + k * 92, 52, 5, BRASS, 'rx="2"') + line(bx + 3, FLOOR - 304 + (k + 1) * 92, bx + mod - 3, FLOOR - 304 + (k + 1) * 92, '#000', 2, 'opacity="0.3"');
    } else {
      s += rect(bx + mod / 2 - 22, FLOOR - 290, 44, 5, BRASS, 'rx="2"');
    }
  }
  s += rect(x, FLOOR - 24, w, 24, '#000', 'opacity="0.55"');
  // rubinetto e oggetti sul piano
  s += `<path d="M${x + 4.5 * mod} ${FLOOR - 330} v-70 q0 -24 24 -24 h20" fill="none" stroke="#c9ccd0" stroke-width="7" stroke-linecap="round"/>`;
  s += rect(x + 0.4 * mod, FLOOR - 392, 30, 62, '#efe6d2', 'rx="6"') + rect(x + 0.4 * mod + 40, FLOOR - 372, 24, 42, KRAFT, 'rx="6"');
  return s;
}

function pendant(x, len, tone = INK) {
  return (
    line(x, 0, x, len, tone, 3) +
    `<path d="M${x - 46} ${len + 50} Q${x} ${len - 30} ${x + 46} ${len + 50} Z" fill="${tone}"/>` +
    `<ellipse cx="${x}" cy="${len + 120}" rx="150" ry="110" fill="#ffd9a0" opacity="0.2" filter="url(#glow)"/>`
  );
}

function island(x, w, body, top) {
  let s = shadow(x + w / 2, w * 1.05, 0.26);
  s += rect(x, FLOOR - 250, w, 250, body);
  s += rect(x - 16, FLOOR - 270, w + 32, 22, top);
  for (let i = 1; i < 4; i++) s += line(x + (i * w) / 4, FLOOR - 248, x + (i * w) / 4, FLOOR, '#000', 2, 'opacity="0.25"');
  return s;
}

function stool(x) {
  return (
    shadow(x, 70, 0.2) +
    rect(x - 34, FLOOR - 200, 68, 16, KRAFT, 'rx="8"') +
    line(x - 26, FLOOR - 184, x - 34, FLOOR, INK, 5) +
    line(x + 26, FLOOR - 184, x + 34, FLOOR, INK, 5) +
    line(x - 30, FLOOR - 70, x + 30, FLOOR - 70, INK, 4)
  );
}

/** Scaffale da magazzino con scatole e casse. */
function rack(x, w, levels = 4, fill = 0.9) {
  const h = 560;
  let s = shadow(x + w / 2, w * 1.02, 0.4);
  const top = FLOOR - h;
  const gap = h / levels;
  for (let l = 0; l < levels; l++) {
    const y = FLOOR - l * gap;
    let cx = x + 18;
    let n = 0;
    while (cx < x + w - 70) {
      const bw = 70 + ((l * 37 + n * 53) % 60);
      const bh = Math.min(gap - 34, 60 + ((l * 71 + n * 29) % 62));
      if (((l * 3 + n * 7) % 10) / 10 < fill && cx + bw < x + w - 12) {
        s += box(cx, y - bh - (l === 0 ? 0 : 10), bw, bh, n % 3 === 2 ? '#a9825a' : KRAFT);
      }
      cx += bw + 8;
      n++;
    }
    if (l > 0) s += rect(x, y - 10, w, 10, '#59616a') + rect(x, y - 10, w, 3, '#fff', 'opacity="0.15"');
  }
  s += rect(x, top, 12, h, '#4b535b') + rect(x + w - 12, top, 12, h, '#4b535b') + rect(x, top, w, 10, '#59616a');
  for (let k = 0; k < 9; k++) s += rect(x + 3, top + 20 + k * 62, 6, 22, '#0d1013', 'opacity="0.5"') + rect(x + w - 9, top + 20 + k * 62, 6, 22, '#0d1013', 'opacity="0.5"');
  return s;
}

function desk(x, w, top = '#c8b08a') {
  let s = shadow(x + w / 2, w * 1.05, 0.2);
  s += rect(x, FLOOR - 220, w, 16, top, 'rx="3"');
  s += rect(x + 16, FLOOR - 204, 8, 204, INK) + rect(x + w - 24, FLOOR - 204, 8, 204, INK);
  s += rect(x + w - 150, FLOOR - 204, 120, 130, '#e9e6df');
  s += rect(x + w - 110, FLOOR - 170, 40, 5, BRASS, 'rx="2"') + rect(x + w - 110, FLOOR - 110, 40, 5, BRASS, 'rx="2"');
  // monitor
  s += rect(x + 70, FLOOR - 380, 210, 124, '#111417', 'rx="6"') + rect(x + 78, FLOOR - 372, 194, 108, '#2b3a44', 'rx="3"');
  s += rect(x + 168, FLOOR - 256, 14, 30, '#111417') + rect(x + 140, FLOOR - 228, 70, 8, '#111417', 'rx="4"');
  return s;
}

function chair(x, tone = '#2a3035') {
  return (
    shadow(x, 110, 0.2) +
    rect(x - 46, FLOOR - 330, 92, 150, tone, 'rx="20"') +
    rect(x - 52, FLOOR - 176, 104, 30, tone, 'rx="12"') +
    rect(x - 4, FLOOR - 146, 8, 100, '#8d949b') +
    `<path d="M${x - 56} ${FLOOR - 12} L${x} ${FLOOR - 50} L${x + 56} ${FLOOR - 12}" fill="none" stroke="#8d949b" stroke-width="8" stroke-linecap="round"/>`
  );
}

function shelfWall(x, y, w, tone, items = true) {
  let s = rect(x, y, w, 12, tone) + rect(x, y + 12, w, 6, '#000', 'opacity="0.2"');
  if (items) {
    s += rect(x + 30, y - 84, 20, 84, '#efe6d2') + rect(x + 54, y - 70, 16, 70, BRASS) + rect(x + 74, y - 92, 22, 92, '#59616a');
    s += rect(x + w - 130, y - 50, 80, 50, '#e9e6df', 'rx="24"');
  }
  return s;
}

function tv(x, y, w, h) {
  return (
    rect(x - 6, y - 6, w + 12, h + 12, '#000', 'opacity="0.35" filter="url(#soft)"') +
    rect(x, y, w, h, '#0a0c0e', 'rx="8"') +
    `<polygon points="${x + 10},${y + 10} ${x + w * 0.5},${y + 10} ${x + w * 0.2},${y + h - 10} ${x + 10},${y + h - 10}" fill="#fff" opacity="0.05"/>`
  );
}

function console_(x, w, tone) {
  let s = shadow(x + w / 2, w * 1.03, 0.3);
  s += rect(x, FLOOR - 150, w, 110, tone, 'rx="4"');
  for (let i = 1; i < 4; i++) s += line(x + (i * w) / 4, FLOOR - 150, x + (i * w) / 4, FLOOR - 40, '#000', 2, 'opacity="0.35"');
  s += rect(x + 30, FLOOR - 40, 8, 40, BRASS) + rect(x + w - 38, FLOOR - 40, 8, 40, BRASS);
  return s;
}

function trackLights(x, w, n = 4) {
  let s = rect(x, 70, w, 8, '#0a0c0e');
  for (let i = 0; i < n; i++) {
    const cx = x + 60 + (i * (w - 120)) / (n - 1);
    s += rect(cx - 12, 78, 24, 44, '#0a0c0e', 'rx="6"');
    s += `<polygon points="${cx - 12},122 ${cx + 12},122 ${cx + 150},${FLOOR} ${cx - 150},${FLOOR}" fill="#ffd9a0" opacity="0.07"/>`;
  }
  return s;
}

function ladder(x) {
  let s = shadow(x + 60, 200, 0.2);
  s += line(x, FLOOR, x + 60, FLOOR - 420, '#c9ccd0', 9, 'stroke-linecap="round"');
  s += line(x + 150, FLOOR, x + 70, FLOOR - 420, '#aab0b6', 9, 'stroke-linecap="round"');
  for (let k = 1; k < 6; k++) s += line(x + k * 9, FLOOR - k * 66, x + 60 + k * 2, FLOOR - k * 66, '#c9ccd0', 7, 'transform="translate(10 0)"');
  return s;
}

/** Mobile imballato: coperta da trasloco e nastro. */
function wrapped(x, w, h) {
  let s = shadow(x + w / 2, w * 1.1, 0.25);
  s += rect(x, FLOOR - h, w, h, '#7c8790', 'rx="18"');
  for (let k = 1; k < 5; k++) s += line(x + 8, FLOOR - (k * h) / 5, x + w - 8, FLOOR - (k * h) / 5 + 10, '#fff', 2, 'opacity="0.18" stroke-dasharray="14 10"');
  s += rect(x, FLOOR - h * 0.62, w, 14, KRAFT, 'opacity="0.9"') + rect(x + w * 0.3, FLOOR - h, 14, h, KRAFT, 'opacity="0.9"');
  return s;
}

function van(x) {
  const y = FLOOR;
  let s = shadow(x + 420, 900, 0.35);
  s += `<path d="M${x} ${y - 60} V${y - 420} Q${x} ${y - 440} ${x + 20} ${y - 440} H${x + 560} V${y - 60} Z" fill="#f3f2ee"/>`;
  s += `<path d="M${x + 560} ${y - 60} V${y - 360} H${x + 700} Q${x + 730} ${y - 360} ${x + 748} ${y - 330} L${x + 820} ${y - 200} Q${x + 840} ${y - 190} ${x + 840} ${y - 160} V${y - 60} Z" fill="#e9e6df"/>`;
  s += `<path d="M${x + 590} ${y - 330} H${x + 694} Q${x + 712} ${y - 330} ${x + 722} ${y - 312} L${x + 782} ${y - 204} H${x + 590} Z" fill="#2b3a44"/>`;
  s += rect(x, y - 140, 840, 12, INK) + rect(x + 40, y - 330, 180, 8, BRASS);
  s += `<text x="${x + 40}" y="${y - 250}" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" letter-spacing="10" fill="${INK}">ZIRANU</text>`;
  s += `<text x="${x + 42}" y="${y - 208}" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="9" fill="${INK}" opacity="0.6">ARREDI · TRASLOCHI</text>`;
  s += line(x + 560, y - 430, x + 560, y - 70, '#000', 2, 'opacity="0.2"');
  for (const cx of [x + 170, x + 690]) {
    s += `<circle cx="${cx}" cy="${y - 62}" r="64" fill="#0d1013"/><circle cx="${cx}" cy="${y - 62}" r="30" fill="#59616a"/><circle cx="${cx}" cy="${y - 62}" r="10" fill="#0d1013"/>`;
  }
  s += rect(x + 800, y - 190, 40, 22, '#ffd9a0', 'rx="6"');
  return s;
}

function facade() {
  let s = '';
  for (let i = 0; i < 4; i++) {
    const x = 120 + i * 380;
    s += rect(x - 12, 90, 204, 284, '#f4f2ec') + rect(x, 102, 180, 260, '#2b3a44') + rect(x + 86, 102, 8, 260, '#f4f2ec') + rect(x, 220, 180, 6, '#f4f2ec');
    s += `<polygon points="${x},102 ${x + 80},102 ${x + 20},362 ${x},362" fill="#fff" opacity="0.06"/>`;
    s += rect(x - 26, 374, 232, 14, '#f4f2ec');
  }
  // portone
  s += rect(1180, 420, 250, FLOOR - 420, '#20262b') + rect(1196, 436, 104, FLOOR - 436, '#2c343a') + rect(1310, 436, 104, FLOOR - 436, '#2c343a');
  s += rect(1290, 580, 8, 70, BRASS, 'rx="4"') + rect(1312, 580, 8, 70, BRASS, 'rx="4"');
  s += `<path d="M1160 420 H1450 V400 H1160 Z" fill="#f4f2ec"/>`;
  s += rect(1470, 520, 54, 70, BRASS, 'opacity="0.9"') + `<text x="1497" y="566" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="${INK}">12</text>`;
  return s;
}

/* ── Scene ─────────────────────────────────────────────────────────── */
const LIGHT = { wall: '#dedbd3', wall2: '#c6c2b8', floor: '#a88c69', floor2: '#7d6549' };
const STONE = { wall: '#e6e4de', wall2: '#cfccc4', floor: '#b9b4a8', floor2: '#8f8a7e', boards: false };
const WARM = { wall: '#d3cabb', wall2: '#b9ae9c', floor: '#9a7d5c', floor2: '#6f573e' };
const COOL = { wall: '#dcdfe0', wall2: '#c2c7c9', floor: '#8f949a', floor2: '#666b70', boards: false };
const NIGHT = { wall: '#1f2a30', wall2: '#131a1e', floor: '#3b3229', floor2: '#1d1813', dark: true };
const DEPOT = { wall: '#262c31', wall2: '#14181b', floor: '#4a4f54', floor2: '#25282b', boards: false, dark: true };

const scenes = {
  'soggiorno-dopo': () =>
    room(LIGHT) +
    windowEl(1010, 150, 380, 430) +
    frame(170, 190, 220, 280) +
    frame(420, 250, 150, 190, '#b58a52', '#2e3a3f') +
    lamp(770) +
    sofa(170, 520, '#2e3a3f', '#37464c') +
    plant(1470) +
    sideTable(1100),
  'soggiorno-prima': () =>
    room(LIGHT) +
    windowEl(1010, 150, 380, 430) +
    wrapped(180, 420, 190) +
    boxes(700, [[[150, 120], [130, 120]], [[150, 110]], [[110, 90]]]) +
    boxes(1180, [[[170, 130]], [[130, 100]]]) +
    ladder(1420),
  'cucina-dopo': () => room(STONE) + pendant(520, 190) + pendant(800, 190) + pendant(1080, 190) + kitchen(250, 1100, '#20262b', '#c8b08a', '#efede7') + stool(180) + plant(1500, '#20262b'),
  'cucina-prima': () =>
    room(STONE) +
    rect(250, 400, 1100, 30, '#000', 'opacity="0.05"') +
    line(250, 170, 1350, 170, INK, 2, 'stroke-dasharray="14 12" opacity="0.35"') +
    line(250, FLOOR - 330, 1350, FLOOR - 330, INK, 2, 'stroke-dasharray="14 12" opacity="0.35"') +
    [0, 1, 2, 3, 4, 5, 6].map((i) => line(250 + (i * 1100) / 6, 170, 250 + (i * 1100) / 6, FLOOR, INK, 2, 'stroke-dasharray="14 12" opacity="0.25"')).join('') +
    boxes(300, [[[190, 250], [190, 250]], [[160, 60]]]) +
    boxes(820, [[[220, 120], [180, 150]], [[200, 110]]]) +
    ladder(1330),
  camera: () =>
    room(WARM) +
    windowEl(110, 170, 300, 400) +
    wardrobe(900, 600, 600, '#edebe6', { doors: 4 }) +
    bed(300, 480, '#5b4a3a', '#e9e4da', '#5b6b66') +
    sideTable(140) +
    frame(520, 170, 180, 130, '#2a3035'),
  armadio: () =>
    room(WARM) +
    wardrobe(220, 1160, 640, '#2a3035', { doors: 6, open: true }) +
    lamp(110) +
    boxes(1440, [[[130, 110]], [[100, 80]]]),
  deposito: () =>
    room(DEPOT) +
    trackLights(80, 1440, 5) +
    rack(90, 440, 4) +
    rack(580, 440, 4, 0.75) +
    rack(1070, 440, 4) +
    line(0, FLOOR + 110, W, FLOOR + 110, BRASS, 8, 'opacity="0.7" stroke-dasharray="60 30"'),
  ufficio: () =>
    room(COOL) +
    windowEl(90, 130, 330, 430) +
    windowEl(520, 130, 330, 430) +
    shelfWall(1000, 300, 460, '#c8b08a') +
    shelfWall(1000, 460, 460, '#c8b08a') +
    desk(220, 520) +
    chair(360) +
    desk(880, 520) +
    chair(1020) +
    plant(1500),
  'ufficio-prima': () =>
    room(COOL) +
    windowEl(90, 130, 330, 430) +
    windowEl(520, 130, 330, 430) +
    boxes(240, [[[180, 130], [160, 130], [170, 130]], [[180, 120], [160, 110]], [[150, 100]]]) +
    wrapped(980, 300, 240) +
    boxes(1330, [[[150, 120]], [[120, 100]]]),
  trasloco: () =>
    room({ wall: '#cfc8ba', wall2: '#b3ab9b', floor: '#7f8389', floor2: '#55595e', boards: false, skirting: '#8f8a7e' }) +
    facade() +
    van(70) +
    boxes(960, [[[130, 110], [120, 110]], [[120, 96]]]),
  installazione: () =>
    room(NIGHT) +
    trackLights(260, 1080, 4) +
    tv(520, 250, 560, 316) +
    shelfWall(1160, 330, 300, '#b58a52') +
    shelfWall(1160, 470, 300, '#b58a52', false) +
    console_(430, 740, '#c8b08a') +
    plant(250, '#0d1013', '#55695b') +
    lamp(1420, '#b58a52'),
  scatole: () =>
    room(DEPOT) +
    boxes(120, [[[260, 210], [240, 210], [220, 210]], [[250, 190], [230, 190]], [[220, 170]]], 1) +
    boxes(1010, [[[230, 190], [210, 190]], [[220, 170]]], 1) +
    `<ellipse cx="800" cy="200" rx="700" ry="260" fill="#ffd9a0" opacity="0.08" filter="url(#glow)"/>`,
  squadra: () =>
    room(LIGHT) +
    windowEl(160, 150, 420, 430) +
    ladder(760) +
    wardrobe(980, 420, 560, '#c8b08a', { doors: 3, handles: INK }) +
    boxes(420, [[[150, 120]], [[110, 90]]]) +
    rect(640, FLOOR - 40, 200, 40, '#2a3035', 'rx="6"') +
    rect(660, FLOOR - 64, 160, 24, BRASS, 'rx="4"'),
};

for (const [name, draw] of Object.entries(scenes)) {
  uid = 0;
  const body = draw() + vignette();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">${body}</svg>`;
  writeFileSync(join(OUT, `${name}.svg`), svg.replace(/\s{2,}/g, ' '));
  console.log('✓', name);
}
