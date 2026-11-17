import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import { pageMeta } from '@/lib/seo';
import { QUOTE_HREF, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contatti',
  description: `Telefono, email, sede e orari di ${SITE.name}. Sopralluogo e preventivo gratuiti.`,
  path: '/contatti',
});

const address = `${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city} (${SITE.address.province})`;

const CHANNELS = [
  { icon: Phone, label: 'Telefono', value: SITE.phone.label, href: SITE.phone.href, note: 'Negli orari di apertura' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Scrivici una foto del lavoro', href: SITE.whatsapp, note: 'Rispondiamo in giornata' },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, note: 'Per planimetrie e documenti' },
  { icon: MapPin, label: 'Sede e deposito', value: address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, note: 'Su appuntamento' },
];

export default function ContattiPage() {
  return (
    <>
      <PageHero trail={[{ name: 'Contatti', href: '/contatti' }]} title="Parliamo del tuo spazio.">
        <p className="lead">Telefono, WhatsApp o modulo: rispondiamo entro un giorno lavorativo.</p>
        <div>
          <Button href={QUOTE_HREF} variant="brass" magnetic>
            Richiedi un preventivo
          </Button>
        </div>
      </PageHero>

      <section className="section !pt-[clamp(48px,6vw,88px)]">
        <div className="wrap grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <ul className="border-t border-[var(--line-strong)] lg:col-span-7" data-reveal="stagger">
            {CHANNELS.map((c) => (
              <li key={c.label} className="border-b border-[var(--line)]">
                <a href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})} className="group grid grid-cols-[44px_1fr] items-center gap-x-5 py-7 sm:grid-cols-[44px_140px_1fr]">
                  <span className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] transition-colors duration-300 group-hover:border-ottone group-hover:bg-ottone">
                    <c.icon size={18} strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="meta text-[var(--fg-mute)] max-sm:col-start-2">{c.label}</span>
                  <span className="max-sm:col-start-2">
                    <span className="block text-[clamp(1.1rem,1.9vw,1.5rem)] font-[500] leading-tight tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                      {c.value}
                    </span>
                    <span className="mt-1 block text-[14px] text-[var(--fg-mute)]">{c.note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <aside className="grid content-start gap-5 lg:col-span-4 lg:col-start-9" data-reveal>
            <div className="glass p-6">
              <p className="meta text-[var(--fg-mute)]">Orari</p>
              <dl className="mt-4">
                {SITE.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-t border-[var(--line)] py-3 text-[15.5px]">
                    <dt>{h.days}</dt>
                    <dd className="font-[540]">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="glass p-6">
              <p className="meta text-[var(--fg-mute)]">Dove operiamo</p>
              <p className="mt-4 text-[15.5px] text-[var(--fg-soft)]">{SITE.area}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Segnaposto della mappa: qui andrà la mappa vera (o una foto della sede). */}
      <section className="tone-dark relative overflow-hidden">
        <div className="grid-plan !opacity-100" style={{ maskImage: 'none', WebkitMaskImage: 'none' }} />
        <div className="wrap relative grid min-h-[420px] place-items-center py-24">
          <div className="glass grid justify-items-center gap-3 px-8 py-7 text-center" data-reveal>
            <span className="block h-[11px] w-[11px] bg-ottone" />
            <p className="h3">{SITE.address.street}</p>
            <p className="meta text-[var(--fg-mute)]">
              {SITE.address.zip} {SITE.address.city} ({SITE.address.province})
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
