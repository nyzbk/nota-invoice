import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { CONTACT_EMAIL } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("/privacy", { legal: true }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Page title="Privacy Policy" lede="Last updated: 8 September 2026">
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
      <h2 className="font-display text-xl font-medium">Hosting is not custody</h2>
      <p>
        Hosting on HTTPS at nota-invoice-mu.vercel.app is not custody of your invoices and is not
        an upload of the PDF. Vercel may see that a browser requested the page, the font files,
        and the worker — ordinary static assets. Vercel does not receive the File object of a logo
        beyond the moment your tab reads it, and it never receives the generated PDF bytes. There
        is no multipart “create invoice” form posted to our origin, no presigned bucket, and no
        “processing queue” email.
      </p>
      <p>
        Google ads, if they ever fill the after-download / mid / footer placeholders, receive the
        page URL and ordinary ad signals. They do not receive line items, bill-to names, or the
        Notes field. Until Site Ready those placeholders stay empty. We do not run analytics that
        log invoice numbers.
      </p>
      <p>
        If you email {CONTACT_EMAIL}, that message is ordinary email. That is why this policy and
        the contact page both say: do not attach an invoice. An attachment would be the first time
        the operator could see your client list. We do not want that inbox to become a drop box.
      </p>
      <p>
        Closing the tab drops the in-memory PDF. Downloads you saved to disk are yours to delete.
        We cannot remotely wipe a file we never held.
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
