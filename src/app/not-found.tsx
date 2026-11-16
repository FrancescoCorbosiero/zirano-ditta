import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section data-hero className="tone-dark relative grid min-h-[100svh] place-items-center overflow-hidden">
      <div className="grid-plan" />
      <div className="wrap relative text-center">
        <p className="tav" data-hero-fade>
          Errore 404 <b>— Stanza non in pianta</b>
        </p>
        <h1 className="display mt-8" data-split>
          Qui non c’è <em>nessuna porta.</em>
        </h1>
        <p className="lead mx-auto mt-7" data-hero-fade>
          La pagina che cerchi è stata spostata, oppure non è mai esistita.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3" data-hero-fade>
          <Button href="/" variant="brass">
            Torna all’ingresso
          </Button>
          <Button href="/lavori" variant="glass">
            Guarda i lavori
          </Button>
        </div>
      </div>
    </section>
  );
}
