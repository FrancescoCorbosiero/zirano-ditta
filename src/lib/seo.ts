import type { Metadata } from 'next';
import { SITE, SITE_URL } from './site';
import { SERVICES } from './services';

/** Metadati di pagina con canonical e Open Graph coerenti. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website', locale: 'it_IT', siteName: SITE.name },
  };
}

/** Grafo dell'attività per i motori di ricerca (dati segnaposto in site.ts). */
export function businessGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MovingCompany',
        '@id': `${SITE_URL}/#ditta`,
        name: SITE.name,
        slogan: SITE.payoff,
        description: SITE.description,
        url: SITE_URL,
        telephone: SITE.phone.label,
        email: SITE.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.address.street,
          postalCode: SITE.address.zip,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.province,
          addressCountry: 'IT',
        },
        areaServed: SITE.address.region,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servizi',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.short, url: `${SITE_URL}/servizi/${s.slug}` },
          })),
        },
      },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#sito`, url: SITE_URL, name: SITE.name, inLanguage: 'it-IT', publisher: { '@id': `${SITE_URL}/#ditta` } },
    ],
  };
}

export function faqGraph(items: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}

export function breadcrumbGraph(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${SITE_URL}${t.path}` })),
  };
}
