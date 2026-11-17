import localFont from 'next/font/local';

/**
 * Una sola famiglia, self-hosted (nessuna richiesta a terzi dal browser):
 * Archivo variabile su peso (100–900) e larghezza (62–125%). I titoli sono
 * larghi, le scritte della planimetria strette, i dati in cifre tabellari.
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

export const fontVariables = archivo.variable;
