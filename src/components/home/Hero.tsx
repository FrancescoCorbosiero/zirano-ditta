import Button from '@/components/ui/Button';
import ClientStrip from '@/components/trust/ClientStrip';
import { QUOTE_HREF } from '@/lib/site';
import FloorPlan from './FloorPlan';

/**
 * La hero, sull'asse centrale: il titolo, una riga sola di testo, i due
 * bottoni; sotto, la planimetria che si disegna e si inclina; al piede, i
 * nomi dei clienti. La tavola è misurata sull'altezza dello schermo, così
 * titolo, pianta e clienti stanno insieme nel primo colpo d'occhio.
 */
export default function Hero() {
  return (
    <section data-hero className="tone-dark relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="grid-plan grid-plan-c" />
      {/* bagliore caldo dietro la pianta, come una lampada da tavolo sul disegno */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] h-[90vh] w-[110vw] -translate-x-1/2 opacity-80"
        style={{ background: 'radial-gradient(closest-side, rgb(181 138 82 / 0.17), transparent 72%)' }}
      />

      <div data-hero-text className="wrap relative z-10 pt-[clamp(112px,14vh,160px)] text-center">
        <h1 className="display mx-auto !text-[clamp(2.55rem,6vw,6.4rem)]" data-split>
          Traslochi e montaggi.
          <br />
          Installazioni e depositi.
        </h1>
        <p className="lead mx-auto mt-6 max-w-[34ch] sm:max-w-[62ch]" data-hero-fade>
          Una sola squadra per case, uffici e negozi. Da Meda, in Brianza e a Milano.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3" data-hero-fade>
          <Button href={QUOTE_HREF} variant="brass" magnetic>
            Richiedi un preventivo
          </Button>
          <Button href="/lavori" variant="glass">
            Guarda i lavori
          </Button>
        </div>
      </div>

      {/* La tavola, sotto i bottoni: l'angolo più lontano arriva quasi a toccarli. */}
      <div className="relative mx-auto -mt-[4vh] w-[min(940px,130vw,max(620px,115svh))] max-w-none sm:-mt-[8vh]">
        <FloorPlan />
      </div>

      {/* I clienti al piede: la tavola sfuma sotto i loro nomi. */}
      <div className="relative z-10 mt-auto">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full h-24 bg-gradient-to-t from-notte to-transparent" />
        <div className="bg-notte">
          <ClientStrip />
        </div>
      </div>
    </section>
  );
}
