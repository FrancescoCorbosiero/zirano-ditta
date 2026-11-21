import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Statico anche nell'anteprima senza server (output: 'export').
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.payoff}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0f12',
    theme_color: '#0c0f12',
    lang: 'it',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
