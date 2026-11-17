import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/lib/media';
import { pad, type Work } from '@/lib/works';

/** La scheda di un lavoro: cornice che si scopre, inclinazione 3D, cursore-lente. */
export default function WorkCard({ work, index, tall = false, sizes = '(min-width: 768px) 50vw, 100vw' }: { work: Work; index: number; tall?: boolean; sizes?: string }) {
  const m = media(work.cover);
  return (
    <Link href={`/lavori/${work.slug}`} data-cursor="Apri" className="group block">
      <div data-tilt className="relative">
        <div className="frame" data-img-reveal style={{ aspectRatio: tall ? '4 / 5' : '16 / 11' }}>
          <Image src={m.src} alt={m.alt} fill sizes={sizes} unoptimized className="zoom" />
          <span className="glare" />
          <span className="tag-glass">
            <span className="meta">{work.tags[0]}</span>
          </span>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4" data-reveal>
        <span className="meta text-[var(--accent)]">{pad(index + 1)}</span>
        <h3 className="h3">{work.title}</h3>
        <span className="meta text-[var(--fg-mute)]">{work.year}</span>
        <p className="col-span-2 col-start-2 mt-2 max-w-[48ch] text-[15px] text-[var(--fg-soft)]">{work.summary}</p>
      </div>
    </Link>
  );
}
