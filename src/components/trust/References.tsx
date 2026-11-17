import SectionHead from '@/components/ui/SectionHead';
import ClientWall from './ClientWall';
import Dossier from './Dossier';
import Rating from './Rating';

/**
 * Referenze — il cuore della fiducia, sull'asse centrale: chi ci ha scelto
 * (il muro dei clienti), cosa dice (il dossier) e la valutazione pubblica.
 */
export default function References() {
  return (
    <section id="referenze" className="section">
      <div className="wrap">
        <SectionHead align="center" size="display" title="Ci affidano i loro spazi." />
        <div className="mt-8 flex justify-center" data-reveal>
          <Rating />
        </div>
        <ClientWall className="mt-[clamp(56px,7vw,112px)]" />
        <Dossier className="mt-[clamp(96px,12vw,176px)]" />
      </div>
    </section>
  );
}
