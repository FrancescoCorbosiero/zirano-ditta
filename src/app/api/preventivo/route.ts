import { NextResponse } from 'next/server';
import { deliverQuote } from '@/lib/delivery';
import { quoteSchema } from '@/lib/quote';
import { allow } from '@/lib/rateLimit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anon';
  if (!allow(ip)) {
    return NextResponse.json({ ok: false, error: 'Troppe richieste. Riprova tra qualche minuto o chiamaci.' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Richiesta non valida.' }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    // Il campo trappola compilato: rispondiamo "ok" senza consegnare nulla.
    if (parsed.error.issues.some((i) => i.path[0] === 'website')) return NextResponse.json({ ok: true });
    const fields = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    return NextResponse.json({ ok: false, error: 'Controlla i campi evidenziati.', fields }, { status: 422 });
  }

  try {
    await deliverQuote(parsed.data);
  } catch (err) {
    console.error('[preventivo] consegna fallita', err);
    return NextResponse.json({ ok: false, error: 'Non siamo riusciti a inviare la richiesta. Riprova o chiamaci.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
