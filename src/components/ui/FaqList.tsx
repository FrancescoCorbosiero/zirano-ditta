import { pad } from '@/lib/works';

export default function FaqList({ items, name }: { items: readonly { q: string; a: string }[]; name?: string }) {
  return (
    <div className="faq" data-reveal>
      {items.map((item, i) => (
        <details key={item.q} name={name}>
          <summary>
            <span className="n">{pad(i + 1)}</span>
            {item.q}
            <span className="x" aria-hidden />
          </summary>
          <p className="a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
