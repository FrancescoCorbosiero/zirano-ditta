/* =====================================================================
   Dati della ditta — TUTTO SEGNAPOSTO.
   Nome, contatti, numeri e zone vanno confermati con il cliente prima
   della messa online. Il sito legge solo da qui: si cambia in un punto.
   ===================================================================== */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.it').replace(/\/$/, '');

export const SITE = {
  name: 'Zirano Arredi',
  payoff: 'Servizi avanzati per Spazi e Proprietà',
  legalName: 'Zirano Arredi S.r.l.', // segnaposto
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

/** Numeri in evidenza (segnaposto: confermare con il cliente). */
export const STATS = [
  { value: 15, suffix: '+', label: 'anni di cantieri', note: 'dal 2009' },
  { value: 2400, suffix: '', label: 'lavori consegnati', note: 'case, uffici, negozi' },
  { value: 600, suffix: ' m²', label: 'di deposito custodito', note: 'videosorvegliato' },
  { value: 24, suffix: ' h', label: 'per il tuo preventivo', note: 'giorni lavorativi' },
] as const;

/** Impegni dichiarati in hero e nel preventivo (segnaposto). */
export const PROMISES = [
  { title: 'Sopralluogo gratuito', text: 'In presenza o in videochiamata' },
  { title: 'Preventivo in 24 ore', text: 'Scritto, voce per voce' },
  { title: 'Merce assicurata', text: 'Dal primo all’ultimo collo' },
] as const;

/** Recensioni — TESTI D'ESEMPIO, da sostituire con quelle vere. */
export const TESTIMONIALS = [
  {
    quote: 'Hanno smontato, trasferito e rimontato una cucina intera in due giorni. Al terzo ci cucinavamo come se fosse sempre stata lì.',
    name: 'Cliente privato',
    context: 'Trasloco e rimontaggio cucina',
  },
  {
    quote: 'Trasferimento di quaranta postazioni in un fine settimana. Lunedì mattina ogni scrivania aveva il suo cavo al posto giusto.',
    name: 'Studio professionale',
    context: 'Trasloco ufficio',
  },
  {
    quote: 'Puntuali, ordinati, silenziosi. Il deposito ci ha permesso di ristrutturare senza un mobile tra i piedi.',
    name: 'Cliente privato',
    context: 'Deposito durante ristrutturazione',
  },
] as const;
