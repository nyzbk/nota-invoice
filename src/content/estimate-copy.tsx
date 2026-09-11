import { Link } from "@tanstack/react-router";

export function EstimateCopy() {
  return (
    <article className="mx-auto mt-14 max-w-2xl space-y-4 px-4 pb-8 text-sm leading-relaxed text-muted">
      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
        An estimate is not a tax invoice
      </h2>
      <p>
        A bill asks to be paid. An estimate says what the work would cost if the client accepts the
        scope before that work starts. Nota keeps those as two PDFs on two URLs so a file named
        EST- cannot be waved at a tax office as if it were INV-. The generator on this page writes
        the word ESTIMATE at the top of the A4, numbers the file EST- by default, and labels the
        second date Valid until. The invoice generator on the home page still writes INVOICE and
        Due. Same integer-cent totals. Different document.
      </p>
      <p>
        “Valid until” is the window the price is offered, not net-14 payment terms. Default is
        thirty days from issue. After that date the PDF is a historical offer, not a live quote.
        If the client accepts, open{" "}
        <Link to="/" className="text-ink underline underline-offset-4">
          the invoice generator
        </Link>{" "}
        and issue INV- with a Due date. Do not relabel this estimate by typing “INVOICE” into the
        number field — the PDF title stays ESTIMATE on this URL.
      </p>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight text-ink">
        What this PDF refuses to be
      </h2>
      <p>
        It is not a VAT invoice, not a receipt, and not a demand for payment. The footer of the
        file says so in plain English. A receipt would mean money already moved; that URL does not
        exist on this host yet, on purpose. A quote in some trades is a synonym of estimate — we
        do not add a second path called /quote that reprints this page. One offer document is
        enough (Google’s similar-pages rule: expand or consolidate, do not doorway).
      </p>
      <p>
        Tax still can appear on an estimate if you type a percent. That is a forecast of tax, not
        a tax filing. How the cents are rounded lives on{" "}
        <Link to="/tax" className="text-ink underline underline-offset-4">
          tax & discount
        </Link>
        . This page does not repeat that worked example. If a line is labour at a daily rate, put
        the rate in Price and the days in Qty. Notes are for scope and exclusions, not bank
        passwords.
      </p>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight text-ink">
        When to send an estimate instead of a bill
      </h2>
      <p>
        Send an estimate when the scope is still a conversation: a studio quoting a brand system,
        a contractor pricing a two-week build, a photographer listing a day rate plus travel
        before the shoot is booked. The client should be able to read ESTIMATE at the top and know
        they are not being invoiced yet. Send an invoice when the work is agreed or already done
        and you want a Due date, not an offer window. Mixing the two in one PDF is how a file
        ends up in a bookkeeper’s “is this VAT?” pile.
      </p>
      <p>
        If you already issued INV- and the client asks for a cheaper option, do not edit the
        invoice number into EST- on the home page — the home page still prints INVOICE. Come here,
        start a new estimate, and keep the bill history intact. Drafts for this page live in a
        different browser key than invoice drafts, so a half-written bill does not open as an
        offer when you tap Estimate in the header.
      </p>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight text-ink">
        What stays in this tab
      </h2>
      <p>
        Names, lines, the optional logo and the PDF bytes are built with pdf-lib in this browser.
        Closing the tab drops the PDF. We do not email the file. Download it and attach it in the
        mail app you already use. Cyrillic names print through the same Noto files as the invoice.
        Logo rules are the same: PNG or JPEG, 2 MB, magic bytes checked. GIF, SVG, HEIC and PDF
        logos are refused. A broken image is skipped; the estimate still downloads.
      </p>
      <p>
        iPhone Safari saves through the browser download sheet, same as the invoice generator. If
        a popup blocker eats the file, tap Download estimate PDF again. Very long notes are
        clipped on a single A4 — keep scope in a few sentences, not a contract. Field labels on
        this URL say Prepared for and Valid until so the on-screen preview matches the file. The
        invoice fields lecture on{" "}
        <Link to="/fields" className="text-ink underline underline-offset-4">
          /fields
        </Link>{" "}
        still describes the bill. This page does not reprint that list.
      </p>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight text-ink">
        What this URL will not grow into
      </h2>
      <p>
        It will not become a quote clone, a receipt, a tools index, or a second tax lecture. Folio
        on another hostname merges signed scans after you already have a PDF. HEIC Local converts
        stills. This URL only writes an estimate. Operator:{" "}
        <Link to="/contact" className="text-ink underline underline-offset-4">
          contact
        </Link>
        . Do not attach client PDFs to that inbox. Describe the page URL, the browser, and what
        you expected the file to say at the top.
      </p>
    </article>
  );
}
