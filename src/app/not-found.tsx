import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section data-hero className="tone-dark relative grid min-h-[100svh] place-items-center overflow-hidden">
      <div className="grid-plan" />
      <div className="wrap relative text-center">
        <p className="legend-fig !text-center !text-[clamp(5rem,16vw,13rem)] text-[var(--fg-mute)]" data-hero-fade>
          404
        </p>
        <h1 className="display mt-8" data-split>
          Pagina non trovata.
        </h1>
        <p className="lead mx-auto mt-7" data-hero-fade>
          La pagina è stata spostata o non esiste.
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
