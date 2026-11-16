import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'line' | 'glass' | 'brass';

export function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/**
 * Il bottone del sito: etichetta che scorre al passaggio e freccia in un
 * riquadro separato da un filo. `href` interno → Link di Next.
 */
export default function Button({
  href,
  children,
  variant = 'solid',
  small = false,
  magnetic = false,
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  small?: boolean;
  magnetic?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const cls = `btn ${variant === 'solid' ? '' : `btn-${variant}`} ${small ? 'btn-sm' : ''} ${className}`;
  const inner = (
    <>
      <span className="btn-label">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      <span className="btn-arrow">
        <Arrow />
      </span>
    </>
  );
  const data = magnetic ? { 'data-magnetic': '' } : {};
  return /^(https?:|tel:|mailto:)/.test(href) ? (
    <a href={href} className={cls} {...data} {...rest}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} {...data} {...rest}>
      {inner}
    </Link>
  );
}
