import Image from 'next/image';
import { media, type MediaKey } from '@/lib/media';

/**
 * Un'immagine dentro la sua cornice. `parallax` la fa scorrere più lenta
 * della pagina, `reveal` la scopre dal basso quando entra a schermo,
 * `priority` la carica subito (immagine in cima alla pagina: in Next 16
 * `priority` di next/image è deprecato, si usano loading e fetchPriority).
 * Le tavole segnaposto sono SVG e passano senza ottimizzazione; le foto
 * vere (jpg/webp) verranno ridimensionate da next/image.
 */
export default function Media({
  name,
  ratio = '16 / 10',
  parallax = 0,
  reveal = true,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className = '',
  alt,
}: {
  name: MediaKey;
  ratio?: string;
  parallax?: number;
  reveal?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  alt?: string;
}) {
  const m = media(name);
  return (
    <div className={`frame ${className}`} style={{ aspectRatio: ratio }} {...(reveal ? { 'data-img-reveal': '' } : {})}>
      <Image
        src={m.src}
        alt={alt ?? m.alt}
        fill
        sizes={sizes}
        {...(priority ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {})}
        unoptimized={m.src.endsWith('.svg')}
        className={parallax ? 'plx' : ''}
        {...(parallax ? { 'data-parallax': String(parallax) } : {})}
      />
    </div>
  );
}
