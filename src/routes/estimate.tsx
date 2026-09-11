import { createFileRoute } from "@tanstack/react-router";
import { EstimateApp } from "@/components/invoice/EstimateApp";
import { AppShell } from "@/components/layout/AppShell";
import { EstimateCopy } from "@/content/estimate-copy";
import { toolHead } from "@/lib/seo";

const TITLE = "Free Estimate PDF — Not a Tax Invoice | Nota";
const DESC =
  "Write an estimate PDF in the browser. ESTIMATE title, EST- number, Valid until. Same cent math as Nota invoices. Not a tax invoice, no upload.";

export const Route = createFileRoute("/estimate")({
  head: () =>
    toolHead({
      title: TITLE,
      description: DESC,
      path: "/estimate",
      appName: "Nota",
    }),
  component: EstimatePage,
});

function EstimatePage() {
  return (
    <AppShell>
      <EstimateApp />
      <EstimateCopy />
    </AppShell>
  );
}
