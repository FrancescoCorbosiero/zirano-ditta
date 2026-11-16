import { z } from 'zod';

/* =====================================================================
   Richiesta di preventivo — campi e regole, condivisi tra modulo e server.
   Struttura provvisoria: i parametri definitivi (voci, obbligatorietà,
   eventuali fasce di prezzo) si decidono con il cliente. Per aggiungere
   una voce basta estendere le liste qui sotto: il modulo le legge da qui.
   ===================================================================== */

export const QUOTE_SERVICES = [
  { value: 'traslochi', label: 'Trasloco' },
  { value: 'montaggio-smontaggio', label: 'Montaggio / smontaggio' },
  { value: 'installazioni', label: 'Installazione' },
  { value: 'smaltimenti', label: 'Smaltimento / sgombero' },
  { value: 'depositi', label: 'Deposito' },
  { value: 'su-misura', label: 'Altro' },
] as const;

/** "Dove" si lavora: ambienti o porzioni dell'immobile. */
export const QUOTE_AREAS = [
  'Cucina',
  'Soggiorno',
  'Camera',
  'Cameretta',
  'Bagno',
  'Studio',
  'Cantina / box',
  'Intera casa',
  'Interi piani',
  'Ufficio',
  'Negozio / locale',
] as const;

export const QUOTE_PROPERTY = [
  { value: 'appartamento', label: 'Appartamento' },
  { value: 'casa', label: 'Casa / villa' },
  { value: 'ufficio', label: 'Ufficio' },
  { value: 'altro', label: 'Altro' },
] as const;

export const QUOTE_EXTRAS = [
  { value: 'deposito', label: 'Deposito temporaneo', hint: 'Custodiamo i tuoi beni tra un indirizzo e l’altro' },
  { value: 'imballaggio', label: 'Imballaggio completo', hint: 'Scatole, protezioni e imballo a cura nostra' },
  { value: 'smaltimento', label: 'Smaltimento del vecchio', hint: 'Ritiro e conferimento di ciò che non tieni' },
  { value: 'autoscala', label: 'Autoscala / piattaforma', hint: 'Per piani alti o scale strette' },
  { value: 'permessi', label: 'Permessi di sosta', hint: 'Occupazione del suolo pubblico' },
] as const;

export const QUOTE_WHEN = [
  { value: 'subito', label: 'Appena possibile' },
  { value: 'mese', label: 'Entro un mese' },
  { value: 'tre-mesi', label: 'Entro tre mesi' },
  { value: 'da-definire', label: 'Da definire' },
] as const;

const values = <T extends readonly { value: string }[]>(list: T) => list.map((o) => o.value) as [T[number]['value'], ...T[number]['value'][]];

const text = (max: number) => z.string().trim().max(max);

export const quoteSchema = z.object({
  // 1 · Servizio
  service: z.enum(values(QUOTE_SERVICES), { message: 'Scegli un servizio' }),
  // 2 · Dove
  areas: z.array(z.enum(QUOTE_AREAS)).max(QUOTE_AREAS.length).default([]),
  // 3 · Luogo
  property: z.enum(values(QUOTE_PROPERTY)).or(z.literal('')).default(''),
  address: text(160).default(''),
  city: text(80).min(2, 'Indica il comune'),
  floor: z.number().int().min(0).max(40).default(0),
  elevator: z.boolean().default(false),
  /** Solo traslochi: comune di destinazione. */
  destination: text(120).default(''),
  // 4 · Servizi accessori
  extras: z.array(z.enum(values(QUOTE_EXTRAS))).default([]),
  when: z.enum(values(QUOTE_WHEN)).or(z.literal('')).default(''),
  notes: text(2000).default(''),
  // 5 · Contatti
  name: text(80).min(2, 'Scrivi il tuo nome'),
  phone: text(30).regex(/^[+\d][\d\s./-]{5,}$/, 'Numero non valido'),
  email: z.union([z.literal(''), z.email('Email non valida')]).default(''),
  privacy: z.literal(true, { message: 'Serve il consenso per ricontattarti' }),
  /** Campo trappola: gli umani non lo vedono. */
  website: z.string().max(0).optional(),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

export type QuoteDraft = {
  service: QuoteData['service'] | '';
  areas: string[];
  property: string;
  address: string;
  city: string;
  floor: number;
  elevator: boolean;
  destination: string;
  extras: string[];
  when: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  privacy: boolean;
  website: string;
};

export const emptyDraft = (service: QuoteDraft['service'] = ''): QuoteDraft => ({
  service,
  areas: [],
  property: '',
  address: '',
  city: '',
  floor: 0,
  elevator: false,
  destination: '',
  extras: [],
  when: '',
  notes: '',
  name: '',
  phone: '',
  email: '',
  privacy: false,
  website: '',
});

/** I passi del modulo e i campi che ciascuno convalida. */
export const QUOTE_STEPS = [
  { id: 'servizio', title: 'Di cosa hai bisogno?', fields: ['service'] },
  { id: 'dove', title: 'Dove si lavora?', fields: ['areas'] },
  { id: 'luogo', title: 'Parlaci del luogo', fields: ['city'] },
  { id: 'extra', title: 'Servizi accessori', fields: [] },
  { id: 'contatti', title: 'Come ti ricontattiamo?', fields: ['name', 'phone', 'email', 'privacy'] },
] as const satisfies readonly { id: string; title: string; fields: readonly (keyof QuoteDraft)[] }[];

export type FieldErrors = Partial<Record<keyof QuoteDraft, string>>;

/** Errori del modulo, limitati ai campi indicati (o tutti). */
export function validateDraft(draft: QuoteDraft, only?: readonly (keyof QuoteDraft)[]): FieldErrors {
  const result = quoteSchema.safeParse(draft);
  if (result.success) return {};
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof QuoteDraft | undefined;
    if (!key || errors[key]) continue;
    if (only && !only.includes(key)) continue;
    errors[key] = issue.message;
  }
  return errors;
}
