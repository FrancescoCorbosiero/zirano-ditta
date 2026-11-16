<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Questo progetto

Sito di **Zirano Arredi — Servizi avanzati per Spazi e Proprietà** (nome provvisorio):
vetrina dei lavori e raccolta di richieste di preventivo. Leggi prima `README.md`.

- **Lingua**: testi del sito, commenti e messaggi di commit in italiano.
- **Design System "Planimetria"** in `src/app/globals.css`: usa le classi esistenti
  (`.wrap`, `.section`, `.display`, `.h2`, `.h3`, `.tav`, `.mono`, `.btn`, `.glass`,
  `.glass-ink`, `.quota`, `.frame`, `.crop`, `.chip`, `.faq`, `.tone-dark`) prima di
  inventarne di nuove. Spigoli vivi (`--r: 3px`), un solo accento (ottone), il corsivo
  Newsreader solo per la parola in evidenza dei titoli (`<em>`).
- **Dati in un punto solo**: `src/lib/site.ts` (ditta), `services.ts`, `works.ts`,
  `faq.ts`, `media.ts` (immagini), `quote.ts` (campi del preventivo, condivisi col server).
- **Konsta UI** solo nelle parti "app" (preventivo, menu del telefono), in file `'use client'`.
- **Animazioni**: motore GSAP + Lenis in `src/lib/motion/engine.ts`, API ad attributi
  (elenco in testa al file). Si anima dal markup (`data-reveal`, `data-split`,
  `data-parallax`…). `engine.ts` non si importa mai in modo statico. Senza JS o con
  "riduci movimento" la pagina deve restare completa: gli stati iniziali dipendono da
  `html.motion`. Niente `transform` permanenti sugli antenati delle sezioni agganciate.
- **Logo**: unico punto in `src/components/layout/Logo.tsx` (+ `src/app/icon.svg`).
- **Prima di consegnare**: `npm run check` e `npm run build` puliti.
