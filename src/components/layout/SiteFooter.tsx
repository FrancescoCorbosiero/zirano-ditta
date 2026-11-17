import Link from 'next/link';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/lib/services';
import { NAV, QUOTE_HREF, SITE } from '@/lib/site';
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
        {/* Invito finale, sull'asse centrale come la hero */}
        <div className="flex flex-col items-center border-b border-[var(--line)] py-[clamp(96px,12vw,184px)] text-center">
          <h2 className="display max-w-[11ch]" data-split>
            Raccontaci lo spazio.
          </h2>
          <p className="lead mx-auto mt-7" data-reveal>
            Sopralluogo e preventivo gratuiti. Rispondiamo entro un giorno lavorativo.
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
        <div className="flex items-end justify-center gap-[3vw] border-t border-[var(--line)] pt-10" aria-hidden>
          <span data-draw className="shrink-0 text-gelo">
            <LogoMark size={0} weight={1.1} className="!h-[13.5vw] !w-[13.5vw] max-h-[190px] max-w-[190px]" />
          </span>
          <span
            className="select-none whitespace-nowrap font-[560] uppercase leading-[0.74] text-gelo"
            style={{ fontSize: 'min(14.4vw, 205px)', fontStretch: '125%', letterSpacing: '-0.035em' }}
          >
            Zirano
          </span>
        </div>

        <div className="meta mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-gelo-mute">
          <span>
            © {year} {SITE.legalName}
          </span>
          <span className="flex gap-6">
            <Link href="/privacy" className="hover:text-gelo">
              Privacy
            </Link>
            {SITE.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="hover:text-gelo">
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
