import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Folio Invoice" },
      { name: "description", content: "Folio Invoice builds PDFs in your browser. Invoice data is not uploaded." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-3xl font-medium tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/90">
          <p>
            Folio Invoice creates PDF invoices in your browser. We do not upload, store or read the
            contents of your invoices.
          </p>
          <h2 className="font-display text-xl font-medium">What stays on your device</h2>
          <p>
            Form fields and an optional logo are processed in memory. A draft may be saved in this
            browser’s local storage so you can continue later. Clearing site data removes it.
          </p>
          <h2 className="font-display text-xl font-medium">Cookies and advertising</h2>
          <p>
            When live ads are enabled we use Google AdSense, which may set cookies according to
            Google’s Privacy Policy. Until the site is approved, ad slots are placeholders.
          </p>
          <h2 className="font-display text-xl font-medium">Logs</h2>
          <p>Standard hosting logs (IP, user-agent, referrer) may be kept up to 90 days for security.</p>
          <h2 className="font-display text-xl font-medium">Contact</h2>
          <p>Questions: see the About page.</p>
        </div>
      </main>
    </AppShell>
  );
}
