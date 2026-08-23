import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { InvoiceApp } from "@/components/invoice/InvoiceApp";
import { invoiceFaq } from "@/content/faq";
import { toolHead } from "@/lib/seo";

const TITLE = "Free Invoice Generator — Create Invoice PDF, No Signup";
const DESC = "Make a professional invoice in your browser. Download PDF. No account, no watermark.";
const STEPS = [
  "Fill in From, Bill to, dates and line items.",
  "Add tax or a discount if you need them.",
  "Check the live preview.",
  "Download a clean PDF — it never leaves this device.",
];

export const Route = createFileRoute("/")({
  head: () =>
    toolHead({
      title: TITLE,
      description: DESC,
      path: "/",
      appName: "Free Invoice Generator",
      faqs: invoiceFaq,
      howToName: "How to create an invoice PDF online",
      howToSteps: STEPS,
    }),
  component: Home,
});

function Home() {
  return (
    <AppShell>
      <InvoiceApp />
    </AppShell>
  );
}
