import { AdUnit } from "@/components/ads/AdUnit";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10">
        <SoftAgencyCta />
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <a href="/privacy" className="text-muted underline-offset-4 hover:text-ink hover:underline">
            Privacy
          </a>
          <a href="/terms" className="text-muted underline-offset-4 hover:text-ink hover:underline">
            Terms
          </a>
          <a href="/about" className="text-muted underline-offset-4 hover:text-ink hover:underline">
            About
          </a>
        </nav>
        <AdUnit slot="footer" />
        <p className="text-center text-xs text-subtle">
          Invoice data never leaves your device. The PDF is built in your browser.
        </p>
      </div>
    </footer>
  );
}
