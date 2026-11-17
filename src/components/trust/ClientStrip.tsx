import Link from 'next/link';
import { CLIENTS } from '@/lib/clients';
import ClientMark from './ClientMark';

/** I nomi più riconoscibili, al piede della hero: la prima prova, prima di ogni parola. */
export default function ClientStrip({ className = '' }: { className?: string }) {
  const names = CLIENTS.filter((c) => c.strip).slice(0, 6);
  const others = CLIENTS.length - names.length;
  return (
    <div className={`wrap ${className}`} data-hero-fade>
      <div className="flex flex-col items-center gap-x-8 gap-y-5 border-t border-[var(--line)] py-7 lg:flex-row lg:justify-between lg:py-8">
        <p className="meta shrink-0 text-[var(--fg-mute)]">Scelti da</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-[clamp(24px,3vw,52px)] gap-y-4 text-[clamp(0.92rem,1.15vw,1.12rem)] text-gelo/70">
          {names.map((c) => (
            <li key={c.id}>
              <ClientMark client={c} />
            </li>
          ))}
        </ul>
        <Link href="#referenze" className="meta shrink-0 text-[var(--fg-mute)] transition-colors hover:text-[var(--fg)]">
          e altri {others} →
        </Link>
      </div>
    </div>
  );
}
