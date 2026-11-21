import type { NextConfig } from 'next';

/**
 * ANTEPRIMA_STATICA=1: solo per un'anteprima su un hosting statico (Netlify
 * Drop), con npm run anteprima (scripts/anteprima-statica.mjs). Esporta HTML e
 * file in out/, senza server: niente /api/preventivo (il modulo avvisa che è
 * un'anteprima), immagini non ottimizzate e niente intestazioni di sicurezza.
 */
const statica = process.env.ANTEPRIMA_STATICA === '1';

/** Intestazioni di sicurezza per ogni risposta (solo con il server). */
async function headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
      ],
    },
  ];
}

const nextConfig: NextConfig = {
  ...(statica ? { output: 'export' as const } : {}),
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: statica,
    // Le tavole segnaposto sono SVG generati da noi (scripts/placeholders.mjs).
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  ...(statica ? {} : { headers }),
};

export default nextConfig;
