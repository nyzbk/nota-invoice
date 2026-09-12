import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FaqSection } from "@/components/site/FaqSection";
import { invoiceFaq } from "@/content/faq";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => pageHead("/faq", { faqs: invoiceFaq }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-3xl font-medium tracking-tight">FAQ — Nota invoice PDF</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Short answers that match the visible form. The same copy is marked up as FAQPage JSON-LD
          on the home page. Ads are placeholders until the site is Ready; we do not ask you to
          click them.
        </p>
        <FaqSection items={invoiceFaq} />
        <p className="mt-8 text-sm text-muted">
          Still stuck? <a href="/contact">Contact</a> with the page URL and browser. Do not email
          the PDF.
        </p>
      </main>
    </AppShell>
  );
}
