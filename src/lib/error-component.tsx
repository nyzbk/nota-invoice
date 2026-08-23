import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

function friendlyMessage(raw: string) {
  if (/Failed to fetch dynamically imported module|tsr-split|error loading dynamically imported/i.test(raw)) {
    return "This screen failed to load. Go back to the tools and open it again.";
  }
  return raw || "An unexpected error occurred.";
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message = friendlyMessage(error.message);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink">
      <span className="text-danger" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-2xl font-medium tracking-tight">Something went wrong</h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">{message}</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <a
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-copper px-5 text-sm font-medium text-copper-fg no-underline"
        >
          Back to invoice
        </a>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-surface px-5 text-sm font-medium"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    </main>
  );
}

export function AppNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink">
      <h1 className="font-display text-2xl font-medium tracking-tight">Page not found</h1>
      <p className="max-w-md text-sm text-muted">That page does not exist. The invoice form is on the home screen.</p>
      <a
        href="/"
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-copper px-5 text-sm font-medium text-copper-fg no-underline"
      >
        Back to invoice
      </a>
    </main>
  );
}
