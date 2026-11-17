/** Righello fisso a bordo pagina (desktop largo): quanto manca alla fine. */
export default function Ruler() {
  return (
    <div data-ruler aria-hidden className="pointer-events-none fixed bottom-24 right-[14px] top-28 z-30 hidden w-6 mix-blend-difference min-[1500px]:block">
      <div
        className="absolute inset-y-0 right-0 w-[9px] opacity-50"
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #fff 0 1px, transparent 1px 12px)' }}
      />
      <div className="absolute inset-y-0 right-0 w-px bg-white/50" />
      <div data-ruler-mark className="absolute right-0 top-0 flex -translate-y-1/2 items-center gap-1.5">
        <span data-ruler-n className="meta text-white" style={{ fontSize: 9.5 }}>
          000
        </span>
        <span className="block h-px w-4 bg-ottone-soft" />
      </div>
    </div>
  );
}
