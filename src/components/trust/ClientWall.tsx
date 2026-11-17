import { CLIENTS } from '@/lib/clients';
import ClientMark from './ClientMark';

/**
 * Il muro dei clienti: una griglia a filo, come i riquadri di una tavola.
 * Al passaggio (sempre, su schermi touch) ogni riquadro dice cosa abbiamo
 * fatto per quel cliente e da quando.
 */
export default function ClientWall({ className = '' }: { className?: string }) {
  return (
    <ul className={`wall crop ${className}`} data-reveal="stagger" aria-label="Alcuni clienti">
      {CLIENTS.map((c) => (
        <li key={c.id} className="wall-cell">
          <span className="wall-mark text-[clamp(0.95rem,1.55vw,1.45rem)]">
            <ClientMark client={c} />
          </span>
          <span className="wall-info">
            <span className="wall-work">{c.work}</span>
            <span className="block">
              {c.sector} · dal {c.since}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
