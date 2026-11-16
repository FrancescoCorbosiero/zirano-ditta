import Button from '@/components/ui/Button';
import Media from '@/components/ui/Media';
import PageHero from '@/components/ui/PageHero';
import SectionHead from '@/components/ui/SectionHead';
import { Method } from '@/components/home/Sections';
import { pageMeta } from '@/lib/seo';
import { QUOTE_HREF, SITE, STATS } from '@/lib/site';
import { pad } from '@/lib/works';

export const metadata = pageMeta({
  title: 'La ditta',
  description: `Chi è ${SITE.name}: una squadra di traslocatori, montatori e installatori che lavora con il metodo di un cantiere e la cura di un artigiano.`,
  path: '/chi-siamo',
});

/* Testi segnaposto: storia, valori e numeri vanno scritti con il cliente. */
const VALUES = [
  { title: 'Misurare due volte', text: 'Ogni lavoro parte da un rilievo. Ciò che si misura prima non si improvvisa dopo.' },
  { title: 'Proteggere tutto', text: 'Pavimenti, spigoli, ascensori, parti comuni. Lasciamo gli spazi come li abbiamo trovati, o meglio.' },
  { title: 'Un solo referente', text: 'Dal preventivo alla consegna parli con la stessa persona, che conosce il tuo lavoro.' },
  { title: 'Dire le cose come stanno', text: 'Tempi e costi scritti. Se qualcosa cambia, lo sai prima che accada.' },
];

const TIMELINE = [
  { year: '2009', text: 'Un furgone, due persone, i primi traslochi in città.' },
  { year: '2014', text: 'Nasce la squadra di montaggio: cucine, armadi, camere.' },
  { year: '2018', text: 'Apre il deposito: 600 m² asciutti e sorvegliati.' },
  { year: '2022', text: 'Autoscala di proprietà e reparto installazioni.' },
  { year: 'Oggi', text: 'Una squadra stabile al servizio di case, studi e negozi.' },
];

export default function ChiSiamoPage() {
  return (
    <>
      <PageHero
        n="01"
        label="La ditta"
        trail={[{ name: 'La ditta', href: '/chi-siamo' }]}
        title={
          <>
            Mani esperte, <em>metodo da cantiere.</em>
          </>
        }
      >
        <p className="lead">
          {SITE.name} è una squadra di traslocatori, montatori e installatori. Lavoriamo sugli spazi degli altri come se fossero i nostri.
        </p>
      </PageHero>

      <section className="tone-dark pb-[clamp(64px,8vw,120px)]">
        <div className="wrap">
          <Media name="trasloco" ratio="21 / 9" parallax={1} priority sizes="100vw" className="max-sm:!aspect-[4/3]" />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <p className="tav self-start lg:col-span-3" data-reveal>
            Storia <b>— dal {SITE.founded}</b>
          </p>
          <div className="lg:col-span-9">
            <p className="h2 !leading-[1.06]" data-scrub-text>
              Abbiamo cominciato portando scatoloni. Poi ci hanno chiesto di rimontare ciò che avevamo smontato, di appendere ciò che avevamo trasportato, di custodire ciò che non entrava. Oggi
              facciamo tutto questo con un’unica squadra.
            </p>
            <ol className="mt-16 border-t border-[var(--line-strong)]" data-reveal="stagger">
              {TIMELINE.map((t) => (
                <li key={t.year} className="grid grid-cols-[88px_1fr] items-baseline gap-6 border-b border-[var(--line)] py-5 sm:grid-cols-[160px_1fr]">
                  <span className="text-[clamp(1.3rem,2.2vw,1.8rem)] font-[480] tracking-[-0.03em]" style={{ fontStretch: '112%' }}>
                    {t.year}
                  </span>
                  <span className="text-[var(--fg-soft)]">{t.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="wrap">
          <SectionHead
            n="02"
            label="Come lavoriamo"
            title={
              <>
                Quattro regole <em>che non cambiano.</em>
              </>
            }
          />
          <ul className="mt-[clamp(48px,6vw,88px)] grid gap-px bg-[var(--line)] sm:grid-cols-2" data-reveal="stagger">
            {VALUES.map((v, i) => (
              <li key={v.title} className="bg-carta p-7 lg:p-10">
                <span className="mono text-[var(--accent)]">{pad(i + 1)}</span>
                <h3 className="h3 mt-10">{v.title}</h3>
                <p className="mt-3 max-w-[40ch] text-[var(--fg-soft)]">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tone-dark section">
        <div className="wrap grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="crop lg:col-span-6">
            <Media name="deposito" ratio="5 / 4" parallax={1} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="tav" data-reveal>
              Tav. 03 <b>— Numeri</b>
            </p>
            <h2 className="h2 mt-6" data-split>
              Quello che <em>possiamo contare.</em>
            </h2>
            <dl className="mt-10 grid grid-cols-2 gap-x-8" data-reveal="stagger">
              {STATS.map((s) => (
                <div key={s.label} className="border-t border-[var(--line)] py-6">
                  <dd className="text-[clamp(2rem,3.6vw,3.2rem)] font-[440] leading-none tracking-[-0.04em]" style={{ fontStretch: '112%' }}>
                    <span data-count={s.value}>{new Intl.NumberFormat('it-IT').format(s.value)}</span>
                    <span className="text-[0.5em] text-[var(--accent)]">{s.suffix}</span>
                  </dd>
                  <dt className="mt-3 text-[15px] text-[var(--fg-soft)]">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-8" data-reveal>
              <Button href={QUOTE_HREF} variant="brass">
                Lavoriamo insieme
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Method />
    </>
  );
}
