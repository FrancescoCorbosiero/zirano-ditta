# Zirano Arredi — Servizi avanzati per Spazi e Proprietà

Sito vetrina della ditta (traslochi, montaggio e smontaggio mobili, installazioni,
smaltimenti, depositi) con raccolta delle richieste di preventivo.

**Stack**: Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Konsta UI 5 ·
GSAP (ScrollTrigger, SplitText, Flip) · Lenis · Zod. Node ≥ 22.12, npm.

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # tipi + lint
npm run build
```

## Il concetto: "Planimetria"

Il sito parla la lingua delle tavole tecniche, perché il mestiere della ditta sono
gli spazi e le loro misure.

- **Tavole numerate** (`Tav. 02 — Servizi`), **linee di quota**, **crocini di registro**,
  **cartiglio** con i dati di ogni lavoro.
- **Palette**: gesso e grafite (carta e inchiostro), notte per le fasce scure, un solo
  accento: l'**ottone** della ferramenta.
- **Tipografia**: Archivo variabile (titoli larghi), Newsreader corsivo per la parola
  in evidenza, Geist Mono per quote ed etichette. Font self-hosted.
- **Vetro**: header, barra mobile, schede e cartigli sono lastre con sfocatura.
- **Firma**: la planimetria della hero si disegna, gli arredi entrano dall'ingresso e
  la tavola si inclina in assonometria su tre livelli di profondità.

## Pagine

| Percorso | Contenuto |
|---|---|
| `/` | Hero con planimetria, manifesto, indice servizi, lavori (scorrimento orizzontale agganciato), metodo, voci, FAQ |
| `/chi-siamo` | La ditta: storia, regole, numeri |
| `/servizi`, `/servizi/[slug]` | Indice e scheda di ogni servizio |
| `/lavori`, `/lavori/[slug]` | Archivio con filtri animati; scheda con cartiglio, prima/dopo, galleria |
| `/preventivo` | Modulo a passi (Konsta UI); ogni link a questa pagina lo apre anche in popup |
| `/contatti` | Canali, orari, zona |
| `/blog`, `/blog/[slug]` | Guide in Markdown (`src/content/blog`) |
| `/faq`, `/privacy` | Domande frequenti (con dati strutturati), informativa (bozza) |

SEO: metadati per pagina, `sitemap.xml`, `robots.txt`, JSON-LD (attività, FAQ,
briciole, articoli), immagine Open Graph generata.

## Dove si cambia cosa

| Cosa | File |
|---|---|
| Nome, contatti, orari, numeri, recensioni | `src/lib/site.ts` |
| Servizi | `src/lib/services.ts` |
| Lavori | `src/lib/works.ts` |
| Immagini | `src/lib/media.ts` + `public/media/` |
| Campi e regole del preventivo | `src/lib/quote.ts` |
| Consegna delle richieste (email/CRM) | `src/lib/delivery.ts` |
| Logo | `src/components/layout/Logo.tsx`, `src/app/icon.svg` |
| Colori, tipografia, componenti | `src/app/globals.css` |
| Animazioni | `src/lib/motion/engine.ts` (API ad attributi) |

## Da fare prima della messa online

Tutto ciò che segue è **segnaposto** e va definito con il cliente:

- [ ] **Logo definitivo** (ora: segno provvisorio "stanza in pianta con la Z").
- [ ] Dati della ditta in `site.ts`: ragione sociale, P. IVA, indirizzo, telefono, email, orari, zona.
- [ ] Numeri (`STATS`), impegni (`PROMISES`) e **recensioni** (`TESTIMONIALS`: testi d'esempio, non pubblicare così).
- [ ] Lavori reali e **fotografie**: le immagini attuali sono tavole illustrate generate da
      `npm run placeholders`. Per sostituirle, mettere le foto in `public/media/` e aggiornare `media.ts`.
- [ ] Parametri definitivi del preventivo (`quote.ts`) e canale di consegna
      (`delivery.ts`: oggi webhook `QUOTE_WEBHOOK_URL` oppure log del server).
- [ ] Informativa privacy redatta da un consulente; mappa nella pagina Contatti.
- [ ] `NEXT_PUBLIC_SITE_URL` con il dominio vero (vedi `.env.example`).
