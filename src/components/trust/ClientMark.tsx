import type { CSSProperties } from 'react';
import type { Client } from '@/lib/clients';

/**
 * Il marchio di un cliente. Con il logo (SVG in /public) lo usa come
 * maschera tinta con il colore del testo: tutti i marchi hanno lo stesso
 * tono. Senza logo compone il nome in Archivo con lo stile di `mark`.
 * La dimensione segue la font-size del contenitore.
 */
export default function ClientMark({ client, className = '' }: { client: Client; className?: string }) {
  if (client.logo) {
    return <span role="img" aria-label={client.name} className={`logo-mask ${className}`} style={{ '--logo': `url(${client.logo})` } as CSSProperties} />;
  }
  const m = client.mark ?? {};
  return (
    <span
      className={`inline-block whitespace-nowrap leading-none ${className}`}
      style={{
        fontStretch: `${m.width ?? 100}%`,
        fontWeight: m.weight ?? 600,
        textTransform: m.upper ? 'uppercase' : undefined,
        letterSpacing: `${m.track ?? 0}em`,
        fontSize: `${m.size ?? 1}em`,
      }}
    >
      {client.name}
    </span>
  );
}
