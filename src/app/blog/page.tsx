import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import { Arrow } from '@/components/ui/Button';
import { allPosts, formatDate } from '@/lib/blog';
import { media } from '@/lib/media';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Guide',
  description: 'Guide pratiche su traslochi, montaggio mobili, installazioni e depositi, scritte da chi li fa ogni giorno.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = allPosts();
  return (
    <>
      <PageHero trail={[{ name: 'Guide', href: '/blog' }]} title="Guide.">
        <p className="lead">Come preparare un trasloco, montare un mobile, scegliere un deposito.</p>
      </PageHero>
      <section className="section !pt-[clamp(48px,6vw,88px)]">
        <ul className="wrap border-t border-[var(--line-strong)]" data-reveal="stagger">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-[var(--line)]">
              <Link href={`/blog/${p.slug}`} className="group grid items-center gap-x-10 gap-y-5 py-8 md:grid-cols-[260px_1fr_auto] lg:grid-cols-[340px_1fr_auto]">
                <div className="frame aspect-[16/10]">
                  <Image src={media(p.cover).src} alt="" fill sizes="340px" unoptimized className="zoom" />
                </div>
                <div>
                  <p className="meta text-[var(--fg-mute)]">
                    <span className="text-[var(--accent)]">{p.category}</span> · {formatDate(p.date)} · {p.minutes} min
                  </p>
                  <h2 className="h3 mt-4 !text-[clamp(1.4rem,2.6vw,2.2rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">{p.title}</h2>
                  <p className="mt-3 max-w-[60ch] text-[var(--fg-soft)]">{p.excerpt}</p>
                </div>
                <span className="hidden h-11 w-11 place-items-center border border-[var(--line-strong)] transition-colors group-hover:border-ottone group-hover:bg-ottone md:grid">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
