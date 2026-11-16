import type { MediaKey } from './media';

/* I nostri lavori — DATI SEGNAPOSTO. Ogni lavoro è una "tavola": il
   cartiglio (luogo, durata, squadra, volume) è pensato per dati veri. */

export type Work = {
  slug: string;
  title: string;
  /** Servizio principale (slug in services.ts): è il filtro della pagina Lavori. */
  service: string;
  tags: string[];
  place: string;
  year: number;
  cover: MediaKey;
  summary: string;
  story: string[];
  sheet: { label: string; value: string }[];
  before?: MediaKey;
  after?: MediaKey;
  gallery: MediaKey[];
};

export const WORKS: Work[] = [
  {
    slug: 'attico-centro-storico',
    title: 'Attico in centro storico',
    service: 'traslochi',
    tags: ['Trasloco', 'Autoscala', 'Rimontaggio'],
    place: 'Centro storico',
    year: 2025,
    cover: 'soggiornoDopo',
    summary: 'Sesto piano senza ascensore di servizio: 140 colli saliti dalla finestra in una mattina.',
    story: [
      'La scala condominiale era troppo stretta per il divano e la libreria. Abbiamo chiesto il permesso di sosta, piazzato l’autoscala sul fronte strada e fatto entrare tutto dalla portafinestra del soggiorno.',
      'Nel pomeriggio la squadra di montaggio ha rimesso in piedi libreria, letto e armadi. La sera la casa era abitabile, con gli scatoloni già divisi per stanza.',
    ],
    sheet: [
      { label: 'Luogo', value: 'Centro storico' },
      { label: 'Durata', value: '1 giorno' },
      { label: 'Squadra', value: '5 persone' },
      { label: 'Volume', value: '48 m³' },
      { label: 'Piano', value: '6°' },
    ],
    before: 'soggiornoPrima',
    after: 'soggiornoDopo',
    gallery: ['trasloco', 'camera', 'scatole'],
  },
  {
    slug: 'cucina-su-misura',
    title: 'Cucina a tutta parete',
    service: 'montaggio-smontaggio',
    tags: ['Montaggio', 'Cucina', 'Allacci'],
    place: 'Zona collinare',
    year: 2025,
    cover: 'cucinaDopo',
    summary: 'Quattro metri e quaranta di basi, pensili e colonne, con il top rifilato sul posto.',
    story: [
      'La parete era fuori squadra di quasi due centimetri. Abbiamo compensato con fianchi di tamponamento rifilati a misura, così la linea dei pensili è rimasta perfettamente orizzontale.',
      'Forno, piano e cappa collegati e collaudati. Imballi ritirati a fine giornata.',
    ],
    sheet: [
      { label: 'Luogo', value: 'Zona collinare' },
      { label: 'Durata', value: '2 giorni' },
      { label: 'Squadra', value: '2 persone' },
      { label: 'Sviluppo', value: '4,40 m' },
      { label: 'Moduli', value: '14' },
    ],
    before: 'cucinaPrima',
    after: 'cucinaDopo',
    gallery: ['squadra', 'installazione'],
  },
  {
    slug: 'studio-quaranta-postazioni',
    title: 'Studio da quaranta postazioni',
    service: 'traslochi',
    tags: ['Trasloco ufficio', 'Weekend', 'Cablaggio'],
    place: 'Quartiere direzionale',
    year: 2024,
    cover: 'ufficio',
    summary: 'Venerdì sera si spegne un ufficio, lunedì mattina se ne accende un altro.',
    story: [
      'Ogni postazione è stata etichettata con piano, stanza e numero di scrivania. Monitor e computer hanno viaggiato in casse dedicate, gli archivi in contenitori sigillati.',
      'Domenica pomeriggio abbiamo ricollegato le postazioni seguendo la pianta concordata con lo studio.',
    ],
    sheet: [
      { label: 'Luogo', value: 'Quartiere direzionale' },
      { label: 'Durata', value: '1 weekend' },
      { label: 'Squadra', value: '9 persone' },
      { label: 'Postazioni', value: '40' },
      { label: 'Fermo attività', value: '0 ore' },
    ],
    before: 'ufficioPrima',
    after: 'ufficio',
    gallery: ['trasloco', 'scatole'],
  },
  {
    slug: 'parete-attrezzata',
    title: 'Parete attrezzata con luci',
    service: 'installazioni',
    tags: ['Installazione', 'TV a parete', 'Illuminazione'],
    place: 'Lungofiume',
    year: 2025,
    cover: 'installazione',
    summary: 'Un 75 pollici sospeso, quattro faretti a binario e nemmeno un cavo in vista.',
    story: [
      'Parete in cartongesso: abbiamo aperto, inserito un rinforzo in multistrato e richiuso prima di fissare la staffa. I cavi scendono in una canalina a scomparsa fino al mobile.',
      'Mensole in ottone allineate al filo superiore dello schermo.',
    ],
    sheet: [
      { label: 'Luogo', value: 'Lungofiume' },
      { label: 'Durata', value: '6 ore' },
      { label: 'Squadra', value: '2 persone' },
      { label: 'Carico', value: '38 kg' },
      { label: 'Cavi a vista', value: '0' },
    ],
    gallery: ['soggiornoDopo', 'squadra'],
  },
  {
    slug: 'armadio-sei-ante',
    title: 'Armadio a sei ante',
    service: 'montaggio-smontaggio',
    tags: ['Montaggio', 'Su misura'],
    place: 'Prima periferia',
    year: 2024,
    cover: 'armadio',
    summary: 'Da parete a parete, da pavimento a soffitto. Tre millimetri di aria per lato.',
    story: [
      'L’armadio è stato assemblato in piedi, perché la stanza non permetteva di alzarlo da terra. Zoccolo e cielino rifilati per chiudere a filo con soffitto e pareti.',
    ],
    sheet: [
      { label: 'Luogo', value: 'Prima periferia' },
      { label: 'Durata', value: '1 giorno' },
      { label: 'Squadra', value: '2 persone' },
      { label: 'Larghezza', value: '3,62 m' },
      { label: 'Altezza', value: '2,70 m' },
    ],
    gallery: ['camera', 'squadra'],
  },
  {
    slug: 'deposito-ristrutturazione',
    title: 'Sei mesi di custodia',
    service: 'depositi',
    tags: ['Deposito', 'Ristrutturazione', 'Inventario'],
    place: 'Magazzino Zirano',
    year: 2024,
    cover: 'deposito',
    summary: 'Un appartamento intero a scaffale mentre il cantiere rifaceva pavimenti e impianti.',
    story: [
      'Abbiamo ritirato l’arredo di cinque stanze, fotografato e numerato ogni collo. A metà lavori la famiglia ha chiesto indietro la camera dei bambini: l’abbiamo riconsegnata in ventiquattro ore.',
      'A cantiere chiuso tutto è tornato a casa, stanza per stanza.',
    ],
    sheet: [
      { label: 'Luogo', value: 'Magazzino Zirano' },
      { label: 'Durata', value: '6 mesi' },
      { label: 'Colli', value: '212' },
      { label: 'Volume', value: '55 m³' },
      { label: 'Riconsegne', value: '2' },
    ],
    gallery: ['scatole', 'trasloco'],
  },
  {
    slug: 'sgombero-appartamento',
    title: 'Appartamento liberato',
    service: 'smaltimenti',
    tags: ['Sgombero', 'Smaltimento'],
    place: 'Quartiere residenziale',
    year: 2023,
    cover: 'soggiornoPrima',
    summary: 'Novanta metri quadri svuotati e consegnati puliti all’agenzia in due giorni.',
    story: [
      'Arredi smontati sul posto, materiali separati per tipologia e conferiti in impianto autorizzato. Il proprietario ha ricevuto la documentazione di smaltimento insieme alle chiavi.',
    ],
    sheet: [
      { label: 'Luogo', value: 'Quartiere residenziale' },
      { label: 'Durata', value: '2 giorni' },
      { label: 'Squadra', value: '4 persone' },
      { label: 'Superficie', value: '90 m²' },
      { label: 'Conferito', value: '2,1 t' },
    ],
    gallery: ['scatole', 'trasloco'],
  },
  {
    slug: 'camera-padronale',
    title: 'Camera padronale',
    service: 'montaggio-smontaggio',
    tags: ['Montaggio', 'Camera'],
    place: 'Zona nord',
    year: 2023,
    cover: 'camera',
    summary: 'Letto contenitore, comodini sospesi e un quattro ante con interni attrezzati.',
    story: [
      'Montaggio completo in una giornata, con comodini fissati a muro su parete in laterizio e regolazione finale di ante e cassetti.',
    ],
    sheet: [
      { label: 'Luogo', value: 'Zona nord' },
      { label: 'Durata', value: '1 giorno' },
      { label: 'Squadra', value: '2 persone' },
      { label: 'Elementi', value: '6' },
    ],
    gallery: ['armadio', 'squadra'],
  },
];

export const workBySlug = (slug: string) => WORKS.find((w) => w.slug === slug);
export const pad = (n: number) => String(n).padStart(2, '0');
