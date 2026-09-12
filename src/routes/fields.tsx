import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/fields")({
  head: () => pageHead("/fields"),
  component: FieldsPage,
});

function FieldsPage() {
  return (
    <Page
      title="Invoice fields Nota prints"
      lede="A usable invoice is a letter that a payable clerk can match to a purchase. Missing From or Bill to is why the download button refuses to fire."
    >
      <p>
        <strong>From</strong> is you: trading name, email, address. If your country requires a
        company number or VAT ID on every bill, put it in Address. We do not scrape a registry.
      </p>
      <p>
        <strong>Bill to</strong> is the paying entity, not the intern who commissioned the work.
        Use the legal name on their contract. Cyrillic and Latin both embed.
      </p>
      <p>
        <strong>Invoice number</strong> must be unique in your own books. The default INV-date-001
        is a starter, not a guarantee against collisions. Change it when you already issued 001
        today.
      </p>
      <p>
        <strong>Issue date</strong> is when the bill exists. <strong>Due date</strong> is when
        money should arrive. Default gap is 14 days. Net 7 and net 30 are your contract, not ours.
      </p>
      <p>
        <strong>Line items</strong> need a description humans can audit (“Homepage design, August”)
        plus quantity and unit price. “As discussed” plus a blank price will not download.
        Quantity can be fractional (1.5 days).
      </p>
      <p>
        <strong>Discount</strong> is money off the subtotal. <strong>Tax %</strong> applies after
        that. Details and a worked example: <a href="/tax">tax and discount</a>.
      </p>
      <p>
        <strong>Notes</strong> are for payment rails: IBAN, correspondent bank, Kaspi phone,
        PayPal email, “quote #441”. Do not put card CVVs here.
      </p>
      <p>
        <strong>Logo</strong> is optional. PNG or JPEG, under 2 MB, checked by file header. It
        sits on the right of the header, scaled to about 110×44 points so it cannot cover the
        word INVOICE.
      </p>
      <p>
        Nota does not print a QR code, a wet signature box, or a perforated remittance slip. If
        your buyer’s AP system demands those, this is the wrong tool — say so on{" "}
        <a href="/contact">contact</a> and use their template.
      </p>
      <p>
        From, Bill to, invoice number, issue date, due date, currency, lines, discount, tax,
        notes, optional logo — that is the set. Nota will not invent a VAT registration field that
        your country requires if you did not type it into Notes. Put the legal lines you need in
        From or Notes as text. Do not expect a hidden “compliance pack” behind a toggle. The PDF
        is one A4. Long notes clip. Extra line items that do not fit above the totals block are
        omitted with a note rather than spilling onto page two. If you need a multi-page statement
        of work, write that elsewhere and attach both files in your own mail.
      </p>
      <p>
        Start filling on the <a href="/">invoice form</a>.
      </p>
    </Page>
  );
}
