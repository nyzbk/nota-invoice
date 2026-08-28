import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { CONTACT_EMAIL } from "@/content/site";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    toolHead({
      title: "Privacy Policy — Nota invoice generator",
      description:
        "Nota builds invoice PDFs in the browser. Invoice fields are not uploaded. Drafts sit in local storage. AdSense cookies only after ads go live.",
      path: "/privacy",
      appName: "Nota",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Page title="Privacy Policy" lede="Last updated: 28 August 2026">
      <p>
        Nota creates PDF invoices in your browser. We do not upload, store or read the contents of
        those invoices. There is no invoice database on our side.
      </p>
      <h2 className="font-display text-xl font-medium">What stays on your device</h2>
      <p>
        Form fields and an optional logo are processed in memory. A draft may be saved in this
        browser’s local storage so you can continue later on the same device. Clearing site data
        or tapping Start over removes it. We cannot restore a draft from another phone.
      </p>
      <h2 className="font-display text-xl font-medium">What we do not collect</h2>
      <p>
        We do not ask for an account. We do not receive the PDF. Contact email is a mailbox for
        support text, not a drop box for files. Do not send invoices there.
      </p>
      <h2 className="font-display text-xl font-medium">Cookies and advertising</h2>
      <p>
        When live ads are enabled we use Google AdSense, which may set cookies according to
        Google’s policies. Until the site is approved, ad slots are placeholders and do not load
        personalized creatives from this origin’s LIVE flag. We do not run Auto ads overlays.
      </p>
      <h2 className="font-display text-xl font-medium">Logs</h2>
      <p>
        Standard hosting logs (IP, user-agent, referrer, path) may be kept up to 90 days for
        security and abuse response. They are not merged with invoice fields, because those fields
        never arrive.
      </p>
      <h2 className="font-display text-xl font-medium">Contact</h2>
      <p>
        Privacy questions:{" "}
        <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        or the <a href="/contact">Contact</a> page.
      </p>
    </Page>
  );
}
