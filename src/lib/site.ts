/* =====================================================================
   Dati della ditta — TUTTO SEGNAPOSTO.
   Nome, contatti, numeri e zone vanno confermati con il cliente prima
   della messa online. Il sito legge solo da qui: si cambia in un punto.
   ===================================================================== */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.it').replace(/\/$/, '');

export const SITE = {
  name: 'Ziranu Arredi',
  payoff: 'Servizi avanzati per Spazi e Proprietà',
  legalName: 'Ziranu Arredi S.r.l.', // segnaposto
  description:
    'Traslochi, montaggio e smontaggio mobili, installazioni, smaltimenti e depositi. Una sola squadra per spostare, allestire e custodire ciò che dà valore ai tuoi spazi.',
  vat: 'IT00000000000', // segnaposto
  founded: 2009, // segnaposto
  phone: { label: '+39 000 000 0000', href: 'tel:+390000000000' }, // segnaposto
  whatsapp: 'https://wa.me/390000000000', // segnaposto
  email: 'info@example.it', // segnaposto
  address: {
    street: 'Via dell’Esempio 12',
    zip: '00000',
    city: 'Città',
    province: 'PR',
    region: 'Regione',
  },
  hours: [
    { days: 'Lun – Ven', time: '8:00 – 18:30' },
    { days: 'Sabato', time: '8:00 – 13:00' },
    { days: 'Domenica', time: 'Su appuntamento' },
  ],
  area: 'Città, provincia e tutta la regione. Trasferimenti nazionali su richiesta.',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
} as const;

/** Voci del menu principale, nell'ordine in cui appaiono. */
export const NAV = [
  { href: '/servizi', label: 'Servizi' },
  { href: '/lavori', label: 'Lavori' },
  { href: '/chi-siamo', label: 'La ditta' },
  { href: '/blog', label: 'Guide' },
  { href: '/contatti', label: 'Contatti' },
] as const;

export const QUOTE_HREF = '/preventivo';

/** Numeri in evidenza, la "legenda" della home (segnaposto: confermare con il cliente). */
export const STATS = [
  { value: 2400, suffix: '', label: 'Lavori consegnati', note: 'Case, uffici, hotel, negozi' },
  { value: 15, suffix: '+', label: 'Anni di cantieri', note: 'Dal 2009' },
  { value: 600, suffix: 'm²', label: 'Deposito custodito', note: 'Asciutto e videosorvegliato' },
  { value: 24, suffix: 'h', label: 'Per un preventivo scritto', note: 'Nei giorni lavorativi' },
] as const;

/** Impegni dichiarati in hero e nel preventivo (segnaposto). */
export const PROMISES = [
  { title: 'Sopralluogo gratuito', text: 'In presenza o in videochiamata' },
  { title: 'Preventivo in 24 ore', text: 'Scritto, voce per voce' },
  { title: 'Merce assicurata', text: 'Dal primo all’ultimo collo' },
] as const;
