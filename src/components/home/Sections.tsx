import Link from 'next/link';
import Image from 'next/image';
import Button, { Arrow } from '@/components/ui/Button';
import FaqList from '@/components/ui/FaqList';
import Media from '@/components/ui/Media';
import SectionHead from '@/components/ui/SectionHead';
import { FAQ_HOME } from '@/lib/faq';
import { media } from '@/lib/media';
import { SERVICES } from '@/lib/services';
import { STATS, TESTIMONIALS } from '@/lib/site';
import { WORKS, pad } from '@/lib/works';

/** Nastro dei servizi sotto la hero. */
export function ServiceMarquee() {
  const row = (hidden: boolean) => (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {SERVICES.map((s) => (
        <span key={s.slug} className="flex items-center gap-8 pr-8 text-[clamp(1.4rem,3vw,2.4rem)] font-[480] tracking-[-0.03em]" style={{ fontStretch: '114%' }}>
          {s.title}
          <span className="h-2 w-2 bg-ottone" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="tone-dark border-y border-[var(--line)] py-6">
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Tav. 01 — il manifesto: le parole si accendono leggendo. */
export function Manifesto() {
  return (
    <section className="section">
      <div className="wrap grid gap-x-12 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="tav" data-reveal>
            Tav. 01 <b>— La ditta</b>
          </p>
          <p className="h2 mt-8 !leading-[1.06]" data-scrub-text>
            Una casa è fatta di misure: la luce di una porta, l’altezza di un soffitto, i tre centimetri tra un armadio e la parete. Noi lavoriamo lì, in quei centimetri, dove un trasloco
            diventa ordine e un montaggio diventa casa.
          </p>
          <div className="mt-10" data-reveal>
            <Button href="/chi-siamo" variant="line">
              Conosci la ditta
            </Button>
          </div>
        </div>
        <div className="crop self-end lg:col-span-4">
          <Media name="squadra" ratio="4 / 5" parallax={1} sizes="(min-width: 1024px) 33vw, 100vw" />
        </div>
      </div>

      <div className="wrap mt-[clamp(64px,8vw,120px)]">
        <dl className="grid grid-cols-2 border-t border-[var(--line-strong)] lg:grid-cols-4" data-reveal="stagger">
          {STATS.map((s) => (
            <div key={s.label} className="border-b border-[var(--line)] py-7 pr-4 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0">
              <dd className="text-[clamp(2.4rem,5vw,4.4rem)] font-[440] leading-none tracking-[-0.045em]" style={{ fontStretch: '112%' }}>
                <span data-count={s.value}>{new Intl.NumberFormat('it-IT').format(s.value)}</span>
                <span className="text-[0.5em] text-[var(--accent)]">{s.suffix}</span>
              </dd>
              <dt className="mt-4 text-[15.5px] font-[540]">{s.label}</dt>
              <p className="mono mt-1.5 text-[var(--fg-mute)]">{s.note}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Tav. 02 — i servizi: un indice; al passaggio l'anteprima segue il puntatore. */
export function ServiceIndex({ n = '02', heading = true }: { n?: string; heading?: boolean }) {
  return (
    <section className="section bg-carta">
      <div className="wrap">
        {heading && (
          <SectionHead
            n={n}
            label="Servizi"
            title={
              <>
                Sei mestieri, <em>una squadra.</em>
              </>
            }
          >
            Un solo referente per tutto ciò che riguarda lo spazio: dal primo scatolone all’ultima mensola.
          </SectionHead>
        )}

        <div data-hover-list className={`relative ${heading ? 'mt-[clamp(48px,6vw,88px)]' : ''}`}>
          <ul className="border-t border-[var(--line-strong)]" data-reveal="stagger">
            {SERVICES.map((s, i) => (
              <li key={s.slug} data-hover-row className="border-b border-[var(--line)]">
                <Link href={`/servizi/${s.slug}`} className="group grid grid-cols-[44px_1fr_auto] items-baseline gap-x-4 py-6 lg:grid-cols-[72px_minmax(0,5fr)_minmax(0,5fr)_auto] lg:gap-x-8 lg:py-8">
                  <span className="mono text-[var(--fg-mute)]">{pad(i + 1)}</span>
                  <h3 className="h3 !text-[clamp(1.5rem,3.2vw,2.75rem)] !font-[480] transition-transform duration-700 ease-[var(--ease-out-expo)] lg:group-hover:translate-x-4">
                    {s.title}
                  </h3>
                  <p className="col-start-2 mt-2 max-w-[46ch] text-[15.5px] text-[var(--fg-soft)] lg:col-start-3 lg:mt-0">{s.short}</p>
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

/** Tav. 03 — i lavori: sezione agganciata, i progetti scorrono in orizzontale. */
export function WorksRail() {
  const works = WORKS.slice(0, 6);
  return (
    <section data-hscroll className="tone-dark relative flex flex-col justify-center overflow-hidden py-[clamp(72px,9vw,120px)] lg:h-screen lg:min-h-[720px] lg:py-0">
      <div className="wrap flex items-end justify-between gap-8">
        <div>
          <p className="tav" data-reveal>
            Tav. 03 <b>— I nostri lavori</b>
          </p>
          <h2 className="h2 mt-6" data-split>
            Prima il disegno, <em>poi la casa.</em>
          </h2>
        </div>
        <div className="hidden shrink-0 items-center gap-5 pb-2 lg:flex" aria-hidden>
          <span className="mono text-[var(--fg-mute)]">
            <span data-hcount className="text-[var(--fg)]">
              01
            </span>{' '}
            / {pad(works.length)}
          </span>
          <span className="block h-px w-40 bg-[var(--line-strong)]">
            <span data-hbar className="block h-full origin-left scale-x-0 bg-ottone" />
          </span>
        </div>
      </div>

      <div className="hscroll-view mt-[clamp(32px,4.5vh,64px)]">
        <ul className="hscroll-track">
          {works.map((w, i) => (
            <li key={w.slug} data-hpanel className="w-[82vw] shrink-0 sm:w-[60vw] lg:w-[min(56vw,820px)]">
              <Link href={`/lavori/${w.slug}`} data-cursor="Apri" className="group block">
                <div className="frame aspect-[16/10] lg:aspect-auto lg:h-[min(50vh,520px)]">
                  <Image src={media(w.cover).src} alt={media(w.cover).alt} fill sizes="(min-width: 1024px) 56vw, 82vw" unoptimized className="hpar" data-hpar />
                  <span className="tag-glass">
                    <span className="mono">{w.tags[0]}</span>
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5">
                  <span className="mono text-[var(--accent)]">{pad(i + 1)}</span>
                  <h3 className="h3">{w.title}</h3>
                  <span className="mono text-[var(--fg-mute)]">
                    <span className="max-sm:hidden">{w.place} · </span>
                    {w.year}
                  </span>
                  <p className="col-span-2 col-start-2 mt-2 max-w-[52ch] text-[15px] text-[var(--fg-soft)]">{w.summary}</p>
                </div>
              </Link>
            </li>
          ))}
          <li className="flex w-[70vw] shrink-0 items-center sm:w-[40vw] lg:w-[34vw] lg:pl-10">
            <div>
              <p className="h3 max-w-[14ch]">
                Ogni lavoro è una <em>tavola a sé.</em>
              </p>
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
  { title: 'Sopralluogo', text: 'Vediamo lo spazio, in presenza o in videochiamata. Misuriamo accessi, piani, volumi.' },
  { title: 'Preventivo', text: 'Entro ventiquattro ore ricevi una cifra scritta, voce per voce. Senza sorprese.' },
  { title: 'Lavoro', text: 'Squadra dedicata e un referente unico. Proteggiamo pavimenti, spigoli e parti comuni.' },
  { title: 'Consegna', text: 'Verifichiamo insieme il risultato. Imballi ritirati, spazio pronto da vivere.' },
];

/** Tav. 04 — il metodo: la linea si riempie e accende le fasi una alla volta. */
export function Method() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          n="04"
          label="Metodo"
          title={
            <>
              Quattro passaggi, <em>nessuna sorpresa.</em>
            </>
          }
        >
          Lavoriamo sempre nello stesso ordine. È il motivo per cui i tempi che promettiamo sono quelli che rispettiamo.
        </SectionHead>

        <div data-steps className="relative mt-[clamp(56px,7vw,104px)]">
          <div className="absolute left-[5px] top-0 h-full w-px bg-[var(--line)] lg:left-0 lg:top-[5px] lg:h-px lg:w-full">
            <div data-steps-line className="h-full w-full origin-top-left bg-ottone" />
          </div>
          <ol className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {METHOD.map((m, i) => (
              <li key={m.title} data-step className="relative pl-9 lg:pl-0 lg:pt-10">
                <span className="dot absolute left-0 top-1 block h-[11px] w-[11px] border border-ottone bg-ottone lg:top-0" />
                <span className="mono text-[var(--fg-mute)]">Fase {pad(i + 1)}</span>
                <h3 className="h3 mt-3">{m.title}</h3>
                <p className="mt-3 max-w-[34ch] text-[15.5px] text-[var(--fg-soft)]">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Tav. 05 — le voci dei clienti, su lastre di vetro sopra un'immagine. */
export function Voices() {
  return (
    <section className="tone-dark section overflow-hidden">
      <div className="absolute inset-0 opacity-40" aria-hidden>
        <div className="frame h-full w-full">
          <Image src={media('installazione').src} alt="" fill sizes="100vw" unoptimized className="plx" data-parallax="1" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-notte via-notte/60 to-notte" aria-hidden />
      <div className="wrap relative">
        <SectionHead
          n="05"
          label="Dicono di noi"
          title={
            <>
              Il lavoro migliore è quello che <em>non si nota.</em>
            </>
          }
        />
        <ul className="mt-[clamp(48px,6vw,88px)] grid gap-5 lg:grid-cols-3" data-reveal="stagger">
          {TESTIMONIALS.map((t, i) => (
            <li key={t.quote} data-tilt className="glass relative flex flex-col p-7 lg:p-8" style={{ marginTop: `${i * 28}px` }}>
              <span className="glare" />
              <span className="font-serif text-[64px] italic leading-[0.6] text-ottone" aria-hidden>
                “
              </span>
              <blockquote className="mt-2 flex-1 text-[18px] leading-[1.45] tracking-[-0.01em]">{t.quote}</blockquote>
              <footer className="mt-8 border-t border-[var(--line)] pt-4">
                <p className="text-[15px] font-[560]">{t.name}</p>
                <p className="mono mt-1 text-[var(--fg-mute)]">{t.context}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Tav. 06 — le domande più frequenti. */
export function FaqTeaser() {
  return (
    <section className="section">
      <div className="wrap grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="tav" data-reveal>
            Tav. 06 <b>— Domande</b>
          </p>
          <h2 className="h2 mt-7" data-split>
            Prima di <em>chiamarci.</em>
          </h2>
          <Link href="/faq" className="link-u mt-8" data-reveal>
            Tutte le domande <Arrow />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={FAQ_HOME} name="faq-home" />
        </div>
      </div>
    </section>
  );
}
