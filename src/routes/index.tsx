import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { InvoiceApp } from "@/components/invoice/InvoiceApp";
import { homeFaq } from "@/content/faq";
import { HOME_HOW_TO_STEPS, HomeCopy } from "@/content/home-copy";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead("/", {
      faqs: homeFaq,
      howToName: "How to create an invoice PDF online without uploading",
      howToSteps: HOME_HOW_TO_STEPS,
      includeApp: true,
    }),
  component: Home,
});

function Home() {
  return (
    <AppShell>
      <InvoiceApp />
      <HomeCopy />
    </AppShell>
  );
}
