import Link from 'next/link';
import Script from 'next/script';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/lib/services';
import { NAV, PROMISES, QUOTE_HREF, SITE } from '@/lib/site';
import { media } from '@/lib/media';
import Image from 'next/image';
import { LogoMark } from './Logo';

const year = new Date().getFullYear();

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="meta text-gelo-mute">{title}</p>
      <ul className="mt-5 grid gap-2.5 text-[15.5px]">{children}</ul>
    </div>
  );
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-gelo/75 transition-colors hover:text-gelo">
      {children}
    </Link>
  </li>
);

export default function SiteFooter() {
  return (
    <footer className="tone-dark relative overflow-hidden pb-[calc(env(safe-area-inset-bottom)+96px)] lg:pb-10">
      <div className="grid-plan grid-plan-c" />
      <div className="wrap relative">
        {/* Invito finale: la tavola del furgone sotto, il testo sull'asse centrale */}
        <div className="pt-[clamp(72px,9vw,128px)] pb-[clamp(56px,7vw,96px)]">
          <div className="cta-board frame">
            <Image src={media('trasloco').src} alt="" fill sizes="100vw" unoptimized className="plx" data-parallax="1" />
            <div className="flex flex-col items-center px-6 pt-[clamp(72px,10vw,150px)] pb-[clamp(48px,6vw,88px)] text-center">
              <h2 className="display max-w-[11ch]" data-split>
                Raccontaci lo spazio.
              </h2>
              <p className="lead mx-auto mt-7 text-gelo/80" data-reveal>
                Una foto, due misure, l’indirizzo. Al resto pensiamo noi: sopralluogo e preventivo gratuiti, risposta entro un giorno lavorativo.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal>
                <Button href={QUOTE_HREF} variant="brass" magnetic>
                  Richiedi un preventivo
                </Button>
                <Button href={SITE.phone.href} variant="line">
                  {SITE.phone.label}
                </Button>
              </div>
            </div>
            <div className="cta-promises bg-[rgb(11_13_15/0.6)]" data-reveal="stagger">
              {PROMISES.map((p, i) => (
                <div key={p.title} className="flex items-baseline gap-4">
                  <span className="meta num text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block text-[16px] font-[580] text-gelo">{p.title}</span>
                    <span className="meta mt-1 block text-gelo-mute">{p.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12" data-reveal="stagger">
          <div className="lg:col-span-4">
            <p className="max-w-[30ch] text-[15.5px] text-gelo/70">
              {SITE.name} — {SITE.payoff}.
            </p>
            <address className="meta mt-6 grid gap-1.5 not-italic text-gelo-mute">
              <span>
                {SITE.address.street}, {SITE.address.zip} {SITE.address.city} ({SITE.address.province})
              </span>
              <span>P. IVA {SITE.vat}</span>
            </address>
          </div>
          <div className="lg:col-span-3">
            <Col title="Servizi">
              {SERVICES.map((s) => (
                <A key={s.slug} href={`/servizi/${s.slug}`}>
                  {s.title}
                </A>
              ))}
            </Col>
          </div>
          <div className="lg:col-span-2">
            <Col title="Sito">
              {NAV.map((n) => (
                <A key={n.href} href={n.href}>
                  {n.label}
                </A>
              ))}
              <A href="/faq">Domande frequenti</A>
            </Col>
          </div>
          <div className="lg:col-span-3">
            <Col title="Contatti">
              <li>
                <a href={SITE.phone.href} className="text-gelo/75 hover:text-gelo">
                  {SITE.phone.label}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-gelo/75 hover:text-gelo">
                  {SITE.email}
                </a>
              </li>
              {SITE.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 text-gelo/55">
                  <span>{h.days}</span>
                  <span className="num">{h.time}</span>
                </li>
              ))}
            </Col>
          </div>
        </div>

        {/* Il nome a tutta larghezza: il logo chiude la pagina come un cartiglio. */}
        <div
          className="flex items-end justify-center gap-[0.34em] border-t border-[var(--line)] pt-12"
          style={{ fontSize: 'min(11vw, 150px)' }}
          aria-hidden
        >
          <span data-draw className="shrink-0 text-gelo">
            {/* Il marchio alto quanto le maiuscole: stessa riga, stesso peso visivo */}
            <LogoMark size={0} weight={1.1} className="!h-[0.74em] !w-[0.74em]" />
          </span>
          <span
            className="select-none whitespace-nowrap font-[560] uppercase leading-[0.74] text-gelo"
            style={{ fontStretch: '125%', letterSpacing: '-0.035em' }}
          >
            Ziranu
          </span>
        </div>

        <div className="meta mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-gelo-mute">
          <span>
            © {year} {SITE.legalName}
          </span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy" className="hover:text-gelo">
              Privacy
            </Link>
            {SITE.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="hover:text-gelo">
                {s.label}
              </a>
            ))}
            {/* Credito Alpacode: il link interno resta nell'HTML del server (backlink e ripiego senza JS) */}
            <alpacode-badge lang="it" theme="dark">
              <a href="https://alpacode.it/">Realizzato da Alpacode</a>
            </alpacode-badge>
          </span>
        </div>
      </div>
      <Script src="https://alpacode.it/badge.js" strategy="lazyOnload" />
    </footer>
  );
}
