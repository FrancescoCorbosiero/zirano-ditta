import PageHero from '@/components/ui/PageHero';
import QuoteFlow from '@/components/quote/QuoteFlow';
import { pageMeta } from '@/lib/seo';
import { PROMISES, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Richiedi un preventivo',
  description: 'Preventivo gratuito per traslochi, montaggi, installazioni, smaltimenti e depositi. Cinque domande, risposta entro un giorno lavorativo.',
  path: '/preventivo',
});

export default async function PreventivoPage({ searchParams }: { searchParams: Promise<{ servizio?: string }> }) {
  const { servizio = '' } = await searchParams;
  return (
    <>
      <PageHero
        n="07"
        label="Preventivo gratuito"
        trail={[{ name: 'Preventivo', href: '/preventivo' }]}
        title={
          <>
            Cinque domande, <em>una cifra chiara.</em>
          </>
        }
      >
        <p className="lead">Raccontaci il lavoro: ti richiamiamo entro un giorno lavorativo. Se preferisci la voce, chiamaci al {SITE.phone.label}.</p>
      </PageHero>
      <section className="section !pt-[clamp(40px,5vw,72px)]">
        <div className="wrap">
          <QuoteFlow service={servizio} />
          <ul className="mt-10 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3" data-reveal>
            {PROMISES.map((p) => (
              <li key={p.title} className="bg-gesso px-6 py-5">
                <span className="block font-[560]">{p.title}</span>
                <span className="mt-1 block text-[14px] text-[var(--fg-mute)]">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
