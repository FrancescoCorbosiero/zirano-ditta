import { ServiceIndex } from '@/components/home/Sections';
import FaqList from '@/components/ui/FaqList';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { pageMeta } from '@/lib/seo';
import { SERVICES } from '@/lib/services';
import { QUOTE_HREF } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Servizi',
  description: 'Traslochi, montaggio e smontaggio mobili, installazioni, smaltimenti, depositi e servizi su misura per case, uffici e negozi.',
  path: '/servizi',
});

export default function ServiziPage() {
  return (
    <>
      <PageHero trail={[{ name: 'Servizi', href: '/servizi' }]} title="Servizi.">
        <p className="lead">Sei servizi, spesso combinati nello stesso lavoro. Tutti con la nostra squadra.</p>
        <div>
          <Button href={QUOTE_HREF} variant="brass" magnetic>
            Richiedi un preventivo
          </Button>
        </div>
      </PageHero>
      <ServiceIndex heading={false} />
      <section className="section">
        <div className="wrap grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:order-2 lg:col-span-4 lg:text-right">
            <h2 className="h2 lg:sticky lg:top-28" data-split>
              In breve.
            </h2>
          </div>
          <div className="lg:order-1 lg:col-span-8">
            <FaqList items={SERVICES.flatMap((s) => s.faq).slice(0, 6)} name="faq-servizi" />
          </div>
        </div>
      </section>
    </>
  );
}
