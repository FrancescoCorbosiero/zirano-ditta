import localFont from 'next/font/local';

/**
 * Font self-hosted (nessuna richiesta a terzi dal browser):
 *  · Archivo — variabile su peso e larghezza: titoli larghi, testo normale;
 *  · Newsreader corsivo — la parola in evidenza dentro i titoli;
 *  · Geist Mono — quote, misure, etichette da tavola tecnica.
 */
export const archivo = localFont({
  src: '../fonts/archivo-latin-wdth-normal.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-archivo',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

export const newsreader = localFont({
  src: '../fonts/newsreader-latin-opsz-italic.woff2',
  weight: '200 800',
  style: 'italic',
  variable: '--font-newsreader',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

export const geistMono = localFont({
  src: [
    { path: '../fonts/geist-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/geist-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
});

export const fontVariables = `${archivo.variable} ${newsreader.variable} ${geistMono.variable}`;
