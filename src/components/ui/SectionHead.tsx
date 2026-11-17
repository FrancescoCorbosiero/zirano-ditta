import type { ReactNode } from 'react';
import Dim from './Dim';

type Align = 'center' | 'end' | 'split';

/**
 * Testata di sezione, senza etichetta sopra il titolo: è la posizione a
 * fare il lavoro. Tre assi (vedi globals.css):
 *  · `center` — titolo e testo centrati, per i momenti solenni;
 *  · `end`    — titolo allineato a destra, testo in basso a sinistra;
 *  · `split`  — titolo "a quota": `title` a sinistra, `titleEnd` a destra,
 *               unite da una linea di quota (su telefono vanno a capo).
 */
export default function SectionHead({
  title,
  titleEnd,
  align = 'end',
  size = 'h2',
  children,
  as: Tag = 'h2',
  className = '',
}: {
  title: ReactNode;
  titleEnd?: ReactNode;
  align?: Align;
  size?: 'h2' | 'display';
  children?: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  if (align === 'split') {
    return (
      <header className={className}>
        <Tag className={`${size} split-head`}>
          <span data-split>{title}</span>
          <Dim />
          <span data-split>{titleEnd}</span>
        </Tag>
        {children && (
          <div className="lead mt-7 lg:ml-auto lg:text-right" data-reveal>
            {children}
          </div>
        )}
      </header>
    );
  }

  if (align === 'center') {
    return (
      <header className={`text-center ${className}`}>
        <Tag className={`${size} mx-auto max-w-[16ch]`} data-split>
          {title}
        </Tag>
        {children && (
          <div className="lead mx-auto mt-7" data-reveal>
            {children}
          </div>
        )}
      </header>
    );
  }

  return (
    <header className={`grid gap-y-7 lg:grid-cols-12 ${className}`}>
      <Tag className={`${size} text-right lg:col-span-9 lg:col-start-4`} data-split>
        {title}
      </Tag>
      {children && (
        <div className="lead lg:col-span-4" data-reveal>
          {children}
        </div>
      )}
    </header>
  );
}
