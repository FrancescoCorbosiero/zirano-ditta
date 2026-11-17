import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from './fonts';
import { AppProvider } from '@/components/app/AppProvider';
import Logo from '@/components/layout/Logo';
import MobileDock from '@/components/layout/MobileDock';
import Ruler from '@/components/layout/Ruler';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import Motion from '@/components/motion/Motion';
import JsonLd from '@/components/seo/JsonLd';
import { businessGraph } from '@/lib/seo';
import { SITE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name} — ${SITE.payoff}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: { type: 'website', locale: 'it_IT', siteName: SITE.name },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0c0f12',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

/* Prima del primo fotogramma: segna che JavaScript c'è (`js`), accende gli
   stati iniziali delle animazioni (solo se il movimento è permesso) e, alla
   prima pagina della visita, l'intro con il logo. Se il motore non arriva,
   dopo 6 s tutto torna visibile. */
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');try{if(!sessionStorage.getItem('z-intro')){sessionStorage.setItem('z-intro','1');d.classList.add('intro');setTimeout(function(){d.classList.remove('intro')},2700)}}catch(e){}setTimeout(function(){if(!window.__motion)d.classList.remove('motion')},6000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <noscript>
          <style>{`.intro-layer{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="k-ios min-h-dvh">
        <a href="#contenuto" className="sr-only z-[100] rounded-[3px] bg-ottone px-4 py-2 text-notte focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Salta al contenuto
        </a>
        <div className="intro-layer" aria-hidden>
          <div className="intro-inner">
            <Logo size={92} draw stacked />
            <span className="intro-line" />
            <span className="intro-word meta text-gelo-mute">
              <span>{SITE.payoff}</span>
            </span>
          </div>
        </div>
        <AppProvider>
          <SiteHeader />
          <main id="contenuto">{children}</main>
          <SiteFooter />
          <MobileDock />
        </AppProvider>
        <Ruler />
        <Motion />
        <JsonLd data={businessGraph()} />
      </body>
    </html>
  );
}
