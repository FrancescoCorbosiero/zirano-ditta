import { QUOTE_EXTRAS, QUOTE_PROPERTY, QUOTE_SERVICES, QUOTE_WHEN, type QuoteData } from './quote';

const label = (list: readonly { value: string; label: string }[], v: string) => list.find((o) => o.value === v)?.label ?? v;

/** La richiesta in testo leggibile: per email, webhook o log. */
export function formatQuote(q: QuoteData): string {
  const rows: [string, string][] = [
    ['Servizio', label(QUOTE_SERVICES, q.service)],
    ['Ambienti', q.areas.join(', ') || '—'],
    ['Immobile', q.property ? label(QUOTE_PROPERTY, q.property) : '—'],
    ['Indirizzo', q.address || '—'],
    ['Comune', q.city],
    ['Piano', `${q.floor === 0 ? 'Terra' : q.floor}${q.elevator ? ' · con ascensore' : ' · senza ascensore'}`],
    ['Destinazione', q.destination || '—'],
    ['Accessori', q.extras.map((e) => label(QUOTE_EXTRAS, e)).join(', ') || '—'],
    ['Quando', q.when ? label(QUOTE_WHEN, q.when) : '—'],
    ['Note', q.notes || '—'],
    ['Nome', q.name],
    ['Telefono', q.phone],
    ['Email', q.email || '—'],
  ];
  return rows.map(([k, v]) => `${k.padEnd(13)} ${v}`).join('\n');
}

/**
 * Consegna della richiesta. Punto unico da collegare al canale scelto con
 * il cliente (email transazionale, CRM, gestionale). Oggi: webhook se
 * configurato, altrimenti log del server.
 */
export async function deliverQuote(q: QuoteData): Promise<void> {
  const body = formatQuote(q);
  const hook = process.env.QUOTE_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `Nuova richiesta di preventivo\n\n${body}`, data: q }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return;
  }
  console.info(`[preventivo] nuova richiesta\n${body}`);
}
