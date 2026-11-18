// Web Component del badge di crediti Alpacode (https://alpacode.it/badge.js)
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'alpacode-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        lang?: string;
        theme?: 'light' | 'dark' | 'auto';
        compact?: boolean;
      };
    }
  }
}
