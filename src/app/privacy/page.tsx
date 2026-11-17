import PageHero from '@/components/ui/PageHero';
import { pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = { ...pageMeta({ title: 'Informativa privacy', description: `Come ${SITE.name} tratta i dati personali raccolti dal sito.`, path: '/privacy' }), robots: { index: false } };

/* BOZZA SEGNAPOSTO — da far rivedere a un consulente privacy prima della messa online. */
export default function PrivacyPage() {
  return (
    <>
      <PageHero trail={[{ name: 'Privacy', href: '/privacy' }]} title="Informativa privacy" />
      <section className="section !pt-[clamp(48px,6vw,88px)]">
        <div className="wrap">
          <div className="prose-z max-w-[70ch]">
            <p>
              <strong>Bozza.</strong> Questo testo è un segnaposto e va sostituito con l’informativa definitiva redatta ai sensi del Regolamento (UE) 2016/679.
            </p>
            <h2>Titolare del trattamento</h2>
            <p>
              {SITE.legalName}, {SITE.address.street}, {SITE.address.zip} {SITE.address.city} ({SITE.address.province}) — P. IVA {SITE.vat}. Contatto: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <h2>Quali dati raccogliamo</h2>
            <p>I dati che inserisci nel modulo di preventivo: nome, telefono, email, informazioni sul luogo e sul lavoro richiesto.</p>
            <h2>Perché li usiamo</h2>
            <p>Solo per ricontattarti e prepararti il preventivo. Non li cediamo a terzi e non li usiamo per comunicazioni promozionali senza il tuo consenso.</p>
            <h2>Per quanto tempo</h2>
            <p>Per il tempo necessario a gestire la richiesta e, se diventi cliente, per gli obblighi di legge.</p>
            <h2>I tuoi diritti</h2>
            <p>Puoi chiedere in ogni momento accesso, rettifica o cancellazione dei tuoi dati scrivendo all’indirizzo indicato sopra.</p>
            <h2>Cookie</h2>
            <p>Il sito usa solo memoria tecnica del browser (per l’intro e la bozza del preventivo). Nessun cookie di profilazione.</p>
          </div>
        </div>
      </section>
    </>
  );
}
