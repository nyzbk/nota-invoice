import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { InvoiceApp } from "@/components/invoice/InvoiceApp";
import { invoiceFaq } from "@/content/faq";
import { HOME_HOW_TO_STEPS, HomeCopy } from "@/content/home-copy";
import { toolHead } from "@/lib/seo";

const TITLE = "Free Invoice Generator — Create Invoice PDF, No Signup";
const DESC =
  "Make a professional invoice PDF in your browser. Integer-cent totals, tax after discount, Latin and Cyrillic names. No account, no watermark, no upload.";

export const Route = createFileRoute("/")({
  head: () =>
    toolHead({
      title: TITLE,
      description: DESC,
      path: "/",
      appName: "Nota",
      faqs: invoiceFaq,
      howToName: "How to create an invoice PDF online without uploading",
      howToSteps: HOME_HOW_TO_STEPS,
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
