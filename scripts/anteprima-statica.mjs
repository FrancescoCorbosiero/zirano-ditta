/* =====================================================================
   Anteprima statica del sito, per un hosting senza server (Netlify Drop:
   app.netlify.com/drop). In Node, così gira uguale su Windows, macOS e Linux.

     npm run anteprima
     npm run anteprima -- https://ziranu-arredi.netlify.app

   L'indirizzo (facoltativo) va in canonical, sitemap e immagini per i
   social. Costruisce senza src/app/api (un sito statico non ha server): il
   modulo del preventivo si compila ma non invia, e all'ultimo passo avvisa
   che è un'anteprima (NEXT_PUBLIC_ANTEPRIMA_STATICA). Su Netlify si trascina
   la cartella anteprima-netlify (contiene index.html), non public/.
   ===================================================================== */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = join(ROOT, 'src', 'app', 'api');
const PARK = join(ROOT, '.api-in-pausa');
const OUT = join(ROOT, 'out');
const DEST = join(ROOT, 'anteprima-netlify');

const url = process.argv.slice(2).find((a) => /^https?:\/\//.test(a)) ?? process.env.NEXT_PUBLIC_SITE_URL ?? '';

// Un giro precedente interrotto a metà: l'API torna al suo posto.
if (existsSync(PARK) && !existsSync(API)) renameSync(PARK, API);

// L'API non c'è in un sito statico: si sposta fuori da src/app per la build
// e si rimette al suo posto alla fine, anche se la build fallisce.
renameSync(API, PARK);
let ok = false;
try {
  // I tipi generati da next dev citano ancora l'API: si rigenerano da soli.
  rmSync(join(ROOT, '.next', 'dev', 'types'), { recursive: true, force: true });
  rmSync(join(ROOT, '.next', 'types'), { recursive: true, force: true });
  const r = spawnSync('npx', ['next', 'build'], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      ANTEPRIMA_STATICA: '1',
      NEXT_PUBLIC_ANTEPRIMA_STATICA: '1',
      NEXT_TELEMETRY_DISABLED: '1',
      ...(url ? { NEXT_PUBLIC_SITE_URL: url } : {}),
    },
  });
  ok = r.status === 0;
} finally {
  renameSync(PARK, API);
}
if (!ok) {
  console.error("La build dell'anteprima non è riuscita: vedi gli errori qui sopra.");
  process.exit(1);
}

rmSync(DEST, { recursive: true, force: true });
renameSync(OUT, DEST);

// Netlify: /servizi → servizi.html anche se accanto c'è la cartella servizi/
// (dati RSC e pagine annidate, come /servizi/traslochi → servizi/traslochi.html).
const html = (dir, base = '') =>
  readdirSync(join(DEST, dir), { withFileTypes: true }).flatMap((d) => {
    if (d.isDirectory()) return d.name === '_next' ? [] : html(join(dir, d.name), `${base}${d.name}/`);
    return d.name.endsWith('.html') ? [`${base}${d.name.slice(0, -5)}`] : [];
  });
const tutte = html('').filter((n) => !['index', '404', '_not-found'].includes(n));

// Le pagine che al build hanno chiamato notFound() escono dall'anteprima: su
// Netlify devono rispondere 404, non mostrare la 404 con lo stato 200.
const nonTrovata = (n) => readFileSync(join(DEST, `${n}.html`), 'utf8').includes('NEXT_HTTP_ERROR_FALLBACK;404');
const via = tutte.filter(nonTrovata);
for (const n of via) {
  rmSync(join(DEST, `${n}.html`), { force: true });
  rmSync(join(DEST, `${n}.txt`), { force: true });
}
for (const n of [...via].sort((a, b) => b.length - a.length)) {
  const dir = join(DEST, n);
  if (existsSync(dir) && !html(n).length) rmSync(dir, { recursive: true, force: true });
}

const pagine = tutte.filter((n) => !via.includes(n));
writeFileSync(join(DEST, '_redirects'), pagine.map((n) => `/${n}  /${n}.html  200`).join('\n') + '\n');
// L'immagine per i social esce senza estensione: Netlify deve sapere che è un PNG.
if (existsSync(join(DEST, 'opengraph-image'))) writeFileSync(join(DEST, '_headers'), '/opengraph-image\n  Content-Type: image/png\n');
if (via.length) console.log(`Fuori dall'anteprima (404): ${via.map((n) => `/${n}`).join(', ')}`);

console.log(`\nPronta: anteprima-netlify/ — trascinala su https://app.netlify.com/drop${url ? ` (indirizzo: ${url})` : ''}`);
console.log("Dopo l'anteprima, npm run build rifà la build normale.");
