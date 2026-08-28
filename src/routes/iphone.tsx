import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/iphone")({
  head: () =>
    toolHead({
      title: "Create an invoice PDF on iPhone Safari — Nota",
      description:
        "Fill the invoice on iOS Safari, download the PDF to Files, no app install. What to do if the download sheet does not appear.",
      path: "/iphone",
      appName: "Nota",
    }),
  component: IphonePage,
});

function IphonePage() {
  return (
    <Page
      title="Invoices on iPhone (Safari)"
      lede="You do not need a separate iOS app. Safari loads the form, pdf-lib runs in the tab, the share sheet saves the file."
    >
      <p>
        Open <a href="/">{SITE_HINT}</a> in Safari, not in an in-app browser that strips
        downloads. Rotate to landscape if the line-item grid feels tight; the form is one column
        on a 390-wide screen so Description does not overflow.
      </p>
      <p>
        Fill From and Bill to with the on-screen keyboard. Date fields use the iOS date picker.
        Add at least one priced line. Optional logo: Photos → a PNG or JPEG under 2 MB. HEIC
        logos are not accepted here; convert the mark first (HEIC Local is a different tool).
      </p>
      <p>
        Tap Download PDF. Safari should show a download or share sheet. Save to Files, or share
        to Mail / Telegram. If nothing happens, check the red error under the button: missing
        names and missing prices are the usual cause. Then try Download PDF again — some
        blockers eat the first blob.
      </p>
      <p>
        Drafts stay in Safari’s local storage for this origin. Clearing History and Website Data
        deletes them. iCloud does not sync that draft to a Mac automatically.
      </p>
      <p>
        Low-memory iPhones can fail on a huge JPEG logo. Skip the logo or export a smaller PNG.
        Notes are clipped to a handful of lines on one A4 page; do not paste a contract.
      </p>
      <p>
        Chrome on iOS uses WebKit, so behavior is close to Safari. We do not ship an App Store
        binary. That keeps invoice bytes off a vendor’s upload API.
      </p>
      <p>
        More context: <a href="/how-to">how-to</a>, <a href="/faq">FAQ</a>.
      </p>
    </Page>
  );
}

const SITE_HINT = "nota-invoice-mu.vercel.app";
