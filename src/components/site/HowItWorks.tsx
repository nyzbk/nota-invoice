export function HowItWorks({ steps }: { steps: string[] }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl font-medium tracking-tight">How it works</h2>
      <ol className="mt-5 space-y-4">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-medium">
              {i + 1}
            </span>
            <p className="pt-1 text-sm leading-relaxed text-ink/90">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
