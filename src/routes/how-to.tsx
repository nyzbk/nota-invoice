import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { HOWTO_STEPS, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-to")({
  head: () =>
    pageHead("/how-to", {
      howToName: "How to create an invoice PDF online without uploading",
      howToSteps: HOWTO_STEPS,
    }),
  component: HowToPage,
});

function HowToPage() {
  return (
    <Page
      title="How to create an invoice PDF without uploading files"
      lede="The usual path is a website that takes the PDF onto a server, or a desktop suite you do not have on the job. Nota draws the page in this tab."
    >
      <p>
        You have already done the work. A client wants a one-page bill with your name, theirs, a
        due date and a total they can pay. Word shoves the table onto page two. Excel treats 12%
        VAT as a float that prints as 114.999. Online “free invoice” tools ask for an email before
        the download button lights up. That extra account is where the file goes.
      </p>
      <p>
        Server converters are a bad fit for invoices for three reasons. First, privacy: names,
        bank notes and logos are client data, not demo lorem. Second, size: a 2 MB PNG logo is
        nothing locally and a timeout in a queue. Third, quality: a rasterized PDF looks sharp
        until someone copies the IBAN. Nota keeps selectable text because pdf-lib writes glyphs,
        not a screenshot of a canvas.
      </p>
      <p>
        In the browser the library creates an A4 page (595.28 × 841.89 points), embeds Noto Sans
        regular and bold, subsets only the characters you typed, and draws the table from the
        bottom of the header down. Integer cents stop $10.10 × 3 from becoming a repeating
        binary. If the font files fail to fetch, Latin still prints with a standard fallback so
        the download is not a blank page.
      </p>
      <h2 className="font-display text-xl font-medium tracking-tight">Steps</h2>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          <strong>From.</strong> Your trading name, email and address. This is the left column of
          the PDF. Empty From blocks the download — Google reviewers and clients both need a
          sender.
        </li>
        <li>
          <strong>Bill to.</strong> The person or company who pays. Cyrillic legal names are
          allowed; the font subset includes those code points.
        </li>
        <li>
          <strong>Number and dates.</strong> The default number is INV-YYYYMMDD-001. Issue date is
          today. Due date is +14 days. Change them if your contract says net 7 or net 30.
        </li>
        <li>
          <strong>Currency.</strong> USD, EUR, GBP or KZT. Tenge prints as the letters KZT plus
          the amount so a missing ₸ glyph cannot wipe the total.
        </li>
        <li>
          <strong>Lines.</strong> Description, quantity, unit price. Empty price rows are skipped.
          Add as many rows as fit above the totals block; extra lines on a packed page are omitted
          with a note rather than overflowing off A4.
        </li>
        <li>
          <strong>Discount and tax.</strong> Discount is a flat amount, capped at the subtotal.
          Tax is a percent of what remains. Total = subtotal − discount + tax. Worked example on
          the <a href="/tax">tax page</a>.
        </li>
        <li>
          <strong>Notes and logo.</strong> Payment details (IBAN, Kaspi, PayPal). Logo is optional
          PNG/JPEG, 2 MB, magic-bytes checked.
        </li>
        <li>
          <strong>Preview, then Download PDF.</strong> The file is built in memory and saved
          through the browser download UI. It is not emailed from this site.
        </li>
      </ol>
      <h2 className="font-display text-xl font-medium tracking-tight">If it does not download</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>From name or Bill-to name is blank.</li>
        <li>Every line lacks a numeric price — “ask” and “TBD” are not amounts.</li>
        <li>The logo is a GIF, SVG or a renamed PDF. Remove it.</li>
        <li>A popup or IT policy blocked the blob download. Try again, or another browser.</li>
        <li>
          The tab ran out of memory on a huge JPEG. Compress the logo below 2 MB, or skip it.
        </li>
      </ul>
      <p>
        After you close the tab, invoice bytes in RAM are gone. A draft may remain in local
        storage on this browser until Start over or until you clear site data. Another phone does
        not see that draft. We do not keep a copy on a server to “resume later”. That also means
        we cannot recover a file you never downloaded — treat Download PDF as the save button.
      </p>
      <p>
        Compared with Apple Pages or Microsoft Word you skip template hunting and broken fonts.
        Compared with Photoshop you skip raster type that falls apart when the clerk zooms.
        Compared with a hosted invoicing product you skip the account, the trial banner and the
        upload. You also skip email-from-us, which means you still send the PDF yourself — that
        is intentional. If you need dunning, recurring profiles and a customer ledger, this page
        is the wrong product; the <a href="/use-cases">use-cases</a> list says so in plain
        language.
      </p>
      <p>
        Reviewers sometimes call a single dropzone “thin content”. That is why this how-to exists
        as HTML, not only as a client-side tooltip. The form on the home page is the tool. This
        page is the manual: problem, why upload is the wrong default for an invoice, what the
        library actually does, steps, failure modes, and what happens when the tab closes.
      </p>
      <p>
        The numbers on this page are integer cents, not a float that prints 114.999. Discount is
        a flat amount taken off the subtotal before tax; tax is a percent of what remains. If
        your contract wants tax on the pre-discount figure, this generator is the wrong tool — do
        not “fix” it by typing a fake 0.01 line. The <a href="/tax">tax page</a> walks one worked
        example. IBAN, Kaspi and PayPal notes stay selectable text because pdf-lib writes glyphs,
        not a screenshot of the preview. A logo is optional, PNG or JPEG, magic-bytes checked, 2
        MB cap; GIF, SVG and PDF-as-logo are refused so a renamed scan cannot sneak in. Cyrillic
        legal names subset into Noto. Empty From or Bill-to blocks download on purpose: a blank
        sender is both a bad invoice and a thin page.
      </p>
      <p>
        After Download PDF, send the file yourself. Nota does not email clients, does not run
        dunning, and does not keep recurring profiles. Those products upload. This one does not.
        If you close the tab before you download, we have nothing to restore. Treat the button as
        save. A draft in this browser’s local storage is a convenience on the same phone, not a
        cloud archive.
      </p>
      <p>
        Next: <a href="/fields">fields that belong on the page</a>,{" "}
        <a href="/iphone">iPhone Safari</a>, <a href="/faq">FAQ</a>, or go back to the{" "}
        <a href="/">generator</a>.
      </p>
    </Page>
  );
}
