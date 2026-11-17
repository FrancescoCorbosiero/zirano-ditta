import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import FaqList from '@/components/ui/FaqList';
import PageHero from '@/components/ui/PageHero';
import { FAQ_GROUPS } from '@/lib/faq';
import { faqGraph, pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { pad } from '@/lib/works';

export const metadata = pageMeta({
  title: 'Domande frequenti',
  description: 'Preventivi, tempi, imballaggi, permessi, depositi e smaltimenti: le risposte alle domande che ci fanno più spesso.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqGraph(FAQ_GROUPS.flatMap((g) => [...g.items]))} />
      <PageHero trail={[{ name: 'Domande frequenti', href: '/faq' }]} title="Le risposte, prima delle domande.">
        <p className="lead">Non trovi la tua? Chiamaci: una telefonata chiarisce più di dieci email.</p>
        <div>
          <Button href={SITE.phone.href} variant="glass">
            {SITE.phone.label}
          </Button>
        </div>
      </PageHero>
      <section className="section !pt-[clamp(48px,6vw,88px)]">
        <div className="wrap grid gap-y-[clamp(56px,7vw,104px)]">
          {FAQ_GROUPS.map((g, i) => (
            <div key={g.title} className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="meta text-[var(--accent)]">{pad(i + 1)}</span>
                <h2 className="h3 mt-3" data-reveal>
                  {g.title}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <FaqList items={g.items} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
