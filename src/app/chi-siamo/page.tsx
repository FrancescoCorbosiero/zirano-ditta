import Button from '@/components/ui/Button';
import Media from '@/components/ui/Media';
import PageHero from '@/components/ui/PageHero';
import SectionHead from '@/components/ui/SectionHead';
import { Figures, Method } from '@/components/home/Sections';
import ClientWall from '@/components/trust/ClientWall';
import { pageMeta } from '@/lib/seo';
import { QUOTE_HREF, SITE } from '@/lib/site';
import { pad } from '@/lib/works';

export const metadata = pageMeta({
  title: 'La ditta',
  description: `Chi è ${SITE.name}: una squadra di traslocatori, montatori e installatori a Meda, in Brianza.`,
  path: '/chi-siamo',
});

/* Testi segnaposto: storia, valori e numeri vanno scritti con il cliente. */
const VALUES = [
  { title: 'Rilievo', text: 'Ogni lavoro parte da un sopralluogo con le misure.' },
  { title: 'Protezioni', text: 'Pavimenti, spigoli, ascensori e parti comuni coperti prima di iniziare.' },
  { title: 'Un solo referente', text: 'Dal preventivo alla consegna parli con la stessa persona.' },
  { title: 'Tempi e costi scritti', text: 'Se qualcosa cambia, lo sai prima.' },
];

const TIMELINE = [
  { year: '2009', text: 'Un furgone, due persone, i primi traslochi in città.' },
  { year: '2014', text: 'Nasce la squadra di montaggio: cucine, armadi, camere.' },
  { year: '2018', text: 'Apre il deposito: 600 m² asciutti e sorvegliati.' },
  { year: '2022', text: 'Autoscala di proprietà e reparto installazioni.' },
  { year: 'Oggi', text: 'Una squadra stabile al servizio di case, studi, hotel e negozi.' },
];

export default function ChiSiamoPage() {
  return (
    <>
      <PageHero trail={[{ name: 'La ditta', href: '/chi-siamo' }]} title="La ditta.">
        <p className="lead">{SITE.name} è una squadra di traslocatori, montatori e installatori. A Meda dal {SITE.founded}.</p>
      </PageHero>

      <section className="tone-dark pb-[clamp(64px,8vw,120px)]">
        <div className="wrap">
          <Media name="trasloco" ratio="21 / 9" parallax={1} priority sizes="100vw" className="max-sm:!aspect-[4/3]" />
        </div>
      </section>

      {/* La storia: l'anno di fondazione fa da àncora, il racconto sta a destra. */}
      <section className="section">
        <div className="wrap grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28" data-reveal>
              <p className="meta text-[var(--fg-mute)]">Dal</p>
              <p className="legend-fig mt-2 !text-left !text-[clamp(4.5rem,11vw,10rem)]">{SITE.founded}</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="sr-only">La nostra storia</h2>
            <p className="h3 !text-[clamp(1.5rem,2.8vw,2.4rem)] !font-[460] !leading-[1.16]" data-scrub-text>
              Abbiamo cominciato portando scatoloni. Poi ci hanno chiesto di rimontare ciò che avevamo smontato, di appendere ciò che avevamo trasportato, di custodire ciò che non
              entrava. Oggi lo facciamo con un’unica squadra.
            </p>
            <ol className="mt-14 border-t border-[var(--line-strong)]" data-reveal="stagger">
              {TIMELINE.map((t) => (
                <li key={t.year} className="grid grid-cols-[88px_1fr] items-baseline gap-6 border-b border-[var(--line)] py-5 sm:grid-cols-[160px_1fr]">
                  <span className="num text-[clamp(1.3rem,2.2vw,1.8rem)] font-[480] tracking-[-0.03em]" style={{ fontStretch: '112%' }}>
                    {t.year}
                  </span>
                  <span className="text-[var(--fg-soft)]">{t.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead align="end" title="Come lavoriamo." />
          <ul className="mt-[clamp(48px,6vw,88px)] grid gap-px bg-[var(--line)] sm:grid-cols-2" data-reveal="stagger">
            {VALUES.map((v, i) => (
              <li key={v.title} className="bg-carta p-7 lg:p-10">
                <span className="meta text-[var(--accent)]">{pad(i + 1)}</span>
                <h3 className="h3 mt-10">{v.title}</h3>
                <p className="mt-3 max-w-[40ch] text-[var(--fg-soft)]">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tone-dark section">
        <div className="wrap">
          <SectionHead align="split" title="La ditta" titleEnd="in numeri." />
          <Figures className="mt-[clamp(48px,6vw,88px)]" />
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap">
          <SectionHead align="center" title="Clienti." />
          <ClientWall className="mt-[clamp(48px,6vw,88px)]" />
          <div className="mt-12 flex justify-center" data-reveal>
            <Button href={QUOTE_HREF} variant="brass" magnetic>
              Lavoriamo insieme
            </Button>
          </div>
        </div>
      </section>

      <Method />
    </>
  );
}
