'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Button, Checkbox, Chip, List, ListInput, ListItem, Stepper, Toggle } from 'konsta/react';
import { Check } from 'lucide-react';
import {
  QUOTE_AREAS,
  QUOTE_EXTRAS,
  QUOTE_PROPERTY,
  QUOTE_SERVICES,
  QUOTE_STEPS,
  QUOTE_WHEN,
  emptyDraft,
  validateDraft,
  type FieldErrors,
  type QuoteDraft,
} from '@/lib/quote';
import { SERVICES } from '@/lib/services';
import { SITE } from '@/lib/site';
import { pad } from '@/lib/works';

/* =====================================================================
   Il preventivo — modulo a passi costruito con Konsta UI (tema iOS):
   List/ListInput per i campi, Chip per le scelte, Stepper e
   Toggle per piano e ascensore. Campi e regole stanno in src/lib/quote.ts
   (condivisi con il server). La struttura è volutamente semplice: i
   parametri definitivi si decidono con il cliente.
   ===================================================================== */

const STORE = 'z-preventivo';
const listProps = { strongIos: true, insetIos: true, dividersIos: true, className: '!m-0' } as const;
const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
const labelOf = (list: readonly { value: string; label: string }[], v: string) => list.find((o) => o.value === v)?.label ?? '';

/** L'etichetta di un ListInput legata al suo campo (Konsta disegna un div, che non nomina niente). */
const fieldLabel = (htmlFor: string, text: string, optional = false) => (
  <label htmlFor={htmlFor}>
    {text}
    {optional && <span className="font-normal opacity-60"> · facoltativo</span>}
  </label>
);

function GroupTitle({ id, children, hint }: { id?: string; children: ReactNode; hint?: string }) {
  return (
    <div className="mb-2.5 mt-7 flex items-baseline justify-between gap-3 first:mt-0">
      <h4 id={id} className="text-[15px] font-[600] tracking-[-0.01em] text-grafite">
        {children}
      </h4>
      {hint && <span className="text-[12.5px] text-grafite-mute">{hint}</span>}
    </div>
  );
}

function ChipGroup({ labelledBy, options, values, onToggle }: { labelledBy: string; options: readonly string[]; values: string[]; onToggle: (v: string) => void }) {
  return (
    <div role="group" aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = values.includes(o);
        return (
          <Chip
            key={o}
            component="button"
            {...({ type: 'button' } as object)}
            outline={!on}
            aria-pressed={on}
            onClick={() => onToggle(o)}
            media={on ? <Check size={14} strokeWidth={2.4} aria-hidden /> : undefined}
            className={`!m-0 !h-10 !rounded-[3px] !px-3.5 !text-[14.5px] !font-[540] transition-colors duration-200 ${
              on ? '!bg-grafite !text-gelo' : '!border-grafite/20 !bg-white/70 !text-grafite'
            }`}
          >
            {o}
          </Chip>
        );
      })}
    </div>
  );
}

/** Il riepilogo che si compila mentre rispondi: il "cartiglio" della richiesta. */
function Summary({ draft }: { draft: QuoteDraft }) {
  const rows: [string, string][] = [
    ['Servizio', labelOf(QUOTE_SERVICES, draft.service)],
    ['Ambienti', draft.areas.join(', ')],
    ['Luogo', [draft.city, draft.property && labelOf(QUOTE_PROPERTY, draft.property)].filter(Boolean).join(' · ')],
    ['Piano', draft.city ? `${draft.floor === 0 ? 'Terra' : `${draft.floor}°`}${draft.elevator ? ' · ascensore' : ''}` : ''],
    ['Accessori', draft.extras.map((e) => labelOf(QUOTE_EXTRAS, e)).join(', ')],
    ['Quando', labelOf(QUOTE_WHEN, draft.when)],
  ];
  return (
    <aside className="glass sticky top-28 hidden self-start p-6 lg:block" aria-label="Riepilogo della richiesta">
      <p className="text-[15px] font-[600] tracking-[-0.01em] text-grafite">La tua richiesta</p>
      <dl className="mt-5">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[92px_1fr] gap-3 border-t border-[var(--line)] py-3 text-[14.5px]">
            <dt className="meta pt-0.5 text-grafite-mute">{k}</dt>
            <dd className={`transition-colors duration-500 ${v ? 'text-grafite' : 'text-grafite-mute/50'}`}>{v || '—'}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-[var(--line)] pt-4 text-[13px] leading-snug text-grafite-mute">
        Nessun impegno. Ti richiamiamo entro un giorno lavorativo per fissare il sopralluogo.
      </p>
    </aside>
  );
}

export default function QuoteFlow({
  service = '',
  variant = 'page',
  onClose,
}: {
  service?: string;
  variant?: 'page' | 'popup';
  onClose?: () => void;
}) {
  const uid = useId();
  const initial = SERVICES.some((s) => s.slug === service) ? (service as QuoteDraft['service']) : '';
  const [draft, setDraft] = useState<QuoteDraft>(() => emptyDraft(initial));
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const top = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  // La bozza resta nella scheda del browser: chiudere il popup non la perde.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORE) || 'null') as QuoteDraft | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lettura una tantum da sessionStorage dopo l'idratazione
      if (saved) setDraft((d) => ({ ...d, ...saved, service: initial || saved.service, privacy: false, website: '' }));
    } catch {}
    restored.current = true;
  }, [initial]);
  useEffect(() => {
    if (!restored.current) return;
    try {
      sessionStorage.setItem(STORE, JSON.stringify(draft));
    } catch {}
  }, [draft]);

  const set = <K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const current = QUOTE_STEPS[step]!;
  const last = step === QUOTE_STEPS.length - 1;

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    requestAnimationFrame(() => top.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  };

  const submit = async () => {
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/preventivo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors };
      if (!res.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || 'Invio non riuscito.');
      }
      setStatus('done');
      try {
        sessionStorage.removeItem(STORE);
      } catch {}
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Invio non riuscito.');
      setStatus('error');
    }
  };

  const next = () => {
    const found = validateDraft(draft, current.fields);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (last) void submit();
    else go(step + 1);
  };

  if (status === 'done') {
    return (
      <div className="quote-flow grid place-items-center px-6 py-20 text-center" role="status">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
          <rect x="1" y="1" width="70" height="70" stroke="var(--color-ottone)" strokeWidth="1.5" className="check-draw" pathLength={1} />
          <path d="M21 37.5 31.5 48 52 25" stroke="currentColor" strokeWidth="2.5" className="check-draw" pathLength={1} style={{ animationDelay: '0.6s' }} />
        </svg>
        <h3 className="h3 mt-8">Richiesta ricevuta, {draft.name.split(' ')[0]}.</h3>
        <p className="mt-3 max-w-[40ch] text-grafite-soft">
          Ti richiamiamo al {draft.phone} entro un giorno lavorativo per fissare il sopralluogo e prepararti il preventivo scritto.
        </p>
        {onClose && (
          <Button onClick={onClose} large className="mt-8 !w-auto !rounded-[3px] !px-8">
            Torna al sito
          </Button>
        )}
      </div>
    );
  }

  const id = (name: string) => `${uid}-${name}`;

  const form = (
    <div className="quote-flow flex min-h-0 flex-1 flex-col">
      {/* Testata: passo corrente e avanzamento come una linea di quota */}
      <div ref={top} className="scroll-mt-28 px-5 pt-5 sm:px-7">
        <div className="flex items-center gap-4">
          <span className="meta text-grafite-mute">
            {pad(step + 1)} / {pad(QUOTE_STEPS.length)}
          </span>
          <ol className="grid flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${QUOTE_STEPS.length}, 1fr)` }} aria-hidden>
            {QUOTE_STEPS.map((s, i) => (
              <li key={s.id} className={`h-[3px] transition-colors duration-500 ${i <= step ? 'bg-grafite' : 'bg-grafite/12'}`} />
            ))}
          </ol>
        </div>
        <h3 className="h3 mt-5" aria-live="polite">
          {current.title}
        </h3>
      </div>

      <div key={step} className="step-in flex-1 px-5 pb-6 pt-6 sm:px-7" style={{ '--dir': dir } as React.CSSProperties}>
        {current.id === 'servizio' && (
          <div role="radiogroup" aria-label="Servizio" className="grid grid-cols-2 gap-2.5">
            {QUOTE_SERVICES.map((o) => {
              const on = draft.service === o.value;
              const code = SERVICES.find((s) => s.slug === o.value)?.code ?? '··';
              return (
                <button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => set('service', o.value)}
                  className={`relative grid min-h-[104px] content-between rounded-[3px] border p-4 text-left transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.98] ${
                    on ? 'border-grafite bg-grafite text-gelo' : 'border-grafite/15 bg-white/70 text-grafite hover:border-grafite/50'
                  }`}
                >
                  <span className={`meta ${on ? 'text-ottone-soft' : 'text-grafite-mute'}`}>{code}</span>
                  <span className="text-[16px] font-[560] leading-tight tracking-[-0.01em]">{o.label}</span>
                  {on && <Check size={16} strokeWidth={2.2} className="absolute right-3.5 top-3.5 text-ottone-soft" aria-hidden />}
                </button>
              );
            })}
            {errors.service && (
              <p role="alert" className="col-span-2 text-[13.5px] text-red-700">
                {errors.service}
              </p>
            )}
          </div>
        )}

        {current.id === 'dove' && (
          <>
            <GroupTitle id={id('areas')} hint="Anche più di uno">
              Ambienti coinvolti
            </GroupTitle>
            <ChipGroup labelledBy={id('areas')} options={QUOTE_AREAS} values={draft.areas} onToggle={(v) => set('areas', toggle(draft.areas, v))} />
            <GroupTitle id={id('property')} hint="Facoltativo">
              Tipo di immobile
            </GroupTitle>
            <ChipGroup
              labelledBy={id('property')}
              options={QUOTE_PROPERTY.map((o) => o.label)}
              values={[labelOf(QUOTE_PROPERTY, draft.property)]}
              onToggle={(l) => {
                const v = QUOTE_PROPERTY.find((o) => o.label === l)?.value ?? '';
                set('property', draft.property === v ? '' : v);
              }}
            />
          </>
        )}

        {current.id === 'luogo' && (
          <>
            <List {...listProps}>
              <ListInput
                label={fieldLabel(id('city'), 'Comune')}
                inputId={id('city')}
                type="text"
                placeholder="Dove si svolge il lavoro"
                autoComplete="address-level2"
                value={draft.city}
                error={errors.city}
                onChange={(e) => set('city', e.target.value)}
              />
              <ListInput
                label={fieldLabel(id('address'), 'Indirizzo', true)}
                inputId={id('address')}
                type="text"
                placeholder="Via e numero civico"
                autoComplete="street-address"
                value={draft.address}
                onChange={(e) => set('address', e.target.value)}
              />
              {draft.service === 'traslochi' && (
                <ListInput
                  label={fieldLabel(id('destination'), 'Destinazione', true)}
                  inputId={id('destination')}
                  type="text"
                  placeholder="Comune di arrivo"
                  value={draft.destination}
                  onChange={(e) => set('destination', e.target.value)}
                />
              )}
            </List>
            <List {...listProps} className="!mx-0 !mb-0 !mt-4">
              <ListItem
                title="Piano"
                after={
                  <span className="flex items-center gap-3">
                    <span className="meta w-12 text-right text-grafite">{draft.floor === 0 ? 'Terra' : `${draft.floor}°`}</span>
                    <Stepper
                      small
                      outline
                      buttonsOnly
                      value={draft.floor}
                      onMinus={() => set('floor', Math.max(0, draft.floor - 1))}
                      onPlus={() => set('floor', Math.min(40, draft.floor + 1))}
                    />
                  </span>
                }
              />
              <ListItem label title="Ascensore" after={<Toggle checked={draft.elevator} onChange={(e) => set('elevator', e.target.checked)} />} />
            </List>
          </>
        )}

        {current.id === 'extra' && (
          <>
            <List {...listProps}>
              {QUOTE_EXTRAS.map((x) => (
                <ListItem
                  key={x.value}
                  label
                  title={x.label}
                  text={x.hint}
                  after={<Toggle checked={draft.extras.includes(x.value)} onChange={() => set('extras', toggle(draft.extras, x.value))} />}
                />
              ))}
            </List>
            <GroupTitle id={id('when')} hint="Facoltativo">
              Quando
            </GroupTitle>
            <ChipGroup
              labelledBy={id('when')}
              options={QUOTE_WHEN.map((w) => w.label)}
              values={[labelOf(QUOTE_WHEN, draft.when)]}
              onToggle={(l) => {
                const v = QUOTE_WHEN.find((w) => w.label === l)?.value ?? '';
                set('when', draft.when === v ? '' : v);
              }}
            />
            <List {...listProps} className="!mx-0 !mb-0 !mt-6">
              <ListInput
                label={fieldLabel(id('notes'), 'Note', true)}
                inputId={id('notes')}
                type="textarea"
                placeholder="Misure, mobili particolari, vincoli di orario…"
                inputClassName="!h-24 resize-none"
                value={draft.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
            </List>
          </>
        )}

        {current.id === 'contatti' && (
          <>
            <List {...listProps}>
              <ListInput label={fieldLabel(id('name'), 'Nome e cognome')} inputId={id('name')} type="text" autoComplete="name" placeholder="Come ti chiami" value={draft.name} error={errors.name} onChange={(e) => set('name', e.target.value)} />
              <ListInput label={fieldLabel(id('phone'), 'Telefono')} inputId={id('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="Per richiamarti" value={draft.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
              <ListInput label={fieldLabel(id('email'), 'Email', true)} inputId={id('email')} type="email" inputMode="email" autoComplete="email" placeholder="Per il preventivo scritto" value={draft.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
            </List>
            {/* Campo trappola per i bot: fuori schermo, non raggiungibile da tastiera. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={draft.website} onChange={(e) => set('website', e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />
            <List {...listProps} className="!mx-0 !mb-0 !mt-4">
              <ListItem
                label
                media={<Checkbox checked={draft.privacy} onChange={(e) => set('privacy', e.target.checked)} />}
                title={
                  <span className="text-[14.5px] leading-snug">
                    Acconsento al trattamento dei dati per essere ricontattato.{' '}
                    <Link href="/privacy" target="_blank" className="underline underline-offset-2">
                      Informativa
                    </Link>
                  </span>
                }
                titleWrapClassName="!whitespace-normal"
              />
            </List>
            {errors.privacy && (
              <p role="alert" className="mt-2 px-1 text-[13.5px] text-red-700">
                {errors.privacy}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="mt-4 rounded-[3px] border border-red-700/30 bg-red-50 px-4 py-3 text-[14px] text-red-800">
                {serverError} In alternativa chiamaci al{' '}
                <a href={SITE.phone.href} className="underline">
                  {SITE.phone.label}
                </a>
                .
              </p>
            )}
          </>
        )}
      </div>

      {/* Piede: indietro e avanti */}
      <div
        className={`flex items-center gap-3 border-t border-grafite/10 px-5 py-4 sm:px-7 ${
          variant === 'popup' ? 'sticky bottom-0 bg-gesso/85 pb-[calc(env(safe-area-inset-bottom)+16px)] backdrop-blur-xl' : ''
        }`}
      >
        {step > 0 && (
          <Button clear large onClick={() => go(step - 1)} className="!w-auto !rounded-[3px] !px-5 !text-grafite">
            Indietro
          </Button>
        )}
        <Button large onClick={next} disabled={status === 'sending'} className="!ml-auto !w-auto !min-w-[168px] !rounded-[3px] !px-7">
          {last ? (status === 'sending' ? 'Invio in corso…' : 'Invia la richiesta') : 'Continua'}
        </Button>
      </div>
    </div>
  );

  if (variant === 'popup') return form;
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="glass flex min-h-[520px] flex-col overflow-hidden">{form}</div>
      <Summary draft={draft} />
    </div>
  );
}
