import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Button, { Arrow } from '@/components/ui/Button';
import Media from '@/components/ui/Media';
import PageHero from '@/components/ui/PageHero';
import BeforeAfter from '@/components/works/BeforeAfter';
import { media } from '@/lib/media';
import { breadcrumbGraph, pageMeta } from '@/lib/seo';
import { serviceBySlug } from '@/lib/services';
import { QUOTE_HREF } from '@/lib/site';
import { WORKS, pad, workBySlug } from '@/lib/works';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => WORKS.map((w) => ({ slug: w.slug }));

export async function generateMetadata({ params }: Props) {
  const work = workBySlug((await params).slug);
  if (!work) return {};
  return pageMeta({ title: work.title, description: work.summary, path: `/lavori/${work.slug}` });
}

export default async function WorkPage({ params }: Props) {
  const work = workBySlug((await params).slug);
  if (!work) notFound();
  const index = WORKS.indexOf(work);
  const next = WORKS[(index + 1) % WORKS.length]!;
  const service = serviceBySlug(work.service);

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: 'Lavori', path: '/lavori' }, { name: work.title, path: `/lavori/${work.slug}` }])} />
      <PageHero
        trail={[
          { name: 'Lavori', href: '/lavori' },
          { name: work.title, href: `/lavori/${work.slug}` },
        ]}
        title={work.title}
      >
        <p className="lead">{work.summary}</p>
        <p className="meta text-[var(--fg-mute)]">{work.tags.join(' · ')}</p>
      </PageHero>

      {/* Copertina a tutta larghezza con il cartiglio del lavoro in vetro */}
      <section className="tone-dark relative">
        <div className="wrap relative">
          <Media name={work.cover} ratio="16 / 9" parallax={1} priority sizes="100vw" className="max-sm:!aspect-[4/3]" />
          <div className="relative z-10 -mt-10 sm:absolute sm:bottom-6 sm:right-[calc(var(--gutter)+24px)] sm:mt-0 sm:w-[340px]" data-float="34">
            <dl className="glass p-5 text-gelo" style={{ '--glass-bg': 'rgb(12 15 18 / 0.6)' } as React.CSSProperties}>
              <div className="meta flex justify-between pb-3 text-[var(--fg-mute)]">
                <span>Cartiglio</span>
                <span>
                  Lavoro {pad(index + 1)} · {work.year}
                </span>
              </div>
              {work.sheet.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] py-2.5">
                  <dt className="meta text-[var(--fg-mute)]">{row.label}</dt>
                  <dd className="text-[15px] font-[540]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="h-[clamp(56px,7vw,104px)]" />
      </section>

      <section className="section">
        <div className="wrap grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="sr-only">Il lavoro</h2>
            <p className="meta text-[var(--fg-mute)]" data-reveal>
              {work.place}, {work.year}
            </p>
            {service && (
              <Link href={`/servizi/${service.slug}`} className="link-u mt-4" data-reveal>
                Servizio: {service.title} <Arrow />
              </Link>
            )}
          </div>
          <div className="grid gap-7 lg:col-span-8">
            {work.story.map((p, i) => (
              <p key={i} className={i === 0 ? 'h3 !font-[460] !leading-[1.22]' : 'max-w-[62ch] text-[18px] text-[var(--fg-soft)]'} {...(i === 0 ? { 'data-scrub-text': '' } : { 'data-reveal': '' })}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {work.before && work.after && (
        <section className="section tone-paper">
          <div className="wrap">
            <div className="flex flex-wrap-reverse items-end justify-between gap-6">
              <p className="quota quota-start w-full max-w-[320px]" data-reveal>
                <span>Trascina la lama</span>
              </p>
              <h2 className="h2 sm:text-right" data-split>
                Prima e dopo.
              </h2>
            </div>
            <div className="crop mt-12" data-reveal>
              <BeforeAfter before={work.before} after={work.after} />
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap grid gap-[clamp(20px,3vw,48px)] md:grid-cols-12">
          {work.gallery.map((key, i) => (
            <div key={key} className={i % 3 === 0 ? 'md:col-span-7' : i % 3 === 1 ? 'md:col-span-5 md:mt-[18%]' : 'md:col-span-8 md:col-start-3'}>
              <Media name={key} ratio={i % 3 === 1 ? '4 / 5' : '16 / 10'} parallax={1} />
            </div>
          ))}
        </div>
        <div className="wrap mt-[clamp(56px,7vw,104px)] flex flex-wrap items-center justify-between gap-6 border-t border-[var(--line-strong)] pt-8" data-reveal>
          <p className="h3 max-w-[22ch]">Hai un lavoro simile?</p>
          <Button href={`${QUOTE_HREF}?servizio=${work.service}`} variant="solid" magnetic>
            Richiedi un preventivo
          </Button>
        </div>
      </section>

      {/* Il prossimo lavoro: l'immagine affiora dietro il titolo */}
      <Link href={`/lavori/${next.slug}`} data-cursor="Avanti" className="tone-dark group relative block overflow-hidden border-b border-[var(--line)]">
        <div className="absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-50">
          <div className="frame h-full w-full">
            <Image src={media(next.cover).src} alt="" fill sizes="100vw" unoptimized className="plx" data-parallax="1" />
          </div>
        </div>
        <div className="wrap relative py-[clamp(88px,12vw,180px)]">
          <span className="meta text-[var(--fg-mute)]">Prossimo lavoro — {pad(((index + 1) % WORKS.length) + 1)}</span>
          <p className="display mt-5 !text-[clamp(2.4rem,7vw,6.5rem)] transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:translate-x-5">{next.title}</p>
        </div>
      </Link>
    </>
  );
}
