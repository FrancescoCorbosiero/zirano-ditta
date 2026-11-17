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

- **Linee di quota** (con le tacche oblique delle tavole d'architettura), **crocini di
  registro**, **cartiglio** con i dati di ogni lavoro.
- **Prove, non parole**: testi brevi; a parlare sono i numeri, i nomi dei clienti e i
  dati di ogni lavoro (durata, squadra, volume).
- **Palette**: gesso e grafite (carta e inchiostro), notte per le fasce scure, un solo
  accento: l'**ottone** della ferramenta.
- **Tipografia**: una sola famiglia, Archivo variabile su peso e larghezza (titoli
  larghi, scritte della pianta strette, dati in cifre tabellari). Niente serif, niente
  monospazio, niente etichette sopra i titoli. Font self-hosted.
- **Impaginazione su tre assi**: centrato per i momenti solenni (hero, referenze,
  invito finale), a destra per i titoli delle pagine, "a quota" (due metà del titolo
  unite da una linea di quota) per i passaggi tra le sezioni.
- **Vetro**: header, barra mobile e cartigli sono lastre con sfocatura.
- **Firma**: la planimetria della hero si disegna, gli arredi entrano dall'ingresso e
  la tavola si inclina in assonometria su tre livelli di profondità; al passaggio del
  mouse oscilla di qualche grado attorno alla sua posa.

## Pagine

| Percorso | Contenuto |
|---|---|
| `/` | Hero centrata con planimetria e nomi dei clienti, legenda dei numeri, indice servizi, lavori con i loro dati (scorrimento orizzontale agganciato), referenze (muro dei clienti, testimonianze, valutazione), FAQ |
| `/chi-siamo` | La ditta: storia, regole, numeri, clienti, metodo |
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
| Nome, contatti, orari, numeri | `src/lib/site.ts` |
| Clienti, loghi, testimonianze, valutazione | `src/lib/clients.ts` + `public/clienti/` |
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
- [ ] Numeri (`STATS`) e impegni (`PROMISES`) in `site.ts`.
- [ ] **Referenze** in `clients.ts`: i nomi dei clienti, le persone, le citazioni e la
      valutazione Google sono **inventati** (non pubblicare così). Servono i nomi veri, il
      consenso scritto a citarli, i loghi in SVG monocromatico in `public/clienti/` e il
      link alla scheda Google.
- [ ] Lavori reali e **fotografie**: le immagini attuali sono tavole illustrate generate da
      `npm run placeholders`. Per sostituirle, mettere le foto in `public/media/` e aggiornare `media.ts`.
- [ ] Parametri definitivi del preventivo (`quote.ts`) e canale di consegna
      (`delivery.ts`: oggi webhook `QUOTE_WEBHOOK_URL` oppure log del server).
- [ ] Informativa privacy redatta da un consulente; mappa nella pagina Contatti.
- [ ] `NEXT_PUBLIC_SITE_URL` con il dominio vero (vedi `.env.example`).
