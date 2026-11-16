import type { MetadataRoute } from 'next';
import { allPosts } from '@/lib/blog';
import { SERVICES } from '@/lib/services';
import { SITE_URL } from '@/lib/site';
import { WORKS } from '@/lib/works';

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' as const, priority });
  return [
    page('/', 1),
    page('/servizi', 0.9),
    page('/lavori', 0.9),
    page('/preventivo', 0.9),
    page('/chi-siamo', 0.7),
    page('/contatti', 0.7),
    page('/blog', 0.6),
    page('/faq', 0.6),
    ...SERVICES.map((s) => page(`/servizi/${s.slug}`, 0.8)),
    ...WORKS.map((w) => page(`/lavori/${w.slug}`, 0.6)),
    ...allPosts().map((p) => ({ ...page(`/blog/${p.slug}`, 0.5), lastModified: p.date })),
  ];
}
