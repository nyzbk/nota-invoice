export function Header() {
  return (
    <header className="border-b border-line bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <a href="/" className="flex items-baseline gap-2 no-underline">
          <span className="font-display text-xl font-medium tracking-tight text-ink">Folio</span>
          <span className="hidden text-sm text-muted sm:inline">Free Invoice Generator</span>
        </a>
        <p className="text-xs text-muted sm:text-sm">No upload. No signup. No watermark.</p>
      </div>
    </header>
  );
}
