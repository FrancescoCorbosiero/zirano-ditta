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
      <PageHero trail={[{ name: 'Lavori', href: '/lavori' }]} title="Lavori.">
        <p className="lead">Per ogni lavoro: luogo, tempi, squadra, risultato.</p>
        <p className="meta text-[var(--fg-mute)]">{WORKS.length} lavori in archivio</p>
      </PageHero>
      <section className="section !pt-[clamp(48px,6vw,88px)]">
        <div className="wrap">
          <WorksExplorer />
        </div>
      </section>
    </>
  );
}
