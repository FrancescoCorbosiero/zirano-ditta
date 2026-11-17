/**
 * Linea di quota: un filo con le tacche oblique alle estremità, come sulle
 * tavole d'architettura. Si traccia entrando a schermo (data-rule) a
 * partire dal lato indicato. Puramente decorativa.
 */
export default function Dim({ className = '', from = 'start' }: { className?: string; from?: 'start' | 'center' | 'end' }) {
  return (
    <span aria-hidden className={`dim ${className}`} data-rule={from === 'start' ? '' : from}>
      <i />
    </span>
  );
}
