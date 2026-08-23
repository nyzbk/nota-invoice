import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Service — Folio Invoice" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-3xl font-medium tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/90">
          <p>By using Folio Invoice you agree to these Terms and the Privacy Policy.</p>
          <p>
            The generator is provided “as is”. You are responsible for whether an invoice meets the
            legal or tax rules that apply to you. This is not accounting or legal advice.
          </p>
          <p>
            To the maximum extent permitted by law we are not liable for lost data, incorrect totals
            or business losses arising from use of the tool.
          </p>
          <p>Do not use the tool for illegal activity or to attack the service.</p>
          <p>Your invoice content belongs to you. The product design and code belong to us.</p>
        </div>
      </main>
    </AppShell>
  );
}
