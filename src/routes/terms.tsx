import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { CONTACT_EMAIL } from "@/content/site";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    toolHead({
      title: "Terms of Service — Nota",
      description:
        "Nota is provided as-is. You are responsible for tax and legal fields. No accounts. Do not use the tool for illegal activity.",
      path: "/terms",
      appName: "Nota",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Page title="Terms of Service" lede="Last updated: 28 August 2026">
      <p>By using Nota you agree to these Terms and the Privacy Policy.</p>
      <p>
        The generator is provided “as is”. You are responsible for whether an invoice meets the
        legal or tax rules that apply to you. This is not accounting, not a tax filing, and not
        legal advice. Totals follow the math on the <a href="/tax">tax page</a>; they are not a
        government assessment.
      </p>
      <p>
        To the maximum extent permitted by law we are not liable for lost drafts, incorrect
        amounts you typed, or business losses from using or failing to use the tool. Keep your own
        copy of issued PDFs.
      </p>
      <p>
        Do not use the tool for illegal activity, to impersonate another business, or to attack
        the service. Do not try to upload malware as a “logo”.
      </p>
      <p>
        Your invoice content belongs to you. The product name Nota, layout and code belong to the
        operator. Folio is a different product; do not treat this site as Folio.
      </p>
      <p>
        Questions:{" "}
        <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </Page>
  );
}
