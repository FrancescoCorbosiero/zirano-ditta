import PageHero from '@/components/ui/PageHero';
import WorksExplorer from '@/components/works/WorksExplorer';
import { pageMeta } from '@/lib/seo';
import { WORKS } from '@/lib/works';

export const metadata = pageMeta({
  title: 'I nostri lavori',
  description: 'Traslochi, cucine, armadi, pareti attrezzate, depositi: una selezione dei lavori consegnati, con dati, tempi e foto prima e dopo.',
  path: '/lavori',
});

export default function LavoriPage() {
  return (
    <>
      <PageHero
        n="03"
        label="I nostri lavori"
        trail={[{ name: 'Lavori', href: '/lavori' }]}
        title={
          <>
            Ogni lavoro, <em>una tavola.</em>
          </>
        }
      >
        <p className="lead">Una selezione di ciò che abbiamo spostato, montato, installato e custodito. Per ognuno: luogo, tempi, squadra e risultato.</p>
        <p className="quota quota-start">
          <span>{WORKS.length} lavori in archivio</span>
        </p>
      </PageHero>
      <section className="section !pt-[clamp(48px,6vw,88px)]">
        <div className="wrap">
          <WorksExplorer />
        </div>
      </section>
    </>
  );
}
