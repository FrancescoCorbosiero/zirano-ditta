import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = `${SITE.name} — ${SITE.payoff}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Immagine di condivisione generata: il segno, il nome, il payoff. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#0c0f12', color: '#eceae5' }}>
        <svg width="120" height="120" viewBox="0 0 40 40" fill="none">
          <path d="M6 25V6h28v28H15" stroke="#eceae5" strokeWidth="2" />
          <path d="M15 12.5h12.5L15 26h13" stroke="#eceae5" strokeWidth="2.4" />
          <path d="M6 34v-9" stroke="#b58a52" strokeWidth="2" />
          <path d="M15 34a9 9 0 0 0-9-9" stroke="#b58a52" strokeWidth="1" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 132, fontWeight: 600, letterSpacing: 18, lineHeight: 1 }}>ZIRANO</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 28, fontSize: 30, color: '#9ba1a7' }}>
            <div style={{ width: 14, height: 14, background: '#b58a52', marginRight: 20 }} />
            {SITE.payoff}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
