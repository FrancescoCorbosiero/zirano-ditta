import type { MediaKey } from './media';

export type Service = {
  slug: string;
  /** Sigla da tavola tecnica, usata come numero d'ordine. */
  code: string;
  title: string;
  short: string;
  intro: string;
  image: MediaKey;
  includes: string[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: 'traslochi',
    code: 'TR',
    title: 'Traslochi',
    short: 'Case, uffici e negozi. Imballaggio, trasporto, rimontaggio.',
    intro:
      'Sopralluogo, conteggio dei colli, mezzi e squadra, permessi di sosta. Il giorno del trasloco ogni collo ha già la sua destinazione.',
    image: 'trasloco',
    includes: [
      'Sopralluogo e inventario dei colli',
      'Imballaggio con materiali dedicati a vetri, quadri e strumenti',
      'Smontaggio e rimontaggio degli arredi',
      'Piattaforma aerea e autoscala fino al decimo piano',
      'Permessi di occupazione del suolo pubblico',
      'Copertura assicurativa sul trasporto',
    ],
    steps: [
      { title: 'Sopralluogo', text: 'Misuriamo accessi, scale e ascensori. Tu ci dici cosa parte e cosa resta.' },
      { title: 'Piano di carico', text: 'Definiamo squadra, mezzi, orari e ordine di carico stanza per stanza.' },
      { title: 'Giorno del trasloco', text: 'Proteggiamo pavimenti e spigoli, carichiamo, trasportiamo, scarichiamo.' },
      { title: 'Riallestimento', text: 'Rimontiamo i mobili, sistemiamo i colli nella stanza giusta, ritiriamo gli imballi.' },
    ],
    faq: [
      { q: 'Quanto tempo prima devo prenotare?', a: 'Due o tre settimane sono l’ideale. Per fine mese e periodo estivo conviene muoversi con un mese di anticipo.' },
      { q: 'Devo svuotare armadi e cassetti?', a: 'Sì per i mobili che vanno smontati. Ti lasciamo scatole e bauli appendiabiti qualche giorno prima.' },
    ],
  },
  {
    slug: 'montaggio-smontaggio',
    code: 'MS',
    title: 'Montaggio e smontaggio',
    short: 'Cucine, armadi, camere, pareti attrezzate. Di qualsiasi marca, anche per conto dei mobilifici.',
    intro:
      'Mobili nuovi o già tuoi, anche senza istruzioni. Adattiamo fianchi e zoccoli, mettiamo in bolla, regoliamo ante e cassetti.',
    image: 'armadio',
    includes: [
      'Cucine componibili con allaccio di elettrodomestici',
      'Armadi battenti, scorrevoli e cabine armadio',
      'Camere, camerette e letti contenitore',
      'Adattamenti su misura: tagli, fori, zoccoli',
      'Fissaggio a parete certificato',
      'Ritiro e smaltimento degli imballi',
    ],
    steps: [
      { title: 'Verifica', text: 'Controlliamo colli, ferramenta e misure della stanza prima di aprire il primo cartone.' },
      { title: 'Montaggio', text: 'Assembliamo, mettiamo in bolla e fissiamo a parete dove serve.' },
      { title: 'Regolazione', text: 'Ante, cassetti e cerniere regolati uno per uno.' },
      { title: 'Consegna', text: 'Stanza pulita, imballi ritirati, mobile pronto all’uso.' },
    ],
    faq: [
      { q: 'Montate mobili acquistati online o in grande distribuzione?', a: 'Sì, di qualsiasi marca. Ci basta il modello o una foto dell’etichetta dei colli per stimare i tempi.' },
      { q: 'Potete modificare un mobile che non entra?', a: 'Nella maggior parte dei casi sì: riduciamo fianchi, spostiamo ripiani, rifiliamo zoccoli e top.' },
    ],
  },
  {
    slug: 'installazioni',
    code: 'IN',
    title: 'Installazioni',
    short: 'Televisori, mensole, lampadari, tende, specchi.',
    intro:
      'Cartongesso, laterizio o cemento: tassello e fissaggio scelti in base al supporto e al peso. Cavi nascosti.',
    image: 'installazione',
    includes: [
      'Staffe TV e canaline a scomparsa',
      'Mensole, pensili e librerie a muro',
      'Lampadari, binari e punti luce',
      'Tende, bastoni e binari a soffitto',
      'Specchi, quadri e gallerie a parete',
      'Elettrodomestici da incasso',
    ],
    steps: [
      { title: 'Rilievo', text: 'Individuiamo impianti e struttura della parete prima di forare.' },
      { title: 'Tracciatura', text: 'Segniamo altezze e allineamenti e li confermiamo con te.' },
      { title: 'Posa', text: 'Foriamo con aspirazione, fissiamo, colleghiamo.' },
      { title: 'Collaudo', text: 'Prova di carico, pulizia e consegna.' },
    ],
    faq: [
      { q: 'Si può appendere un televisore sul cartongesso?', a: 'Sì, con tasselli dedicati o un rinforzo dietro la lastra. Lo valutiamo sul posto in base al peso.' },
    ],
  },
  {
    slug: 'smaltimenti',
    code: 'SM',
    title: 'Smaltimenti e sgomberi',
    short: 'Ritiriamo mobili, elettrodomestici e ingombranti. Conferiti nei centri autorizzati, con ricevuta.',
    intro:
      'Cantine, appartamenti, uffici e locali. Separiamo ciò che si recupera da ciò che va smaltito e conferiamo in impianti autorizzati, con documentazione.',
    image: 'scatole',
    includes: [
      'Sgombero di appartamenti, cantine, solai e box',
      'Ritiro di mobili ed elettrodomestici usati',
      'Smontaggio sul posto degli arredi voluminosi',
      'Conferimento in centri autorizzati',
      'Formulario e ricevuta di smaltimento',
      'Pulizia finale dei locali su richiesta',
    ],
    steps: [
      { title: 'Stima', text: 'Bastano alcune foto per darti una cifra; per i locali interi facciamo un sopralluogo.' },
      { title: 'Selezione', text: 'Dividiamo ciò che tieni, ciò che si recupera e ciò che va smaltito.' },
      { title: 'Ritiro', text: 'Smontiamo, carichiamo e lasciamo i locali liberi.' },
      { title: 'Documenti', text: 'Ricevi la ricevuta del conferimento.' },
    ],
    faq: [
      { q: 'Ritirate anche un solo mobile?', a: 'Sì. Per i ritiri singoli organizziamo giri settimanali per zona, così il costo resta contenuto.' },
    ],
  },
  {
    slug: 'depositi',
    code: 'DP',
    title: 'Depositi e custodia',
    short: 'Box e scaffali in un magazzino asciutto e sorvegliato. Per una settimana o per un anno.',
    intro:
      'Per ristrutturazioni, traslochi con date sfasate, uffici. Ritiro, imballaggio, inventario e custodia. Riconsegna su richiesta.',
    image: 'deposito',
    includes: [
      'Magazzino asciutto e videosorvegliato',
      'Inventario fotografico di ogni collo',
      'Ritiro e riconsegna a domicilio',
      'Contratti da una settimana, senza vincoli annuali',
      'Imballaggio per lunga permanenza',
      'Copertura assicurativa sulla giacenza',
    ],
    steps: [
      { title: 'Volume', text: 'Stimiamo i metri cubi che ti servono.' },
      { title: 'Ritiro', text: 'Imballiamo, etichettiamo e carichiamo.' },
      { title: 'Custodia', text: 'Ogni collo ha una posizione a scaffale e una foto in inventario.' },
      { title: 'Riconsegna', text: 'Tutto o in parte, dove e quando vuoi.' },
    ],
    faq: [
      { q: 'Posso accedere ai miei beni durante il deposito?', a: 'Sì, su appuntamento. In alternativa ti riconsegniamo solo i colli che ti servono.' },
    ],
  },
  {
    slug: 'su-misura',
    code: 'SP',
    title: 'Servizi su misura',
    short: 'Allestimenti, movimentazioni delicate, piccoli trasporti.',
    intro:
      'Pianoforti, casseforti, opere d’arte, allestimenti per negozi ed eventi, consegne al piano per mobilifici e architetti. Preventivo caso per caso.',
    image: 'squadra',
    includes: [
      'Movimentazione di pianoforti, casseforti e opere',
      'Allestimento di negozi, showroom e stand',
      'Consegne al piano per mobilifici e studi',
      'Piccoli trasporti e ritiri dedicati',
      'Protezione di pavimenti e parti comuni',
      'Manutenzione periodica degli arredi',
    ],
    steps: [
      { title: 'Ascolto', text: 'Ci racconti cosa serve e con quali vincoli.' },
      { title: 'Proposta', text: 'Ti presentiamo modalità, tempi e costo.' },
      { title: 'Esecuzione', text: 'Una squadra dedicata, un solo referente.' },
      { title: 'Verifica', text: 'Controlliamo insieme il risultato.' },
    ],
    faq: [
      { q: 'Lavorate con architetti e mobilifici?', a: 'Sì, come squadra di posa e logistica. Possiamo operare a marchio neutro e coordinare le consegne con il cantiere.' },
    ],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
