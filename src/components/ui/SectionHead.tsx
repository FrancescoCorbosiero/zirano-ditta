import type { ReactNode } from 'react';

/**
 * Testata di sezione: numero di tavola, titolo che sale riga per riga,
 * testo d'accompagnamento a destra.
 */
export default function SectionHead({
  n,
  label,
  title,
  children,
  as: Tag = 'h2',
  className = '',
}: {
  n: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <header className={`grid gap-x-12 gap-y-8 lg:grid-cols-12 ${className}`}>
      <p className="tav lg:col-span-12" data-reveal>
        Tav. {n} <b>— {label}</b>
      </p>
      <Tag className={`${Tag === 'h1' ? 'display' : 'h2'} lg:col-span-8`} data-split>
        {title}
      </Tag>
      {children && (
        <div className="lead self-end lg:col-span-4" data-reveal>
          {children}
        </div>
      )}
    </header>
  );
}
