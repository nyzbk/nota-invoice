import { createFileRoute } from "@tanstack/react-router";
import { EstimateApp } from "@/components/invoice/EstimateApp";
import { AppShell } from "@/components/layout/AppShell";
import { EstimateCopy } from "@/content/estimate-copy";
import { estimateFaq } from "@/content/faq";
import { ESTIMATE_HOWTO_STEPS, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/estimate")({
  head: () =>
    pageHead("/estimate", {
      faqs: estimateFaq,
      howToName: "How to write an estimate PDF that is not a tax invoice",
      howToSteps: ESTIMATE_HOWTO_STEPS,
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
