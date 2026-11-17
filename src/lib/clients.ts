/* =====================================================================
   Referenze — clienti, testimonianze, valutazione.
   ⚠ TUTTO SEGNAPOSTO: nomi, persone, citazioni e numeri qui sotto sono
   inventati per impaginare la sezione. Vanno sostituiti con quelli veri,
   e con il consenso scritto dei clienti a essere citati, prima della
   messa online.

   Loghi: un SVG monocromatico per cliente in public/clienti/ (es.
   public/clienti/albergo-riva.svg) e il percorso nel campo `logo`.
   Il sito lo usa come maschera e lo tinge con il colore del testo, così
   il muro resta uniforme qualunque sia il colore originale del marchio.
   Finché un cliente non ha il logo, il nome si compone in Archivo con
   lo stile indicato in `mark`.
   ===================================================================== */

export type Client = {
  id: string;
  name: string;
  /** Settore, in una o due parole. */
  sector: string;
  /** Cosa abbiamo fatto per loro, in breve: compare al passaggio sul muro. */
  work: string;
  /** Primo anno di collaborazione. */
  since: number;
  /** Percorso del logo in /public (SVG monocromatico). */
  logo?: string;
  /** Come comporre il nome finché manca il logo: larghezza (62–125), peso, maiuscolo, spaziatura (em). */
  mark?: { width?: number; weight?: number; upper?: boolean; track?: number; size?: number };
  /** Nella fascia sotto la hero (i nomi più riconoscibili, al massimo sei). */
  strip?: boolean;
};

export const CLIENTS: Client[] = [
  { id: 'albergo-riva', name: 'Albergo Riva', sector: 'Hotel', work: 'Arredo di 48 camere', since: 2021, strip: true, mark: { width: 125, weight: 640, upper: true, track: 0.16, size: 0.82 } },
  { id: 'studio-valli', name: 'Studio Valli Architetti', sector: 'Architettura', work: 'Posa di arredi su misura', since: 2019, strip: true, mark: { width: 72, weight: 520, track: 0.01, size: 1.08 } },
  { id: 'officina-tre', name: 'Officina Tre', sector: 'Coworking', work: 'Trasloco di 40 postazioni', since: 2024, strip: true, mark: { width: 100, weight: 820, track: -0.045, size: 1.12 } },
  { id: 'galleria-ottava', name: 'Galleria Ottava', sector: 'Arte contemporanea', work: 'Movimentazione di opere', since: 2022, strip: true, mark: { width: 62, weight: 380, upper: true, track: 0.32, size: 0.86 } },
  { id: 'nord-arredo', name: 'Nord Arredo', sector: 'Mobilificio', work: 'Squadra di posa dedicata', since: 2018, strip: true, mark: { width: 118, weight: 300, track: -0.03, size: 1.12 } },
  { id: 'casa-lumen', name: 'Casa Lumen', sector: 'Showroom', work: 'Allestimento dello showroom', since: 2023, strip: true, mark: { width: 90, weight: 700, upper: true, track: 0.06, size: 0.9 } },
  { id: 'gruppo-sereni', name: 'Gruppo Sereni', sector: 'Immobiliare', work: 'Sgomberi e home staging', since: 2020, mark: { width: 108, weight: 460, track: -0.02, size: 1.05 } },
  { id: 'ferri-associati', name: 'Ferri & Associati', sector: 'Studio legale', work: 'Trasloco di sede e archivio', since: 2024, mark: { width: 80, weight: 600, track: 0, size: 1.04 } },
  { id: 'corte-alta', name: 'Corte Alta Residence', sector: 'Residence', work: 'Manutenzione degli arredi', since: 2021, mark: { width: 125, weight: 420, upper: true, track: 0.1, size: 0.74 } },
  { id: 'fondazione-arca', name: 'Fondazione Arca', sector: 'Cultura', work: 'Deposito e custodia', since: 2022, mark: { width: 66, weight: 640, track: 0.02, size: 1.1 } },
  { id: 'bottega-noce', name: 'Bottega Noce', sector: 'Falegnameria', work: 'Consegne e montaggi al piano', since: 2019, mark: { width: 112, weight: 760, track: -0.035, size: 1 } },
  { id: 'linea-quadra', name: 'Linea Quadra', sector: 'Arredo ufficio', work: 'Montaggi in tutta la regione', since: 2020, mark: { width: 96, weight: 360, upper: true, track: 0.22, size: 0.84 } },
];

export const clientById = (id: string) => CLIENTS.find((c) => c.id === id);

export type Testimonial = {
  /** Id in CLIENTS; vuoto per un cliente privato. */
  client?: string;
  quote: string;
  author: string;
  role: string;
  /** Il lavoro in numeri, come nel cartiglio di una tavola. */
  facts: string[];
  /** Slug del lavoro raccontato in works.ts, se c'è. */
  work?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    client: 'officina-tre',
    quote: 'Venerdì sera abbiamo spento l’ufficio. Lunedì alle otto ogni postazione era accesa, con il suo cavo al posto giusto.',
    author: 'Marta R.',
    role: 'Facility manager',
    facts: ['Trasloco ufficio', '40 postazioni', '1 weekend', '0 ore di fermo'],
    work: 'studio-quaranta-postazioni',
  },
  {
    client: 'albergo-riva',
    quote: 'Quarantotto camere arredate in nove giorni, con l’albergo aperto. Gli ospiti non se ne sono accorti.',
    author: 'Paolo D.',
    role: 'Direttore',
    facts: ['Montaggio arredi', '48 camere', '9 giorni', 'Hotel aperto'],
  },
  {
    client: 'studio-valli',
    quote: 'Diamo loro i disegni esecutivi e le chiavi del cantiere. Il resto lo ritroviamo montato al millimetro.',
    author: 'Chiara V.',
    role: 'Architetta, socia fondatrice',
    facts: ['Posa su misura', 'Dal 2019', '30+ cantieri insieme'],
  },
  {
    client: 'galleria-ottava',
    quote: 'Opere fino a tre metri, scale strette, nessun graffio. Ormai ogni allestimento lo pianifichiamo con loro.',
    author: 'Luca B.',
    role: 'Registrar',
    facts: ['Movimentazione opere', '6 mostre', 'Casse su misura'],
  },
  {
    quote: 'Hanno smontato, trasferito e rimontato una cucina intera in due giorni. Il terzo giorno ci cucinavamo.',
    author: 'Famiglia S.',
    role: 'Cliente privato',
    facts: ['Trasloco e rimontaggio', '4,40 m di cucina', '2 giorni'],
    work: 'cucina-su-misura',
  },
];

/** Valutazione pubblica (segnaposto: collegare la scheda Google vera). */
export const RATING = {
  score: 4.9,
  count: 186,
  source: 'Google',
  href: 'https://www.google.com/maps', // segnaposto: link alla scheda dell'attività
} as const;
