export function Header() {
  return (
    <header className="border-b border-line bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="flex items-baseline gap-2 no-underline">
          <span className="font-display text-xl font-medium tracking-tight text-ink">Nota</span>
          <span className="hidden text-sm text-muted sm:inline">Free Invoice Generator</span>
        </a>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <a href="/" className="text-ink no-underline hover:underline">
            Invoice
          </a>
          <a href="/estimate" className="text-muted no-underline hover:text-ink hover:underline">
            Estimate
          </a>
          <a href="/how-to" className="text-muted no-underline hover:text-ink hover:underline">
            How it works
          </a>
          <a href="/faq" className="text-muted no-underline hover:text-ink hover:underline">
            FAQ
          </a>
          <a href="/use-cases" className="text-muted no-underline hover:text-ink hover:underline">
            Use cases
          </a>
          <a href="/contact" className="text-muted no-underline hover:text-ink hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
