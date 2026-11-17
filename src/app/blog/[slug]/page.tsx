import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Button, { Arrow } from '@/components/ui/Button';
import Media from '@/components/ui/Media';
import PageHero from '@/components/ui/PageHero';
import { allPosts, formatDate, postBySlug } from '@/lib/blog';
import { breadcrumbGraph, pageMeta } from '@/lib/seo';
import { QUOTE_HREF, SITE, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => allPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  return { ...pageMeta({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` }), openGraph: { type: 'article', publishedTime: post.date, title: post.title, description: post.excerpt } };
}

export default async function PostPage({ params }: Props) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  const others = allPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: 'Guide', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { '@type': 'Organization', name: SITE.name },
          publisher: { '@id': `${SITE_URL}/#ditta` },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        }}
      />
      <PageHero
        trail={[
          { name: 'Guide', href: '/blog' },
          { name: post.category, href: `/blog/${post.slug}` },
        ]}
        title={<span className="block !text-[0.72em]">{post.title}</span>}
      >
        <p className="quota quota-start">
          <span>
            {formatDate(post.date)} · {post.minutes} min di lettura
          </span>
        </p>
      </PageHero>
      <section className="tone-dark pb-[clamp(56px,7vw,104px)]">
        <div className="wrap">
          <Media name={post.cover} ratio="21 / 9" parallax={1} priority sizes="100vw" className="max-sm:!aspect-[4/3]" />
        </div>
      </section>

      <article className="section !pt-[clamp(56px,7vw,104px)]">
        <div className="wrap grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="prose-z lg:col-span-7 lg:col-start-2" dangerouslySetInnerHTML={{ __html: post.html }} />
          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="glass sticky top-28 p-6">
              <p className="meta text-[var(--fg-mute)]">Serve una mano?</p>
              <p className="h3 mt-4 !text-[1.35rem]">Sopralluogo e preventivo sono gratuiti.</p>
              <Button href={QUOTE_HREF} small className="mt-6">
                Preventivo
              </Button>
            </div>
          </aside>
        </div>
      </article>

      <section className="section !pt-0">
        <div className="wrap">
          <h2 className="h3">Altre guide</h2>
          <ul className="mt-8 border-t border-[var(--line-strong)]">
            {others.map((p) => (
              <li key={p.slug} className="border-b border-[var(--line)]">
                <Link href={`/blog/${p.slug}`} className="group flex items-center justify-between gap-6 py-6">
                  <span className="h3 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">{p.title}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
