import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button, { Arrow } from '@/components/ui/Button';
import FaqList from '@/components/ui/FaqList';
import Media from '@/components/ui/Media';
import PageHero from '@/components/ui/PageHero';
import JsonLd from '@/components/seo/JsonLd';
import WorkCard from '@/components/works/WorkCard';
import { breadcrumbGraph, faqGraph, pageMeta } from '@/lib/seo';
import { SERVICES, serviceBySlug } from '@/lib/services';
import { QUOTE_HREF } from '@/lib/site';
import { WORKS, pad } from '@/lib/works';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props) {
  const service = serviceBySlug((await params).slug);
  if (!service) return {};
  return pageMeta({ title: service.title, description: service.short, path: `/servizi/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();
  const index = SERVICES.indexOf(service);
  const next = SERVICES[(index + 1) % SERVICES.length]!;
  const works = WORKS.filter((w) => w.service === service.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: 'Servizi', path: '/servizi' }, { name: service.title, path: `/servizi/${service.slug}` }])} />
      <JsonLd data={faqGraph(service.faq)} />
      <PageHero
        n={`02.${index + 1}`}
        label={`Servizio ${service.code}`}
        trail={[
          { name: 'Servizi', href: '/servizi' },
          { name: service.title, href: `/servizi/${service.slug}` },
        ]}
        title={service.title}
      >
        <p className="lead">{service.short}</p>
        <div>
          <Button href={`${QUOTE_HREF}?servizio=${service.slug}`} variant="brass" magnetic>
            Preventivo per questo servizio
          </Button>
        </div>
      </PageHero>

      <section className="tone-dark pb-[clamp(64px,8vw,120px)]">
        <div className="wrap">
          <Media name={service.image} ratio="21 / 9" parallax={1} priority sizes="100vw" className="max-sm:!aspect-[4/3]" />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="tav" data-reveal>
              Il servizio <b>— in sintesi</b>
            </p>
            <p className="h3 mt-7 !text-[clamp(1.5rem,2.7vw,2.3rem)] !font-[460] !leading-[1.18]" data-scrub-text>
              {service.intro}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="glass p-6 lg:p-7" data-reveal>
              <p className="mono text-[var(--fg-mute)]">Cosa comprende</p>
              <ul className="mt-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-[var(--line)] py-3 text-[15px]">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-ottone" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="wrap">
          <p className="tav" data-reveal>
            Come si svolge <b>— {service.steps.length} fasi</b>
          </p>
          <div data-steps className="relative mt-12">
            <div className="absolute left-[5px] top-0 h-full w-px bg-[var(--line)] lg:left-0 lg:top-[5px] lg:h-px lg:w-full">
              <div data-steps-line className="h-full w-full origin-top-left bg-ottone" />
            </div>
            <ol className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-8">
              {service.steps.map((m, i) => (
                <li key={m.title} data-step className="relative pl-9 lg:pl-0 lg:pt-10">
                  <span className="dot absolute left-0 top-1 block h-[11px] w-[11px] border border-ottone bg-ottone lg:top-0" />
                  <span className="mono text-[var(--fg-mute)]">Fase {pad(i + 1)}</span>
                  <h3 className="h3 mt-3">{m.title}</h3>
                  <p className="mt-3 max-w-[34ch] text-[15.5px] text-[var(--fg-soft)]">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {works.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="flex items-end justify-between gap-6">
              <h2 className="h2" data-split>
                Lavori <em>di questo tipo.</em>
              </h2>
              <Link href="/lavori" className="link-u shrink-0" data-reveal>
                Tutti i lavori <Arrow />
              </Link>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {works.map((w) => (
                <WorkCard key={w.slug} work={w} index={WORKS.indexOf(w)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section !pt-0">
        <div className="wrap grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <h2 className="h3 lg:col-span-4" data-reveal>
            Domande su {service.title.toLowerCase()}
          </h2>
          <div className="lg:col-span-8">
            <FaqList items={service.faq} />
          </div>
        </div>
      </section>

      <Link href={`/servizi/${next.slug}`} className="tone-dark group block border-b border-[var(--line)]">
        <div className="wrap flex items-center justify-between gap-6 py-[clamp(48px,6vw,88px)]">
          <div>
            <span className="mono text-[var(--fg-mute)]">Servizio successivo</span>
            <p className="h2 mt-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4">{next.title}</p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center border border-[var(--line-strong)] transition-colors group-hover:border-ottone group-hover:bg-ottone group-hover:text-notte">
            <Arrow size={20} />
          </span>
        </div>
      </Link>
    </>
  );
}
