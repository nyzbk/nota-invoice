import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { CONTACT_EMAIL } from "@/content/site";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    toolHead({
      title: "Contact Nota — invoice generator support",
      description: `Email ${CONTACT_EMAIL} about the invoice PDF tool. Include the page URL and browser. Do not attach invoices or logos.`,
      path: "/contact",
      appName: "Nota",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Page
      title="Contact"
      lede="A mailbox a human reads. There is no upload form, because a form would break the promise that invoice files stay on your device."
    >
      <p>
        Email:{" "}
        <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>What to include:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>URL of the page (this site is nota-invoice-mu.vercel.app)</li>
        <li>Browser and device (Safari iOS 18, Chrome 128, …)</li>
        <li>What you expected, what you saw (error text is enough)</li>
      </ul>
      <p>
        We do not accept uploads to this email. Do not attach invoices, logos, passports or bank
        letters. If the PDF looks wrong, describe the fields — we can reproduce totals from numbers,
        not from your client list.
      </p>
      <p>
        Ads, site review and payments for AdSense are handled in the Google account, not in this
        inbox. Product questions about Nota belong here.
      </p>
      <p>
        Nearby tools from the same workshop (separate sites, separate data): Folio for PDF merge /
        split / compress, HEIC Local for iPhone photos. Do not send those files here either.
      </p>
    </Page>
  );
}
