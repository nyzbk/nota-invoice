export type FaqItem = { q: string; a: string };

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="mt-14" data-testid="faq">
      <h2 className="font-display text-2xl font-medium tracking-tight">Frequently asked questions</h2>
      <div className="mt-5 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="cursor-pointer list-none text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-subtle transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
