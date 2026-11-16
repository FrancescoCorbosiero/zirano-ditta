import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { MediaKey } from './media';

/* Le guide vivono in src/content/blog/*.md: il nome del file è lo slug. */

const DIR = join(process.cwd(), 'src', 'content', 'blog');

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover: MediaKey;
  minutes: number;
  html: string;
};

function load(file: string): Post {
  const { data, content } = matter(readFileSync(join(DIR, file), 'utf8'));
  return {
    slug: file.replace(/\.md$/, ''),
    title: String(data.title),
    excerpt: String(data.excerpt ?? ''),
    date: new Date(data.date).toISOString(),
    category: String(data.category ?? 'Guide'),
    cover: (data.cover ?? 'scatole') as MediaKey,
    minutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
    html: marked.parse(content, { async: false }),
  };
}

let cache: Post[] | null = null;

export function allPosts(): Post[] {
  cache ??= readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map(load)
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export const postBySlug = (slug: string) => allPosts().find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' }).format(new Date(iso));
