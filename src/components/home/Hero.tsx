import Button from '@/components/ui/Button';
import { PROMISES, QUOTE_HREF } from '@/lib/site';
import FloorPlan from './FloorPlan';

export default function Hero() {
  return (
    <section data-hero className="tone-dark relative flex min-h-[100svh] flex-col overflow-hidden pt-[104px] lg:pt-[116px]">
      <div className="grid-plan" />
      {/* bagliore caldo dietro la pianta, come una lampada da tavolo sul disegno */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[8%] h-[80vh] w-[70vw] opacity-70"
        style={{ background: 'radial-gradient(closest-side, rgb(181 138 82 / 0.2), transparent 70%)' }}
      />

      <div className="wrap relative grid flex-1 items-center gap-y-6 lg:grid-cols-12">
        <div data-hero-text className="relative z-10 lg:col-span-7 xl:col-span-6">
          <p className="tav" data-hero-fade>
            Tav. 00 <b>— Traslochi · Montaggi · Installazioni · Depositi</b>
          </p>
          <h1 className="display mt-6 !text-[clamp(2.6rem,6.1vw,5.9rem)]" data-split>
            Ordine agli <em>spazi.</em>
            <br />
            Valore alle <em>proprietà.</em>
          </h1>
          <p className="lead mt-7" data-hero-fade>
            Spostiamo, montiamo, installiamo e custodiamo ciò che rende tuo uno spazio. Una sola squadra, dal sopralluogo all’ultima vite.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-hero-fade>
            <Button href={QUOTE_HREF} variant="brass" magnetic>
              Richiedi un preventivo
            </Button>
            <Button href="/lavori" variant="glass">
              Guarda i lavori
            </Button>
          </div>
        </div>

        <div className="relative -mx-[14%] -mt-4 lg:absolute lg:right-[-5vw] lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[min(56vw,900px)] lg:-translate-y-[54%]">
          <FloorPlan />
        </div>
      </div>

      {/* Gli impegni, su una lastra di vetro al piede della hero */}
      <div className="wrap relative z-10 pb-6 pt-8 lg:pb-8" data-hero-fade>
        <ul className="glass grid divide-y divide-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {PROMISES.map((p, i) => (
            <li key={p.title} className="flex items-baseline gap-4 px-5 py-4 lg:px-7 lg:py-5">
              <span className="mono text-[var(--accent)]">0{i + 1}</span>
              <span>
                <span className="block text-[15.5px] font-[560] leading-tight">{p.title}</span>
                <span className="mt-1 block text-[13.5px] text-[var(--fg-mute)]">{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
