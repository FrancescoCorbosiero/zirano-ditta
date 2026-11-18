import Link from 'next/link';
import Image from 'next/image';
import Button, { Arrow } from '@/components/ui/Button';
import Dim from '@/components/ui/Dim';
import FaqList from '@/components/ui/FaqList';
import SectionHead from '@/components/ui/SectionHead';
import { FAQ_HOME } from '@/lib/faq';
import { media } from '@/lib/media';
import { SERVICES } from '@/lib/services';
import { STATS } from '@/lib/site';
import { WORKS, pad } from '@/lib/works';

/** Le cifre grandi hanno sempre il punto delle migliaia (in italiano Intl lo omette sotto le 10.000). */
const nf = new Intl.NumberFormat('it-IT', { useGrouping: 'always' });

/**
 * La legenda dei numeri: la didascalia a sinistra, la misura a destra e in
 * mezzo una linea di quota. I numeri contano entrando a schermo.
 */
export function Figures({ className = '' }: { className?: string }) {
  return (
    <dl className={`legend ${className}`} data-reveal="stagger">
      {STATS.map((s) => (
        <div key={s.label} className="legend-row">
          <dt>
            <span>
              <span className="block text-[clamp(1.05rem,1.45vw,1.3rem)] font-[580] leading-tight tracking-[-0.012em]">{s.label}</span>
              <span className="mt-1.5 block text-[14.5px] leading-snug text-[var(--fg-mute)]">{s.note}</span>
            </span>
            <Dim />
          </dt>
          <dd className="legend-fig">
            <span data-count={s.value}>{nf.format(s.value)}</span>
            {s.suffix && <small>{s.suffix}</small>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Subito dopo la hero: i numeri, senza commento. */
export function Proof() {
  return (
    <section className="section">
      <div className="wrap">
        <h2 className="sr-only">La ditta in numeri</h2>
        <Figures />
        <div className="mt-9 flex justify-end" data-reveal>
          <Link href="/chi-siamo" className="link-u">
            Conosci la ditta <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** I servizi: un indice; al passaggio l'anteprima segue il puntatore. */
export function ServiceIndex({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section tone-paper">
      <div className="wrap">
        {heading && <SectionHead align="end" title="Servizi." />}

        <div data-hover-list className={`relative ${heading ? 'mt-[clamp(48px,6vw,88px)]' : ''}`}>
          <ul className="border-t border-[var(--line-strong)]" data-reveal="stagger">
            {SERVICES.map((s, i) => (
              <li key={s.slug} data-hover-row className="border-b border-[var(--line)]">
                <Link
                  href={`/servizi/${s.slug}`}
                  className="group grid grid-cols-[36px_1fr_auto] items-baseline gap-x-4 py-6 lg:grid-cols-[64px_minmax(0,6fr)_minmax(0,4fr)_auto] lg:gap-x-8 lg:py-7"
                >
                  <span className="meta text-[var(--fg-mute)]">{pad(i + 1)}</span>
                  <h3 className="h3 !text-[clamp(1.5rem,3.2vw,2.75rem)] !font-[480] transition-transform duration-700 ease-[var(--ease-out-expo)] lg:group-hover:translate-x-4">
                    {s.title}
                  </h3>
                  <p className="col-start-2 mt-2 max-w-[42ch] text-[15px] text-[var(--fg-soft)] lg:col-start-3 lg:mt-0">{s.short}</p>
                  <span className="col-start-3 row-start-1 grid h-10 w-10 place-items-center self-center border border-[var(--line-strong)] transition-colors duration-300 group-hover:border-ottone group-hover:bg-ottone lg:col-start-4">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* anteprima che segue il puntatore (solo mouse) */}
          <div data-hover-panel aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden aspect-[4/3] w-[340px] overflow-hidden shadow-2xl lg:block" style={{ opacity: 0 }}>
            {SERVICES.map((s) => (
              <div key={s.slug} data-hover-shot className="absolute inset-0" style={{ clipPath: 'inset(100% 0 0% 0)' }}>
                <Image src={media(s.image).src} alt="" fill sizes="340px" unoptimized className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * I lavori: sezione agganciata, i progetti scorrono in orizzontale. Sotto
 * ogni immagine, al posto del racconto, il cartiglio: i numeri del lavoro.
 */
export function WorksRail() {
  const works = WORKS.slice(0, 6);
  return (
    <section data-hscroll className="tone-dark relative flex flex-col justify-center overflow-hidden py-[clamp(72px,9vw,120px)] lg:h-screen lg:min-h-[740px] lg:py-0">
      <div className="wrap flex items-end justify-between gap-8">
        <div className="hidden shrink-0 items-center gap-5 pb-3 lg:flex" aria-hidden>
          <span className="meta text-[var(--fg-mute)]">
            <span data-hcount className="text-[var(--fg)]">
              01
            </span>{' '}
            / {pad(works.length)}
          </span>
          <span className="block h-px w-40 bg-[var(--line-strong)]">
            <span data-hbar className="block h-full origin-left scale-x-0 bg-ottone" />
          </span>
        </div>
        <h2 className="h2 ml-auto text-right" data-split>
          Lavori recenti
        </h2>
      </div>

      <div className="hscroll-view mt-[clamp(32px,4.5vh,60px)]">
        <ul className="hscroll-track">
          {works.map((w, i) => {
            const facts = w.sheet.filter((r) => r.label !== 'Luogo').slice(0, 3);
            return (
              <li key={w.slug} data-hpanel className="w-[84vw] shrink-0 sm:w-[60vw] lg:w-[min(56vw,820px)]">
                <Link href={`/lavori/${w.slug}`} data-cursor="Apri" className="group block">
                  <div className="frame aspect-[16/10] lg:aspect-auto lg:h-[min(46vh,500px)]">
                    <Image src={media(w.cover).src} alt={media(w.cover).alt} fill sizes="(min-width: 1024px) 56vw, 84vw" unoptimized className="hpar" data-hpar />
                    <span className="tag-glass">{w.tags[0]}</span>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-6">
                    <h3 className="h3">
                      <span className="meta mr-3 text-[var(--accent)]">{pad(i + 1)}</span>
                      {w.title}
                    </h3>
                    <span className="meta shrink-0 text-[var(--fg-mute)] max-sm:hidden">
                      {w.place} · {w.year}
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-3 border-t border-[var(--line)]">
                    {facts.map((f) => (
                      <div key={f.label} className="border-[var(--line)] pt-3 [&+&]:border-l [&+&]:pl-4">
                        <dt className="meta text-[var(--fg-mute)]">{f.label}</dt>
                        <dd className="mt-0.5 text-[15px] font-[580] tracking-[-0.01em]">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              </li>
            );
          })}
          <li className="flex w-[70vw] shrink-0 items-center sm:w-[42vw] lg:w-[30vw] lg:pl-10">
            <div>
              <p className="legend-fig !text-left !text-[clamp(4.5rem,9vw,8rem)]">{WORKS.length}</p>
              <p className="mt-4 max-w-[20ch] text-[17px] text-[var(--fg-soft)]">lavori in archivio, ognuno con luogo, tempi e squadra.</p>
              <Button href="/lavori" variant="brass" className="mt-7">
                Tutti i lavori
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

const METHOD = [
  { title: 'Sopralluogo', text: 'In presenza o in videochiamata. Misuriamo accessi, piani, volumi.' },
  { title: 'Preventivo', text: 'Entro 24 ore, scritto voce per voce.' },
  { title: 'Lavoro', text: 'Squadra dedicata, un referente unico, spazi protetti.' },
  { title: 'Consegna', text: 'Verifica insieme, imballi ritirati, spazio pronto.' },
];

/** Il metodo: la linea si riempie e accende le fasi una alla volta. */
export function Method() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead align="split" title="Come lavoriamo," titleEnd="in quattro passaggi." />

        <div data-steps className="relative mt-[clamp(56px,7vw,104px)]">
          <div className="absolute left-[5px] top-0 h-full w-px bg-[var(--line)] lg:left-0 lg:top-[5px] lg:h-px lg:w-full">
            <div data-steps-line className="h-full w-full origin-top-left bg-ottone" />
          </div>
          <ol className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {METHOD.map((m, i) => (
              <li key={m.title} data-step className="relative pl-9 lg:pl-0 lg:pt-10">
                <span className="dot absolute left-0 top-1 block h-[11px] w-[11px] border border-ottone bg-ottone lg:top-0" />
                <span className="meta text-[var(--fg-mute)]">{pad(i + 1)}</span>
                <h3 className="h3 mt-2">{m.title}</h3>
                <p className="mt-3 max-w-[30ch] text-[15.5px] text-[var(--fg-soft)]">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Le domande: l'elenco a sinistra, il titolo a destra (fermo mentre si legge). */
export function FaqTeaser() {
  return (
    <section className="section tone-paper">
      <div className="wrap grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:order-2 lg:col-span-4 lg:text-right">
          <div className="lg:sticky lg:top-28">
            <h2 className="h2" data-split>
              Domande frequenti.
            </h2>
            <Link href="/faq" className="link-u mt-8" data-reveal>
              Tutte le domande <Arrow />
            </Link>
          </div>
        </div>
        <div className="lg:order-1 lg:col-span-8">
          <FaqList items={FAQ_HOME} name="faq-home" />
        </div>
      </div>
    </section>
  );
}
